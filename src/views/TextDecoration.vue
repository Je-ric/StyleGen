<template>
  <GeneratorLayout title="Text Decoration" subtitle="Style text with underline, overline, and transform tools"
    :css="css" :tailwind="tw">
    <template #presets>
      <button v-for="(p, i) in TEXT_DECORATION_PRESETS" :key="i"
        @click="applyPreset(p)" class="sg-preset-btn"
        :style="{ textDecoration: p.decoration, textDecorationStyle: p.style, textDecorationColor: p.color, textDecorationThickness: p.thickness + 'px' }">
        {{ p.decoration.split(' ')[0] }} / {{ p.style }}
      </button>
    </template>

    <div class="hidden md:grid grid-cols-[220px_1fr_220px] gap-5 items-start">

      <!-- Left: Decoration options -->
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

      <!-- Center: Preview + actions -->
      <div class="sg-card p-5 flex flex-col gap-4">
        <span class="sg-section-title">Preview</span>
        <div class="flex-1 flex justify-center items-center min-h-48 bg-slate-50 rounded-xl border text-3xl font-semibold px-4 text-center"
          style="border-color:var(--border)" :style="previewStyle">
          {{ customText || 'Sample Text' }}
        </div>
        <!-- Actions below preview -->
        <div class="flex flex-col gap-2">
          <label class="sg-label">Custom Text</label>
          <input v-model="customText" type="text" placeholder="Enter your text…" class="sg-input" />
        </div>
        <button @click="reset" class="sg-btn sg-btn-ghost w-full justify-center">
          <i class="bx bx-reset"></i> Reset
        </button>
      </div>

      <!-- Right: Line style + Color + Thickness -->
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
            <label class="text-sm font-medium min-w-[90px] shrink-0" style="color:var(--text-dark)">Thickness</label>
            <input type="number" v-model.number="s.thickness" min="1" max="20" class="sg-input w-20 text-sm" />
            <span class="text-sm" style="color:var(--text-light)">px</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile -->
    <div class="md:hidden flex flex-col gap-4">
      <div class="sg-card p-4 flex flex-col gap-3">
        <div class="flex justify-center items-center min-h-32 bg-slate-50 rounded-xl text-2xl font-semibold px-4 text-center" :style="previewStyle">
          {{ customText || 'Sample Text' }}
        </div>
        <input v-model="customText" type="text" placeholder="Custom text…" class="sg-input" />
        <button @click="reset" class="sg-btn sg-btn-ghost w-full justify-center"><i class="bx bx-reset"></i> Reset</button>
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

const DEFAULTS = { decoration: 'underline', style: 'solid', color: '#6366f1', thickness: 2 }
const customText = ref('Sample Text')
const s = reactive({ ...DEFAULTS })

const previewStyle = computed(() => ({
  textDecoration: s.decoration,
  textDecorationStyle: s.style,
  textDecorationColor: s.color,
  textDecorationThickness: s.thickness + 'px',
}))

const css = computed(() => buildTextDecorationCSS(s))
const tw  = computed(() => buildTextDecorationTailwind(s))

function applyPreset(p) { Object.assign(s, p) }
function reset() { Object.assign(s, DEFAULTS); customText.value = 'Sample Text' }
</script>
