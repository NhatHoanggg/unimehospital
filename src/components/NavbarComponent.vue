<template>
  <nav class="navbar">
    <div class="navbar-left">
      <img src="@/assets/logoUnime.jpg" alt="Unime Logo" class="logo" />
      <div class="hospital-name">
        <h1>BỆNH VIỆN UNIME</h1>
        <h2>UNIME HOSPITAL</h2>
      </div>
    </div>
    <ul class="navbar-menu">
      <li><router-link to="/">Trang chủ</router-link></li>
      <li><router-link to="/gioi-thieu">Giới thiệu</router-link></li>
      <li><router-link to="/appointment">Đặt lịch khám</router-link></li>
      <li><router-link to="/signin" class="button">Đăng nhập</router-link></li>
      <li><router-link to="/signup" class="button">Đăng kí</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "NavbarComponent",
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap');

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #ccc;
  position: fixed; /* Giúp cố định thanh navbar */
  top: 0; /* Cố định ở đầu trang */
  left: 0;
  width: 98%; /* Đảm bảo thanh navbar trải rộng toàn màn hình */
  z-index: 1000; /* Đảm bảo nó nằm trên tất cả các thành phần khác */

}

body, .navbar, .navbar-menu li a {
  font-family: 'Poppins', sans-serif;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.logo {
  height: 60px;
  margin-right: 20px;
}

.hospital-name h1 {
  font-size: 24px;
  margin: 0;
  color: #003a9e;
  font-weight: bold;
}

.hospital-name h2 {
  font-size: 16px;
  margin: 0;
  color: #003a9e;
  font-weight: normal;
}

.navbar-menu {
  list-style-type: none;
  display: flex;
  gap: 20px;
  padding: 0;
}

.navbar-menu li {
  display: inline-block;
}

.navbar-menu li a {
  text-decoration: none;
  color: #003a9e;
  font-size: 16px;
  font-weight: bold;
  transition: color 0.3s ease-in-out;
}

.navbar-menu li a:hover {
  color: #001c80;
  text-decoration: underline;
}

/* Phong cách cho nút Đăng nhập và Đăng kí */
.button {
  padding: 8px 15px;
  border: 1px solid #003a9e;
  border-radius: 10px; /* Đường viền tròn giống như trong ảnh */
  color: #003a9e;
  font-weight: 500;
  text-align: center;
  font-size: 16px;
  transition: background-color 0.3s ease-in-out;
}

.button:hover {
  background-color: #f0f0f0;
  cursor: pointer;
}
</style>
