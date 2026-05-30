import { reactive, ref } from "vue";
import type { ValidationErrors } from "~/types/forms";

export function useFormValidation(schema: any) {
  const errors: ValidationErrors = reactive({});
  const dirtyFields = reactive({}); // track fields that ever had a non‑empty value

  // Helper to always get the current schema value
  const getSchema = () => unref(schema);

  const markDirty = (fieldName) => {
    dirtyFields[fieldName] = true;
  };

  const isDirty = (fieldName) => dirtyFields[fieldName];

  const resetErrors = () => {
    Object.keys(errors).forEach((key) => delete errors[key]);
  };

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

  return { errors, validateField, validateForm, resetErrors, markDirty };
}
