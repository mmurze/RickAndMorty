<template>
  <div class="pagination_container">
    <button
        :disabled="isFirstPage"
        :class="{disabled: isFirstPage}"
        @click="onFirstPage"
    >
      <img
          src="../public/pic/double-chevron-left.svg"
          width="24px"
          height="24px"
          alt="chevron"
      >
    </button>
    <button
        :disabled="isFirstPage"
        :class="{disabled: isFirstPage}"
        @click="onPrevPage"
    >
      <img
          src="../public/pic/chevron-left.svg"
          width="24px"
          height="24px"
          alt="chevron"
      >
    </button>
    <ul>
      <li
          v-for="page in showPages"
          :key="page.name"
          :class="{active: page.name === currentPage}"
          @click="onPage(page.name)"
      >
        {{ page.name }}
      </li>
    </ul>
    <button
        :disabled="isLastPage"
        :class="{disabled: isLastPage}"
        @click="onNextPage"
    >
      <img
          src="../public/pic/chevron-right.svg"
          width="24px"
          height="24px"
          alt="chevron"
      >
    </button>
    <button
        :disabled="isLastPage"
        :class="{disabled: isLastPage}"
        @click="onLastPage">
      <img
          src="../public/pic/double-chevron-right.svg"
          width="24px"
          height="24px"
          alt="chevron"
      >
    </button>
  </div>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
  totalPages:{
    type: Number,
    required: true
  },
  currentPage:{
    type: Number,
    required: true
  }
})

const emits = defineEmits(['changeCurrentPage'])

const startPage = computed(() => {
  if(props.currentPage === 1)
    return 1;
  else if(props.currentPage === props.totalPages)
    return props.totalPages - 2;

  return props.currentPage - 1;
})

const endPage = computed(() => Math.min(startPage.value + 2, props.totalPages));

const showPages = computed(() => {
  const pages = [];

  for(let i = startPage.value; i <= endPage.value; i+=1){
    pages.push({
      name: i,
      isDisabled: i === props.currentPage
    })
  }

  return pages
})

const isFirstPage = computed(() => props.currentPage === 1)
const isLastPage = computed(() => props.currentPage === props.totalPages)

function onFirstPage(){
  emits('changeCurrentPage', 1)
}
function onPrevPage(){
  emits('changeCurrentPage', props.currentPage - 1)
}
function onNextPage(){
  emits('changeCurrentPage', props.currentPage + 1)
}
function onLastPage(){
  emits('changeCurrentPage', props.totalPages)
}
function onPage(n){
  emits('changeCurrentPage', n)
}

</script>

<style lang="scss" scoped>
.pagination_container{
  display: flex;
  gap: 10px;
  color: #00bcd4;
  margin: 20px auto;
  width: fit-content;

  button{
    border: 3px solid #00bcd4;
    border-radius: 8px;
    padding: 5px;
    &.disabled{
      border: 2px solid #01525d;
      color: #01525d;
    }
  }

  ul{
    display: flex;
    align-items: center;
    gap: 10px;
    li{
      padding: 5px 15px;
      cursor: pointer;
      &.active{
        color: #00bcd4;
        font-size: 23px;
        border: 2px solid #00bcd4;
        border-radius: 8px;
      }
    }
  }
}

@media screen and (max-width: 550px){
  .pagination_container ul li{
    padding: 5px 7px;
  }
  .pagination_container{
    padding-bottom: 30px;
  }
}
</style>
