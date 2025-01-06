<template>
    <button class="editar-noticias-button" @click="goToEditarNoticias">Editar Notícias</button>
  </template>
  
  <script>
  export default {
    name: 'EditarNoticiasButton',
    methods: {
      goToEditarNoticias() {
        this.$router.push('/adm/listagem');
      }
    }
  }
  </script>
  
  <style scoped>
  .editar-noticias-button {
    background-color: #2196F3;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
  }
  
  .editar-noticias-button:hover {
    background-color: #1e88e5;
    transform: translateY(-2px);
  }
  
  .editar-noticias-button:active {
    background-color: #1976d2;
    transform: translateY(0);
  }
  </style>