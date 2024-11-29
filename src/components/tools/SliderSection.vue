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
            <button class = "bounce-top">See More</button>
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
  transform: translate(-50%, -50%);
  width: 1300px;
  height: 650px;
  background: #f5f5f5;
  box-shadow: 0 30px 50px #dbdbdb;
  z-index: 100;
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

.bounce-top {
	-webkit-animation: bounce-top 4s NaNs infinite alternate-reverse both;
  animation: bounce-top 4s NaNs infinite alternate-reverse both;
}

 @-webkit-keyframes bounce-top {
  0% {
    -webkit-transform: translateY(-45px);
            transform: translateY(-45px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
    opacity: 1;
  }
  24% {
    opacity: 1;
  }
  40% {
    -webkit-transform: translateY(-24px);
            transform: translateY(-24px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  65% {
    -webkit-transform: translateY(-12px);
            transform: translateY(-12px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  82% {
    -webkit-transform: translateY(-6px);
            transform: translateY(-6px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  93% {
    -webkit-transform: translateY(-4px);
            transform: translateY(-4px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  25%,
  55%,
  75%,
  87% {
    -webkit-transform: translateY(0px);
            transform: translateY(0px);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  100% {
    -webkit-transform: translateY(0px);
            transform: translateY(0px);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
    opacity: 1;
  }
}
@keyframes bounce-top {
  0% {
    -webkit-transform: translateY(-45px);
            transform: translateY(-45px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
    opacity: 1;
  }
  24% {
    opacity: 1;
  }
  40% {
    -webkit-transform: translateY(-24px);
            transform: translateY(-24px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  65% {
    -webkit-transform: translateY(-12px);
            transform: translateY(-12px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  82% {
    -webkit-transform: translateY(-6px);
            transform: translateY(-6px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  93% {
    -webkit-transform: translateY(-4px);
            transform: translateY(-4px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  25%,
  55%,
  75%,
  87% {
    -webkit-transform: translateY(0px);
            transform: translateY(0px);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  100% {
    -webkit-transform: translateY(0px);
            transform: translateY(0px);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
    opacity: 1;
  }
}


</style>
