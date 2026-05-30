<template>
  <input
    :id="id"
    :type="type"
    :value="modelValue"
    :aria-invalid="hasError ? true : undefined"
    :aria-describedby="hasError ? `${id}-error` : undefined"
    v-bind="$attrs"
    :class="['input-field', { 'input-error': hasError }]"
    @input="handleInputDebounced"
    @blur="$emit('blur')"
  />
</template>

<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import type { FormInputProps } from "~/types/components";
const props = defineProps<FormInputProps>();
const emits = defineEmits(["update:modelValue", "blur"]);

const handleInputDebounced = useDebounceFn(($event) => {
  emits("update:modelValue", $event.target.value);
}, 500);
</script>
