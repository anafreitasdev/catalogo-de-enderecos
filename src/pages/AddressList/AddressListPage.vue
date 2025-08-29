<template>
  <div class="flex flex-col gap-4 py-20 px-10">
    <h1 class="text-2xl font-bold">{{ $t("table.title") }}</h1>
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-2"
    >
      <div class="flex gap-2">
        <button
          @click="addAddress"
          class="bg-blue-900 hover:bg-blue-800 text-white font-medium w-40 py-3 rounded-3xl text-xs md:text-sm"
        >
          {{ $t("table.buttons.add") }}
        </button>
        <button
          @click="exportCSV"
          class="bg-blue-900 hover:bg-blue-800 text-white font-medium w-40 py-3 rounded-3xl text-xs md:text-sm"
        >
          {{ $t("table.buttons.export") }}
        </button>
      </div>
      <div class="flex gap-2 items-center">
        <select
          id="language"
          v-model="locale"
          class="bg-white border cursor-pointer border-gray-300 rounded-lg px-3 py-2 outline-none font-medium text-xs md:text-sm"
        >
          <option value="pt">PT</option>
          <option value="en">EN</option>
        </select>
        <input
          v-model="search"
          type="text"
          :placeholder="$t('table.inputs.search')"
          class="bg-white border border-gray-300 rounded-3xl px-3 py-3 font-medium outline-none w-full sm:w-full md:w-80 text-xs md:text-sm"
        />
      </div>
    </div>
    <AddressTable @edit="editAddress" :addresses="addressList" @delete="deleteAddress" />
    <AddressModal
      v-if="showModal"
      :address="currentAddress"
      :show="showModal"
      @close="showModal = false"
      :typeAction="typeAction"
      @submit="insertOrEditAddress"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import AddressTable from "./components/AddressTable.vue";
import AddressModal from "./components/AddressModal.vue";
import type { IAddress } from "../../models/AddressInterface";
import { useAddressStore } from "../../../src/stores/AddressStore";
import { useI18n } from "vue-i18n";

const search = ref("");
const showModal = ref(false);
const typeAction = ref("");
const { locale } = useI18n();
const addressStore = useAddressStore();
const addressList = ref<IAddress[]>([]);
const timeOut = ref<NodeJS.Timeout | undefined>();
const currentAddress = ref<IAddress>();

const editAddress = (adress: IAddress) => {
  currentAddress.value = adress;
  typeAction.value = "edit";
  showModal.value = true;
};

const addAddress = () => {
  typeAction.value = "add";
  showModal.value = true;
};

const insertOrEditAddress = (address: IAddress) => {
  if (typeAction.value === "add") {
    addressStore.addAddress(address);
  } else {
    if (currentAddress.value?.id) {
      addressStore.updateAddress(currentAddress.value.id, address);
    }
  }
  listAddresses();
};

const deleteAddress = async (id: number) => {
  await addressStore.deleteAddress(id);
  listAddresses();
};

const FilterAddress = (city: string) => {
  if (city === "") {
    addressList.value = addressStore.addresses;
    return;
  }
  const filtered = addressList.value.filter((addr) =>
    addr.city.toLowerCase().includes(city.toLowerCase())
  );
  addressList.value = filtered;
};

const exportCSV = () => {
  const headers: (keyof IAddress)[] = [
    "cep",
    "state",
    "city",
    "neighborhood",
    "street",
    "number",
  ];
  const headerLabels = [
    "CEP",
    "Estado",
    "Cidade",
    "Bairro",
    "Logradouro",
    "Número",
  ];

  const delimiter = locale.value === "pt" ? ";" : ",";

  const quote = (value: string) => {
    const v = value ?? "";
    return `"${String(v).replace(/"/g, '""')}"`;
  };

  const rows = addressList.value.map((addr: IAddress) =>
    headers.map((h) => quote(String((addr as any)[h] ?? ""))).join(delimiter)
  );

  const csvLines = [headerLabels.map((h) => quote(h)).join(delimiter), ...rows];

  const csvContent = "\uFEFF" + csvLines.join("\r\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  const url = URL.createObjectURL(blob);
  link.href = url;
  link.setAttribute("download", "enderecos.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const listAddresses = async () => {
  await addressStore.fetchAddresses();
  addressList.value = addressStore.addresses;
};

watch(search, (newSearch) => {
  if (timeOut) {
    clearTimeout(timeOut.value);
  }
  timeOut.value = setTimeout(() => {
    FilterAddress(newSearch);
  }, 500);
});

onMounted(async () => {
  await listAddresses();
});
</script>
