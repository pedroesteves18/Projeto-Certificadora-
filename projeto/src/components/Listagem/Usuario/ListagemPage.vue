<template>
    <div class="ListagemPage">
      <MainHeader />
      <ListagemBody />
    </div>
  </template>
  
  <script>
  import MainHeader from '../../MainHeader.vue'
  import ListagemBody from './ListagemBody.vue'
  export default {
    name: 'ListagemPage',
    components: {
      MainHeader,
      ListagemBody
    }
  }
  </script>
  
  <style>
  body {
    margin: 0;
    padding-top: 14.3vh;
  }
  </style>