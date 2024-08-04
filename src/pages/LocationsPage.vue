<template>
  <Wrapper>
    <Loading :show-loading="showLoading"/>
    <ul v-show="!showLoading" class="locations_container">
      <li class="location border-none">
        <p class="name">Название:</p>
        <p class="data">Дата создания:</p>
      </li>
      <li
          v-for="location in locations"
          :key="location.id"
          class="location"
          @click="toLocation(location.id)"
      >
        <p class="name">{{location.name}}</p>
        <p class="data">{{showDate(location.created)}}</p>
      </li>
    </ul>
    <Pagination
        v-show="!showLoading"
        :current-page="currentPage"
        :total-pages="totalPage"
        @changeCurrentPage="changeCurrentPage"
    />
  </Wrapper>
</template>

<script setup>
import Wrapper from "../helpers/Wrapper.vue";
import axios from "axios";
import {ref} from "vue";
import Pagination from "../components/Pagination.vue";
import router from "../plugins/router.js";
import Loading from "../components/Loading.vue";

const locations = ref(null);
const totalPage = ref(1);
const currentPage = ref(1);
const showLoading = ref(true);

async function getLocations(page){
  try{
    const res = await axios.get('/location', {params: {page: page}})
    showLoading.value = false
    locations.value = res.data.results;
    totalPage.value = res.data.info.pages;
  }
  catch (err){
    console.error("Ошибка: ", err);
  }
}

getLocations(1);

function changeCurrentPage(n){
  currentPage.value = n
  showLoading.value = true

  getLocations(n)
}

function showDate(date){
  const newDate = new Date(date)
  return (newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate())
      + "." + (newDate.getMonth() < 10 ? "0" + newDate.getMonth() : newDate.getMonth())
      + "." + newDate.getFullYear()
}

function toLocation(id){
  router.push({name: 'location', params: {id: id}})
}
</script>

<style lang="scss" scoped>
.locations_container{
  color: #9dec5b;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.location{
  display: flex;
  cursor: pointer;
  align-items: center;
  gap: 10px;
  padding: 20px;
  border: 4px solid #9dec5b;
  border-radius: 20px;
  .name{
    width: 60%;
  }
}
.border-none{
  cursor: default;
  border: none;
  padding: 10px 20px;
}
.loading{
  padding-bottom: 500px;
}
</style>
