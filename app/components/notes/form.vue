<template>
  <div class="max-w-3xl mx-auto px-8 mt-10">
    <form @submit.prevent="onSubmit" novalidate>
      <!-- Title -->
      <FormField
        input-id="title"
        label="Title"
        :errors="errors.title"
        :on-blur="blurHandler('title')"
      >
        <template #default="{ inputId, hasError, onBlur }">
          <FormInput
            :id="inputId"
            v-model="formData.title"
            :has-error="hasError"
            type="text"
            placeholder="Note #1"
            autocomplete="title"
            @blur="onBlur"
          />
        </template>
      </FormField>

      <!-- Body -->
      <FormField
        input-id="body"
        label="Body"
        :errors="errors.body"
        :on-blur="blurHandler('body')"
      >
        <template #default="{ inputId, hasError, onBlur }">
          <FormTextarea
            :id="inputId"
            v-model="formData.body"
            :has-error="hasError"
            type="text"
            autocomplete="body"
            rows="12"
            style="resize: vertical"
            @blur="onBlur"
            placeholder="Write here..."
          />
        </template>
      </FormField>

      <!-- General form error -->
      <div v-if="formError" class="text-error text-sm mb-4" role="alert">
        {{ formError }}
      </div>

      <SharedButton
        type="submit"
        class="w-full mt-2"
        :disabled="isSubmitting"
        :loading="isSubmitting"
        :aria-busy="isSubmitting"
        :text="isSubmitting ? 'Creating' : 'Create'"
      >
      </SharedButton>
    </form>
  </div>
</template>
<script setup lang="ts">
import type { Note } from "~/types/notes";

const {
  blurHandler,
  errors,
  formData,
  formError,
  isSubmitting,
  onSubmit,
  setFormMode,
  setFormData,
} = useNoteForm();

const props = withDefaults(
  defineProps<{
    mode?: string;
    note?: Note;
  }>(),
  {
    mode: "add",
  },
);

onMounted(() => {
  setFormMode(props.mode);
  if (props.mode === "edit") {
    setFormData({
      title: props.note?.title,
      body: props.note?.body,
    });
  }
});
</script>
