<template>
    <div class="ListagemPage">
      <MainHeader />
      <ListagemBodyAdm />
    </div>
  </template>
  
  <script>
  import MainHeader from '../../MainHeader.vue'
  import ListagemBodyAdm from './ListagemBodyAdm.vue'
  export default {
    name: 'ListagemPage',
    components: {
      MainHeader,
      ListagemBodyAdm
    }
  }
  </script>
  
  <style>
  body {
    margin: 0;
    padding-top: 14.3vh;
  }
  </style>