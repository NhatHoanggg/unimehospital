<template>
  <div id="app">
    <NavbarComponent />
    <router-view />
    <FooterComponent />
  </div>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue';
import FooterComponent from './components/FooterComponent.vue';

export default {
  components: {
    NavbarComponent, // Đảm bảo component navbar được import và sử dụng
    FooterComponent, // Đảm bảo component footer được import và sử dụng
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  margin: 0;
  padding: 0;
}
</style>