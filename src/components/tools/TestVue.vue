<template>
    <div class = "container">
      <button @click="showModal('info')">Show Info Modal</button>
  
      <AlertModal
        :isVisible="isModalVisible"
        :type="modalType"
        :title="modalTitle"
        :content="modalContent"
        @action="handleModalAction"
      />
      <DepartmentListComponentVue />
    </div>
  </template>
  
  <script>
  import AlertModal from "./AlertModal.vue";
import DepartmentListComponentVue from './DepartmentListComponent.vue';

  export default {
    components: { AlertModal, DepartmentListComponentVue },
    data() {
      return {
        isModalVisible: false, 
        modalType: "info", 
        modalTitle: "Default Title", 
        modalContent: "Default content for the modal.", 
      };
    },
    methods: {
      showModal(type) {
        this.modalType = type;
        this.modalTitle = `This is a ${type} modal`;
        this.modalContent = `You have triggered a ${type} modal.`;
        this.isModalVisible = true;
      },
      handleModalAction(action) {
        console.log("Modal Action:", action);
        if (action === "OK") {
          alert("You clicked OK!");
        } else if (action === "Cancel") {
          alert("You clicked Cancel!");
        }
        this.isModalVisible = false; 
      },
    },
  };
  </script>
  

<style scoped>
.container {
    display: flex;
    justify-content: space-around;
    margin-top: 120px;
}
</style>