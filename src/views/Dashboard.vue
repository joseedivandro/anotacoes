<template>
    <div class="container">
      <ion-icon name="attach-outline" class="clip"></ion-icon>
      <h3>Anotações</h3>
      <h4>by SpeedIo</h4>
      <router-link to="/criar-notacoes">
        <button class="criar-btn"> <ion-icon name="add-outline"></ion-icon>Criar Anotação</button>
      </router-link>

      <ul>
      <li v-for="(anotacao, index) in anotacoes" :key="index">
        <div>{{ anotacao.texto }}</div>
        <div>{{ anotacao.valor }}</div>
        <div>{{ anotacao.categoria }}</div>
        <div>{{ anotacao.lembrete }}</div>
        <button @click="editarAnotacao(anotacao)">Editar</button>
        <button @click="confirmarDelecaoAnotacao(index)">Deletar</button>
      </li>
    </ul>

    <div v-if="showDeleteConfirmation" class="popup">
      <p>Tem certeza que deseja apagar esta anotação?</p>
      <button @click="cancelarDelecaoAnotacao">Cancelar</button>
      <button @click="deletarAnotacao">Confirmar</button>
    </div>
  </div>
  </template>
  
  <style scoped>
  .criar-btn {
    background-color: #1395FD;
    color: white;
    padding: 10px;
    width: 150px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
  }

  .clip{
    height: 50px;
    width: 50px;
    color: #A6ACAE;
    transform: rotate(215deg);
    margin-bottom: 15px;
  }

  .container{
    display: flex;
  }

  h3{
   color: #1395FD;
   font-size: 20px!important;
   margin-bottom: 0px !important;
   font-weight: bold;

  }

  h4{
    color: #A6ACAE;
    font-size: 12px;
    margin-bottom: 25px;
  }
  .popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 999;
  }
  </style>
  
  <script setup>
  import LocalStorageService from '../service/LocalStorageService.js';
  import router from "../routes/index.js"
  import { ref, onMounted } from 'vue';
  
  const anotacoes = ref([]);
  const anotacaoSelecionada = ref(null);
  const showDeleteConfirmation = ref(false);
  
  const carregarAnotacoes = () => {
    anotacoes.value = LocalStorageService.getAnotacoes();
  };
  
  const editarAnotacao = (anotacao) => {
  // Navegar para a página de criação/editação e passar a anotação existente
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
      // Lógica para deletar a anotação
      anotacoes.value.splice(anotacaoSelecionada.value, 1);
      LocalStorageService.setAnotacoes(anotacoes.value);
  
      // Limpar estado
      anotacaoSelecionada.value = null;
      showDeleteConfirmation.value = false;
    }
  };
  
  onMounted(() => {
    carregarAnotacoes();
  });
  </script>