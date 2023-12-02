const STORAGE_KEY = 'anotacoes';

export default {
  getAnotacoes() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  },
  setAnotacoes(anotacoes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(anotacoes));
  },
}