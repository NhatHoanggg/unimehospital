<template>
  <div class="navbar-container">
    <nav class="navbar">
      <div class="navbar-left">
        <img src="@/assets/logoUnime.jpg" alt="Unime Logo" class="logo" @click="returnHome"/>
        <div class="hospital-name">
          <h1 v-if="!isAdmin">BỆNH VIỆN UNIME</h1>
          <h1 v-else>DASHBOARD ADMIN</h1>
          <h2 v-if="!isAdmin">UNIME HOSPITAL</h2>
        </div>
      </div>
      <div class="navbar-right">
        <!-- Navbar cho Admin -->
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

        <!-- Navbar cho bệnh nhân -->
        <template v-else>
          <ul :class="['navbar-menu', { active: isMenuOpen }]">
            <li v-if="showNavItem('home')">
              <router-link to="/">Trang chủ</router-link>
            </li>
            <li v-if="showNavItem('about-us')">
              <router-link to="/about-us">Giới thiệu</router-link>
            </li>
            <li v-if="showNavItem('booking')">
              <router-link to="/booking">Đặt lịch khám</router-link>
            </li>

            <!-- <li v-if="!authStore.isLoggedIn">
            <router-link to="/sign-in" class="button">Đăng nhập</router-link>
          </li>
          <li v-if="!authStore.isLoggedIn">
            <router-link to="/send-otp" class="button">Đăng kí</router-link>
          </li> -->
            <button @click="toggleDarkMode" class="dark-mode-toggle">
              <i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'"></i>
            </button>

            <!-- <button @click="handleNotificationClick" class="navbar-icon">
              <i class="far fa-bell"></i>
              <span
                v-if="notifications.length > 0"
                class="notification-count"
                >{{ notifications.length }}</span
              >
            </button> -->

            <button v-if="authStore.user" @click="toggleNotifications" class="navbar-icon">
              <i class="far fa-bell"></i>
              <span v-if="notifications.length" class="notification-count">
                {{ notifications.length }}
              </span>
            </button>

          <!-- Danh sách thông báo -->
            <div v-if="showNotifications" class="notification-list">
              <p v-if="notifications.length === 0">Không có thông báo.</p>
              <ul v-else>
                <li v-for="(notification, index) in notifications" :key="index">
                  <span>{{ notification.title }}</span>
                  <p>{{ notification.body }}</p>
                </li>
              </ul>
            </div>
          
            <li v-if="!authStore.isLoggedIn" class="button-container">
              <router-link to="/sign-in" class="button">Đăng nhập</router-link>
              <router-link to="/send-otp" class="button">Đăng ký</router-link>
            </li>

            <li v-else class="user-menu">
              <div class="container">
                <span>Xin chào! {{ patientName }}</span>
                <div class="user-icon" @click="toggleDropdown">
                  <img :src="imageSrc" alt="User Icon" />
                </div>
              </div>
              <div
                v-if="
                  showDropdown &&
                  authStore.user &&
                  authStore.user.scope === 'PATIENT'
                "
                class="dropdown"
              >
                <router-link to="/profile">
                  <i class="fas fa-user"></i> Hồ sơ
                </router-link>
                <router-link to="/history-booking">
                  <i class="fas fa-history"></i> Lịch sử
                </router-link>
                <router-link to="/next-appointment">
                  <i class="far fa-calendar-check"></i> Lịch hẹn sắp tới
                </router-link>
                <router-link to="/change-password">
                  <i class="fas fa-cog"></i> Cài đặt
                </router-link>
                <a href="#" @click.prevent="handleLogout">
                  <i class="fas fa-sign-out-alt"></i> Đăng xuất
                </a>
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
import { toast } from "vue3-toastify";
import axios from "axios";

