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


        <input class="inputDescricao" placeholder="Descrição da notícia">
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
  height: ;
}

.centro {
    width: 100%;  
    height: 770px;
}
.centroColunas {
  width: 100%;
  height: 768px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.coluna-lateral {
  width: 25%; 
  height: 100%;
  background: linear-gradient(#F1B4C3,#dd6482);
}

.coluna-central {
  width: 50%;
  height: 100%;
  background: linear-gradient(#F1B4C3,#dd6482);
  display: flex;
  justify-content: center;
  align-items: center
}

.caixaPostagem {
  width: 80%;
  height: 40rem;
  background-color: white;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  align-items: center;
  gap: 10px;
}

.inputTitulo {
  width: 80%;
  height: 3rem;
  border-radius: 20px;
  padding-left: 20px;
  padding-right: 20px;
}

.inputImagem {
  padding-top: 120px;
  padding-left: 170px;
  width: 80%;
  height: 17rem;
  border: solid black 0.5px;
  border-radius: 20px;
}

.inputDescricao {
  width: 80%;
  height: 10rem;
}
  
  
  @media (max-width: 1000px) {

  }
  
  @media (max-width: 870px) {

  }
  
  @media (max-width: 768px){

  }
  
  </style>