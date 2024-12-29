<template>
    <div class="wrapper">
      <div class="appointment-container">
        <h2>Lịch sử đặt lịch</h2>
        <div class="filter-container">
          <label for="date">Ngày:</label>
          <input type="date" v-model="filterDate" id="date" />
          <button @click="searchAppointments">Search</button>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th style="width: 60px">#</th>
                <th style="width: 150px">Ngày</th>
                <th style="width: 150px">Thời gian</th>
                <th style="width: 200px">Bệnh nhân</th>
                <th style="width: 200px">Dịch vụ</th>
                <th style="width: 100px">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(appointment, index) in paginatedAppointments"
                :key="appointment.appointmentId"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ formatAppointmentDate(appointment) }}</td>
                <td>{{ `${appointment.startTime} - ${appointment.endTime}` }}</td>
                <td>{{ appointment.patientName }}</td>
                <td>{{ appointment.serviceName }}</td>
                <td>
                  <span :class="getStatusClass(appointment.appointmentStatus)">{{
                    appointment.appointmentStatus
                  }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="pagination">
          <button :disabled="currentPage === 1" @click="previousPage">
            Previous
          </button>
          <span>{{ currentPage }}</span>
          <button :disabled="currentPage === totalPages" @click="nextPage">
            Next
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        filterDate: "",
        appointments: [],
        currentPage: 1,
        itemsPerPage: 10,
        dayOfWeekMap: {
          monday: 1,
          tuesday: 2,
          wednesday: 3,
          thursday: 4,
          friday: 5,
          saturday: 6,
          sunday: 7,
        },
      };
    },
    computed: {
      sortedAppointments() {
        return [...this.appointments].sort((a, b) => {
          // So sánh năm
          if (a.year !== b.year) {
            return b.year - a.year;
          }
          
          // So sánh tuần
          if (a.weekOfYear !== b.weekOfYear) {
            return b.weekOfYear - a.weekOfYear;
          }
          
          // So sánh ngày trong tuần
          const aDayNum = this.dayOfWeekMap[a.dayOfWeek.toLowerCase()];
          const bDayNum = this.dayOfWeekMap[b.dayOfWeek.toLowerCase()];
          if (aDayNum !== bDayNum) {
            return bDayNum - aDayNum;
          }
          
          // So sánh thời gian bắt đầu
          const aTime = parseInt(a.startTime.replace(':', ''));
          const bTime = parseInt(b.startTime.replace(':', ''));
          return bTime - aTime;
        });
      },
      paginatedAppointments() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        return this.sortedAppointments.slice(start, start + this.itemsPerPage);
      },
      totalPages() {
        return Math.ceil(this.appointments.length / this.itemsPerPage);
      },
    },
    methods: {
      getDateFromWeek(year, week, dayOfWeek) {
        const januaryFirst = new Date(year, 0, 1);
  
        const dayOffset = januaryFirst.getDay(); 
        const firstMonday =
          dayOffset <= 4
            ? 1 + (1 - dayOffset) 
            : 1 + (8 - dayOffset); 
  
        const weekOffset = (week - 1) * 7;
        const dayInWeekOffset = this.dayOfWeekMap[dayOfWeek.toLowerCase()] - 1;
  
        const resultDate = new Date(
          year,
          0,
          firstMonday + weekOffset + dayInWeekOffset
        );
        return resultDate;
      },
  
      formatAppointmentDate(appointment) {
        const date = this.getDateFromWeek(
          appointment.year,
          appointment.weekOfYear,
          appointment.dayOfWeek
        );
        return date.toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      },
  
      async fetchAppointments() {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch("https://api.unime.site/UNIME/appointmentHistories/getByDoctor", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
  
          if (data.code === 1000) {
            this.appointments = data.result;
          }
        } catch (error) {
          console.error("Error fetching appointments:", error);
        }
      },
  
      async searchAppointments() {
        console.log("Searching appointments for date:", this.filterDate);
        await this.fetchAppointments();
      },
  
      getStatusClass(status) {
        const statusClasses = {
          Pending: "status-pending",
          Completed: "status-done",
          Cancelled: "status-cancelled",
        };
        return statusClasses[status] || "status-default";
      },
  
      previousPage() {
        if (this.currentPage > 1) this.currentPage--;
      },
  
      nextPage() {
        if (this.currentPage < this.totalPages) this.currentPage++;
      },
  
      getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      },
    },
    mounted() {
      this.filterDate = this.getCurrentDate();
      this.fetchAppointments();
    },
  };
  </script>
  
  <style scoped>
  .wrapper {
    display: flex;
    justify-content: center;
    height: 100vh;
    width: 100%;
    margin-top: 64px;
    margin-bottom: 64px;
  }
  .appointment-container {
    padding: 50px;
    border-radius: 20px;
    border-width: 1px;
    background-color: white;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
  .filter-container {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }
  .table-container {
    overflow-x: auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th,
  td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: center;
  }
  .status-pending {
    color: #ffa500;
    font-weight: bold;
  }
  .status-done {
    color: #008000;
    font-weight: bold;
  }
  .status-cancelled {
    color: #ff0000;
    font-weight: bold;
  }
  .status-default {
    color: #666;
  }
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
  }
  
  button {
    padding: 5px 10px;
    border: none;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    border-radius: 8px;
  }
  button:disabled {
    background-color: #ccc;
  }
  </style>