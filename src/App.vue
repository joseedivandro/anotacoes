
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
  min-height: 100vh; 
  background-color: #F4F3F8;
}
</style>
