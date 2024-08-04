<template>
  <Wrapper>
    <Loading :show-loading="showLoading"/>
    <div v-if="!showLoading" class="person">
      <img :src="person.image" alt="person">
      <div class="information">
        <p>Имя: {{person.name}}</p>
        <p>Гендер: {{person.gender}}</p>
        <p>Локация: {{person.location.name}}</p>
        <p>Статус: {{person.status !== 'unknown' ? person.status : "неизвестно"}}</p>
        <p>Вид: {{person.species}}</p>
        <p>Тип: {{person.type ? person.type : "неизвестно"}}</p>
        <p>Происхождение: {{person.origin.url ? person.origin.name : "неизвестно"}}</p>
      </div>
    </div>
  </Wrapper>
</template>

<script setup>
import { useRoute } from 'vue-router'
import axios from "axios";
import {ref} from "vue";
import Wrapper from "../helpers/Wrapper.vue";
import Loading from "../components/Loading.vue";

const route = useRoute()
const idPerson = route.params.id
// const page = Math.floor(idPerson/20) ?  Math.floor(idPerson/20) : 1;
const showLoading = ref(true);
const person = ref(null);

async function getPerson(){
  try{
    const res = await axios.get('/character/' + idPerson);
    showLoading.value = false;
    person.value = res.data;
  }
  catch (err){
    console.error("Ошибка: ", err);
  }
}

getPerson()


</script>

<style lang="scss" scoped>
.person{
  display: flex;
  gap: 30px;
  padding: 20px;
  border: 4px solid #9dec5b;
  border-radius: 20px;
  color: #9dec5b;

  img{
    border-radius: 20px;
    width: 50%;
  }

}
.information p{
  margin-bottom: 10px;
}
.wrapper{
  padding-bottom: 500px;
}

@media screen and (max-width: 650px) {
  .person{
    flex-direction: column;
  }
}
</style>
