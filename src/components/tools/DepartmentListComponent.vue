<template>
    <div class="department-list-container">
      <div v-if="loading" class="loading">
        Đang tải dữ liệu...
      </div>
      <div v-else-if="error" class="error">
        {{ error }}
      </div>
      <div v-else>
        <multiselect
          v-model="selectedDepartment"
          :options="departments"
          placeholder="Chọn chuyên khoa"
          label="label"
          track-by="value"
          :searchable="true"
          :close-on-select="true"
          :allow-empty="false"
          class="multi-select"
        />
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Multiselect from "vue-multiselect";
  import "vue-multiselect/dist/vue-multiselect.min.css";

  export default {
    name: "DepartmentListComponent",
    components: { Multiselect },
    data() {
      return {
        departments: [], 
        selectedDepartment: null, 
        loading: false, 
        error: null, 
      };
    },
    methods: {
      async fetchDepartments() {
        this.loading = true;
        this.error = null;
        try {
          const response = await axios.get(
            "https://api.unime.site/UNIME/departments/get/departmentList"
          );
          if (response.data.code === 1000) {
            // Map dữ liệu để phù hợp với Multiselect
            this.departments = response.data.result.map((dept) => ({
              value: dept.departmentId,
              label: dept.departmentName,
              description: dept.departmentDescription,
            }));
          } else {
            throw new Error("Không thể tải danh sách phòng ban.");
          }
        } catch (error) {
          this.error = "Đã xảy ra lỗi khi tải danh sách phòng ban.";
        } finally {
          this.loading = false;
        }
      },
    },
    mounted() {
      this.fetchDepartments();
    },
  };
  </script>
  
  <style scoped>
  .department-list-container {
    /* padding: 20px; */
    max-width: 600px;
  }
  
  .loading {
    text-align: center;
    font-size: 18px;
    color: #555;
  }
  
  .error {
    color: red;
    text-align: center;
    font-size: 16px;
  }
  
  .multi-select {
    margin-top: 0;
  }
  
  </style>
  