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
          <button type="button" @click="handleCancel" class="btn-cancel">
            Hủy
          </button>
          <button type="submit" class="btn-submit">Đổi mật khẩu</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

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
    resetForm() {
      this.currentPassword = "";
      this.newPassword = "";
      this.confirmPassword = "";
    },
    
    async handleChangePassword() {
      if (this.newPassword !== this.confirmPassword) {
        alert("Mật khẩu xác nhận không khớp!");
        return;
      }

      if (this.currentPassword === this.confirmPassword) {
        alert("Mật khẩu mới không được trùng với mật khẩu cũ!");
        return;
      }

      const token = localStorage.getItem("token");
      const data = {
        oldPassword: this.currentPassword,
        newPassword: this.newPassword,
      };

      try {
        const response = await axios.get(
          `https://api.unime.site/UNIME/password`,
          data,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          }
        );

        if (response.data.code !== 1000) {
          alert("Mật khẩu hiện tại không đúng!");
          return;
        }
        
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }

      alert("Mật khẩu đã được đổi thành công!");
      this.resetForm();
    },
    handleCancel() {
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
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  font-family: 'Roboto', sans-serif;
}

.form-container {
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  animation: fadeIn 0.5s ease;
}

h2 {
  margin-bottom: 20px;
  font-size: 28px;
  color: #333;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
  color: #555;
}

input {
  width: 95%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.3s, box-shadow 0.3s;
  margin-right: 20px;
}

input:focus {
  outline: none;
  border-color: #6a11cb;
  box-shadow: 0 0 6px rgba(106, 17, 203, 0.5);
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.btn-cancel {
  background-color: #f44336;
  color: #fff;
}

.btn-submit {
  background-color: #6a11cb;
  color: #fff;
}

button:hover {
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
  opacity: 0.8;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
