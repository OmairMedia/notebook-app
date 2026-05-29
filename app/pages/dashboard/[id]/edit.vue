<template>
  <div>
    <shared-header>
      <template #content>
        <button class="btn-ghost" @click="navigateTo(`/notes/${id}`)">
          ← Back
        </button>
        <div class="text-h2 font-h2 leading-h2">Edit Note</div>
        <button class="btn-primary" @click="save">Save Changes</button>
      </template>
    </shared-header>

    <div class="max-w-3xl mx-auto px-8 mt-10">
      <div class="mb-5">
        <label class="form-label" for="title">Title</label>
        <input
          id="title"
          v-model="title"
          type="text"
          class="input-field"
          required
        />
      </div>
      <div class="mb-5">
        <label class="form-label" for="body">Body</label>
        <textarea
          id="body"
          v-model="body"
          class="input-field"
          rows="12"
          style="resize: vertical"
        ></textarea>
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

// Redirect if note not found (optional)
if (!note) {
  router.replace("/notes");
}

const title = ref(note?.title || "");
const body = ref(note?.body || "");

const save = () => {
  if (!title.value.trim() || !body.value.trim())
    return alert("Title and body are required.");
  // updateNote(id, title.value.trim(), body.value.trim());
  router.push(`/notes/${id}`);
};
</script>
