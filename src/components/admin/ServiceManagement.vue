<template>
  <div class="wrapper">
    <div class="board">
      <h1>Danh sách dịch vụ</h1>

      <div v-if="isLoading" class="loading">
        <p>Đang tải dữ liệu</p>
        <LoadingComponent />
      </div>

      <div v-else>
        <div class="controls">
          <input type="text" v-model="searchQuery" placeholder="Search by name" />
          <select v-model="rowsPerPage">
            <option v-for="option in rowsOptions" :key="option" :value="option">
              {{ option }} rows
            </option>
          </select>
        </div>

        <table border="1" cellpadding="10">
          <thead>
            <tr>
              <th style="width: 30px;">#</th>
              <th style="width: 500px;">Tên dịch vụ</th>
              <th style="width: 200px;">Chuyên khoa</th>
              <th style="width: 200px;">Giá dịch vụ</th>
              <th style="width: 200px;"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(service, index) in filteredServices" :key="service.serviceId">
              <td>{{ index + 1 + (currentPage - 1) * rowsPerPage }}</td>
              <td>{{ service.serviceName }}</td>
              <td>{{ service.departmentName }}</td>
              <td>{{ service.servicePrice }} VND</td>
              <td class="action-container">
                <button @click="openDetail(service)">Chi tiết</button>
                <button @click="cancelService(service.serviceId)">Hủy</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="pagination">
          <button :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">Trước</button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">Sau</button>
        </div>
      </div>

      <!-- Modal -->
      <!-- <div v-if="selectedService" class="modal-overlay" @click="closeDetail">
        <div class="modal" @click.stop>
          <h2>Chi tiết dịch vụ</h2>
          <p><strong>Tên dịch vụ:</strong> {{ selectedService.serviceName }}</p>
          <p><strong>Chuyên khoa:</strong> {{ selectedService.departmentName }}</p>
          <p><strong>Giá:</strong> {{ selectedService.servicePrice }} VND</p>
          <p><strong>Mô tả:</strong> {{ selectedService.serviceDescription || 'Không có mô tả' }}</p>
          <img :src="selectedService.serviceImage" alt="service-thumbnail">
          <button @click="closeDetail">Đóng</button>
        </div>
      </div> -->
      <div v-if="selectedService" class="modal-overlay" @click="closeDetail">
          <div class="modal" @click.stop>
            <div class="details">
              <div class="aaa">
                <h2>{{ !isEditing? 'Xem thông tin' : 'Chỉnh sửa thông tin' }}</h2>
                <label class="toggle-wrapper">
                  <input 
                    type="checkbox" 
                    v-model="isEditing" 
                    class="toggle-input" 
                  />
                  <div class="toggle">
                    <span class="toggle-icon" :class="{ 'checked': isChecked }">
                      {{ isEditing ? '✔️' : '✖️' }}
                    </span>
                  </div>
                </label>
              </div>
              <div class="detail-item">
                <span class="label">Tên dịch vụ:</span>
                <input class="input-text" type="text" name="departmentname" id="" value="" v-model="selectedService.serviceName" :readonly="!isEditing">
              </div>
              <div class="detail-item">
                <span class="label">Chuyên khoa:</span>
                <input class="input-text" type="text" name="departmentname" id="" value="" v-model="selectedService.departmentName" readonly>              
              </div>
              <div class="detail-item">
                <span class="label">Giá:</span>
                <input class="input-text" type="text" name="departmentname" id="" value="" v-model="selectedService.servicePrice" :readonly="!isEditing">              
              </div>
              <div class="detail-item">
                <span class="label">Mô tả:</span>
                <textarea rows="5" v-model="selectedService.serviceDescription" 
                          class="textarea-input"
                          :readonly="!isEditing">
                </textarea>
              </div>
              <div class="detail-item">
                <span class="label">Hình ảnh:</span>
                <img 
                  :src="thubmail || selectedService.serviceImage" 
                  alt="service-thumbnail" 
                  class="image-preview"
                  @click="handleImageClick"
                >
                <!-- Thẻ input file ẩn -->
                <input 
                  type="file" 
                  ref="fileInput" 
                  @change="updateImage" 
                  accept="image/*" 
                  class="hidden-file-input"
                  style="display: none;">
              </div>

            </div>
            <button @click="isEditing ? saveChanges() : closeDetail()">
              {{ isEditing ? 'Lưu thông tin' : 'Đóng' }}
            </button>
          </div>
        </div>

      <!-- Alert -->
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
import LoadingComponent from "../tools/LoadingComponent.vue";
import AlertModal from "../tools/AlertModal.vue";
import { toast } from 'vue3-toastify';

