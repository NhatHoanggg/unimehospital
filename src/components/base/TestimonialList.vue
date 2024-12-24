<template>
  <div class="slider-container">
    <div class="slider">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="item"
        :style="getItemStyle(index)"
      >
        <!-- <h1>Slide {{ index + 1 }}</h1> -->
        <img class="avt" :src="item.image" alt="" />
        <h1>{{ item.name }}</h1>
        <p>{{ item.comment }}</p>
      </div>
      <button id="prev" @click="prevSlide">&lt;</button>
      <button id="next" @click="nextSlide">&gt;</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          image:
            "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1735050317/696fda26362eaa1a276f04b8a2e15af4_et6mql.jpg",
          name: "Mitchell Goodwin",
          comment:
            "instead grass industrial generally battle character window letter cross past since certainly jack rough anyone sister president taste construction length year hide steady fur",
        },
        {
          image:
            "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1735050317/7eeaf919ba9fc1500d7df50e2d2f29ac_gnadup.jpg",
          name: "Oscar Todd",
          comment:
            "friendly greatest brother danger sport buried must war rhythm whenever story medicine own wonderful bill fence introduced cat merely buffalo hurt am natural height",
        },
        {
          image:
            "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1735050317/84b941911c117feea45c672636078a47_qcumse.jpg",
          name: "Louise Daniels",
          comment:
            "baby imagine note review ice firm nor sitting rich desk return population grandmother pool raw nation act out bottom heading model shoe further night",
        },
        {
          image:
            "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1735050317/12cbef2de0f2d14bf0eae9bece773ad8_hl800w.jpg",
          name: "Jeanette Dean",
          comment:
            "road small together purple pour alive threw thee die facing doll was single dozen safe sea arrow wing list add greatest mail excitement try",
        },
        {
          image:
            "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1735050317/eaa71081ee37f47a844fa03c05da126b_yjltjs.jpg",
          name: "Maude Phelps",
          comment:
            "leave off leader master bow increase pie hurt purple send pay caught pretty tonight square several completely ride factory smell summer people gate shop",
        },
        {
          image:
            "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1735050317/410b0c978976648bc9fa3473745bf923_jlxj3y.jpg",
          name: "Esther Price",
          comment:
            "slept here ordinary shelf measure claws against plural tower stranger offer voyage white law potatoes necessary has height recently ahead personal fair good share",
        },
        {
          image:
            "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1735050317/0ee13d0a3a1b6cfb291d39a808db9742_xytt9a.jpg",
          name: "Gregory Ortiz",
          comment:
            "once step position running nearly glad forth exercise nature year vegetable gas firm clearly finish dried labor cool area chicken though growth land darkness",
        },
        {
          image:
            "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1735050403/9a64ddc8b627f12352bd84f5daddedfd_lxwonv.jpg",
          name: "Mason Garcia",
          comment:
            "balloon shake garden atom definition soon count swing south cannot under bet railroad magnet letter to needs eleven stood art no example smallest year",
        },
      ],
      active: 3,
    };
  },
  methods: {
    getItemStyle(index) {
      let stt = Math.abs(this.active - index);
      if (index === this.active) {
        return {
          transform: `none`,
          zIndex: 1,
          filter: `none`,
          opacity: 1,
        };
      } else if (index > this.active) {
        return {
          transform: `translateX(${120 * stt}px) scale(${
            1 - 0.2 * stt
          }) perspective(16px) rotateY(-1deg)`,
          zIndex: -stt,
          filter: `blur(5px)`,
          opacity: stt > 2 ? 0 : 0.6,
        };
      } else {
        return {
          transform: `translateX(${-120 * stt}px) scale(${
            1 - 0.2 * stt
          }) perspective(16px) rotateY(1deg)`,
          zIndex: -stt,
          filter: `blur(5px)`,
          opacity: stt > 2 ? 0 : 0.6,
        };
      }
    },
    nextSlide() {
      if (this.active + 1 < this.items.length) {
        this.active++;
      }
    },
    prevSlide() {
      if (this.active - 1 >= 0) {
        this.active--;
      }
    },
  },
};
</script>

<style scoped>
.slider-container {
  /* background-image: linear-gradient(to top right, #8b5cf6, #ec4899); */
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100vh; */
  height: 500px;
}
.slider {
  position: relative;
  width: 100%;
  height: 500px;
  /* overflow: hidden; */
}

.item {
  position: absolute;
  width: 500px;
  height: 320px;
  text-align: justify;
  background-color: #a2c1e0;
  border-radius: 10px;
  padding: 20px;
  transition: 0.5s;
  left: calc(50% - 250px);
  top: 0;
  border: 2px solid #000;
}

.item img {
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 50px;
  border: 2px solid #000;
}

#next,
#prev {
  position: absolute;
  top: 40%;
  /* color: #fff; */
  color: black;
  background-color: transparent;
  border: none;
  font-size: xxx-large;
  font-family: monospace;
  font-weight: bold;
  left: 300px;
}
#next {
  left: unset;
  right: 300px;
}
</style>
