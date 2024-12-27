<template>
  <div class="employee-management">
    <div v-if="isLoading" class="loading">
      <p>Đang tải dữ liệu</p>
      <LoadingComponent />
    </div>
    <div v-else>
      <h1>Quản lý Nhân viên</h1>
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

      <table class="employee-table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Chuyên khoa</th>
            <th>Trạng thái</th>
            <th>Email</th>
            <th>SĐT</th>
            <th>Giới tính</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in filteredEmployees" :key="employee.employeeId">
            <td>{{ employee.employeeName }}</td>
            <td>{{ employee.departmentName }}</td>
            <td>{{ employee.employeeStatus }}</td>
            <td>{{ employee.employeeEmail }}</td>
            <td>{{ employee.employeePhoneNumber }}</td>
            <td>{{ formatGender(employee.employeeGender) }}</td>
            <td>
              <button
                @click="editEmployee(employee.employeeId)"
                class="edit-btn"
              >
                Edit
              </button>
              <button
                @click="deleteEmployee(employee.employeeId)"
                class="delete-btn"
              >
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
      employees: [],
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
    filteredEmployees() {
      const filtered = this.employees.filter((employee) => {
        return employee.employeeName
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });

      const start = (this.currentPage - 1) * this.rowsPerPage;
      return filtered.slice(start, start + this.rowsPerPage);
    },
    totalPages() {
      const filtered = this.employees.filter((employee) => {
        return employee.employeeName
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
        .get("https://api.unime.site/UNIME/employees", {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        })
        .then((response) => {
          this.employees = response.data.result;
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
    editEmployee(id) {
      console.log(`Editing employee with id: ${id}`);
    },
    deleteEmployee(id) {
      console.log(`Deleting employee with id: ${id}`);
      this.employees = this.employees.filter(
        (employee) => employee.employeeId !== id
      );
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
.employee-management {
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

.employee-table {
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
