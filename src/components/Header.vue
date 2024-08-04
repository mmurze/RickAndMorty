<template>
  <Wrapper>
    <div class="standard_format">
      <img src="../public/pic/label.svg" alt="label">
      <nav class="menu">
        <router-link class="nav_link" :to="{name: 'characters'}">
          Персонажи
        </router-link>
<!--        <button class="nav_link">-->
<!--          Персонажи-->
<!--        </button>-->
        <router-link class="nav_link" :to="{name: 'locations'}">
          Локации
        </router-link>
      </nav>
    </div>
  </Wrapper>
</template>

<script setup>
import Wrapper from "../helpers/Wrapper.vue";
</script>

<style lang="scss" scoped>

.standard_format{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-top: 20px;
  margin-bottom: 40px;
  img{
    max-width: 700px;
    width: 100%;
  }
}

.menu{
  display: flex;
  gap: 50px;
}

.nav_link{
  color: #35dde1;
  font-size: 35px;
}

@media screen and (max-width: 550px)  {
  .standard_format{
    margin-bottom: 10px;
  }
  .nav_link{
    font-size: 25px;
  }
  .menu{
    flex-direction: column;
    gap: 15px;
  }
}

</style>
