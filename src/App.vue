<script setup lang="ts">
import { useCatalogo } from "./database/composables/useCatalogo";
import { onMounted } from "vue";

const { listar} = useCatalogo();

onMounted(() => { listar(); });

</script>

<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-brand">
        <h1>Catálogo de Endereços</h1>
      </div>
      <div class="nav-links">
        <router-link to="/" class="nav-link">Início</router-link>
      </div>
    </nav>
    
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background-color: #2c3e50;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand h1 {
  margin: 0;
  font-size: 1.5rem;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #34495e;
}

.main-content {
  flex: 1;
  padding: 2rem;
}
</style>
