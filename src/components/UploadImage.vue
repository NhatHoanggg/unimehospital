<template>
    <div class="upload-container">  
      <input type="file" @change="handleFileChange" accept="image/*" />
  
      <button @click="uploadImage" :disabled="!selectedFile">Upload Image</button>
  
      <div v-if="imageUrl" class="image-preview">
        <h2>Uploaded Image:</h2>
        <img :src="imageUrl" alt="Uploaded Image" />
        <p><strong>URL:</strong> <a :href="imageUrl" target="_blank">{{ imageUrl }}</a></p>
      </div>
  
      <p v-if="message" class="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedFile: null,
        imageUrl: "",  
        message: "",
        existingImageUrl: "",  
        isImageVisible: false 
      };
    },
    mounted(){
      console.log(process.env.VUE_APP_CLOUD_NAME);
      console.log(process.env.VUE_APP_CLOUD_AVATAR_UPLOAD_PRESET);
    },
    methods: {
      handleFileChange(event) {
        this.selectedFile = event.target.files[0];
        this.message = ""; 
      },
      async uploadImage() {
        if (!this.selectedFile) {
          this.message = "Please select an image file to upload.";
          return;
        }
  
        const uploadPreset = process.env.VUE_APP_CLOUD_AVATAR_UPLOAD_PRESET;
        const cloudName = process.env.VUE_APP_CLOUD_NAME;
        // console.log(uploadPreset, cloudName);
  
  
        const formData = new FormData();
        formData.append("file", this.selectedFile);
        formData.append("upload_preset", uploadPreset);
        try {
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, 
            {
              method: "POST",
              body: formData
            }
          );
          const data = await response.json();
          this.imageUrl = data.secure_url; 
          this.message = "Upload successful!";
        } catch (error) {
          console.error("Upload failed:", error);
          this.message = "Upload failed. Please try again.";
        }
      },
      showImage() {
        this.isImageVisible = true;
      }
    }
  };
  </script>
  
  <style scoped>
  .upload-container {
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
  }
  button {
    margin-top: 10px;
    padding: 10px 20px;
    font-size: 16px;
  }
  .image-preview, .existing-image {
    margin-top: 20px;
  }
  img {
    max-width: 100%;
    height: auto;
  }
  .message {
    color: red;
    font-weight: bold;
  }
  </style>
  