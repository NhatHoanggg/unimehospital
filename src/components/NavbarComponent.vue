<template>
  <div class="navbar-container">
    <nav class="navbar">
      <div class="navbar-left">
        <img src="@/assets/logoUnime.jpg" alt="Unime Logo" class="logo" />
        <div class="hospital-name">
          <h1 v-if="!isAdmin">BỆNH VIỆN UNIME</h1>
          <h1 v-else>DASHBOARD ADMIN</h1>
          <h2 v-if="!isAdmin">UNIME HOSPITAL</h2>
        </div>
      </div>
      <div class="navbar-right">
        <!-- Admin navbar -->
        <template v-if="authStore.user && authStore.user.scope === 'ADMIN'">
          <div class="admin-profile" v-if="isAdmin">
            <img
              src="@/assets/Admin-avt.jpg"
              alt="Admin Avatar"
              class="admin-avatar"
            />
            <span class="admin-label">Admin</span>
          </div>
          <button @click="handleLogout" class="logout-button">
            Logout <i class="fas fa-sign-out-alt"></i>
          </button>
        </template>
        <!------------------->
        <template v-else>
          <ul :class="['navbar-menu', { active: isMenuOpen }]">
            <li
              v-if="
                (authStore.isLoggedIn && authStore.user.scope === 'PATIENT') ||
                !authStore.isLoggedIn
              "
            >
              <router-link to="/">Trang chủ</router-link>
            </li>
            <li
              v-if="
                (authStore.isLoggedIn && authStore.user.scope === 'PATIENT') ||
                !authStore.isLoggedIn
              "
            >
              <router-link to="/about-us">Giới thiệu</router-link>
            </li>
            <li
              v-if="
                (authStore.isLoggedIn && authStore.user.scope === 'PATIENT') ||
                !authStore.isLoggedIn
              "
            >
              <router-link to="/booking">Đặt lịch khám</router-link>
            </li>

            <!-- <li v-if="!authStore.isLoggedIn">
            <router-link to="/sign-in" class="button">Đăng nhập</router-link>
          </li>
          <li v-if="!authStore.isLoggedIn">
            <router-link to="/send-otp" class="button">Đăng kí</router-link>
          </li> -->
            <!-- <button @click="toggleDarkMode" class="dark-mode-toggle">
              <i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'"></i>
            </button> -->
            <li v-if="!authStore.isLoggedIn" class="button-container">
              <router-link to="/sign-in" class="button">Đăng nhập</router-link>
              <router-link to="/send-otp" class="button">Đăng kí</router-link>
            </li>
            <li v-else class="user-menu">
              <div class="container">
                <span>Xin chào! {{ authStore.user.username }}</span>
                <div class="user-icon" @click="toggleDropdown">
                  <img :src="imageSrc" alt="User Icon" />
                </div>
              </div>

              <div v-if="showDropdown" class="dropdown">
                <router-link to="/profile">
                  <i class="fas fa-user"></i> Hồ sơ</router-link
                >
                <router-link to="/history-booking">
                  <i class="fas fa-history"></i> Lịch sử</router-link
                >
                <router-link to="/next-appointment">
                  <i class="far fa-calendar-check"></i> Lịch hẹn sắp tới</router-link
                >
                <router-link to="/change-password">
                  <i class="fas fa-cog"></i> Cài đặt</router-link
                >
                <a href="#" @click.prevent="handleLogout"
                  ><i class="fas fa-sign-out-alt"></i> Đăng xuất</a
                >
              </div>
            </li>
          </ul>

          <div class="hamburger" @click="toggleMenu">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </div>
        </template>
      </div>
    </nav>
  </div>
</template>

<script>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

