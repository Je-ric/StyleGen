<template>
  <GeneratorLayout title="Cursor Generator" subtitle="All 30+ CSS cursor types shown visually — click to select"
    :css="css" :tailwind="tw">

    <div class="hidden md:grid grid-cols-[1fr_260px] gap-5 items-start">

      <!-- Left: Cursor grid -->
      <div class="sg-card p-5 flex flex-col gap-5">
        <span class="sg-section-title">All Cursors — hover to preview, click to select</span>
        <div v-for="group in CURSOR_GROUPS" :key="group.label" class="flex flex-col gap-2">
          <p class="sg-label">{{ group.label }}</p>
          <div class="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2">
            <button v-for="c in group.cursors" :key="c"
              @click="selected = c"
              :style="{ cursor: c }"
              :class="['sg-preset-btn justify-center text-center text-[11px] py-2', selected === c ? '!bg-green-100 !border-green-500 !text-green-700' : '']">
              {{ c }}
            </button>
          </div>
        </div>
      </div>

      <!-- Right: Selected + preview box + reset -->
      <div class="flex flex-col gap-4 sticky top-20">
        <div class="sg-card p-5 flex flex-col gap-4">
          <span class="sg-section-title">Selected</span>
          <div class="flex items-center justify-center min-h-40 bg-slate-50 rounded-xl border text-sm font-medium transition-all"
            style="border-color:var(--border);color:var(--text-light)"
            :style="{ cursor: selected }">
            <div class="text-center">
              <i class="bx bx-mouse text-4xl block mb-2" style="color:var(--primary)"></i>
              <p class="font-bold text-base" style="color:var(--text-dark)">{{ selected }}</p>
              <p class="text-xs mt-1" style="color:var(--text-light)">Move your mouse here</p>
            </div>
          </div>
          <div class="sg-code text-xs">{{ css }}</div>
          <button @click="selected = 'default'" class="sg-btn sg-btn-ghost w-full justify-center">
            <i class="bx bx-reset"></i> Reset
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile -->
    <div class="md:hidden flex flex-col gap-4">
      <div class="sg-card p-4 flex flex-col gap-3">
        <div class="flex items-center justify-center min-h-32 bg-slate-50 rounded-xl border" style="border-color:var(--border)" :style="{ cursor: selected }">
          <p class="font-bold" style="color:var(--text-dark)">{{ selected }}</p>
        </div>
        <div class="sg-code text-xs">{{ css }}</div>
      </div>
      <div v-for="group in CURSOR_GROUPS" :key="group.label" class="sg-card p-4 flex flex-col gap-2">
        <p class="sg-label">{{ group.label }}</p>
        <div class="grid grid-cols-3 gap-1.5">
          <button v-for="c in group.cursors" :key="c"
            @click="selected = c"
            :style="{ cursor: c }"
            :class="['sg-preset-btn justify-center text-[10px]', selected === c ? '!bg-green-100 !border-green-500 !text-green-700' : '']">
            {{ c }}
          </button>
        </div>
      </div>
    </div>
  </GeneratorLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import GeneratorLayout from '../components/layouts/GeneratorLayout.vue'
import { buildCursorCSS, buildCursorTailwind, CURSOR_GROUPS } from '../utils/cursorGen.js'

const selected = ref('pointer')

const css = computed(() => buildCursorCSS(selected.value))
const tw  = computed(() => buildCursorTailwind(selected.value))
</script>
