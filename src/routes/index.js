// routes.js
import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from "../views/Dashboard.vue";
import Header from "../components/Header.vue";
import CreateAnotation from "../views/CreateAnotation.vue"
import ListAnotation from "../views/ListAnotation.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Dashboard },
    { path: "/criar-notacoes", component: CreateAnotation },
    { path: "/listar-anotacoes", component: ListAnotation },
  ],
});

export default router;
