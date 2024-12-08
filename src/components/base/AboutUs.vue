<template>
  <div class="about-container">
    <img src="@/assets/background.jpg" alt="hospital" class="hospital-image" />
  </div>

  <div>
    <div class="header-line"></div>
    <div class="section-header">
      <h1>BỆNH VIỆN UNIME</h1>
    </div>
    <div class="container">
      <div class="rounded-border">
        <div class="hospital-info">
          <p>
            Bệnh viện đã thực hiện hiệu quả công tác điều trị cho hàng trăm ngàn
            người bệnh ở các lĩnh vực chuyên khoa: Sản - Phụ khoa, Cơ - Xương -
            Khớp, Tiêu hóa, Tai - Mũi - Họng, Răng - Hàm - Mặt, Nhãn khoa, Phục
            hồi chức năng, Y học cổ truyền, khoa Xét nghiệm,...
          </p>
          <p>
            Bệnh viện UNIME quy tụ đội ngũ chuyên gia giàu kinh nghiệm, có thái
            độ phục vụ rất tận tình và chu đáo. Đồng thời, với mục tiêu mang đến
            dịch vụ chăm sóc sức khỏe toàn diện, hỗ trợ hết mình cho người dân,
            bệnh viện còn ứng dụng hệ thống thiết bị y tế cao cấp, hiện đại,
            được nhập khẩu đồng bộ từ các nước tiên tiến hàng đầu trên thế giới.
          </p>
        </div>
      </div>
    </div>
  </div>

  <section class="mission-vision">
    <div class="header-line"></div>
    <div class="section-header">
      <h2>Sứ Mệnh Và Tầm Nhìn</h2>
    </div>
    <div class="container">
      <div class="rounded-border">
        <div class="mission-cards">
          <div class="card" v-for="(item, index) in missions" :key="index">
            <img :src="item.image" class="card-img" />
            <p class="card-description">{{ item.text }}</p>
          </div>
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
        <img
          :src="doctor.image || 'https://via.placeholder.com/200'"
          class="doctor-img"
          alt="Doctor Image"
        />
        <p class="doctor-name">{{ doctor.name }}</p>
        <p class="doctor-specialty">Chuyên Khoa: {{ doctor.specialty }}</p>
      </div>
    </div>
  </section>

  <div></div>
</template>

<script>
export default {
  data() {
    return {
      missions: [
        {
          image:
            "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1733684365/mission1_vhvaml.png",
          text: "Mang lại dịch vụ chăm sóc y tế chuyên nghiệp, nhân văn, và chất lượng cao. Chúng tôi luôn đặt bệnh nhân làm trung tâm trong mọi hoạt động và nỗ lực không ngừng để cải tiến chất lượng dịch vụ.",
        },
        {
          image:
            "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1733684365/pngegg_1_bka6bv.png",
          text: "Chúng tôi cung cấp một loạt các dịch vụ y tế từ khám chữa bệnh tổng quát đến các dịch vụ chuyên sâu. Mỗi chuyên khoa đều có đội ngũ bác sĩ hàng đầu với nhiều năm kinh nghiệm.",
        },
        {
          image:
            "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1733684364/pngegg_2_hil8zk.png",
          text: "Chúng tôi đặt mục tiêu trở thành bệnh viện hàng đầu khu vực trong lĩnh vực chăm sóc sức khỏe hiện đại và tiên tiến, hướng tới sự hài lòng tối đa của bệnh nhân.",
        },
      ],
      doctors: [
        {
          image: require("@/assets/doctors/bs-luc-dnd-1.png"),
          name: "Bác sĩ Đinh Yên Lục",
          specialty: "Mắt",
        },
        {
          image: require("@/assets/doctors/pham-huu-tung.png"),
          name: "Bác sĩ Phạm Hữu Tùng",
          specialty: "Tim Mạch",
        },
        {
          image: require("@/assets/doctors/duong-viet-bac-detail.png"),
          name: "Bác sĩ CKII Võ Hải Long",
          specialty: "Nha Khoa",
        },

        {
          image:
            "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731241976/doc8_rzalke.jpg",
          name: "Bác sĩ Nguyễn Thị Hương",
          specialty: "Da Liễu",
        },
      ],
    };
  },
};
</script>

<style scoped>
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
  font-size: inherit;
  display: inline-block;
  background-color: #1a4da1;
  color: white;
  padding: 0 20px;
  font-weight: bold;
  border-radius: 0 0 30px 30px;
  text-align: center;
  margin-bottom: 36px;
}

.rounded-border {
  border: 2px solid #1a4da1;
  border-radius: 15px;
  padding: 10px;
  margin: 10px;
  color: #1a4da1;
  font-size: 20px;
  justify-content: center;
  max-width: 1440px;
}

.container {
  display: flex;
  justify-content: center;
}

.hospital-info {
  max-width: 890px;
  margin: 0 auto;
  background-color: #f5f7fa;
  text-indent: 30px;
}

.hospital-details,
.mission-vision,
.doctor-team {
  background-color: var(--card-background);
  padding: 30px;
  border-radius: 10px;
  margin-bottom: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 18px;
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
  /* border: 1px solid black; */
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
}

.card-img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 15px;
}

.card-description {
  font-size: 20px;
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
  width: 300px;
  height: 400px;
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

p{
  text-align: justify;
}
</style>
