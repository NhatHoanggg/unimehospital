<template>
  <div class="container">
    <div class="register-wrapper">
      <div class="register-image">
        <img src="@/assets/Doctor_intro.png" alt="register Image" />
      </div>
      <div class="register-card">
        <h2>Nhập OTP</h2>
        <form @submit.prevent="submitOTP">
          <div class="otp-inputs">
            <input
              type="text"
              v-model="otp[0]"
              @input="moveFocus(0)"
              maxlength="1"
              aria-label="OTP 1"
              class="otp-input"
              ref="otpInput0"
            />
            <input
              type="text"
              v-model="otp[1]"
              @input="moveFocus(1)"
              maxlength="1"
              aria-label="OTP 2"
              class="otp-input"
              ref="otpInput1"
            />
            <input
              type="text"
              v-model="otp[2]"
              @input="moveFocus(2)"
              maxlength="1"
              aria-label="OTP 3"
              class="otp-input"
              ref="otpInput2"
            />
            <input
              type="text"
              v-model="otp[3]"
              @input="moveFocus(3)"
              maxlength="1"
              aria-label="OTP 4"
              class="otp-input"
              ref="otpInput3"
            />
          </div>

          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
          <div class="resend">
            <span>Chưa nhận được OTP? </span>
            <button type="button" @click="resendOTP" class="resend-button">
              Gửi lại
            </button>
          </div>
          <button type="submit" class="confirm-button">Xác nhận</button>
        </form>
        <div class="extra-options">
          <router-link to="/sign-in">Đã có tài khoản? Đăng nhập</router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "SendOTP",
  data() {
    return {
      otp: ["", "", "", ""], 
      errorMessage: "",
      email: this.$route.query.email || "", 
    };
  },
  methods: {
    moveFocus(index) {
      if (this.otp[index].length === 1 && index < 3) {
        this.$refs[`otpInput${index + 1}`].focus();
      } else if (this.otp[index].length === 0 && index > 0) {
        this.$refs[`otpInput${index - 1}`].focus();
      }
    },
    submitOTP() {
      const otpString = this.otp.join('');
      const otpPattern = /^\d{4}$/;
      if (!otpPattern.test(otpString)) {
        this.errorMessage = "Mã OTP phải là 4 chữ số.";
        return;
      }

      // Kiểm tra mã OTP tạm thời
      if (otpString === "8888") {
        this.$router.push({ 
          path: "/sign-up", 
          query: { email: this.email } 
        });
      } else {
        this.errorMessage = "Mã OTP không hợp lệ.";
      }
    },
    resendOTP() {
      alert("Đã gửi lại mã OTP vào email của bạn.");
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
.confirm-button,
.resend-button,
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
  color: var(--secondary-color);
}

.input-group input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem; 
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

.error-message {
  color: var(--error-color);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  text-align: left;
}

.otp-inputs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}

.otp-input {
  width: 60px;
  height: 60px;
  font-size: 24px;
  text-align: center;
  border: 1px solid var(--input-border);
  border-radius: 8px;
  margin: 0 5px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.otp-input:focus {
  outline: none;
  border-color: var(--input-focus-border);
  box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
}

.confirm-button {
  background: #fff;
  box-shadow: 4px 4px #3b82f6, 9px 9px #151515;
  color: #151515;
  text-transform: lowercase;
  border: solid 2px #151515;

  text-decoration: none;

  padding: 18px 32px;
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  position: relative;
  z-index: 1;
  transition: 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  cursor: pointer;
  overflow: hidden;
  transition-delay: 0s !important;
  text-transform: uppercase !important;
  letter-spacing: 1.5px;
  font-family: sans-serif;
}
.confirm-button::before {
  position: absolute;
  content: "";
  top: 0;
  right: 0;
  width: 0%;
  height: 100%;
  background: #151515;
  z-index: -1;
  transition: 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86);
}
.confirm-button:hover::before {
  width: 100%;
  left: 0;
  right: unset;
}
.confirm-button:hover {
  box-shadow: 0 0 #3b82f6, 0 0 #151515;
  color: white;
}
.resend-button {
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  font-size: 0.9rem;
}

.resend-button:hover {
  color: var(--secondary-color);
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
