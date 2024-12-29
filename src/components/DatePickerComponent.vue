<template>
  <div class="container">
    <div class="box">
      <div class="title">
        <h1>1. Chọn ngày khám</h1>
        <i
          v-if="!isCollapsed"
          class="fas fa-chevron-up"
          @click="toggleCollapse"
        ></i>
        <i v-else class="fas fa-chevron-down" @click="toggleCollapse"></i>
      </div>

      <div v-show="!isCollapsed" class="content">
        <div class="slider-container">
          <div class="slider-wrapper">
            <div class="slider-track" :style="trackStyle">
              <div
                class="slider-item"
                v-for="(day, index) in dayOfWeek"
                :key="index"
                :class="{
                  active: selectedDay === index,
                  disabled: isDayDisabled(day),
                }"
              >
                {{ day }}
              </div>
            </div>
          </div>
        </div>

        <div class="slider-container">
          <button @click="prevSlide" class="arrow-button">‹</button>
          <div class="slider-wrapper">
            <div class="slider-track" :style="trackStyle">
              <div
                class="slider-item"
                v-for="(day, index) in days"
                :key="index"
                @click="!isDayDisabled(day) && selectDay(index)"
                :class="{
                  active: selectedDay === index,
                  disabled: isDayDisabled(day),
                }"
              >
                {{ day }}
              </div>
            </div>
          </div>
          <button @click="nextSlide" class="arrow-button">›</button>
        </div>
        <div v-if="isLoading" class="loading schedule-container">
          <p>Đang tải dữ liệu</p>
          <LoadingComponent />
        </div>
        <div v-else class="schedule-container">
          <div class="schedule-wrapper" v-if="selectedDaySchedule.length">
            <ul>
              <li
                v-for="(shift, index) in selectedDaySchedule"
                :key="index"
                @click="selectShift(shift)"
                :class="{ active: selectedShift === shift }"
              >
                {{ shift.time }}
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
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import LoadingComponent from "./tools/LoadingComponent.vue";

