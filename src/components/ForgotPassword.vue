<template>
  <div class="container">
    <div class="register-wrapper">
      <div class="register-image">
        <img src="@/assets/Doctor_intro.png" alt="register Image" />
      </div>
      <div class="forgot-password-card">
        <h2>Quên mật khẩu</h2>
        <form @submit.prevent="submitForgotPassword">
          <div class="input-field">
            <div class="input-group">
              <i class="fas fa-envelope"></i>
              <input
                type="email"
                id="email"
                v-model="email"
                placeholder="Nhập Email"
                required
                aria-label="Email"
              />
            </div>
          </div>
          
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
          <button type="submit" class="forgot-password-button">Gửi yêu cầu</button>
        </form>
        <div class="extra-options">
          <router-link to="/sign-in">Quay lại đăng nhập</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      newPassword: "",
      confirmPassword: "",
      errorMessage: "",
    };
  },
  methods: {
    async submitResetPassword() {
      if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = "Mật khẩu không khớp.";
        return;
      }

      try {
        const response = await axios.post('http://localhost:8888/UNIME/reset-password', {
          email: this.$route.params.email, 
          password: this.newPassword,
        });
        
        console.log(response.data);
        this.$router.push("/sign-in");
      } catch (error) {
        this.errorMessage = "Không thể đặt lại mật khẩu. Vui lòng thử lại.";
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");

:root {
  --primary-color: #3b82f6;
  --secondary-color: #2563eb;
  --background-gradient: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  --card-background: #ffffff;
  --input-border: #ddd;
  --input-focus-border: var(--primary-color);
  --text-color: #333;
  --link-color: var(--primary-color);
  --link-hover-color: var(--secondary-color);
  --error-color: #ef4444;
}

body,
.register-wrapper,
.register-card,
.input-field,
.sendOTP-button,
.extra-options a {
  font-family: "Poppins", sans-serif;
}

.container {
  width: 100%;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 1) 5%,
    rgba(92, 192, 246, 1) 52%,
    rgba(0, 114, 245, 0.9) 100%
  );
}

.register-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1440px;
  margin: 0 auto;
  
}

.register-card {
  background-color: #a0c4ff;
  border-radius: 20px;
  padding: 2rem;
  width: 320px;
  text-align: center;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
  max-width: 1440px;
}

.register-image {
  flex: 1;
  display: none;
  justify-content: center;
  align-items: center;
}

.register-image img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  /* box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); */
  transition: transform 0.3s ease;
}

.register-image img:hover {
  transform: scale(1.05);
}

.register-card {
  background-color: var(--card-background);
  border-radius: 15px;
  padding: 2.5rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.register-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

h2 {
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  font-weight: 600;
  text-align: center;
}

.input-field {
  margin-bottom: 1.25rem;
  position: relative;
}

.input-field label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  font-weight: 500;
}

.input-group {
  display: flex;
  align-items: center;
  position: relative;
}

.input-group i {
  position: absolute;
  left: 10px;
  color: var(--secondary-color-color);
}

.input-group input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem; /* Đệm trái để tránh bị chồng icon */
  border: 1px solid var(--input-border);
  border-radius: 8px;
  font-size: 1rem;
  color: var(--text-color);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.input-group input:focus {
  outline: none;
  border-color: var(--input-focus-border);
  box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
}

.toggle-password {
  position: absolute;
  right: 10px;
  color: var(--primary-color);
  cursor: pointer;
}

.error-message {
  color: var(--error-color);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  text-align: left;
}

.sendOTP-button {
  background-color: var(--primary-color);
  color: #ffffff;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  width: 50%;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
}

.sendOTP-button:hover {
  background-color: var(--secondary-color);
  transform: translateY(-2px);
}

.extra-options {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  font-size: 0.9rem;
}

.extra-options a {
  color: var(--link-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

.extra-options a:hover {
  color: var(--link-hover-color);
  text-decoration: underline;
}

/* Responsive Styles */
@media (min-width: 768px) {
  .register-wrapper {
    padding: 40px;
  }

  .register-image {
    display: flex;
    flex: 1;
    margin-right: 2rem;
  }

  .register-card {
    max-width: 450px;
  }
}

@media (max-width: 767px) {
  .register-card {
    padding: 2rem 1.5rem;
  }

  h2 {
    font-size: 1.6rem;
  }

  .extra-options {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .extra-options a {
    text-align: center;
  }
}
</style>
