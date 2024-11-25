<template>
  <div class="add-employee-container">
    <div class="add-employee-card">
      <h2 class="card-title">Thêm Quản lý</h2>
      <form @submit.prevent="addEmployee">
        <!-- Upload Avatar -->
        <div class="avatar-container">
          <div class="avatar-wrapper">
            <img
              class="profile-pic"
              :src="employeeImage || defaultAvatar"
              alt="Employee Avatar"
            />
            <div class="upload-button" @click="triggerFileUpload">
              <i class="fa fa-upload"></i>.
            </div>
            <input
              class="file-upload"
              type="file"
              accept="image/*"
              ref="fileInput"
              @change="onFileChange"
            />
          </div>
        </div>

        <!-- Form Fields -->
        <div class="form-row" v-for="(field, index) in formFields" :key="index">
          <label :for="field.id">{{ field.label }}</label>
          <input
            v-if="field.type !== 'textarea' && field.type !== 'radio'"
            :type="field.type"
            :id="field.id"
            v-model="field.model"
            :placeholder="field.placeholder"
            :required="field.required"
          />
          <textarea
            v-else-if="field.type === 'textarea'"
            :id="field.id"
            v-model="field.model"
            :placeholder="field.placeholder"
            :required="field.required"
          ></textarea>
          <div v-else-if="field.type === 'radio'" class="radio-group">
            <label>
              <input type="radio" v-model="employeeGender" value="true" /> Nam
            </label>
            <label>
              <input type="radio" v-model="employeeGender" value="false" /> Nữ
            </label>
          </div>
        </div>

        <div class="form-row">
          <label for="department">Khoa:</label>
          <DepartmentListComponentVue style="width: 340px" />
        </div>

        <div class="form-group">
          <button type="submit" class="add-button">Thêm Quản lý</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import DepartmentListComponentVue from "../tools/DepartmentListComponent.vue";

export default {
  components: { DepartmentListComponentVue },
  data() {
    return {
      employeeImage: null,
      employeeGender: null,
      defaultAvatar: "https://via.placeholder.com/200",
      formFields: [
        {
          id: "employeeName",
          label: "Họ và Tên",
          type: "text",
          model: "",
          placeholder: "Nhập tên quản lý",
          required: true,
        },
        {
          id: "employeeUsername",
          label: "Username",
          type: "text",
          model: "",
          placeholder: "Nhập username",
          required: true,
        },
        {
          id: "employeePassword",
          label: "Mật Khẩu",
          type: "password",
          model: "",
          placeholder: "Nhập mật khẩu",
          required: true,
        },
        {
          id: "employeeEmail",
          label: "Email",
          type: "email",
          model: "",
          placeholder: "Nhập email",
          required: true,
        },
        { id: "employeeGender", label: "Giới Tính", type: "radio" },
        {
          id: "employeeDateOfBirth",
          label: "Ngày Sinh",
          type: "date",
          model: "",
          required: true,
        },
        {
          id: "employeePhoneNumber",
          label: "Số Điện Thoại",
          type: "tel",
          model: "",
          placeholder: "Nhập số điện thoại",
          required: true,
        },
        {
          id: "employeeAddress",
          label: "Địa Chỉ",
          type: "textarea",
          model: "",
          placeholder: "Nhập địa chỉ",
          required: true,
        },
      ],
    };
  },
  methods: {
    triggerFileUpload() {
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.employeeImage = file;
      } else {
        console.error("Không có file nào được chọn!");
      }
    },
    async addEmployee() {
      try {
        if (this.employeeImage && typeof this.employeeImage !== "string") {
          const formData = new FormData();
          formData.append("file", this.employeeImage);
          formData.append(
            "upload_preset",
            process.env.VUE_APP_CLOUD_AVATAR_UPLOAD_PRESET
          );

          const uploadResponse = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.VUE_APP_CLOUD_NAME}/image/upload`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );

          this.employeeImage = uploadResponse.data.secure_url;
          console.log("URL ảnh đã upload:", this.employeeImage);
        }

        alert("Upload thành công!");
      } catch (error) {
        console.error(
          "Có lỗi xảy ra trong quá trình upload ảnh:",
          error.response?.data || error.message
        );
      }
    },
  },
};
</script>

<style scoped>
.add-employee-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  padding: 20px;
}

.add-employee-card {
  margin-top: 64px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 500px;
}

.card-title {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
  color: #333;
}
.avatar-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.avatar-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.profile-pic {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload-button {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  text-align: center;
  cursor: pointer;
  padding: 5px;
  transition: 0.3s;
}

.upload-button:hover {
  background: rgba(0, 0, 0, 0.7);
}

.file-upload {
  display: none;
}

.form-row {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

label {
  flex: 1;
  font-weight: bold;
}

input,
textarea {
  flex: 2;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

textarea {
  resize: none;
  height: 80px;
}

.radio-group {
  display: flex;
  gap: 10px;
  width: 340px;
}

.add-button {
  width: 100%;
  padding: 10px;
  background: #6a11cb;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
}

.add-button:hover {
  background: #2575fc;
}
</style>
