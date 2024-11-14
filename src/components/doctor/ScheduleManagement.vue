<template>
  <div class="schedule">
    <table>
      <thead>
        <tr>
          <th></th>
          <th v-for="(day, index) in days" :key="index">{{ day }}</th>
        </tr>
        <tr>
          <th></th>
          <th v-for="(date, index) in dates" :key="index">{{ date }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(period, index) in periods" :key="index">
          <td class="period">{{ shifts[period] }}</td>
          <td
            v-for="(day, dayIndex) in days"
            :key="dayIndex"
            :class="['time-slot', { selected: isSelected(dayIndex, period) }]"
          >
            <button @click="toggleSelection(dayIndex, period)">
              {{ isSelected(dayIndex, period) ? "Đã chọn" : "Click để chọn" }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- <div class="selected-slots">
      <h3>Các khung giờ đã chọn:</h3>
      <ul>
        <li v-for="(slot, index) in selectedSlots" :key="index">
          {{ days[slot.dayIndex] }} {{ dates[slot.dayIndex] }} - {{ shifts[slot.period] }}
        </li>
      </ul>
    </div> -->
    <button @click="sendData" class="send-button" :disabled="!isSendAllowed">
      Gửi dữ liệu
    </button>
    <p v-if="!isSendAllowed" class="warning-text">
      Nút này chỉ khả dụng từ 20h đến 24h vào Thứ 4 hàng tuần.
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shifts: [
        "0",
        "7:00-8:00",
        "8:00-9:00",
        "9:00-10:00",
        "10:00-11:00",
        "13:00-14:00",
        "14:00-15:00",
        "15:00-16:00",
        "17:00-18:00",
      ],
      days: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
      dates: [],
      periods: [1, 2, 3, 4, 5, 6, 7, 8],
      selectedSlots: [],
      weekNumber: 0,
    };
  },
  computed: {
    isSendAllowed() {
      // const now = new Date();
      // const dayOfWeek = now.getDay();
      // const hours = now.getHours();
      // return dayOfWeek === 6 && hours >= 20 && hours < 24;
      return true;
    },
  },
  created() {
    this.updateWeekDates();
  },
  methods: {
    updateWeekDates() {
    const today = new Date();
    const dayOfWeek = today.getDay();

    const currentMonday = new Date(today);
    currentMonday.setDate(
      today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)
    );

    const startOfNextWeek = new Date(currentMonday);
    startOfNextWeek.setDate(currentMonday.getDate() + 7 + 7);
    const date = new Date(startOfNextWeek);
    date.setDate(startOfNextWeek.getDate());
    this.weekNumber = this.getWeekOfYear(date);
    console.log(this.weekNumber);
  },

  getWeekOfYear(date) {
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const startOfYear = new Date(targetDate.getFullYear(), 0, 1);
    const dayOfWeek = startOfYear.getDay();
    const startOfFirstWeek = new Date(startOfYear);
    startOfFirstWeek.setDate(startOfYear.getDate() + (dayOfWeek === 0 ? -6 : 1 - dayOfWeek));

    const daysDifference = Math.floor((targetDate - startOfFirstWeek) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((daysDifference + 1) / 7);
    return weekNumber;
  },

  toggleSelection(dayIndex, period) {
    const slotIndex = this.selectedSlots.findIndex(
      (slot) => slot.dayIndex === dayIndex && slot.period === period
    );

    if (slotIndex > -1) {
      this.selectedSlots.splice(slotIndex, 1);
    } else {
      this.selectedSlots.push({ dayIndex, period });
    }
  },

  isSelected(dayIndex, period) {
    return this.selectedSlots.some(
      (slot) => slot.dayIndex === dayIndex && slot.period === period
    );
  },

  sendData() {
    const formattedData = this.dates.map((date, dayIndex) => {
      const slots = this.periods.map((period) => ({
        id: period,
        time: this.shifts[period],
        selected: this.isSelected(dayIndex, period),
      }));
      
      return { date, slots };
    });
    
    console.log("Dữ liệu gửi đi:", formattedData);
  },
},

};
</script>

<style scoped>
.schedule {
  margin-top: 70px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.period {
  font-weight: bold;
  background-color: #f0f0f0;
}

.time-slot button {
  width: 100%;
  padding: 10px;
  border: none;
  background-color: #007bff;
  border: solid 1px #151515;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  outline: none;
}

.time-slot.selected button {
  background-color: #e67526;
}

.selected-slots {
  margin-top: 20px;
}

.selected-slots h3 {
  margin-bottom: 10px;
}

.send-button {
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 20px;
  background: #007bff;
  color: #fff;
  text-transform: lowercase;
  border: solid 2px #151515;
  text-decoration: none;
  padding: 18px 32px;
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  position: relative;
  z-index: 1;
  transition: 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  cursor: pointer;
  overflow: hidden;
  transition-delay: 0s !important;
  text-transform: uppercase !important;
  letter-spacing: 1.5px;
  font-family: sans-serif;
}
.send-button::before {
  position: absolute;
  content: "";
  top: 0;
  right: 0;
  width: 0%;
  height: 100%;
  background: #151515;
  z-index: -1;
  transition: 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86);
}
.send-button:hover::before {
  width: 100%;
  left: 0;
  right: unset;
}
.send-button:hover {
  color: white;
}

.send-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
