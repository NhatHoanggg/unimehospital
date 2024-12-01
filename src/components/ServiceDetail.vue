<template>
  <div class="service-detail">
    <div class="service-detail-header">
      <h1>Chi tiết dịch vụ đã chọn</h1>
    </div>
    <div class="service-detail-content">
      <div class="service-detail-image">
        <img :src="defaultImage" alt="Service Image" />
      </div>
      <div class="service-detail-info">
        <h2>Chuyên khoa: {{ service.departmentName }}</h2>
        <h2>Tên dịch vụ: {{ service.serviceName }}</h2>
        <p>Mô tả: {{ service.serviceDescription }}</p>
        <p>Giá: {{ service.servicePrice }} đ</p>
        <button class="btn book-appointment" @click="bookService(service)">
          Đặt lịch
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
      service: {},
      defaultImage: "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1732272155/ox3qndq1v7iko2rejrex.png",
    };
  },
  mounted() {
    const serviceId = this.$route.params.id;
    const serviceData = localStorage.getItem("selectedService");
    if (serviceData) {
      const service = JSON.parse(serviceData);
      if (service.serviceId == serviceId) {
        this.service = service;
        this.defaultImage = service.serviceImage;
      } else {
        this.fetchServiceData(serviceId);
      }
    } else {
      this.fetchServiceData(serviceId);
    }
  },
  methods: {
    async fetchServiceData(id) {
      try {
        const response = await axios.get(
          `https://6720cd2f98bbb4d93ca61a67.mockapi.io/api/v1/doctors/${id}`
        );
        this.service = response.data;
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    },
    bookService(service) {
      this.$router.push({
        name: "BookServicePage",
        params: { id: service.serviceId },
      });
      localStorage.setItem("selectedDoctor", JSON.stringify(service));
    },
  },
};
</script>

<style>
.service-detail {
  margin: 20px;
  margin-top: 100px;
  padding: 20px;
  border: 1px solid black;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.service-detail-header {
  text-align: center;
  margin-bottom: 20px;
}

.service-detail-content {
  display: flex;
  gap: 20px;
}

.service-detail-image img {
  width: 300px;
  height: 300px;
  border-radius: 5px;
  object-fit: cover;
  border: 1px solid black;
}

.btn.book-appointment {
  padding: 10px 20px;
  background-color: #002d72;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
