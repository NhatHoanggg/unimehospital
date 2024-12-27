<template>
  <div class="wrapper">
    <div class="add-service-container">
      <h2>Thêm chuyên khoa</h2>

      <div class="form-group">
        <label for="departmentName">Tên chuyên khoa:</label>
        <input
          type="text"
          v-model="departmentName"
          id="departmentName"
          placeholder="Nhập tên chuyên khoa"
        />
      </div>

      <div class="form-group">
        <label for="departmentDescription">Mô tả:</label>
        <textarea
          v-model="departmentDescription"
          id="departmentDescription"
          placeholder="Nhập mô tả chuyên khoa"
          rows="4"
        ></textarea>
      </div>

      <button @click="addDepartment">Thêm chuyên khoa</button>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import {toast} from 'vue3-toastify';

export default {
  data() {
    return {
      departmentName: '',
      departmentDescription: '',
    };
  },

  methods: {
    async addDepartment() {
      if (!this.departmentName || !this.departmentDescription) {
        // alert("Vui lòng điền đầy đủ thông tin!");
        toast.warn(`Vui lòng điền đầy đủ thông tin!`,
                    {
                      rtl: false,
                      limit: 3,
                      position: toast.POSITION.TOP_RIGHT,
                    },); 
        return;
      }

      const departmentData = {
        departmentName: this.departmentName,
        departmentDescription: this.departmentDescription,
      };

      const BEARER_TOKEN = localStorage.getItem("token");

      try {
        const response = await axios.post(
          "https://api.unime.site/UNIME/departments",
          departmentData,
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`,
            },
          }
        );

        if (response.status === 200) {
          // console.log("Chuyên khoa đã được thêm thành công:", response.data);
          toast.success(`Chuyên khoa đã được thêm thành công!`,
                    {
                      rtl: false,
                      limit: 3,
                      position: toast.POSITION.TOP_RIGHT,
                    },); 
          this.resetForm();

        } else {
          console.error("Lỗi khi thêm chuyên khoa:", response.data);
          toast.error(`Có lỗi xảy ra trong quá trình thêm chuyên khoa!`,
                    {
                      rtl: false,
                      limit: 3,
                      position: toast.POSITION.TOP_RIGHT,
                    },); 
        }
      } catch (error) {
        console.error("Lỗi xảy ra:", error);
        // alert("Có lỗi xảy ra trong quá trình xử lý.");
        toast.error(`Có lỗi xảy ra trong quá trình xử lý!`,
                    {
                      rtl: false,
                      limit: 3,
                      position: toast.POSITION.TOP_RIGHT,
                    },); 
      }
    },

    resetForm() {
      this.departmentName = '';
      this.departmentDescription = '';
    },
  },
};
</script>



<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  height: auto;
  width: 100%;
}

.add-service-container {
  margin-top: 64px;
  padding: 50px;
  border-radius: 20px;
  border-width: 1px;
  width: 800px;
  height: auto;
  background-color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

textarea {
  resize: none;
  padding: 10px;
  width: 640px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.form-group {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

label {
  width: 150px;
  font-weight: bold;
  text-align: left;
}

input,
select {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

button {
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  border-radius: 8px;
}

button:disabled {
  background-color: #ccc;
}


</style>
