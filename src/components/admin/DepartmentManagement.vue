<template> 
  <div class="wrapper">
    <div class="board">
      <h1>Danh sách chuyên khoa</h1>

      <div v-if="isLoading" class="loading">
        <p>Đang tải dữ liệu</p>
        <LoadingComponent />
      </div>

      <div v-else>
        <div class="controls">
          <input type="text" v-model="searchQuery" placeholder="Tìm kiếm theo tên" />
          <select v-model="rowsPerPage">
            <option v-for="option in rowsOptions" :key="option" :value="option">
              {{ option }} hàng
            </option>
          </select>
        </div>

        <table border="1" cellpadding="10">
          <thead>
            <tr>
              <th style="width: 30px;">#</th>
              <th style="width: 200px;">Tên chuyên khoa</th>
              <th style="width: 700px;">Mô tả</th>
              <th style="width: 200px;"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(department, index) in filteredDepartments"
              :key="department.departmentId"
            >
              <td>{{ index + 1 + (currentPage - 1) * rowsPerPage }}</td>
              <td>{{ department.departmentName }}</td>
              <td>{{ department.departmentDescription }}</td>
              <td class="action-container">
                <button @click="viewDepartmentDetail(department.departmentId)">
                  Chi tiết
                </button>
                <button @click="cancelDepartment(department.departmentId)">Hủy</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="pagination">
          <button
            :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)"
          >
            Trước
          </button>
          <span>Trang {{ currentPage }} / {{ totalPages }}</span>
          <button
            :disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)"
          >
            Tiếp
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LoadingComponent from "../tools/LoadingComponent.vue";

export default {
  components: {
    LoadingComponent,
  },
  data() {
    return {
      departments: [],
      rowsPerPage: 5,
      currentPage: 1,
      searchQuery: "",
      rowsOptions: [5, 10, 20, 50],
      isLoading: true,
    };
  },
  computed: {
    filteredDepartments() {
      const filtered = this.departments.filter((department) =>
        department.departmentName
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );

      const start = (this.currentPage - 1) * this.rowsPerPage;
      return filtered.slice(start, start + this.rowsPerPage);
    },
    totalPages() {
      const filtered = this.departments.filter((department) =>
        department.departmentName
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
      return Math.ceil(filtered.length / this.rowsPerPage);
    },
  },
  methods: {
    fetchData() {
      this.isLoading = true;
      axios
        .get("https://api.unime.site/UNIME/departments/get/departmentList")
        .then((response) => {
          this.departments = response.data.result;
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    viewDepartmentDetail(id) {
      console.log(`Viewing Department with id: ${id}`);
    },
    cancelDepartment(id) {
      console.log(`Cancelling Department with id: ${id}`);
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

.loading{
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
  border: none;
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
</style>
