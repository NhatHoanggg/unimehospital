<template>
  <div class="about-container">
    <div class="section hospital-info">
      <img src="@/assets/background.jpg" alt="hospital" class="hospital-image" />
      <h1>BỆNH VIỆN UNIME</h1>
      <p>Dịch vụ khám chữa bệnh hơn 40 chuyên khoa</p>
      <p>Mang đến sức khỏe cho gia đình bạn</p>
    </div>
  </div>
  <div class="hospital-info">
    <!-- Section: Thông tin bệnh viện -->
    <section class="hospital-details">
      <h2 class="section-title">Thông Tin Bệnh Viện</h2>
      <p class="hospital-description">
        Bệnh viện đã thực hiện hiệu quả công tác điều trị cho hàng trăm ngàn người bệnh ở các lĩnh vực chuyên khoa: Sản - Phụ khoa, Cơ - Xương - Khớp, Tiêu hóa, Tai - Mũi - Họng, Răng - Hàm - Mặt, Nhãn khoa, Phục hồi chức năng, Y học cổ truyền, khoa Xét nghiệm,...  
      </p>
      <p class="hospital-description">
        Bệnh viện UNIME quy tụ đội ngũ chuyên gia giàu kinh nghiệm, có thái độ phục vụ rất tận tình và chu đáo. Đồng thời, với mục tiêu mang đến dịch vụ chăm sóc sức khỏe toàn diện, hỗ trợ hết mình cho người dân, bệnh viện còn ứng dụng hệ thống thiết bị y tế cao cấp, hiện đại, được nhập khẩu đồng bộ từ các nước tiên tiến hàng đầu trên thế giới.
      </p>
    </section>

    <!-- Section: Sứ Mệnh và Tầm Nhìn -->
    <section class="mission-vision">
      <h2 class="section-title">Sứ Mệnh Và Tầm Nhìn</h2>
      <div class="mission-cards">
        <div class="card" v-for="(item, index) in missions" :key="index">
          <img src="@/assets/mission1.png" class="card-img" />
          <p class="card-description">{{ item.text }}</p>
        </div>
      </div>
    </section>

    <!-- Section: Đội Ngũ Bác Sĩ -->
    <section class="doctor-team">
      <h2 class="section-title">Đội Ngũ Bác Sĩ</h2>
      <div class="doctor-carousel">
        <div class="doctor" v-for="(doctor, index) in doctors" :key="index">
          <img src="@/assets/doctors/doctor-1.jpg" class="doctor-img" alt="Doctor Image" />
          <p class="doctor-name">{{ doctor.name }}</p>
          <p class="doctor-specialty">{{ doctor.specialty }}</p>
        </div>
      </div>
    </section>
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

.about-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px;
}

.hospital-info {
  font-family: 'Poppins', sans-serif;
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f7fa;
}

.section-title {
  text-align: center;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 20px;
  color: var(--primary-color);
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

.hospital-description {
  font-size: 16px;
  line-height: 1.8;
  color: var(--text-color);
  margin-bottom: 15px;
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