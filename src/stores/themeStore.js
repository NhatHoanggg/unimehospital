import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: localStorage.getItem('theme') || 'light', 
  }),
  actions: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', this.theme); 
    },
    initializeTheme() {
      document.body.className = this.theme; 
    },
  },
  watch: {
    theme: {
      handler(newTheme) {
        document.body.className = newTheme;
      },
      immediate: true,
    },
  },
});
