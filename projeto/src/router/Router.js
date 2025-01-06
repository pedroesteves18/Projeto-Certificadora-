import { createRouter, createWebHistory } from 'vue-router';
import CadastroPage from '../components/Cadastro/CadastroPage.vue';
import ListagemPage from '../components/Listagem/Usuario/ListagemPage.vue';
import ListagemAdmPage from '../components/Listagem/Administrador/ListagemAdmPage.vue';
import LoginPage from '../components/Login/Login.vue'; 
import RegisterPage from '../components/Register/Register.vue'; 

const routes = [
  {
    path: '/',
    redirect: '/noticias'
  },
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
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;