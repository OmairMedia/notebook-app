<template>
  <div class="w-full h-screen flex items-center justify-center">
    <h2 class="text-4xl font-bold">Notebook App</h2>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>
