<template>
  <div class="wrapper">

    <div class="appointment-detail">
    <h2>Appointment Detail</h2>
    <button class="close-button" @click="closeDetail">X</button>

    <div class="form-group">
      <label>Name</label>
      <input type="text" v-model="appointment.name" readonly />

      <label>Phone number</label>
      <input type="text" v-model="appointment.phone" readonly />

      <label>Email:</label>
      <input type="text" v-model="appointment.email" readonly />
    </div>

    <div class="form-group">
      <label>Date:</label>
      <input type="text" v-model="appointment.date" readonly />

      <label>Time:</label>
      <input type="text" v-model="appointment.time" readonly />
    </div>

    <div class="form-group">
      <label>Service:</label>
      <input type="text" v-model="appointment.service" readonly />
    </div>

    <div class="form-group">
      <label>Address:</label>
      <textarea v-model="appointment.address" readonly></textarea>
    </div>

    <div class="form-group">
      <label>Note:</label>
      <textarea v-model="appointment.note" readonly></textarea>
    </div>
  </div>
</div>

</template>

<script>
export default {
  data() {
    return {
      appointment: {
        name: "Bao Nhat Pro VIP",
        phone: "0896208417",
        email: "nguyenbaonhat06@gmail.com",
        date: "06-11-2024",
        time: "16:00 - 17:00",
        service: "Trồng răng sứ bọc kim cương",
        address: "K85/15 Nguyen Luong Bang, Hoa Khanh Bac, Quan Lien Chieu, Da Nang, Viet Nam.",
        note: `later wash brother everyone element pleasure ability chest very chemical loud rough nor pure pony dug bow rabbit softly activity topic dinner stone quite`
      }
    };
  },
  methods: {
    closeDetail() {
      this.$router.go(-1); 
    }
  }
};
</script>

<style scoped>
.wrapper{
  display: flex;
  justify-content: center;
  width: 100%;
}

.appointment-detail {
  max-width: 960px;
  background-color: #f5f5f5;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 0 auto;
  margin-top: 100px;
  position: relative;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.form-group {
  display: flex;
  /* flex-wrap: wrap; */
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 15px;
}

label {
  width: 50px;
  font-weight: bold;
  text-align: left;
}

input,
textarea {
  flex: 1;
  margin-right: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
}

textarea {
  width: calc(100% - 110px);
  height: 80px;
}

input[readonly],
textarea[readonly] {
  background-color: #f0f0f0;
}

.form-group > div {
  flex: 1;
  min-width: 150px;
}
</style>
