import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false);
  const user = ref(null);
  const token = ref(null); 

  const login = (payload) => {
    
    user.value = {
      username: payload.sub, 
      scope: payload.scope,  
    };
    token.value = payload;

    isLoggedIn.value = true;

    
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(user.value));
    localStorage.setItem('token', JSON.stringify(token.value));
  };

  const logout = () => {
    isLoggedIn.value = false;
    user.value = null;
    token.value = null;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const initialize = () => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (loggedIn && storedUser && storedToken) {
      isLoggedIn.value = true;
      user.value = JSON.parse(storedUser);
      token.value = JSON.parse(storedToken);
    }
  };

  return {
    isLoggedIn,
    user,
    token,
    login,
    logout,
    initialize,
  };
});
