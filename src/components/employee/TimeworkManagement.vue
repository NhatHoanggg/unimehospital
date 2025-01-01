<template>
  <div class="weekly-schedule">
    <h1>Lịch Làm Việc Tuần {{ weekOfYear }}/{{ year }}</h1>
    <div class="navigation">
      <button @click="changeWeek(-1)" :disabled="isPreviousDisabled">Tuần trước</button>
      <button @click="changeWeek(1)" :disabled="isNextDisabled">Tuần sau</button>
    </div>
    <div v-if="isLoading" class="loading">
      <p>Đang tải dữ liệu</p>
      <LoadingComponent />
    </div>
    <table v-else class="schedule-table">
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
      <!-- Modal hiển thị danh sách bác sĩ -->
      <div v-if="availableDoctors.length" class="doctor-modal">
        <h3> {{ formatDay(selectedDay) }} - Ca: {{ selectedShift }}</h3>
        <ul>
          <li v-for="doctor in availableDoctors" :key="doctor.doctorId">
            <button v-if = "doctor.doctorTimeworkStatus=='Busy'" >
              <i class="fas fa-times"></i>
            </button>

            <button v-else @click="handleChangeTimeworkStatus(doctor)">
              <i class="fas fa-edit" ></i>
            </button>
          
            {{ doctor.doctorName }}  
            ({{ doctor.doctorTimeworkStatus }})
          </li>
        </ul>
        <button @click="closeDoctorModal">Đóng</button>
      </div>
    </table>
    <!-- <div v-if="loading" class="loading">Đang tải...</div> -->
    <div v-if="error" class="error">{{ error }}</div>
    <AlertModal
      :isVisible="isModalVisible"
      :type="modalType"
      :title="modalTitle"
      :content="modalContent"
      @action="handleModalAction"
    />
    <button class="close-button" @click="closeModal">
      <i class="fas fa-times"></i>
    </button>
    

  </div>
</template>

<script>
import axios from "axios";
import { toast } from "vue3-toastify";
import AlertModal from "../tools/AlertModal.vue";
import LoadingComponent from "../tools/LoadingComponent.vue";

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

      doctors: [],
      department: null,
      departmentId: null,

      isLoading: true,
      isModalVisible: false,
      modalType: "",
      modalTitle: "",
      modalContent: "",

      selectedDoctor: null,
    };
  },

  components: {
    AlertModal,
    LoadingComponent,
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
    // showAvailableDoctors(day, shift) {
    //   this.selectedDay = day;
    //   this.selectedShift = shift;
    //   const [startTime, endTime] = shift.split("-");
    //   this.availableDoctors = this.schedules.filter(
    //     (schedule) =>
    //       schedule.dayOfWeek === day &&
    //       schedule.startTime === startTime &&
    //       schedule.endTime === endTime &&
    //       schedule.doctorTimeworkStatus === "Available"
    //   );
    // },

    showAvailableDoctors(day, shift) {
      this.selectedDay = day;
      this.selectedShift = shift;
      const [startTime, endTime] = shift.split("-");
      this.availableDoctors = this.schedules.filter(
        (schedule) =>
          schedule.dayOfWeek === day &&
          schedule.startTime === startTime &&
          schedule.endTime === endTime
      );
    },

    handleChangeTimeworkStatus(doctor){
      this.selectedDoctor = doctor;
      this.modalType = "warning";
      this.modalTitle = `Cập nhật ca làm việc`;
      this.modalContent = `Cập nhật trạng thái làm việc của bác sĩ ${doctor.doctorName}`;
      this.isModalVisible = true;
    },

    async handleModalAction(action) {

      const BEARER_TOKEN = localStorage.getItem("token");
      if (action === "OK" && this.pendingDepartmentId !== null) {
        this.isLoading = true;
        await axios
          .put(
            `https://api.unime.site/UNIME/doctortimework`,
            {
              doctorTimeworkId: this.selectedDoctor.doctorTimeworkId,
              doctorTimeworkStatus: "Busy",
            },
            {
              headers: {
                Authorization: `Bearer ${BEARER_TOKEN}`,
              },
            }
          )
          .then((response) => {
            if (response.data.code === 1000) {
              this.fetchSchedule();
              this.closeDoctorModal();
              // alert("Cập nhật trạng thái làm việc thành công!");
              toast.success('Cập nhật trạng thái làm việc thành công!', {
                rtl: false,
                limit: 3,
                position: toast.POSITION.TOP_RIGHT,
              });
              this.isModalVisible = false;
              this.selectedDoctor = null;
              this.isLoading = false;
            } else {
              this.error = "Không thể cập nhật trạng thái làm việc!";
            }
          })
          .catch((err) => {
            this.error = `Lỗi: ${err.message}`;
          });
      }
      else if (action === "Cancel") {
        this.isModalVisible = false;
      }
    },

    closeDoctorModal() {
      this.availableDoctors = [];
      this.selectedDay = null;
      this.selectedShift = null;
    },

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
    // getDoctorCount(day, shift) {
    //   // Đếm số bác sĩ có trạng thái Available trong một ca
    //   const [startTime, endTime] = shift.split("-");
    //   return this.schedules.filter(
    //     (schedule) =>
    //       schedule.dayOfWeek === day &&
    //       schedule.startTime === startTime &&
    //       schedule.endTime === endTime &&
    //       schedule.doctorTimeworkStatus === "Available" 
    //   ).length;
    // },
    getDoctorCount(day, shift) {
      const [startTime, endTime] = shift.split("-");
      return this.schedules.filter(
        (schedule) =>
          schedule.dayOfWeek === day &&
          schedule.startTime === startTime &&
          schedule.endTime === endTime
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
      this.isLoading = true;
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
          this.isLoading = false;
        });
    },

    async getDepartment() {
      const token = localStorage.getItem("token");
      this.isLoading = true;
      await axios
        .get(`https://api.unime.site/UNIME/employees/myInfo`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data.code === 1000) {
            this.department = response.data.result.departmentName; 
            console.log("Chuyên khoa: ", this.department);
            this.getDoctorList();
            this.isLoading = false;
          }
        })
        .catch((error) => {
          console.error("Lỗi tải dữ liệu:", error);
        });
    },

    async getDoctorList() {
      this.isLoading = true;
      await axios
        .get(
          `https://api.unime.site/UNIME/departments/get/?department_name=${this.department}`
        )
        .then((response) => {
          this.departmentId = response.data.result[0].departmentId || [];
          console.log("Department Id: ", this.departmentId);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          this.isLoading = false;
        });

      await axios
        .get(
          `https://api.unime.site/UNIME/doctors/get/byDepartment?doctor_departmentId=${this.departmentId}`
        )
        .then((response) => {
          this.doctors = response.data.result || [];
          console.log("Danh sách bác sĩ: ", this.doctors);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          this.isLoading = false;
        });
      
    },

  },
  created() {
    this.fetchSchedule();
    console.log("Current Week: ", this.getCurrentWeek());

    this.getDepartment();
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
  position: relative;
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
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  flex-direction: column;
}

.fas{
  width: 20px;
  height: 20px;
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  text-align: justify;
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
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #dc3545;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
