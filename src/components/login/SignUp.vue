<template>
  <div class="container">
    <div class="register-wrapper">
      <div class="register-image">
        <img src="@/assets/Doctor_intro.png" alt="register Image" />
      </div>
      <div class="register-card">
        <h2>Nhập thông tin</h2>
        <form @submit.prevent="submitregister">
          <div class="input-field">
            <div class="input-group">
              <i class="fas fa-user"></i>
              <input
                type="text"
                id="fullname"
                v-model="fullname"
                placeholder="Nhập họ tên người dùng"
                required
                aria-label="Tên người dùng"
              />
            </div>
          </div>

          <div class="input-field">
            <div class="input-group">
              <i class="fas fa-user"></i>
              <input
                type="text"
                id="username"
                v-model="username"
                placeholder="Nhập tên đăng nhập"
                required
                aria-label="Tên người dùng"
              />
            </div>
          </div>

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
                readonly
              />
            </div>
          </div>

          <div class="input-field">
            <div class="input-group">
              <i class="fas fa-lock"></i>
              <input
                type="password"
                id="password"
                v-model="password"
                placeholder="Nhập mật khẩu"
                required
                aria-label="Mật khẩu"
              />
            </div>
          </div>

          <div class="input-field">
            <div class="input-group">
              <i class="fas fa-lock"></i>
              <input
                type="password"
                id="confirmPassword"
                v-model="confirmPassword"
                placeholder="Xác thực mật khẩu"
                required
                aria-label="Xác thực mật khẩu"
              />
            </div>
          </div>

          <div class="input-field">
            <div class="input-group">
              <i class="fas fa-calendar-alt"></i>
              <input
                type="date"
                id="dob"
                v-model="dob"
                required
                aria-label="Ngày sinh"
              />
            </div>
          </div>

          <div class="input-field">
            <div class="input-group">
              <label for="gender">Giới tính:</label>
              <select v-model="gender" required>
                <option value="" disabled selected>Chọn giới tính</option>
                <option value="true">Nam</option>
                <option value="false">Nữ</option>
              </select>
            </div>
          </div>

          <div class="input-field">
            <div class="input-group">
              <i class="fas fa-phone"></i>
              <input
                type="tel"
                id="phone"
                v-model="phone"
                placeholder="Nhập số điện thoại"
                required
                aria-label="Số điện thoại"
              />
            </div>
          </div>

          <div class="input-field">
            <div class="input-group">
              <i class="fas fa-map-marker-alt"></i>
              <input
                type="text"
                id="address"
                v-model="address"
                placeholder="Nhập địa chỉ"
                required
                aria-label="Địa chỉ"
              />
            </div>
          </div>

          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
          <button type="submit" class="register-button">Xác nhận</button>
        </form>
        <div class="extra-options">
          <router-link to="/sign-in">Đã có tài khoản? Đăng nhập</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { toast } from 'vue3-toastify'

export default {
  data() {
    return {
      username: "",
      fullname: "",
      email: this.$route.query.email || "",
      password: "",
      confirmPassword: "",
      address: "",
      dob: "",
      gender: "", 
      phone: "",  
      errorMessage: "",
    };
  },
  methods: {
    async submitregister() {
      if (
        !this.fullname ||
        !this.username ||
        !this.email ||
        !this.password ||
        !this.confirmPassword ||
        !this.address ||
        !this.dob ||
        !this.gender ||
        !this.phone
      ) {
        this.errorMessage = "Vui lòng điền tất cả các trường.";
        toast.error(`Vui lòng điền tất cả các trường.`,
                    {
                      rtl: false,
                      limit: 3,
                      position: toast.POSITION.TOP_RIGHT,
                    },); 
        return;
      }

      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Mật khẩu không khớp.";
        toast.error(`${this.errorMessage}`,
                    {
                      rtl: false,
                      limit: 3,
                      position: toast.POSITION.TOP_RIGHT,
                    },); 
        return;
      }

      const patientData = {
        patientUsername: this.username,
        patientPassword: this.password,
        patientEmail: this.email,
        patientName: this.fullname,
        patientAddress: this.address,
        patientPhoneNumber: "+84" + this.phone.substring(1),
        patientGender: this.gender === "true", 
        patientDateOfBirth: this.dob,
      };
      console.log(patientData)
      try {
        const response = await axios.post('https://api.unime.site/UNIME/patients', patientData);
        
        console.log(response.data);

        toast.success(`Đăng ký thành công!`,
                    {
                      rtl: false,
                      limit: 3,
                      position: toast.POSITION.TOP_RIGHT,
                    },);
        
        this.$router.push("/sign-in");
      } catch (error) {
        // this.errorMessage = "Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại.";
        this.errorMessage = error.response.data.message;
        if (error.response.data.message === "Invalid password format") {
          this.errorMessage = "Sai định dạng mật khẩu.\nMật khẩu phải chứa ít nhất 8 ký tự!";
        }
        if (error.response.data.message === "Email is already registered") {
          this.errorMessage = "Email đã được đăng ký!";
        }
        if (error.response.data.message === "Username is already taken") {
          this.errorMessage = "Tên đăng nhập đã được sử dụng!";
        }
        console.error(error);
        toast.error(`${this.errorMessage}`,
                    {
                      rtl: false,
                      limit: 3,
                      position: toast.POSITION.TOP_RIGHT,
                    },); 
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
.register-button,
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
  background-color: #fff;
}

.input-group i {
  position: absolute;
  left: 10px;
  color: var(--secondary-color);
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

.input-group input::placeholder {
  color: #aaa;
}

.input-group select{
  font-size: 1rem;
  padding: 10px;
  border: 1px solid var(--input-border);
  border-radius: 10px;
  margin-left: 20px;
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

.register-button {
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
.register-button::before {
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
.register-button:hover::before {
  width: 100%;
  left: 0;
  right: unset;
}
.register-button:hover {
  box-shadow: 0 0 #3b82f6, 0 0 #151515;
  color: white;
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
