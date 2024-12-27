<template>
  <div class="add-employee-container">
    <div class="add-employee-card">
      <h2 class="card-title">Thêm Nhân Viên</h2>
      <form @submit.prevent="addEmployee">
        <!-- Upload Avatar -->
        <div class="avatar-container">
          <div class="avatar-wrapper">
            <img
              class="profile-pic"
              :src="avatar || defaultAvatar"
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
          <DepartmentListComponentVue
            style="width: 340px"
            @department-selected="handleDepartmentSelected"
          />
        </div>

        <div class="form-group">
          <button type="submit" class="add-button">Thêm Nhân Viên</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import DepartmentListComponentVue from "../tools/DepartmentListComponent.vue";
import { toast } from "vue3-toastify";

export default {
  components: { DepartmentListComponentVue },
  data() {
    return {
      avatar: null,
      employeeImage: null,
      employeeGender: null,
      selectedDepartment: null,
      defaultAvatar: "https://via.placeholder.com/200",
      formFields: [
        {
          id: "employeeName",
          label: "Họ và Tên",
          type: "text",
          model: "",
          placeholder: "Nhập tên nhân viên",
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
        const reader = new FileReader();
        reader.onload = (e) => {
          this.avatar = e.target.result;
          this.employeeImage = file; 
        };
        reader.readAsDataURL(file);
      }
    },

    handleDepartmentSelected(payload) {
      this.selectedDepartment = payload.department.label;
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

        const employeeData = {
          employeeUsername: this.formFields.find(
            (field) => field.id === "employeeUsername"
          ).model,
          employeePassword: this.formFields.find(
            (field) => field.id === "employeePassword"
          ).model,
          employeeEmail: this.formFields.find(
            (field) => field.id === "employeeEmail"
          ).model,
          employeeImage: this.employeeImage,
          employeeName: this.formFields.find(
            (field) => field.id === "employeeName"
          ).model,
          employeeAddress: this.formFields.find(
            (field) => field.id === "employeeAddress"
          ).model,
          employeePhoneNumber: this.formFields.find(
            (field) => field.id === "employeePhoneNumber"
          ).model,
          employeeGender: this.employeeGender === "true",
          employeeDateOfBirth: this.formFields.find(
            (field) => field.id === "employeeDateOfBirth"
          ).model,
          departmentName: this.selectedDepartment,
        };

        console.log("emloyee data", employeeData);

        const BEARER_TOKEN = localStorage.getItem("token");

        const response = await axios.post(
          "https://api.unime.site/UNIME/employees",
          employeeData,
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`,
            },
          }
        );

        if (response.data?.code === 1000) {
          // alert("Thêm nhân viên thành công!");
          toast.success(`Thêm nhân viên thành công!`, {
            rtl: false,
            limit: 3,
            position: this.$toast.POSITION.TOP_RIGHT,
          });
        } else {
          alert(
            "Có lỗi xảy ra: " +
              (response.data?.message || "Không rõ nguyên nhân")
          );
        }
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
