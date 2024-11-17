<template>
  <div class="service-container">
    <div class="service-list">
      <div class="service-card" v-for="service in services" :key="service.serviceId">
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
      <button class="pagination-btn" @click="prevPage" :disabled="currentPage === 1">◀</button>
      <span class="page-indicator">{{ currentPage }}</span>
      <button class="pagination-btn" @click="nextPage">▶</button>
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
      currentPage: Number(this.$route.query.page) || 1,
      itemsPerPage: 5, 
    };
  },
  watch: {
    "$route.query.page"(newPage) {
      this.currentPage = Number(newPage) || 1;
      this.fetchServices();
    },
  },
  methods: {
    async fetchServices() {
      try {
        const response = await axios.get(
          `https://api.unime.site/UNIME/services/get/serviceList?page=${this.currentPage}&limit=${this.itemsPerPage}`
        );
        if (response.data.code === 1000) {
          this.services = response.data.result;
        } else {
          console.error("Failed to fetch services. Code:", response.data.code);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    },
    nextPage() {
      this.updatePage(this.currentPage + 1);
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.updatePage(this.currentPage - 1);
      }
    },
    updatePage(page) {
      this.$router.push({ query: { page } });
    },
    viewMore(service) {
      this.$router.push({ name: "ServiceDetail", params: { id: service.serviceId } });
      localStorage.setItem("selectedService", JSON.stringify(service));
    },
    bookService(service) {
      this.$router.push({ name: "BookServicePage", params: { id: service.serviceId } });
      localStorage.setItem("selectedService", JSON.stringify(service));
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
