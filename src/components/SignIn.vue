<template>
  <div class="login-wrapper">
    <div class="login-image">
      <img src="@/assets/Doctor_intro.png" alt="Login Image">
    </div>
    <div class="login-card">
      <h2>Đăng nhập</h2>
      <form @submit.prevent="submitLogin">
        <div class="input-field">
          <input type="text" v-model="phone" placeholder="Số điện thoại" required>
        </div>
        <div class="input-field">
          <input type="password" v-model="password" placeholder="Mật khẩu" required>
        </div>
        <button type="submit" class="login-button">Đăng nhập</button>
      </form>
      <div class="extra-options">
        <a href="/register">Tạo tài khoản</a>
        <a href="/forgot-password">Quên mật khẩu?</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  data() {
    return {
      phone: '',
      password: '',
    };
  },
  methods: {
  submitLogin() {
    const formData = new FormData();
    formData.append('phone', this.phone);
    formData.append('password', this.password);

    fetch('http://localhost/login-app/login.php', { // Đảm bảo đường dẫn chính xác
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert(data.message); // Đăng nhập thành công
      } else {
        alert(data.message); // Đăng nhập thất bại
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
}
};
</script>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right,  rgba(255, 255, 255, 1) 5%,      /* Màu trắng, độ mờ 100% */
    rgba(92, 192, 246, 1) 52%,      /* Màu xanh nhạt (#5CC0F6), độ mờ 100% */
    rgba(0, 114, 245, 0.9) 100%     /* Màu xanh đậm (#0072F5), độ mờ 90% */);
}

.login-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-image img {
  max-width: 300px;
  width: 50%;
  height : auto;
  display: block;
}

.login-card {
  background-color: #a0c4ff;
  border-radius: 20px;
  padding: 2rem;
  width: 320px;
  text-align: center;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #1d4ed8;
  margin-bottom: 2rem;
  font-size: 1.5rem;
}

.input-field {
  margin-bottom: 1.5rem;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  color: #333;
}

input:focus {
  outline: none;
  border-color: #3b82f6;
}

.login-button {
  background-color: #3b82f6;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  width: 100%;
  cursor: pointer;
  font-size: 1rem;
}

.login-button:hover {
  background-color: #2563eb;
}

.extra-options {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  font-size: 0.9rem;
}

.extra-options a {
  color: #3b82f6;
  text-decoration: none;
}

.extra-options a:hover {
  text-decoration: underline;
}
</style>
