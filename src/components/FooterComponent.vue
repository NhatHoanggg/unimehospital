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
  padding: 20px 0;
  display: flex;
  flex-direction: column; /* Xếp chồng các phần tử theo chiều dọc */
  align-items: flex-start; /* Căn lề trái */
}

.footer-content {
  text-align: left; /* Căn lề trái cho nội dung */
  margin-left: 20px; /* Thêm khoảng cách từ cạnh trái */
  margin-bottom: 20px; /* Thêm khoảng cách giữa footer-content và footer-stats */
}

.footer-content h1 {
  font-size: 2em;
  margin: 0;
  font-weight: bold;
  color: linear-gradient(90deg, #ffffff, #83c9ff);
}

.footer-content p {
  font-size: 1.2em;
  margin: 5px 0;
}

.footer-stats {
  display: flex;
  justify-content: space-around; /* Giữ các mục của footer-stats giãn đều */
  width: 100%; /* Đảm bảo footer-stats trải rộng theo chiều ngang */
  padding: 0 20px; /* Thêm khoảng cách từ cạnh trái và phải */
}

.stat-item {
  display: flex; /* Đặt layout cho stat-item là flex để sắp xếp theo hàng ngang */
  align-items: center; /* Đặt hình ảnh và văn bản ở giữa theo chiều dọc */
  text-align: left; /* Căn lề trái cho nội dung */

}

.stat-item img {
  width: 50px;
  margin-bottom: 10px;
}

.stat-item p {
  margin: 0;
  font-size: 0.9em;
  line-height: 1.5;
  color : #a3d5fa;
}
</style>