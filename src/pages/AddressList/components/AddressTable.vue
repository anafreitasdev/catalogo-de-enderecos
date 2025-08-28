<template>
  <div>
    <CardAddress @edit="editRow" :addresses="addresses" />
    <div
      class="hidden md:block overflow-x-auto w-full rounded-md border border-gray-200"
    >
      <table class="min-w-full bg-white rounded-2xl">
        <thead
          class="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 uppercase text-sm"
        >
          <tr>
            <th
              v-for="field in [
                'zip',
                'state',
                'city',
                'neighborhood',
                'street',
                'number',
              ]"
              :key="field"
              class="px-4 py-3 text-left"
            >
              {{ $t(`table.header.${field}`) }}
            </th>
            <th class="px-4 py-3 text-center">
              {{ $t("table.header.actions") }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(address, idx) in addresses"
            :key="idx"
            class="border-t text-sm"
          >
            <td class="px-4 py-2 text-gray-700">{{ address.cep }}</td>
            <td class="px-4 py-2 text-gray-700">{{ address.estado }}</td>
            <td class="px-4 py-2 text-gray-700">{{ address.cidade }}</td>
            <td class="px-4 py-2 text-gray-700">{{ address.bairro }}</td>
            <td class="px-4 py-2 text-gray-700">{{ address.logradouro }}</td>
            <td class="px-4 py-2 text-gray-700">{{ address.numero }}</td>
            <td class="px-4 py-2 flex justify-center">
              <button
                @click="editRow(idx)"
                class="text-white px-3 py-1.5 rounded-full text-sm bg-blue-900 hover:bg-blue-800 mr-2"
              >
                {{ $t("table.buttons.edit") }}
              </button>
              <button
                @click="deleteRow(idx)"
                class="text-white px-3 py-1.5 rounded-full text-sm bg-red-500 hover:bg-red-600"
              >
                {{ $t("table.buttons.delete") }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import CardAddress from "../../../components/CardAddress.vue";

const props = defineProps({
  addresses: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["edit", "delete"]);

const editRow = (idx) => {
  emit("edit", props.addresses[idx], idx);
};

const deleteRow = (idx) => {
  emit("delete", idx);
};
</script>
