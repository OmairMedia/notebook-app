<template>
  <div class="max-w-3xl mx-auto px-8 mt-10">
    <h1 class="text-h1 font-h1 leading-h1 mb-2">{{ note.title }}</h1>
    <p class="text-gray-500 text-label mb-6">{{ timeAgo(note.createdAt) }}</p>
    <div class="whitespace-pre-wrap text-body leading-body">
      {{ note.body }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Note } from "@/types/notes";
const props = defineProps<{
  note: Note;
}>();

// Time ago helper (can be moved to a utility)
const timeAgo = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};
</script>
