<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    @input="emit('update:modelValue', $event.target.value)"
    class="w-full px-4 py-2 rounded-xl border border-gray-300 outline-none bg-gray-50 text-xs md:text-sm"
  />
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>
