import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from "../views/Dashboard.vue";
import CreateAnotation from "../views/CreateAnotation.vue";


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Dashboard },
    { path: "/criar-notacoes", component: CreateAnotation },,
  ],
});

export default router;
