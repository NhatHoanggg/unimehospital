<template>
    <div class="doctor-detail-container">
      <div class="doctor-header">
        <div class="doctor-image">
          <img :src="doctor.image" alt="Doctor Image" />
        </div>
        <div class="doctor-info">
          <h2>{{ doctor.name }}</h2>
          <p><strong>Chuyên khoa:</strong> {{ doctor.specialty }}</p>
          <button class="btn book-appointment">Đặt lịch</button>
        </div>
      </div>
  
      <div class="doctor-highlight">
        <h3>Đặc điểm nổi bật</h3>
        <p>{{ doctor.highlight }}</p>
      </div>
  
      <div class="doctor-basic-info">
        <h3>Thông tin cơ bản</h3>
        <p>{{ doctor.basicInfo }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "DoctorDetail",
    data() {
      return {
        doctor: {},
        doctorsData: [
          {
            id: 1,
            name: "PGS.TS.BS Lê Quang Quốc Ánh",
            specialty: "Tiêu hóa",
            highlight:
              "- Chuyên về nội soi tiêu hóa, hiện là Trưởng đơn vị Nội soi tại Bệnh viện Đa Khoa Tâm Trí - Sài Gòn.",
            basicInfo:
              "Với hơn 30 năm kinh nghiệm trong việc thăm khám và điều trị Nội soi và Phẫu thuật Tiêu hóa.",
            image: "/doctors/doctor-1.jpg",
          },
          {
            id: 2,
            name: "PGS.TS.BS Nguyễn Văn A",
            specialty: "Tiêu hóa",
            highlight:
              "- Bác sĩ chuyên về phẫu thuật nội soi và nội soi can thiệp.",
            basicInfo:
              "Có hơn 25 năm kinh nghiệm trong việc điều trị các bệnh lý về tiêu hóa.",
            image: "/doctors/doctor-2.jpg",
          },
          {
            id: 3,
            name: "GS.TS.BS Nguyễn Tấn Phong",
            specialty: "Tai - Mũi - Họng",
            highlight:
              "- Nguyên Trưởng khoa Phẫu thuật Tai tại Bệnh viện Tai Mũi Họng Trung Ương.",
            basicInfo:
              "Bác sĩ có hơn 40 năm kinh nghiệm trong lĩnh vực Tai Mũi Họng và giữ vai trò Phó Chủ nhiệm bộ môn tại Đại học Y Hà Nội.",
            image: "/doctors/doctor-3.jpg",
          },
        ],
      };
    },
    mounted() {
      const doctorId = this.$route.params.id;
      this.doctor = this.doctorsData.find((doctor) => doctor.id == doctorId);
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
  
  .doctor-highlight,
  .doctor-basic-info {
    background-color: #f0f8ff;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
  }
  
  .doctor-highlight h3,
  .doctor-basic-info h3 {
    margin-top: 0;
    color: #002d72;
  }
  
  .doctor-highlight p,
  .doctor-basic-info p {
    color: #333;
    white-space: pre-wrap; 
  }
  </style>
  