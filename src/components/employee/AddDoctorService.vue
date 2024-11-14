<template>
  <div class="wrapper">
    <div class="add-service-container">
      <h2>Thêm dịch vụ bác sĩ</h2>

      <!-- Input tên dịch vụ -->
      <div class="form-group">
        <label for="serviceName">Tên dịch vụ:</label>
        <input type="text" v-model="serviceName" id="serviceName" placeholder="Nhập tên dịch vụ" />
      </div>

      <!-- Input giá tiền -->
      <div class="form-group">
        <label for="servicePrice">Giá tiền:</label>
        <input type="number" v-model="servicePrice" id="servicePrice" placeholder="Nhập giá tiền" />
      </div>

      <!-- Dropdown chọn chuyên khoa với tìm kiếm -->
      <div class="form-group">
        <label for="department">Chuyên khoa:</label>
        <multiselect
          v-model="selectedDepartment"
          :options="departments"
          placeholder="Chọn chuyên khoa"
          label="label"
          track-by="value"
          :searchable="true"
          :close-on-select="true"
          :allow-empty="false"
          class = "multi-select"
        />
      </div>

      <!-- Dropdown multiple select chọn bác sĩ -->
      <div class="form-group">
        <label for="doctors">Chọn bác sĩ:</label>
        <multiselect
          v-model="selectedDoctors"
          :options="doctors"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          placeholder="Select options"
          label="label"
          track-by="value"
          class = "multi-select"
        />
      </div>
      <p>Các lựa chọn đã chọn:</p>
      <ul>
        <li v-for="doctor in selectedDoctors" :key="doctor.value">{{ doctor.label }}</li>
      </ul>
      <!-- Nút submit -->
      <button @click="addService">Thêm dịch vụ</button>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";

export default {
  components: { Multiselect },

  data() {
    return {
      serviceName: '',
      servicePrice: '',
      selectedDepartment: null,
      selectedDoctors: [],
      departments: [
        { label: "Khoa Nội", value: "Khoa Nội" },
        { label: "Khoa Ngoại", value: "Khoa Ngoại" },
        { label: "Khoa Nhi", value: "Khoa Nhi" },
        { label: "Khoa Sản", value: "Khoa Sản" }
      ],
      doctors: [
        { label: "Mark McCoy", value: "Mark McCoy" },
        { label: "Andrew Marsh", value: "Andrew Marsh" },
        { label: "Edna Alexander", value: "Edna Alexander" },
        { label: "Roger Guerrero", value: "Roger Guerrero" },
        { label: "Angel Wolfe", value: "Angel Wolfe" },
        { label: "Hattie Copeland", value: "Hattie Copeland" },
        { label: "Francis Black", value: "Francis Black" },
        { label: "Jeffery Waters", value: "Jeffery Waters" },
        { label: "Tony Johnson", value: "Tony Johnson" },
        { label: "Alan Rice", value: "Alan Rice" },
        { label: "Lucas Nash", value: "Lucas Nash" },
        { label: "Nathan Aguilar", value: "Nathan Aguilar" },
      ]
    };
  },
  methods: {
    addService() {
      console.log('Tên dịch vụ:', this.serviceName);
      console.log('Giá tiền:', this.servicePrice);
      console.log('Chuyên khoa:', this.selectedDepartment);
      console.log('Bác sĩ:', this.selectedDoctors);
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100%;
}

.add-service-container {
  margin-top: 64px;
  padding: 50px;
  border-radius: 20px;
  border-width: 1px;
  width: 960px;
  background-color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

label {
  width: 150px;
  font-weight: bold;
  text-align: left;
}

input, select {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.multi-select {
  max-width: 810px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

button {
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  border-radius: 8px;
}

button:disabled {
  background-color: #ccc;
}

</style>
