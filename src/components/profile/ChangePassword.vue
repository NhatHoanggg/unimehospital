<template>
    <div class="change-password-page">
      <div class="form-container">
        <h2>Đổi mật khẩu</h2>
        <form @submit.prevent="handleChangePassword">
          <div class="form-group">
            <label for="currentPassword">Mật khẩu hiện tại</label>
            <input
              type="password"
              id="currentPassword"
              v-model="currentPassword"
              placeholder="Nhập mật khẩu hiện tại"
              required
            />
          </div>
  
          <div class="form-group">
            <label for="newPassword">Mật khẩu mới</label>
            <input
              type="password"
              id="newPassword"
              v-model="newPassword"
              placeholder="Nhập mật khẩu mới"
              required
            />
          </div>
  
          <div class="form-group">
            <label for="confirmPassword">Xác nhận mật khẩu mới</label>
            <input
              type="password"
              id="confirmPassword"
              v-model="confirmPassword"
              placeholder="Xác nhận mật khẩu mới"
              required
            />
          </div>
  
          <div class="form-actions">
            <button type="button" @click="handleCancel">Hủy</button>
            <button type="submit">Đổi mật khẩu</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ChangePassword",
    data() {
      return {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      };
    },
    methods: {
      handleChangePassword() {
        if (this.newPassword !== this.confirmPassword) {
          alert("Mật khẩu xác nhận không khớp!");
          return;
        }
        // Thực hiện logic đổi mật khẩu
        alert("Mật khẩu đã được đổi thành công!");
      },
      handleCancel() {
        // Điều hướng hoặc reset form nếu cần
        this.currentPassword = "";
        this.newPassword = "";
        this.confirmPassword = "";
      },
    },
  };
  </script>
  
  <style scoped>
  .change-password-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f9f9f9;
  }
  
  .form-container {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }
  
  h2 {
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-size: 14px;
    color: #555;
  }
  
  input {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 3px rgba(0, 123, 255, 0.5);
  }
  
  .form-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }
  
  button {
    padding: 10px 20px;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button[type="button"] {
    background-color: #ddd;
    color: #333;
  }
  
  button[type="submit"] {
    background-color: #007bff;
    color: #fff;
  }
  
  button:hover {
    opacity: 0.9;
  }
  </style>
  