<template>
  <select
    :id="id"
    :value="modelValue"
    :aria-invalid="hasError ? true : undefined"
    :aria-describedby="hasError ? `${id}-error` : undefined"
    :class="[
      'input-field appearance-none bg-no-repeat pr-10', // custom arrow
      { 'input-error': hasError },
    ]"
    @change="$emit('update:modelValue', $event.target.value)"
    @blur="$emit('blur')"
    v-bind="$attrs"
  >
    <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      :disabled="option.disabled"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script setup>
defineProps({
  id: { type: String, required: true },
  modelValue: { type: [String, Number, null], default: null },
  options: {
    type: Array,
    required: true,
    validator: (opts) => opts.every((opt) => "value" in opt && "label" in opt),
  },
  placeholder: { type: String, default: "" },
  hasError: { type: Boolean, default: false },
});

defineEmits(["update:modelValue", "blur"]);
</script>

<style scoped>
/* Custom dropdown arrow (using a background SVG) */
select.input-field {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}
</style>

<!-- 
<AppFormField
  input-id="country"
  label="Country"
  :errors="errors.country"
  :on-blur="blurHandler('country')"
>
  <template #default="{ inputId, hasError, onBlur }">
    <AppSelect
      :id="inputId"
      v-model="formData.country"
      :options="[
        { value: 'us', label: 'United States' },
        { value: 'ca', label: 'Canada' },
      ]"
      :has-error="hasError"
      placeholder="Choose a country"
      @blur="onBlur"
    />
  </template>
</AppFormField> -->
