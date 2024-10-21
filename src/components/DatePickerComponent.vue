<template>
  <div class="container">
    <div class="box">
      <div class="title">
        <h1>1. Chọn ngày khám</h1>
        <i v-if="!isCollapsed" class="fas fa-chevron-up" @click="toggleCollapse"></i>
        <i v-else class="fas fa-chevron-down" @click="toggleCollapse"></i>
      </div>

      <div v-show="!isCollapsed" class="content">
        <div class="slider-container">
          <button @click="prevSlide" class="arrow-button">‹</button>
          <div class="slider-wrapper">
            <div class="slider-track" :style="trackStyle">
              <div
                class="slider-item"
                v-for="(day, index) in days"
                :key="index"
                @click="selectDay(index)"
                :class="{ active: selectedDay === index }"
              >
                {{ day }}
              </div>
            </div>
          </div>
          <button @click="nextSlide" class="arrow-button">›</button>
        </div>

        <div class="schedule-container">
          <div class="schedule-wrapper" v-if="selectedDaySchedule.length">
            <ul>
              <li
                v-for="(shift, index) in selectedDaySchedule"
                :key="index"
                @click="selectShift(shift)"
                :class="{ active: selectedShift === shift }"
              >
                {{ shift }}
              </li>
            </ul>
            <button class="button" @click="confirmSelection">Tiếp tục</button>
          </div>
          <div class="schedule-wrapper" v-else>
            <p>Không có lịch trống! Hãy chọn ngày khác.</p>
            <img src="@/assets/error404.png" alt="No shifts available" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      days: [],
      currentIndex: 0,
      selectedDay: 0,
      visibleItems: 7,
      schedules: {
        "22/10/2024": ["8:30-9:00", "9:30-10:00", "10:00-10:30"],
        "23/10/2024": ["9:00-9:30", "10:30-11:00", "14:00-14:30"],
        "24/10/2024": ["8:30-9:00", "10:00-10:30", "15:30-16:00"],
      },
      isCollapsed: false,
      selectedShift: null, // Lưu trữ ca làm việc được chọn
    };
  },
  computed: {
    trackStyle() {
      return {
        transform: `translateX(-${
          this.currentIndex * (100 / this.visibleItems)
        }%)`,
      };
    },
    selectedDaySchedule() {
      const selectedDate = this.days[this.selectedDay];
      return this.schedules[selectedDate] || [];
    },
  },
  mounted() {
    this.generateDays();
  },
  methods: {
    generateDays() {
      const today = new Date();
      const daysList = [];

      for (let i = 0; i < 14; i++) {
        const newDate = new Date(today);
        newDate.setDate(today.getDate() + i);

        const day = newDate.getDate();
        const month = newDate.getMonth() + 1;
        const year = newDate.getFullYear();

        const formattedDate = `${day}/${month}/${year}`;
        daysList.push(formattedDate);
      }

      this.days = daysList;
    },
    prevSlide() {
      if (this.currentIndex > 0 && this.days.length > this.visibleItems) {
        this.currentIndex--;
      }
    },
    nextSlide() {
      if (this.currentIndex < this.days.length - this.visibleItems && this.days.length > this.visibleItems) {
        this.currentIndex++;
      }
    },
    selectDay(index) {
      this.selectedDay = index;
      this.selectedShift = null; 
    },
    selectShift(shift) {
      this.selectedShift = shift; 
    },
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    },
    confirmSelection() {
      if (this.selectedShift) {
        const selectedDate = this.days[this.selectedDay];
        alert(`Ngày: ${selectedDate}, Giờ: ${this.selectedShift}`);
      } else {
        alert("Vui lòng chọn giờ khám trước khi tiếp tục.");
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
  margin-top: 70px;
  align-items: center;
  justify-content: center;
  display: flex;
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

.slider-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  margin-top: 20px;
}

.slider-wrapper {
  overflow: hidden;
  width: 854px;
}

.slider-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.slider-item {
  min-width: 100px;
  text-align: center;
  padding: 10px;
  border: 1px solid #0047ba;
  cursor: pointer;
  color: #0047ba;
  background-color: white;
}

.slider-item.active {
  background-color: #0047ba;
  color: white;
}

.arrow-button {
  background-color: white;
  border: 1px solid #0047ba;
  color: #0047ba;
  padding: 10px;
  cursor: pointer;
  font-size: 1.5rem;
}

.arrow-button:hover {
  background-color: #0047ba;
  color: white;
}

.schedule-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 400px;
  gap: 20px;
  transition: all 0.3s ease;
}

.schedule-wrapper {
  min-height: 400px;
}

.schedule-wrapper ul {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  grid-template-rows: repeat(3, 1fr);    
  gap: 10px;   
  position: relative; 
  width: 100%;
}

.schedule-wrapper li {
  width: 150px;
  background-color: #D9D9D9;
  border: 1px solid #D9D9D9;
  border-radius: 20px;
  margin: 5px 0;
  text-align: center;
  font-size: 24px;
  padding: 20px;
}

.schedule-wrapper li:hover {
  background-color: #0047ba;
  color: white;
  cursor: pointer;
}
.schedule-wrapper li.active {
  background-color: #0047ba;
  color: white;
  cursor: pointer;
}

.schedule-wrapper img{
  height: 300px;
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
