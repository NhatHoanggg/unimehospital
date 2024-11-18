<template>
  <div class="container">
    <div class="employee-dashboard">
      <SidebarComponent :selectedItem="selectedItem" @select="selectItem" />
      <main class="content-area">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import SidebarComponent from "./SidebarComponent.vue";

export default {
  name: "DoctorDashboard",
  components: {
    SidebarComponent,
  },
  data() {
    return {
      selectedItem: "Quản lý ca",
    };
  },
  methods: {
    selectItem(item) {
      this.selectedItem = item;
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%; 
  display: flex;
  justify-content: center; 
  padding: 0 20px;
  overflow-x: hidden ;
}

.employee-dashboard {
  width: 100%; 
  max-width: 1440px;
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
  background-color: #eaeef3;
}
</style>
