<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h2>Danh sách bác sĩ đăng ký dịch vụ</h2>
      <div v-if="isLoading" class="loading">
        <p>Đang tải dữ liệu...</p>
      </div>
      <div v-else>

        <multiselect
          v-model="selectedDoctor"
          :options="data"
          placeholder="Chọn bác sĩ"
          label="label"
          track-by="value"
          :searchable="true"
          :close-on-select="true"
          :allow-empty="false"
          class="multi-select"
        />
        <div v-if="selectedDoctor">
          <div class="doctor-card-horizontal one"          >
            <div class="doctor-info">
              <h3>{{ selectedDoctor.label }}</h3>
            </div>
            <button
              @click="confirmAddDoctor( selectedDoctor.value)"
              class="add-button"
            >
              Thêm
            </button>
          </div>
        </div>
        <div class="doctor-list">
          <div
            v-for="doctor in doctors"
            :key="doctor.doctorId"
            class="doctor-card-horizontal"
          >
            <img
              :src="doctor.doctorImage"
              alt="Doctor Image"
              class="doctor-image"
            />
            <div class="doctor-info">
              <h3>{{ doctor.doctorName }}</h3>
              <p><strong>Phone:</strong> {{ doctor.doctorPhoneNumber }}</p>
              <p><strong>Address:</strong> {{ doctor.doctorAddress }}</p>
            </div>
            <button
              @click="confirmRemoveDoctor(doctor.doctorId)"
              class="delete-button"
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
      <AlertModal
        :isVisible="isModalVisible"
        :type="modalType"
        :title="modalTitle"
        :content="modalContent"
        @action="handleModalAction"
      />
      <button class="close-button" @click="closeModal">
        <i class="fas fa-times"></i>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AlertModal from "../tools/AlertModal.vue";
import Multiselect from "vue-multiselect";
import { toast } from "vue3-toastify";

export default {
  components: { AlertModal, Multiselect },
  props: {
    serviceId: {
      type: Number,
      required: true,
    },
    listDoctor: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      doctors: [],
      isLoading: true,
      isModalVisible: false,
      modalType: "info",
      modalTitle: "",
      modalContent: "",
      pendingDoctorId: null,
      selectedDoctor: null,
      data: [],
    };
  },
  methods: {
    fetchDoctors() {
      this.isLoading = true;
      axios
        .get(
          `https://api.unime.site/UNIME/doctorservice/get/doctorList/${this.serviceId}`
        )
        .then((response) => {
          this.doctors = response.data.result;
          // console.log("Doctor list: ", this.listDoctor);
        })
        .catch((error) => {
          console.error("Error fetching doctor list: ", error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    confirmRemoveDoctor(doctorId) {
      this.pendingDoctorId = doctorId;
      this.modalType = "warning";
      this.modalTitle = "Xác nhận xóa bác sĩ";
      this.modalContent = "Bạn có chắc chắn muốn xóa bác sĩ này khỏi dịch vụ được chọn  không?";
      this.isModalVisible = true;
    },
    
    async handleModalAction(action) {
      const BEARER_TOKEN = localStorage.getItem("token");

      if (action === "OK" && this.pendingDoctorId !== null) {
        const doctorServiceData = {
          doctorID: this.pendingDoctorId,
          serviceID: this.serviceId,
        };

        console.log("To delete: ", doctorServiceData);

        try {
          await axios.delete(`https://api.unime.site/UNIME/doctorservice`, {
            data: doctorServiceData, // Gửi data trong body với 'data'
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`,
            },
          });

          // Nếu thành công, cập nhật lại state
          this.doctors = this.doctors.filter(
            (doctor) => doctor.doctorId !== this.pendingDoctorId
          );
          this.pendingDoctorId = null;
          this.isModalVisible = false;

          // Có thể hiển thị thông báo thành công nếu cần
          toast.success('Xoá bác sĩ thành công', {
            rtl: false,
            limit: 3,
            position: toast.POSITION.TOP_RIGHT,
          });

        } catch (error) {
          if (error.response) {
            console.error("Error response:", error.response.data);
            // toast.error(`Lỗi: ${error.response.data.message}`, {
            let message = error.response.data.message;
            // console.log("Message: ", message);
            if (message === "Doctor service exited") {
              message = "Bác sĩ đã có trong dịch vụ này!"
            }

            if (message === "Cannot delete as it has associated appointment.") {
              message = "Không thể xóa vì bác sĩ có cuộc hẹn liên quan!"
            }

            toast.error(`Lỗi: ${message}`, {
              rtl: false,
              limit: 3,
              position: toast.POSITION.TOP_RIGHT,
            });
          } else {
            console.error("Error:", error);
            toast.error('Lỗi không xác định', {
              rtl: false,
              limit: 3,
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        }
      } else {
        this.pendingDoctorId = null;
        this.isModalVisible = false;
      }
    },

    async confirmAddDoctor(doctorId) {
      const BEARER_TOKEN = localStorage.getItem("token");

      if (!BEARER_TOKEN) {
        toast.error("Token không hợp lệ. Vui lòng đăng nhập lại.", {
          rtl: false,
          limit: 3,
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }

      const doctorServiceData = {
        doctorID: doctorId,
        serviceID: this.serviceId,
      };

      console.log("To add: ", doctorServiceData);

      try {
        await axios.post(
          `https://api.unime.site/UNIME/doctorservice`,
          doctorServiceData,
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`,
            },
          }
        );

        this.fetchDoctors();
        this.selectedDoctor = null;
        toast.success('Thêm bác sĩ thành công', {
          rtl: false,
          limit: 3,
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        if (error.response) {
          console.error("Error response:", error.response.data);
          toast.error(`Lỗi: ${error.response.data.message}`, {
            rtl: false,
            limit: 3,
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          console.error("Error:", error);
          toast.error('Lỗi không xác định', {
            rtl: false,
            limit: 3,
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    },


    closeModal() {
      this.$emit("close");
    },

    getDoctorData() {
      this.data = this.listDoctor.map((doctor) => ({
              value: doctor.doctorId,
              label: doctor.doctorName,
            }));
    },
  },
  mounted() {
    this.fetchDoctors();
    this.getDoctorData();
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 800px;
  /* max-height: 500px; */
  height: 500px;
  overflow-y: scroll;
  width: 90%;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
}

.doctor-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.doctor-card-horizontal {
  display: flex;
  align-items: center;
  gap: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  background: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.doctor-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.doctor-info {
  flex-grow: 1;
}

h3 {
  font-size: 1.2rem;
  margin: 0;
}

p {
  font-size: 0.9rem;
  margin: 5px 0;
}

.delete-button {
  padding: 8px 12px;
  font-size: 0.9rem;
  background: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-button:hover {
  background: #c82333;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #dc3545;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.close-button:hover {
  background: #c82333;
}

.multi-select {
  margin-top: 0;
  margin-bottom: 20px;
}

.one {
  margin-bottom: 20px;
  text-align: left;
}

.add-button {
  padding: 8px 12px;
  font-size: 0.9rem;
  background: #2fc13d;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-button:hover {
  background: #0e8b23;
}

</style>
