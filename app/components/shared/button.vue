<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :aria-busy="loading"
    :class="buttonClass"
    v-bind="$attrs"
  >
    <!-- Loading spinner -->
    <span v-if="loading" class="spinner" aria-hidden="true" />
    <!-- Leading icon slot -->
    <span v-if="$slots.icon && !loading" class="inline-flex mr-2">
      <slot name="icon" />
    </span>
    <slot />
  </button>
</template>

<script setup>
import { computed } from "vue";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (v) => ["primary", "secondary", "ghost"].includes(v),
  },
  type: {
    type: String,
    default: "button",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const buttonClass = computed(() => {
  const base = "btn";
  if (props.variant === "primary") return "btn-primary";
  if (props.variant === "secondary") return "btn-secondary";
  return "btn-ghost";
});
</script>

<style scoped></style>
