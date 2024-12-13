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
                <button @click="openDetail(service)">Detail</button>
                <button @click="cancelService(service.serviceId)">Cancel</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="pagination">
          <button :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">Previous</button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">Next</button>
        </div>
      </div>

      <!-- Modal -->
      <div v-if="selectedService" class="modal-overlay" @click="closeDetail">
        <div class="modal" @click.stop>
          <h2>Chi tiết dịch vụ</h2>
          <p><strong>Tên dịch vụ:</strong> {{ selectedService.serviceName }}</p>
          <p><strong>Chuyên khoa:</strong> {{ selectedService.departmentName }}</p>
          <p><strong>Giá:</strong> {{ selectedService.servicePrice }} VND</p>
          <p><strong>Mô tả:</strong> {{ selectedService.serviceDescription || 'Không có mô tả' }}</p>
          <img :src="selectedService.serviceImage" alt="service-thumbnail">
          <button @click="closeDetail">Đóng</button>
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

      isModalVisible: false,
      modalType: "info",
      modalTitle: "",
      modalContent: "",
      pendingServiceId: null,
    };
  },
  computed: {
    filteredServices() {
      const filtered = this.services.filter((service) =>
        service.serviceName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );

      const start = (this.currentPage - 1) * this.rowsPerPage;
      return filtered.slice(start, start + this.rowsPerPage);
    },
    totalPages() {
      const filtered = this.services.filter((service) =>
        service.serviceName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      return Math.ceil(filtered.length / this.rowsPerPage);
    },
  },
  methods: {
    fetchData() {
      this.isLoading = true;
      axios
        .get("https://api.unime.site/UNIME/services/get/serviceList")
        .then((response) => {
          this.services = response.data.result;
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    openDetail(service) {
      this.selectedService = service;
    },
    closeDetail() {
      this.selectedService = null;
    },
    cancelService(id) {
        // console.log(`Cancelling Service with id: ${id}`);
        this.pendingServiceId = id;
        this.modalType = "warning";
        this.modalTitle = "Xác nhận xóa dịch vụ";
        this.modalContent = "Bạn có chắc chắn muốn xóa dịch vụ này không?";
        this.isModalVisible = true;
      },
      handleModalAction(action) {
        console.log("Modal action: ", action);
        const BEARER_TOKEN = localStorage.getItem("token");

        if (action === "OK" && this.pendingServiceId !== null) {
          // console.log(`Deleting Service with id: ${this.pendingServiceId}`);
          axios
            .delete(`https://api.unime.site/UNIME/services/${this.pendingServiceId}`, {
              headers: {
                Authorization: `Bearer ${JSON.parse(BEARER_TOKEN)}`,
              },
            })
            .then(() => {
              this.services = this.services.filter(
                (service) => service.serviceId !== this.pendingServiceId
              );
              this.pendingServiceId = null;
              this.isModalVisible = false;
              this.currentPage = 1;
              toast.success(`Xóa dịch vụ thành công!`,
                    {
                      rtl: false,
                      limit: 3,
                      position: toast.POSITION.TOP_RIGHT,
                    },); 
            })
            .catch((error) => {
              console.error("Error deleting service: ", error);
            });
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

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 90%;
}

.modal h2 {
  margin-bottom: 15px;
}

.modal img{ 
  width: 100%;
  height: auto;
  margin-bottom: 15px;
}

.modal button {
  margin-top: 15px;
  padding: 8px 12px;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.modal button:hover {
  background: #0056b3;
}
.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
</style>
