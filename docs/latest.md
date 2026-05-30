We’ll create a robust type system for your notebook app that covers authentication, notes, reusable form components, and validation. These types are designed to work seamlessly with your Vue components, composables, and Zod schemas, ensuring type safety across the entire codebase.

---

## Directory Structure

```
types/
  auth.ts         # User, auth payloads, responses
  notes.ts        # Note entity, create/edit inputs, filters
  forms.ts        # Form field state, validation error map, generic form types
  components.ts   # Props for AppButton, AppFormField, AppSelect, AppCombobox, etc.
  index.ts        # Re‑exports everything
```

---

## 1. Auth Types – `types/auth.ts`

```typescript
export interface User {
  name?: string;
  email: string;
}

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token?: string; // optionally store JWT in real app
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
```

---

## 2. Notes Types – `types/notes.ts`

```typescript
export interface Note {
  id: string; // UUID
  title: string;
  body: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface CreateNoteInput {
  title: string;
  body: string;
}

export interface UpdateNoteInput {
  title?: string;
  body?: string;
}

export interface NoteFilters {
  search?: string;
  sortBy?: "createdAt" | "updatedAt" | "title";
  order?: "asc" | "desc";
}

// For optimistic updates or local state
export type NoteDraft = Partial<Note> & { title?: string; body?: string };
```

---

## 3. Generic Form & Validation Types – `types/forms.ts`

```typescript
import type { z } from "zod";

// A map of field name → array of error messages
export type ValidationErrors = Record<string, string[]>;

// Individual field state for useFormField or similar composable
export interface FieldState {
  value: string | number | null;
  isDirty: boolean;
  isTouched: boolean;
  errorMessages: string[];
}

// Generic form state that can be reused
export interface FormState<T extends Record<string, unknown>> {
  data: T;
  errors: ValidationErrors;
  isSubmitting: boolean;
  submitError: string | null;
}

// Helper to extract the inferred type from a Zod schema
export type ZodInfer<T extends z.ZodTypeAny> = z.infer<T>;
```

---

## 4. Component Props Types – `types/components.ts`

These types match the earlier reusable components exactly, so you can enforce them in your script setup if using TypeScript.

```typescript
// Button
export interface AppButtonProps {
  variant: "primary" | "secondary" | "ghost";
  type: "button" | "submit" | "reset";
  loading: boolean;
  disabled: boolean;
}

// FormInput
export interface AppFormInputProps {
  id: string;
  modelValue: string | number;
  type: "text" | "email" | "password" | "number" | "tel" | "url";
  hasError: boolean;
  placeholder?: string;
  autocomplete?: string;
}

// FormLabel
export interface AppFormLabelProps {
  forId: string;
}

// FormError
export interface AppFormErrorProps {
  inputId: string;
  errors: string[];
}

// FormField (wrapper)
export interface AppFormFieldProps {
  inputId: string;
  label: string;
  errors: string[];
  onBlur: () => void;
}

// AppSelect
export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface AppSelectProps {
  id: string;
  modelValue: string | number | null;
  options: SelectOption[];
  placeholder?: string;
  hasError: boolean;
}

// AppCombobox
export interface AppComboboxProps {
  id: string;
  modelValue: string | number | null;
  options: SelectOption[];
  label: string;
  placeholder?: string;
  hasError: boolean;
  autoComplete?: "list" | "both";
}
```

---

## 5. Re‑export Everything – `types/index.ts`

```typescript
export * from "./auth";
export * from "./notes";
export * from "./forms";
export * from "./components";
```

---

## Usage in Your App

### In Composables

```typescript
// composables/useAuthForm.ts
import type { SignInPayload, SignUpPayload } from '~/types/auth';
import type { ValidationErrors } from '~/types/forms';

export function useAuthForm() {
  const formData: SignInPayload & { name?: string } = reactive({ ... });
  const errors: ValidationErrors = reactive({});
  // ...
}
```

### In Components

```vue
<script setup lang="ts">
import type { AppFormInputProps } from "~/types/components";

const props = defineProps<AppFormInputProps>();
// ...
</script>
```

### Zod Schema Inference

```typescript
import { signInSchema } from "~/schemas/auth.schema";
import type { ZodInfer } from "~/types/forms";

type SignInFormData = ZodInfer<typeof signInSchema>;
// { email: string; password: string }
```

---

These types cover every entity, form, and reusable component in your notebook app. They’ll help you catch mistakes at compile time and make your composables and components self‑documenting. Once your project is ready to transition to full TypeScript, these definitions will be the foundation.
