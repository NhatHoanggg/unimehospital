<template>
    <div class="profile-page">
      <div class="sidebar">
        <router-link to="/profile"><i class="fas fa-user"></i> Hồ sơ</router-link>
        <router-link to="/history"><i class="fas fa-history"></i> Lịch sử</router-link>
        <router-link to="/settings"><i class="fas fa-cog"></i> Cài đặt</router-link>
        <a href="#" @click.prevent="handleLogout"><i class="fas fa-sign-out-alt"></i> Đăng xuất</a>
      </div>
      
      <div class="profile-content">
        <h2>Edit Profile</h2>
        <form @submit.prevent="handleSave">
          <label>Họ và tên</label>
          <input type="text" v-model="userData.name" placeholder="nhat" />
          
          <label>Email</label>
          <input type="email" v-model="userData.email" placeholder="@gmail.com" />
          
          <label>Số điện thoại</label>
          <input type="text" v-model="userData.phone" placeholder="0999899969" />
  
          <div class="row">
            <div class="field">
              <label>Địa chỉ</label>
              <select v-model="userData.address">
                <option>Đà Nẵng</option>
              </select>
            </div>
            <div class="field">
              <label>Giới tính</label>
              <select v-model="userData.gender">
                <option>Nam</option>
                <option>Nữ</option>
              </select>
            </div>
          </div>
          
          <div class="form-actions">
            <button type="button" @click="handleCancel">Hủy</button>
            <button type="submit">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  

<script>
export default {
  data() {
    return {
      userData: {
        name: '',
        email: '',
        phone: '',
        address: 'Đà Nẵng',
        gender: 'Nam',
      },
      showDropdown: false
    };
  },
  methods: {
    handleSave() {
      alert("Profile saved!");
    },
    handleCancel() {
      alert("Changes canceled");
    },
    handleLogout() {
      alert("Logged out");
    }
  }
};
</script>

<style scoped>
.profile-page {
  display: flex;
}

.sidebar {
  width: 200px;
  background: #f5f5f5;
  padding: 20px 10px;
  position: fixed;
  top: 60px; 
  left: 0;
  height: 125px;
  z-index: 1; 
}

.sidebar a,
.sidebar .router-link {
  display: block;
  margin: 10px 0;
  color: #333;
  text-decoration: none;
}

.profile-content {
  flex: 1;
  margin-left: 220px;
  padding: 20px;
  padding-top: 80px;
  background: #f0f0f0;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input, select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.row {
  display: flex;
  gap: 10px;
}

.field {
  flex: 1;
}

.form-actions {
  display: flex;
  gap: 10px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button[type="button"] {
  background-color: #ddd;
}

button[type="submit"] {
  background-color: #007bff;
  color: #fff;
}
</style>
