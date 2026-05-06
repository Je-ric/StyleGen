<template>
  <div class="min-h-screen flex flex-col" style="background:var(--bg)">

    <!-- Header -->
    <header class="bg-white border-b sticky top-0 z-50 px-6 py-4 flex items-center justify-between"
      style="border-color:var(--border);box-shadow:var(--shadow-sm)">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg flex items-center justify-center text-white text-lg"
          style="background:linear-gradient(135deg,#15803d,#22c55e)">
          <i class="bx bx-palette"></i>
        </div>
        <span class="text-xl font-bold tracking-tight" style="color:var(--text-dark)">
          Style<span style="color:var(--primary)">Gen</span>
        </span>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-xs font-medium px-2.5 py-1 rounded-full" style="background:#dcfce7;color:#15803d">
          {{ generators.length }} generators
        </span>
        <a href="https://github.com/Je-ric" target="_blank"
          class="text-sm font-medium transition-colors flex items-center gap-1.5"
          style="color:var(--text-light)"
          onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-light)'">
          <i class="bx bxl-github text-lg"></i>
          <span class="hidden sm:inline">@Je-ric</span>
        </a>
      </div>
    </header>

    <!-- Hero -->
    <section class="relative overflow-hidden py-14 px-6 text-center"
      style="background:linear-gradient(135deg,#052e16 0%,#14532d 40%,#166534 70%,#15803d 100%)">
      <div class="absolute inset-0 pointer-events-none opacity-10"
        style="background-image:radial-gradient(circle,#22c55e22 1px,transparent 1px);background-size:28px 28px"></div>
      <div class="relative z-10 max-w-2xl mx-auto">
        <span class="inline-flex items-center gap-2 text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest"
          style="background:rgba(22,163,74,0.25);color:#86efac">
          <span class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block"></span>
          CSS Generator Suite
        </span>
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Generate CSS Styles <span style="color:#4ade80">Instantly.</span>
        </h1>
        <p class="text-lg mb-8 font-medium" style="color:#bbf7d0">
          {{ generators.length }} visual generators — borders, gradients, shadows, filters, and more.
        </p>
        <button @click="scrollToTools"
          class="inline-flex items-center gap-2 font-bold px-7 py-3 rounded-xl text-white transition-all"
          style="background:linear-gradient(90deg,#15803d,#22c55e)"
          onmouseover="this.style.filter='brightness(1.1)'" onmouseout="this.style.filter=''">
          Explore Tools <i class="bx bx-down-arrow-alt text-lg"></i>
        </button>
      </div>
    </section>

    <!-- Generators grid -->
    <main ref="toolsSection" class="flex-1 w-full px-4 sm:px-6 lg:px-8 py-10">
      <div class="mb-6 flex items-center gap-3">
        <h2 class="text-sm font-bold uppercase tracking-widest" style="color:var(--text-light)">All Generators</h2>
        <div class="flex-1 h-px" style="background:var(--border)"></div>
        <span class="text-xs font-bold px-2 py-0.5 rounded-full" style="background:#dcfce7;color:#15803d">
          {{ generators.length }}
        </span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        <GeneratorCard v-for="gen in generators" :key="gen.path" :gen="gen" />
      </div>
    </main>

    <!-- Footer -->
    <footer class="text-center py-5 text-sm border-t" style="border-color:var(--border);color:var(--text-light)">
      StyleGen · {{ generators.length }} generators ·
      <a href="https://github.com/Je-ric" class="font-semibold transition-colors" style="color:var(--primary)"
        onmouseover="this.style.color='var(--primary-dark)'" onmouseout="this.style.color='var(--primary)'">@Je-ric (Hiro)</a>
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
