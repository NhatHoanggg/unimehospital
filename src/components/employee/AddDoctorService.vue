<template>
  <div class="wrapper">
    <div class="add-service-container">
      <h2>Thêm dịch vụ bác sĩ</h2>

      <div class="form-group">
        <label for="serviceName">Tên dịch vụ:</label>
        <input type="text" v-model="serviceName" id="serviceName" placeholder="Nhập tên dịch vụ" />
      </div>

      <div class="form-group">
        <label for="servicePrice">Giá tiền:</label>
        <input type="number" v-model="servicePrice" id="servicePrice" placeholder="Nhập giá tiền" />
      </div>

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
          class="multi-select"
        />
      </div>

      <div class="form-group">
        <label for="doctors">Chọn bác sĩ:</label>
        <multiselect
          v-model="selectedDoctors"
          :options="doctors"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          placeholder="Chọn bác sĩ"
          label="label"
          track-by="value"
          class="multi-select"
        />
      </div>

      <div class="form-group">
        <label for="serviceImage">Hình ảnh dịch vụ:</label>
        <input type="file" id="serviceImage" @change="handleImageUpload" accept="image/*" />
      </div>
      <div class="form-group">
        <img v-if="previewImage" :src="previewImage" alt="Preview" class="preview-image" />
      </div>

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
      serviceImage: null,
      previewImage: null,
      imageUrl: "",
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
        { label: "Nathan Aguilar", value: "Nathan Aguilar" }
      ]
    };
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.serviceImage = file;
        this.previewImage = URL.createObjectURL(file); 
      } else {
        console.error("No file selected or file is invalid.");
      }
    },
    async addService() {
      if (this.serviceImage) {
        const uploadPreset = process.env.VUE_APP_CLOUD_AVATAR_UPLOAD_PRESET;
        const cloudName = process.env.VUE_APP_CLOUD_NAME;

        const formData = new FormData();
        formData.append("file", this.serviceImage);
        formData.append("upload_preset", uploadPreset);

        try {
          const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "POST",
            body: formData
          });
          const data = await response.json();
          this.imageUrl = data.secure_url;

          console.log("Tên dịch vụ:", this.serviceName);
          console.log("Giá tiền:", this.servicePrice);
          console.log("Chuyên khoa:", this.selectedDepartment);
          console.log("Bác sĩ:", this.selectedDoctors);
          console.log("URL hình ảnh:", this.imageUrl);
        } catch (error) {
          console.error("Upload failed:", error);
        }
      } else {
        console.log("Please select an image to upload.");
      }
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  height: auto;
  width: 100%;
}

.add-service-container {
  margin-top: 64px;
  padding: 50px;
  border-radius: 20px;
  border-width: 1px;
  width: 800px;
  height: auto;
  background-color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.form-group {
  display: flex;
  align-items: center;
  justify-content: center;
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
  max-width: 650px;
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

.preview-image {
  margin-top: 10px;
  max-width: 100%;
  max-height: 200px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
