<template>
  <div class="homepage">

    <SliderSection/>
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Đặt Lịch Khám <br/> Nhanh Chóng và Dễ Dàng</h1>
        <p>Chúng tôi cung cấp các dịch vụ y tế chất lượng cao từ các bác sĩ chuyên nghiệp.</p>
        <router-link to="/booking" class="cta-button">Đặt Lịch Ngay</router-link>
      </div>
      <div class="hero-image">
        <img src="@/assets/doctor-hero1.png" alt="Doctor Illustration" />
      </div>
    </section>

    <!-- Services Section -->
    <section class="services">
      <h2>Dịch Vụ Của Chúng Tôi</h2>
      <div class="services-container">
        <div class="service-card" v-for="service in services" :key="service.id">
          <i :class="service.icon" class="service-icon"></i>
          <h3>{{ service.title }}</h3>
          <p>{{ service.description }}</p>
        </div>
      </div>
    </section>
    <ChatBot />

    <!-- Testimonials Section -->
    <section class="testimonials">
      <h2>Phản Hồi Từ Khách Hàng</h2>
      <div class="testimonials-container">
        <div class="testimonial-card" v-for="testimonial in testimonials" :key="testimonial.id">
          <p>"{{ testimonial.feedback }}"</p>
          <h4>{{ testimonial.name }}</h4>
          <span>{{ testimonial.role }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import ChatBot from "./ChatBot.vue";
import SliderSection from "../tools/SliderSection.vue";

export default {
  name: "HomePage",
  components: {
    ChatBot,
    SliderSection,
  },
  data() {
    return {
      isMenuOpen: false,
      services: [
        {
          id: 1,
          icon: "fas fa-stethoscope",
          title: "Khám Tổng Quát",
          description: "Dịch vụ khám sức khỏe tổng quát bởi các bác sĩ chuyên nghiệp."
        },
        {
          id: 2,
          icon: "fas fa-heartbeat",
          title: "Chuyên Khoa Tim Mạch",
          description: "Phòng khám chuyên khoa tim mạch với trang thiết bị hiện đại."
        },
        {
          id: 3,
          icon: "fas fa-brain",
          title: "Chuyên Khoa Thần Kinh",
          description: "Điều trị các bệnh lý liên quan đến hệ thần kinh."
        },
      ],
      testimonials: [
        {
          id: 1,
          feedback: "Dịch vụ tuyệt vời! Tôi đã đặt lịch và nhận được sự hỗ trợ nhanh chóng.",
          name: "Nguyễn Văn A",
          role: "Khách hàng"
        },
        {
          id: 2,
          feedback: "Bác sĩ rất tận tâm và chuyên nghiệp. Tôi rất hài lòng với dịch vụ.",
          name: "Trần Thị B",
          role: "Khách hàng"
        },
        {
          id: 3,
          feedback: "Giao diện đặt lịch rất dễ sử dụng. Rất tiện lợi cho người dùng.",
          name: "Lê Văn C",
          role: "Khách hàng"
        },
      ]
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

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

.homepage {
  font-family: 'Roboto', sans-serif;
  color: var(--text-color);
  background-color: #3b82f6;
}

.hamburger {
  display: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6rem 2rem 2rem 2rem;
  max-width: 1440px;
  margin: 0 auto;
}

.hero-content {
  max-width: 600px;
}

.hero-content h1 {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.hero-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.cta-button {
  padding: 8px 20px;
  border: 2px solid #003a9e;
  border-radius: 25px;
  color: #003a9e;
  background-color: #ffffff;
  font-weight: 500;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.cta-button:hover {
  background-color: #003a9e;
  color: #ffffff;
  cursor: pointer;
}


.hero-image img {
  width: 100%;
  max-width: 500px;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.hero-image img:hover {
  transform: scale(1.05);
}

/* Services Section */
.services {
  padding: 4rem 2rem;
  text-align: center;
}

.services h2 {
  color: var(--primary-color);
  margin-bottom: 2rem;
  font-size: 2rem;
}

.services-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}

.service-card {
  background-color: #ffffff;
  border-radius: 15px;
  padding: 2rem;
  width: 250px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.service-icon {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.service-card h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.service-card p {
  font-size: 1rem;
  color: var(--text-color);
}

/* Testimonials Section */
.testimonials {
  padding: 4rem 2rem;
  text-align: center;
}

.testimonials h2 {
  color: var(--primary-color);
  margin-bottom: 2rem;
  font-size: 2rem;
}

.testimonials-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}

.testimonial-card {
  background-color: #ffffff;  
  border-radius: 15px;
  padding: 2rem;
  width: 300px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.testimonial-card p {
  font-style: italic;
  margin-bottom: 1rem;
}

.testimonial-card h4 {
  font-weight: 600;
  color: var(--primary-color);
}

.testimonial-card span {
  font-size: 0.9rem;
  color: var(--text-color);
}

/* Footer */
.footer {
  background-color: var(--card-background);
  padding: 2rem;
  border-top: 1px solid #ddd;
}

.footer-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1440px;
  margin: 0 auto;
  gap: 2rem;
}

.footer-section h3,
.footer-section h4 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.footer-section p,
.footer-section ul,
.footer-section li {
  color: var(--text-color);
  font-size: 0.9rem;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section ul li a {
  color: var(--text-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section ul li a:hover {
  color: var(--primary-color);
}

.social-icons a {
  color: var(--text-color);
  margin-right: 0.5rem;
  font-size: 1.2rem;
  transition: color 0.3s ease;
}

.social-icons a:hover {
  color: var(--primary-color);
}

.footer-bottom {
  text-align: center;
  margin-top: 2rem;
  font-size: 0.8rem;
  color: var(--text-color);
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .hero {
    flex-direction: column;
    text-align: center;
  }

  .hero-image {
    margin-top: 2rem;
  }

  .services-container,
  .testimonials-container {
    flex-direction: column;
    align-items: center;
  }

  .footer-container {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-links {
    flex-direction: column;
    width: 100%;
    display: none;
  }

  .nav-links.active {
    display: flex;
  }

  .hamburger {
    display: block;
    position: absolute;
    top: 1.5rem;
    right: 2rem;
  }

  .hero {
    padding: 6rem 1rem 2rem 1rem;
  }

  .services-container,
  .testimonials-container {
    flex-direction: column;
    align-items: center;
  }
}
</style>
