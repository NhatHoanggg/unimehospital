<template>
  <div class="spinner-2"></div>
</template>

<script>
export default {};
</script>

<style scoped>
.spinner-2 {
  width: 100px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 20px solid lightblue;
  border-right-color: #3b82f6;
  animation: s2 1s infinite linear;
}
@keyframes s2 {
  to {
    transform: rotate(1turn);
  }
}
</style>
