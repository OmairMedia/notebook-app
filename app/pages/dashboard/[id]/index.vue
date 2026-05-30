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

    <!-- View -->
    <notes-view :note="note" />
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
