<template>
  <GeneratorLayout title="Text Decoration" subtitle="Style text with underline, overline, and transform tools"
    :css="css" :tailwind="tw">
    <template #presets>
      <button v-for="(p, i) in TEXT_DECORATION_PRESETS" :key="i"
        @click="applyPreset(p)"
        class="sg-preset-btn"
        :style="{ textDecoration: p.decoration, textDecorationStyle: p.style, textDecorationColor: p.color, textDecorationThickness: p.thickness + 'px' }">
        {{ p.decoration.split(' ')[0] }} / {{ p.style }}
      </button>
    </template>

    <!-- md+: 3-col -->
    <div class="hidden md:grid grid-cols-[220px_1fr_220px] gap-5 items-start">

      <!-- Left: Decoration + Style -->
      <div class="flex flex-col gap-4">
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Decoration</p>
          <div class="flex flex-col gap-1.5">
            <button v-for="opt in TEXT_DECORATION_OPTIONS" :key="opt"
              @click="s.decoration = opt"
              :class="['sg-preset-btn text-left', s.decoration === opt ? '!bg-green-100 !border-green-500 !text-green-700' : '']">
              {{ opt }}
            </button>
          </div>
        </div>
      </div>

      <!-- Center: Preview -->
      <div class="sg-card p-6 flex flex-col gap-4 items-center">
        <span class="sg-section-title w-full">Preview</span>
        <div class="flex-1 w-full flex justify-center items-center min-h-48 bg-slate-50 rounded-xl border text-3xl font-semibold"
          style="border-color:var(--border)" :style="previewStyle">
          {{ customText || 'Sample Text' }}
        </div>
        <div class="w-full">
          <label class="sg-label">Custom Text</label>
          <input v-model="customText" type="text" placeholder="Enter your text…" class="sg-input" />
        </div>
      </div>

      <!-- Right: Style + Color + Thickness -->
      <div class="flex flex-col gap-4">
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Line Style</p>
          <div class="flex flex-col gap-1.5">
            <button v-for="opt in LINE_STYLE_OPTIONS" :key="opt"
              @click="s.style = opt"
              :class="['sg-preset-btn text-left', s.style === opt ? '!bg-green-100 !border-green-500 !text-green-700' : '']">
              {{ opt }}
            </button>
          </div>
        </div>
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Color & Thickness</p>
          <ColorRow v-model="s.color" label="Color" />
          <div class="flex items-center gap-3">
            <label class="text-sm font-medium min-w-[80px]" style="color:var(--text-dark)">Thickness:</label>
            <input type="number" v-model.number="s.thickness" min="1" max="20" class="sg-input w-20 text-sm" />
            <span class="text-sm" style="color:var(--text-light)">px</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile: stacked -->
    <div class="md:hidden flex flex-col gap-4">
      <div class="sg-card p-4 flex justify-center items-center min-h-32 bg-slate-50 text-2xl font-semibold" :style="previewStyle">
        {{ customText || 'Sample Text' }}
      </div>
      <div class="sg-card p-4 flex flex-col gap-3">
        <SelectRow v-model="s.decoration" label="Decoration" :options="TEXT_DECORATION_OPTIONS" />
        <SelectRow v-model="s.style" label="Style" :options="LINE_STYLE_OPTIONS" />
        <ColorRow v-model="s.color" label="Color" />
      </div>
    </div>
  </GeneratorLayout>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import GeneratorLayout from '../components/layouts/GeneratorLayout.vue'
import SelectRow from '../components/ui/SelectRow.vue'
import ColorRow from '../components/ui/ColorRow.vue'
import { buildTextDecorationCSS, buildTextDecorationTailwind, TEXT_DECORATION_OPTIONS, LINE_STYLE_OPTIONS, TEXT_DECORATION_PRESETS } from '../utils/textDecorationGen.js'

const customText = ref('Sample Text')
const s = reactive({ decoration: 'underline', style: 'solid', color: '#6366f1', thickness: 2 })

const previewStyle = computed(() => ({
  textDecoration: s.decoration,
  textDecorationStyle: s.style,
  textDecorationColor: s.color,
  textDecorationThickness: s.thickness + 'px',
}))

const css = computed(() => buildTextDecorationCSS(s))
const tw  = computed(() => buildTextDecorationTailwind(s))

function applyPreset(p) { Object.assign(s, p) }
</script>
