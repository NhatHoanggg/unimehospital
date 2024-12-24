<template>
    <div class="faq-item" @click="toggleAccordion">
      <div class="faq-header">
        <h4 class="faq-question">{{ item.question }}</h4>
        <div :class="accordionClass" class="faq-icon">
          <span v-if="isOpen"><i class="fas fa-minus"></i></span>
          <span v-else><i class="fas fa-plus"></i></span>
        </div>
      </div>
      <div v-if="isOpen" class="faq-content">
        <p>{{ item.content }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FaqItem',
    props: {
      item: Object,
    },
    data() {
      return {
        isOpen: false,
      };
    },
    computed: {
      accordionClass() {
        return {
          'bg-primaryColor text-white border-none': this.isOpen,
          'border-solid border-[#141F21]': !this.isOpen,
        };
      },
    },
    methods: {
      toggleAccordion() {
        this.isOpen = !this.isOpen;
      },
    },
  };
  </script>
  
  <style scoped>
  .faq-item {
    padding: 15px;
    border: 1px solid #d9dce2;
    border-radius: 12px;
    margin-bottom: 20px;
    cursor: pointer;
    width: 100%;
  }
  
  .faq-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
  
  .faq-question {
    font-size: 16px;
    line-height: 1.4;
    color: #333;
  }
  
  .faq-icon {
    width: 30px;
    height: 30px;
    border: 1px solid #141f21;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .faq-content {
    margin-top: 16px;
    font-size: 14px;
    color: #666;
    text-align: justify;
  }
  </style>
  