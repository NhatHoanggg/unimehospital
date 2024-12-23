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
import axios from "axios";
import { toast } from "vue3-toastify";
export default {
  data() {
    return {
      shifts: [
        "0",
        "08:00-09:00",
        "09:00-10:00",
        "10:00-11:00",
        "11:00-12:00",
        "13:00-14:00",
        "14:00-15:00",
        "15:00-16:00",
        "16:00-17:00",
      ],
      days: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
      dates: [],
      periods: [1, 2, 3, 4, 5, 6, 7, 8],
      selectedSlots: [],
      weekNumber: 0,
      timeworkList:[],
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
    this.getTimeworkList();
  },
  methods: {
    convertToTimeworkId(dayOfWeek, startTime, endTime){
      const timework = this.timeworkList.find(
        (timework) =>
          timework.dayOfWeek === dayOfWeek &&
          timework.startTime === startTime &&
          timework.endTime === endTime
      );
      // console.log("timework id: ", timework.timeworkId);
      return timework.timeworkId;
    },

    async getTimeworkList() {
      try {
        const response = await axios.get(
          "https://api.unime.site/UNIME/timeworks/get/timewordList"
        );

        if (response.status === 200) {
          this.timeworkList = response.data.result;
          console.log("Lấy danh sách timework thành công");
        } else {
          console.error("Lấy danh sách timework thất bại");
          // alert("Lấy danh sách timework thất bại.");
          toast.error(`Lấy danh sách timework thất bại!`,
                    {
                      rtl: false,
                      limit: 3,
                      position: toast.POSITION.TOP_RIGHT,
                    },);
        }
      } catch (error) {
        console.error("Lỗi xảy ra:", error);
        // alert("Có lỗi xảy ra trong quá trình xử lý.");
        toast.error(`Có lỗi xảy ra trong quá trình xử lý!`,
                    {
                      rtl: false,
                      limit: 3,
                      position: toast.POSITION.TOP_RIGHT,
                    },);
      }
    },
    updateWeekDates() {
      const today = new Date();
      const dayOfWeek = today.getDay();

      const currentMonday = new Date(today);
      currentMonday.setDate(
        today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)
      );

      const startOfNextWeek = new Date(currentMonday);
      // startOfNextWeek.setDate(currentMonday.getDate() + 7);
      startOfNextWeek.setDate(currentMonday.getDate() + 7 + 7);

      this.dates = Array.from({ length: 6 }, (_, i) => {
        const date = new Date(startOfNextWeek);
        date.setDate(startOfNextWeek.getDate() + i);
        const formattedDate = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;

        this.weekNumber = this.getWeekOfYear(date);
        // console.log(`Ngày ${formattedDate} thuộc tuần thứ ${this.weekNumber} của năm`);

        return formattedDate;
      });
    },

    getWeekOfYear(date) {
      const targetDate = new Date(date);
      targetDate.setHours(0, 0, 0, 0);

      const startOfYear = new Date(targetDate.getFullYear(), 0, 1);
      const dayOfWeek = startOfYear.getDay();
      const startOfFirstWeek = new Date(startOfYear);
      startOfFirstWeek.setDate(
        startOfYear.getDate() + (dayOfWeek === 0 ? -6 : 1 - dayOfWeek)
      );

      const daysDifference = Math.floor(
        (targetDate - startOfFirstWeek) / (24 * 60 * 60 * 1000)
      );
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

    getDayOfWeek(dayIndex) {
      const dayMap = {
        0: "MONDAY",
        1: "TUESDAY",
        2: "WEDNESDAY",
        3: "THURSDAY",
        4: "FRIDAY",
        5: "SATURDAY",
      };
      return dayMap[dayIndex];
    },

    async sendData() {
      const formattedData = [];

      this.dates.forEach((date, dayIndex) => {
        this.periods.forEach((period) => {

          const timeworkId = this.convertToTimeworkId(
            this.getDayOfWeek(dayIndex),
            this.shifts[period].split("-")[0],
            this.shifts[period].split("-")[1]
          );

          formattedData.push({
            doctorTimeworkYear: new Date().getFullYear(),
            weekOfYear: this.weekNumber ,
            // dayOfWeek: this.getDayOfWeek(dayIndex),
            // startTime: this.shifts[period].split("-")[0],
            // endTime: this.shifts[period].split("-")[1],
            timework_id: timeworkId,
            doctorTimeworkStatus: this.isSelected(dayIndex, period)
              ? "Busy"
              : "Available",
          });
        });
      });

      console.log(JSON.stringify(formattedData, null, 2));
      // const myschedule = JSON.stringify(formattedData, null, 2);
      const BEARER_TOKEN = localStorage.getItem("token");

      try {
        const response = await axios.post(
          "https://api.unime.site/UNIME/doctortimework",
          formattedData,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(BEARER_TOKEN)}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("Thêm timework thành công", response.data);
          // alert("Thêm timework thành công");
          toast.success(`Thêm timework thành công!`,
                    {
                      rtl: false,
                      limit: 3,
                      position: toast.POSITION.TOP_RIGHT,
                    },);
        } else {
          console.error("Thêm timework thất bại", response.data);
          // alert("Thêm timework thất bại.");
          toast.error(`Thêm timework thất bại!`,
                    {
                      rtl: false,
                      limit: 3,
                      position: toast.POSITION.TOP_RIGHT,
                    },);
        }
      } catch (error) {
        console.error("Lỗi xảy ra:", error);
        // alert("Có lỗi xảy ra trong quá trình xử lý.");
        toast.error(`Có lỗi xảy ra trong quá trình xử lý!`,
                    {
                      rtl: false,
                      limit: 3,
                      position: toast.POSITION.TOP_RIGHT,
                    },);
      }
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
