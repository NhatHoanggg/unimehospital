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
  <DatePickerComponent :doctorId="doctorId" @date-selected="handleDateSelected" />
  <ChooseServiceComponent :selectedDate="selectedDate" :selectedTime="selectedTime" @service="handleServiceSelected" />
  <!-- <AddNoteComponent @note="handleAddNote"/> -->
  <button class="button" @click="confirmAppoinment()">Xác nhận đặt lịch</button>
  </div>
  
</template>

<script>
import DatePickerComponent from "@/components/DatePickerComponent.vue";
import ChooseServiceComponent from "@/components/ChooseServiceComponent.vue";
import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  components: {
    DatePickerComponent,
    ChooseServiceComponent,
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
      doctorTimeworkId: '',
      serviceId: '',
      doctorId: this.$route.params.id,
    };
  },
  mounted() {
    this.fetchDoctorData(this.doctorId);
    // const doctorData = localStorage.getItem("selectedDoctor");

    // if (doctorData) {
    //   const doctor = JSON.parse(doctorData);
    //   if (doctor.doctorId == this.doctorId) {
    //     this.doctor = doctor;
    //   } else {
    //     this.fetchDoctorData(this.doctorId);
    //   }
    // } else {
    //   this.fetchDoctorData(this.doctorId);
    // }
  },
  methods: {
    handleDateSelected(data) {
      console.log("doctor timework id:", data.doctorTimeworkId);
      this.selectedDate = data.date;
      this.selectedTime = data.time;
      this.doctorTimeworkId = data.doctorTimeworkId;
      console.log(`Ngày: ${this.selectedDate}, Giờ: ${this.selectedTime}`);
      console.log(`Doctor timework id: ${this.doctorTimeworkId}`);
    },

    handleServiceSelected(selection) {
      const { id, service, price } = selection;
      this.serviceId = id 
      this.selectedService = service;
      this.servicePrice = price;
      console.log(`Dịch vụ: ${this.selectedService}, Giá: ${this.servicePrice}`);
      console.log(`Service id: ${this.serviceId}`);
    },

    confirmAppoinment(){
      if (!this.selectedDate || !this.selectedTime) {
        toast.warning(`Vui lòng chọn ngày, giờ trước khi xác nhận đặt lịch.`,
            {
              rtl: false,
              limit: 3,
              position: toast.POSITION.TOP_RIGHT,
            },);  
        return;
      }
      if (!this.selectedDate || !this.selectedTime || !this.selectedService) {
        toast.warning(`Vui lòng chọn dịch vụ trước khi xác nhận đặt lịch.`,
            {
              rtl: false,
              limit: 3,
              position: toast.POSITION.TOP_RIGHT,
            },);  
        return;
      }
      const appointment_info = {
        serviceId: this.serviceId,
        doctorId: this.doctorId,
        doctorTimeworkId: this.doctorTimeworkId,
        doctor_name: this.doctor.doctorName,
        doctor_specialty: this.doctor.departmentName,
        date: this.selectedDate,
        time: this.selectedTime,
        doctor_address: this.doctor.doctorAddress,
        service: this.selectedService,
        price: this.servicePrice,
      }
      localStorage.setItem("appointment-info", JSON.stringify(appointment_info));
      this.$router.push({ name: 'BookingSuccess' });
    },

    async fetchDoctorData(id) {
      try {
        const response = await axios.get(`https://api.unime.site/UNIME/doctors/get/getDetail/${id}`);
        this.doctor = response.data.result;
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
  margin-top: 64px;
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
