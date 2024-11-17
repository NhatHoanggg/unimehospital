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
            <th style="width: 60px;">#</th>
            <th style="width: 150px;">Time</th>
            <th style="width: 300px;">Name</th>
            <th style="width: 100px;">Gender</th>
            <th style="width: 100px;">Status</th>
            <th style="width: 100px;">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(appointment, index) in paginatedAppointments" :key="appointment.id">
            <td>{{ index +1 }}</td>
            <td>{{ appointment.time }}</td>
            <td>{{ appointment.name }}</td>
            <td>{{ appointment.gender }}</td>
            <td><span :class="getStatusClass(appointment.status)">{{ appointment.status }}</span></td>
            <td><button @click="viewDetail(appointment.id)">Detail</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="previousPage">Previous</button>
      <span>{{ currentPage }}</span>
      <button :disabled="currentPage === totalPages" @click="nextPage">Next</button>
    </div>
  </div>
</div>

</template>

<script>
export default {
  data() {
    return {
      filterDate: '', 
      appointments: [
        { id: 1, time: "16:00 - 17:00",  name: "Phillip Hogan", gender: "Male", status: "Upcoming" },
        { id: 2, time: "16:00 - 17:00",  name: "Rosa Burgess", gender: "Male", status: "Done" },
        { id: 3, time: "16:00 - 17:00",  name: "Mina Nichols", gender: "Male", status: "Upcoming" },
        { id: 4, time: "16:00 - 17:00",  name: "Lula McCoy", gender: "Male", status: "Upcoming" },
        { id: 5, time: "16:00 - 17:00",  name: "Chase George", gender: "Male", status: "Upcoming" },
        { id: 6, time: "16:00 - 17:00",  name: "Rose Cruz", gender: "Male", status: "Upcoming" },
        { id: 7, time: "16:00 - 17:00",  name: "Marion Stevenson", gender: "Male", status: "Upcoming" },
        { id: 8, time: "16:00 - 17:00",  name: "Nina Stanley", gender: "Male", status: "Upcoming" },
        { id: 9, time: "16:00 - 17:00",  name: "Bertie Mullins", gender: "Male", status: "Upcoming" },
        { id: 10, time: "16:00 - 17:00",  name: "Lottie Henry", gender: "Male", status: "Upcoming" },
        { id: 11, time: "16:00 - 17:00",  name: "Cora Robbins", gender: "Male", status: "Upcoming" },
        { id: 12, time: "16:00 - 17:00",  name: "Kenneth Murphy", gender: "Male", status: "Upcoming" },
      ],
      currentPage: 1,
      itemsPerPage: 10,
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
    searchAppointments() {
      console.log("Searching appointments for date:", this.filterDate);
    },
    getStatusClass(status) {
      return status === "Upcoming" ? "status-upcoming" : "status-done";
    },
    viewDetail(id) {
      console.log("Viewing details for appointment ID:", id);
      this.$router.push({ name: "AppointmentDetail", params: { id: id } });
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
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  },
  mounted() {
    this.filterDate = this.getCurrentDate();
  }
};
</script>


<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100%;
  margin-top: 64px;
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
th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
}
.status-upcoming {
  color: green;
}
.status-done {
  color: red;
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
