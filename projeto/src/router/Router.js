import { createRouter, createWebHistory } from 'vue-router';
import CadastroPage from '../components/Cadastro/CadastroPage.vue'
import ListagemPage from '../components/Listagem/ListagemPage.vue'
const routes = [
  {
    path: '/cadastro',
    name: 'CadastroPage',
    component: CadastroPage,
  },
  {
    path: '/noticias',
    name: 'ListagemPage',
    component: ListagemPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;