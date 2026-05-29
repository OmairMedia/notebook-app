<template>
  <div>
    <shared-header>
      <template #content>
        <button class="btn-ghost" @click="navigateTo('/notes')">← Back</button>
        <div class="flex items-center gap-3">
          <button
            class="btn-secondary"
            @click="navigateTo(`/notes/${id}/edit`)"
          >
            Edit
          </button>
          <button class="btn-ghost text-gray-500" @click="handleDelete">
            Delete
          </button>
        </div>
      </template>
    </shared-header>

    <div class="max-w-3xl mx-auto px-8 mt-10">
      <h1 class="text-h1 font-h1 leading-h1 mb-2">{{ note.title }}</h1>
      <p class="text-gray-500 text-label mb-6">{{ formattedDate }}</p>
      <div class="whitespace-pre-wrap text-body leading-body">
        {{ note.body }}
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});

const route = useRoute();
const router = useRouter();

const id = route.params.id;
const note = "";

if (!note) {
  router.replace("/notes");
}

const formattedDate = computed(() =>
  new Date(note.value?.updatedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }),
);

const handleDelete = () => {
  if (confirm("Delete this note?")) {
    // deleteNote(id);
    router.push("/notes");
  }
};
</script>
