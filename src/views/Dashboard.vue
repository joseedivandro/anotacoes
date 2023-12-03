<template>
  <div class="organize">
    <ul>
      <li v-for="(anotacao, index) in anotacoes" :key="index" class="anotation-view">
        <ion-icon name="attach-outline" class="small-clip"></ion-icon>
        <div>
          <div class="align">
            <p class="title" @click="editarAnotacao(anotacao)">{{ anotacao.texto }}</p>
          </div>
          <div>{{ formatData(anotacao.lembrete) }}</div>
        </div>
        <ion-icon name="trash-outline" @click="confirmarDelecaoAnotacao(index)" class="small-trash"></ion-icon>
      </li>
    </ul>

    <div v-if="anotacoes.length === 0" style="text-align: center;">
      <ion-icon name="attach-outline" class="clip"></ion-icon>
      <h3>Anotações</h3>
      <h4>by SpeedIo</h4>
    </div>

    <router-link to="/criar-notacoes">
      <button class="criar-btn"> <ion-icon name="add-outline"></ion-icon>Criar Anotação</button>
    </router-link>

    <DeleteConfirmationPopup :showDeleteConfirmation="showDeleteConfirmation" @cancelarDelecaoAnotacao="cancelarDelecaoAnotacao" @deletarAnotacao="deletarAnotacao" />
  </div>
</template>

<script>
import '../style/dashboard.css';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import LocalStorageService from '../service/LocalStorageService.js';
import router from "../routes/index.js";
import { ref, onMounted } from 'vue';

import DeleteConfirmationPopup from '../components/DeleteConfirmationPopup.vue';

export default {
  components: {
    DeleteConfirmationPopup,
  },
  setup() {
    const anotacoes = ref([]);
    const anotacaoSelecionada = ref(null);
    const showDeleteConfirmation = ref(false);

    const carregarAnotacoes = () => {
      anotacoes.value = LocalStorageService.getAnotacoes();
    };

    const formatData = (lembrete) => {
      if (!lembrete) return '';
      return format(new Date(lembrete), "EEE dd/MM/yyyy '-' HH'h'mm", { locale: pt });
    };

    const editarAnotacao = (anotacao) => {
      router.push({ path: '/criar-notacoes', query: { anotacaoExistente: JSON.stringify(anotacao) } });
    };

    const confirmarDelecaoAnotacao = (index) => {
      anotacaoSelecionada.value = index;
      showDeleteConfirmation.value = true;
    };

    const cancelarDelecaoAnotacao = () => {
      anotacaoSelecionada.value = null;
      showDeleteConfirmation.value = false;
    };

    const deletarAnotacao = () => {
      if (anotacaoSelecionada.value !== null) {
        anotacoes.value.splice(anotacaoSelecionada.value, 1);
        LocalStorageService.setAnotacoes(anotacoes.value);
        anotacaoSelecionada.value = null;
        showDeleteConfirmation.value = false;
      }
    };

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        cancelarDelecaoAnotacao();
      }
    });

    onMounted(() => {
      carregarAnotacoes();
    });

    return {
      anotacoes,
      showDeleteConfirmation,
      formatData,
      editarAnotacao,
      confirmarDelecaoAnotacao,
      cancelarDelecaoAnotacao,
      deletarAnotacao,
    };
  },
};
</script>