export default {
  components: {
    LoadingComponent,
    AlertModal,
  },
  data() {
    return {
      services: [],
      rowsPerPage: 5,
      currentPage: 1,
      searchQuery: "",
      rowsOptions: [5, 10, 20, 50],
      isLoading: true,

      selectedService: null,
      isEditing: false,

      isModalVisible: false,
      modalType: "info",
      modalTitle: "",
      modalContent: "",
      pendingServiceId: null,
      thubmail: null,
    };
  },
  computed: {
    filteredServices() {
      const filtered = this.services.filter(service =>
        service.serviceName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      const start = (this.currentPage - 1) * this.rowsPerPage;
      return filtered.slice(start, start + this.rowsPerPage);
    },
    totalPages() {
      const filteredCount = this.services.filter(service =>
        service.serviceName.toLowerCase().includes(this.searchQuery.toLowerCase())
      ).length;
      return Math.ceil(filteredCount / this.rowsPerPage);
    },
  },
  watch: {
    selectedService(newService) {
      if (newService) this.isEditing = false;
    },
  },
  methods: {
    async fetchData() {
      this.isLoading = true;
      try {
        const response = await axios.get("https://api.unime.site/UNIME/services/get/serviceList");
        this.services = response.data.result;
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        this.isLoading = false;
      }
    },

    openDetail(service) {
      this.selectedService = service;
      this.thubmail = service.serviceImage;
    },

    closeDetail() {
      this.isEditing = false;
      this.selectedService = null;
    },

    handleImageClick() {
      if (this.isEditing) {
        this.$refs.fileInput.click(); 
      }
    },

    updateImage(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.thubmail = e.target.result;
          this.selectedService.serviceImage = file;
        };
        reader.readAsDataURL(file);
      }
    },

    async saveChanges() {
      try {
        const BEARER_TOKEN = localStorage.getItem("token");
        
        // If there's a new image (File object), upload it to Cloudinary
        if (this.selectedService.serviceImage && typeof this.selectedService.serviceImage !== "string") {
          const formData = new FormData();
          formData.append("file", this.selectedService.serviceImage);
          formData.append("upload_preset", process.env.VUE_APP_CLOUD_AVATAR_UPLOAD_PRESET);
          
          const uploadResponse = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.VUE_APP_CLOUD_NAME}/image/upload`,
            formData
          );
          this.selectedService.serviceImage = uploadResponse.data.secure_url;
        }

        // Update service information regardless of whether there's a new image
        try {
          await axios.put(
            `https://api.unime.site/UNIME/services/${this.selectedService.serviceId}`,
            this.selectedService,
            { headers: { Authorization: `Bearer ${BEARER_TOKEN}` } }
          );
          
          this.isEditing = false;
          this.selectedService = null;
          await this.fetchData();
          
          toast.success("Cập nhật dịch vụ thành công!", {
            rtl: false,
            limit: 3,
            position: toast.POSITION.TOP_RIGHT,
          });
        } catch (error) {
          console.error("Error updating service:", error);
          toast.error("Có lỗi xảy ra khi cập nhật dịch vụ!", {
            rtl: false,
            limit: 3,
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } catch (error) {
        console.error("Error handling image upload:", error);
        toast.error("Có lỗi xảy ra khi tải ảnh lên!", {
          rtl: false,
          limit: 3,
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    },

    cancelService(id) {
      this.pendingServiceId = id;
      this.modalType = "warning";
      this.modalTitle = "Xác nhận xóa dịch vụ";
      this.modalContent = "Bạn có chắc chắn muốn xóa dịch vụ này không?";
      this.isModalVisible = true;
    },

    async handleModalAction(action) {
      if (action === "OK" && this.pendingServiceId !== null) {
        const BEARER_TOKEN = localStorage.getItem("token");
        try {
          await axios.delete(
            `https://api.unime.site/UNIME/services/${this.pendingServiceId}`,
            { headers: { Authorization: `Bearer ${BEARER_TOKEN}` } }
          );
          this.services = this.services.filter(
            service => service.serviceId !== this.pendingServiceId
          );
          this.pendingServiceId = null;
          this.isModalVisible = false;
          this.currentPage = 1;
          toast.success("Xóa dịch vụ thành công!", {
            rtl: false,
            limit: 3,
            position: toast.POSITION.TOP_RIGHT,
          });
        } catch (error) {
          console.error("Error deleting service:", error);
          toast.error("Có lỗi xảy ra khi xóa dịch vụ!", {
            rtl: false,
            limit: 3,
            position: toast.POSITION.TOP_RIGHT,
          });
          this.pendingServiceId = null;
          this.isModalVisible = false;
        }
      } else if (action === "Cancel") {
        this.pendingServiceId = null;
        this.isModalVisible = false;
      }
    },

    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>


<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.board {
  width: 100%;
  max-width: 1440px;
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.controls {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

input[type="text"],
select {
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

th,
td {
  text-align: left;
  padding: 12px;
  font-size: 1rem;
}

th {
  background-color: #007bff;
  color: white;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #e7e9f8;
}

.action-container {
  display: flex;
  gap: 10px;
  justify-content: center;
}

button {
  padding: 8px 12px;
  font-size: 0.9rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:first-child {
  background-color: #28a745;
  color: white;
}

button:last-child {
  background-color: #dc3545;
  color: white;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
}

.pagination button:disabled {
  background-color: #e9ecef;
  color: #6c757d;
  cursor: not-allowed;
}

::-webkit-scrollbar {
  width: 20px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}
 
::-webkit-scrollbar-thumb {
  background: #b2cbde; 
  border-radius: 10px;
  border: 1px solid black;
}

::-webkit-scrollbar-thumb:hover {
  background: #304674; 
}


.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
  max-width: 500px;
  width: 90%;
  animation: fadeIn 0.3s ease-out;
  height: 500px;
  overflow-y: auto;
}

.modal h2 {
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
  text-align: center; 
}

.modal img {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); 
}

.details {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.detail-item {
  display: flex;
  align-items: left;
  flex-direction: column;
}

.label {
  font-weight: bold;
  color: #333;
  flex: 1;
  text-align: left;
}

.value {
  color: #555;
  flex: 2;
  /* text-align: right; */
}

.modal button {
  margin-top: 20px;
  padding: 10px 15px;
  border: none;
  background: #28a745; 
  color: white;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  display: block; 
  width: 100%; 
  text-align: center;
  transition: background-color 0.3s;
}

.modal button:hover {
  background: #218838;
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

.input-text {
  width: 95%;
  padding: 10px;
  font-size: 1rem;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.input-text:focus {
  border-color: #28a745;
  outline: none;
}

.textarea-input {
  width: 95%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  resize: vertical;
  margin-top: 5px;
}

.textarea-input:focus {
  border-color: #28a745;
  outline: none;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.toggle-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.toggle-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle {
  position: relative;
  width: 96px;
  height: 48px;
  background-color: #f87171; /* Rose color */
  border-radius: 24px;
  transition: background-color 0.3s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.toggle-icon {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 40px;
  height: 40px;
  background-color: #f9fafb; /* Light gray */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transform: rotate(-180deg);
  transition: transform 0.3s, left 0.3s;
}

.toggle-input:checked + .toggle {
  background-color: #34d399; 
}

.toggle-input:checked + .toggle .toggle-icon {
  left: 52px;
  transform: rotate(0deg);
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

.image-preview {
  /* width: 100px; */
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.image-preview:hover {
  transform: scale(1.05);
}

.hidden-file-input {
  display: none;
}

</style>
