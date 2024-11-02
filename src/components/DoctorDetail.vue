<template>
  <div class="doctor-detail-container">
    <div class="doctor-header">
      <div class="doctor-image">
        <img :src="doctor.avatar" alt="Doctor Image" />
      </div>
      <div class="doctor-info">
        <h2>{{ doctor.name }}</h2>
        <p><strong>Chuyên khoa:</strong> {{ doctor.specitalty }}</p>
        <p><strong>Địa chỉ:</strong> {{ doctor.address }}</p>
        <button class="btn book-appointment">Đặt lịch</button>
      </div>
    </div>

    <div class="doctor-highlight">
      <h3>Đặc điểm nổi bật</h3>
      <p>{{ doctor.info }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DoctorDetail",
  data() {
    return {
      doctor: {},
    };
  },
  mounted() {
    const doctorId = this.$route.params.id; 
    this.fetchDoctorDetail(doctorId);
  },
  methods: {
    async fetchDoctorDetail(id) {
      try {
        const response = await axios.get(
          `https://6720cd2f98bbb4d93ca61a67.mockapi.io/api/v1/doctors/${id}`
        );
        this.doctor = response.data; // Cập nhật thông tin bác sĩ
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    },
  },
};
</script>

<style scoped>
.doctor-detail-container {
  max-width: 1440px;
  margin: 0 auto;
  margin-top: 100px;
  padding: 20px;
  text-align: left;
}

.doctor-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.doctor-image img {
  width: 120px;
  height: 120px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
}

.doctor-info h2 {
  margin: 0;
  font-size: 24px;
  color: #002d72;
}

.doctor-info p {
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

.doctor-highlight {
  background-color: #f0f8ff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.doctor-highlight h3 {
  margin-top: 0;
  color: #002d72;
}

.doctor-highlight p {
  color: #333;
  white-space: pre-wrap; 
}
</style>
