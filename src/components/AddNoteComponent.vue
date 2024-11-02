<template>
  <div class="container">
    <div class="box">
      <div class="title">
        <h1>3. Thêm ghi chú</h1>
        <i v-if="!isCollapsed" class="fas fa-chevron-up" @click="toggleCollapse"></i>
        <i v-else class="fas fa-chevron-down" @click="toggleCollapse"></i>
      </div>

      <div v-show="!isCollapsed" class="content">
        <div class="note-container">
          <div class="note-wrapper">
            
            <textarea 
              v-model="noteText"
              placeholder="Nhập ghi chú tại đây (để trống nếu không cần)" 
              rows="10" 
              cols="80"
              class="custom-textarea"
            ></textarea>

            <button class="button" @click="confirmSelection">Tiếp tục</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  data() {
    return {
      isCollapsed: true,
      noteText: '',
    };
  },
  methods: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    },
    confirmSelection() {
      this.isCollapsed = !this.isCollapsed;
      this.$emit('note', { note: this.noteText });
      // alert(this.noteText);
      toast.success('Thêm ghi chú thành công', {
        rtl: false,
        limit: 3,
        position: toast.POSITION.TOP_RIGHT,
      });
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: auto;
  background-color: #F1F5F9;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  display: flex;
  color: #2046A9;
}

.box {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 1024px;
  border: 3px solid #0047ba;
  border-radius: 20px;
  background-color: white;
  height: auto;
  transition: height 1s ease;
}

.title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.content {
  transition: all 0.3s ease;
}

.note-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 400px;
  gap: 20px;
  transition: all 0.3s ease;
}

.note-wrapper {
  min-height: 400px;
}

.custom-textarea {
  /* width: 90%;
  height: 150px; */
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.button {
  position: absolute; 
  bottom: 50px;       
  right: 114px;        
  min-width: 192px;
  padding: 15px 20px;
  border: 2px solid #003a9e;
  border-radius: 20px;
  color: #003a9e;
  font-weight: 500;
  font-size: 24px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.button:hover {
  background-color: #003a9e;
  color: #ffffff;
  cursor: pointer;
}
</style>
