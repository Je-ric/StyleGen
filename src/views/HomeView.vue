<template>
  <div class="min-h-screen flex flex-col" style="background:var(--bg)">
    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10 px-8 md:px-12 py-5 flex justify-between items-center" style="border-color:var(--border)">
      <div class="text-2xl font-semibold flex items-center gap-2" style="color:var(--primary);font-family:'Oswald',sans-serif">
        <i class="bx bx-palette text-2xl"></i>
        <span>StyleGen</span>
      </div>
      <nav class="flex items-center gap-6">
        <a href="#" class="text-sm font-medium transition-colors" style="color:var(--text-dark)" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-dark)'">Home</a>
        <a href="https://github.com/Je-ric" target="_blank" class="flex items-center gap-2 text-sm font-medium transition-colors" style="color:var(--text-dark)" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-dark)'">
          <i class="bx bxl-github text-xl"></i>
          <span>GitHub</span>
        </a>
      </nav>
    </header>

    <!-- Hero -->
    <section class="flex flex-wrap items-center justify-center gap-8 px-6 py-20 md:px-8">
      <div class="flex-1 min-w-[300px] max-w-[600px]">
        <h1 class="text-4xl md:text-5xl font-semibold mb-4" style="color:var(--text-dark);font-family:'Oswald',sans-serif">
          Generate CSS Styles Instantly.
        </h1>
        <p class="text-lg leading-relaxed mb-8" style="color:var(--text-light)">
          StyleGen brings together all your favorite design generators — borders, gradients, shadows, filters, and more.
        </p>
        <button @click="scrollToTools" class="sg-btn sg-btn-primary px-8 py-3 text-base">
          Explore Tools
        </button>
      </div>
    </section>

    <!-- Tools grid -->
    <section ref="toolsSection" class="py-16 px-6 text-center" style="background:linear-gradient(to bottom, var(--bg), #fff, var(--bg))">
      <h2 class="text-3xl md:text-4xl font-semibold mb-3" style="color:var(--text-dark);font-family:'Oswald',sans-serif">All Style Generators</h2>
      <p class="mb-12 text-base md:text-lg" style="color:var(--text-light)">Customize every CSS property visually with ease.</p>
      <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-6xl mx-auto text-left">
        <GeneratorCard v-for="gen in generators" :key="gen.path" :gen="gen" />
      </div>
    </section>

    <!-- Footer -->
    <footer class="text-white text-center py-5 text-sm tracking-wide mt-auto" style="background:var(--primary)">
      © 2024-2025 StyleGen | Je-ric
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { generators } from '../data/generators.js'
import GeneratorCard from '../components/generators/GeneratorCard.vue'

const toolsSection = ref(null)
function scrollToTools() {
  toolsSection.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>
