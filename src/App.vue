

<template>
  <div id="app" class="min-h-screen flex flex-col">
    <nav class="bg-gray-800 text-white px-8 py-4">
      <div class="flex justify-between items-center">
        <div class="nav-brand">
          <h1 class="text-2xl font-bold m-0">{{ $t('navbar.brand') }}</h1>
        </div>
        <div class="flex gap-4">
          <router-link 
            to="/" 
            class="px-4 py-2 rounded-md text-white no-underline transition-colors duration-300 hover:bg-gray-700"
          >
            {{ $t('navbar.home') }}
          </router-link>
        </div>
      </div>
    </nav>
    
    <main class="flex-1 p-8">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { usePageTitle } from './composables/usePageTitle'

// Inicializa o sistema de título da página
usePageTitle()
</script>
