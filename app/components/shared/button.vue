<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :aria-busy="loading"
    class="button"
    :class="buttonClass"
    v-bind="$attrs"
  >
    <!-- Loading spinner -->
    <span v-if="loading" class="spinner" aria-hidden="true" />
    <!-- Leading icon slot -->
    <span v-if="!loading" class="inline-flex mr-2">
      <slot name="leading-icon" />
    </span>
    <span>{{ text }}</span>
    <!-- Trailing icon slot -->
    <span v-if="!loading" class="inline-flex ml-2">
      <slot name="trailing-icon" />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { ButtonProps } from "@/types/components";

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<ButtonProps>(), {
  loading: false,
  type: "button",
  variant: "primary",
  disabled: false,
  text: "",
});

const buttonClass = computed(() => {
  if (props.variant === "primary") return "btn-primary";
  if (props.variant === "secondary") return "btn-secondary";
  if (props.variant === "ghost") return "btn-ghost";
  return "btn-primary";
});
</script>
