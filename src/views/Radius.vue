<template>
  <GeneratorLayout title="Border Radius Generator" subtitle="Adjust corner radius with per-corner visual controls">
    <div class="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">
      <!-- Preview + output -->
      <div class="sg-card p-6 flex flex-col gap-4">
        <span class="sg-section-title">Preview</span>
        <div class="flex justify-center items-center min-h-64 bg-slate-50 rounded-xl border" style="border-color:var(--border)">
          <div class="w-48 h-48 flex items-center justify-center text-sm transition-all duration-300"
            style="color:var(--text-light)" :style="previewStyle">
            Preview
          </div>
        </div>
        <div class="flex flex-wrap gap-2">
          <button v-for="(_, name) in RADIUS_PRESETS" :key="name" @click="applyPreset(name)"
            class="sg-btn sg-btn-ghost sg-btn-sm capitalize">{{ name }}</button>
        </div>
        <CodeOutput :code="css" />
      </div>

      <!-- Controls -->
      <div class="sg-card p-5 flex flex-col gap-3">
        <p class="sg-label">Corner Radius</p>
        <SliderRow v-model="s.tl" label="Top Left" unit="px" />
        <SliderRow v-model="s.tr" label="Top Right" unit="px" />
        <SliderRow v-model="s.br" label="Bottom Right" unit="px" />
        <SliderRow v-model="s.bl" label="Bottom Left" unit="px" />

        <p class="sg-label mt-2">Border & Background</p>
        <SliderRow v-model="s.borderWidth" label="Border Width" :max="10" unit="px" />
        <ColorRow v-model="s.borderColor" label="Border Color" />
        <ColorRow v-model="s.bgColor" label="Background" />
      </div>
    </div>
  </GeneratorLayout>
</template>

<script setup>
import { reactive, computed } from 'vue'
import GeneratorLayout from '../components/layouts/GeneratorLayout.vue'
import SliderRow from '../components/ui/SliderRow.vue'
import ColorRow from '../components/ui/ColorRow.vue'
import CodeOutput from '../components/ui/CodeOutput.vue'
import { buildRadiusCSS, RADIUS_PRESETS } from '../utils/radiusGen.js'

const s = reactive({ tl: 0, tr: 0, br: 0, bl: 0, borderWidth: 3, borderColor: '#000000', bgColor: '#ffffff' })

const previewStyle = computed(() => ({
  borderRadius: `${s.tl}px ${s.tr}px ${s.br}px ${s.bl}px`,
  borderWidth: s.borderWidth + 'px',
  borderStyle: 'solid',
  borderColor: s.borderColor,
  backgroundColor: s.bgColor,
}))

const css = computed(() => buildRadiusCSS(s))

function applyPreset(name) {
  const p = RADIUS_PRESETS[name]
  Object.assign(s, p)
  if (name === 'reset') Object.assign(s, { borderWidth: 3, borderColor: '#000000', bgColor: '#ffffff' })
}
</script>
