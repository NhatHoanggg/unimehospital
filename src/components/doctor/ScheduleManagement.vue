<template>
    <div class="schedule">
      <table>
        <thead>
          <tr>
            <th></th>
            <th v-for="(day, index) in days" :key="index">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(period, index) in periods" :key="index">
            <td class="period">{{ shifts[period] }}</td>
            <td
              v-for="(day, dayIndex) in days"
              :key="dayIndex"
              :class="['time-slot', { selected: isSelected(day, period) }]"
            >
              <button @click="toggleSelection(day, period)">
                {{ isSelected(day, period) ? "Đã chọn" : "Click để chọn" }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <div class="selected-slots">
        <h3>Các khung giờ đã chọn:</h3>
        <ul>
          <li v-for="(slot, index) in selectedSlots" :key="index">
            {{ slot.day }} - {{ shifts[slot.period] }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        shifts: [
          "0", "7:00-8:00", "8:00-9:00", "9:00-10:00", "10:00-11:00",
          "13:00-14:00", "14:00-15:00", "15:00-16:00", "17:00-18:00"
        ],
        days: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
        periods: [1, 2, 3, 4, 5, 6, 7, 8],
        selectedSlots: [],
      };
    },
    methods: {
      toggleSelection(day, period) {
        const slotIndex = this.selectedSlots.findIndex(
          (slot) => slot.day === day && slot.period === period
        );
  
        if (slotIndex > -1) {
          this.selectedSlots.splice(slotIndex, 1);
        } else {
          this.selectedSlots.push({ day, period });
        }
      },
      isSelected(day, period) {
        return this.selectedSlots.some(
          (slot) => slot.day === day && slot.period === period
        );
      },
    },
  };
  </script>
  
  <style scoped>
  .schedule {
    margin-top: 100px;
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
    background-color: #f8f9fa;
    cursor: pointer;
    outline: none;
  }
  
  .time-slot.selected button {
    background-color: #007bff;
    color: white;
  }
  
  .selected-slots {
    margin-top: 20px;
  }
  
  .selected-slots h3 {
    margin-bottom: 10px;
  }
  </style>
  