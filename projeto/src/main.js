import { createApp } from 'vue';
import App from './App.vue';
import router from './router/Router';

import 'bootstrap-icons/font/bootstrap-icons.css';
const app = createApp(App);

app.use(router);
app.mount('#app');