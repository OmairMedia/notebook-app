<template>
  <label :for="forId" class="form-label"><slot /></label>
</template>
<script setup lang="ts">
defineProps({
  forId: { type: String, required: true },
});
</script>
