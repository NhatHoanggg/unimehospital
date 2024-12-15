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
      <input type="text" v-model="searchQuery" placeholder="Tìm kiếm bác sĩ hoặc dịch vụ..." />
      <button @click="handleSearchClick">Tìm kiếm</button>
    </div>
  </div>

  <div class="appointment-page">
    <div class="tabs">
      <button
        :class="{ active: currentTab === 'doctor' }"
        @click="goToDoctors"
      >
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
  <div class="service-container">
    <div v-if="isLoading" class="loading">
      <p>Đang tải dữ liệu</p>
      <LoadingComponent />
    </div>
    <div v-else class="service-list">
      <div class="service-card" v-for="service in paginatedServices" :key="service.serviceId">
        <div class="service-image">
          <img :src="service.serviceImage" alt="Service Image" />
        </div>
        <div class="service-info">
          <h3>{{ service.serviceName }}</h3>
          <p><strong>Khoa: </strong>{{ service.departmentName }}</p>
          <p><strong>Giá: </strong>{{ service.servicePrice.toLocaleString() }} VND</p>
          <p>{{ service.serviceDescription }}</p>
          <div class="service-actions">
            <button class="btn view-more" @click="viewMore(service)">Xem thêm</button>
            <button class="btn book-service" @click="bookService(service)">Đặt lịch</button>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination">
      <button 
        class="pagination-btn" 
        @click="changePage(-1)" 
        :disabled="currentPage === 1">
        <i class="fas fa-chevron-left"></i>
      </button>
      <span class="page-indicator">{{ currentPage }} / {{ totalPages }}</span>
      <button 
        class="pagination-btn" 
        @click="changePage(1)" 
        :disabled="currentPage === totalPages">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import DepartmentListComponent from "./tools/DepartmentListComponent.vue";
import axios from "axios";

export default {
  name: "BookService",
  components: {
    DepartmentListComponent,
  },
  data() {
    return {
      currentTab: "service",
      selectedDepartment: null,
      searchQuery: "",
      
      services: [],
      currentPage: 1,
      itemsPerPage: 5,
      totalPages: 1,
      isLoading: true,
    };
  },
  computed: {
    paginatedServices() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.services.slice(start, end);
    },
  },
  methods: {
    goToDoctors() {
      this.currentTab = 'doctor';
      this.$router.push('/booking/doctors');
    },
    goToServices() {
      this.currentTab = 'service';
      this.$router.push('/booking/services');
      console.log('Go to services');
    },

    async handleSearchClick() {
      this.isLoading = true;
      await axios.get(`https://api.unime.site/UNIME/services/get/byName/${this.searchQuery}`)
      .then((response) => {
        this.services = response.data.result;
        this.totalPages = Math.ceil(this.services.length / this.itemsPerPage);
      })
      .catch((error) => {
        console.error('Error fetching services:', error);
      })
      .finally(() => {
        this.isLoading = false;
      });
    },

    handleDepartmentSelected(payload) {
      this.selectedDepartment = {
        departmentName: payload.department.label,
        departmentId: payload.department.value
      }
      const result = this.services
      .filter(service => service.departmentName === this.selectedDepartment.departmentName);
      
      this.services = result;
      this.totalPages = Math.ceil(this.services.length / this.itemsPerPage);
    },

    async fetchServices() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `https://api.unime.site/UNIME/services/get/serviceList`
        );
        if (response.data.code === 1000) {
          this.services = response.data.result || [];
          this.totalPages = Math.ceil(this.services.length / this.itemsPerPage);
        } else {
          console.error("Failed to fetch services. Code:", response.data.code);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        this.isLoading = false;
      }
    },
    viewMore(service) {
      this.$router.push({ name: "ServiceDetail", params: { id: service.serviceId } });
      localStorage.setItem("selectedService", JSON.stringify(service));
    },
    bookService(service) {
      this.$router.push({ name: "BookServicePage", params: { id: service.serviceId } });
      localStorage.setItem("selectedService", JSON.stringify(service));
    },
    changePage(direction) {
      this.currentPage += direction;
    },
  },
  mounted() {
    this.fetchServices();
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

.service-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px;
  text-align: left;
}

.service-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.service-card {
  display: flex;
  border: 2px solid #d0d0d0;
  border-radius: 10px;
  padding: 20px;
  background-color: #f9f9f9;
  width: 80%;
}

.service-image img {
  width: 120px;
  height: 120px;
  border-radius: 10px;
  object-fit: cover;
}

.service-info {
  margin-left: 20px;
  flex: 1;
}

.service-info h3 {
  margin: 0 0 10px;
  font-size: 18px;
  color: #002d72;
}

.service-info p {
  margin: 5px 0;
  color: #333;
}

.service-actions {
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

.book-service {
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
