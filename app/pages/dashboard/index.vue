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
        v-if="notes.length > 0"
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

definePageMeta({
  name: "Dashboard",
  layout: "dashboard",
  middleware: "auth",
});

const notes = ref([
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    title: "Meeting notes – Q3 planning",
    body: `Discussed roadmap for Q3:
- Finalize API v2 migration by July 15
- UX refresh for dashboard (designs due next week)
- Hiring update: two new frontend engineers start Aug 1
Next meeting: Friday 10am PST`,
    createdAt: "2026-05-20T09:30:00.000Z",
    updatedAt: "2026-05-25T14:15:00.000Z",
  },
  {
    id: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    title: "Book recommendations",
    body: `Finished "The Pragmatic Programmer" – great section on orthogonal systems.\nNext on list:\n- "Clean Architecture" by Robert C. Martin\n- "Designing Data-Intensive Applications" by Martin Kleppmann\n- "Atomic Habits" (non-tech but highly recommended)`,
    createdAt: "2026-05-18T17:20:00.000Z",
    updatedAt: "2026-05-18T17:20:00.000Z",
  },
  {
    id: "c3d4e5f6-a7b8-9012-cdef-123456789012",
    title: "Random ideas for side project",
    body: `A daily micro-journaling app with AI-generated prompts.
    Could integrate with Notion API.
    Name ideas: "OneLine", "DailyDrip", "Prompted".`,
    createdAt: "2026-05-15T08:10:00.000Z",
    updatedAt: "2026-05-22T11:45:00.000Z",
  },
  {
    id: "d4e5f6a7-b8c9-0123-defa-234567890123",
    title: "Workout routine",
    body: `Monday: Chest & Triceps
    - Bench press 4x8
    - Incline dumbbell press 3x10
    - Tricep dips 3x12

    Wednesday: Back & Biceps
    - Deadlifts 4x6
    - Pull-ups 3x8
    - Barbell curls 3x10

    Friday: Legs & Shoulders
    - Squats 4x8
    - Overhead press 3x10
    - Lunges 3x12`,
    createdAt: "2026-05-10T21:00:00.000Z",
    updatedAt: "2026-05-24T07:30:00.000Z",
  },
  {
    id: "e5f6a7b8-c9d0-1234-efab-345678901234",
    title: "Shopping list",
    body: `- Almond milk
    - Eggs (1 dozen)
    - Chicken breast
    - Brown rice
    - Spinach
    - Greek yogurt
    - Olive oil
    - Coffee beans (Colombian)`,
    createdAt: "2026-05-23T08:45:00.000Z",
    updatedAt: "2026-05-23T08:45:00.000Z",
  },
  {
    id: "f6a7b8c9-d0e1-2345-fabc-456789012345",
    title: "Code snippet: debounce function",
    body: `/**
     * Debounce function to limit how often a function is called.
     * @param fn - The function to debounce.
     * @param delay - Delay in milliseconds.
     */
    function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void {
      let timeoutId: ReturnType<typeof setTimeout>;
      return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
      };
    }

    // Usage:
    const handleSearch = debounce((query: string) => {
      fetchResults(query);
    }, 300);`,
    createdAt: "2026-05-12T13:00:00.000Z",
    updatedAt: "2026-05-19T10:10:00.000Z",
  },
]);

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
</script>
