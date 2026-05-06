<template>
  <GeneratorLayout title="Border Radius Generator" subtitle="Adjust corner radius with per-corner visual controls"
    :css="css" :tailwind="tw">
    <template #presets>
      <button v-for="(_, name) in RADIUS_PRESETS" :key="name" @click="applyPreset(name)" class="sg-preset-btn capitalize">{{ name }}</button>
    </template>

    <!-- md+: 3-col -->
    <div class="hidden md:grid grid-cols-[220px_1fr_220px] gap-5 items-start">

      <!-- Left: TL + TR corners -->
      <div class="flex flex-col gap-4">
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Top Left</p>
          <SliderRow v-model="s.tl" label="Radius" unit="px" />
        </div>
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Bottom Left</p>
          <SliderRow v-model="s.bl" label="Radius" unit="px" />
        </div>
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Border</p>
          <SliderRow v-model="s.borderWidth" label="Width" :max="10" unit="px" />
          <ColorRow v-model="s.borderColor" label="Color" />
        </div>
      </div>

      <!-- Center: Preview -->
      <div class="sg-card p-6 flex flex-col gap-4 items-center">
        <span class="sg-section-title w-full">Preview</span>
        <div class="flex-1 w-full flex justify-center items-center min-h-72 bg-slate-50 rounded-xl border" style="border-color:var(--border)">
          <div class="w-48 h-48 flex items-center justify-center text-sm font-medium transition-all duration-300"
            style="color:var(--text-light)" :style="previewStyle">
            Preview
          </div>
        </div>
      </div>

      <!-- Right: BR + BL corners + Background -->
      <div class="flex flex-col gap-4">
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Top Right</p>
          <SliderRow v-model="s.tr" label="Radius" unit="px" />
        </div>
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Bottom Right</p>
          <SliderRow v-model="s.br" label="Radius" unit="px" />
        </div>
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Background</p>
          <ColorRow v-model="s.bgColor" label="Color" />
        </div>
      </div>
    </div>

    <!-- Mobile: stacked -->
    <div class="md:hidden flex flex-col gap-4">
      <div class="sg-card p-4 flex flex-col gap-3">
        <SliderRow v-model="s.tl" label="Top Left" unit="px" />
        <SliderRow v-model="s.tr" label="Top Right" unit="px" />
        <SliderRow v-model="s.br" label="Bottom Right" unit="px" />
        <SliderRow v-model="s.bl" label="Bottom Left" unit="px" />
      </div>
      <div class="sg-card p-4 flex justify-center items-center min-h-48 bg-slate-50">
        <div class="w-36 h-36 flex items-center justify-center text-sm transition-all" style="color:var(--text-light)" :style="previewStyle">Preview</div>
      </div>
    </div>
  </GeneratorLayout>
</template>

<script setup>
import { reactive, computed } from 'vue'
import GeneratorLayout from '../components/layouts/GeneratorLayout.vue'
import SliderRow from '../components/ui/SliderRow.vue'
import ColorRow from '../components/ui/ColorRow.vue'
import { buildRadiusCSS, buildRadiusTailwind, RADIUS_PRESETS } from '../utils/radiusGen.js'

const s = reactive({ tl: 0, tr: 0, br: 0, bl: 0, borderWidth: 3, borderColor: '#000000', bgColor: '#ffffff' })

const previewStyle = computed(() => ({
  borderRadius: `${s.tl}px ${s.tr}px ${s.br}px ${s.bl}px`,
  borderWidth: s.borderWidth + 'px',
  borderStyle: 'solid',
  borderColor: s.borderColor,
  backgroundColor: s.bgColor,
}))

const css = computed(() => buildRadiusCSS(s))
const tw  = computed(() => buildRadiusTailwind(s))

function applyPreset(name) {
  Object.assign(s, RADIUS_PRESETS[name])
  if (name === 'reset') Object.assign(s, { borderWidth: 3, borderColor: '#000000', bgColor: '#ffffff' })
}
</script>