export default {
  props: {
    doctorId: {
      type: String,
      required: true,
    },
  },
  components: {
    LoadingComponent,
  },

  data() {
    return {
      days: [],
      currentIndex: 0,
      selectedDay: 0,
      visibleItems: 7,
      schedules: {},
      isCollapsed: false,
      selectedShift: null,
      isLoading: true,
      dayOfWeek: [
        "Thứ 2",
        "Thứ 3",
        "Thứ 4",
        "Thứ 5",
        "Thứ 6",
        "Thứ 7",
        "Chủ nhật",
        "Thứ 2",
        "Thứ 3",
        "Thứ 4",
        "Thứ 5",
        "Thứ 6",
        "Thứ 7",
        "Chủ nhật",
      ],
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
    this.updateSchedules();
  },
  methods: {
    generateDays() {
      const today = new Date();
      const startOfWeek = new Date(today);

      // Xác định ngày bắt đầu từ thứ 2
      const dayOfWeek = today.getDay();
      const offsetToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
      startOfWeek.setDate(today.getDate() + offsetToMonday);

      const daysList = [];
      let todayIndex = 0; // Chỉ số của ngày hôm nay

      for (let i = 0; i < 14; i++) {
        // 2 tuần
        const newDate = new Date(startOfWeek);
        newDate.setDate(startOfWeek.getDate() + i);

        const day = newDate.getDate();
        const month = newDate.getMonth() + 1;
        const year = newDate.getFullYear();

        const formattedDate = `${day}/${month}/${year}`;
        daysList.push(formattedDate);

        // Kiểm tra ngày hiện tại để lưu lại chỉ số
        if (
          today.getDate() === newDate.getDate() &&
          today.getMonth() === newDate.getMonth() &&
          today.getFullYear() === newDate.getFullYear()
        ) {
          todayIndex = i;
        }
      }

      this.days = daysList;
      this.selectedDay = todayIndex; // Đặt ngày hiện tại làm ngày được chọn
    },

    isDayDisabled(day) {
      const [dayPart, monthPart, yearPart] = day.split("/").map(Number);
      const currentDate = new Date();
      const checkDate = new Date(yearPart, monthPart - 1, dayPart);
      return checkDate < new Date(currentDate.setHours(0, 0, 0, 0));
    },

    async updateSchedules() {
      console.log("doctor id: ->", this.doctorId);
      this.isLoading = true;
      try {
        const response = await axios.get(
          `https://api.unime.site/UNIME/doctortimework/get/listByDoctor/${this.doctorId}`
        );

        if (response.data.code === 1000) {
          const result = response.data.result;
          result
            .filter((shift) => shift.doctorTimeworkStatus === "Available")
            .forEach((shift) => {
              const date = this.formatDateFromApi(
                shift.doctorTimeworkYear,
                shift.weekOfYear,
                shift.dayOfWeek
              );

              if (!this.schedules[date]) {
                this.schedules[date] = [];
              }

              this.schedules[date].push({
                time: `${shift.startTime}-${shift.endTime}`,
                doctorTimeworkId: shift.doctorTimeworkId,
              });
            });
        } else {
          console.error("Failed to fetch schedules", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching schedules:", error);
      } finally {
        this.isLoading = false;
      }
    },
    formatDateFromApi(year, week, dayOfWeek) {
      const dayNames = [
        "SUNDAY",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
      ];
      const dayIndex = dayNames.indexOf(dayOfWeek);

      const firstDayOfYear = new Date(year, 0, 1);
      const daysOffset = (week - 1) * 7 + dayIndex - firstDayOfYear.getDay();

      const targetDate = new Date(firstDayOfYear);
      targetDate.setDate(firstDayOfYear.getDate() + daysOffset);

      const day = targetDate.getDate();
      const month = targetDate.getMonth() + 1;
      const formattedDate = `${day}/${month}/${year}`;

      return formattedDate;
    },
    prevSlide() {
      if (this.currentIndex > 0 && this.days.length > this.visibleItems) {
        // this.currentIndex--;
        this.currentIndex = Math.max(0, this.currentIndex - 7);
      }
    },
    nextSlide() {
      if (
        this.currentIndex < this.days.length - this.visibleItems &&
        this.days.length > this.visibleItems
      ) {
        // this.currentIndex++;
        this.currentIndex = Math.min(
          this.days.length - this.visibleItems,
          this.currentIndex + 7
        );
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
        console.log("Selected Shift:", this.selectedShift);
        const selectedDate = this.days[this.selectedDay];
        this.$emit("date-selected", {
          date: selectedDate,
          time: this.selectedShift.time,
          doctorTimeworkId: this.selectedShift.doctorTimeworkId,
        });

        this.isCollapsed = !this.isCollapsed;

        toast.success(
          `Chọn giờ khám thành công!\nNgày ${selectedDate}\nGiờ ${this.selectedShift.time}`,
          {
            rtl: false,
            limit: 3,
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      } else {
        toast.warning("Vui lòng chọn giờ khám trước khi tiếp tục!", {
          rtl: false,
          limit: 3,
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: auto;
  background-color: #f1f5f9;
  /* margin-top: 70px; */
  align-items: center;
  justify-content: center;
  display: flex;
  color: #2046a9;
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
  /* height: 700px; */
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
  margin-top: 0;
}

.slider-item {
  min-width: 100px;
  text-align: center;
  padding: 10px;
  border: 1px solid #0047ba;
  cursor: pointer;
  color: #0047ba;
  background-color: white;
  font-size: 20px;
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
  border-radius: 20px;
  width: 50px;
  height: 50px;
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
  /* height: 400px; */
  height: 564px;
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
  background-color: #d9d9d9;
  border: 1px solid #d9d9d9;
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

.schedule-wrapper img {
  height: 300px;
}

.button {
  position: absolute;
  /* bottom: 50px;        */
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
.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.slider-item.disabled {
  color: #ccc;
  text-decoration: line-through;
  cursor: not-allowed;
}
</style>
