<template>
  <div class="mb-5">
    <FormLabel :for-id="inputId">
      {{ label }}
    </FormLabel>
    <slot :input-id="inputId" :has-error="hasError" :on-blur="onBlur" />
    <FormError :input-id="inputId" :errors="errors" />
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  inputId: { type: String, required: true },
  label: { type: String, required: true },
  errors: { type: Array, default: () => [] },
  onBlur: { type: Function, default: () => {} },
});

const hasError = computed(() => props.errors && props.errors.length > 0);
</script>
