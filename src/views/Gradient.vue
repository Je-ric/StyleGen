<template>
  <GeneratorLayout title="Gradient Generator" subtitle="Create smooth linear and radial gradients instantly"
    :css="css" :tailwind="tw">
    <template #presets>
      <div v-for="(p, i) in GRADIENT_PRESETS" :key="i"
        class="w-7 h-7 rounded-lg cursor-pointer border-2 hover:scale-110 transition-transform shrink-0"
        style="border-color:var(--border)"
        :style="{ background: `linear-gradient(45deg, ${p.color1}, ${p.color2})` }"
        @click="s.color1 = p.color1; s.color2 = p.color2">
      </div>
    </template>

    <div class="hidden md:grid grid-cols-[220px_1fr_220px] gap-5 items-start">

      <!-- Left: Type + Colors -->
      <div class="flex flex-col gap-4">
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Type</p>
          <div class="flex gap-2">
            <button v-for="t in ['linear','radial']" :key="t" @click="s.type = t"
              :class="['sg-preset-btn flex-1 justify-center capitalize', s.type === t ? '!bg-green-100 !border-green-500 !text-green-700' : '']">
              {{ t }}
            </button>
          </div>
        </div>
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Colors</p>
          <ColorRow v-model="s.color1" label="Color 1" />
          <ColorRow v-model="s.color2" label="Color 2" />
          <button @click="shuffle" class="sg-btn sg-btn-ghost w-full justify-center">
            <i class="bx bx-shuffle"></i> Shuffle
          </button>
        </div>
      </div>

      <!-- Center: Preview + actions -->
      <div class="sg-card p-5 flex flex-col gap-4">
        <span class="sg-section-title">Preview</span>
        <div class="flex-1 min-h-72 rounded-xl border-2 border-dashed flex items-center justify-center text-xs font-medium transition-all duration-300"
          style="border-color:rgba(255,255,255,0.5);color:rgba(255,255,255,0.8)"
          :style="{ background: gradientValue }">
          Preview
        </div>
        <button @click="reset" class="sg-btn sg-btn-ghost w-full justify-center">
          <i class="bx bx-reset"></i> Reset
        </button>
      </div>

      <!-- Right: Properties -->
      <div class="sg-card p-4 flex flex-col gap-3">
        <p class="sg-label">Properties</p>
        <SliderRow v-model="s.opacity" label="Opacity" :max="1" :step="0.1" />
        <SliderRow v-model="s.angle" label="Angle" :max="360" unit="°" />
        <div v-if="s.type === 'linear'" class="flex flex-col gap-2 pt-1">
          <p class="sg-label">Quick Direction</p>
          <div class="grid grid-cols-4 gap-1.5">
            <button v-for="(deg, label) in DIRECTIONS" :key="label" @click="s.angle = deg"
              :class="['sg-preset-btn justify-center', s.angle === deg ? '!bg-green-100 !border-green-500 !text-green-700' : '']">
              {{ label }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile -->
    <div class="md:hidden flex flex-col gap-4">
      <div class="sg-card p-4 flex flex-col gap-3">
        <ColorRow v-model="s.color1" label="Color 1" />
        <ColorRow v-model="s.color2" label="Color 2" />
        <SliderRow v-model="s.angle" label="Angle" :max="360" unit="°" />
      </div>
      <div class="sg-card p-4 flex flex-col gap-3">
        <div class="w-full min-h-40 rounded-xl" :style="{ background: gradientValue }"></div>
        <button @click="reset" class="sg-btn sg-btn-ghost w-full justify-center"><i class="bx bx-reset"></i> Reset</button>
      </div>
    </div>
  </GeneratorLayout>
</template>

<script setup>
import { reactive, computed } from 'vue'
import GeneratorLayout from '../components/layouts/GeneratorLayout.vue'
import SliderRow from '../components/ui/SliderRow.vue'
import ColorRow from '../components/ui/ColorRow.vue'
import { buildGradientCSS, buildGradientTailwind, randomHex, GRADIENT_PRESETS } from '../utils/gradientGen.js'

const DEFAULTS = { type: 'linear', color1: '#000000', color2: '#ffffff', opacity: 1, angle: 45 }
const s = reactive({ ...DEFAULTS })
const DIRECTIONS = { '↑':0, '↗':45, '→':90, '↘':135, '↓':180, '↙':225, '←':270, '↖':315 }

const gradientValue = computed(() => buildGradientCSS(s).grad)
const css = computed(() => buildGradientCSS(s).css)
const tw  = computed(() => buildGradientTailwind(s))

function shuffle() { s.color1 = randomHex(); s.color2 = randomHex() }
function reset() { Object.assign(s, DEFAULTS) }
</script>
