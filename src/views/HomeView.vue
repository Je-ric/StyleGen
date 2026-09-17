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
        <a href="https://github.com/Je-ric" target="_blank" rel="noopener noreferrer"
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
    <main ref="toolsSection" class="tool-directory flex-1 w-full px-4 sm:px-6 lg:px-8 py-10">
      <div class="directory-heading">
        <div><span class="sg-label">YOUR CSS TOOLBOX</span><h2 class="directory-title">What will you create?</h2><p>Choose a tool, fine-tune the details, and copy your CSS.</p></div>
        <label class="tool-search"><i class="bx bx-search" aria-hidden="true"></i><span class="sr-only">Search generators</span><input v-model="query" type="search" placeholder="Search tools, e.g. shadow" /></label>
      </div>
      <div class="tool-filters" aria-label="Filter generators">
        <button v-for="item in categories" :key="item" class="filter-chip" :class="{ active: category === item }" :aria-pressed="category === item" @click="category = item">{{ item }}</button>
        <button class="filter-chip favorites-filter" :class="{ active: favoritesOnly }" :aria-pressed="favoritesOnly" @click="favoritesOnly = !favoritesOnly"><span aria-hidden="true">&#9733;</span> Favorites <span>{{ favorites.length }}</span></button>
      </div>
      <div class="mb-6 flex items-center gap-3">
        <h2 class="text-sm font-bold uppercase tracking-widest" style="color:var(--text-light)">{{ favoritesOnly ? "Favorite generators" : category === "All" ? "All generators" : category }}</h2>
        <div class="flex-1 h-px" style="background:var(--border)"></div>
        <span class="text-xs font-bold px-2 py-0.5 rounded-full" style="background:#dcfce7;color:#15803d">
          {{ filteredGenerators.length }}
        </span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        <GeneratorCard v-for="gen in filteredGenerators" :key="gen.path" :gen="gen" :favorite="favorites.includes(gen.path)" @toggle-favorite="toggleFavorite(gen.path)" />
      </div>
      <div v-if="!filteredGenerators.length" class="empty-tools" role="status"><i class="bx bx-search" aria-hidden="true"></i><h3>No tools found</h3><p>{{ favoritesOnly ? 'Save tools with the star button, or adjust your filters.' : 'Try a different keyword or category.' }}</p><button class="sg-btn sg-btn-primary" @click="resetFilters">Reset filters</button></div>
      <p class="results-summary" role="status">Showing {{ filteredGenerators.length }} of {{ generators.length }} generators</p>
      <p v-if="storageError" role="status" class="results-summary">Favorites are available for this session only because browser storage is unavailable.</p>
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
import { computed, ref, watch } from 'vue'
import { generators } from '../data/generators.js'
import GeneratorCard from '../components/generators/GeneratorCard.vue'

const query = ref('')
const category = ref('All')
const favoritesOnly = ref(false)
const storageError = ref(false)
const categories = ['All', 'Color & effects', 'Layout', 'Typography', 'Details']
const groups = {
  'Color & effects': ['color-picker', 'gradient', 'shadow', 'filter', 'glassmorphism'],
  Layout: ['flexbox', 'grid', 'spacing', 'transform'],
  Typography: ['typography', 'text-decoration'],
  Details: ['border', 'radius', 'scrollbar', 'cursor'],
}
function readFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem('stylegen:favorites') || '[]')
    return Array.isArray(saved) ? [...new Set(saved.filter(path => generators.some(gen => gen.path === path)))] : []
  } catch { storageError.value = true; return [] }
}
const favorites = ref(readFavorites())
watch(favorites, value => {
  try { localStorage.setItem('stylegen:favorites', JSON.stringify(value)) }
  catch { storageError.value = true }
})
const filteredGenerators = computed(() => generators.filter(gen => {
  const matchesCategory = category.value === 'All' || groups[category.value].includes(gen.path.split('/').pop())
  return matchesCategory && (!favoritesOnly.value || favorites.value.includes(gen.path)) &&
    `${gen.name} ${gen.desc}`.toLowerCase().includes(query.value.trim().toLowerCase())
}))
function toggleFavorite(path) {
  favorites.value = favorites.value.includes(path) ? favorites.value.filter(item => item !== path) : [...favorites.value, path]
}
function resetFilters() { query.value = ''; category.value = 'All'; favoritesOnly.value = false }
const toolsSection = ref(null)
function scrollToTools() {
  toolsSection.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>
