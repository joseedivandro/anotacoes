<template>
    <div class="container">

      <ul>
      <li v-for="(anotacao, index) in anotacoes" :key="index" class="anotation-view">
        <ion-icon name="attach-outline" class="small-clip"></ion-icon>
      <div>
       <div class="align"><p class="title" @click="editarAnotacao(anotacao)">{{ anotacao.texto }}</p></div> 

        <div>{{ formatData(anotacao.lembrete) }}</div>
      </div>
        <ion-icon name="trash-outline" @click="confirmarDelecaoAnotacao(index)" class="small-trash"></ion-icon>
      </li>
    </ul>
    <div v-if="anotacoes.length === 0" style=" text-align: center;">
      <ion-icon name="attach-outline" class="clip"></ion-icon>
      <h3>Anotações</h3>
      <h4>by SpeedIo</h4>
    </div>
      <router-link to="/criar-notacoes">
        <button class="criar-btn"> <ion-icon name="add-outline"></ion-icon>Criar Anotação</button>
      </router-link>
      <div v-if="showDeleteConfirmation" class="popup">
      <div class="popup-header">
        <h3>Exclusão de Anotação</h3>
        <button @click="cancelarDelecaoAnotacao">X</button>
      </div>
      <p>Tem certeza que deseja apagar esta anotação?</p>
      <button @click="cancelarDelecaoAnotacao">Cancelar</button>
      <button @click="deletarAnotacao">Excluir</button>
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

  .small-clip{         
    color: #A6ACAE;
    transform: rotate(215deg);
    padding: 8px;
  }

  .small-trash{
    padding: 8px;
    color: #E28375;
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

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.popup-header h3 {
  margin: 0;
}

.popup-header button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #A6ACAE;
}

.title{
  margin-bottom: 3px;
  text-decoration: underline;
  font-weight: bold;
}

.title, .small-trash:hover{
  cursor: pointer;
}
.anotation-view{
  background-color: white;
  height: 50px;
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
}
.align{
  display: flex;
}
  </style>
  
  <script setup>
  import { format } from 'date-fns';
  import pt from 'date-fns/locale/pt-BR';
  import LocalStorageService from '../service/LocalStorageService.js';
  import router from "../routes/index.js";
  import { ref, onMounted } from 'vue';
  
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
  </script>
  