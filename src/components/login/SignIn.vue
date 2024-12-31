<template>
  <div class="container">
    <div class="login-wrapper">
      <div class="login-image">
        <img src="@/assets/Doctor_intro.png" alt="Login Image" />
      </div>
      <div class="login-card">
        <h2>Đăng nhập</h2>
        <form @submit.prevent="submitLogin">
          <div class="input-field">
            <div class="input-group">
              <i class="far fa-user"></i>
              <input
                type="text"
                id="username"
                v-model="username"
                placeholder="Nhập username"
                required
                aria-label="Username"
              />
            </div>
          </div>
          <div class="input-field">
            <div class="input-group">
              <i class="fas fa-lock"></i>
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                placeholder="Nhập mật khẩu"
                required
                aria-label="Mật khẩu"
              />
              <!-- <span class="toggle-password" @click="toggleShowPassword">
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </span> -->
            </div>
          </div>
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
          <button type="submit" class="login-button">Đăng nhập</button>
        </form>
        <div class="extra-options">
          <router-link to="/send-otp">Tạo tài khoản</router-link>
          <router-link to="/forgot-password">Quên mật khẩu?</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify"

export default {
  name: "SignIn",
  setup() {
    const username = ref("");
    const password = ref("");
    const showPassword = ref(false);
    const errorMessage = ref("");
    const authStore = useAuthStore();
    const router = useRouter();

    const toggleShowPassword = () => {
      showPassword.value = !showPassword.value;
    };

    const submitLogin = async () => {
  // Reset error message at the start
  errorMessage.value = "";

  // Validate input fields
  if (!username.value || !password.value) {
    errorMessage.value = "Vui lòng nhập đầy đủ thông tin.";
    return;
  }

  try {
    const response = await fetch("https://api.unime.site/UNIME/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Xử lý các trường hợp lỗi cụ thể
      switch (data.message) {
        case "you do not have permission":
          errorMessage.value = "Tài khoản của bạn không có quyền truy cập vào hệ thống.";
          toast.error("Tài khoản của bạn không có quyền truy cập vào hệ thống.", {
            rtl: false,
            limit: 3,
            position: toast.POSITION.TOP_RIGHT,
          });
          break;
        case "User Not Exited":
          errorMessage.value = "Tài khoản không tồn tại trong hệ thống.";
          toast.error("Tài khoản không tồn tại trong hệ thống.", {
            rtl: false,
            limit: 3,
            position: toast.POSITION.TOP_RIGHT,
          });
          break;
        case "Unauthenticated":
          errorMessage.value = "Sai tài khoản hoặc mật khẩu. Vui lòng kiểm tra lại.";
          toast.error("Sai tài khoản hoặc mật khẩu. Vui lòng kiểm tra lại.", {
            rtl: false,
            limit: 3,
            position: toast.POSITION.TOP_RIGHT,
          });
          break;
        default:
          errorMessage.value = data.message || "Đã xảy ra lỗi. Vui lòng thử lại sau.";
          toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.", {
            rtl: false,
            limit: 3,
            position: toast.POSITION.TOP_RIGHT,
          });
      }
      
      return;
    }

    // Login successful
    authStore.login(data.result.token);
    console.log("Token: ", data.result.token);

    // Route based on user role
    const { scope } = authStore.user;
    switch (scope) {
      case "ADMIN":
        router.push("/admin");
        break;
      case "EMPLOYEE":
        router.push("/employee");
        break;
      case "DOCTOR":
        router.push("/doctor");
        break;
      case "PATIENT":
        router.push("/");
        break;
      default:
        errorMessage.value = "Quyền người dùng không hợp lệ.";
        return;
    }

  } catch (error) {
    console.error("Login error:", error);
    errorMessage.value = "Có lỗi khi kết nối đến server. Vui lòng thử lại sau.";
  }
};

    return {
      username,
      password,
      showPassword,
      errorMessage,
      toggleShowPassword,
      submitLogin,
    };
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
  --link-color: #3b82f6;
  --link-hover-color: #2563eb;
  --error-color: #ef4444;
}

body,
.login-wrapper,
.login-card,
.input-field,
.login-button,
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

.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1440px;
  margin: 0 auto;
}

.login-card {
  background-color: #a0c4ff;
  border-radius: 20px;
  padding: 2rem;
  width: 320px;
  text-align: center;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
  max-width: 1440px;
}

.login-image {
  flex: 1;
  display: none;
  justify-content: center;
  align-items: center;
}

.login-image img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  /* box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); */
  transition: transform 0.3s ease;
}

.login-image img:hover {
  transform: scale(1.05);
}

.login-card {
  background-color: var(--card-background);
  border-radius: 15px;
  padding: 2.5rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.login-card:hover {
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

.login-button {
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
.login-button::before {
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
.login-button:hover::before {
  width: 100%;
  left: 0;
  right: unset;
}
.login-button:hover {
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

/* Responsive Styles */
@media (min-width: 768px) {
  .login-wrapper {
    padding: 40px;
  }

  .login-image {
    display: flex;
    flex: 1;
    margin-right: 2rem;
  }

  .login-card {
    max-width: 450px;
  }
}

@media (max-width: 767px) {
  .login-card {
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