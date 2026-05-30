<template>
  <div class="max-w-3xl mx-auto px-8 mt-10">
    <div class="mb-5">
      <label class="form-label" for="title">Title</label>
      <input
        id="title"
        v-model="title"
        type="text"
        class="input-field"
        placeholder="Give your note a title"
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
        placeholder="Write your thoughts..."
        style="resize: vertical"
      ></textarea>
    </div>
  </div>
</template>
<script setup lang="ts">
const router = useRouter();

const title = ref("");
const body = ref("");

const save = () => {
  if (!title.value.trim() || !body.value.trim())
    return alert("Title and body are required.");
  //   const newNote = addNote(title.value.trim(), body.value.trim());
  router.push(`/notes/new-note`);
};
</script>
