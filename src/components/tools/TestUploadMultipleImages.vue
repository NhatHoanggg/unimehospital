<template>
    <div class="upload-container">
      <h1>Upload Image</h1>
  
      <input type="file" @change="handleFileChange" accept="image/*" multiple />
  
      <button @click="uploadImages" :disabled="!selectedFiles.length">Upload Images</button>
  
      <div v-if="imageUrls.length" class="image-preview">
        <h2>Uploaded Images:</h2>
        <div v-for="(url, index) in imageUrls" :key="index" class="image-item">
          <img :src="url" alt="Uploaded Image" />
          <p><strong>URL:</strong> <a :href="url" target="_blank">{{ url }}</a></p>
        </div>
      </div>
  
      <p v-if="message" class="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedFiles: [],
        imageUrls: [], 
        message: "",
      };
    },
    methods: {
      handleFileChange(event) {
        this.selectedFiles = Array.from(event.target.files); 
        this.message = ""; 
      },
      async uploadImages() {
        if (!this.selectedFiles.length) {
          this.message = "Please select image files to upload.";
          return;
        }
  
        const uploadPreset = process.env.VUE_APP_CLOUD_AVATAR_UPLOAD_PRESET;
        const cloudName = process.env.VUE_APP_CLOUD_NAME;
  
        this.message = "Uploading...";
        this.imageUrls = []; 
  
        const uploadPromises = this.selectedFiles.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", uploadPreset);
  
          try {
            const response = await fetch(
              `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
              {
                method: "POST",
                body: formData,
              }
            );
            const data = await response.json();
            return data.secure_url;
          } catch (error) {
            console.error("Upload failed:", error);
            this.message = "Some uploads failed. Please try again.";
            return null;
          }
        });
  
        // Chờ tất cả upload xong
        const results = await Promise.all(uploadPromises);
        this.imageUrls = results.filter((url) => url); // Lọc URL hợp lệ
        this.message = this.imageUrls.length
          ? "Upload successful!"
          : "Upload failed. Please try again.";
      },
    },
  };
  </script>
  
  <style scoped>
  .upload-container {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
  }
  
  h1 {
    margin-top: 100px;
  }
  button {
    margin-top: 10px;
    padding: 10px 20px;
    font-size: 16px;
  }
  .image-preview {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .image-item {
    flex: 1 1 45%;
    text-align: center;
  }
  img {
    max-width: 100%;
    height: auto;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  .message {
    color: red;
    font-weight: bold;
  }
  </style>
  