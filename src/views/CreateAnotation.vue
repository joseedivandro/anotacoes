<template>
    <div>
      <form @submit.prevent="criarAnotacao" class="flex-column">
        <div class="form-group">
          <textarea v-model="anotacao.texto" id="texto" required></textarea>
        </div>
        <div class="form-group">
          <label for="valor">Potencial de negócio</label>
          <input v-model="anotacao.valor" type="number" id="valor" />
        </div>
        <div class="form-group">
          <label for="categoria">Categorização</label>
          <select v-model="anotacao.categoria" id="categoria">
            <option value="importante">Importante</option>
            <option value="urgente">Urgente</option>
            <option value="naoImportante">Não Importante</option>
          </select>
        </div>
        <div class="form-group">
          <label for="lembrete">Lembrete</label>
          <input v-model="anotacao.lembrete" type="datetime-local" id="lembrete" />
        </div>
        <div class="form-group">
          <div class="button-group">
           <div class ="icon"><ion-icon name="trash-outline"></ion-icon></div>
            <button type="submit" class="save">Salvar</button>
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
  
  .button-group  {
    display: flex;
    justify-content: space-between;
   
  }

  input{
    border-radius: 10px;
    height: 25px;
    border-color: white;
  }

  textarea{
    height: 70px;
    border-radius:10px ;
    border-color: white;
  }

  select{
    border-radius: 10px;
    border-color: white;
  }

  .save{
    background-color:#1395FD ;
    color: white;
    border-radius: 10px;
    border: none !important;
    width: 120px;
    
  }

  ion-icon{
   
    
    color: white;
 
  }

  .icon{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    background-color: #E28375;
   
  }
  </style>
  
  <script setup>
  import { ref } from 'vue';
  import LocalStorageService from "../service/LocalStorageService.js";
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const anotacao = ref({
    texto: '',
    valor: null,
    categoria: 'importante',
    lembrete: null,
  });
  
  const criarAnotacao = async () => {
    const anotacoes = LocalStorageService.getAnotacoes();
    anotacoes.push(anotacao.value);
    LocalStorageService.setAnotacoes(anotacoes);
    // Aguarde o salvamento ser concluído antes de redirecionar
    console.log('chegou aq')
    await router.push('/');
  };
  </script>