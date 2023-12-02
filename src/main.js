import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/index.js';
import './style/reset.css'


const app = createApp(App);

app.use(router);

app.mount('#app');
