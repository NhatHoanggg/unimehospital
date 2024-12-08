<template>
    <div class="slider-container">
      <div class="slider">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="item"
          :style="getItemStyle(index)"
        >
          <h1>Slide {{ index + 1 }}</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
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
        items: Array(7).fill(null), // Representing 7 slides
        active: 3, // Index of the active slide
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
  body {
    background-image: linear-gradient(to top right, #8b5cf6, #ec4899);
    min-height: 100vh;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: monospace;
  }
  .slider-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .slider {
    position: relative;
    width: 100%;
    height: 370px;
    overflow: hidden;
  }
  .item {
    position: absolute;
    width: 200px;
    height: 320px;
    text-align: justify;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    transition: 0.5s;
    left: calc(50% - 110px);
    top: 0;
  }
  #next,
  #prev {
    position: absolute;
    top: 40%;
    color: #fff;
    background-color: transparent;
    border: none;
    font-size: xxx-large;
    font-family: monospace;
    font-weight: bold;
    left: 400px;
  }
  #next {
    left: unset;
    right: 400px;
  }
  </style>
  