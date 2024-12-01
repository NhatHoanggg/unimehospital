<template>
  <div class="container">
    <div class="service-detail-container">
      <div class="service-header">
        <div class="service-image">
          <img :src="service.serviceImage" alt="Service Image" />
        </div>
        <div class="service-info">
          <h2>{{ service.serviceName }}</h2>
          <p><strong>Chuyên khoa:</strong> {{ service.departmentName }}</p>
          <p><strong>Mô tả:</strong> {{ service.serviceDescription }}</p>
          <p><strong>Giá:</strong> {{ service.servicePrice }} đ</p>
        </div>
      </div>
      <div class="service-body">
        <div class="service-body-content">
          <div class="step1">
            <h1>1. Chọn bác sĩ</h1>
            <ChooseDoctor @doctor-selected="handleDoctorSelected"/>
            <div v-if="doctorInfo">
              <!-- <img :src="doctorImage" alt="Doctor Image" /> -->
              <p><strong>Địa chỉ</strong> {{ doctor.doctorAddress }}</p>
              <p><strong>Số điện thoại:</strong> {{ doctor.doctorPhoneNumber }}</p>
              <p><strong>Chuyên khoa:</strong> {{ doctor.departmentName }}</p>
              <p><strong>Ngày sinh:</strong> {{ doctor.doctorDateOfBirth }} </p>
            </div>
          </div>
          <div class="step2">
            <h1>2. Chọn ngày khám</h1>
            <!-- <ChooseDoctor /> -->
          </div>
          
        </div>
      </div>
    </div>
    <button class="button" @click="confirmAppoinment()">
      Xác nhận đặt lịch
    </button>
  </div>
</template>

<script>
import axios from "axios";
// import { toast } from 'vue3-toastify';
import ChooseDoctor from "./ChooseDoctor.vue";

export default {
  data() {
    return {
      serviceId: "",
      doctorId: "",
      doctorImage: "",
      doctorInfo: false,
      doctor: {},
      service: {},
    };
  },
  components: {
    ChooseDoctor,
  },
  mounted() {
    const serviceId = this.$route.params.id;
    const serviceData = localStorage.getItem("selectedService");

    if (serviceData) {
      const service = JSON.parse(serviceData);
      if (service.serviceId == serviceId) {
        this.service = service;
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
          `https://6720cd2f98bbb4d93ca61a67.mockapi.io/api/v1/services/${id}`
        );
        this.service = response.data;
      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    },

    handleDoctorSelected(payload) {
      // console.log("received doctor:", payload.doctor.detail);
      this.doctorId = payload.doctor.value;
      this.doctor = payload.doctor.detail;
      // this.doctorImage = payload.doctor.detail.doctorImage;
      this.doctorInfo = true;
      // console.log("doctor:", this.doctor.doctorId);
    },

    confirmAppoinment() {
      this.$router.push({
        name: "BookingPage",
        params: {
          id: this.serviceId,
        },
      });
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: auto;
  background-color: #f1f5f9;
}

.service-detail-container {
  max-width: 1440px;
  margin: 0 auto;
  margin-top: 64px;
  padding: 20px;
  text-align: left;
}

.service-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.service-image img {
  width: 300px;
  height: 300px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
}

.service-info h2 {
  margin: 0;
  font-size: 24px;
  color: #002d72;
}

.service-info p {
  margin: 10px 0;
  color: #333;
}

.btn.book-appointment {
  padding: 10px 20px;
  background-color: #002d72;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.service-highlight {
  background-color: #f0f8ff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.service-highlight h3 {
  margin-top: 0;
  color: #002d72;
}

.service-highlight p {
  color: #333;
  white-space: pre-wrap;
}

.service-body {
  width: 100%;
  height: auto;
  background-color: #F1F5F9;
  /* margin-top: 70px; */
  align-items: center;
  justify-content: center;
  display: flex;
  color: #2046A9;
}

.service-body-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 1024px;
  border: 3px solid #0047ba;
  border-radius: 20px;
  background-color: white;
  height: auto;
  /* padding: 50px 30px; */
  transition: height 1s ease;
}

.step1{
  padding: 20px;
}

.step2{
  padding: 20px;
}

.button {
  margin-top: 32px;
  margin-bottom: 32px;
  min-width: 192px;
  padding: 15px 20px;
  border: 2px solid #003a9e;
  border-radius: 20px;
  color: #003a9e;
  font-weight: 500;
  font-size: 24px;
  transition: background-color 0.3s ease, color 0.3s ease;
}
.button:hover {
  background-color: #003a9e;
  color: #ffffff;
  cursor: pointer;
}
</style>
