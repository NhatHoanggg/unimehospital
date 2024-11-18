<template>
  <div class="edit-profile-container">
    <div class="edit-profile-card">
      <form @submit.prevent="updateProfile">
        <div class="avatar-container">
          <UploadAvatar :value="user.avatar" @change="onAvatarChange" />
        </div>

        <div class="form-group">
          <label for="fullName">Họ và tên</label>
          <input type="text" id="fullName" v-model="user.fullName" required />
        </div>

        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="user.username" required />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="user.email" required />
        </div>

        <div class="form-group">
          <label>Giới tính</label>
          <div class="gender-options">
            <label>
              <input type="radio" v-model="user.gender" value="male" /> Nam
            </label>
            <label>
              <input type="radio" v-model="user.gender" value="female" /> Nữ
            </label>
          </div>
        </div>

        <div class="form-group">
          <label for="dob">Ngày sinh</label>
          <input type="date" id="dob" v-model="user.dob" required />
        </div>

        <div class="form-group">
          <label for="phone">Số điện thoại</label>
          <input type="text" id="phone" v-model="user.phone" required />
        </div>

        <div class="form-group">
          <label for="address">Địa chỉ</label>
          <textarea id="address" v-model="user.address" required></textarea>
        </div>

        <div class="form-group">
          <button type="submit" class="update-button">Cập nhật</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import UploadAvatar from './UploadAvatar.vue';

export default {
  components: {
    UploadAvatar,
  },
  data() {
    return {
      user: {
        avatar: "",
        fullName: "",
        username: "",
        email: "",
        gender: "male",
        dob: "",
        phone: "",
        address: "",
      },
    };
  },
  methods: {
    onAvatarChange(avatarData) {
      this.user.avatar = avatarData;
    },
    updateProfile() {
      console.log("Cập nhật thông tin người dùng:", this.user);
    },
  },
};
</script>

<style scoped>
.edit-profile-container {
  margin-top: 64px;
  display: flex;
  justify-content: center;
  padding: 40px;
  background-color: #f4f4f9;
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
