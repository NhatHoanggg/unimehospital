<template>
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
  </template>
  
  <script>
  export default {
    props: {
      value: {
        type: String,
        default: "",
      },
    },
    data() {
      return {
        avatar: this.value, 
        defaultAvatar: "https://www.w3schools.com/w3images/avatar2.png",
      };
    },
    methods: {
      triggerFileUpload() {
        this.$refs.fileInput.click();
      },
      handleFileChange(event) {
        const file = event.target.files[0];
        this.$emit("change", file); 
      },
    },
    watch: {
      value(newVal) {
        this.avatar = newVal; 
      },
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
  </style>
  