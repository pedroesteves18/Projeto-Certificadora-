<template>
    <div class="centro">
    <div class="centroColunas">
        <div class="coluna-lateral"></div>
        <div class="coluna-central">
          <div class="noticia" v-for="(noticia, index) in noticias" :key="index">
            <h1>{{ noticia.titulo }}</h1>
            <img :src="noticia.image" class="imagem">
            <p>{{ noticia.descricao }}</p>
          </div>
        </div>
        <div class="coluna-lateral"></div>
    </div>
    </div>
</template>
  
  <script>
import { ref, onMounted } from 'vue';

  export default {
  name: 'ListagemBody',
    setup() {
      const noticias = ref([]);

      onMounted(() => {
        const storedNoticias = JSON.parse(localStorage.getItem('noticias')) || [];
        noticias.value = storedNoticias;
      });
      return {
        noticias
      }
    }
};
  </script>
  
  <style>
    .imagem {
      max-width: 83%;
    }
    .centro {
        padding-top: 2vh;
        width: 100%;  
        min-height: 85.7vh;
        height: auto;
        background: linear-gradient(#F1B4C3,#dd6482);
        background-attachment: fixed;

    }
    .centroColunas {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    }

    .coluna-lateral {
      width: 25%; 
      height: auto;
      
    }

    .coluna-central {
      width: 50%;
      height: auto;
      background: linear-gradient(#F1B4C3,#dd6482);
      background-attachment: fixed;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2vh;
      flex-direction: column
    }

    .noticia {
    width: 80%;
    height: 60vh;
    background-color: white;
    border-radius: 5vh;
    display: flex;
    flex-direction: column;
    padding: 3vh;
    align-items: center;
    gap: 1vh;
    }
  </style>