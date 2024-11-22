<template>
  <div class="edit-profile-container">
    <div class="edit-profile-card">
      <form @submit.prevent="updateProfile">
        <div class="avatar-container">
          <div class="avatar-wrapper">
            <img class="profile-pic" :src="avatar || defaultAvatar" alt="Avatar" />
            <div class="upload-button" @click="triggerFileUpload">
              <i class="fa fa-arrow-circle-up" aria-hidden="true"></i>
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

        <!-- Các trường form -->
        <div class="form-group">
          <label for="fullName">Họ và tên</label>
          <input type="text" id="fullName" v-model="patientName" required />
        </div>

        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="patientUsername" readonly />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="patientEmail" readonly />
        </div>

        <div class="form-group">
          <label>Giới tính</label>
          <div class="gender-options">
            <label>
              <input type="radio" v-model="patientGender" value="true" /> Nam
            </label>
            <label>
              <input type="radio" v-model="patientGender" value="false" /> Nữ
            </label>
          </div>
        </div>

        <div class="form-group">
          <label for="dob">Ngày sinh</label>
          <input type="date" id="dob" v-model="patientDateOfBirth" required />
        </div>

        <div class="form-group">
          <label for="phone">Số điện thoại</label>
          <input type="text" id="phone" v-model="patientPhoneNumber" required />
        </div>

        <div class="form-group">
          <label for="address">Địa chỉ</label>
          <textarea id="address" v-model="patientAddress" required></textarea>
        </div>

        <div class="form-group">
          <button type="submit" class="update-button">Cập nhật</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      avatar: null,
      defaultAvatar: "https://via.placeholder.com/200",
      patientId: "",
      userId: "",
      patientUsername: "",
      // patientPassword: "",
      patientEmail: "",
      patientImage: "",
      patientName: "",
      patientAddress: "",
      patientPhoneNumber: "",
      patientGender: "",
      patientDateOfBirth: "",
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
          this.patientImage = file; 
        };
        reader.readAsDataURL(file);
      }
    },
    async updateProfile() {
      try {
        if (this.patientImage && typeof this.patientImage !== "string") {
          const formData = new FormData();
          formData.append("file", this.patientImage);
          formData.append("upload_preset", process.env.VUE_APP_CLOUD_AVATAR_UPLOAD_PRESET);

          const uploadResponse = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.VUE_APP_CLOUD_NAME}/image/upload`,
            formData
          );
          this.patientImage = uploadResponse.data.secure_url;
        }

        // Tạo object dữ liệu cập nhật
        const updatedUser = {
          patientId: this.patientId,
          userId: this.userId,
          patientUsername: this.patientUsername,
          // patientPassword: this.patientPassword,
          patientEmail: this.patientEmail,
          patientImage: this.patientImage,
          patientName: this.patientName,
          patientAddress: this.patientAddress,
          patientPhoneNumber: this.patientPhoneNumber,
          patientGender: this.patientGender,
          patientDateOfBirth: this.patientDateOfBirth,
        };
        console.log(updatedUser);
        const token = localStorage.getItem("token");
        await axios.put(
          `https://api.unime.site/UNIME/patients/update`,
          updatedUser,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          }
        );

        const userLocal = {
          username : this.patientUsername,
          image : this.patientImage,
          scope : 'PATIENT'
        }

        localStorage.setItem("user", JSON.stringify(userLocal));

        alert("Cập nhật thành công!");
      } catch (error) {
        console.error("Lỗi cập nhật:", error);
        alert("Cập nhật thất bại!");
      }
    },
    fetchUserData() {
      const token = localStorage.getItem("token");
      axios
        .get(`https://api.unime.site/UNIME/patients/myInfo`, {
          headers: { Authorization: `Bearer ${JSON.parse(token)}` },
        })
        .then((response) => {
          if (response.data.code === 1000) {
            const user = response.data.result;
            this.patientId = user.patientId;
            this.userId = user.userId;
            this.patientUsername = user.patientUsername;
            this.patientPassword = user.patientPassword;
            this.patientEmail = user.patientEmail;
            this.patientImage = user.patientImage;
            this.patientName = user.patientName;
            this.patientAddress = user.patientAddress;
            this.patientPhoneNumber = user.patientPhoneNumber;
            this.patientGender = user.patientGender;
            this.patientDateOfBirth = user.patientDateOfBirth;
            this.avatar = user.patientImage || this.defaultAvatar;
          }
        })
        .catch((error) => {
          console.error("Lỗi tải dữ liệu:", error);
        });
    },
  },
  created() {
    this.fetchUserData();
  },
};
</script>

<style scoped>
.avatar-wrapper {
    position: relative;
    height: 200px;
    width: 200px;
    margin: auto;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 1px 1px 15px -5px black;
    transition: all 0.3s ease;
  }
  
  .avatar-wrapper:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
  
  .avatar-wrapper:hover .profile-pic {
    opacity: 0.5;
  }
  
  .profile-pic {
    height: 100%;
    width: 100%;
    transition: all 0.3s ease;
    object-fit: cover;
  }
  
  .upload-button {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .upload-button .fa-arrow-circle-up {
    font-size: 50px;
    color: #34495e;
    opacity: 0;
    transition: all 0.3s ease;
  }
  
  .upload-button:hover .fa-arrow-circle-up {
    opacity: 0.9;
  }
  
  .file-upload {
    display: none;
  }


.edit-profile-container {
  margin-top: 64px;
  display: flex;
  justify-content: center;
  padding: 40px;
  /* background-color: #f4f4f9; */
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  height: 800px;
  overflow: hidden;
}

.edit-profile-card {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 600px;
}

.card-title {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
}

.form-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.form-group label {
  font-size: 14px;
  color: #333;
  width: 150px;
  text-align: right;
  margin-right: 20px;
}

input[type="text"],
input[type="email"],
input[type="date"],
textarea {
  width: calc(100% - 180px);
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

textarea {
  height: 100px;
}

.gender-options {
  display: flex;
  gap: 15px;
}

.avatar-container {
  display: flex;
  gap:0;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 20px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.upload-icon {
  position: absolute;
  bottom: 5px;
  right: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
}

input[type="file"] {
  display: none;
}

.update-button {
  background-color: #3b82f6;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.update-button:hover {
  background-color: #1147a4;
}

@media (max-width: 600px) {
  .edit-profile-card {
    width: 100%;
    padding: 20px;
  }

  .form-group {
    flex-direction: column;
    align-items: flex-start;
  }

  .form-group label {
    width: auto;
    margin-bottom: 10px;
  }

  input[type="text"],
  input[type="email"],
  input[type="date"],
  textarea {
    width: 100%;
  }
}
</style>
