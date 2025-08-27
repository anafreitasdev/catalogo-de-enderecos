<template>
  <div class="p-6">
    <div class="mb-6 p-4 bg-gray-100 rounded-lg">
      <label for="language" class="mr-3 font-bold text-gray-700">Idioma:</label>
      <select
        id="language"
        v-model="locale"
        @change="changeLanguage"
        class="px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="pt">Português</option>
        <option value="en">English</option>
      </select>
    </div>

    <h1 class="text-4xl font-bold text-gray-800 mb-4">{{ $t("welcome") }}</h1>
    <p class="text-lg text-gray-600 mb-4">{{ $t("hello") }}</p>
    <p class="text-lg text-gray-600 mb-8">{{ $t("description") }}</p>

    <div class="mt-8 p-6 bg-gray-50 rounded-lg">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">
        {{ $t("features.title") }}
      </h2>
      <ul class="space-y-3">
        <li class="py-2 border-b border-gray-200 last:border-b-0 text-gray-700">
          {{ $t("features.address") }}
        </li>
        <li class="py-2 border-b border-gray-200 last:border-b-0 text-gray-700">
          {{ $t("features.search") }}
        </li>
        <li class="py-2 border-b border-gray-200 last:border-b-0 text-gray-700">
          {{ $t("features.management") }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { locale, t } = useI18n();

const changeLanguage = () => {
  // O locale será atualizado automaticamente pelo v-model
};
</script>
