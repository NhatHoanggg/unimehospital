<template>
  <div class="add-doctor-container">
    <div class="add-doctor-card">
      <h2 class="card-title">Thêm Bác Sĩ</h2>
      <form @submit.prevent="addDoctor">
        <!-- Upload Avatar -->
        <div class="avatar-container">
          <div class="avatar-wrapper">
            <img
              class="profile-pic"
              :src="avatar || defaultAvatar"
              alt="Doctor Avatar"
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
              <input type="radio" v-model="doctorGender" value="true" /> Nam
            </label>
            <label>
              <input type="radio" v-model="doctorGender" value="false" /> Nữ
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
          <button type="submit" class="add-button">Thêm Bác Sĩ</button>
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
      avatar: null,
      doctorImage: null,
      doctorGender: null,
      selectedDepartment: null,
      defaultAvatar: "https://via.placeholder.com/200",
      formFields: [
        {
          id: "doctorName",
          label: "Họ và Tên",
          type: "text",
          model: "",
          placeholder: "Nhập tên bác sĩ",
          required: true,
        },
        {
          id: "doctorUsername",
          label: "Username",
          type: "text",
          model: "",
          placeholder: "Nhập username",
          required: true,
        },
        {
          id: "doctorPassword",
          label: "Mật Khẩu",
          type: "password",
          model: "",
          placeholder: "Nhập mật khẩu",
          required: true,
        },
        {
          id: "doctorEmail",
          label: "Email",
          type: "email",
          model: "",
          placeholder: "Nhập email",
          required: true,
        },
        { id: "doctorGender", label: "Giới Tính", type: "radio" },
        {
          id: "doctorDateOfBirth",
          label: "Ngày Sinh",
          type: "date",
          model: "",
          required: true,
        },
        {
          id: "doctorPhoneNumber",
          label: "Số Điện Thoại",
          type: "tel",
          model: "",
          placeholder: "Nhập số điện thoại",
          required: true,
        },
        {
          id: "doctorAddress",
          label: "Địa Chỉ",
          type: "textarea",
          model: "",
          placeholder: "Nhập địa chỉ",
          required: true,
        },
        {
          id: "doctorDescription",
          label: "Mô Tả",
          type: "textarea",
          model: "",
          placeholder: "Nhập mô tả của bác sĩ",
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
      // if (file) {
      //   this.doctorImage = file;
      // } else {
      //   console.error("Không có file nào được chọn!");
      // }
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.avatar = e.target.result;
          this.doctorImage = file; 
        };
        reader.readAsDataURL(file);
      }
    },

    handleDepartmentSelected(payload) {
      this.selectedDepartment = payload.department.label;
    },

    async addDoctor() {
      try {
        if (this.doctorImage && typeof this.doctorImage !== "string") {
          const formData = new FormData();
          formData.append("file", this.doctorImage);
          formData.append(
            "upload_preset",
            process.env.VUE_APP_CLOUD_AVATAR_UPLOAD_PRESET
          );

          const uploadResponse = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.VUE_APP_CLOUD_NAME}/image/upload`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );

          this.doctorImage = uploadResponse.data.secure_url;
          console.log("URL ảnh đã upload:", this.doctorImage);
        }

        const doctorData = {
          doctorUsername: this.formFields.find(
            (field) => field.id === "doctorUsername"
          ).model,
          doctorPassword: this.formFields.find(
            (field) => field.id === "doctorPassword"
          ).model,
          doctorEmail: this.formFields.find(
            (field) => field.id === "doctorEmail"
          ).model,
          doctorImage: this.doctorImage,
          doctorName: this.formFields.find((field) => field.id === "doctorName")
            .model,
          doctorAddress: this.formFields.find(
            (field) => field.id === "doctorAddress"
          ).model,
          doctorPhoneNumber: this.formFields.find(
            (field) => field.id === "doctorPhoneNumber"
          ).model,
          doctorGender: this.doctorGender === "true",
          doctorDateOfBirth: this.formFields.find(
            (field) => field.id === "doctorDateOfBirth"
          ).model,
          doctorDescription: this.formFields.find(
            (field) => field.id === "doctorDescription"
          ).model,
          departmentName: this.selectedDepartment,
        };
        
        console.log("Dữ liệu gửi đi:", doctorData);

        const BEARER_TOKEN = localStorage.getItem("token");

        const response = await axios.post(
          "https://api.unime.site/UNIME/doctors",
          doctorData,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(BEARER_TOKEN)}`,
            },
          }
        );

        if (response.data?.code === 1000) {
          alert("Thêm bác sĩ thành công!");
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
.add-doctor-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  padding: 20px;
}

.add-doctor-card {
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
