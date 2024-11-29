<template>
  <div class="doctor-container">
    <div class="doctor-list">
      <div class="doctor-card" v-for="doctor in paginatedDoctors" :key="doctor.doctorId">
        <div class="doctor-image">
          <img :src="doctor.doctorImage" alt="Doctor Image" />
        </div>
        <div class="doctor-info">
          <h3>{{ doctor.doctorName }}</h3>
          <!-- <p><strong>Khoa: </strong>{{ doctor.departmentName }}</p> -->
          <p>{{ doctor.doctordetailInformation }}</p>
          <div class="doctor-actions">
            <button class="btn view-more" @click="viewMore(doctor)">Xem thêm</button>
            <button class="btn book-appointment" @click="bookDoctor(doctor)">Đặt lịch</button>
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
import axios from "axios";

export default {
  name: "BookDoctor",
  data() {
    return {
      doctors: [],
      currentPage: 1,
      itemsPerPage: 5,
      totalPages: 1,
    };
  },
  computed: {
    paginatedDoctors() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.doctors.slice(start, end);
    },
  },
  methods: {
    async fetchDoctors() {
      try {
        const response = await axios.get(`https://api.unime.site/UNIME/doctors/get/doctorList`);
        this.doctors = response.data.result || [];
        this.totalPages = Math.ceil(this.doctors.length / this.itemsPerPage);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    },
    viewMore(doctor) {
      this.$router.push({ name: "DoctorDetail", params: { id: doctor.doctorId } });
      localStorage.setItem("selectedDoctor", JSON.stringify(doctor));
    },
    bookDoctor(doctor) {
      this.$router.push({ name: "BookDoctorPage", params: { id: doctor.doctorId } });
      localStorage.setItem("selectedDoctor", JSON.stringify(doctor));
    },
    changePage(direction) {
      this.currentPage += direction;
    },
  },
  mounted() {
    this.fetchDoctors();
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
  
  .doctor-info p {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Số dòng hiển thị */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
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