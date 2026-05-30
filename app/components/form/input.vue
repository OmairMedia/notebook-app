<template>
  <input
    :id="id"
    :type="type"
    :value="modelValue"
    :aria-invalid="hasError ? true : undefined"
    :aria-describedby="hasError ? `${id}-error` : undefined"
    v-bind="$attrs"
    :class="['input-field', { 'input-error': hasError }]"
    @input="$emit('update:modelValue', $event.target.value)"
    @blur="$emit('blur')"
  />
</template>

<script setup lang="ts">
import type { AppFormInputProps } from "~/types/components";
const props = defineProps<AppFormInputProps>();
// {
//   id: { type: String, required: true },
//   modelValue: { type: [String, Number], default: "" },
//   type: { type: String, default: "text" },
//   hasError: { type: Boolean, default: false },
// }
defineEmits(["update:modelValue", "blur"]);
</script>
