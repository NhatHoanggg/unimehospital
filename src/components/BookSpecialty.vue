<template>
    <div class="specialty-container">
      <div class="specialty-grid">
        <div class="specialty-item" v-for="specialty in specialties" :key="specialty.id">
          <img :src="specialty.icon" alt="" />
          <p>{{ specialty.name }}</p>
        </div>
      </div>
      <button class="view-all-btn">Xem tất cả</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BookSpecialty',
    data() {
      return {
        specialties: [
          { id: 1, name: 'Da liễu', icon: '/icons/dermatology.svg' },
          { id: 2, name: 'Nhãn khoa', icon: '/icons/ophthalmology.svg' },
          { id: 3, name: 'Sản-phụ khoa', icon: '/icons/gynecology.svg' },
          { id: 4, name: 'Khoa nhi', icon: '/icons/pediatrics.svg' },
          { id: 5, name: 'Tai mũi họng', icon: '/icons/ent.svg' },
          { id: 6, name: 'Tâm lý', icon: '/icons/psychology.svg' },
          { id: 7, name: 'Tim mạch', icon: '/icons/cardiology.svg' },
          { id: 8, name: 'Nội tổng quát', icon: '/icons/internal-medicine.svg' },
          { id: 9, name: 'Tiêm chủng', icon: '/icons/vaccination.svg' },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .specialty-container {
    text-align: center;
  }
  
  .specialty-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
  
  .specialty-item {
    width: 150px;
    height: 100px;
    border: 2px solid #d0d0d0;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
  }
  
  .specialty-item img {
    width: 40px;
    height: 40px;
  }
  
  .view-all-btn {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #009fe3;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  