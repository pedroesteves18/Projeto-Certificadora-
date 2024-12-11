<template>
    <div class="centro">
    <div class="centroColunas">
        <div class="coluna-lateral"></div>
        <div class="coluna-central">

          <span class="noticias" v-if="noticiaMostrar === null">
            <div class="noticia" v-for="(noticia, index) in noticias" :key="index">
                <div class="icones">
                <i class="lapis bi bi-pencil" @click="selecAtt(index)"></i>
                <i class="lixeira bi bi-trash" @click="remover(index)"> </i>
              </div>
              <h1>{{ noticia.titulo }}</h1>
              <img :src="noticia.image" class="imagem">
              <p>{{ noticia.descricao }}</p>

            </div>
          </span>


          <div v-else class="caixaPostagem">

              <input :placeholder= this.titulo v-model="inputTitulo" class="inputTitulo">


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
              <input id="image-upload" type="file" accept="image/*" style="display: none;" @change="handleImageUpload" ref="fileInput"/>


              <textarea  class="inputDescricao" :placeholder= this.descricao v-model="inputDescricao"></textarea>
              <button class="enviar" @click="atualizar">ATUALIZAR</button>
          </div>

        </div>
        <div class="coluna-lateral"></div>
    </div>
    </div>
</template>
  
<script>
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';

    export default {
      name: 'ListagemBodyAdm',
      setup() {
        const noticias = ref([]);
        const noticiaMostrar = ref(null);
        const inputTitulo = ref('');
        const inputDescricao = ref('');
        const imageUrl = ref(null);
        const fileInput = ref(null); 
        const $router = useRouter();  

        onMounted(() => {
          const storedNoticias = JSON.parse(localStorage.getItem('noticias')) || [];
          noticias.value = storedNoticias;
        });


        const remover = (index) => {
          noticias.value.splice(index, 1);
          localStorage.setItem('noticias', JSON.stringify(noticias.value));
        };


        const selecAtt = (index) => {
          noticiaMostrar.value = index;
          inputTitulo.value = noticias.value[index].titulo;
          inputDescricao.value = noticias.value[index].descricao;
          imageUrl.value = noticias.value[index].image;
        };


        const atualizar = () => {
          if (noticiaMostrar.value !== null) {

            noticias.value[noticiaMostrar.value] = {
              ...noticias.value[noticiaMostrar.value],
              titulo: inputTitulo.value,
              descricao: inputDescricao.value,
              image: imageUrl.value,
            };
          } else {

            const noticia = {
              titulo: inputTitulo.value,
              descricao: inputDescricao.value,
              image: imageUrl.value,
            };
            noticias.value.push(noticia);
          }


          localStorage.setItem('noticias', JSON.stringify(noticias.value));


          inputTitulo.value = '';
          inputDescricao.value = '';
          imageUrl.value = null;
          fileInput.value = null;  
          
          $router.push({ path: '/noticias' });
        };
        const handleImageUpload = (event) => {
          const image = event.target.files[0];
          if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
              imageUrl.value = reader.result;
            };
            reader.readAsDataURL(image);
          }
        };

        return {
          noticias,
          remover,
          selecAtt,
          atualizar,
          noticiaMostrar,
          inputTitulo,
          inputDescricao,
          imageUrl,
          fileInput, 
          handleImageUpload,
        };
      },
    };
</script>
  
  <style>

    .enviar{
      width: 30%;
      height: 6vh;
      border-radius: 20vh;
      font-size: 100%;
      font-weight: 700;
    }

    .caixaPostagem {
      margin-top: 0.3vh;
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
    .icones {
      height: 1.1vh;
      width: 100%;
      display: flex;
      margin-right: 10vh;
      justify-content: flex-end;
      gap: 1vh
    }
    .icones i.lixeira {
      font-size: 3vh;
      cursor: pointer;
    }
    .icones i.lapis{
      font-size: 2.8vh;
      cursor: pointer;
    }
    .imagem {
      max-height: 34vh;
    }
    .centro {
        padding-top: 2vh;
        width: 100%;  
        min-height: 83.7vh;
        height: auto;
        background: linear-gradient(#F1B4C3,#dd6482);
        background-attachment: fixed;

    }

    .inputTitulo {
      width: 77%;
      height: 4.5vh;
      border-radius: 2vh;
      padding-left: 2vh;
      padding-right: 2vh;
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
      width: 100%;
      height: 60vh;
      background-color: white;
      border-radius: 5vh;
      display: flex;
      flex-direction: column;
      padding: 3vh;
      align-items: center;
    }
    .noticias {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3vh;
    }
    .inputDescricao {
      width: 80%;
      height: 15vh;
      border: solid black 0.05vh;
      border-radius: 3vh;
      padding-left: 2vh;
      resize: none;
    }
  </style>