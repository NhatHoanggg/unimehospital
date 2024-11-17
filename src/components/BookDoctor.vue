<template>
  <div class="doctor-container">
    <div class="doctor-list">
      <div class="doctor-card" v-for="doctor in doctors" :key="doctor.id">
        <div class="doctor-image">
          <img :src="doctor.avatar" alt="Doctor Image" />
        </div>
        <div class="doctor-info">
          <h3>{{ doctor.name }}</h3>
          <p><strong>Khoa: </strong>{{ doctor.specitalty }}</p>
          <p>{{ doctor.info }}</p>
          <div class="doctor-actions">
            <button class="btn view-more" @click="viewMore(doctor)">Xem thêm</button>
            <button class="btn book-appointment" @click="bookDoctor(doctor)">Đặt lịch</button>
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
  name: "BookDoctor",
  data() {
    return {
      doctors: [],
      currentPage: Number(this.$route.query.page) || 1, 
      itemsPerPage: 10,
    };
  },
  watch: {
    "$route.query.page"(newPage) {
      this.currentPage = Number(newPage) || 1;
      this.fetchDoctors();
    },
  },
  methods: {
    async fetchDoctors() {
      try {
        const response = await axios.get(
          `https://6720cd2f98bbb4d93ca61a67.mockapi.io/api/v1/doctors?page=${this.currentPage}&limit=${this.itemsPerPage}`
        );
        this.doctors = response.data;
      } catch (error) {
        console.error("Error fetching doctors:", error);
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
    viewMore(doctor) {
    this.$router.push({ name: "DoctorDetail", params: { id: doctor.id } });
    localStorage.setItem("selectedDoctor", JSON.stringify(doctor));
    },
    bookDoctor(doctor) {
    this.$router.push({ name: "BookDoctorPage", params: { id: doctor.id } });
    localStorage.setItem("selectedDoctor", JSON.stringify(doctor));
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
  