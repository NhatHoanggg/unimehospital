<template>
  <div class="patient-management">
    <h1>Quản lý bác sĩ</h1>
    <div>
      <input type="text" v-model="searchQuery" placeholder="Tìm kiếm theo tên" />
      <select v-model="rowsPerPage">
        <option v-for="option in rowsOptions" :key="option" :value="option">{{ option }} dòng</option>
      </select>

      <table border="1" cellpadding="10">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>SĐT</th>
            <th>Giới tính</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.patientId">
            <td>{{ user.patientName }}</td>
            <td>{{ user.patientEmail }}</td>
            <td>{{ user.patientPhoneNumber }}</td>
            <td>{{ formatGender(user.patientGender) }}</td>
            <td>
              <button @click="editUser(user.patientId)">Edit</button>
              <button @click="deleteUser(user.patientId)">Delete</button>
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
        return user.patientName.toLowerCase().includes(this.searchQuery.toLowerCase());
      });

      const start = (this.currentPage - 1) * this.rowsPerPage;
      return filtered.slice(start, start + this.rowsPerPage);
    },
    totalPages() {
      const filtered = this.users.filter(user => {
        return user.patientName.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
      return Math.ceil(filtered.length / this.rowsPerPage);
    }
  },
  methods: {
    fetchData() {
      const BEARER_TOKEN = localStorage.getItem('token');
      axios.get('https://api.unime.site/UNIME/patients',{
        headers: {
        'Authorization': `Bearer ${JSON.parse(BEARER_TOKEN)}`
        }
        }
      )
        .then(response => {
          this.users = response.data.result;
        })
        .catch(error => {
          console.error("Error fetching data: ", error);
        });
    },
    formatGender(gender) {
      return gender ? 'Nam' : 'Nữ';
    },
    editUser(id) {
      console.log(`Editing user with id: ${id}`);
    },
    deleteUser(id) {
      console.log(`Deleting user with id: ${id}`);
      this.users = this.users.filter(user => user.patientId !== id);
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
.patient-management {
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
