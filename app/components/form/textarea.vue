<template>
  <textarea
    :id="id"
    :type="type"
    :value="modelValue"
    :aria-invalid="hasError ? true : undefined"
    :aria-describedby="hasError ? `${id}-error` : undefined"
    :class="['input-field', { 'input-error': hasError }]"
    @input="handleInputDebounced"
    @blur="$emit('blur')"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import type { FormInputProps } from "~/types/components";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<FormInputProps>();
const emits = defineEmits(["update:modelValue", "blur"]);

const handleInputDebounced = useDebounceFn(($event) => {
  emits("update:modelValue", $event.target.value);
}, 500);
</script>
