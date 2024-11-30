<template>
  <div class="home-slider">
    <h1>Bệnh Viện UNIME</h1>
    <div class="container">
      <div class="slide">
        <div
          v-for="(item, index) in items"
          :key="index"
          :style="{ backgroundImage: `url(${item.image})` }"
          class="item"
          :class="{ 'show-content': index === currentIndex }"
        >
          <div class="content" v-if="index === currentIndex">
            <div class="name">{{ item.name }}</div>
            <div class="des">{{ item.description }}</div>
            <button class="btn btn-white btn-animated">Đặt lịch ngay</button>
          </div>
        </div>
      </div>
      <div class="button">
        <button class="prev" @click="prevSlide">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button class="next" @click="nextSlide">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          name: "Bệnh Viện UNIME",
          description: "Tư vấn, chăm sóc bệnh nhân nhiệt tình, chu đáo.",
          image:
            "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1732814669/pexels-pixabay-40568_uuh0u2.jpg",
        },
        {
          name: "Bệnh Viện UNIME",
          description: "Uy tín, chất lượng, hiệu quả.",
          image:
            "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1732814668/tam-tri-1-7301_gqiu7u.jpg",
        },
        {
          name: "Bệnh Viện UNIME",
          description: "Kê thuốc chính xác, hiệu quả.",
          image:
            "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1732814669/pexels-pixabay-208512_immdql.jpg",
        },
        {
          name: "Bệnh Viện UNIME",
          description: "Đội ngũ bác sĩ chuyên nghiệp, tận tâm và chu đáo.",
          image:
            "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1732814887/bv1-2_dioccc.jpg",
        },
        {
          name: "Bệnh Viện UNIME",
          description: "Tận tình với công việc, tận tâm với bệnh nhân.",
          image:
            "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1732814669/Picture1_g5kz3f.jpg",
        },
        {
          name: "Bệnh Viện UNIME",
          description: "Cơ sở vật chất tiên tiến, hiện đại.",
          image:
            "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1732814668/pexels-shvetsa-3845129_rt0hhh.jpg",
        },
      ],
      currentIndex: 0,
    };
  },
  methods: {
    nextSlide() {
      const firstItem = this.items.shift();
      this.items.push(firstItem);
    },
    prevSlide() {
      const lastItem = this.items.pop();
      this.items.unshift(lastItem);
    },
  },
};
</script>

<style scoped>
.home-slider {
  /* background-color: red; */
  width: 100vw;
  height: 100vh;
}

.home-slider .container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -45%);
  width: 1400px;
  height: 600px;
  background: #f5f5f5;
  box-shadow: 0 30px 50px #dbdbdb;
  z-index: 10;
}

.home-slider .container .slide .item {
  width: 200px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 70%;
  transform: translate(0, -50%);
  border-radius: 20px;
  box-shadow: 0 30px 50px #505050;
  background-position: 50% 50%;
  background-size: cover;
  display: inline-block;
  transition: 0.5s;
}

.home-slider .container .slide .item.show-content {
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 0;
}

.home-slider .container .slide .item:nth-child(n + 6) {
  opacity: 0;
}

.home-slider .item .content {
  position: absolute;
  top: 50%;
  left: 100px;
  width: 300px;
  text-align: left;
  color: #eee;
  transform: translate(0, -50%);
  font-family: system-ui;
  display: none;
}

.home-slider .slide .item.show-content .content {
  display: block;
}

.home-slider .content .name {
  font-size: 40px;
  text-transform: uppercase;
  font-weight: bold;
  opacity: 0;
  animation: animate 1s ease-in-out 1 forwards;
  width: 500px;
  font-size: 2.5em;
  background: linear-gradient(90deg, #ffffff, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 1px navy;
  margin-bottom: 10px;
}

.home-slider .content .des {
  margin-top: 10px;
  margin-bottom: 20px;
  height: 100px;
  width: 310px;
  opacity: 0;
  animation: animate 1s ease-in-out 0.3s 1 forwards;
  -webkit-text-stroke: 1px navy;
  background-color:rgba(255, 255, 255, 0.67);
  padding: 20px;
  box-shadow: 0 30px 50px #505050;
}

.home-slider .content button {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  opacity: 0;
  animation: animate 1s ease-in-out 0.6s 1 forwards;
}

@keyframes animate {
  from {
    opacity: 0;
    transform: translate(0, 100px);
    filter: blur(33px);
  }

  to {
    opacity: 1;
    transform: translate(0);
    filter: blur(0);
  }
}

.home-slider .button {
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 20px;
}

.home-slider .button button {
  width: 40px;
  height: 35px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  margin: 0 5px;
  border: 1px solid #000;
  transition: 0.3s;
}

.home-slider .button button:hover {
  background: #ababab;
  color: #fff;
}

/* .booking-btn {
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 20px;
  background: #007bff;
  color: #fff;
  text-transform: lowercase;
  border: solid 2px #151515;
  text-decoration: none;
  padding: 18px 32px;
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  position: relative;
  z-index: 1;
  transition: 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  cursor: pointer;
  overflow: hidden;
  transition-delay: 0s !important;
  text-transform: uppercase !important;
  letter-spacing: 1.5px;
  font-family: sans-serif;
}
.booking-btn::before {
  position: absolute;
  content: "";
  top: 0;
  right: 0;
  width: 0%;
  height: 100%;
  background: #151515;
  z-index: -1;
  transition: 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86);
}
.booking-btn:hover::before {
  width: 100%;
  left: 0;
  right: unset;
}
.booking-btn:hover {
  color: white;
} */

.btn { 
  border-radius: 100px;
}

.btn:link,
.btn:visited {
    text-transform: uppercase;
    text-decoration: none;
    padding: 15px 40px;
    display: inline-block;
    border-radius: 100px;
    transition: all .2s;
    position: absolute;
}

.btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.btn:active {
    transform: translateY(-1px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.btn-white {
    background-color: #4a90e2;
    color: white;
}

.btn::after {
    content: "";
    display: inline-block;
    height: 100%;
    width: 100%;
    border-radius: 100px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    transition: all .4s;
}

.btn-white::after {
    background-color: #4a90e2;
}

.btn:hover::after {
    transform: scaleX(1.4) scaleY(1.6);
    opacity: 0;
}

.btn-animated {
    animation: moveInBottom 5s ease-out;
    animation-fill-mode: backwards;
}

@keyframes moveInBottom {
    0% {
        opacity: 0;
        transform: translateY(30px);
    }

    100% {
        opacity: 1;
        transform: translateY(0px);
    }
}

</style>
