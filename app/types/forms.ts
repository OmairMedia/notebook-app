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
