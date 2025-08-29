<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
  >
    <div
      class="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 relative flex flex-col gap-5 scale-95 opacity-0 data-[show=true]:opacity-100 data-[show=true]:scale-100"
      :data-show="show"
    >
      <button
        @click="close"
        class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 font-bold text-xs md:text-sm"
      >
        &times;
      </button>

      <h2 class="text-xl font-semibold text-gray-800 text-center">
        {{
          typeAction === "add"
            ? $t("table.modal.add.title")
            : $t("table.modal.edit.title")
        }}
      </h2>

      <div
        v-if="errorMessage"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center justify-between"
      >
        <span>{{ errorMessage }}</span>
        <button
          @click="errorMessage = ''"
          class="text-red-500 hover:text-red-700 font-bold text-lg"
        >
          &times;
        </button>
      </div>

      <form @submit.prevent="submit" class="flex flex-col gap-3">
        <div class="relative">
          <input
            v-model="form.cep"
            :placeholder="$t('table.header.zip')"
            :disabled="isLoadingCep"
            maxlength="9"
            @input="handleZipCodeInput"
            @keypress="allowOnlyNumbers"
            class="w-full px-4 py-2 rounded-xl border border-gray-300 outline-none bg-gray-50 text-xs md:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <div
            v-if="isLoadingCep"
            class="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <div
              class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-900"
            ></div>
          </div>
        </div>
        <input
          v-model="form.state"
          :placeholder="$t('table.header.state')"
          :disabled="isLoadingCep"
          class="w-full px-4 py-2 rounded-xl border border-gray-300 outline-none bg-gray-50 text-xs md:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <input
          v-model="form.city"
          :placeholder="$t('table.header.city')"
          :disabled="isLoadingCep"
          class="w-full px-4 py-2 rounded-xl border border-gray-300 outline-none bg-gray-50 text-xs md:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <input
          v-model="form.neighborhood"
          :placeholder="$t('table.header.neighborhood')"
          :disabled="isLoadingCep"
          class="w-full px-4 py-2 rounded-xl border border-gray-300 outline-none bg-gray-50 text-xs md:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <input
          v-model="form.street"
          :placeholder="$t('table.header.street')"
          :disabled="isLoadingCep"
          class="w-full px-4 py-2 rounded-xl border border-gray-300 outline-none bg-gray-50 text-xs md:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <input
          v-model="form.number"
          :placeholder="$t('table.header.number')"
          :disabled="isLoadingCep"
          class="w-full px-4 py-2 rounded-xl border border-gray-300 outline-none bg-gray-50 text-xs md:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
        />

        <div class="flex gap-3 justify-end mt-4">
          <button
            type="button"
            @click="close"
            class="px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs md:text-sm"
          >
            {{ $t("table.buttons.cancel") }}
          </button>
          <button
            @click="submit"
            class="px-5 py-2 rounded-full bg-blue-900 text-white hover:bg-blue-800 text-xs md:text-sm"
          >
            {{ $t("table.buttons.save") }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type PropType, watch } from "vue";
import type { IAddress } from "../../../models/AddressInterface";
import { ViaCepService } from "../../../services/viacep.service";
import { allowOnlyNumbers, formatZipCode } from "../../../utils/maskUtils";

const emit = defineEmits(["close", "submit"]);

const form = ref({
  cep: "",
  state: "",
  city: "",
  neighborhood: "",
  street: "",
  number: "",
});

const isLoadingCep = ref(false);
const errorMessage = ref("");

const props = defineProps({
  show: Boolean,
  typeAction: {
    type: String,
    required: true,
  },
  address: {
    type: Object as PropType<IAddress>,
    required: false,
  },
});

watch(
  () => form.value.cep,
  async (newCep) => {
    errorMessage.value = "";
    const cepLimpo = newCep.replace(/\D/g, "");
    if (cepLimpo.length === 8) {
      await searchZipCode(cepLimpo);
    }
  }
);

function handleZipCodeInput(event: Event) {
  const input = event.target as HTMLInputElement;
  form.value.cep = formatZipCode(input.value);
}

async function searchZipCode(cep: string) {
  try {
    isLoadingCep.value = true;
    errorMessage.value = "";

    form.value.state = "";
    form.value.city = "";
    form.value.neighborhood = "";
    form.value.street = "";

    const endereco = await ViaCepService.searchByZipCode(cep);

    form.value.state = endereco.uf;
    form.value.city = endereco.localidade;
    form.value.neighborhood = endereco.bairro;
    form.value.street = endereco.logradouro;
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);

    if (error instanceof Error) {
      if (error.message.includes("CEP não encontrado")) {
        errorMessage.value = "CEP não encontrado. Verifique se está correto.";
      } else if (error.message.includes("CEP deve ter 8 dígitos")) {
        errorMessage.value = "CEP deve ter 8 dígitos.";
      } else if (error.message.includes("Erro na requisição")) {
        errorMessage.value = "Erro ao conectar com o serviço. Tente novamente.";
      } else {
        errorMessage.value = "Erro ao buscar CEP. Tente novamente.";
      }
    } else {
      errorMessage.value = "Erro inesperado ao buscar CEP.";
    }
  } finally {
    isLoadingCep.value = false;
  }
}

function close() {
  emit("close");
}

function submit() {
  emit("submit", form.value);
  close();
}

onMounted(() => {
  if (props.address) {
    form.value.cep = props.address.cep ?? "";
    form.value.state = props.address.state ?? "";
    form.value.city = props.address.city ?? "";
    form.value.neighborhood = props.address.neighborhood ?? "";
    form.value.street = props.address.street ?? "";
    form.value.number = props.address.number ?? "";
  }
});
</script>
