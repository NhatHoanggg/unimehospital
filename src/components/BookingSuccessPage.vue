<template>
  <div class="booking-confirmation">
    <div class="confirmation-card">
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
          <i class="fa fa-calendar-alt"></i> Ngày: {{ appointment_info.date }} &nbsp;&nbsp;&nbsp;
          Thời gian: {{ appointment_info.time }}
        </p>
        <p>
          <i class="fa fa-map-marker-alt"></i> Địa chỉ: {{ appointment_info.doctor_address }} 
        </p>
        <p>
          <i class="fa fa-stethoscope"></i> Dịch vụ: <strong> {{ appointment_info.service }}</strong>
        </p>
        <p>
          <!-- <i class="fa fa-sticky-note"></i> Ghi chú: {{ appointment_info.note }} -->
        </p>
        <p>
          <i class="fa fa-dollar-sign"></i> Giá tiền: {{ appointment_info.price }}₫
        </p>
      </div>
      <button @click="goHome" class="btn-home">Quay về trang chủ</button>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import { toast } from 'vue3-toastify';

export default {
  data() {
    return {
      appointment_info: {},
      serviceId: '',
      doctorTimeworkId: '',
    };
  },
  methods: {
    goHome() {
      this.$router.push('/');
    },
    async addAppointment(){
      const BEARER_TOKEN = localStorage.getItem("token");
      const data = {
        doctorserviceId: this.serviceId,
        doctortimeworkId: this.doctorTimeworkId,
      }
      // console.log(data)
      try {
        const response = await axios.post(
          "https://api.unime.site/UNIME/appointments",
          data,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(BEARER_TOKEN)}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("Đặt lịch thành công:", response.data);
          // alert("Đặt lịch thành công!");
          toast.success(`Đặt lịch thành công!`,
                    {
                      rtl: false,
                      limit: 3,
                      position: toast.POSITION.TOP_RIGHT,
                    },); 
        } else {
          console.error("Lỗi khi đặt lịch:", response.data);
          // alert("Đặt lịch thất bại.");
          toast.error(`Đặt lịch thất bại!`,
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
    }
  },
  mounted() {
    const appointmentData = localStorage.getItem('appointment-info');
    if (appointmentData) {
      this.appointment_info = JSON.parse(appointmentData);
      this.doctorTimeworkId = this.appointment_info.doctorTimeworkId;
      this.serviceId = this.appointment_info.serviceId;
      // console.log(this.appointment_info.doctorTimeworkId);
      this.addAppointment();
    }
  }
};
</script>
  
<style scoped>
.booking-confirmation {
  margin-top: 64px;
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
