import { reactive, ref, computed } from "vue";
import type { Note, CreateNoteInput } from "~/types/notes";
import { toast } from "vue-sonner";

export function useNotes() {
  const supabase = useSupabaseClient();
  const notes = ref<Note[]>([]);
  const formData = ref<CreateNoteInput>({
    title: "",
    body: "",
  });

  const getNotes = async () => {
    const { data } = await supabase.from("Notes").select("*");
    notes.value = data;
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

  return {
    notes,
    formData,
    getNotes,
    createNote,
    updateNote,
    deleteNote
  };
}
