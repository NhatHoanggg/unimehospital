<template>
  <div class="booking-confirmation">
    <div v-if="isLoading" class="loading">
      <p>Đang tải dữ liệu</p>
      <LoadingComponent />
    </div>
    <div v-else>
      <div v-if="bookingSuccess" class="confirmation-card">
        <div class="icon-check">
          <i class="fa fa-check-circle"></i>
        </div>
        <h2>ĐẶT LỊCH KHÁM THÀNH CÔNG</h2>
        <div class="doctor-info">
          <p><strong>{{ appointment_info.doctor_name }}</strong></p>
          <p>Chuyên khoa: {{ appointment_info.doctor_specialty }}</p>
        </div>
        <div class="details">
          <p>
            <span class="label"><i class="fa fa-calendar-alt"></i> Ngày:</span>
            <span class="value">{{ appointment_info.date }}</span>
          </p>
          <p>
            <span class="label"><i class="fa fa-clock"></i> Thời gian:</span>
            <span class="value">{{ appointment_info.time }}</span>
          </p>
          <p>
            <span class="label"><i class="fa fa-map-marker-alt"></i> Địa chỉ:</span>
            <span class="value">{{ appointment_info.doctor_address  }}</span>
          </p>
          <p>
            <span class="label"><i class="fa fa-stethoscope"></i> Dịch vụ:</span>
            <span class="value"><strong>{{ appointment_info.service }}</strong></span>
          </p>
          <p>
            <span class="label"><i class="fa fa-dollar-sign"></i> Giá tiền:</span>
            <span class="value">{{ appointment_info.price }}₫</span>
          </p>
        </div>
        <button @click="goHome" class="btn-home">Quay về trang chủ</button>
      </div>

      <div v-else class="confirmation-card">
        <div class="icon-check">
          <i class="fa fa-times-circle"></i>
        </div>
        <h2>ĐẶT LỊCH KHÁM THẤT BẠI</h2>
        <button @click="goHome" class="btn-home">Quay về trang chủ</button>
      </div>
    </div>
  </div>
</template>


<script>

import axios from 'axios';
import { toast } from 'vue3-toastify';
import LoadingComponent from './tools/LoadingComponent.vue';

export default {
  data() {
    return {
      appointment_info: {},
      serviceId: '',
      doctorId: '',
      doctorTimeworkId: '',
      isLoading: false,
      bookingSuccess: true,
    };
  },
  components: {
    LoadingComponent,
  },
  methods: {
    goHome() {
      this.$router.push('/');
    },
    async addAppointment(){
      const data = {
        doctorId: this.doctorId,
        serviceId: this.serviceId,
        doctortimeworkId: this.doctorTimeworkId,
      }
      console.log(data)
      this.isLoading = true;
      const BEARER_TOKEN = localStorage.getItem("token");
      try {
        const response = await axios.post(
          "https://api.unime.site/UNIME/appointments",
          data,
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`,
            },
          }
        );

        if (response.status === 200) {
          this.isLoading = false;
          toast.success(`Đặt lịch thành công!`,
                    {
                      rtl: false,
                      limit: 3,
                      position: toast.POSITION.TOP_RIGHT,
                    },); 
        } else {
          console.error("Lỗi khi đặt lịch:", response.data);
          this.isLoading = false;
          this.bookingSuccess = false;
          toast.error(`Đặt lịch thất bại!`,
                    {
                      rtl: false,
                      limit: 3,
                      position: toast.POSITION.TOP_RIGHT,
                    },); 
          }
      } catch (error) {
        console.error("Lỗi xảy ra:", error);
        this.isLoading = false;
        this.bookingSuccess = false;
        toast.error(`Có lỗi xảy ra trong quá trình xử lý!`,
                    {
                      rtl: false,
                      limit: 3,
                      position: toast.POSITION.TOP_RIGHT,
                    },);
      }
    }
  },
  mounted() {
    const appointmentData = localStorage.getItem('appointment-info');
    if (appointmentData) {
      this.appointment_info = JSON.parse(appointmentData);
      this.doctorTimeworkId = this.appointment_info.doctorTimeworkId;
      this.serviceId = this.appointment_info.serviceId;
      this.doctorId = this.appointment_info.doctorId;
      this.addAppointment();
    }
  }
};
</script>
  
<style scoped>
.booking-confirmation {
  /* margin-top: 64px; */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f4f8;
  padding: 20px;
}

.confirmation-card {
  background-color: #ffffff;
  border: 2px solid #3169f5;
  border-radius: 16px;
  padding: 30px;
  width: 600px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.15);
  text-align: center;
}

.icon-check {
  font-size: 70px;
  color: #3169f5;
  margin-bottom: 15px;
}

h2 {
  color: #3169f5;
  margin-bottom: 25px;
  font-size: 26px;
}

.doctor-info p {
  font-size: 20px;
  font-weight: bold;
  color: #3169f5;
  margin: 5px 0;
}

.details {
  font-size: 18px;
  color: #333333;
  margin-top: 20px;
  text-align: left;
  line-height: 1.6;
}

.details p {
  margin: 12px 0;
  display: flex;
  align-items: center;
}

.details i {
  margin-right: 10px;
  color: #3169f5;
  font-size: 18px;
}

.btn-home {
  margin-top: 25px;
  padding: 12px 25px;
  background-color: #3169f5;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-home:hover {
  background-color: #254bb5;
}

.details p {
  display: flex;
  align-items: center;
}

.details .label {
  flex: 0 0 150px; 
  font-weight: bold;
  color: #3169f5;
  display: flex;
  align-items: center;
}

.details .value {
  flex: 1; 
  color: #333;
  text-align: left;
}


@media (max-width: 768px) {
  .confirmation-card {
    width: 90%;
    padding: 20px;
  }

  .details p {
    font-size: 16px;
  }

  .btn-home {
    padding: 10px 20px;
    font-size: 16px;
  }
}
</style>
