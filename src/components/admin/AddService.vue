<template>
  <div class="wrapper">
    <div v-if="isLoading" class="loading">
      <p>Đang tải dữ liệu</p>
      <LoadingComponent />
    </div>
    <div v-else class="add-service-container">
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

      <div class="form-groupx">
        <label for="department">Chuyên khoa:</label>
        <department-list-component-vue
          @department-selected="handleDepartmentSelected"
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
import { toast } from "vue3-toastify";
import DepartmentListComponentVue from "../tools/DepartmentListComponent.vue";
import LoadingComponent from "../tools/LoadingComponent.vue";

export default {
  components: { DepartmentListComponentVue, LoadingComponent },

  data() {
    return {
      serviceName: "",
      servicePrice: "",
      serviceDescription: "",
      selectedDepartment: null,
      serviceImage: null,
      previewImage: null,
      imageUrl: "",
      isLoading: false,
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

    handleDepartmentSelected(payload) {
      this.selectedDepartment = payload.department;
      console.log("Phòng ban đã chọn:", this.selectedDepartment);
    },

    async addService() {
      if (!this.isValidForm) {
        toast.warn("Vui lòng điền đầy đủ thông tin!", {
          rtl: false,
          limit: 3,
          position: toast.POSITION.TOP_RIGHT,
        });
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
          toast.error("Token không hợp lệ hoặc hết hạn!", {
            rtl: false,
            limit: 3,
            position: toast.POSITION.TOP_RIGHT,
          });
          return;
        }

        const serviceData = {
          serviceName: this.serviceName,
          servicePrice: this.servicePrice,
          serviceDescription: this.serviceDescription,
          departmentId: this.selectedDepartment.value,
          serviceImage: this.imageUrl,
        };
        console.log("Service data:", serviceData);

        const serviceResponse = await axios.post(
          "https://api.unime.site/UNIME/services",
          serviceData,
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`,
            },
          }
        );

        if (serviceResponse.status === 200) {
          this.isLoading = false;
          toast.success("Thêm dịch vụ thành công!", {
            rtl: false,
            limit: 3,
            position: toast.POSITION.TOP_RIGHT,
          });
          this.resetForm();
        } else {
          toast.error("Thêm dịch vụ thất bại!", {
            rtl: false,
            limit: 3,
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } catch (error) {
        console.error(error);
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

.form-groupx {
  display: flex;
  align-items: left;
  justify-content: left;
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
