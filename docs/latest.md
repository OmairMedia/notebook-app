Let’s fine‑tune the validation behaviour to match real‑world form UX:

- Clicking into a field and leaving it **empty** should **not** show an error (field is pristine).
- Typing something and then clearing the field should show “required” on blur.
- Password strength rules should appear as soon as the field has a value and the user moves away.

We’ll achieve this by introducing a **`dirty`** flag per field – a field becomes dirty the moment it receives a **non‑empty** value. Validation on blur only runs for dirty fields. On form submit, **all** fields are validated regardless of dirty state.

---

## 1. Update `useFormValidation` – Add Dirty Tracking

```javascript
// composables/useFormValidation.js
import { reactive, unref } from "vue";

export function useFormValidation(schema) {
  const errors = reactive({});
  const dirtyFields = reactive({}); // track fields that ever had a non‑empty value

  const getSchema = () => unref(schema);

  const resetErrors = () => {
    Object.keys(errors).forEach((key) => delete errors[key]);
  };

  const markDirty = (fieldName) => {
    dirtyFields[fieldName] = true;
  };

  const isDirty = (fieldName) => dirtyFields[fieldName];

  const validateField = (fieldName, value, force = false) => {
    // Only validate if forced (submit) or the field has been dirtied
    if (!force && !isDirty(fieldName)) return;

    const currentSchema = getSchema();
    const fieldSchema = currentSchema?.shape?.[fieldName];
    if (!fieldSchema) return;

    const result = fieldSchema.safeParse(value);
    if (!result.success) {
      errors[fieldName] = result.error.issues.map((issue) => issue.message);
    } else {
      delete errors[fieldName];
    }
  };

  const validateForm = (data) => {
    resetErrors();
    const currentSchema = getSchema();
    const result = currentSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (!errors[field]) errors[field] = [];
        errors[field].push(issue.message);
      });
      // After a full submit, mark all attempted fields as dirty
      // so subsequent blur validations stay active.
      Object.keys(data).forEach((field) => {
        if (data[field] !== undefined) dirtyFields[field] = true;
      });
      return false;
    }
    return true;
  };

  return {
    errors,
    validateField,
    validateForm,
    resetErrors,
    markDirty,
    isDirty,
  };
}
```

---

## 2. Update `useAuthForm` – Dirty Watchers & Adjusted Blur

```javascript
// composables/useAuthForm.js
import { reactive, ref, computed, watch } from "vue";
import { useRouter } from "#imports";
import { signInSchema, signUpSchema } from "~/schemas/auth.schema";
import { useFormValidation } from "./useFormValidation";

export function useAuthForm() {
  const router = useRouter();
  const isSignIn = ref(true);
  const isSubmitting = ref(false);
  const formError = ref("");

  const formData = reactive({
    name: "",
    email: "",
    password: "",
  });

  const currentSchema = computed(() =>
    isSignIn.value ? signInSchema : signUpSchema,
  );
  const { errors, validateField, validateForm, resetErrors, markDirty } =
    useFormValidation(currentSchema);

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

  const validate = () => {
    return validateForm(formData);
  };

  const submit = async () => {
    formError.value = "";
    if (!validate()) return;

    isSubmitting.value = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (isSignIn.value) {
        localStorage.setItem(
          "notebook_user",
          JSON.stringify({ email: formData.email }),
        );
      } else {
        localStorage.setItem(
          "notebook_user",
          JSON.stringify({ name: formData.name, email: formData.email }),
        );
      }
      router.push("/notes");
    } catch (error) {
      formError.value = "An unexpected error occurred. Please try again.";
    } finally {
      isSubmitting.value = false;
    }
  };

  const toggleMode = () => {
    isSignIn.value = !isSignIn.value;
    resetErrors();
    formError.value = "";
    formData.password = "";
  };

  // blurHandler now uses force=false (respects dirty state)
  const blurHandler = (fieldName) => {
    return () => validateField(fieldName, formData[fieldName], false);
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
```

---

## 3. Password Strength Schema (Already Correct)

Your `signUpSchema` in `schemas/auth.schema.js` is already perfect – it enforces length, uppercase, lowercase, number, and special character. No change needed.

---

## 4. Expected Behaviour After Changes

- **Empty field, never touched**: clicking in and out shows **no error**.
- **Type something, then delete it completely**: on blur, “required” error appears because the field is now dirty.
- **Type a weak password** (e.g., `abc`): blur triggers validation because the field is dirty. The first failing rule (`.min(8)`) shows **“Password must be at least 8 characters”**.
- **Type a longer but weak password** (e.g., `abcdefgh`): on blur, shows **“Must contain at least one uppercase letter”** (or whichever rule fails first). All strength rules are now active.
- **Submit** with invalid fields: all errors are shown immediately, regardless of previous blur state.

---

This approach follows industry‑standard form UX: no premature errors, instant feedback after real interaction, and full validation on submission. Your login/register form is now robust and user‑friendly.
