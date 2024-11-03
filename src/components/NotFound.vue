<template>
    <div class="not-found">
      <img
        src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
        alt="Page Not Found"
        class="not-found-gif"
      />
      <div class="overlay">
        <h1 class="not-found-title">404 - Page Not Found</h1>
        <p class="not-found-message">Xin lỗi, trang bạn tìm kiếm không tồn tại.</p>
        <router-link to="/" class="not-found-link">Quay về trang chính</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "NotFound",
  };
  </script>
  
  <style scoped>
  .not-found {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    overflow: hidden;
  }
  
  .not-found-gif {
    /* width: 100%; 
    height: auto; */
    width: 800px;
    height: 600px;
  }
  
  .overlay {
    position: absolute;
    width: 500px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.7); 
    border-radius: 20px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
    z-index: 1; 
  }
  
  .not-found-title {
    font-size: 2rem;
    margin: 10px 0;
  }
  
  .not-found-message {
    font-size: 1.2rem;
    margin-bottom: 20px;
  }
  
  .not-found-link {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    text-decoration: none;
  }
  
  .not-found-link:hover {
    background-color: #0056b3;
  }
  </style>
  