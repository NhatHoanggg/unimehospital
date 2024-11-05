<template>
    <div class="admin-dashboard">
      <SidebarComponents :selectedItem="selectedItem" @select="selectItem"/>
      <main class="content-area">
        <router-view></router-view>
      </main>
    </div>
  </template>
  
  <script>
  import SidebarComponents from './SidebarComponents.vue';

  export default {
    name: "AdminDashboard",
    components: {
    SidebarComponents
  },
  data() {
    return {
      selectedItem: 'User',
    };
  },
  methods: {
    selectItem(item) {
      this.selectedItem = item;
      // console.log('Updated selectedItem:', this.selectedItem);
    },
  }
  };
  </script>
  
  <style scoped>
  .admin-dashboard {
    display: flex;
  }
  .sidebar {
    width: 200px;
    background-color: #ffffff;
    padding: 20px;
    min-height: 100vh;
  }
  .content-area {
    flex: 1;
    padding: 20px;
    background-color: #EAEEF3;
  }
  </style>
  