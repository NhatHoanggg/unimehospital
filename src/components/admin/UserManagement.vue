<template>
  <div class="wrapper">

  <div class="service-management">
    <h1>Quản lý Service</h1>
    <div>
      <div class="filter-container">

    <input type="text" v-model="searchQuery" placeholder="Search by name" />
        </div>
    <select v-model="rowsPerPage">
      <option v-for="option in rowsOptions" :key="option" :value="option">{{ option }} rows</option>
    </select>
    <div class="tabe">

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
    </div>


    <div class="pagination">
      <button :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">Next</button>
    </div>
    <!-- <div class="pagination">
      <button :disabled="currentPage === 1" @click="previousPage">Previous</button>
      <span>{{ currentPage }}</span>
      <button :disabled="currentPage === totalPages" @click="nextPage">Next</button>
    </div> -->
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
.wrapper {
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100%;
  margin-top: 64px;
}

.service-management {
  padding: 50px;
  border-radius: 20px;
  border-width: 1px;
  max-width: 960px;
  background-color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
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