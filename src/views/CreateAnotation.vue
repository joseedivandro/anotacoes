<!-- CriarNotacoes.vue -->
<template>
    <div>
      <form @submit.prevent="criarAnotacao" class="flex-column">
        <div class="form-group">
          <label for="texto">Texto:</label>
          <textarea v-model="anotacao.texto" id="texto" required></textarea>
        </div>
        <div class="form-group">
          <label for="valor">Valor (R$):</label>
          <input v-model="anotacao.valor" type="number" id="valor" />
        </div>
        <div class="form-group">
          <label for="categoria">Categoria:</label>
          <select v-model="anotacao.categoria" id="categoria">
            <option value="importante">Importante</option>
            <option value="urgente">Urgente</option>
            <option value="naoImportante">Não Importante</option>
          </select>
        </div>
        <div class="form-group">
          <label for="lembrete">Lembrete:</label>
          <input v-model="anotacao.lembrete" type="datetime-local" id="lembrete" />
        </div>
        <div class="form-group">
          <div class="button-group">
            <router-link to="/">Cancelar</router-link>
            <button type="submit">Salvar</button>
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <style scoped>
  .flex-column {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
  }
  
  .label {
    margin-bottom: 5px;
  }
  
  .button-group {
    display: flex;
  }
  
  .button-group router-link {
    margin-right: 10px;
  }
  </style>
  
  <script>
  export default {
    data() {
      return {
        anotacao: {
          texto: "",
          valor: 0,
          categoria: "importante",
          lembrete: "",
        },
      };
    },
    methods: {
      criarAnotacao() {
        this.$router.push("/");
      },
    },
  };
  </script>
  