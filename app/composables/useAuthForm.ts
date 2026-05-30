import { reactive, ref, computed } from "vue";
import { signInSchema, signUpSchema } from "~/schemas/auth.schema";
import { useFormValidation } from "./useFormValidation";
import type { SignInPayload, SignUpPayload } from "~/types/auth";
import { toast } from "vue-sonner";

export function useAuthForm() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const isSignIn = ref(true); // default sign in
  const isSubmitting = ref(false);
  const formError = ref(""); // general form-level error

  const formData: SignInPayload & { name?: string } = reactive({
    name: "",
    email: "",
    password: "",
  });

  const currentSchema = computed(() =>
    isSignIn.value ? signInSchema : signUpSchema,
  );
  const { errors, validateField, validateForm, resetErrors, markDirty } =
    useFormValidation(currentSchema);

  const validate = () => {
    return validateForm(formData);
  };

  // Watch each field: mark dirty when value becomes non‑empty
  watch(
    () => formData.name,
    (val) => {
      if (val && val.length > 0) markDirty("name");
    },
  );
  watch(
    () => formData.email,
    (val) => {
      if (val && val.length > 0) markDirty("email");
    },
  );
  watch(
    () => formData.password,
    (val) => {
      if (val && val.length > 0) markDirty("password");
    },
  );

  const submit = async () => {
    formError.value = "";
    if (!validate()) return;

    isSubmitting.value = true;

    try {
      // Simulate API call (replace with real auth)
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Dummy authentication
      if (isSignIn.value) {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (error) {
          toast.error(error.message);
        }
        // Simulate sign in – store user
        toast.success("Login successfull");
      } else {
        // Simulate sign up
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });
        if (error) {
          toast.error(error.message);
        }
        // Simulate sign in – store user
        toast.success("User registered successfully");
      }

      router.push("/dashboard");
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

  const toggleMode = () => {
    isSignIn.value = !isSignIn.value;
    resetErrors();
    formError.value = "";
    // Clear password for security
    formData.password = "";
  };

  const blurHandler = (fieldName: any) => {
    return () => validateField(fieldName, formData[fieldName]);
  };

  return {
    isSignIn,
    formData,
    errors,
    formError,
    isSubmitting,
    submit,
    toggleMode,
    blurHandler,
  };
}
