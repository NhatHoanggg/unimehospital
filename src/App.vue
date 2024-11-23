<template>
  <div id="app">
    <NavbarComponent @toggleTheme="toggleTheme" :currentTheme="currentTheme" />
    <router-view />
    <FooterComponent />
  </div>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue';
import FooterComponent from './components/FooterComponent.vue';

export default {
  components: {
    NavbarComponent,
    FooterComponent,
  },
  data() {
    return {
      currentTheme: "light", 
    };
  },
  methods: {
    toggleTheme() {
      this.currentTheme = this.currentTheme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", this.currentTheme);
      localStorage.setItem("theme", this.currentTheme);
    },
  },
  mounted() {
    const savedTheme = localStorage.getItem("theme") || "light";
    this.currentTheme = savedTheme;
    document.documentElement.setAttribute("data-theme", savedTheme);
  },
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

:root{
  --text: #020708;
  --background: #f3fafc;
  --primary: #38a9d6;
  --secondary: #8da8e7;
  --accent: #4dc6ff;
}

#app {
  font-family: 'Noto Sans', sans-serif;
  text-align: center;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
</style>