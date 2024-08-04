<template>
  <div v-if="prop.showLoading" class="loading">
    <img src="../public/pic/loading.gif" alt="loading"/>
  </div>
</template>

<script setup>
const prop = defineProps({
  showLoading:{
    type: Boolean,
    required: true
  }
})
</script>

<style scoped>
.loading{
  display: flex;
  justify-content: center;
  padding: 50px;
}
</style>
