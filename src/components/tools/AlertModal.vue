<template>
    <div v-if="isVisible" class="modal-overlay">
      <div :class="['modal', modalType]" role="dialog">
        <button class="close-btn" @click="handleCancel">✕</button>
  
        <h2 class="modal-title">{{ title }}</h2>
  
        <div class="modal-content">
          <p>{{ content }}</p>
        </div>
  
        <div class="modal-actions">
          <button class="action-btn cancel-btn" @click="handleCancel">Cancel</button>
          <button class="action-btn ok-btn" @click="handleOk">OK</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: {
        type: Boolean,
        required: true, 
      },
      title: {
        type: String,
        default: "Notification", 
      },
      content: {
        type: String,
        default: "This is a modal content.", 
      },
      type: {
        type: String,
        default: "info", 
        validator(value) {
          return ["warning", "success", "info", "danger"].includes(value); 
        },
      },
    },
    computed: {
      modalType() {
        return `modal-${this.type}`;
      },
    },
    methods: {
      handleOk() {
        this.$emit("action", "OK"); 
      },
      handleCancel() {
        this.$emit("action", "Cancel"); 
      },
    },
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .modal {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    width: 400px;
    max-width: 90%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: relative;
  }
  
  .modal-title {
    margin: 0;
    margin-bottom: 15px;
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
  }
  
  .modal-content {
    font-size: 1rem;
    color: #333;
    text-align: center;
  }
  
  .modal-actions {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
  }
  
  .action-btn {
    padding: 8px 15px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    border: none;
    min-width: 80px;
    text-align: center;
  }
  
  .ok-btn {
    background-color: #28a745;
    color: white;
  }
  
  .ok-btn:hover {
    background-color: #218838;
  }
  
  .cancel-btn {
    background-color: #dc3545;
    color: white;
  }
  
  .cancel-btn:hover {
    background-color: #c82333;
  }
  
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
  }
  
  .modal-info {
    border-left: 5px solid #007bff;
  }
  
  .modal-success {
    border-left: 5px solid #28a745;
  }
  
  .modal-warning {
    border-left: 5px solid #ffc107;
  }
  
  .modal-danger {
    border-left: 5px solid #dc3545;
  }
  </style>
  