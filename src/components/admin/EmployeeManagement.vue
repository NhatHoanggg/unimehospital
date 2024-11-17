<template>
    <div class="service-management">
      <h1>Quản lý Employee</h1>
      <div>
      <input type="text" v-model="searchQuery" placeholder="Search by name" />
  
      <select v-model="rowsPerPage">
        <option v-for="option in rowsOptions" :key="option" :value="option">{{ option }} rows</option>
      </select>
  
      <table border="1" cellpadding="10">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Birthday</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td><img :src="user.avatar" alt="avatar" width="50" height="50" /></td>
            <td>{{ user.name }}</td>
            <td>{{ user.gender }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ formatDate(user.birthday) }}</td>
            <td>{{ user.role }}</td>
            <td>
              <button @click="editUser(user.id)">Edit</button>
              <button @click="deleteUser(user.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <div>
        <button :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">Next</button>
      </div>
    </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        users: [],
        rowsPerPage: 5,
        currentPage: 1,
        searchQuery: '',
        rowsOptions: [5, 10, 20, 50],
      };
    },
    computed: {
      filteredUsers() {
        const filtered = this.users.filter(user => {
          return user.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        });
  
        const start = (this.currentPage - 1) * this.rowsPerPage;
        return filtered.slice(start, start + this.rowsPerPage);
      },
      totalPages() {
        const filtered = this.users.filter(user => {
          return user.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        });
        return Math.ceil(filtered.length / this.rowsPerPage);
      }
    },
    methods: {
      fetchData() {
        axios.get('https://672a7507976a834dd0237a0a.mockapi.io/users')
          .then(response => {
            this.users = response.data;
          })
          .catch(error => {
            console.error("Error fetching data: ", error);
          });
      },
      formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      },
      editUser(id) {
        console.log(`Editing user with id: ${id}`);
      },
      deleteUser(id) {
        console.log(`Deleting user with id: ${id}`);
        this.users = this.users.filter(user => user.id !== id);
      },
      goToPage(page) {
        if (page >= 1 && page <= this.totalPages) {
          this.currentPage = page;
        }
      }
    },
    mounted() {
      this.fetchData();
    }
  };
  </script>
  
  <style scoped>
  .service-management {
    margin-top: 64px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
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
    margin-bottom: 10px;
    padding: 5px;
    width: 200px;
  }
  
  select {
    margin-bottom: 10px;
    padding: 5px;
  }
  
  </style>