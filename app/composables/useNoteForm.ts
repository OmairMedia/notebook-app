import { reactive, ref, computed } from "vue";
import { createNoteSchema } from "~/schemas/note.schema";
import { useFormValidation } from "./useFormValidation";
import type { Note, CreateNoteInput } from "~/types/notes";
import { toast } from "vue-sonner";

export const useNoteForm = () => {
  const supabase = useSupabaseClient();

  const router = useRouter();
  const isSubmitting = ref(false);
  const formError = ref(""); // general form-level error

  const formData = reactive<CreateNoteInput>({
    title: "",
    body: "",
  });

  const { errors, validateField, validateForm, resetErrors, markDirty } =
    useFormValidation(createNoteSchema);

  const validate = () => {
    return validateForm(formData);
  };

  // Watch each field: mark dirty when value becomes non‑empty
  watch(
    () => formData.title,
    (val) => {
      if (val && val.length > 0) markDirty("title");
    },
  );
  watch(
    () => formData.body,
    (val) => {
      if (val && val.length > 0) markDirty("body");
    },
  );

  const onSubmit = async () => {
    formError.value = "";
    if (!validate()) return;

    isSubmitting.value = true;

    try {
      const userData = await supabase.auth.getUser();
      const { error } = await supabase.from("Note").insert({
        title: formData.title,
        body: formData.body,
        user_id: userData.data.user.id,
      });
      if (error) {
        toast.error(error.message);
        isSubmitting.value = false;
      } else {
        // Simulate sign in – store user
        toast.success("Note create successfull");
        isSubmitting.value = false;
        router.push({
          name: "Dashboard",
        });
      }
    } catch (error) {
      // Map API errors to field-level or form-level
      if (error?.response?.data?.errors) {
        // Example: field errors from API
        Object.entries(error.response.data.errors).forEach(([field, msgs]) => {
          errors[field] = msgs;
        });
      } else {
        formError.value = "An unexpected error occurred. Please try again.";
      }
    } finally {
      isSubmitting.value = false;
    }
  };

  const blurHandler = (fieldName: any) => {
    return () => validateField(fieldName, formData[fieldName]);
  };

  return {
    formData,
    errors,
    formError,
    isSubmitting,
    onSubmit,
    blurHandler,
  };
};
