<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h2>Danh sách bác sĩ đăng ký dịch vụ</h2>
      <div v-if="isLoading" class="loading">
        <p>Đang tải dữ liệu...</p>
      </div>
      <div v-else>
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

export default {
  components: { AlertModal },
  props: {
    serviceId: {
      type: Number,
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
      this.modalContent = "Bạn có chắc chắn muốn xóa bác sĩ này không?";
      this.isModalVisible = true;
    },
    handleModalAction(action) {
      const BEARER_TOKEN = localStorage.getItem("token");

      if (action === "OK" && this.pendingDoctorId !== null) {
        const doctorServiceData = {
          doctorID: this.pendingDoctorId,
          serviceID: this.serviceId,
        };

        console.log(doctorServiceData);

        if (!BEARER_TOKEN) {
          console.error("Token is missing or invalid.");
          return;
        }

        axios
          .delete(`https://api.unime.site/UNIME/doctorservice`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(BEARER_TOKEN)}`,
            },
            data: doctorServiceData,
          })
          .then(() => {
            this.doctors = this.doctors.filter(
              (doctor) => doctor.doctorId !== this.pendingDoctorId
            );
            this.pendingDoctorId = null;
            this.isModalVisible = false;
          })
          .catch((error) => {
            if (error.response) {
              console.error("Error response:", error.response.data);
              alert(`Error: ${error.response.data.message}`);
            } else {
              console.error("Error:", error);
            }
          });
      } else {
        this.pendingDoctorId = null;
        this.isModalVisible = false;
      }
    },

    closeModal() {
      this.$emit("close");
    },
  },
  mounted() {
    this.fetchDoctors();
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
  max-height: 500px;
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
</style>
