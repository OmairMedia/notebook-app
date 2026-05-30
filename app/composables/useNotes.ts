import { reactive, ref, computed } from "vue";
import type { Note, CreateNoteInput } from "~/types/notes";
import { toast } from "vue-sonner";

export function useNotes() {
  const supabase = useSupabaseClient();
  const notes = ref<Note[]>([]);
  const notes1 = ref([
    {
      id: "1",
      title: "Meeting notes – Q3 planning",
      body: `Discussed roadmap for Q3:
  - Finalize API v2 migration by July 15
  - UX refresh for dashboard (designs due next week)
  - Hiring update: two new frontend engineers start Aug 1
  Next meeting: Friday 10am PST`,
      createdAt: "2026-05-20T09:30:00.000Z",
      updatedAt: "2026-05-25T14:15:00.000Z",
      user_id: "a53fa49c-a2fa-48c0-a5bd-33f7bf882a4d",
    },
    {
      id: "2",
      title: "Book recommendations",
      body: `Finished "The Pragmatic Programmer" – great section on orthogonal systems.\nNext on list:\n- "Clean Architecture" by Robert C. Martin\n- "Designing Data-Intensive Applications" by Martin Kleppmann\n- "Atomic Habits" (non-tech but highly recommended)`,
      createdAt: "2026-05-18T17:20:00.000Z",
      updatedAt: "2026-05-18T17:20:00.000Z",
      user_id: "a53fa49c-a2fa-48c0-a5bd-33f7bf882a4d",
    },
    {
      id: "3",
      title: "Random ideas for side project",
      body: `A daily micro-journaling app with AI-generated prompts.
      Could integrate with Notion API.
      Name ideas: "OneLine", "DailyDrip", "Prompted".`,
      createdAt: "2026-05-15T08:10:00.000Z",
      updatedAt: "2026-05-22T11:45:00.000Z",
      user_id: "a53fa49c-a2fa-48c0-a5bd-33f7bf882a4d",
    },
    {
      id: "4",
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
      user_id: "a53fa49c-a2fa-48c0-a5bd-33f7bf882a4d",
    },
    {
      id: "5",
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
      user_id: "a53fa49c-a2fa-48c0-a5bd-33f7bf882a4d",
    },
    {
      id: "6",
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
      user_id: "a53fa49c-a2fa-48c0-a5bd-33f7bf882a4d",
    },
  ]);
  const formData = ref<CreateNoteInput>({
    title: "",
    body: "",
  });

  const getNotes = async () => {
    const { data } = await supabase.from("Note").select("*").order("createdAt");
    notes.value = data;

    console.log("notes -> ", notes.value);
  };

  const createNote = async () => {
    const { error } = await supabase.from("Notes").insert(formData.value);
    if (error) {
      toast.error(error.message);
    }
    toast.success("Note created!");
  };

  const updateNote = async (note) => {
    const { error } = await supabase
      .from("Notes")
      .update(note)
      .eq("id", note?.id);
    if (error) {
      toast.error(error.message);
    }
    toast.success("Note created!");
  };

  const deleteNote = async (id) => {
    const { error } = await supabase.from("Notes").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
    }
    toast.success("Note deleted!");
  };

  const seedData = async () => {
    const { error } = await supabase.from("Note").insert(notes1.value);
    if (error) {
      toast.error(error.message);
    }
    toast.success("Seeding Successfull!");
  };

  return {
    notes,
    formData,
    getNotes,
    createNote,
    updateNote,
    deleteNote,
    seedData,
  };
}
