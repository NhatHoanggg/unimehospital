<template>
  <div class="about-container">
    <div class="section hospital-info">
      <img src="@/assets/background.jpg" alt="hospital" class="hospital-image" />
      <h1>BỆNH VIỆN UNIME</h1>
      <p>Dịch vụ khám chữa bệnh hơn 40 chuyên khoa</p>
      <p>Mang đến sức khỏe cho gia đình bạn</p>
    </div>

    <div class="section hospital-details">
      <h2>Thông tin Bệnh viện</h2>
      <p>
        Bệnh viện đã thực hiện hiệu quả công tác điều trị cho hàng trăm ngàn người bệnh ở các lĩnh vực chuyên khoa: Sản – Phụ khoa, Cơ – Xương – Khớp, Tiêu hóa, Tai – Mũi – Họng, Răng – Hàm – Mặt, Nhãn khoa, Phẫu thuật...
      </p>
    </div>

    <div class="section mission-vision">
      <h2>Sứ mệnh và Tầm nhìn</h2>
      <div class="mission-slider">
        <div v-for="(mission, index) in missions" :key="index" class="mission-card">
          <img :src="mission.image" alt="Mission Image" />
          <h3>{{ mission.title }}</h3>
          <p>{{ mission.description }}</p>
        </div>
      </div>
    </div>

    <div class="section doctors">
      <h2>Đội ngũ Bác sĩ</h2>
      <div class="doctor-slider">
        <div v-for="(doctor, index) in doctors" :key="index" class="doctor-card">
          <img :src="doctor.image" alt="Doctor Image" />
          <h3>{{ doctor.name }}</h3>
          <p>{{ doctor.specialty }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      missions: [
        {
          title: "Mang lại giá trị chăm sóc sức khỏe",
          description: "Cung cấp những dịch vụ khám chữa bệnh toàn diện, đáp ứng nhu cầu chăm sóc sức khỏe của cộng đồng.",
          image: "@/assets/mission1.jpg"
        },
        {
          title: "Chất lượng hàng đầu",
          description: "Chúng tôi cung cấp một loạt dịch vụ chăm sóc y tế với chất lượng tốt nhất từ đội ngũ chuyên gia y tế hàng đầu.",
          image: "@/assets/mission2.jpg"
        },
        {
          title: "Đặt sức khỏe bệnh nhân lên hàng đầu",
          description: "Chúng tôi đặt mục tiêu trở thành đơn vị hàng đầu trong chăm sóc sức khỏe bệnh nhân.",
          image: "@/assets/mission3.jpg"
        }
      ],
      doctors: [
        {
          name: "Bác sĩ CKI Võ Hải Long",
          specialty: "Tai Mũi Họng",
          image: "@/assets/doctors/doctor-1.jpg"
        },
        {
          name: "Bác sĩ CKI Võ Hải Long",
          specialty: "Tim mạch",
          image: "@/assets/doctors/doctor-1.jpg"
        },
        {
          name: "Bác sĩ CKI Võ Hải Long",
          specialty: "Nha Khoa",
          image: "@/assets/doctors/doctor-1.jpg"
        },
      ]
    };
  }
};
</script>

<style scoped>
.about-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px;
}

.section {
  margin-bottom: 40px;
}

.hospital-info {
  text-align: center;
  color: #004aad;
}

.hospital-info h1 {
  font-size: 2.5rem;
  font-weight: 700;
}

.hospital-info p {
  font-size: 1.2rem;
}

.hospital-image {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 20px;
}

.hospital-details h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.hospital-details p {
  font-size: 1.1rem;
  line-height: 1.6;
}

.mission-slider,
.doctor-slider {
  display: flex;
  overflow-x: auto;
  gap: 20px;
  padding-bottom: 10px;
}

.mission-card,
.doctor-card {
  flex: 0 0 300px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.mission-card img,
.doctor-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
}

.mission-card h3,
.doctor-card h3 {
  font-size: 1.4rem;
  color: #004aad;
  margin-bottom: 10px;
}

.mission-card p,
.doctor-card p {
  font-size: 1rem;
  color: #555;
  line-height: 1.4;
}

@media (min-width: 1024px) {
  .mission-slider,
  .doctor-slider {
    padding-left: 20px;
  }
}
</style>
