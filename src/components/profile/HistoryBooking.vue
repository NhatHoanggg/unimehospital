<template>
    <div class="history-booking">
      <h1>Lịch sử đặt lịch</h1>
      <div v-if="bookings.length > 0">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Tên bác sĩ</th>
              <th>Chuyên khoa</th>
              <th>Ngày hẹn</th>
              <th>Giờ hẹn</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(booking, index) in bookings" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ booking.doctorName }}</td>
              <td>{{ booking.specialty }}</td>
              <td>{{ booking.date }}</td>
              <td>{{ booking.time }}</td>
              <td>{{ booking.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>Bạn chưa có lịch sử đặt lịch nào.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "HistoryBooking",
    data() {
      return {
        bookings: [], // Dữ liệu lịch sử sẽ được lấy từ API
      };
    },
    mounted() {
      this.fetchBookingHistory();
    },
    methods: {
      fetchBookingHistory() {
        this.bookings = [
          {
            doctorName: "Bác sĩ Nguyễn Văn A",
            specialty: "Tim mạch",
            date: "2024-11-20",
            time: "09:00 AM",
            status: "Đã xác nhận",
          },
          {
            doctorName: "Bác sĩ Lê Thị B",
            specialty: "Nhi khoa",
            date: "2024-11-15",
            time: "02:00 PM",
            status: "Hoàn thành",
          },
        ];
      },
    },
  };
</script>
  
  <style scoped>
  .history-booking {
    padding: 20px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  table th, table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  table th {
    background-color: #f4f4f4;
  }
</style>
  