<template>
    <div class="doctor-container">
      <div class="doctor-list">
        <div class="doctor-card" v-for="doctor in doctors" :key="doctor.id">
          <div class="doctor-image">
            <img :src="doctor.image" alt="Doctor Image" />
          </div>
          <div class="doctor-info">
            <h3>{{ doctor.name }}</h3>
            <p><strong>Khoa: </strong>{{ doctor.specialty }}</p>
            <p>{{ doctor.description }}</p>
            <div class="doctor-actions">
              <button class="btn view-more" @click="viewMore(doctor.id)">Xem thêm</button>
              <button class="btn book-appointment" @click="bookDoctor(doctor.id)">Đặt lịch</button>
            </div>
          </div>
        </div>
      </div>
  
      <div class="pagination">
        <button class="pagination-btn">◀</button>
        <span class="page-indicator">1</span>
        <button class="pagination-btn">▶</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "BookDoctor",
    data() {
      return {
        doctors: [
          {
            id: 1,
            name: "PGS.TS.BS Lê Quang Quốc Ánh",
            specialty: "Tiêu hóa",
            description:
              "- Chuyên về nội soi tiêu hóa. Hiện là Trưởng đơn vị Nội soi tại Bệnh viện Đa Khoa Tâm Trí - Sài Gòn.",
            image: "/doctors/doctor-1.jpg",
          },
          {
            id: 2,
            name: "PGS.TS.BS Nguyễn Văn A",
            specialty: "Tiêu hóa",
            description: "- Chuyên về phẫu thuật nội soi và nội soi can thiệp.",
            image: "/doctors/doctor-2.jpg",
          },
          {
            id: 3,
            name: "PGS.TS.BS Trần Văn B",
            specialty: "Tiêu hóa",
            description: "- Chuyên về điều trị bệnh lý đường tiêu hóa.",
            image: "/doctors/doctor-2.jpg",
          },
        ],
      };
    },
    methods: {
      viewMore(id) {
        this.$router.push({ name: 'DoctorDetail', params: { id } });
      },
      bookDoctor(id) {
        this.$router.push({ name: 'BookDoctorPage', params: { id } });
      },
    },
  };
  </script>
  
  <style scoped>
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
    font-size: 16px;
  }
  </style>
  