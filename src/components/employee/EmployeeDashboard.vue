<template>
  <div class="wrapper">
    <div class="appointment-dashboard">
      <h1>Dashboard</h1>
      <div class="appointment-stats">
        <div class="stat-card scheduled">
          <i class="icon-scheduled"></i>
          <div class="stat-info">
            <p class="stat-number">{{ scheduledCount }}</p>
            <p>Scheduled appointments</p>
          </div>
        </div>
        <div class="stat-card pending">
          <i class="icon-pending"></i>
          <div class="stat-info">
            <p class="stat-number">{{ pendingCount }}</p>
            <p>Pending appointments</p>
          </div>
        </div>
        <div class="stat-card cancelled">
          <i class="icon-cancelled"></i>
          <div class="stat-info">
            <p class="stat-number">{{ cancelledCount }}</p>
            <p>Cancelled appointments</p>
          </div>
        </div>
      </div>

      <div class="controls">
        <input type="text" v-model="searchQuery" placeholder="Search by name" />
        <select v-model="rowsPerPage">
          <option v-for="option in rowsOptions" :key="option" :value="option">
            {{ option }} rows
          </option>
        </select>
      </div>

      <table border="1" cellpadding="10">
        <thead>
          <tr>
            <th style="width: 30px;">#</th>
            <th style="width: 300px;">Patient</th>
            <th style="width: 100px; text-align: center;">Status</th>
            <th style="width: 200px;">Appointment</th>
            <th style="width: 300px;">Doctor</th>
            <th style="width: 150px; text-align: center;">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(appointment, index) in filteredAppointments"
            :key="appointment.id"
          >
            <td>{{ index + 1 + (currentPage - 1) * rowsPerPage }}</td>
            <td>{{ appointment.patient }}</td>
            <td :class="statusClass(appointment.status)">
              {{ appointment.status }}
            </td>
            <td>{{ formatDate(appointment.createAt) }}</td>
            <td>{{ appointment.doctor }}</td>
            <td class = "action-container">
              <button @click="scheduleAppointment(appointment.id)">
                Schedule
              </button>
              <button @click="cancelAppointment(appointment.id)">Cancel</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pagination">
        <button
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
        >
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      appointments: [],
      rowsPerPage: 5,
      currentPage: 1,
      searchQuery: "",
      rowsOptions: [5, 10, 20, 50],
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };
  },
  computed: {
    filteredAppointments() {
      const filtered = this.appointments.filter((appointment) =>
        appointment.patient
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );

      const start = (this.currentPage - 1) * this.rowsPerPage;
      return filtered.slice(start, start + this.rowsPerPage);
    },
    totalPages() {
      const filtered = this.appointments.filter((appointment) =>
        appointment.patient
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
      return Math.ceil(filtered.length / this.rowsPerPage);
    },
  },
  methods: {
    fetchData() {
      axios
        .get("https://672a7507976a834dd0237a0a.mockapi.io/appointments")
        .then((response) => {
          this.appointments = response.data;
          this.updateStats();
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    },
    updateStats() {
      this.scheduledCount = this.appointments.filter(
        (a) => a.status === "scheduled"
      ).length;
      this.pendingCount = this.appointments.filter(
        (a) => a.status === "pending"
      ).length;
      this.cancelledCount = this.appointments.filter(
        (a) => a.status === "cancelled"
      ).length;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    },
    scheduleAppointment(id) {
      console.log(`Scheduling appointment with id: ${id}`);
    },
    cancelAppointment(id) {
      console.log(`Cancelling appointment with id: ${id}`);
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    statusClass(status) {
      return {
        scheduled: status === "scheduled",
        pending: status === "pending",
        cancelled: status === "cancelled",
      };
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.appointment-dashboard {
  width: 100%;
  max-width: 1440px;
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.appointment-stats {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
  background-color: #f0f2f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stat-card i {
  font-size: 2.5rem;
  color: #666;
}

.stat-info {
  margin-left: 15px;
}

.stat-number {
  font-size: 1.75rem;
  font-weight: bold;
  color: #FFF;
}

.stat-info p:last-child {
  color: #FFF;
  font-size: 1rem;
}

.scheduled,
.pending,
.cancelled {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 20px;
  color: white;
  font-weight: bold;
  text-align: center;
  font-size: 0.9rem;
  min-width: 80px;
}

.scheduled {
  background-color: #28a745;
}

.pending {
  background-color: #3b82f6;
}

.cancelled {
  background-color: #dc3545;
}

.controls {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

input[type="text"],
select {
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse; 
  margin-bottom: 20px;
  border: 2px solid #000; 
}

th,
td {
  text-align: left;
  padding: 12px;
  font-size: 1rem;
  border: none;
}

th {
  background-color: #007bff;
  color: white;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #e7e9f8;
  border-bottom: 1px solid #000; 
}

tr:nth-child(odd) {
  border-bottom: 1px solid #000; 
}

.action-container{
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
}

button {
  padding: 8px 12px;
  font-size: 0.9rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #ddd;
}

button:first-child {
  background-color: #28a745;
  color: white;
}

button:last-child {
  background-color: #dc3545;
  color: white;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
}

.pagination button {
  padding: 8px 15px;
  font-size: 1rem;
  border-radius: 4px;
}

.pagination button:disabled {
  background-color: #e9ecef;
  color: #6c757d;
  cursor: not-allowed;
}

</style>