export default {
  name: "NavbarComponent",
  data() {
    return {
      imageSrc: "@/assets/user.png",
    };
  },
  created() {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.image) {
        this.imageSrc = user.image;
      }
    }
  },
  setup() {
    const isMenuOpen = ref(false);
    const showDropdown = ref(false);
    const authStore = useAuthStore();
    const router = useRouter();
    const isAdmin = ref(false);
    const isEmployee = ref(false);
    const isDarkMode = ref(false);

    if (authStore.isLoggedIn && authStore.user.scope === "ADMIN") {
      isAdmin.value = true;
    }

    if (authStore.isLoggedIn && authStore.user.scope === "ADMIN") {
      isEmployee.value = true;
    }

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
    };

    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value;
      document.body.classList.toggle("dark", isDarkMode.value);
    };

    const handleLogout = () => {
      authStore.logout();
      showDropdown.value = false;
      localStorage.clear();
      router.push("/");
    };

    return {
      isAdmin,
      isMenuOpen,
      toggleMenu,
      authStore,
      showDropdown,
      toggleDropdown,
      handleLogout,
      toggleDarkMode,
      isDarkMode,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

.navbar-container {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  /* background-color: #ffffff; */
  background-color: var(--background);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.navbar {
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  /* font-family: 'Poppins', sans-serif; */
  /* font-family: "Roboto", sans-serif; */
}

.navbar-left {
  display: flex;
  align-items: center;
}

.logo {
  height: 50px;
  margin-right: 15px;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}
.admin-profile {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border: 1px solid #000000;
  border-radius: 10px;
  gap: 8px;
}

.admin-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.admin-label {
  font-weight: 500;
  color: #000000;
}

.logout-button {
  background-color: #4285f4;
  color: #ffffff;
  border: none;
  padding: 13px 15px;
  border-radius: 10px;
  font-weight: 555;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  margin-left: 8px;
}

.logout-button i {
  font-size: 14px;
}

.logout-button:hover {
  background-color: #357ae8;
}

.hospital-name h1 {
  font-size: 20px;
  margin: 0;
  color: #003a9e;
  font-weight: 600;
}

.hospital-name h2 {
  font-size: 14px;
  margin: 0;
  color: #005bb5;
  font-weight: 400;
}

.container {
  display: flex;
  align-items: space-between;
  gap: 20px;
  justify-content: center;
  align-items: center;
}

.navbar-right {
  display: flex;
  align-items: center;
}

.navbar-menu {
  list-style: none;
  display: flex;
  gap: 25px;
  margin: 0;
  justify-content: center;
  align-items: center;
  padding: 0;
  transition: max-height 0.3s ease-in-out;
}

.navbar-menu li a {
  text-decoration: none;
  color: #003a9e;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.3s ease-in-out, border-bottom 0.3s ease-in-out;
  padding-bottom: 5px;
}

.navbar-menu li a:hover {
  /* color: #001c80; */
  border-bottom: 2px solid #001c80;
}
.button-container {
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
}
.button {
  padding: 8px 20px;
  width: 110px;
  border: 2px solid #003a9e;
  border-radius: 25px;
  color: #003a9e;
  font-weight: 500;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.button:hover {
  background-color: #003a9e;
  color: #ffffff;
  cursor: pointer;
}

.hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 5px;
}

.bar {
  width: 25px;
  height: 3px;
  background-color: #003a9e;
  transition: all 0.3s ease;
}

/* Dropdown Menu Styles */
.user-menu {
  position: relative;
}

.user-icon img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
}

.dropdown {
  position: absolute;
  right: 0;
  top: 40px;
  background-color: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 150px;
  text-align: left;
}

.dropdown a {
  padding: 8px 20px;
  text-decoration: none;
  color: #003a9e;
  font-size: 14px;
  transition: background-color 0.2s ease;
}

.dropdown a:hover {
  background-color: #f0f0f0;
}

.navbar-container.dark .logo {
  filter: brightness(0.8);
}

.dark-mode-toggle {
  background: none;
  border: 1px solid currentColor;
  border-radius: 20px;
  color: inherit;
  padding: 8px 15px;
  cursor: pointer;
  font-size: 14px;
}

.dark-mode-toggle:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .navbar-menu {
    position: absolute;
    top: 70px;
    right: 20px;
    flex-direction: column;
    background-color: #ffffff;
    width: 200px;
    border: 1px solid #eaeaea;
    border-radius: 8px;
    padding: 15px 0;
    gap: 15px;
    max-height: 0;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .navbar-menu.active {
    max-height: 500px;
  }

  .hamburger {
    display: flex;
  }
}
</style>
