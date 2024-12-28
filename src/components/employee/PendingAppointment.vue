<template>
    <div class="wrapper">
      <div class="appointment-container">
        <h2>Lịch hẹn sắp tới</h2>
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
                <th style="width: 200px">Tên bệnh nhân</th>
                <th style="width: 200px">Bác sĩ</th>
                <th style="width: 200px">Dịch vụ</th>
                <th style="width: 100px">Trạng thái</th>
                <th style="width: 100px">Hủy lịch</th>
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
                <td>{{ appointment.doctorName }}</td>
                <td>{{ appointment.serviceName }}</td>
                <td>
                  <span :class="getStatusClass(appointment.appointmentStatus)">{{
                    appointment.appointmentStatus
                  }}</span>
                </td>
                <td>
                  <button class="cancel-btn" @click="cancelAppointment(appointment.appointmentId)">
                    Hủy
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
          <h3>Xác nhận hủy lịch hẹn</h3>
          <textarea 
            v-model="cancellationNote"
            placeholder="Vui lòng nhập lý do hủy lịch..."
            rows="4"
            class="cancellation-textarea"
          ></textarea>
          <div class="modal-buttons">
            <button class="confirm-btn" @click="confirmCancellation">Xác nhận</button>
            <button class="cancel-modal-btn" @click="closeModal">Đóng</button>
          </div>
        </div>
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
  import axios from 'axios';
  
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
        showModal: false,
        cancellationNote: "",
        selectedAppointmentId: null,
  
  
      };
    },
    computed: {
      paginatedAppointments() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        return this.appointments.slice(start, start + this.itemsPerPage);
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
          // const response = await fetch("https://api.unime.site/UNIME/appointments/getByPatient", {
          //   method: "GET",
          //   headers: {
          //     "Content-Type": "application/json",
          //     Authorization: `Bearer ${token}`,
          //   },
          // });
          const response = await axios.get('https://api.unime.site/UNIME/appointments/getByDepartment', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (response.data.code === 1000) {
            this.appointments = response.data.result;
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
          Done: "status-done",
          Cancelled: "status-cancelled",
        };
        return statusClasses[status] || "status-default";
      },
  
      cancelAppointment(id) {
          console.log("Cancel appointment with id:", id);
        this.selectedAppointmentId = id;
        this.showModal = true;
        this.cancellationNote = "";
      },
  
      closeModal() {
        this.showModal = false;
        this.cancellationNote = "";
        this.selectedAppointmentId = null;
      },
  
      async confirmCancellation() {
        if (!this.cancellationNote.trim()) {
          alert("Vui lòng nhập lý do hủy lịch!");
          return;
        }
  
        const confirmed = confirm("Bạn có chắc chắn muốn hủy lịch hẹn này?");
        if (!confirmed) return;
  
        try {
          const token = localStorage.getItem("token");
          const response = await axios.post(
            "https://api.unime.site/UNIME/appointments/updateCancelledByEmployee",
            {
              appointmentId: this.selectedAppointmentId,
              appointmentNote: this.cancellationNote,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          if (response.data.code === 1000) {
            alert("Hủy lịch hẹn thành công!");
            this.closeModal();
            this.fetchAppointments(); 
          } else {
            alert("Có lỗi xảy ra khi hủy lịch hẹn!");
          }
        } catch (error) {
          console.error("Error cancelling appointment:", error);
          alert("Có lỗi xảy ra khi hủy lịch hẹn!");
        }
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
    max-width: 960px;
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
  .cancel-btn {
    padding: 5px 10px;
    border: none;
    background-color: #c73535;
    color: #fff;
    cursor: pointer;
    border-radius: 8px;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 100%;
    max-width: 500px;
  }
  
  .cancellation-textarea {
    width: 90%;
    margin: 15px 0;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: vertical;
  }
  
  .modal-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  
  .confirm-btn {
    background-color: #dc3545;
  }
  
  .cancel-modal-btn {
    background-color: #6c757d;
  }
  
  </style>
  