<template>
  <div clas="organize">
    <form @submit.prevent="criarAnotacao" class="flex-column">
      <div class="form-group">
        <textarea v-model="anotacao.texto" id="texto" required placeholder="Exp.: Ao ligar falar com Luiza"></textarea>
      </div>
      <div class="form-group">
        <label for="valor">Potencial de negócio</label>
        <input v-model="anotacao.valor" type="float" id="valor" placeholder="R$ 00,00" />
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
          <router-link to="/" class="icon  "><ion-icon name="trash-outline"></ion-icon></router-link>
          <button type="submit" class="save ">Salvar</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import LocalStorageService from '../service/LocalStorageService.js';
import { v4 as uuidv4 } from 'uuid';
import '../style/createAnotation.css'

const router = useRouter();

const anotacao = ref({
  texto: '',
  valor: null,
  categoria: 'importante',
  lembrete: null,
});

let anotacaoExistenteId = null;

onMounted(() => {
  const anotacaoExistente = router.currentRoute.value.query.anotacaoExistente;
  if (anotacaoExistente) {
    const anotacaoData = JSON.parse(anotacaoExistente);
    anotacao.value = { ...anotacao.value, ...anotacaoData };
    anotacaoExistenteId = anotacaoData.id; 
  }
});

const criarAnotacao = async () => {
  const anotacoes = LocalStorageService.getAnotacoes();

  if (anotacaoExistenteId !== null) {

    const index = anotacoes.findIndex(a => a.id === anotacaoExistenteId);
    if (index !== -1) {
      anotacoes[index] = anotacao.value;
    }
  } else {

    const novaAnotacao = { ...anotacao.value, id: uuidv4() };
    anotacoes.push(novaAnotacao);
  }

  LocalStorageService.setAnotacoes(anotacoes);

  await router.push('/');
};
</script>
