<template>
  <div class="card w-full max-w-lg">
    <h2 class="text-h2 font-h2 leading-h2 mb-6">
      {{ isSignIn ? "Sign in to your account" : "Create your account" }}
    </h2>

    <form @submit.prevent="submit" novalidate>
      <!-- Name field (only for sign up) -->
      <FormField
        v-if="!isSignIn"
        input-id="name"
        label="Full name"
        :errors="errors.name"
        :on-blur="blurHandler('name')"
      >
        <template #default="{ inputId, hasError, onBlur }">
          <FormInput
            :id="inputId"
            v-model="formData.name"
            :has-error="hasError"
            type="text"
            placeholder="John Doe"
            autocomplete="name"
            @blur="onBlur"
          />
        </template>
      </FormField>

      <!-- Email field -->
      <FormField
        input-id="email"
        label="Email"
        :errors="errors.email"
        :on-blur="blurHandler('email')"
      >
        <template #default="{ inputId, hasError, onBlur }">
          <FormInput
            :id="inputId"
            v-model="formData.email"
            :has-error="hasError"
            type="email"
            placeholder="you@example.com"
            autocomplete="email"
            @blur="onBlur"
          />
        </template>
      </FormField>

      <!-- Password field -->
      <FormField
        input-id="password"
        label="Password"
        :errors="errors.password"
        :on-blur="blurHandler('password')"
      >
        <template #default="{ inputId, hasError, onBlur }">
          <FormInput
            :id="inputId"
            v-model="formData.password"
            :has-error="hasError"
            type="password"
            placeholder="At least 8 characters"
            :autocomplete="isSignIn ? 'current-password' : 'new-password'"
            @blur="onBlur"
          />
        </template>
      </FormField>

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
</template>

<script setup>
definePageMeta({
  layout: "auth",
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
