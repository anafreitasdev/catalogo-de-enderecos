<template>
  <template v-if="addresses.length">
    <div
      v-for="(address, idx) in addresses"
      :key="idx"
      class="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 mb-4 md:hidden"
    >
      <div class="flex justify-between items-start gap-3">
        <div class="flex-1">
          <div class="grid grid-cols-2 gap-2">
            <div v-for="field in fields" :key="field.key">
              <div class="text-xs text-gray-500">
                {{ $t(field.label) }}
              </div>
              <div class="font-medium text-sm text-gray-800">
                {{ address[field.key] }}
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <button
            @click="emit('edit', idx)"
            class="text-white px-3 py-1.5 rounded-full text-xs bg-blue-900 hover:bg-blue-800"
            :aria-label="$t('table.buttons.edit')"
          >
            {{ $t("table.buttons.edit") }}
          </button>
          <button
            @click="emit('delete', idx)"
            class="text-white px-3 py-1.5 rounded-full text-xs bg-red-500 hover:bg-red-600"
            :aria-label="$t('table.buttons.delete')"
          >
            {{ $t("table.buttons.delete") }}
          </button>
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <div
      class="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 mb-4 md:hidden flex items-center justify-center min-h-[120px]"
    >
      <span class="text-gray-400 text-base">Nenhum endereço encontrado.</span>
    </div>
  </template>
</template>

<script setup>
const props = defineProps({
  addresses: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["edit", "delete"]);

const fields = [
  { key: "cep", label: "table.header.zip" },
  { key: "state", label: "table.header.state" },
  { key: "city", label: "table.header.city" },
  { key: "neighborhood", label: "table.header.neighborhood" },
  { key: "street", label: "table.header.street" },
  { key: "number", label: "table.header.number" },
];
</script>
