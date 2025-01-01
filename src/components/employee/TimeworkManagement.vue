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
          <td
            v-for="day in days"
            :key="day"
            @click="showAvailableDoctors(day, shift)"
            class="clickable-cell"
          >
            {{ getDoctorCount(day, shift) }}
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="loading" class="loading">Đang tải...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <!-- Modal hiển thị danh sách bác sĩ -->
    <div v-if="availableDoctors.length" class="doctor-modal">
      <h3> {{ formatDay(selectedDay) }} - Ca: {{ selectedShift }}</h3>
      <ul>
        <li v-for="doctor in availableDoctors" :key="doctor.doctorId">
          {{ doctor.doctorName }}
        </li>
      </ul>
      <button @click="closeDoctorModal">Đóng</button>
    </div>
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
      selectedDay: null,
      selectedShift: null,
      availableDoctors: [],
    };
  },
  computed: {
    isPreviousDisabled() {
      return (
        this.weekOfYear === this.currentWeek.week &&
        this.year === this.currentWeek.year
      );
    },

    isNextDisabled() {
      return this.weekOfYear >= this.maxWeek;
    },
  },
  methods: {
    showAvailableDoctors(day, shift) {
      this.selectedDay = day;
      this.selectedShift = shift;
      const [startTime, endTime] = shift.split("-");
      this.availableDoctors = this.schedules.filter(
        (schedule) =>
          schedule.dayOfWeek === day &&
          schedule.startTime === startTime &&
          schedule.endTime === endTime &&
          schedule.doctorTimeworkStatus === "Available"
      );
    },
    closeDoctorModal() {
      this.availableDoctors = [];
      this.selectedDay = null;
      this.selectedShift = null;
    },
    // getCurrentWeek() {
    //   const now = new Date();
    //   const year = now.getFullYear();

    //   const firstJan = new Date(year, 0, 1);
    //   const firstMonday = new Date(
    //     year,
    //     0,
    //     firstJan.getDate() + ((8 - (firstJan.getDay() || 7)) % 7)
    //   );

    //   const daysSinceFirstMonday = Math.floor(
    //     (now - firstMonday) / (24 * 60 * 60 * 1000)
    //   );

    //   let week = Math.floor(daysSinceFirstMonday / 7) + 1;

    //   if (daysSinceFirstMonday < 0) {
    //     const lastDec = new Date(year - 1, 11, 31);
    //     const lastDecFirstMonday = new Date(
    //       lastDec.getFullYear(),
    //       0,
    //       lastDec.getDate() + ((8 - (lastDec.getDay() || 7)) % 7)
    //     );
    //     week =
    //       Math.floor(
    //         (lastDec - lastDecFirstMonday) / (7 * 24 * 60 * 60 * 1000)
    //       ) + 1;
    //     return { year: year - 1, week };
    //   }

    //   if (week > 52) {
    //     week = 1;
    //     return { year: year + 1, week };
    //   }
    //   console.log("Current Year:", year, "Current Week:", week);

    //   return { year, week };
    // },

    getCurrentWeek() {
      const today = new Date();
      const thursday = new Date(today);
      thursday.setDate(today.getDate() + (4 - (today.getDay() || 7)));
      const startOfYear = new Date(thursday.getFullYear(), 0, 1);
      const week = Math.ceil(((thursday - startOfYear) / (1000 * 60 * 60 * 24) + 1) / 7);
      const year = thursday.getFullYear();
      return { year, week };
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
      // Đếm số bác sĩ có trạng thái Available trong một ca
      const [startTime, endTime] = shift.split("-");
      return this.schedules.filter(
        (schedule) =>
          schedule.dayOfWeek === day &&
          schedule.startTime === startTime &&
          schedule.endTime === endTime &&
          schedule.doctorTimeworkStatus === "Available"
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
            this.schedules = response.data.result; // Lưu kết quả vào schedules
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
    console.log("Current Week: ", this.getCurrentWeek());
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
.clickable-cell {
  cursor: pointer;
  background-color: #f0f8ff;
  transition: background-color 0.3s;
}
.clickable-cell:hover {
  background-color: #dceeff;
}

.doctor-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}
.doctor-modal h3 {
  margin-bottom: 10px;
}
.doctor-modal ul {
  list-style: none;
  padding: 0;
}
.doctor-modal li {
  padding: 5px 0;
}
.doctor-modal button {
  margin-top: 10px;
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
