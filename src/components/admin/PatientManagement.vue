<template>
  <div class="patient-management">
    <div v-if="isLoading" class="loading">
      <p>Đang tải dữ liệu</p>
      <LoadingComponent />
    </div>
    <div v-else>
      <h1>Danh sách Bệnh nhân</h1>
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

      <table class="patient-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Username</th>
            <th>Trạng thái</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(patient, index) in filteredPatients" :key="patient.patientId">
            <td>{{ index + 1 + rowsPerPage*(currentPage-1)}}</td>
            <td>{{ patient.patientName }}</td>
            <td>{{ patient.patientUsername }}</td>
            <td>
              <label class="switch">
                <input
                  type="checkbox"
                  :checked="patient.patientStatus === 'ACTIVE'"
                  @change="togglePatientStatus(patient)"
                />
                <span class="slider"></span>
              </label>
            </td>
            <td>{{ patient.patientEmail }}</td>
            <td>
              <button @click="showPatientDetails(patient)" class="detail-btn">
                Chi tiết
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

    <div v-if="selectedPatient" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>Thông tin chi tiết bệnh nhân</h2>
          <button class="close-btn" @click="closeModal">&times;</button>
        </div>

        <div class="modal-body">
          <div class="patient-profile">
            <img
              :src="selectedPatient.patientImage"
              :alt="selectedPatient.patientName"
              class="patient-profile-image"
            />
            <div class="patient-info">
              <h3>{{ selectedPatient.patientName }}</h3>
              <p><strong>Username:</strong> {{ selectedPatient.patientUsername }}</p>
              <p><strong>Ngày sinh:</strong> {{ formatDate(selectedPatient.patientDateOfBirth) }}</p>
              <p><strong>Giới tính:</strong> {{ selectedPatient.patientGender ? 'Nam' : 'Nữ' }}</p>
              <p><strong>Email:</strong> {{ selectedPatient.patientEmail }}</p>
              <p><strong>Số điện thoại:</strong> {{ selectedPatient.patientPhoneNumber }}</p>
              <p><strong>Địa chỉ:</strong> {{ selectedPatient.patientAddress }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LoadingComponent from "../tools/LoadingComponent.vue";

export default {
  data() {
    return {
      patients: [],
      rowsPerPage: 5,
      currentPage: 1,
      searchQuery: "",
      rowsOptions: [5, 10, 20, 50],
      isLoading: true,
      selectedPatient: null,
    };
  },
  components: {
    LoadingComponent,
  },
  computed: {
    filteredPatients() {
      const filtered = this.patients.filter((patient) => {
        return patient.patientName
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });

      const start = (this.currentPage - 1) * this.rowsPerPage;
      return filtered.slice(start, start + this.rowsPerPage);
    },
    totalPages() {
      const filtered = this.patients.filter((patient) => {
        return patient.patientName
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
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        })
        .then((response) => {
          this.patients = response.data.result;
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    togglePatientStatus(patient) {
      const BEARER_TOKEN = localStorage.getItem("token");
      axios
        .patch(`https://api.unime.site/UNIME/patients/${patient.patientId}`, {},{
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        })
        .then(() => {
          patient.patientStatus =
            patient.patientStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";
        })
        .catch((error) => {
          console.error("Error toggling patient status: ", error);
        });
    },
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString("vi-VN", options);
    },
    showPatientDetails(patient) {
      this.selectedPatient = patient;
    },
    closeModal() {
      this.selectedPatient = null;
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

.patient-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.patient-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
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

.detail-btn {
  padding: 6px 12px;
  width: 100%;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.detail-btn:hover {
  background-color: #1976D2;
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
  border: none;
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

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  padding: 16px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-body {
  padding: 20px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.close-btn:hover {
  color: #333;
}

.patient-profile {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
}

.patient-profile-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

.patient-info {
  flex: 1;
  text-align: left;
}

.patient-info h3 {
  margin-top: 0;
  color: #333;
  font-size: 1.5rem;
}

.patient-details{
  display: flex;
  flex-direction: column;
  text-align: justify;
}

.patient-details h4 {
  color: #2196F3;
  margin: 16px 0 8px 0;
}

.patient-details p {
  margin: 0 0 16px 0;
  line-height: 1.6;
}
.switch {
  position: relative;
  display: inline-block;
  width: 34px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 20px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:checked + .slider:before {
  transform: translateX(14px);
}

</style>