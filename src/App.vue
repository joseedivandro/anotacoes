
<template>
  <div class="container">
  <Header />
  <router-view />
</div>
 
</template>

<script setup>
import Header from "./components/Header.vue"
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh; /* Certifique-se de que a altura da div é pelo menos a altura da tela inteira */
  background-color: red;
}
</style>
