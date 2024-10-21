<template>
    <DatePickerComponent/>
    <!-- <div class="booking-container">
      <div class="doctor-info">
        <img :src="doctor.image" alt="Doctor Image" />
        <h2>{{ doctor.name }}</h2>
        <p><strong>Chuyên khoa:</strong> {{ doctor.specialty }}</p>
        <p>{{ doctor.clinicInfo }}</p>
      </div>
  
      <div class="booking-steps">
        <h3>1. Chọn ngày khám:</h3>
        <div class="date-picker">
          <button class="nav-btn">◀</button>
          <div class="date-list">
            <button
              v-for="(date, index) in availableDates"
              :key="index"
              :class="{ selected: selectedDate === date }"
              @click="selectDate(date)"
            >
              {{ date }}
            </button>
          </div>
          <button class="nav-btn">▶</button>
        </div>
  
        <h3>Chọn giờ khám:</h3>
        <div class="time-picker">
          <button
            v-for="(time, index) in availableTimes"
            :key="index"
            :class="{ selected: selectedTime === time }"
            @click="selectTime(time)"
          >
            {{ time }}
          </button>
        </div>
  
        <div class="action-buttons">
          <button class="continue-btn" @click="confirmBooking">Tiếp tục</button>
          <button class="confirm-btn">Xác nhận đặt lịch</button>
        </div>
      </div>
    </div> -->
</template>
<script>
import DatePickerComponent from "@/components/DatePickerComponent.vue";
export default {
    components: {
        DatePickerComponent,
    },
  name: "BookingPage",
  methods: {
  },
};
</script>
<style scoped>
.booking-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  text-align: center;
}

.doctor-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.doctor-info img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
}

.doctor-info h2 {
  margin: 0;
  font-size: 20px;
}

.date-picker,
.time-picker {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 15px 0;
}

.date-list {
  display: flex;
  gap: 10px;
}

.date-picker button,
.time-picker button {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  background-color: white;
}

.selected {
  background-color: #009fe3;
  color: white;
}

.nav-btn {
  background-color: #009fe3;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

.action-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.continue-btn,
.confirm-btn {
  background-color: #002d72;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
