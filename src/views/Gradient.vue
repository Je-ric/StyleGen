<template>
  <GeneratorLayout title="Gradient Generator" subtitle="Create smooth linear and radial gradients instantly">
    <div class="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5">
      <!-- Preview + output -->
      <div class="sg-card p-6 flex flex-col gap-4">
        <span class="sg-section-title">Preview</span>
        <div class="flex-1 min-h-64 rounded-xl border-2 border-dashed flex items-center justify-center text-xs"
          style="border-color:rgba(255,255,255,0.4);color:rgba(255,255,255,0.7)"
          :style="{ background: gradientValue }">
          Preview
        </div>
        <CodeOutput :code="css" />
      </div>

      <!-- Controls -->
      <div class="sg-card p-5 flex flex-col gap-4">
        <p class="sg-label">Type</p>
        <SelectRow v-model="s.type" label="Type" :options="['linear','radial']" />

        <p class="sg-label">Colors</p>
        <ColorRow v-model="s.color1" label="Color 1" />
        <ColorRow v-model="s.color2" label="Color 2" />
        <button @click="shuffle" class="sg-btn sg-btn-ghost w-full">
          <i class="bx bx-shuffle"></i> Shuffle
        </button>

        <p class="sg-label">Presets</p>
        <div class="grid grid-cols-6 gap-1.5">
          <div v-for="(p, i) in GRADIENT_PRESETS" :key="i"
            class="aspect-square rounded-lg cursor-pointer border hover:scale-110 transition-transform"
            style="border-color:var(--border)"
            :style="{ background: `linear-gradient(45deg, ${p.color1}, ${p.color2})` }"
            @click="s.color1 = p.color1; s.color2 = p.color2">
          </div>
        </div>

        <p class="sg-label">Properties</p>
        <SliderRow v-model="s.opacity" label="Opacity" :max="1" :step="0.1" />
        <SliderRow v-model="s.angle" label="Angle" :max="360" unit="°" />
      </div>
    </div>
  </GeneratorLayout>
</template>

<script setup>
import { reactive, computed } from 'vue'
import GeneratorLayout from '../components/layouts/GeneratorLayout.vue'
import SliderRow from '../components/ui/SliderRow.vue'
import SelectRow from '../components/ui/SelectRow.vue'
import ColorRow from '../components/ui/ColorRow.vue'
import CodeOutput from '../components/ui/CodeOutput.vue'
import { buildGradientCSS, randomHex, GRADIENT_PRESETS } from '../utils/gradientGen.js'

const s = reactive({ type: 'linear', color1: '#000000', color2: '#ffffff', opacity: 1, angle: 45 })

const gradientValue = computed(() => buildGradientCSS(s).grad)
const css = computed(() => buildGradientCSS(s).css)

function shuffle() { s.color1 = randomHex(); s.color2 = randomHex() }
</script>
