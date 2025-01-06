<template>
  <div class="centro">
    <div class="botoes-container">
      <CriarNoticiaButton v-if="isLoggedIn" />
      <EditarNoticiasButton v-if="isLoggedIn" />
      <LoginButton v-if="!isLoggedIn" />
      <ButtonLogout v-if="isLoggedIn" />
    </div>
    <div class="centroColunas">
      <div class="coluna-lateral"></div>
      <div class="coluna-central">
        <span class="noticias" v-if="noticiaMostrar === null">
          <div class="noticia" v-for="(noticia, index) in noticias" :key="index">
            <div class="icones">
              <i :class="['bi', 'bi-hand-thumbs-up', { 'liked': noticia.liked }]" @click.stop="toggleLike(index)"></i>
              <span>{{ noticia.likes }}</span>
              <i class="bi bi-star" @click.stop="abrirModalAvaliacao(index)"></i>
              <span>{{ calcularMediaAvaliacao(noticia.avaliacoes) }}</span>
            </div>
            <h1 @click="expandirNoticia(index)">{{ noticia.titulo }}</h1>
            <img @click="expandirNoticia(index)" :src="getImageUrl(noticia.imagem)" class="imagem">
            <p @click="expandirNoticia(index)">{{ noticia.conteudo && noticia.conteudo.length > 100 ? noticia.conteudo.substring(0, 100) + '...' : noticia.conteudo }}</p>
          </div>
        </span>
        <div v-else class="caixaPostagem">
          <button class="fechar" @click="fecharNoticia">Fechar</button>
          <h1>{{ noticias[noticiaMostrar].titulo }}</h1>
          <img :src="getImageUrl(noticias[noticiaMostrar].imagem)" class="imagem">
          <p class="descricao-completa">{{ noticias[noticiaMostrar].conteudo }}</p>
          <div class="avaliacao">
            <i :class="['bi', 'bi-hand-thumbs-up', { 'liked': noticias[noticiaMostrar]?.liked }]" @click.stop="toggleLike(noticiaMostrar)"></i>
            <span>{{ noticias[noticiaMostrar].likes }}</span>
            <i class="bi bi-star" @click.stop="abrirModalAvaliacao(noticiaMostrar)"></i>
            <span>{{ calcularMediaAvaliacao(noticias[noticiaMostrar].avaliacoes) }}</span>
          </div>
        </div>
      </div>
      <div class="coluna-lateral"></div>
    </div>

    <div v-if="mostrarModalAvaliacao" class="modal-avaliacao">
      <div class="modal-conteudo">
        <span class="fechar" @click="fecharModalAvaliacao">&times;</span>
        <h2>Avalie a Notícia</h2>
        <div class="estrelas">
          <i v-for="estrela in 5" :key="estrela" :class="['bi', 'bi-star', { 'avaliada': estrela <= avaliacao }]" @click="avaliar(estrela)"></i>
        </div>
        <button class="enviar-avaliacao" @click="enviarAvaliacao">Enviar Avaliação</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import CriarNoticiaButton from '../../Button/Button-post/CriarNoticiaButton.vue';
import EditarNoticiasButton from '../../Button/Button-post/EditarNoticiasButton.vue';
import LoginButton from '../../Button/Button-login/LoginButton.vue';
import ButtonLogout from '../../Button/Button-login/ButtonLogout.vue';

