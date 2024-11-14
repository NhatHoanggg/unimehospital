<template>
  <div>
    <h1>Multi-Select Dropdown with Vue-Multiselect</h1>
    <multiselect
      v-model="selectedOptions"
      :options="options"
      :multiple="true"
      :close-on-select="false"
      :clear-on-select="false"
      placeholder="Select options"
      label="label"
      track-by="value"
    />
    <div class="selected-items">
      <p>Các lựa chọn đã chọn:</p>
      <ul>
        <li v-for="option in selectedOptions" :key="option.value">{{ option.label }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";

export default {
  components: { Multiselect },
  data() {
    return {
      selectedOptions: [],
      options: [
        { label: "Mark McCoy", value: "Mark McCoy" },
        { label: "Andrew Marsh", value: "Andrew Marsh" },
        { label: "Edna Alexander", value: "Edna Alexander" },
        { label: "Roger Guerrero", value: "Roger Guerrero" },
        { label: "Angel Wolfe", value: "Angel Wolfe" },
        { label: "Hattie Copeland", value: "Hattie Copeland" },
        { label: "Francis Black", value: "Francis Black" },
        { label: "Jeffery Waters", value: "Jeffery Waters" },
        { label: "Tony Johnson", value: "Tony Johnson" },
        { label: "Alan Rice", value: "Alan Rice" },
        { label: "Lucas Nash", value: "Lucas Nash" },
        { label: "Nathan Aguilar", value: "Nathan Aguilar" },
      ]
    };
  }
};
</script>

<style scoped>
.selected-items {
  margin-top: 16px;
}
</style>
