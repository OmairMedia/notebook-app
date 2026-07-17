<template>
  <div class="mb-5">
    <FormLabel :for-id="inputId">
      {{ label }}
    </FormLabel>
    <slot :input-id="inputId" :has-error="hasError" :on-blur="onBlur" />
    <FormError :input-id="inputId" :errors="errors" />
  </div>
</template>

<script setup lang="ts">
import type { FormFieldProps } from "@/types/components";
import { computed } from "vue";

// export interface FormFieldProps {
//   inputId: string;
//   label: string;
//   errors: string[];
//   onBlur: () => void;
// }

const props = defineProps<FormFieldProps>();
const hasError = computed(() => props.errors && props.errors.length > 0);
</script>
