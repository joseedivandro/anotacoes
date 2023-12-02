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
        <button @click="editarAnotacao(index)">Editar</button>
        <button @click="deletarAnotacao(index)">Deletar</button>
      </li>
    </ul>
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
  </style>
  
  <script setup>
  import LocalStorageService from '../service/LocalStorageService.js';
  import { ref, onMounted } from 'vue';
  
  const anotacoes = ref([]);
  
  const carregarAnotacoes = () => {
    anotacoes.value = LocalStorageService.getAnotacoes();
  };
  
  onMounted(() => {
    carregarAnotacoes();
  });
  </script>
  