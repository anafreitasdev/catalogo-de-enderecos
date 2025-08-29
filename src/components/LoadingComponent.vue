<template>
  <div v-if="isLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-8 flex flex-col items-center gap-4">
      <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-900"></div>
      <p class="text-lg font-medium text-gray-700">{{ $t('loading.message') || 'Carregando...' }}</p>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div 
          class="bg-blue-900 h-2 rounded-full transition-all duration-100 ease-linear"
          :style="{ width: progress + '%' }"
        ></div>
      </div>
      <p class="text-sm text-gray-500">{{ Math.round(progress) }}%</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';

interface Props {
  timeout?: number;
  autoStart?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  timeout: 2000,
  autoStart: true
});

const emit = defineEmits<{
  'timeout': [];
  'loading-complete': [];
}>();

const isLoading = ref(false);
const progress = ref(0);
const intervalId = ref<NodeJS.Timeout | null>(null);

const startLoading = () => {
  isLoading.value = true;
  progress.value = 0;
  
  const startTime = Date.now();
  const endTime = startTime + props.timeout;
  
  intervalId.value = setInterval(() => {
    const currentTime = Date.now();
    const elapsed = currentTime - startTime;
    
    if (currentTime >= endTime) {
      progress.value = 100;
      setTimeout(() => {
        isLoading.value = false;
        emit('loading-complete');
      }, 100);
      clearInterval(intervalId.value!);
    } else {
      progress.value = (elapsed / props.timeout) * 100;
    }
  }, 16); // ~60fps para animação suave
};

const stopLoading = () => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }
  isLoading.value = false;
  progress.value = 0;
};

const resetLoading = () => {
  stopLoading();
  progress.value = 0;
};

// Expor métodos para uso externo
defineExpose({
  startLoading,
  stopLoading,
  resetLoading
});

onMounted(() => {
  if (props.autoStart) {
    startLoading();
  }
});

onUnmounted(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
  }
});

// Emitir evento de timeout quando o loading terminar
watch(() => progress.value, (newProgress) => {
  if (newProgress >= 100) {
    emit('timeout');
  }
});
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
