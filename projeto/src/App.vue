<template>
  <div class="app">
    <MainHeader />
    <CentroAddNoticia />
  </div>
</template>

<script>
import MainHeader from './components/MainHeader.vue'
import CentroAddNoticia from './components/CentroAddNoticia.vue'
export default {
  name: 'App',
  components: {
    MainHeader,
    CentroAddNoticia
  }
}
</script>

<style>
body {
  margin: 0;
  padding-top: 130px;
}
</style>
