import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false);
  const user = ref(null);
  const token = ref(null);

  const decodeToken = (t) => {
    try {
      const payload = JSON.parse(atob(t.split('.')[1]));
      return payload;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const login = (rawToken) => {
    const payload = decodeToken(rawToken);
    if (!payload) throw new Error("Invalid token");

    // Cập nhật user và token
    user.value = {
      username: payload.sub,
      scope: payload.scope,
      image: payload.image || null,
    };
    token.value = rawToken;

    isLoggedIn.value = true;

    // Lưu thông tin vào localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(user.value));
    localStorage.setItem('token', rawToken.toString());
  };

  const refresh = async () => {
    const oldToken = localStorage.getItem('token');
    console.log("Old Token", oldToken);

    try {
      const token = { token: oldToken };
      const response = await axios.post("https://api.unime.site/UNIME/auth/refresh", token);

      if (response.data.code === 1000) {
        login(response.data.result.token);
      } else {
        console.error("Failed to refresh token");
        logout();
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout(); 
    }
  };

  const checkTokenExpiration = () => {
    const currentTime = Math.floor(Date.now() / 1000);  
    const payload = decodeToken(token.value);

    if (!payload) return false;


    const timeLeft = payload.exp - currentTime;
    console.log("time left <= 300: ", timeLeft <= 300 && timeLeft > 0);
    return timeLeft <= 60 && timeLeft > 0;
  };

  const logout = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.post("https://api.unime.site/UNIME/auth/logout", { token: token });
        console.log("Logout response:", response.data);
        isLoggedIn.value = false;
        user.value = null;
        token.value = null;
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.href = '/';
      } catch (error) {
        console.error("Error logging out:", error);
      }
    }
    // isLoggedIn.value = false;
    // user.value = null;
    // token.value = null;
    // localStorage.removeItem('isLoggedIn');
    // localStorage.removeItem('user');
    // localStorage.removeItem('token');
  };

  const initialize = () => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (loggedIn && storedUser && storedToken) {
      // Kiểm tra tính hợp lệ của token
      const payload = decodeToken(storedToken);
      if (payload && payload.exp > Date.now() / 1000) {  
        user.value = JSON.parse(storedUser);
        token.value = storedToken;
        isLoggedIn.value = true;
      } else {
        logout();
      }
    }
  };

  return {
    isLoggedIn,
    user,
    token,
    login,
    logout,
    refresh,
    initialize,
    checkTokenExpiration,
  };
});
