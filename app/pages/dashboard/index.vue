<template>
  <div>
    <shared-header>
      <template #content>
        <NuxtLink
          to="/dashboard"
          class="text-link font-link text-primary-text hover:text-primary px-4 py-2 rounded-tight hover:bg-very-light-blue"
        >
          Notes
        </NuxtLink>
        <button class="btn-secondary">+ New Note</button>
        <button class="btn-ghost ml-2">Sign out</button>
      </template>
    </shared-header>

    <!-- Search -->
    <div class="max-w-6xl mx-auto px-8 py-6">
      <input
        v-model="searchQuery"
        type="search"
        class="input-field max-w-sm"
        placeholder="Search notes..."
      />
    </div>

    <!-- Notes Grid -->
    <div class="max-w-6xl mx-auto px-8 pb-16">
      <div
        v-if="filtered.length"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="note in filtered"
          :key="note.id"
          class="card flex flex-col justify-between"
        >
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
            <button class="btn-ghost" @click="navigateTo(`/notes/${note.id}`)">
              Read
            </button>
            <button class="btn-ghost text-gray-500">Delete</button>
          </div>
        </div>
      </div>
      <p v-else class="text-center text-gray-500 mt-12">
        No notes yet. Create your first one!
      </p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "dashboard",
});

const searchQuery = ref("");
const filtered = computed(() => searchQuery.value);

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

// Re-fetch on delete (reactivity automatically updates filtered)
const handleDelete = (id) => {
  if (confirm("Delete this note?")) {
  }
};
</script>
