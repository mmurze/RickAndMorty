<template>
  <Wrapper>
    <Loading :show-loading="showLoading"/>
    <div v-if="!showLoading" class="location">
      <div class="information">
        <p>Название: {{location.name}}</p>
        <p>Тип: {{location.type}}</p>
        <p>Измерение: {{location.dimension}}</p>
        <p class="data">Дата создания: {{showDate(location.created)}}</p>
      </div>
      <div class="residents">
        <p class="name">Резиденты:</p>
        <ul>
          <li
              v-for="(resident, index) in residents"
              :key="index"
              @click="toPerson(resident.id)"
          >
            {{ resident.name }}
          </li>
        </ul>
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
import router from "../plugins/router.js";

const route = useRoute()
const idLocation = route.params.id
// const page = Math.floor(idLocation/20) ?  Math.floor(idLocation/20) : 1;
const showLoading = ref(true);
const location = ref(null);
const residents = ref([])

async function getPerson(){
  try{
    const res = await axios.get('/location/' + idLocation);
    showLoading.value = false;
    location.value = res.data;
    for(let i = 0; i < location.value.residents.length; i += 1){
      const idPerson = getId(location.value.residents[i])
      const resolve = await axios.get('/character/' + idPerson)
      residents.value.push({name: resolve.data.name, id: resolve.data.id})
    }
  }
  catch (err){
    console.error("Ошибка: ", err);
  }
}

getPerson()

function showDate(date){
  const newDate = new Date(date)
  return (newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate())
      + "." + (newDate.getMonth() < 10 ? "0" + newDate.getMonth() : newDate.getMonth())
      + "." + newDate.getFullYear()
}

function getId(url){
  const newUrl = new URL(url);
  const pathname = newUrl.pathname;
  const parts = pathname.split('/');
  return parts.pop()
}

function toPerson(id){
  router.push({name: 'person', params: {id: id}})
}

</script>

<style lang="scss" scoped>

.location{
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
  .location{
    flex-direction: column;
  }
}

</style>
