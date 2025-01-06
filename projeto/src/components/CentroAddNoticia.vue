<template>
  <div class="centro">
    <div class="centroColunas">
      <div class="coluna-lateral"></div>
      <div class="coluna-central">
        <div class="caixaPostagem">
          <input class="inputTitulo" placeholder="Título da notícia" v-model="inputTitulo" />

          <label v-if="!imageUrl" for="image-upload" class="inputImagem">
            <i class="bi bi-cloud-upload-fill"></i> Escolher Imagem
          </label>

          <div v-if="imageUrl">
            <img :src="imageUrl" class="imagem-preview" @click="triggerFileInput" />
            <input id="image-upload" type="file" accept="image/*" style="display: none;" @change="handleImageUpload" ref="fileInput" />
          </div>
          <div v-else>
            <input id="image-upload" type="file" accept="image/*" style="display: none;" @change="handleImageUpload" ref="fileInput" />
          </div>

          <textarea class="inputDescricao" placeholder="Descrição da notícia" v-model="inputDescricao"></textarea>
          <button class="enviar" @click="cadastrar">CADASTRAR</button>
        </div>
      </div>
      <div class="coluna-lateral"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CentroAddNoticia',
  data() {
    return {
      id: null,
      imageUrl: null,
      inputTitulo: '',
      inputDescricao: '',
      selectedFile: null
    };
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleImageUpload(event) {
      const image = event.target.files[0];
      if (image) {
        console.log('Imagem selecionada:', image);
        this.selectedFile = image;
        const reader = new FileReader();
        reader.onloadend = () => {
          this.imageUrl = reader.result;
        };
        reader.readAsDataURL(image);
      }
    },
    async cadastrar() {
      if (!this.inputTitulo || !this.inputDescricao || !this.selectedFile) {
        alert('Por favor, preencha todos os campos e selecione uma imagem.');
        return;
      }

      const formData = new FormData();
      formData.append('titulo', this.inputTitulo);
      formData.append('conteudo', this.inputDescricao);
      formData.append('imagem', this.selectedFile);

      console.log('Dados do formulário:', formData.get('titulo'), formData.get('conteudo'), formData.get('imagem'));

      try {
        const response = await axios.post('http://localhost:3001/noticias/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('Notícia cadastrada com sucesso:', response.data);
        this.$router.push('/noticias');
      } catch (error) {
        console.error('Erro ao cadastrar notícia:', error.response ? error.response.data : error.message);
        alert('Erro ao cadastrar notícia: ' + (error.response ? error.response.data.error : error.message));
      }
    }
  }
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

.centro {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f1b4c3, #dd6482);
}

.centroColunas {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.coluna-lateral {
  width: 25%;
  height: 100%;
}

.coluna-central {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.caixaPostagem {
  width: 80%;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 3vh;
  align-items: center;
  gap: 2vh;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.inputTitulo, .inputDescricao {
  width: 90%;
  padding: 1vh;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
}

.inputImagem {
  width: 90%;
  height: 25vh;
  border: 1px dashed #ccc;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  color: #aaa;
  cursor: pointer;
}

.imagem-preview {
  max-width: 100%;
  max-height: 25vh;
  border-radius: 5px;
  cursor: pointer;
}

.enviar {
  width: 50%;
  padding: 1vh;
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

@media (max-width: 1000px) {
  .coluna-lateral {
    display: none;
  }

  .coluna-central {
    width: 100%;
  }

  .caixaPostagem {
    width: 90%;
  }
}

@media (max-width: 768px) {
  .inputTitulo, .inputDescricao {
    font-size: 0.9rem;
  }

  .inputImagem {
    font-size: 1rem;
  }

  .enviar {
    font-size: 0.9rem;
  }
}
</style>