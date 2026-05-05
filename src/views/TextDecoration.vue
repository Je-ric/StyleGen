<template>
  <GeneratorLayout title="Text Decoration" subtitle="Style text with underline, overline, and transform tools">
    <div class="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">
      <!-- Preview + output -->
      <div class="sg-card p-6 flex flex-col gap-4">
        <span class="sg-section-title">Preview</span>
        <div class="flex-1 min-h-40 flex items-center justify-center bg-slate-50 rounded-xl border text-3xl font-semibold"
          style="border-color:var(--border)" :style="previewStyle">
          {{ customText || 'Sample Text' }}
        </div>
        <div>
          <label class="sg-label">Custom Text</label>
          <input v-model="customText" type="text" placeholder="Enter your text…" class="sg-input" />
        </div>
        <CodeOutput :code="css" />
      </div>

      <!-- Controls -->
      <div class="sg-card p-5 flex flex-col gap-4">
        <p class="sg-label">Presets</p>
        <div class="flex flex-col gap-2">
          <button v-for="(p, i) in TEXT_DECORATION_PRESETS" :key="i"
            @click="applyPreset(p)"
            class="sg-btn sg-btn-ghost text-left text-xs py-2"
            :style="{ textDecoration: p.decoration, textDecorationStyle: p.style, textDecorationColor: p.color, textDecorationThickness: p.thickness + 'px' }">
            {{ p.decoration }} / {{ p.style }}
          </button>
        </div>

        <p class="sg-label mt-2">Controls</p>
        <SelectRow v-model="s.decoration" label="Decoration" :options="TEXT_DECORATION_OPTIONS" />
        <SelectRow v-model="s.style" label="Line Style" :options="LINE_STYLE_OPTIONS" />
        <ColorRow v-model="s.color" label="Color" />
        <div class="flex items-center gap-3">
          <label class="text-sm font-medium min-w-[100px]" style="color:var(--text-dark)">Thickness:</label>
          <input type="number" v-model.number="s.thickness" min="1" max="20" class="sg-input w-20 text-sm" />
          <span class="text-sm" style="color:var(--text-light)">px</span>
        </div>
      </div>
    </div>
  </GeneratorLayout>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import GeneratorLayout from '../components/layouts/GeneratorLayout.vue'
import SelectRow from '../components/ui/SelectRow.vue'
import ColorRow from '../components/ui/ColorRow.vue'
import CodeOutput from '../components/ui/CodeOutput.vue'
import { buildTextDecorationCSS, TEXT_DECORATION_OPTIONS, LINE_STYLE_OPTIONS, TEXT_DECORATION_PRESETS } from '../utils/textDecorationGen.js'

const customText = ref('Sample Text')
const s = reactive({ decoration: 'underline', style: 'solid', color: '#6366f1', thickness: 2 })

const previewStyle = computed(() => ({
  textDecoration: s.decoration,
  textDecorationStyle: s.style,
  textDecorationColor: s.color,
  textDecorationThickness: s.thickness + 'px',
}))

const css = computed(() => buildTextDecorationCSS(s))

function applyPreset(p) { Object.assign(s, p) }
</script>
