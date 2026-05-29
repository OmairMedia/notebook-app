We’ll implement the login form with reusable, accessible components, schema‑based validation, and a dedicated composable for auth logic. The code follows Vue 3 best practices and your existing design system.

---

## 1. Extended Design Tokens (update `main.css`)

Add error semantic colors and an error variant for inputs.

```css
/* Add these inside your @theme block in main.css */
--color-error: #e53e3e; /* Red for errors */
--color-error-light: #fff5f5; /* Light red background */
--color-error-border: #fc8181; /* Border for error inputs */

/* Inside @layer components, add the error input class */
.input-error {
  border-color: var(--color-error-border);
  background-color: var(--color-error-light);
}
.input-error:focus {
  border-color: var(--color-error);
  box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
}
```

---

## 2. Reusable Form Components

### `components/forms/AppFormLabel.vue`

```vue
<template>
  <label :for="forId" class="form-label"><slot /></label>
</template>

<script setup>
defineProps({
  forId: { type: String, required: true },
});
</script>
```

### `components/forms/AppFormInput.vue`

```vue
<template>
  <input
    :id="id"
    :type="type"
    :value="modelValue"
    :aria-invalid="hasError ? true : undefined"
    :aria-describedby="hasError ? `${id}-error` : undefined"
    v-bind="$attrs"
    :class="['input-field', { 'input-error': hasError }]"
    @input="$emit('update:modelValue', $event.target.value)"
    @blur="$emit('blur')"
  />
</template>

<script setup>
defineProps({
  id: { type: String, required: true },
  modelValue: { type: [String, Number], default: "" },
  type: { type: String, default: "text" },
  hasError: { type: Boolean, default: false },
});

defineEmits(["update:modelValue", "blur"]);
</script>
```

### `components/forms/AppFormError.vue`

```vue
<template>
  <div
    v-if="errors && errors.length"
    :id="`${inputId}-error`"
    class="mt-2 text-sm text-error"
    role="alert"
  >
    <p v-for="(msg, i) in errors" :key="i">{{ msg }}</p>
  </div>
</template>

<script setup>
defineProps({
  inputId: { type: String, required: true },
  errors: { type: Array, default: () => [] },
});
</script>
```

### `components/forms/AppFormField.vue`

```vue
<template>
  <div class="mb-5">
    <AppFormLabel :for-id="inputId">
      {{ label }}
    </AppFormLabel>
    <slot :input-id="inputId" :has-error="hasError" :on-blur="onBlur" />
    <AppFormError :input-id="inputId" :errors="errors" />
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  inputId: { type: String, required: true },
  label: { type: String, required: true },
  errors: { type: Array, default: () => [] },
  onBlur: { type: Function, default: () => {} },
});

const hasError = computed(() => props.errors && props.errors.length > 0);
</script>
```

**Usage of AppFormField with slot** allows any input component to be used inside, making it extremely flexible.

---

## 3. Validation Schema (using Zod)

Install `zod` (`npm install zod`) and create the schemas.

### `schemas/auth.schema.js`

```javascript
import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const signUpSchema = signInSchema.extend({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
});
```

---

## 4. Validation Composable

### `composables/useFormValidation.js`

```javascript
import { reactive, ref } from "vue";

export function useFormValidation(schema) {
  const errors = reactive({});

  const resetErrors = () => {
    Object.keys(errors).forEach((key) => delete errors[key]);
  };

  const validateField = (fieldName, value) => {
    const fieldSchema = schema.shape?.[fieldName];
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
    const result = schema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (!errors[field]) errors[field] = [];
        errors[field].push(issue.message);
      });
      return false;
    }
    return true;
  };

  return { errors, validateField, validateForm, resetErrors };
}
```

---

## 5. Auth Form Composable

### `composables/useAuthForm.js`

```javascript
import { reactive, ref, computed } from "vue";
import { useRouter } from "#imports";
import { signInSchema, signUpSchema } from "~/schemas/auth.schema";
import { useFormValidation } from "./useFormValidation";

export function useAuthForm() {
  const router = useRouter();
  const isSignIn = ref(true); // default sign in
  const isSubmitting = ref(false);
  const formError = ref(""); // general form-level error

  const formData = reactive({
    name: "",
    email: "",
    password: "",
  });

  const currentSchema = computed(() =>
    isSignIn.value ? signInSchema : signUpSchema,
  );
  const { errors, validateField, validateForm, resetErrors } =
    useFormValidation(currentSchema);

  const validate = () => {
    return validateForm(formData);
  };

  const submit = async () => {
    formError.value = "";
    if (!validate()) return;

    isSubmitting.value = true;

    try {
      // Simulate API call (replace with real auth)
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Dummy authentication
      if (isSignIn.value) {
        // Simulate sign in – store user
        localStorage.setItem(
          "notebook_user",
          JSON.stringify({ email: formData.email }),
        );
      } else {
        // Simulate sign up
        localStorage.setItem(
          "notebook_user",
          JSON.stringify({ name: formData.name, email: formData.email }),
        );
      }

      router.push("/notes");
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

  const blurHandler = (fieldName) => {
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
```

