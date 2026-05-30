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

    <NotesForm :note="note" />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});

const route = useRoute();
const router = useRouter();

const note = ref({
  id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  title: "Meeting notes – Q3 planning",
  body: `Discussed roadmap for Q3:
- Finalize API v2 migration by July 15
- UX refresh for dashboard (designs due next week)
- Hiring update: two new frontend engineers start Aug 1
Next meeting: Friday 10am PST`,
  createdAt: "2026-05-20T09:30:00.000Z",
  updatedAt: "2026-05-25T14:15:00.000Z",
});
</script>
