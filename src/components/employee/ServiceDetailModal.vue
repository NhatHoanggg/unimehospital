<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h2>Chi Tiết Dịch Vụ</h2>
      <div>
        <p><strong>Tên dịch vụ:</strong> {{ serviceDetail.serviceName }}</p>
        <p><strong>Chuyên khoa:</strong> {{ serviceDetail.departmentName }}</p>
        <p><strong>Giá:</strong> {{ serviceDetail.servicePrice }} VND</p>
        <p><strong>Mô tả:</strong> {{ serviceDetail.serviceDescription }}</p>
        <img :src=serviceDetail.serviceImage  alt="Service Image">
      </div>
      <button class="close-button" @click="closeModal">Đóng</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    serviceDetail: {
      type: Object,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: linear-gradient(145deg, #f3f3f3, #ffffff); 
  padding: 25px;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  position: relative;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease-out;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

p {
  margin: 10px 0;
  font-size: 16px;
  line-height: 1.6;
  color: #555;
}

p strong {
  color: #000;
}

img {
  width: 100%;
  max-height: 250px;
  object-fit: cover;
  border-radius: 8px;
  margin-top: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); 
}

.close-button {
  display: block;
  margin: 25px auto 0;
  padding: 12px 25px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}

.close-button:hover {
  background: #0056b3;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
