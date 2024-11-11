<template>
    <div class="appointment-dashboard">
      <h1>Dashboard</h1>
  
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
            <th>#</th>
            <th>Patient</th>
            <th>Status</th>
            <th>Appointment</th>
            <th>Doctor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(appointment, index) in filteredAppointments" :key="appointment.id">
            <td>{{ index + 1 + (currentPage - 1) * rowsPerPage }}</td>
            <td>{{ appointment.patient }}</td>
            <td :class="statusClass(appointment.status)">{{ appointment.status }}</td>
            <td>{{ formatDate(appointment.createAt) }}</td>
            <td>{{ appointment.doctor }}</td>
            <td>
              <button @click="scheduleAppointment(appointment.id)">Schedule</button>
              <button @click="cancelAppointment(appointment.id)">Cancel</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Pagination -->
      <div class="pagination">
        <button :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">
          Next
        </button>
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
      };
    },
    computed: {
      filteredAppointments() {
        const filtered = this.appointments.filter((appointment) =>
          appointment.patient.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
  
        const start = (this.currentPage - 1) * this.rowsPerPage;
        return filtered.slice(start, start + this.rowsPerPage);
      },
      totalPages() {
        const filtered = this.appointments.filter((appointment) =>
          appointment.patient.toLowerCase().includes(this.searchQuery.toLowerCase())
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
          })
          .catch((error) => {
            console.error("Error fetching data: ", error);
          });
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
  .appointment-dashboard {
    margin-top: 20px;
  }
  
  .controls {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th,
  td {
    text-align: left;
    padding: 8px;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  button {
    margin-right: 5px;
    padding: 5px 10px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #ddd;
  }
  
  input[type="text"] {
    padding: 5px;
    width: 200px;
  }
  
  select {
    padding: 5px;
  }
  
  /* CSS cho trạng thái */
  .scheduled {
    color: white;
    background-color: #28a745; /* Màu xanh cho Scheduled */
    padding: 4px 8px;
    border-radius: 4px;
    text-align: center;
  }
  
  .pending {
    color: white;
    background-color: #007bff; 
    padding: 4px 8px;
    border-radius: 4px;
    text-align: center;
  }
  
  .cancelled {
    color: white;
    background-color: #dc3545; 
    padding: 4px 8px;
    border-radius: 4px;
    text-align: center;
  }
  
  .pagination {
    margin-top: 10px;
  }
  </style>
  