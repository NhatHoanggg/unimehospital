<template>
  <div class="hospital">
    <img
      src="@/assets/background-2.jpg"
      alt="hospital"
      class="hospital-image"
    />
    <div class="search-bar">
      <DepartmentListComponent
        style="width: 200px"
        @department-selected="handleDepartmentSelected"
      />
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Tìm kiếm bác sĩ hoặc dịch vụ..."
      />
      <button @click="handleSearchClick">Tìm kiếm</button>
    </div>
  </div>

  <div class="appointment-page">
    <div class="tabs">
      <button :class="{ active: currentTab === 'doctor' }" @click="goToDoctors">
        Bác sĩ
      </button>
      <button
        :class="{ active: currentTab === 'service' }"
        @click="goToServices"
      >
        Dịch vụ
      </button>
    </div>
  </div>

  <div class="doctor-container">
    <div v-if="isLoading" class="loading">
      <p>Đang tải dữ liệu</p>
      <LoadingComponent />
    </div>

    <div v-else class="doctor-list">
      <div
        class="doctor-card"
        v-for="doctor in paginatedDoctors"
        :key="doctor.doctorId"
      >
        <div class="doctor-image">
          <img :src="doctor.doctorImage" alt="Doctor Image" />
        </div>
        <div class="doctor-info">
          <h3>{{ doctor.doctorName }}</h3>
          <p>Chuyên khoa: {{ doctor.departmentName }}</p>
          <p>Email: {{ doctor.doctorEmail }}</p>
          <p>Ngày sinh: {{ formatDate(doctor.doctorDateOfBirth) }}</p>
          <div class="doctor-actions">
            <button class="btn view-more" @click="viewMore(doctor)">
              Xem thêm
            </button>
            <button class="btn book-appointment" @click="bookDoctor(doctor)">
              Đặt lịch
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination">
      <button
        class="pagination-btn"
        @click="changePage(-1)"
        :disabled="currentPage === 1"
      >
        <i class="fas fa-chevron-left"></i>
      </button>
      <span class="page-indicator">{{ currentPage }} / {{ totalPages }}</span>
      <button
        class="pagination-btn"
        @click="changePage(1)"
        :disabled="currentPage === totalPages"
      >
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import DepartmentListComponent from "../tools/DepartmentListComponent.vue";
import axios from "axios";
import LoadingComponent from "../tools/LoadingComponent.vue";

export default {
  data() {
    return {
      currentTab: "doctor",
      selectedDepartment: null,
      searchQuery: "",

      departmentId: null,
      doctors: [],
      doctorsTmp: [],
      isLoading: true,

      currentPage: 1,
      itemsPerPage: 5,
      totalPages: 1,
    };
  },
  components: {
    DepartmentListComponent,
    LoadingComponent,
  },

  computed: {
    paginatedDoctors() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.doctors.slice(start, end);
    },
  },

  mounted() {
    this.fetchDoctors();
  },

  methods: {
    goToDoctors() {
      this.currentTab = "doctor";
      this.$router.push("/booking/doctors");
    },
    goToServices() {
      this.currentTab = "service";
      this.$router.push("/booking/services");
      console.log("Go to services");
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString("vi-VN");
    },

    async handleSearchClick() {
      this.isLoading = true;
      await axios
        .get(
          `https://api.unime.site/UNIME/doctors/get/byName?doctor_name=${this.searchQuery}`
        )
        .then((response) => {
          this.doctors = response.data.result || [];
          this.doctorsTmp = this.doctors;
          this.totalPages = Math.ceil(this.doctors.length / this.itemsPerPage);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    async handleDepartmentSelected(payload) {
      this.selectedDepartment = {
        departmentName: payload.department.label,
        departmentId: payload.department.value,
      };

      this.departmentId = this.selectedDepartment.departmentId;
      try {
        this.isLoading = true;
        const response = await axios.get(
          `https://api.unime.site/UNIME/doctors/get/byDepartment?doctor_departmentId=${this.departmentId}`
        );
        this.doctors = response.data.result || [];
        this.doctorsTmp = this.doctors;

        this.totalPages = Math.ceil(this.doctors.length / this.itemsPerPage);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        this.isLoading = false;
      }
      // const result = this.doctors
      // .filter(doctor => doctor.departmentName === this.selectedDepartment.departmentName);

      // this.doctors = result;
      // this.totalPages = Math.ceil(this.doctors.length / this.itemsPerPage);
    },

    async fetchDoctors() {
      try {
        this.isLoading = true;
        const response = await axios.get(
          `https://api.unime.site/UNIME/doctors/get/doctorList`
        );
        this.doctors = response.data.result || [];
        this.doctorsTmp = this.doctors;

        this.totalPages = Math.ceil(this.doctors.length / this.itemsPerPage);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        this.isLoading = false;
      }
    },

    viewMore(doctor) {
      this.$router.push({
        name: "DoctorDetail",
        params: { id: doctor.doctorId },
      });
      localStorage.setItem("selectedDoctor", JSON.stringify(doctor));
    },

    bookDoctor(doctor) {
      this.$router.push({
        name: "BookDoctorPage",
        params: { id: doctor.doctorId },
      });
      localStorage.setItem("selectedDoctor", JSON.stringify(doctor));
    },

    changePage(direction) {
      this.currentPage += direction;
    },
  },
};
</script>

<style scoped>
.appointment-page {
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px;
}
.hospital {
  position: relative;
  text-align: center;
}

.hospital-image {
  width: 1440px;
  height: 400px;
  object-fit: cover;
}

.search-bar {
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-bar input {
  padding: 10px;
  font-size: 16px;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
  outline: none;
}

.search-bar button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #002d72;
  color: white;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
}

.search-bar button:hover {
  background-color: #0056b3;
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.tabs button {
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  background-color: #f0f0f0;
}

.tabs button.active {
  background-color: #002d72;
  color: #fff;
}

.tab-content {
  margin-top: 20px;
}

.doctor-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px;
  text-align: left;
}

.doctor-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.doctor-card {
  display: flex;
  border: 2px solid #d0d0d0;
  border-radius: 10px;
  padding: 20px;
  background-color: #f9f9f9;
  width: 80%;
}

.doctor-image img {
  width: 120px;
  height: 120px;
  border-radius: 10px;
  object-fit: cover;
}

.doctor-info {
  margin-left: 20px;
  flex: 1;
}

.doctor-info h3 {
  margin: 0 0 10px;
  font-size: 18px;
  color: #002d72;
}

.doctor-info p {
  margin: 5px 0;
  color: #333;
}

.doctor-info p {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Số dòng hiển thị */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}

.doctor-actions {
  margin-top: 10px;
}

.btn {
  padding: 8px 16px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.view-more {
  background-color: #009fe3;
  color: white;
}

.book-appointment {
  background-color: #002d72;
  color: white;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  justify-items: center;
}

.pagination-btn {
  background-color: #009fe3;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.page-indicator {
  margin: 0 10px;
  font-size: 24px;
}
.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
