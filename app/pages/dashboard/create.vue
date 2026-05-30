<template>
  <div>
    <shared-header>
      <template #content>
        <button class="btn-ghost" @click="navigateTo('/notes')">
          ← Back to Notes
        </button>
        <div class="text-h2 font-h2 leading-h2">New Note</div>
        <button class="btn-primary" @click="save">Save</button>
      </template>
    </shared-header>

    <!-- Create Form -->
    <notes-form />
  </div>
</template>

<script setup>
definePageMeta({
  name: "CreateForm",
  middleware: "auth",
});
</script>
