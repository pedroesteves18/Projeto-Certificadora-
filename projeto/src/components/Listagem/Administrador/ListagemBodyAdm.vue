<template>
  <div class="centro">
    <div class="centroColunas">
      <div class="coluna-lateral"></div>
      <div class="coluna-central">
        <span class="noticias" v-if="noticiaMostrar === null">
          <div class="noticia" v-for="(noticia, index) in noticias" :key="index">
            <div class="icones">
              <i class="lapis bi bi-pencil" @click="selecAtt(index)"></i>
              <i class="lixeira bi bi-trash" @click="confirmarRemocao(index)"> </i>
            </div>
            <h1>{{ noticia.titulo }}</h1>
            <img :src="getImageUrl(noticia.imagem)" class="imagem">
            <p>{{ noticia.descricao }}</p>
            <p>{{ noticia.conteudo }}</p>
          </div>
        </span>
        <div v-else class="caixaPostagem">
          <input :placeholder="titulo" v-model="inputTitulo" class="inputTitulo">
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
          <textarea class="inputConteudo" :placeholder="conteudo" v-model="inputConteudo"></textarea>
          <button class="enviar" @click="atualizar">ATUALIZAR</button>
        </div>
      </div>
      <div class="coluna-lateral"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'ListagemBodyAdm',
  setup() {
    const noticias = ref([]);
    const noticiaMostrar = ref(null);
    const inputTitulo = ref('');
    const inputDescricao = ref('');
    const inputConteudo = ref('');
    const imageUrl = ref(null);
    const fileInput = ref(null);
    const $router = useRouter();

    onMounted(async () => {
      try {
        const response = await axios.get('http://localhost:3000/noticias');
        noticias.value = response.data;
      } catch (error) {
        console.error('Erro ao carregar notícias:', error);
      }
    });

    const confirmarRemocao = (index) => {
      const confirmacao = confirm('Você realmente deseja excluir esta notícia?');
      if (confirmacao) {
        remover(index);
      }
    };

    const remover = async (index) => {
      try {
        const noticiaId = noticias.value[index]._id;
        await axios.delete(`http://localhost:3000/noticias/${noticiaId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        noticias.value.splice(index, 1);
      } catch (error) {
        console.error('Erro ao remover notícia:', error);
      }
    };

    const selecAtt = (index) => {
      noticiaMostrar.value = index;
      inputTitulo.value = noticias.value[index].titulo;
      inputDescricao.value = noticias.value[index].descricao;
      inputConteudo.value = noticias.value[index].conteudo;
      imageUrl.value = getImageUrl(noticias.value[index].imagem);
    };

    const atualizar = async () => {
      if (noticiaMostrar.value !== null) {
        const noticiaId = noticias.value[noticiaMostrar.value]._id;
        const formData = new FormData();
        formData.append('titulo', inputTitulo.value);
        formData.append('descricao', inputDescricao.value);
        formData.append('conteudo', inputConteudo.value);
        if (fileInput.value.files[0]) {
          formData.append('imagem', fileInput.value.files[0]);
        }

        try {
          const response = await axios.put(`http://localhost:3000/noticias/${noticiaId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          noticias.value[noticiaMostrar.value] = response.data;
        } catch (error) {
          console.error('Erro ao atualizar notícia:', error);
        }
      } else {
        const formData = new FormData();
        formData.append('titulo', inputTitulo.value);
        formData.append('descricao', inputDescricao.value);
        formData.append('conteudo', inputConteudo.value);
        formData.append('imagem', fileInput.value.files[0]);

        try {
          const response = await axios.post('http://localhost:3000/noticias', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          noticias.value.push(response.data);
        } catch (error) {
          console.error('Erro ao cadastrar notícia:', error);
        }
      }

      inputTitulo.value = '';
      inputDescricao.value = '';
      inputConteudo.value = '';
      imageUrl.value = null;
      fileInput.value = null;
      noticiaMostrar.value = null;

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

    const getImageUrl = (imagePath) => {
      return `http://localhost:3000/${imagePath}`;
    };

    return {
      noticias,
      confirmarRemocao,
      remover,
      selecAtt,
      atualizar,
      noticiaMostrar,
      inputTitulo,
      inputDescricao,
      inputConteudo,
      imageUrl,
      fileInput,
      handleImageUpload,
      getImageUrl,
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(135deg, #f1b4c3, #dd6482);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.centro {
  width: 100%;
  min-height: 100vh;
  height: auto;
  background: linear-gradient(135deg, #f1b4c3, #dd6482);
  display: flex;
  justify-content: center;
  align-items: center;
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
  display: flex;
  justify-content: center;
  align-items: center;
}

.caixaPostagem {
  width: 80%;
  height: auto;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 3vh;
  align-items: center;
  gap: 1vh;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.inputTitulo {
  width: 77%;
  height: 4.5vh;
  border-radius: 5px;
  padding-left: 2vh;
  padding-right: 2vh;
  border: 1px solid #ccc;
  font-family: 'Poppins', sans-serif;
}

.inputImagem {
  width: 83%;
  height: 25vh;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.4vh;
  gap: 1vh;
  cursor: pointer;
}

.inputDescricao, .inputConteudo {
  width: 80%;
  height: 15vh;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding-left: 2vh;
  resize: none;
  font-family: 'Poppins', sans-serif;
}

.enviar {
  width: 30%;
  height: 6vh;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 700;
  background-color: #dd6482;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.enviar:hover {
  background-color: #c04d6a;
  transform: translateY(-2px);
}

.enviar:active {
  background-color: #a83d56;
  transform: translateY(0);
}

.icones {
  height: 1.1vh;
  width: 100%;
  display: flex;
  margin-right: 10vh;
  justify-content: flex-end;
  gap: 1vh;
}

.icones i.lixeira {
  font-size: 3vh;
  cursor: pointer;
}

.icones i.lapis {
  font-size: 2.8vh;
  cursor: pointer;
}

.imagem {
  max-height: 34vh;
  width: auto;
  border-radius: 10px;
  margin-bottom: 1vh;
}

.noticia {
  width: 100%;
  height: auto;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 3vh;
  align-items: center;
  gap: 1vh;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.noticia:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.noticia h1 {
  font-size: 2.4vh;
  color: #333;
  margin-bottom: 1vh;
  font-family: 'Poppins', sans-serif;
}

.noticia p {
  font-size: 1.8vh;
  color: #666;
  text-align: center;
  font-family: 'Poppins', sans-serif;
}

.noticias {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3vh;
}

@media (max-width: 768px) {
  .coluna-lateral {
    display: none;
  }

  .coluna-central {
    width: 100%;
  }

  .noticia h1 {
    font-size: 2vh;
  }

  .noticia p {
    font-size: 1.6vh;
  }
}
</style>