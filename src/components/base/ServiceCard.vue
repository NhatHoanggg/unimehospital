<template>
  <div class="service-card">
    <h2 class="service-title">{{ item.name }}</h2>
    <p class="service-desc">{{ item.desc }}</p>

    <div class="service-footer">
      <router-link to="/" class="service-link">
        <i class="fas fa-arrow-right"></i>
      </router-link>
      <span
        class="service-number"
        :style="{ background: item.bgColor, color: item.textColor }"
      >
        {{ index + 1 }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    index: Number,
  },
};
</script>

<style scoped>
.service-card {
  padding: 30px 15px;
  background-color: #f4f4f4;
  border-radius: 8px;
  text-align: center;
}

.service-title {
  font-size: 26px;
  font-weight: 700;
  color: #333;
  line-height: 36px;
}

.service-desc {
  font-size: 16px;
  color: #666;
  line-height: 24px;
  margin-top: 20px;
  text-align: justify;
}

.service-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
}

.service-link {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid #181a1e;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s, border-color 0.3s;
}

.service-link:hover {
  background-color: #ffcc00;
  border-color: transparent;
}

.service-number {
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  background-color: rgba(254, 182, 13, 0.2);
  border-radius: 6px 0 0 6px;
}
</style>
