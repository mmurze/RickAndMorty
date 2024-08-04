<template>
  <Wrapper>
    <Loading :show-loading="showLoading"/>
<!--    <div v-if="showLoading" class="loading">-->
<!--      <img src="../public/pic/loading.gif"/>-->
<!--    </div>-->
    <ul v-show="!showLoading" class="characters_container">
      <li
          v-for="(character, index) in characters"
          :key="character.id"
          class="character"
      >
        <div
            class="border_character"
            @click="toPerson(character.id)"
        >
          <img
              :src="character.image"
              alt="image"
              class="image_character"
              @load="isLoad(index)"
          >
          <div class="name_character">
            {{character.name}}
          </div>
        </div>
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

const characters = ref(null);
const totalPage = ref(1);
const currentPage = ref(1);
const showLoading = ref(true);
const isLoadImage = ref([]);
const flagLoadingImage = ref(0);

async function getCharacters(page){
  try{
    const res = await axios.get('/character', {params: {page: page}})
    console.log(res.data);
    characters.value = res.data.results;
    isLoadImage.value = Array(characters.value.length).fill(false)
    totalPage.value = res.data.info.pages;
  }
  catch (err){
    console.error("Ошибка: ", err);
  }
}

getCharacters(1);

function changeCurrentPage(n){
  currentPage.value = n
  flagLoadingImage.value = 0
  showLoading.value = true

  getCharacters(n)
  isLoadImage.value = Array(characters.value.length).fill(false)
}

function isLoad(index){
  isLoadImage.value[index] = true
  flagLoadingImage.value += 1;

  if (flagLoadingImage.value === characters.value.length)
    showLoading.value = false
}

function toPerson(id){
  router.push({name: 'person', params: {id: id}})
}

</script>

<style lang="scss" scoped>
.characters_container{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
  justify-content: center;
}

.character{
  margin: auto;
}

.border_character{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border: 4px solid #9dec5b;
  border-radius: 20px;
}

.image_character{
  border-radius: 20px;
}

.name_character{
  color: #9dec5b;
  font-size: 20px;
}
.loading{
  padding-bottom: 1000px;
}

</style>
