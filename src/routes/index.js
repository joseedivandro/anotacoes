import VueRouter from "vue-router"
import Dashboard from "../views/Dashboard.vue"
import Header from "../components/Header.vue"


Vue.use(VueRouter);

const routes = [
  { path: "/1", component: Header },
//   { path: "/criar-notacoes", component: CriarNotacoes },
//   { path: "/listar-anotacoes", component: ListarAnotacoes },
];

const router = new VueRouter({
  routes,
});

export default router;