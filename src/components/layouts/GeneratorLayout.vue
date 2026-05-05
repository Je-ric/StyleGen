<template>
  <div class="min-h-screen flex flex-col" style="background:var(--bg)">
    <!-- Top bar -->
    <div class="bg-white border-b px-4 sm:px-6 py-3 flex items-center gap-3 sticky top-0 z-10" style="border-color:var(--border)">
      <router-link to="/" class="inline-flex items-center gap-1.5 text-sm font-medium transition-colors shrink-0"
        style="color:var(--text-light)" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-light)'">
        <i class="bx bx-arrow-back"></i>
        <span class="hidden sm:inline">Back</span>
      </router-link>
      <div class="w-px h-5" style="background:var(--border)"></div>
      <div class="min-w-0 flex-1">
        <h1 class="text-base font-bold leading-tight truncate" style="font-family:'Oswald',sans-serif;color:var(--text-dark)">{{ title }}</h1>
        <p v-if="subtitle" class="text-xs truncate hidden sm:block" style="color:var(--text-light)">{{ subtitle }}</p>
      </div>
    </div>

    <!-- Body -->
    <div class="flex-1 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-5">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({ title: String, subtitle: String })
</script>
