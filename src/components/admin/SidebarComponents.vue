<template>
    <div class="sidebar">
      <ul>
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">Appointments</a></li>
        <li><a href="#">Add Doctor</a></li>
        <li><a href="#">Doctors List</a></li>
      </ul>
    </div>
  </template>
  
  <style scoped>
  .sidebar {
    width: 250px;
    background-color: white;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul li {
    margin: 20px 0;
  }
  ul li a {
    text-decoration: none;
    color: #555;
    font-size: 18px;
    display: flex;
    align-items: center;
  }
  ul li a:hover {
    color: #4b7bec;
  }
  </style>
  