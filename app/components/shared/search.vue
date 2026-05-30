<template>
  <input
    type="search"
    class="input-field max-w-sm"
    placeholder="Search notes..."
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  query?: string;
}>();
</script>
