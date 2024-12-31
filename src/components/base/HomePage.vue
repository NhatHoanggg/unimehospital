<template>
  <section class="hero__section">
    <div class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <div class="hero-text-content">
              <h1 class="hero-title">
                Chúng tôi giúp người bệnh khoẻ mạnh hơn, sống lâu hơn.
              </h1>
              <p class="hero-description">
                Chúng tôi cung cấp các dịch vụ y tế chất lượng cao từ các bác sĩ
                chuyên nghiệp.
              </p>
              <button class="hero-btn" @click="bookAppointment">Đặt lịch hẹn khám</button>
            </div>

            <div class="hero-stats">
              <div class="stat-item">
                <h2 class="stat-value">30+</h2>
                <span class="stat-line stat-yellow"></span>
                <p class="stat-description">Năm Kinh Nghiệm</p>
              </div>

              <div class="stat-item">
                <h2 class="stat-value">18+</h2>
                <span class="stat-line stat-purple"></span>
                <p class="stat-description">Dịch vụ khác nhau</p>
              </div>

              <div class="stat-item">
                <h2 class="stat-value">100%</h2>
                <span class="stat-line stat-blue"></span>
                <p class="stat-description">Bệnh nhân hài lòng</p>
              </div>
            </div>
          </div>

          <div class="hero-images">
            <div class="image-main">
              <img
                class="image-full card"
                src="@/assets/images/hero-1.jpg"
                alt=""
                style="width: 396px; height: 556px"
              />
            </div>
            <div class="image-secondary">
              <img
                class="image-full image-bottom card"
                src="@/assets/images/hero-2.jpg"
                alt=""
                style="width: 300px; height: 300px"
              />
              <img
                class="image-full card"
                src="@/assets/images/hero-3.jpg"
                alt=""
                style="width: 300px; height: 300px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!--  -->
  <section>
    <div class="container">
      <div class="services-header">
        <h2 class="heading text-center">
          Cung cấp những dịch vụ y tế tốt nhất
        </h2>
        <p class="text__para text-center">
          Sự chăm sóc tầm cỡ thế giới cho mọi người. Hệ thống chăm sóc sức khoẻ
          của chúng tôi rất chuyên nghiệp và vô tiền khoáng hậu.
        </p>
      </div>

      <div class="services-content">
        <div class="service-item">
          <div class="service-icon">
            <img src="@/assets/images/icon01.png" alt="" />
          </div>

          <div class="service-info">
            <h2 class="service-title">Tìm Bác Sĩ</h2>
            <p class="service-description">
              Sự chăm sóc tầm cỡ thế giới cho mọi người. Hệ thống chăm sóc sức
              khoẻ của chúng tôi rất chuyên nghiệp và vô tiền khoáng hậu. Từ
              phòng thí nghiệm đến phòng khám.
            </p>
            <a href="/booking" class="service-link">
              <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>

        <div class="service-item">
          <div class="service-icon">
            <img src="@/assets/images/icon021.png" alt="" />
          </div>

          <div class="service-info">
            <h2 class="service-title">Tìm dịch vụ mong muốn</h2>
            <p class="service-description">
              Sự chăm sóc tầm cỡ thế giới cho mọi người. Hệ thống chăm sóc sức
              khoẻ của chúng tôi rất chuyên nghiệp và vô tiền khoáng hậu. Từ
              phòng thí nghiệm đến phòng khám.
            </p>
            <a href="/booking" class="service-link">
              <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>

        <div class="service-item">
          <div class="service-icon">
            <img src="@/assets/images/icon03.png" alt="" />
          </div>

          <div class="service-info">
            <h2 class="service-title">Đặt lịch hẹn khám</h2>
            <p class="service-description">
              Sự chăm sóc tầm cỡ thế giới cho mọi người. Hệ thống chăm sóc sức
              khoẻ của chúng tôi rất chuyên nghiệp và vô tiền khoáng hậu. Từ
              phòng thí nghiệm đến phòng khám.
            </p>
            <a href="/booking" class="service-link">
              <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- 2 -->
  <!-- <About /> -->

  <section>
    <div class="container">
      <div class="services-header">
        <h2 class="heading text-center">Các dịch vụ y tế của chúng tôi</h2>
        <p class="text__para text-center">
          Dịch vụ y tế chất lượng cao từ các bác sĩ chuyên nghiệp.
        </p>
      </div>

      <div class="service-list">
        <ListServices />
      </div>
    </div>
  </section>
  <DoctorList />

  <section>
    <div class="container">
      <div class="faq-content">
        <div class="faq-image">
          <img src="@/assets/images/faq-img.png" alt="alt" />
        </div>

        <div class="faq-list w-full md:w-1/2">
          <h2 class="heading">
            Câu hỏi các bệnh nhân thân yêu của chúng tôi cần tham vấn
          </h2>
          <FaqList />
        </div>
      </div>
    </div>
  </section>

  <!-- <section>
    <div class="container">
      <div class="xl:w-[470px] mx-auto">
        <h2 class="heading text-center">Các bệnh nhân</h2>
        <p class="text__para text-center">
          Sự chăm sóc tầm cỡ thế giới cho mọi người.
        </p>
      </div>

      <TestimonialList />
    </div>
  </section> -->
  <ChatBot />
