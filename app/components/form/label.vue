<template>
  <label :for="forId" class="form-label"><slot /></label>
</template>
<script setup lang="ts">
import type { AppFormLabelProps } from "@/types/components";
defineProps<AppFormLabelProps>();
</script>
