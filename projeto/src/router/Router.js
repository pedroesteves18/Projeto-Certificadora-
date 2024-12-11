import { createRouter, createWebHistory } from 'vue-router';
import CadastroPage from '../components/Cadastro/CadastroPage.vue'
import ListagemPage from '../components/Listagem/Usuario/ListagemPage.vue'
import ListagemAdmPage from '../components/Listagem/Administrador/ListagemAdmPage.vue'

const routes = [
  {
    path: '/adm/cadastro',
    name: 'CadastroPage',
    component: CadastroPage,
  },
  {
    path: '/noticias',
    name: 'ListagemPage',
    component: ListagemPage
  },
  {
    path: '/adm/listagem',
    name: 'ListagemAdm',
    component: ListagemAdmPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;