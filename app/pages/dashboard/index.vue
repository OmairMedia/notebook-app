<template>
  <div>
    <shared-header>
      <template #content>
        <SharedButton
          @click="$router.push({ name: 'CreateForm' })"
          text="Create Note"
        >
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

    <div class="mt-4 flex flex-col items-center justify-center">
      <h2 class="text-2xl font-bold">Welcome</h2>
      <h2 class="text-xl font-semibold">{{ user.user?.email }}</h2>
    </div>

    <!-- Search -->
    <div class="w-full flex items-center justify-center px-8 py-6">
      <SharedSearch />
    </div>

    <!-- Notes Grid -->
    <div class="max-w-6xl mx-auto px-8 pb-16">
      <div
        v-if="notes?.length"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <NotesCard v-for="(note, index) in notes" :key="index" :note="note" />
      </div>
      <EmptyNotes v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from "vue-sonner";
const supabase = useSupabaseClient();
const { data: user } = await supabase.auth.getUser();
const router = useRouter();
const { notes, getNotes } = useNotes();

definePageMeta({
  name: "Dashboard",
  layout: "dashboard",
  middleware: "auth",
});

const isLoading = ref(false);

const logout = async () => {
  isLoading.value = true;
  const { error } = await supabase.auth.signOut();
  if (error) {
    isLoading.value = false;
    toast.error(error.message);
  }

  toast.success("Logout Successfull!");
  isLoading.value = false;
  router.push({
    name: "Login",
  });
};

onMounted(() => {
  // seedData();
  getNotes();
});
</script>
