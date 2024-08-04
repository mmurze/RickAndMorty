<template>
  <Wrapper>

  </Wrapper>
</template>

<script setup>
import Wrapper from "../helpers/Wrapper.vue";
import axios from "axios";
import {ref} from "vue";

const characters = ref([])

axios
    .get('/character')
    .then(r => characters.value = r.data )
    .catch(err => console.error("Ошибка: ", err))



</script>

<style scoped>

</style>
