<template>
  <div class="service-container">
    <div class="service-list">
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
        Previous
      </button>
      <span class="page-indicator">{{ currentPage }} / {{ totalPages }}</span>
      <button 
        class="pagination-btn" 
        @click="changePage(1)" 
        :disabled="currentPage === totalPages">
        Next
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BookService",
  data() {
    return {
      services: [],
      currentPage: 1,
      itemsPerPage: 5,
      totalPages: 1,
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
    async fetchServices() {
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
</style>
