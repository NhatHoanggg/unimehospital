<template>
  <div class="wrapper">
    <div class="add-service-container">
      <h2>Thêm dịch vụ bệnh viện</h2>

      <div class="form-group">
        <label for="serviceName">Tên dịch vụ:</label>
        <input
          type="text"
          v-model="serviceName"
          id="serviceName"
          placeholder="Nhập tên dịch vụ"
        />
      </div>

      <div class="form-group">
        <label for="servicePrice">Giá tiền:</label>
        <input
          type="number"
          v-model="servicePrice"
          id="servicePrice"
          placeholder="Nhập giá tiền"
        />
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
        <label for="serviceDescription">Mô tả dịch vụ:</label>
        <textarea
          v-model="serviceDescription"
          id="serviceDescription"
          placeholder="Nhập mô tả dịch vụ"
          rows="4"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="serviceImage">Hình ảnh dịch vụ:</label>
        <input
          type="file"
          id="serviceImage"
          @change="handleImageUpload"
          accept="image/*"
        />
      </div>
      <div class="form-group">
        <img
          v-if="previewImage"
          :src="previewImage"
          alt="Preview"
          class="preview-image"
        />
      </div>

      <button @click="addService" :disabled="!isValidForm">Thêm dịch vụ</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";

export default {
  components: { Multiselect },

  data() {
    return {
      serviceName: "",
      servicePrice: "",
      serviceDescription: "",
      selectedDepartment: null,
      serviceImage: null,
      previewImage: null,
      imageUrl: "",
      isLoading: true,
      data: "",
      departments: [
        { label: "Răng-Hàm-Mặt", value: "Răng-Hàm-Mặt" },
        { label: "Tim Mạch", value: "Tim Mạch" },
        { label: "Nhi Khoa", value: "Nhi Khoa" },
        { label: "Da Liễu", value: "Da Liễu" },
      ],
    };
  },

  computed: {
    isValidForm() {
      return (
        this.serviceName &&
        this.servicePrice &&
        this.selectedDepartment &&
        this.serviceImage
      );
    },
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
      if (!this.isValidForm) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
      }

      if (!this.serviceImage) {
        alert("Vui lòng chọn hình ảnh cho dịch vụ!");
        return;
      }

      const uploadPreset = process.env.VUE_APP_CLOUD_AVATAR_UPLOAD_PRESET;
      const cloudName = process.env.VUE_APP_CLOUD_NAME;

      const formData = new FormData();
      formData.append("file", this.serviceImage);
      formData.append("upload_preset", uploadPreset);

      try {
        const uploadResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        );
        this.imageUrl = uploadResponse.data.secure_url;

        const BEARER_TOKEN = localStorage.getItem("token");

        if (!BEARER_TOKEN) {
          alert("Token không hợp lệ hoặc hết hạn!");
          return;
        }

        const serviceResponse = await axios.post(
          "https://api.unime.site/UNIME/services",
          {
            serviceImage: this.imageUrl,
            serviceName: this.serviceName,
            serviceDescription: this.serviceDescription,
            servicePrice: this.servicePrice,
            departmentName: this.selectedDepartment.value,
          },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(BEARER_TOKEN)}`,
            },
          }
        );

        if (serviceResponse.status === 200) {
          console.log("Dịch vụ đã được thêm thành công:", serviceResponse.data);
          alert("Thêm dịch vụ thành công!");
          this.resetForm();
        } else {
          console.error("Lỗi khi thêm dịch vụ:", serviceResponse.data);
          alert("Thêm dịch vụ thất bại.");
        }
      } catch (error) {
        if (error.response) {
          console.error("Lỗi server:", error.response.data);
          alert(`Có lỗi từ server: ${error.response.data.message || error.response.data}`);
        } else if (error.request) {
          console.error("Lỗi không nhận được phản hồi:", error.request);
          alert("Không nhận được phản hồi từ server.");
        } else {
          console.error("Lỗi thiết lập yêu cầu:", error.message);
          alert(`Lỗi: ${error.message}`);
        }
      }
    },

    resetForm() {
      this.serviceName = "";
      this.servicePrice = "";
      this.serviceDescription = "";
      this.selectedDepartment = null;
      this.serviceImage = null;
      this.previewImage = null;
      this.imageUrl = "";
    },
    fetchDepartment() {
      this.isLoading = true;
      axios
        .get("https://api.unime.site/UNIME/departments/get/departmentList")
        .then((response) => {
          this.departments = response.data.result;
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
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

input,
select {
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

textarea {
  resize: none;
  padding: 10px;
  width: 640px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.preview-image {
  width: 100%;
  max-height: 200px;
  margin-top: 10px;
  object-fit: contain;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
