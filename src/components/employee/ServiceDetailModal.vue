<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h2>Chi Tiết Dịch Vụ</h2>
      <div>
        <p><strong>Tên dịch vụ:</strong> {{ serviceDetail.serviceName }}</p>
        <p><strong>Chuyên khoa:</strong> {{ serviceDetail.departmentName }}</p>
        <p><strong>Giá:</strong> {{ serviceDetail.servicePrice }} VND</p>
        <p><strong>Mô tả:</strong> {{ serviceDetail.description }}</p>
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

p {
  margin: 10px 0;
}

.close-button {
  display: block;
  margin: 20px auto 0;
  padding: 10px 20px;
  background: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.close-button:hover {
  background: #c82333;
}
</style>