---

## 6. Updated Auth Page

Now `pages/auth.vue` becomes clean and declarative.

```vue
<template>
  <div class="min-h-screen flex items-center justify-center p-8 md:p-12">
    <div class="card w-full max-w-md">
      <h2 class="text-h2 font-h2 leading-h2 mb-6">
        {{ isSignIn ? "Sign in to your account" : "Create your account" }}
      </h2>

      <form @submit.prevent="submit" novalidate>
        <!-- Name field (only for sign up) -->
        <AppFormField
          v-if="!isSignIn"
          input-id="name"
          label="Full name"
          :errors="errors.name"
          :on-blur="blurHandler('name')"
        >
          <template #default="{ inputId, hasError, onBlur }">
            <AppFormInput
              :id="inputId"
              v-model="formData.name"
              :has-error="hasError"
              type="text"
              placeholder="John Doe"
              autocomplete="name"
              @blur="onBlur"
            />
          </template>
        </AppFormField>

        <!-- Email field -->
        <AppFormField
          input-id="email"
          label="Email"
          :errors="errors.email"
          :on-blur="blurHandler('email')"
        >
          <template #default="{ inputId, hasError, onBlur }">
            <AppFormInput
              :id="inputId"
              v-model="formData.email"
              :has-error="hasError"
              type="email"
              placeholder="you@example.com"
              autocomplete="email"
              @blur="onBlur"
            />
          </template>
        </AppFormField>

        <!-- Password field -->
        <AppFormField
          input-id="password"
          label="Password"
          :errors="errors.password"
          :on-blur="blurHandler('password')"
        >
          <template #default="{ inputId, hasError, onBlur }">
            <AppFormInput
              :id="inputId"
              v-model="formData.password"
              :has-error="hasError"
              type="password"
              placeholder="At least 8 characters"
              :autocomplete="isSignIn ? 'current-password' : 'new-password'"
              @blur="onBlur"
            />
          </template>
        </AppFormField>

        <!-- General form error -->
        <div v-if="formError" class="text-error text-sm mb-4" role="alert">
          {{ formError }}
        </div>

        <button
          type="submit"
          class="btn-primary w-full mt-2"
          :disabled="isSubmitting"
          :aria-busy="isSubmitting"
        >
          <span v-if="isSubmitting" class="spinner mr-2" aria-hidden="true" />
          {{ isSignIn ? "Sign in" : "Sign up" }}
        </button>
      </form>

      <p class="text-label font-link-secondary text-gray-500 text-center mt-4">
        {{ isSignIn ? "Don't have an account?" : "Already have an account?" }}
        <a
          href="#"
          class="font-link text-primary hover:underline"
          @click.prevent="toggleMode"
        >
          {{ isSignIn ? "Sign up" : "Sign in" }}
        </a>
      </p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: false, // allow unauthenticated access
});

const {
  isSignIn,
  formData,
  errors,
  formError,
  isSubmitting,
  submit,
  toggleMode,
  blurHandler,
} = useAuthForm();
</script>
```

**Note:** The spinner element is optional. You can add a simple CSS spinner inside the button when `isSubmitting` is true. Example spinner class:

```css
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid white;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

Place that in `main.css` or a component style.

---

## Summary

We have now built:

- Reusable form components (`AppFormField`, `AppFormInput`, `AppFormLabel`, `AppFormError`) that are fully accessible and error‑aware.
- Zod‑based validation schemas (`signInSchema`, `signUpSchema`).
- `useFormValidation` composable for reactive field/whole‑form validation.
- `useAuthForm` composable that manages form state, toggling, submission, and error handling.
- A clean `auth.vue` page that uses these pieces.

All interactions (blur validation, submit validation, API error mapping, loading state) are handled gracefully, and the design system remains intact. You can now integrate this into your Nuxt 4 project seamlessly.
