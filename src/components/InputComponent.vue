<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    :disabled="disabled"
    :maxlength="maxlength"
    @input="emit('update:modelValue', $event.target.value)"
    class="w-full px-4 py-2 rounded-xl border border-gray-300 outline-none bg-gray-50 text-xs md:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
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
  disabled: {
    type: Boolean,
    default: false,
  },
  maxlength: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>
