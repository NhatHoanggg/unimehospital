<template>
  <div class="about-container">
      <img src="@/assets/background.jpg" alt="hospital" class="hospital-image" />  
    </div>

    <div>
        <div class="header-line"></div>
        <div class="section-header">
        <h1>BỆNH VIỆN UNIME</h1>
          </div>
        <div class="rounded-border">
          <p>Dịch vụ khám chữa bệnh hơn 40 chuyên khoa</p>
          <p>Mang đến sức khỏe cho gia đình bạn</p>
        </div>
    </div>

    <section class="mission-vision">
      <div class="header-line"></div>
      <div class="section-header">
        <h2>Sứ Mệnh Và Tầm Nhìn</h2>
      </div>
      <div class="rounded-border">
        <div class="mission-cards">
        <div class="card" v-for="(item, index) in missions" :key="index">
          <img src="@/assets/mission1.png" class="card-img" />
          <p class="card-description">{{ item.text }}</p>
        </div>
      </div>
      </div>
    </section>

    <section class="doctor-team">
      <div class="header-line"></div>
      <div class="section-header">
        <h3>Đội Ngũ Bác Sĩ</h3>
      </div>
      <div class="doctor-carousel">
        <div class="doctor" v-for="(doctor, index) in doctors" :key="index">
          <img src="" class="doctor-img" alt="Doctor Image" />
          <p class="doctor-name">{{ doctor.name }}</p>
          <p class="doctor-specialty">{{ doctor.specialty }}</p>
        </div>
      </div>
    </section>
    
  

  <div>

  </div>

</template>

<script>
export default {
  data() {
    return {
      missions: [
        {
          image: '@/assets/mission1.png',
          text: 'Mang lại dịch vụ chăm sóc y tế chuyên nghiệp, nhân văn, và chất lượng cao. Chúng tôi luôn đặt bệnh nhân làm trung tâm trong mọi hoạt động và nỗ lực không ngừng để cải tiến chất lượng dịch vụ.',
        },
        {
          image: '@/assets/mission1.png',
          text: 'Chúng tôi cung cấp một loạt các dịch vụ y tế từ khám chữa bệnh tổng quát đến các dịch vụ chuyên sâu. Mỗi chuyên khoa đều có đội ngũ bác sĩ hàng đầu với nhiều năm kinh nghiệm.',
        },
        {
          image: '@/assets/mission1.png',
          text: 'Chúng tôi đặt mục tiêu trở thành bệnh viện hàng đầu khu vực trong lĩnh vực chăm sóc sức khỏe hiện đại và tiên tiến, hướng tới sự hài lòng tối đa của bệnh nhân.',
        },
      ],
      doctors: [
        {
          image: '@/assets/doctors/doctor-1.jpg',
          name: 'Bác sĩ CKII Võ Hải Long',
          specialty: 'Tai Mũi Họng',
        },
        {
          image: '@/assets/doctors/doctor-1.jpg',
          name: 'Bác sĩ CKII Võ Hải Long',
          specialty: 'Tim Mạch',
        },
        {
          image: '@/assets/doctors/doctor-1.jpg',
          name: 'Bác sĩ CKII Võ Hải Long',
          specialty: 'Nha Khoa',
        },
      ],
    };
  },
};
</script>

<style scoped>

@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");

:root {
  --primary-color: #3b82f6;
  --secondary-color: #2563eb;
  --background-gradient: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  --card-background: #ffffff;
  --input-border: #ddd;
  --input-focus-border: var(--primary-color);
  --text-color: #333;
  --link-color: var(--primary-color);
  --link-hover-color: var(--secondary-color);
  --error-color: #ef4444;
}

.header-line {  
  width: 100%;
  height: 15px;
  background-color: #1a4da1;
}

.section-header {
  display: inline-block;
  background-color: #1a4da1; /* Màu xanh đồng nhất với đường thẳng */
  color: white; /* Màu chữ trắng */
  padding: 20px; /* Đệm xung quanh nội dung */
  font-weight: bold;
  font-size: 15px;
  border-radius: 0 0 30px 30px; /* Bo tròn góc dưới */
  text-align: center;
}

.rounded-border{
  border: 2px solid #1a4da1; /* Viền màu đen */
    border-radius: 15px; /* Bo tròn các góc */
    padding: 10px; /* Khoảng cách bên trong */
    margin: 10px; /* Khoảng cách bên ngoài */
    color: #1a4da1;
}

.hospital-info {
  font-family: 'Poppins', sans-serif;
  max-width: 1440px;
  margin: 0 auto;
  /* padding: 20px; */
  background-color: #f5f7fa;
}

.hospital-details,
.mission-vision,
.doctor-team {
  background-color: var(--card-background);
  padding: 30px;
  border-radius: 10px;
  margin-bottom: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.mission-cards {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-direction: row;
  flex-wrap: wrap;
}

.card {
  width: 400px;
  height: 600px;
  background-color: var(--card-background);
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card-img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 15px;
}

.card-description {
  font-size: 14px;
  color: var(--text-color);
}

.doctor-carousel {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.doctor {
  text-align: center;
  width: 300px;
  padding: 20px;
  background-color: var(--card-background);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.doctor-img {
  border-radius: 20%;
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin-bottom: 15px;
  transition: box-shadow 0.3s ease;
}

.doctor-img:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.doctor-name {
  font-size: 18px;
  color: var(--secondary-color);
  font-weight: 500;
}

.doctor-specialty {
  font-size: 16px;
  color: var(--text-color);
}


</style>