<template>
  <div id="app" class="min-h-screen flex flex-col">
    <main class="flex-1 p-8">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { usePageTitle } from "./composables/usePageTitle";
usePageTitle();
</script>
