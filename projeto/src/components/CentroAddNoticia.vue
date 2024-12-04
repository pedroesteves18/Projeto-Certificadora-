<template>
<div class="centro">
  <div class="centroColunas">
    <div class="coluna-lateral"></div>
    <div class="coluna-central">
      <div class="caixaPostagem">

        <input class="inputTitulo" placeholder="Título da notícia">


        <label for="image-upload" class="inputImagem">
          <i class="bi bi-cloud-upload-fill"></i> Escolher Imagem
        </label>
        <input id="image-upload" type="file" accept="image/*" style="display: none;" />


        <textarea  class="inputDescricao" placeholder="Descrição da notícia"></textarea>
      </div>
    </div>
    <div class="coluna-lateral"></div>
  </div>
</div>
</template>
  
  <script>
  export default {
    name: 'CentroAddNoticia'
  }
  </script>
  
  <style scoped>


.btn {

}

.centro {
    width: 100%;  
    height: 85vh;
}
.centroColunas {
  width: 100%;
  height: 85.5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.coluna-lateral {
  width: 25%; 
  height: 85.5vh;
  background: linear-gradient(#F1B4C3,#dd6482);
}

.coluna-central {
  width: 50%;
  height: 85.5vh;
  background: linear-gradient(#F1B4C3,#dd6482);
  display: flex;
  justify-content: center;
  align-items: center
}

.caixaPostagem {
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

.inputTitulo {
  width: 80%;
  height: 4.5vh;
  border-radius: 2vh;
  padding-left: 2vh;
  padding-right: 2vh;
}

.inputImagem {
  width: 80%;
  height: 25vh;
  border: solid black 0.05vh;
  border-radius: 3vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5vh;
}

.inputDescricao {
  width: 80%;
  height: 15vh;
  border-radius: 3vh;
  padding-left: 2vh;
  resize: vertical;
}
  
  
  @media (max-width: 1000px) {

  }
  
  @media (max-width: 870px) {

  }
  
  @media (max-width: 768px){

  }
  
  </style>