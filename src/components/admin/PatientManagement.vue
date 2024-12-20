<template>
  <div class="patient-management">
    <h1>Quản lý bệnh nhân</h1>
    <div v-if="isLoading" class="loading">
      <p>Đang tải dữ liệu</p>
      <LoadingComponent />
    </div>
    <div v-else>
      <div class="search-container">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Tìm kiếm theo tên"
          class="search-input"
        />
        <select v-model="rowsPerPage" class="rows-select">
          <option v-for="option in rowsOptions" :key="option" :value="option">
            {{ option }} dòng
          </option>
        </select>
      </div>

      <table class="user-table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>SĐT</th>
            <th>Giới tính</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.patientId">
            <td>{{ user.patientName }}</td>
            <td>{{ user.patientEmail }}</td>
            <td>{{ user.patientPhoneNumber }}</td>
            <td>{{ formatGender(user.patientGender) }}</td>
            <td>
              <!-- <button @click="editUser(user.patientId)" class="edit-btn">
                Edit
              </button> -->
              <button @click="openDetail(user)" class="edit-btn">Detail</button>
              <button @click="deleteUser(user.patientId)" class="delete-btn">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pagination">
        <button
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
          class="pagination-btn"
        >
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
          class="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
    <!-- Modal -->
    <div v-if="selectedUser" class="modal-overlay" @click="closeDetail">
      <div class="modal" @click.stop>
        <img :src="selectedUser.patientImage" alt="patient-avt">
        <div class="details">
          <div class="detail-item">
            <span class="label">Username:</span>
            <span class="value">{{ selectedUser.patientUsername }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Tên bệnh nhân:</span>
            <span class="value">{{ selectedUser.patientName }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Email:</span>
            <span class="value">{{ selectedUser.patientEmail }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Địa chỉ:</span>
            <span class="value">{{ selectedUser.patientAddress || 'Không có mô tả' }}</span>
          </div>
          <div class="detail-item">
            <span class="label">SĐT:</span>
            <span class="value">{{ selectedUser.patientPhoneNumber || 'Không có mô tả' }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Giới tính:</span>
            <span class="value">{{ selectedUser.patientGender ? 'Nam' : 'Nữ' }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Ngày sinh:</span>
            <span class="value">{{ selectedUser.patientDateOfBirth || 'Không có mô tả' }}</span>
          </div>
        </div>
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
</template>

<script>
import axios from "axios";
import LoadingComponent from "../tools/LoadingComponent.vue";
import AlertModal from "../tools/AlertModal.vue";
import { toast } from 'vue3-toastify';

export default {
  data() {
    return {
      users: [],
      rowsPerPage: 5,
      currentPage: 1,
      searchQuery: "",
      rowsOptions: [5, 10, 20, 50],
      isLoading: true,
      selectedUser: null,

      isModalVisible: false,
      modalType: "info",
      modalTitle: "",
      modalContent: "",
      pendingPatientId: null,
    };
  },
  components: {
    LoadingComponent,
    AlertModal
  },
  computed: {
    filteredUsers() {
      const filtered = this.users.filter((user) => {
        return user.patientName
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });

      const start = (this.currentPage - 1) * this.rowsPerPage;
      return filtered.slice(start, start + this.rowsPerPage);
    },
    totalPages() {
      const filtered = this.users.filter((user) => {
        return user.patientName
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });
      return Math.ceil(filtered.length / this.rowsPerPage);
    },
  },
  methods: {
    fetchData() {
      this.isLoading = true;
      const BEARER_TOKEN = localStorage.getItem("token");
      axios
        .get("https://api.unime.site/UNIME/patients", {
          headers: {
            Authorization: `Bearer ${JSON.parse(BEARER_TOKEN)}`,
          },
        })
        .then((response) => {
          this.users = response.data.result;
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    openDetail(user) {
      this.selectedUser = user;
    },
    closeDetail() {
      this.selectedUser = null;
    },

    formatGender(gender) {
      return gender ? "Nam" : "Nữ";
    },
    editUser(id) {
      console.log(`Editing user with id: ${id}`);
    },
    deleteUser(id) {
      // console.log(`Deleting user with id: ${id}`);
      // this.users = this.users.filter((user) => user.patientId !== id);
      this.pendingPatientId = id;
      this.modalType = "warning";
      this.modalTitle = "Xác nhận xóa bệnh nhân";
      this.modalContent = "Bạn có chắc chắn muốn xóa bệnh nhân này không?";
      this.isModalVisible = true;
    },

    handleModalAction(action) {
        console.log("Modal action: ", action);
        const BEARER_TOKEN = localStorage.getItem("token");

        if (action === "OK" && this.pendingPatientId !== null) {
          axios
            .delete(`https://api.unime.site/UNIME/patients/${this.pendingPatientId}`, {
              headers: {
                Authorization: `Bearer ${JSON.parse(BEARER_TOKEN)}`,
              },
            })
            .then(() => {
              this.users = this.users.filter(
                (user) => user.patientId !== this.pendingUserId
              );
              this.pendingPatientId = null;
              this.isModalVisible = false;
              this.currentPage = 1;
              toast.success(`Xóa bệnh nhân thành công!`,
                    {
                      rtl: false,
                      limit: 3,
                      position: toast.POSITION.TOP_RIGHT,
                    },); 
            })
            .catch((error) => {
              console.error("Error deleting user: ", error);
              this.isModalVisible = false;
            });
        }
        else if (action === "Cancel") {
          this.isModalVisible = false;
          this.pendingPatientId = null;
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
.patient-management {
  margin-top: 64px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
}

.search-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.search-input,
.rows-select {
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-input {
  width: 250px;
}

.rows-select {
  width: 150px;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th,
td {
  padding: 12px;
  text-align: left;
  font-size: 1rem;
  color: #555;
}

th {
  background-color: #f4f4f4;
}

tr:nth-child(even) {
  background-color: #fafafa;
}

button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #f0f0f0;
}

.edit-btn {
  background-color: #4caf50;
  color: white;
  margin-right: 20px;
}

.edit-btn:hover {
  background-color: #45a049;
}

.delete-btn {
  background-color: #f44336;
  color: white;
}

.delete-btn:hover {
  background-color: #e53935;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.pagination-btn {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination-btn:hover {
  background-color: #0056b3;
}

.pagination-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

/* .modal p {
  margin: 10px 0;
  font-size: 1rem;
  color: #555;
}

.modal p strong {
  color: #333;
} */

.details {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  text-align: right;
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

</style>
