<template>
  <div>
    <h2>Homepage</h2>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>
