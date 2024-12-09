<template>
<div class="centro">
  <div class="centroColunas">
    <div class="coluna-lateral"></div>
    <div class="coluna-central">
      <div class="caixaPostagem">

        <input class="inputTitulo" placeholder="Título da notícia" v-model="inputTitulo">


        <label v-if="!imageUrl" for="image-upload" class="inputImagem">
          <i class="bi bi-cloud-upload-fill"></i> Escolher Imagem
        </label>


        <div v-if="imageUrl">
          <img :src="imageUrl" style="max-width: 50vh; cursor: pointer; max-height: 25vh;" @click="triggerFileInput">
          <input id="image-upload" type="file" accept="image/*" style="display: none;" @change="handleImageUpload" ref="fileInput"/>
        </div>
        <div v-else>
          <input id="image-upload" type="file" accept="image/*" style="display: none;" @change="handleImageUpload" ref="fileInput"/>
        </div>

        <textarea  class="inputDescricao" placeholder="Descrição da notícia" v-model="inputDescricao"></textarea>
        <button class="enviar" @click="cadastrar">CADASTRAR</button>
      </div>
    </div>
    <div class="coluna-lateral"></div>
  </div>
</div>
</template>
  
  <script>

  export default {
    name: 'CentroAddNoticia',
    data(){
      return {
        imageUrl: null,
        inputTitulo: '',
        inputDescricao: ''
      }
    },
    methods: {
      triggerFileInput() {
      this.$refs.fileInput.click();
      },
      handleImageUpload(event){
        const image = event.target.files[0]
        if(image){
          const reader = new FileReader()
          reader.onloadend = () => {
            this.imageUrl = reader.result;
          };
          reader.readAsDataURL(image);
        }
      },
      cadastrar(){
        if(this.imageUrl === null){
          this.imageUrl = '../assets/padrao.png'
        }
        const noticia = {
          titulo : this.inputTitulo,
          descricao: this.inputDescricao,
          image: this.imageUrl
        }

        let noticias = JSON.parse(localStorage.getItem('noticias')) || [];
        noticias.push(noticia);
        localStorage.setItem('noticias', JSON.stringify(noticias));

        this.inputTitulo =''
        this.inputDescricao = ''
        this.imageUrl = null
        this.$refs.fileInput.value = ''

        this.$router.push({ path: '/noticias' });
      }
    }
  }
  </script>
  
  <style scoped>

.enviar{
  width: 30%;
  height: 6vh;
  border-radius: 20vh;
  font-size: 100%;
  font-weight: 700;
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
  width: 77%;
  height: 4.5vh;
  border-radius: 2vh;
  padding-left: 2vh;
  padding-right: 2vh;
}

.inputImagem {
  width: 83%;
  height: 25vh;
  border: solid black 0.05vh;
  border-radius: 3vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.4vh;
  gap:1vh;
}

.inputDescricao {
  width: 80%;
  height: 15vh;
  border: solid black 0.05vh;
  border-radius: 3vh;
  padding-left: 2vh;
  resize: none;
}
  
  
  @media (max-width: 1000px) {

  }
  
  @media (max-width: 870px) {

  }
  
  @media (max-width: 768px){

  }
  
  </style>