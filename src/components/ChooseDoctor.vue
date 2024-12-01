<template>
    <div class="list-container">
      <div v-if="loading" class="loading">Đang tải dữ liệu...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else>
        <multiselect
          v-model="selectedDoctor"
          :options="doctors"
          placeholder="Chọn bác sĩ"
          label="label"
          track-by="value"
          :searchable="true"
          :close-on-select="true"
          :allow-empty="false"
          class="multi-select"
          @select="handleDoctorSelect"
        />
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Multiselect from "vue-multiselect";
  
  export default {
    components: { Multiselect },
    data() {
      return {
        doctors: [],
        selectedDoctor: null,
        loading: false,
        error: null,
      };
    },
    methods: {
      async fetchDoctors() {
        this.loading = true;
        this.error = null;
        try {
          const response = await axios.get(
            `https://api.unime.site/UNIME/doctorservice/get/doctorList/${this.$route.params.id}`
          );
          if (response.data.code === 1000) {
            this.doctors = response.data.result.map((doctor) => ({
              value: doctor.doctorId,
              label: doctor.doctorName,
              detail: {
                doctorId: doctor.doctorId,
                doctorName: doctor.doctorName,
                doctorImage: doctor.departmentName,
                doctorAddress: doctor.doctorAddress,
                doctorPhoneNumber: doctor.doctorPhoneNumber,
                departmentName: doctor.departmentName,
                doctorDateOfBirth: doctor.doctorDateOfBirth,
              }
            }));
          } else {
            throw new Error("Không thể tải .");
          }
        } catch (error) {
          this.error = "Đã xảy ra lỗi khi tải .";
        } finally {
          this.loading = false;
        }
      },
      handleDoctorSelect() {
        if (this.selectedDoctor) {
          console.log("Bác sĩ đã chọn:", this.selectedDoctor);
          this.$emit("doctor-selected", {doctor: this.selectedDoctor});
        }
        else{
          console.log("Không có bác sĩ nào được chọn.");
        }
      },
    },
    mounted() {
      this.fetchDoctors();
    },
  };
  </script>
  
    
    <style scoped>
    .list-container {
      /* padding: 20px; */
      max-width: 600px;
    }
    
    .loading {
      text-align: center;
      font-size: 18px;
      color: #555;
    }
    
    .error {
      color: red;
      text-align: center;
      font-size: 16px;
    }
    
    .multi-select {
      margin-top: 0;
    }
    
    </style>
    