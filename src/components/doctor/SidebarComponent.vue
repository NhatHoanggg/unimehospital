<template>
    <div class="sidebar">
      <!-- Menu Items -->
      <div
        v-for="item in menuItems"
        :key="item.text"
        :class="['menu-item', { selected: selectedItem === item.text }]"
        @click="selectItem(item)"
      >
        <img :src="item.icon" alt="Icon" class="menu-icon" />
        <span>{{ item.text }}</span>
      </div>
    </div>
  </template>
  
  <script>
  import { useAuthStore } from "@/stores/auth";
  import { useRouter } from "vue-router";
  
  export default {
    props: {
      selectedItem: {
        type: Object,
        default: null,
      },
    },
    data() {
      return {
        authStore : useAuthStore(),
        router : useRouter(),
        menuItems: [
          { text: 'Lịch hẹn sắp tới', icon: require('@/assets/next-appointment.png'), path: '/next-appointments' },
          { text: 'Lịch đã hủy', icon: require('@/assets/cancel.png'), path: '/history' },
          { text: 'Đăng kí lịch', icon: require('@/assets/calendar.png'), path: '/add-schedule' },
          { text: 'Lịch làm việc', icon: require('@/assets/timework.png'), path: '/timework' },
          { text: 'Hồ sơ', icon: require('@/assets/User-icon.png'), path: '/profile' },
          { text: 'Đăng xuất', icon: require('@/assets/logout.png'), path: '/logout' },
        ],
      };
    },
    methods: {
      selectItem(item) {
        this.$emit('select', item.text); 
        if (item.text === 'Đăng xuất') {
          this.handleLogout();
        }
        else {
          this.$router.push({ path: `/doctor${item.path}` }); 
        }
      },
      
      handleLogout() {
        this.authStore.logout();
        localStorage.clear();
        this.router.push("/");
      },
    },
  };
  </script>
  
  
  <style scoped>
  .sidebar {
    width: 200px;
    background-color: #ffffff;
    border-right: 1px solid #ddd;
    padding: 20px;
    font-family: Arial, sans-serif;
    margin-top: 64px;
    box-shadow: 2px 0 5px rgba(34, 33, 33, 0.1);
  } 
  .logo {
    font-size: 24px;
    color: #0056b3;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }
  .logo-icon {
    width: 24px;
    margin-right: 8px;
  }
  .menu-item {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    border: 1px solid #0056b3;
    border-radius: 10px;
    color: #0056b3;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
  }
  .menu-icon {
    width: 20px;
    margin-right: 10px;
  }
  .menu-item.selected {
    background-color: #83A7D6;
    color: #ffffff ;
  } 
   .menu-item:hover {
    background-color: #bec5cf;
    color: #0056b3;
  }
  
  </style>
    