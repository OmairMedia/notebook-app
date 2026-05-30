<template>
  <label :for="forId" class="form-label"><slot /></label>
</template>
<script setup lang="ts">
import type { FormLabelProps } from "@/types/components";
defineProps<FormLabelProps>();
</script>
