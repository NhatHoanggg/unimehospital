<template>
  <div class="weekly-schedule">
    <h1>Lịch Làm Việc Tuần {{ weekOfYear }}/{{ year }}</h1>
    <div class="navigation">
      <button @click="changeWeek(-1)" :disabled="isPreviousDisabled">Tuần trước</button>
      <button @click="changeWeek(1)" :disabled="isNextDisabled">Tuần sau</button>
    </div>
    <table class="schedule-table">
      <thead>
        <tr>
          <th>Ca/Ngày</th>
          <th v-for="day in days" :key="day">{{ formatDay(day) }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="shift in shifts" :key="shift">
          <td>Ca {{ shift }}</td>
          <td v-for="day in days" :key="day">
            {{ getDoctorCount(day, shift) }}
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="loading" class="loading">Đang tải...</div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "WeeklySchedule",
  data() {
    return {
      schedules: [],
      currentWeek: this.getCurrentWeek(),
      weekOfYear: this.getCurrentWeek().week,
      year: this.getCurrentWeek().year,
      maxWeek: this.getCurrentWeek().week + 2,
      days: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"],
      shifts: [
        "08:00-09:00",
        "09:00-10:00",
        "10:00-11:00",
        "11:00-12:00",
        "13:00-14:00",
        "14:00-15:00",
        "15:00-16:00",
        "16:00-17:00",
      ],
      loading: false,
      error: null,
    };
  },
  computed: {
    isPreviousDisabled() {
      return this.weekOfYear <= this.currentWeek.week;
    },
    isNextDisabled() {
      return this.weekOfYear >= this.maxWeek;
    },
  },
  methods: {
    getCurrentWeek() {
      const now = new Date();
      const firstJan = new Date(now.getFullYear(), 0, 1);
      const days = Math.floor((now - firstJan) / (24 * 60 * 60 * 1000));
      const week = Math.ceil((days + firstJan.getDay() + 1) / 7);
      return { year: now.getFullYear(), week };
    },
    formatDay(dayOfWeek) {
      const days = {
        MONDAY: "Thứ Hai",
        TUESDAY: "Thứ Ba",
        WEDNESDAY: "Thứ Tư",
        THURSDAY: "Thứ Năm",
        FRIDAY: "Thứ Sáu",
        SATURDAY: "Thứ Bảy",
      };
      return days[dayOfWeek] || dayOfWeek;
    },
    getDoctorCount(day, shift) {
      const [startTime, endTime] = shift.split("-");
      return this.schedules.filter(
        (schedule) =>
          schedule.dayOfWeek === day &&
          schedule.startTime === startTime &&
          schedule.endTime === endTime &&
          schedule.doctortimeworkStatus === "Available"
      ).length;
    },
    changeWeek(step) {
      this.weekOfYear += step;
      if (this.weekOfYear > 52) {
        this.weekOfYear = 1;
        this.year++;
      } else if (this.weekOfYear < 1) {
        this.weekOfYear = 52;
        this.year--;
      }
      this.fetchSchedule();
    },
    fetchSchedule() {
      this.loading = true;
      this.error = null;

      const BEARER_TOKEN = localStorage.getItem("token");
      axios
        .get(
          `https://api.unime.site/UNIME/doctortimework/get/listByWeek/${this.weekOfYear}_${this.year}`,
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`,
            },
          }
        )
        .then((response) => {
          if (response.data.code === 1000) {
            this.schedules = response.data.result;
          } else {
            this.error = "Không thể lấy dữ liệu!";
          }
        })
        .catch((err) => {
          this.error = `Lỗi: ${err.message}`;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  created() {
    this.fetchSchedule();
  },
};
</script>

<style scoped>
.weekly-schedule {
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 64px;
  padding: 20px;
  font-family: Arial, sans-serif;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navigation {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.navigation button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  transition: background-color 0.3s;
}

.navigation button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.schedule-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.schedule-table th,
.schedule-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.schedule-table th {
  background: #007bff;
  color: white;
}

.loading {
  color: #007bff;
  text-align: center;
}

.error {
  color: red;
  text-align: center;
}
</style>
