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
              <button @click="editUser(user.patientId)" class="edit-btn">
                Edit
              </button>
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
  </div>
</template>

<script>
import axios from "axios";
import LoadingComponent from "../tools/LoadingComponent.vue";

export default {
  data() {
    return {
      users: [],
      rowsPerPage: 5,
      currentPage: 1,
      searchQuery: "",
      rowsOptions: [5, 10, 20, 50],
      isLoading: true,
    };
  },
  components: {
    LoadingComponent,
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
    formatGender(gender) {
      return gender ? "Nam" : "Nữ";
    },
    editUser(id) {
      console.log(`Editing user with id: ${id}`);
    },
    deleteUser(id) {
      console.log(`Deleting user with id: ${id}`);
      this.users = this.users.filter((user) => user.patientId !== id);
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
</style>
