<template>
  <div class="card flex flex-col justify-between">
    <div>
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-body font-body-small text-primary-text truncate">
          {{ note.title }}
        </h3>
        <span class="badge-info">{{ timeAgo(note.updatedAt) }}</span>
      </div>
      <p class="text-input text-gray-500 line-clamp-2 mb-4">
        {{ note.body }}
      </p>
    </div>
    <div class="flex justify-between items-center mt-auto">
      <SharedButton
        class="p-0"
        variant="ghost"
        text="Read"
        @click="readNote(note.id)"
      >
      </SharedButton>
      <SharedButton
        class="p-0 text-red-500"
        variant="ghost"
        text="Delete"
        @click="removeNote(note.id)"
      ></SharedButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const { deleteNote, getNotes } = useNotes();
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

const readNote = async (id) => {
  await navigateTo({
    name: "Single Note",
    params: {
      id: id,
    },
  });
};

const removeNote = async (id) => {
  await deleteNote(id);
  await getNotes();
};
</script>
