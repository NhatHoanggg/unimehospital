<template>
  <div class="container">
    <div class="doctor-detail-container">
    <div class="doctor-header">
      <div class="doctor-image">
        <img :src="doctor.doctorImage" alt="Doctor Image" />
      </div>
      <div class="doctor-info">
        <h2>{{ doctor.doctorName }}</h2>
        <p><strong>Chuyên khoa:</strong> {{ doctor.departmentName }}</p>
        <p><strong>Địa chỉ:</strong> {{ doctor.doctorAddress }}</p>
      </div>
    </div>
  </div>
  <DatePickerComponent @date-selected="handleDateSelected" />
  <ChooseServiceComponent :selectedDate="selectedDate" :selectedTime="selectedTime" @service="handleServiceSelected" />
  <AddNoteComponent @note="handleAddNote"/>
  <button class="button" @click="confirmAppoinment()">Xác nhận đặt lịch</button>
  </div>
  
</template>

<script>
import DatePickerComponent from "@/components/DatePickerComponent.vue";
import ChooseServiceComponent from "@/components/ChooseServiceComponent.vue";
import AddNoteComponent from "@/components/AddNoteComponent.vue";
import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

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
      selectedService: '',
      servicePrice: '',
      noteText: '',
      doctor: {},
    };
  },
  mounted() {
  const doctorId = this.$route.params.id;
  const doctorData = localStorage.getItem("selectedDoctor");

  if (doctorData) {
    const doctor = JSON.parse(doctorData);
    if (doctor.doctorId == doctorId) {
      this.doctor = doctor;
    } else {
      this.fetchDoctorData(doctorId);
    }
  } else {
    this.fetchDoctorData(doctorId);
  }
  },
  methods: {
    handleDateSelected(selection) {
      const { date, time } = selection;
      this.selectedDate = date;
      this.selectedTime = time;
      console.log(`Ngày: ${date}, Giờ: ${time}`);
    },

    handleServiceSelected(selection) {
      const { service, price } = selection;
      this.selectedService = service;
      this.servicePrice = price;
      console.log(`Dịch vụ: ${this.selectedService}, Giá: ${this.servicePrice}`);
    },

    handleAddNote(selection) {
      const { note } = selection;
      this.noteText = note;
      console.log(`Ghi chú: ${note}`);
    },

    confirmAppoinment(){
      if (!this.selectedDate || !this.selectedTime) {
        // alert("Vui lòng chọn ngày, giờ trước khi xác nhận đặt lịch.");
        toast.warning(`Vui lòng chọn ngày, giờ trước khi xác nhận đặt lịch.`,
            {
              rtl: false,
              limit: 3,
              position: toast.POSITION.TOP_RIGHT,
            },);  
        return;
      }
      if (!this.selectedDate || !this.selectedTime || !this.selectedService) {
        // alert("Vui lòng chọn dịch vụ trước khi xác nhận đặt lịch.");
        toast.warning(`Vui lòng chọn dịch vụ trước khi xác nhận đặt lịch.`,
            {
              rtl: false,
              limit: 3,
              position: toast.POSITION.TOP_RIGHT,
            },);  
        return;
      }
      const appointment_info = {
        doctor_name: this.doctor.doctorName,
        doctor_specialty: this.doctor.departmentName,
        date: this.selectedDate,
        time: this.selectedTime,
        doctor_address: this.doctor.doctorAddress,
        service: this.selectedService,
        note: this.noteText,
        price: this.servicePrice,
      }
      localStorage.setItem("appointment-info", JSON.stringify(appointment_info));
      this.$router.push({ name: 'BookingSuccess' });
    },

    async fetchDoctorData(id) {
      try {
        const response = await axios.get(`https://6720cd2f98bbb4d93ca61a67.mockapi.io/api/v1/doctors/${id}`);
        this.doctor = response.data;
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    }
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: auto;
  background-color: #F1F5F9;
}

.doctor-detail-container {
  max-width: 980px;
  margin: 0 auto;
  margin-top: 70px;
  padding: 20px;
  text-align: left;
}

.doctor-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.doctor-image img {
  width: 120px;
  height: 120px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
}
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
