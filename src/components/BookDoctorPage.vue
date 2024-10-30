<template>
  <DatePickerComponent @date-selected="handleDateSelected" />
  <ChooseServiceComponent :selectedDate="selectedDate" :selectedTime="selectedTime" />
  <AddNoteComponent />
  <button class="button">Xác nhận đặt lịch</button>
</template>

<script>
import DatePickerComponent from "@/components/DatePickerComponent.vue";
import ChooseServiceComponent from "@/components/ChooseServiceComponent.vue";
import AddNoteComponent from "@/components/AddNoteComponent.vue";

export default {
  components: {
    DatePickerComponent,
    ChooseServiceComponent,
    AddNoteComponent,
  },
  name: "BookingPage",
  data() {
    return {
      selectedDate: '',
      selectedTime: '',
    };
  },
  methods: {
    handleDateSelected(selection) {
      const { date, time } = selection;
      this.selectedDate = date;
      this.selectedTime = time;
      console.log(`Ngày: ${date}, Giờ: ${time}`);
      alert(`Bạn đã chọn: Ngày ${date}, Giờ ${time}`);
    },
  },
};
</script>

<style scoped>
.button {
  margin-top: 32px;
  margin-bottom: 32px;
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
