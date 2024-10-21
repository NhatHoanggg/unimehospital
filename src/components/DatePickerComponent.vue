<template>
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
</template>

<script>
export default {
  data() {
    return {
      days: [],
      currentIndex: 0,
      selectedDay: 0,
      visibleItems: 7,

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
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    nextSlide() {
      if (this.currentIndex < this.days.length - this.visibleItems) {
        this.currentIndex++;
      }
    },
    selectDay(index) {
      this.selectedDay = index;
    },
  },
};
</script>

<style scoped>
.slider-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  margin-top: 200px;
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
</style>
