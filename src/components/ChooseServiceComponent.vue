<template>
  <div class="container">
    <div class="box">
      <div class="title">
        <h1>2. Thông tin dịch vụ</h1>
        <i v-if="!isCollapsed" class="fas fa-chevron-up" @click="toggleCollapse"></i>
        <i v-else class="fas fa-chevron-down" @click="toggleCollapse"></i>
      </div>

      <div v-show="!isCollapsed" class="content">
        <div class="service-container">
          <div class="service-wrapper">
            <div class="service-content">
              <div class="date-time">
                <div class="date"><i class="far fa-calendar-check"></i> Ngày: {{ selectedDate || "Chưa chọn" }}</div>
                <div class="time"><i class="far fa-clock"></i> Giờ: {{ selectedTime || "Chưa chọn" }}</div>
              </div>
              <div class="location"><i class="fas fa-map-marker-alt"></i> Địa điểm: 162 Nguyễn Thiện Thuật, Phường 3, Quận 3, TP HCM</div>
              <div class="service-option"><i class="fas fa-hand-holding-heart"></i> Dịch vụ: Khám tổng quát</div>
              <div class="money"><i class="fas fa-dollar-sign"></i> 300$</div>
            </div>
            <button class="button" :disabled="!selectedDate || !selectedTime" @click="confirmSelection">Tiếp tục</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedDate: {
      type: String,
      default: "",
    },
    selectedTime: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isCollapsed: false,
    };
  },
  methods: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    },
    confirmSelection() {
      if (this.selectedDate && this.selectedTime) {
        alert(`Dịch vụ vào ngày ${this.selectedDate} lúc ${this.selectedTime} đã được xác nhận.`);
      }
    },
  },
};
</script>
  
  <style scoped>
  .container {
    width: 100%;
    height: auto;
    background-color: #F1F5F9;
    margin-top: 20px;
    align-items: center;
    justify-content: center;
    display: flex;
    color: #2046A9;
  }
  
  .box {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 1024px;
    border: 3px solid #0047ba;
    border-radius: 20px;
    background-color: white;
    height: auto;
    transition: height 1s ease;
  }
  
  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
  }
  
  .content {
    transition: all 0.3s ease;
  }
  
  .service-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 400px;
    gap: 20px;
    transition: all 0.3s ease;
    font-size: 20px;
  }
  
  .service-wrapper {
    min-height: 400px;
  }
  
  .service-container {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  width: 100%;
  gap: 20px;
  padding-left: 50px; 
}

.service-wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px; 
}

.service-content {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, auto); 
  gap: 10px;
  width: 100%;
  
}

.service-content > div {
  display: flex;
  align-items: center;
  font-size: 24px;
  padding: 10px;
}

.date-time, .location, .service-option, .money {
  display: flex;
  align-items: center;
  gap: 10px;
}

.date-time .date, .date-time .time {
  display: flex;
  align-items: center;
  gap: 5px;
}

.date-time {
    justify-content: space-between;
}
  .button {
    position: absolute; 
    bottom: 50px;       
    right: 114px;        
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
  