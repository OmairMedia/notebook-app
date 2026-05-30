<template>
  <header>
    <!-- Top Navigation -->
    <nav
      class="bg-white border-b border-border-gray min-h-16 flex items-center justify-between px-[24px] py-[16px]"
    >
      <div class="text-h2 font-h2 leading-h2">Notebook App</div>
      <div class="flex items-center gap-3">
        <slot name="content" />
      </div>
    </nav>
  </header>
</template>
<script setup lang="ts"></script>
