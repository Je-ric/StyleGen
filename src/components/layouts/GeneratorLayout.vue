<template>
  <div class="min-h-screen flex flex-col" style="background:var(--bg)">
    <!-- Top bar -->
    <div class="bg-white border-b px-4 sm:px-6 py-3 flex items-center gap-3 sticky top-0 z-50"
      style="border-color:var(--border);box-shadow:var(--shadow-sm)">
      <router-link to="/" class="inline-flex items-center gap-1.5 text-sm font-medium transition-colors shrink-0"
        style="color:var(--text-light)"
        onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-light)'">
        <i class="bx bx-arrow-back"></i>
        <span class="hidden sm:inline">Back</span>
      </router-link>
      <div class="w-px h-5 shrink-0" style="background:var(--border)"></div>
      <div class="min-w-0 flex-1">
        <h1 class="text-base font-bold leading-tight truncate" style="font-family:'Oswald',sans-serif;color:var(--text-dark)">{{ title }}</h1>
        <p v-if="subtitle" class="text-xs truncate hidden sm:block" style="color:var(--text-light)">{{ subtitle }}</p>
      </div>

      <!-- Presets slot — shown inline in header -->
      <div v-if="$slots.presets" class="hidden md:flex items-center gap-1.5 shrink-0">
        <span class="text-xs font-semibold uppercase tracking-wider mr-1" style="color:var(--text-light)">Presets:</span>
        <slot name="presets" />
      </div>

      <!-- View CSS button -->
      <button @click="showModal = true"
        class="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg shrink-0 transition-all text-white"
        style="background:linear-gradient(90deg,#15803d,#22c55e)"
        onmouseover="this.style.filter='brightness(1.1)'" onmouseout="this.style.filter=''">
        <i class="bx bx-code-alt"></i>
        <span class="hidden sm:inline">View CSS</span>
      </button>
    </div>

    <!-- Mobile presets bar -->
    <div v-if="$slots.presets" class="md:hidden flex items-center gap-2 px-4 py-2 overflow-x-auto scrollbar-hide border-b"
      style="border-color:var(--border);background:var(--bg)">
      <span class="text-xs font-semibold uppercase tracking-wider shrink-0" style="color:var(--text-light)">Presets:</span>
      <slot name="presets" />
    </div>

    <!-- Body -->
    <div class="flex-1 w-full px-4 sm:px-6 py-6 flex flex-col gap-5">
      <slot />
    </div>

    <!-- CSS Modal -->
    <CSSModal :visible="showModal" :css="css" :tailwind="tailwind" @close="showModal = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CSSModal from '../ui/CSSModal.vue'

defineProps({
  title:    String,
  subtitle: String,
  css:      { type: String, default: '' },
  tailwind: { type: String, default: '' },
})

const showModal = ref(false)
</script>
