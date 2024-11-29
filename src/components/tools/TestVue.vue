<template>
  <div>
    <h1>SLIDER</h1>
    <SliderSection/>
    <h1>Quản lý khoa</h1>
    <DepartmentListComponent @department-selected="handleDepartmentSelected" />
    <h1>Quản lý dịch vụ</h1>
    <DoctorServiceListComponent :serviceId="serviceid" @service-selected="handleServiceSelected"/>
    <h1>LOADING</h1>
    <LoadingComponent/>
    
  </div>
</template>

<script>
import DepartmentListComponent from "./DepartmentListComponent.vue";
import DoctorServiceListComponent from "./DoctorServiceListComponent.vue";
import LoadingComponent from "./LoadingComponent.vue";
import SliderSection from "./SliderSection.vue";

export default {
  name: "ParentComponent",
  data() {
    return {
      serviceid: 3,
    };
  },
  components: { DepartmentListComponent, DoctorServiceListComponent, LoadingComponent, SliderSection },
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
