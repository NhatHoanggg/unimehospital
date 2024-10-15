<template>
    <div class="dashboard-container">
      <aside class="sidebar">
        <ul>
          <li>
            <router-link to="/dashboard">
              <i class="fas fa-home"></i> Dashboard
            </router-link>
          </li>
          <li>
            <router-link to="/appointments">
              <i class="fas fa-calendar-alt"></i> Appointments
            </router-link>
          </li>
          <li>
            <router-link to="/add-doctor">
              <i class="fas fa-user-md"></i> Add Doctor
            </router-link>
          </li>
          <li>
            <router-link to="/doctors-list">
              <i class="fas fa-users"></i> Doctors List
            </router-link>
          </li>
        </ul>
      </aside>
  
      <main class="content">
        <h1>All Appointments</h1>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Patient</th>
              <th>Age</th>
              <th>Date & Time</th>
              <th>Doctor</th>
              <th>Fees</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(appointment, index) in appointments" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ appointment.patient }}</td>
              <td>{{ appointment.age }}</td>
              <td>{{ appointment.datetime }}</td>
              <td>{{ appointment.doctor }}</td>
              <td>{{ appointment.fees }}</td>
              <td><button class="action-btn">View</button></td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: "AdminDashboard",
    data() {
      return {
        appointments: [
          {
            patient: "John Doe",
            age: 29,
            datetime: "2024-10-20 10:00 AM",
            doctor: "Dr. Smith",
            fees: "$50"
          },
          {
            patient: "Jane Doe",
            age: 32,
            datetime: "2024-10-21 11:30 AM",
            doctor: "Dr. Brown",
            fees: "$75"
          }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .dashboard-container {
    display: flex;
  }
  
  .sidebar {
    width: 200px;
    background-color: #f4f5f7;
    padding: 20px;
    min-height: 100vh;
  }
  
  .sidebar ul {
    list-style: none;
    padding: 0;
  }
  
  .sidebar ul li {
    margin-bottom: 20px;
  }
  
  .sidebar ul li a {
    color: #333;
    text-decoration: none;
    font-size: 16px;
    display: flex;
    align-items: center;
  }
  
  .sidebar ul li a i {
    margin-right: 10px;
    font-size: 20px;
  }
  
  .content {
    flex-grow: 1;
    padding: 20px;
    background-color: #f9fafb;
  }
  
  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  table th, table td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  table th {
    background-color: #f4f5f7;
    font-weight: 600;
  }
  
  table tr:nth-child(even) {
    background-color: #f9fafb;
  }
  
  .action-btn {
    background-color: #4CAF50;
    color: white;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
  }
  
  .action-btn:hover {
    background-color: #45a049;
  }
  </style>
  