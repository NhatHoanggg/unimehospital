<template>
  <footer class="footer">
    <div class="footer-content">
      <h1>BỆNH VIỆN UNIME</h1>
      <p>Trí - Đức - Chuyên Tâm - Vươn Tầm Thế Giới</p>
    </div>

    <div class="footer-stats">
      <div class="stat-item">
        <img src="@/assets/doctor-icon.png" alt="Doctor Icon" />
        <p>600+<br />Bác sĩ hoạt động</p>
      </div>
      <div class="stat-item">
        <img src="@/assets/hospital-icon.png" alt="Hospital Icon" />
        <p>25+<br />Bệnh viện kết nối</p>
      </div>
      <div class="stat-item">
        <img src="@/assets/clinic-icon.png" alt="Clinic Icon" />
        <p>100+<br />Phòng khám đa khoa</p>
      </div>
      <div class="stat-item">
        <img src="@/assets/specialist-icon.png" alt="Specialist Icon" />
        <p>40+<br />Chuyên khoa</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style scoped>
.footer {
  background-color: #0c4a6e;
  color: white;
  text-align: center;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center; 
}

.footer-content {
  text-align: center;
  margin-bottom: 30px;
}

.footer-content h1 {
  font-size: 2.5em;
  font-weight: bold;
  background: linear-gradient(90deg, #ffffff, #83c9ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; 
  margin-bottom: 10px;
}

.footer-content p {
  font-size: 1.4em;
  margin: 5px 0;
  color: #a3d5fa;
}

.footer-stats {
  display: flex;
  justify-content: space-between;
  gap: 30px; 
  max-width: 1200px;
  width: 100%;
}

.stat-item {
  display: flex;
  flex-direction: column; 
  align-items: center;
  text-align: center;
}

.stat-item img {
  width: 60px;
  margin-bottom: 10px;
}

.stat-item p {
  margin: 0;
  font-size: 1.1em;
  line-height: 1.5;
  color: #e0f5ff;
}
</style>