export default {
  name: "NavbarComponent",
  data() {
    return {
      imageSrc:
        "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1733478703/user_cnv7fx.png",
      notifications: [],
      showNotifications: false,
      isDarkMode: false,
      previousNotificationCount: 0,
    };
  },
  mounted() {
    // const storedUser = localStorage.getItem("user");
    // if (storedUser) {
    //   const user = JSON.parse(storedUser);
    //   if (user.image) {
    //     this.imageSrc = user.image;
    //   }
    // }

    this.fetchNotifications();

    this.startPolling();

    this.fetchUserData();
  },
  watch: {
  notifications: {
    handler(newNotifications) {
      if (!this.authStore.user) return;
      const newCount = newNotifications.length;

      if (newCount !== this.previousNotificationCount) {

        if (newCount > this.previousNotificationCount) {
          // this.showNotificationPopup(newCount - this.previousNotificationCount);
          toast.info(
            `Bạn có ${newCount} thông báo mới!`,
            {
              rtl: false,
              limit: 3,
              position: toast.POSITION.BOTTOM_RIGHT,
            }
          );
        }
        this.previousNotificationCount = newCount;
        }
      },
      immediate: true,
      deep: true,
    },
  },

  beforeUnmount() {
    clearInterval(this.pollingInterval);
  },
  methods: {
    fetchNotifications() {
      fetch("https://6720cd2f98bbb4d93ca61a67.mockapi.io/api/v1/notifications")
        .then((response) => response.json())
        .then((data) => {
          this.notifications = data || [];
        })
        .catch((error) => console.error("Lỗi khi tải thông báo:", error));
    },
    startPolling() {
      this.pollingInterval = setInterval(() => {
        this.fetchNotifications();
      }, 10000);
    },

    async fetchUserData() {
      const token = localStorage.getItem("token");
      await axios
        .get(`https://api.unime.site/UNIME/patients/myInfo`, {
          headers: { Authorization: `Bearer ${JSON.parse(token)}` },
        })
        .then((response) => {
          if (response.data.code === 1000) {
            const user = response.data.result;
            this.patientId = user.patientId;
            this.userId = user.userId;
            this.patientUsername = user.patientUsername;
            this.patientPassword = user.patientPassword;
            this.patientEmail = user.patientEmail;
            this.patientImage = user.patientImage;
            this.patientName = user.patientName;
            this.patientAddress = user.patientAddress;
            this.patientPhoneNumber = user.patientPhoneNumber;
            this.patientGender = user.patientGender;
            this.patientDateOfBirth = user.patientDateOfBirth;
            this.imageSrc = user.patientImage || this.defaultAvatar;
          }
        })
        .catch((error) => {
          console.error("Lỗi tải dữ liệu:", error);
        });
    },

    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    handleLogout() {
      const authStore = useAuthStore();
      authStore.logout();
      this.showDropdown = false;
      localStorage.clear();

      this.$router.push("/");
      
    },
    showNavItem(item) {
      const authStore = useAuthStore();
      if (!authStore.isLoggedIn) return true;
      if (authStore.user.scope === "PATIENT") {
        return ["home", "about-us", "booking"].includes(item);
      }
      return false;
    },
    showNotificationPopup(newNotificationsCount) {
      alert(`Bạn có ${newNotificationsCount} thông báo mới!`);
    },
    toggleNotifications() {
      this.showNotifications = !this.showNotifications;
    },
    toggleDarkMode(){
      this.isDarkMode = !this.isDarkMode;
      // document.body.classList.toggle("dark", isDarkMode.value);
      console.log("Click vào chế độ tối");
    },
    returnHome() {
      this.$router.push("/");
    },  
  },
  setup() {
    const showDropdown = ref(false);
    const isMenuOpen = ref(false);
    const authStore = useAuthStore();
    const isAdmin = ref(authStore.user?.scope === "ADMIN");
    // const showNotifications = ref(false);
    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const handleNotificationClick = () => {
      // showNotifications.value = !showNotifications.value;
      console.log("Click vào thông báo");
    };

    
    return {
      handleNotificationClick,
      isMenuOpen,
      toggleMenu,
      showDropdown,
      authStore,
      isAdmin,
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

.navbar-icon {
  background: none;
  border: 1px solid currentColor;
  border-radius: 20px;
  color: inherit;
  padding: 8px 15px;
  cursor: pointer;
  font-size: 14px;
}

.navbar-icon:hover {
  background-color: rgba(0, 0, 0, 0.1);
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

.navbar-icon {
  position: relative;
  font-size: 14px;
  color: inherit;
  cursor: pointer;
  border: 1px solid currentColor;
  border-radius: 20px;
  padding: 8px 15px;
}

.notification-count {
  position: absolute;
  top: -5px;
  right: -10px;
  background-color: #ff4d4d;
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 5px;
  border-radius: 50%;
  border: 1px solid black;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.notification-list {
  position: absolute;
  top: 60px;
  right: 10px;
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  background-color: #ffffff;
  border: 1px solid #eaeaea;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 1000;
  padding: 10px;
  text-align: left;
}

.notification-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.notification-list li {
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.notification-list li:last-child {
  border-bottom: none;
}

.notification-list li:hover {
  background-color: #f9f9f9;
  cursor: pointer;
}

.notification-list span {
  font-weight: bold;
  color: #003a9e;
}

.notification-list p {
  font-size: 14px;
  color: #666666;
  margin: 5px 0 0;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Số dòng hiển thị */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
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
