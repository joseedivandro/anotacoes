<template>
    <div v-if="showDeleteConfirmation" class="popup">
      <div class="popup-header">
        <h3>Exclusão de Anotação</h3>
        <button @click="cancelarDelecaoAnotacao">X</button>
      </div>
      <p>Você está prestes a deletar uma anotação e esta ação não poderá ser desfeita. Tem certeza que deseja excluí-la?</p>
      <div class="popup-buttons">
        <button class="cancelar-btn" @click="cancelarDelecaoAnotacao">Cancelar</button>
        <button class="excluir-btn" @click="deletarAnotacao">Excluir</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, getCurrentInstance } from 'vue';
  
  const props = defineProps(['showDeleteConfirmation']);
  const instance = getCurrentInstance();
  const emit = instance.emit;
  
  const cancelarDelecaoAnotacao = () => {
    emit('cancelarDelecaoAnotacao');
  };
  
  const deletarAnotacao = () => {
    emit('deletarAnotacao');
  };
  </script>
  