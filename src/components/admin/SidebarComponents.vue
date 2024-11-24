<template>
  <div class="sidebar">
    <div
      class="menu-item dropdown-tab"
      :class="{ selected: selectedItem === 'Người dùng' }"
      @click="toggleUserSubmenu"
    >
      <img
        src="@/assets/User-icon.png"
        alt="User Icon"
        class="menu-icon"
        :class="{ rotated: showUserSubmenu }"
      />
      <span>Người dùng </span>
      <img src="@/assets/down.png" alt="User Icon" class="menu-icon down" />
    </div>

    <div :class="['submenu', { open: showUserSubmenu }]">
      <div
        class="submenu-item"
        @click="selectItem('Bệnh nhân', '/user-management/patients')"
      >
        <span>Bệnh nhân</span>
      </div>
      <div
        class="submenu-item"
        @click="selectItem('Bác sĩ', '/user-management/doctors')"
      >
        <span>Bác sĩ</span>
      </div>
      <div
        class="submenu-item"
        @click="selectItem('Quản lý', '/user-management/employees')"
      >
        <span>Quản lý</span>
      </div>
    </div>

    <div
      class="menu-item"
      :class="{ selected: selectedItem === 'Thêm quản lý' }"
      @click="selectItem('Thêm quản lý', '/add-employee')"
    >
      <img
        src="@/assets/add-user-1.png"
        alt="ADD EMPLOYEE"
        class="menu-icon"
      />
      <span>Thêm quản lý</span>
    </div>

    <div
      class="menu-item"
      :class="{ selected: selectedItem === 'Thêm bác sĩ' }"
      @click="selectItem('Thêm bác sĩ', '/add-doctor')"
    >
      <img
        src="@/assets/add-doctor.png"
        alt="Add Doctor Icon"
        class="menu-icon"
      />
      <span>Thêm bác sĩ</span>
    </div>

    <div
      class="menu-item"
      :class="{ selected: selectedItem === 'Chuyên khoa' }"
      @click="selectItem('Chuyên khoa', '/department-management')"
    >
      <img
        src="@/assets/department-icon.png"
        alt="Department Icon"
        class="menu-icon"
      />
      <span>Chuyên khoa</span>
    </div>

    <div
      class="menu-item"
      :class="{ selected: selectedItem === 'Thêm khoa' }"
      @click="selectItem('Thêm khoa', '/add-department')"
    >
      <img
        src="@/assets/add-department.png"
        alt="Add Department Icon"
        class="menu-icon"
      />
      <span>Thêm khoa</span>
    </div>

    <div
      class="menu-item"
      :class="{ selected: selectedItem === 'Dịch vụ' }"
      @click="selectItem('Dịch vụ', '/service-management')"
    >
      <img
        src="@/assets/Service-icon.png"
        alt="Service Icon"
        class="menu-icon"
      />
      <span>Dịch vụ</span>
    </div>

    <div
      class="menu-item"
      :class="{ selected: selectedItem === 'Thêm dịch vụ' }"
      @click="selectItem('Thêm dịch vụ', '/add-service')"
    >
      <img
        src="@/assets/add-doctor-service.png"
        alt="Service Icon"
        class="menu-icon"
      />
      <span>Thêm dịch vụ</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedItem: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      showUserSubmenu: false,
    };
  },
  methods: {
    toggleUserSubmenu() {
      this.showUserSubmenu = !this.showUserSubmenu;
      this.selectItem("Người dùng");
    },
    selectItem(text, path = null) {
      this.$emit("select", text);
      if (path) {
        this.$router.push({ path: `/admin${path}` });
      }
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

.dropdown-tab {
  display: flex;
  justify-content: space-between;
}

.down {
  transition: transform 0.3s ease;
}

.down.rotated {
  transform: rotate(180deg);
}

.menu-icon {
  width: 20px;
  margin-right: 10px;
}
.menu-item.selected {
  background-color: #83a7d6;
  color: #ffffff;
}
.menu-item:hover {
  background-color: #bec5cf;
  color: #0056b3;
}
.submenu {
  padding: 0;
  margin-top: -10px;
  margin-bottom: 15px;
  text-align: left;
  text-indent: 20px;
  /* background-color: gray; */
  border: 1px solid #0056b3;

  overflow: hidden;
  transition: max-height 0.5s ease;
  max-height: 0;
}

.submenu-item {
  padding: 8px 20px;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.5s;

  opacity: 0;
  transition: opacity 0.5s ease;
}

.submenu-item:hover {
  color: #0056b3;
  background-color: #bec5cf;
}

.submenu-item:active {
  background-color: #83a7d6;
  color: #ffffff;
}

.submenu.open {
  max-height: 500px;
}

.submenu.open .submenu-item {
  opacity: 1;
}
</style>
