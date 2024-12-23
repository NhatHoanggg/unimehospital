<template>
  <div class="appointment-list">
    <h1>Danh sách lịch hẹn</h1>

    <button @click="fetchAppointments">Cập nhật danh sách</button>

    <div v-if="appointments.length === 0" class="no-data">
      <p>Không có lịch hẹn nào được tìm thấy.</p>
    </div>

    <table v-else class="appointments-table">
      <thead>
        <tr>
          <th>STT</th>
          <th>Tên bệnh nhân</th>
          <th>Tên bác sĩ</th>
          <th>Ngày</th>
          <th>Ca</th>
          <th>Dịch vụ</th>
          <th>Thời gian</th>
          <th>Trạng thái</th>
          <th>Ghi chú</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(appointment, index) in appointments" :key="appointment.appointmentId">
          <td>{{ index + 1 }}</td>
          <td>{{ appointment.patientName }}</td>
          <td>{{ appointment.doctorName }}</td>
          <td>{{ formatDay(appointment.dayOfWeek) }}</td>
          <td>{{ appointment.startTime }} - {{ appointment.endTime }}</td>
          <td>{{ appointment.serviceName }}</td>
          <td>{{ appointment.appointmentCreatedAt }}</td>
          <td :class="getStatusClass(appointment.appointmentStatus)">{{ appointment.appointmentStatus }}</td>
          <td>{{ appointment.appointmentNote || 'Không có' }}</td>
          <td><button @click="viewDetails(appointment)">Chi tiết</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appointments: [],
    };
  },
  methods: {
    async fetchAppointments() {
      try {
        const BEARER_TOKEN = localStorage.getItem("token");
        const response = await fetch("https://api.unime.site/UNIME/appointments/getByPatient",{
            headers: {
              Authorization: `Bearer ${JSON.parse(BEARER_TOKEN)}`,
            },
          });
        const data = await response.json();
        if (data.code === 1000) {
          this.appointments = data.result;
        } else {
          console.error("Failed to fetch appointments");
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    },
    formatDay(dayOfWeek) {
      const days = {
        monday: "Thứ 2",
        tuesday: "Thứ 3",
        wednesday: "Thứ 4",
        thursday: "Thứ 5",
        friday: "Thứ 6",
        saturday: "Thứ 7",
        sunday: "Chủ nhật",
      };
      return days[dayOfWeek] || dayOfWeek;
    },
    getStatusClass(status) {
      return {
        Pending: "status-pending",
        Confirmed: "status-confirmed",
        Cancelled: "status-cancelled",
      }[status] || "status-unknown";
    },
    viewDetails(appointment) {
      alert(`Xem chi tiết lịch hẹn: ${appointment.appointmentId}`);
    },
  },
  mounted() {
    this.fetchAppointments();
  },
};
</script>

<style>
.appointment-list {
  max-width: 800px;
  margin: auto;
  text-align: center;
}

.appointments-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.appointments-table th, .appointments-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.appointments-table th {
  background-color: #f4f4f4;
}

.status-pending {
  color: orange;
}

.status-confirmed {
  color: green;
}

.status-cancelled {
  color: red;
}

.no-data {
  margin-top: 20px;
  color: #666;
}
</style>
