

<template>
      <router-view />
</template>

<script setup lang="ts">
import { usePageTitle } from './composables/usePageTitle'
usePageTitle()
</script>
