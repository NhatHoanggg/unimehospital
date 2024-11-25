<template>
  <div>
    <h1>Quản lý khoa</h1>
    <DepartmentListComponent @department-selected="handleDepartmentSelected" />
  </div>
</template>

<script>
import DepartmentListComponent from "./DepartmentListComponent.vue";

export default {
  name: "ParentComponent",
  components: { DepartmentListComponent },
  methods: {
    handleDepartmentSelected(payload) {
      console.log("received payload:", payload.department.value);
    },
  },
};
</script>
