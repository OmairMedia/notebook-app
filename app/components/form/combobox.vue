<template>
  <div
    class="relative"
    :class="{ 'input-error': hasError }"
    @keydown.esc="closeListbox"
    @keydown.down.prevent="focusNext"
    @keydown.up.prevent="focusPrev"
    @keydown.enter.prevent="selectHighlighted"
  >
    <!-- Hidden native select for form submission if needed (optional) -->
    <input
      :id="id"
      ref="inputRef"
      v-model="inputValue"
      type="text"
      role="combobox"
      :aria-expanded="open"
      aria-haspopup="listbox"
      :aria-activedescendant="activeId"
      :aria-autocomplete="autoComplete"
      :aria-controls="`${id}-listbox`"
      :aria-label="label"
      :class="['input-field pr-10', { 'input-error': hasError }]"
      :placeholder="placeholder"
      autocomplete="off"
      @focus="openListbox"
      @input="onInput"
      @blur="handleBlur"
      v-bind="$attrs"
    />

    <!-- Dropdown arrow -->
    <button
      type="button"
      tabindex="-1"
      class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
      @click="toggleListbox"
      :aria-label="open ? 'Close suggestions' : 'Open suggestions'"
    >
      <svg
        class="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M6 8l4 4 4-4"
        />
      </svg>
    </button>

    <!-- Listbox popup -->
    <ul
      v-show="open"
      :id="`${id}-listbox`"
      ref="listboxRef"
      role="listbox"
      :aria-label="`${label} suggestions`"
      class="absolute z-20 w-full mt-1 bg-white border border-medium-gray rounded-input shadow-elevated max-h-60 overflow-auto"
      @mousedown.prevent
    >
      <li
        v-if="filteredOptions.length === 0"
        class="px-4 py-2 text-gray-500 text-sm"
      >
        No results found
      </li>
      <li
        v-for="(option, index) in filteredOptions"
        :key="option.value"
        :id="`${id}-option-${index}`"
        role="option"
        :aria-selected="isSelected(option)"
        :class="[
          'px-4 py-2 cursor-pointer text-sm',
          activeIndex === index ? 'bg-very-light-blue' : '',
          isSelected(option) ? 'font-bold' : '',
        ]"
        @click="selectOption(option)"
        @mouseenter="activeIndex = index"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";
import type { ComboboxProps } from "@/types/components";

const props = defineProps<ComboboxProps>();

const emit = defineEmits(["update:modelValue", "blur", "input"]);

const inputValue = ref("");
const open = ref(false);
const activeIndex = ref(0);
const inputRef = ref(null);
const listboxRef = ref(null);

// Map value to label for initial display
const selectedOption = computed(() =>
  props.options.find((opt) => opt.value === props.modelValue),
);

// Sync input value when modelValue changes externally
watch(
  () => props.modelValue,
  (newVal) => {
    const opt = props.options.find((o) => o.value === newVal);
    inputValue.value = opt ? opt.label : "";
  },
);

// Initialize input with current selection
if (selectedOption.value) {
  inputValue.value = selectedOption.value.label;
}

const filteredOptions = computed(() => {
  if (!inputValue.value) return props.options;
  const query = inputValue.value.toLowerCase();
  return props.options.filter((opt) => opt.label.toLowerCase().includes(query));
});

const activeId = computed(() => {
  if (!open.value || filteredOptions.value.length === 0) return undefined;
  return `${props.id}-option-${activeIndex.value}`;
});

function openListbox() {
  open.value = true;
  activeIndex.value = 0;
}

function closeListbox() {
  open.value = false;
}

function toggleListbox() {
  open.value = !open.value;
  if (open.value) activeIndex.value = 0;
}

function focusNext() {
  if (!open.value) return;
  activeIndex.value = (activeIndex.value + 1) % filteredOptions.value.length;
  scrollToActive();
}

function focusPrev() {
  if (!open.value) return;
  activeIndex.value =
    (activeIndex.value - 1 + filteredOptions.value.length) %
    filteredOptions.value.length;
  scrollToActive();
}

function selectHighlighted() {
  if (!open.value) return;
  const option = filteredOptions.value[activeIndex.value];
  if (option) selectOption(option);
}

function selectOption(option) {
  inputValue.value = option.label;
  emit("update:modelValue", option.value);
  emit("input", option.value); // extra event for compatibility
  closeListbox();
}

function onInput(event) {
  open.value = true;
  activeIndex.value = 0;
  emit("input", event.target.value);
}

function isSelected(option) {
  return option.value === props.modelValue;
}

function handleBlur() {
  // Delay to allow click on listbox
  setTimeout(() => {
    if (document.activeElement !== inputRef.value) {
      closeListbox();
      // If typed text doesn't match any option, optionally clear or revert
      const match = props.options.find(
        (opt) => opt.label.toLowerCase() === inputValue.value.toLowerCase(),
      );
      if (!match && inputValue.value !== "") {
        // Revert to last selected or clear
        inputValue.value = selectedOption.value
          ? selectedOption.value.label
          : "";
        emit(
          "update:modelValue",
          selectedOption.value ? selectedOption.value.value : null,
        );
      }
      emit("blur");
    }
  }, 150);
}

function scrollToActive() {
  nextTick(() => {
    const el = document.getElementById(
      `${props.id}-option-${activeIndex.value}`,
    );
    if (el) el.scrollIntoView({ block: "nearest" });
  });
}
</script>

<!-- 
<AppFormField
  input-id="language"
  label="Language"
  :errors="errors.language"
  :on-blur="blurHandler('language')"
>
  <template #default="{ inputId, hasError, onBlur }">
    <AppCombobox
      :id="inputId"
      v-model="formData.language"
      :options="[
        { value: 'js', label: 'JavaScript' },
        { value: 'ts', label: 'TypeScript' },
        { value: 'py', label: 'Python' },
      ]"
      :has-error="hasError"
      placeholder="Search a language..."
      @blur="onBlur"
    />
  </template>
</AppFormField>
-->
