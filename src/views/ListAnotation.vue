<template>
    <div class="red">
      <div v-for="(anotacao, index) in anotacoes" :key="index">
        <p>{{ anotacao.texto }}</p>
        <button @click="editarAnotacao(index)">Editar</button>
        <button @click="apagarAnotacao(index)">Apagar</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        anotacoes: [], 
      };
    },
    methods: {
      editarAnotacao(index) {
        this.$router.push(`/editar-notacao/${index}`);
      },
      apagarAnotacao(index) {
        this.anotacoes.splice(index, 1);
      },
    },
  };
  </script>
  
<style>
.red{
  background-color: blue;
}
</style>