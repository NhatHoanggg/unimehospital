<template>
  <div>
    <h1>Quản lý khoa</h1>
    <DepartmentListComponent @department-selected="handleDepartmentSelected" />
    <h1>Quản lý dịch vụ</h1>
    <DoctorServiceListComponent :serviceId="serviceid" @service-selected="handleServiceSelected"/>
  </div>
</template>

<script>
import DepartmentListComponent from "./DepartmentListComponent.vue";
import DoctorServiceListComponent from "./DoctorServiceListComponent.vue";

export default {
  name: "ParentComponent",
  data() {
    return {
      serviceid: 3,
    };
  },
  components: { DepartmentListComponent, DoctorServiceListComponent },
  methods: {
    handleDepartmentSelected(payload) {
      console.log("received payload:", payload.department.value);
    },

    handleServiceSelected(payload) {
      console.log("received service:", payload.service.value);
    },
  },
};
</script>
