<template>
  <div class="employee-management">
    <h1>Quản lý Nhân viên</h1>
    <div>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Tìm kiếm theo tên"
      />
      <select v-model="rowsPerPage">
        <option v-for="option in rowsOptions" :key="option" :value="option">
          {{ option }} dòng
        </option>
      </select>

      <table border="1" cellpadding="10">
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
              <button @click="editEmployee(employee.employeeId)">Edit</button>
              <button @click="deleteEmployee(employee.employeeId)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div>
        <button
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
        >
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      employees: [],
      rowsPerPage: 5,
      currentPage: 1,
      searchQuery: "",
      rowsOptions: [5, 10, 20, 50],
    };
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
      const BEARER_TOKEN = localStorage.getItem('token');
      axios
        .get("https://api.unime.site/UNIME/employees", {
          headers: {
            Authorization: `Bearer ${JSON.parse(BEARER_TOKEN)}`,
          },
        })
        .then((response) => {
          this.employees = response.data.result;
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
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
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  text-align: left;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}

button {
  margin-right: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

button:hover {
  background-color: #ddd;
}

input[type="text"] {
  margin-bottom: 10px;
  padding: 5px;
  width: 200px;
}

select {
  margin-bottom: 10px;
  padding: 5px;
}
</style>
