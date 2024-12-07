<template>
  <div class="doctor-detail-container">
    <div class="doctor-header">
      <div class="doctor-image">
        <img :src="doctor.doctorImage || defaultImage" alt="Doctor Image" />
      </div>
      <div class="doctor-info">
        <h2>{{ doctor.doctorName }}</h2>
        <p><strong>Chuyên khoa:</strong> {{ doctor.departmentName }}</p>
        <p><strong>Địa chỉ:</strong> {{ doctor.doctorAddress }}</p>
        <button class="btn book-appointment" @click="bookDoctor(doctor)">
          Đặt lịch
        </button>
      </div>
    </div>

    <div class="doctor-highlight">
      <h3>Đặc điểm nổi bật</h3>
      <p>{{ doctor.doctordetailExperience }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DoctorDetail",
  data() {
    return {
      defaultImage: "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1732272155/ox3qndq1v7iko2rejrex.png",
      doctor: {},
    };
  },

  mounted() {
    const doctorId = this.$route.params.id;
    const doctorData = localStorage.getItem("selectedDoctor");
    if (doctorData) {
      const doctor = JSON.parse(doctorData);
      if (doctor.doctorId == doctorId) {
        this.doctor = doctor;
      } else {
        this.fetchDoctorData(doctorId);
      }
    } else {
      this.fetchDoctorData(doctorId);
    }
  },
  methods: {
    async fetchDoctorData(id) {
      try {
        const response = await axios.get(
          `https://api.unime.site/UNIME/doctors/get/getDetail/${id}`
        );
        this.doctor = response.data.result;
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    },
    bookDoctor(doctor) {
      this.$router.push({
        name: "BookDoctorPage",
        params: { id: doctor.doctorId },
      });
      localStorage.setItem("selectedDoctor", JSON.stringify(doctor));
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