export default {
  name: 'ListagemBody',
  components: {
    CriarNoticiaButton,
    EditarNoticiasButton,
    LoginButton,
    ButtonLogout
  },
  setup() {
    const noticias = ref([]);
    const noticiaMostrar = ref(null);
    const mostrarModalAvaliacao = ref(false);
    const avaliacao = ref(0);
    const noticiaAvaliando = ref(null);

    const token = localStorage.getItem('token'); 
    const isLoggedIn = ref(!!token);
    onMounted(async () => {
      try {
        const response = await axios.get('http://localhost:3001/noticias', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        noticias.value = response.data.map(noticia => ({ ...noticia, liked: false, likes: noticia.likes || 0, avaliacoes: noticia.avaliacoes || [] }));
      } catch (error) {
        console.error('Erro ao carregar notícias:', error);
      }
    });

    const expandirNoticia = (index) => {
      noticiaMostrar.value = index;
    };

    const fecharNoticia = () => {
      noticiaMostrar.value = null;
    };

    const toggleLike = async (index) => {
      try {
        const noticia = noticias.value[index];
        const url = noticia.liked 
          ? `http://localhost:3001/noticias/${noticia._id}/dislike` 
          : `http://localhost:3001/noticias/${noticia._id}/like`;
        await axios.post(url, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        noticia.likes += noticia.liked ? -1 : 1;
        noticia.liked = !noticia.liked;
      } catch (error) {
        console.error('Erro ao dar like/deslike na notícia:', error);
      }
    };

    const abrirModalAvaliacao = (index) => {
      noticiaAvaliando.value = index;
      avaliacao.value = 0;
      mostrarModalAvaliacao.value = true;
    };

    const fecharModalAvaliacao = () => {
      mostrarModalAvaliacao.value = false;
    };

    const avaliar = (estrela) => {
      avaliacao.value = estrela;
    };

    const enviarAvaliacao = async () => {
      try {
        const noticia = noticias.value[noticiaAvaliando.value];
        await axios.post(`http://localhost:3001/noticias/${noticia._id}/avaliar`, { avaliacao: avaliacao.value }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        noticia.avaliacoes.push(avaliacao.value);
        fecharModalAvaliacao();
      } catch (error) {
        console.error('Erro ao enviar avaliação:', error);
      }
    };

    const calcularMediaAvaliacao = (avaliacoes) => {
      if (avaliacoes.length === 0) return 0;
      const soma = avaliacoes.reduce((acc, val) => acc + val, 0);
      return (soma / avaliacoes.length).toFixed(1);
    };

    const getImageUrl = (imagePath) => {
      return `http://localhost:3001/${imagePath}`;
    };

    return {
      noticias,
      noticiaMostrar,
      mostrarModalAvaliacao,
      avaliacao,
      expandirNoticia,
      fecharNoticia,
      toggleLike,
      abrirModalAvaliacao,
      fecharModalAvaliacao,
      avaliar,
      enviarAvaliacao,
      calcularMediaAvaliacao,
      getImageUrl,
      isLoggedIn,
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
  flex-direction: column;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.botoes-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
  padding: 10px;
  background-color: transparent;
}

.caixaPostagem {
  width: 80%;
  height: auto;
  background-color: rgba(255, 255, 255, 0.8);
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

.inputDescricao {
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

.fechar {
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.fechar:hover {
  background-color: #e60000;
  transform: translateY(-2px);
}

.fechar:active {
  background-color: #cc0000;
  transform: translateY(0);
}

.icones {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  padding-right: 10px;
  margin-bottom: 10px;
  gap: 10px;
}

.icones i {
  font-size: 4vh;
  cursor: pointer;
}

.icones i.liked {
  color: red;
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
  cursor: pointer;
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

.descricao-completa {
  white-space: pre-wrap;
  text-align: justify;
  font-size: 1.8vh;
  color: #666;
  font-family: 'Poppins', sans-serif;
  max-height: 60vh;
  overflow-y: auto;
  padding: 1vh;
}

.avaliacao {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.noticias {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3vh;
}

.modal-avaliacao {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-conteudo {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 300px;
  position: relative;
}

.modal-conteudo .fechar {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}

.modal-conteudo .estrelas {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
}

.modal-conteudo .estrelas i {
  font-size: 24px;
  cursor: pointer;
}

.modal-conteudo .estrelas i.avaliada {
  color: gold;
}

.enviar-avaliacao {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #dd6482;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.enviar-avaliacao:hover {
  background-color: #c04d6a;
  transform: translateY(-2px);
}

.enviar-avaliacao:active {
  background-color: #a83d56;
  transform: translateY(0);
}

.noticia p {
  font-size: 1.6vh;
}
</style>