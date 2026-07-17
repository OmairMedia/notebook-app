<template>
  <div>
    <shared-header>
      <template #content>
        <SharedButton @click="$router.go(-1)" text="Go Back"> </SharedButton>
        <SharedButton @click="$router.push({ name: 'Edit Note' })" text="Edit">
          <template #leading-icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </template>
        </SharedButton>
        <SharedButton @click="logout" text="Sign out" :loading="isLoading">
          <template #trailing-icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
              />
            </svg>
          </template>
          Sign out
        </SharedButton>
      </template>
    </shared-header>

    <NotesForm v-if="note" :note="note" mode="edit" />
  </div>
</template>

<script setup>
const { note, getSingleNote } = useNotes();
definePageMeta({
  name: "Edit Note",
  middleware: "auth",
});

const route = useRoute();
const router = useRouter();

onMounted(() => {
  getSingleNote(route.params?.id);
});
</script>
