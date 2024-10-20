<template>
  <div class="hospital">
    <img
      src="@/assets/background-2.jpg"
      alt="hospital"
      class="hospital-image"
    />
    <div class="search-bar">
      <input type="text" placeholder="Tìm kiếm bác sĩ hoặc dịch vụ..." />
      <button>Tìm kiếm</button>
    </div>
  </div>

  <div class="appointment-page">
    <div class="tabs">
      <button
        :class="{ active: currentTab === 'doctor' }"
        @click="goToDoctors"
      >
        Bác sĩ
      </button>
      <button
        :class="{ active: currentTab === 'service' }"
        @click="goToServices"
      >
        Dịch vụ
      </button>
    </div>

    <div class="tab-content">
      <BookDoctor v-if="currentTab === 'doctor'" />
      <BookService v-if="currentTab === 'service'" />
      <BookSpecialty v-if="currentTab === 'specialty'" />
    </div>
  </div>
</template>

<script>
import BookDoctor from "@/components/BookDoctor.vue";
import BookService from "@/components/BookService.vue";

export default {
  data() {
    return {
      currentTab: "doctor",
    };
  },
  components: {
    BookDoctor,
    BookService,
  },
  methods: {
    goToDoctors() {
      this.currentTab = 'doctor';
      this.$router.push('/booking/doctors');
    },
    goToServices() {
      this.currentTab = 'service';
      this.$router.push('/booking/services');
    }
  }
};
</script>

<style scoped>
.appointment-page {
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px;
}
.hospital {
  position: relative;
  text-align: center;
}

.hospital-image {
  width: 1440px;
  height: 400px;
  object-fit: cover;
}

.search-bar {
  position: absolute;
  top: 80%; 
  left: 50%; 
  transform: translate(-50%, -50%); 
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-bar input {
  padding: 10px;
  font-size: 16px;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
  outline: none;
}

.search-bar button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #002d72;
  color: white;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
}

.search-bar button:hover {
  background-color: #0056b3;
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.tabs button {
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  background-color: #f0f0f0;
}

.tabs button.active {
  background-color: #002d72;
  color: #fff;
}

.tab-content {
  margin-top: 20px;
}
</style>
