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
export default {
  props: {
    selectedItem: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      menuItems: [
        { text: 'User', icon: require('@/assets/User-icon.png'), path: '/user-management' },
        { text: 'Department', icon: require('@/assets/department-icon.png'), path: '/department-management' },
        { text: 'Service', icon: require('@/assets/Service-icon.png'), path: '/service-management' },
      ],
    };
  },
  methods: {
    selectItem(item) {
      // console.log(`Clicked Item: ${item.text}`); 
      this.$emit('select', item.text); 
      this.$router.push({ path: `/admin${item.path}` }); 
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
  