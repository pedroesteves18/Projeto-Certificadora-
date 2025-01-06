<template>
    <button class="criar-noticia-button" @click="goToCriarNoticia">Criar Notícia</button>
  </template>
  
  <script>
  export default {
    name: 'CriarNoticiaButton',
    methods: {
      goToCriarNoticia() {
        this.$router.push('/adm/cadastro');
      }
    }
  }
  </script>
  
  <style scoped>
  .criar-noticia-button {
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
  }
  
  .criar-noticia-button:hover {
    background-color: #45a049;
    transform: translateY(-2px);
  }
  
  .criar-noticia-button:active {
    background-color: #3e8e41;
    transform: translateY(0);
  }
  </style>