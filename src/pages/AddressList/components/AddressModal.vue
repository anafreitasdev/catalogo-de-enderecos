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

      <form class="flex flex-col gap-3" @submit.prevent>
        <InputComponent
          v-model="form.cep"
          :placeholder="$t('table.header.zip')"
        />
        <InputComponent
          v-model="form.state"
          :placeholder="$t('table.header.state')"
        />
        <InputComponent
          v-model="form.city"
          :placeholder="$t('table.header.city')"
        />
        <InputComponent
          v-model="form.neighborhood"
          :placeholder="$t('table.header.neighborhood')"
        />
        <InputComponent
          v-model="form.street"
          :placeholder="$t('table.header.street')"
        />
        <InputComponent
          v-model="form.number"
          :placeholder="$t('table.header.number')"
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
import InputComponent from "../../../components/InputComponent.vue";
import { onMounted, ref, type PropType } from "vue";
import type { IAddress } from "../../../models/AddressInterface";

const emit = defineEmits(["close", "submit"]);

const form = ref({
  cep: "",
  state: "",
  city: "",
  neighborhood: "",
  street: "",
  number: "",
});
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