</template>

<script>
import FaqList from "./FaqList.vue";
import ListServices from "./ListServices.vue";
// import TestimonialList from "./TestimonialList.vue";
import ChatBot from "./ChatBot.vue";
import { useAuthStore } from '@/stores/auth';

export default {
  name: "HomePage",
  data(){
    return {
      authStore: useAuthStore(),
    }
  },
  components: {
    ListServices, 
    FaqList,
    // TestimonialList,
    ChatBot,
  },
  methods: {
    bookAppointment() {
      this.$router.push("/booking");
      // this.authStore.refresh();
    },
  },
};
</script>

<style scoped>
.hero__section {
  padding: 50px 0;
  background-color: #f9f9f9;
  width: 100%;
}

.container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero {
  background-image: linear-gradient(
    to bottom,
    #548ee6,
    #90a7ec,
    #bcc2f2,
    #e0e0f8,
    #ffffff
  );
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
}

.hero-text {
  max-width: 570px;
}

.hero-title {
  font-size: 36px;
  line-height: 46px;
  font-weight: 800;
  color: #333;
  text-align: left;
}

.hero-description {
  font-size: 16px;
  color: #666;
  line-height: 1.5;
}

.hero-btn {
  background-color: #3498db;
  color: white;
  padding: 15px 30px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

.hero-btn:hover {
  background-color: #15405c;
}

.hero-stats {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 70px;
}

.stat-item {
  text-align: center;
}

.text-center {
  text-align: center;
}

.stat-value {
  font-size: 44px;
  font-weight: 700;
  color: #333;
}

.stat-line {
  display: block;
  width: 100px;
  height: 2px;
  margin: -14px auto 0;
  border-radius: 50px;
}

.stat-yellow {
  background-color: #f2c94c;
}

.stat-purple {
  background-color: #9b59b6;
}

.stat-blue {
  background-color: #3498db;
}

.stat-description {
  font-size: 16px;
  color: #666;
}

.hero-images {
  display: flex;
  gap: 30px;
  justify-content: flex-end;
  align-items: center;
}

.image-main {
  flex: 1;
}

.image-secondary {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.image-full {
  width: 100%;
}

.image-bottom {
  margin-top: 30px;
}

.services-header {
  max-width: 6000px;
  margin: 0 auto;
}

.heading {
  font-size: 28px;
  line-height: 40px;
  font-weight: 700;
  color: #333;
}

.text__para {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
}

.services-content {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: space-between;
  margin-top: 30px;
}

.service-item {
  width: 100%;
  max-width: 370px;
  margin: 0 auto;
  padding: 30px 20px;
  text-align: center;
  background-color: #f4f4f4;
  border-radius: 8px;
}

.service-icon img {
  margin-bottom: 20px;
}

.service-info {
  margin-top: 30px;
}

.service-title {
  font-size: 26px;
  line-height: 36px;
  font-weight: 700;
  color: #333;
}

.service-description {
  font-size: 16px;
  line-height: 24px;
  color: #666;
  margin-top: 20px;
}

.service-link {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid #181a1e;
  margin-top: 30px;
  transition: background-color 0.3s, border-color 0.3s;
  text-decoration: none;
}

.service-link:hover {
  background-color: #2c74df;
  border-color: transparent;
  color: white
}

.faq-content {
  display: flex;
  justify-content: space-between;
}

.faq-image {
  display: none;
  width: 50%;
  margin-top: 50px;
}

.faq-list {
  width: 90%;
}

.card {
  padding: 5px;
  color: white;
  background: transparent;
  border: 2px solid #0e86d4;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transform-origin: center center;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.card:hover {
  border-radius: 12px;
  background-color: #0e86d4;
  scale: 0.95;
  rotate: 3deg;
  box-shadow: 0px 3px 187.5px 7.5px #0b619a9f;
}

@media (min-width: 1024px) {
  .hero-content {
    flex-direction: row;
    justify-content: space-between;
  }

  .hero-text-content {
    max-width: 570px;
  }

  .hero-stats {
    flex-direction: row;
    gap: 30px;
  }
}

@media (min-width: 768px) {
  .services-content {
    flex-direction: row;
    justify-content: space-between;
  }

  .faq-image {
    display: block;
  }

  /* .faq-list{
    width: 50%;
  } */
}

@media (min-width: 1024px) {
  .services-content {
    gap: 30px;
  }
}
</style>
