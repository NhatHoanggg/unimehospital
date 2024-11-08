<template>
  <div class="container">
    <div class="box">
      <div class="title">
        <h1>2. Thông tin dịch vụ</h1>
        <i v-if="!isCollapsed" class="fas fa-chevron-up" @click="toggleCollapse"></i>
        <i v-else class="fas fa-chevron-down" @click="toggleCollapse"></i>
      </div>

      <div v-show="!isCollapsed" class="content">
        <div class="service-container">
          <div class="service-wrapper">
            <div class="service-content">
              <div class="date-time">
                <div class="date"><i class="far fa-calendar-check"></i> Ngày: {{ selectedDate || "Chưa chọn" }}</div>
                <div class="time"><i class="far fa-clock"></i> Giờ: {{ selectedTime || "Chưa chọn" }}</div>
              </div>
              <div class="location"><i class="fas fa-map-marker-alt"></i> Địa điểm: {{ doctor.address }}</div>
              <!-- <div class="service-option"><i class="fas fa-hand-holding-heart"></i> Dịch vụ: Khám tổng quát</div> -->
              <div class="service-option">
                <i class="fas fa-hand-holding-heart"></i> 
                Dịch vụ:
                <select v-model="selectedService">
                  <option disabled value="">Vui lòng chọn</option>
                  <option v-for="item in items" :key="item.value" :value="item.value">
                    {{ item.label }}
                  </option>
                </select>
              </div>
              <div class="money"><i class="fas fa-dollar-sign"></i>Giá tiền: {{ servicePrice }}</div>
            </div>
            <button class="button" @click="confirmSelection">Tiếp tục</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  props: {
    selectedDate: {
      type: String,
      default: "",
    },
    selectedTime: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isCollapsed: true,
      doctor: {},
      items: [
        { label: 'Khám bệnh', value: 'Khám bệnh' },
        { label: 'Tư vấn', value: 'Tư vấn' },
      ],
      selectedService: '',
    };
  },
  mounted() {
  const doctorId = this.$route.params.id;
  const doctorData = localStorage.getItem("selectedDoctor");

  if (doctorData) {
    const doctor = JSON.parse(doctorData);
    if (doctor.id === doctorId) {
      this.doctor = doctor;
    } else {
      this.fetchDoctorData(doctorId);
    }
  } else {
    this.fetchDoctorData(doctorId);
  }
  },
  
  computed: {
    servicePrice() {
      if (this.selectedService === 'Khám bệnh') {
        return '800000đ';
      } else if (this.selectedService === 'Tư vấn') {
        return '500000đ';
      }
      return 'Vui lòng chọn dịch vụ';
    },
  },
  methods: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    },
    confirmSelection() {
      if (this.selectedService === 'Khám bệnh' || this.selectedService === 'Tư vấn') {
        // alert(`Dịch vụ vào ngày ${this.selectedDate} lúc ${this.selectedTime} đã được xác nhận.`);
        this.isCollapsed = !this.isCollapsed;
        this.$emit('service', { service: this.selectedService, price: this.servicePrice });
        toast.success(`Chọn dịch vụ thành công`,
            {
              rtl: false,
              limit: 3,
              position: toast.POSITION.TOP_RIGHT,
            },);  
      }
      else {
        toast.warning('Vui lòng chọn dịch vụ trước khi tiếp tục!',
            {
              rtl: false,
              limit: 3,
              position: toast.POSITION.TOP_RIGHT,
            },);
      }
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
    margin-top: 20px;
    align-items: center;
    justify-content: center;
    display: flex;
    color: #2046A9;
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
  
  .service-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 400px;
    gap: 20px;
    transition: all 0.3s ease;
    font-size: 20px;
  }
  
  .service-wrapper {
    min-height: 400px;
  }
  
  .service-container {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  width: 100%;
  gap: 20px;
}

.service-wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px; 
}

.service-content {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, auto); 
  gap: 10px;
  width: 100%;
  
}

.service-content > div {
  display: flex;
  align-items: center;
  font-size: 24px;
  padding: 10px;
  padding-left: 50px;
}

.date-time, .location, .service-option, .money {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 900px;
}

.date-time .date, .date-time .time {
  display: flex;
  align-items: center;
  gap: 5px;
}

.date-time {
    justify-content: space-between;
}

.service-option select{
  font-size: 24px;
  padding: 10px;
  border-radius: 10px;
}

  .button {
    position: absolute; 
    bottom: 50px;       
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
  </style>
  