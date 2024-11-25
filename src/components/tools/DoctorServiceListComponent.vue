<template>
    <div class="service-list-container">
      <div v-if="loading" class="loading">Đang tải dữ liệu...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else>
        <multiselect
          v-model="selectedService"
          :options="services"
          placeholder="Chọn dịch vụ"
          label="label"
          track-by="value"
          :searchable="true"
          :close-on-select="true"
          :allow-empty="false"
          class="multi-select"
          @select="handleServiceSelect"
        />
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Multiselect from "vue-multiselect";
  
  export default {
    props: {
        serviceId: {
            type: Number,
            required: true,
        },
    },
    name: "ServiceMultiSelect",
    components: { Multiselect },
    data() {
      return {
        services: [], 
        selectedService: null, 
        loading: false, 
        error: null, 
      };
    },
    methods: {
      async fetchServices() {
        this.loading = true;
        this.error = null;
        try {
          const response = await axios.get(
            `https://api.unime.site/UNIME/doctorservice/get/serviceList/${this.serviceId}`
          );
          if (response.data.code === 1000) {
            this.services = response.data.result.map((service) => ({
              value: service.servicePrice, 
              label: service.serviceName, 
            }));
          } else {
            throw new Error("Không thể tải danh sách dịch vụ.");
          }
        } catch (error) {
          this.error = "Đã xảy ra lỗi khi tải danh sách dịch vụ.";
        } finally {
          this.loading = false;
        }
      },
      handleServiceSelect() {
        if (this.selectedService) {
          console.log("Dịch vụ đã chọn:", this.selectedService);
          this.$emit("service-selected",{service: this.selectedService } );
        } else {
          console.log("Không có dịch vụ nào được chọn.");
        }
      },
    },
    mounted() {
      this.fetchServices();
    },
  };
  </script>
  
  <style scoped>
  /* .service-list-container {
    max-width: 600px;
    margin: 20px auto;
    padding: 10px;
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
  } */
  </style>
  