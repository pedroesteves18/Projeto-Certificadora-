<template>
    <div class="CadastroPage">
      <MainHeader />
      <CentroAddNoticia />
    </div>
  </template>
  
  <script>
  import MainHeader from '../MainHeader.vue'
  import CentroAddNoticia from '../CentroAddNoticia.vue'
  export default {
    name: 'CadastroPage',
    components: {
      MainHeader,
      CentroAddNoticia
    }
  }
  </script>
  
  <style>
  body {
    margin: 0;
    padding-top: 14.3vh;
  }
  </style>
  