<template>
  <GeneratorLayout title="Transform Generator" subtitle="Scale, rotate, translate, and skew elements visually"
    :css="css" :tailwind="'/* Tailwind uses arbitrary values for transforms */\n' + css.replace(';','')">
    <template #presets>
      <button @click="reset" class="sg-preset-btn">Reset</button>
      <button @click="Object.assign(s,{scale:1.5,rotate:0,translateX:0,translateY:0,skewX:0,skewY:0})" class="sg-preset-btn">Scale Up</button>
      <button @click="Object.assign(s,{scale:1,rotate:45,translateX:0,translateY:0,skewX:0,skewY:0})" class="sg-preset-btn">Rotate 45°</button>
      <button @click="Object.assign(s,{scale:1,rotate:0,translateX:0,translateY:0,skewX:15,skewY:0})" class="sg-preset-btn">Skew X</button>
    </template>

    <!-- md+: 3-col -->
    <div class="hidden md:grid grid-cols-[220px_1fr_220px] gap-5 items-start">

      <!-- Left: Scale + Rotate -->
      <div class="sg-card p-4 flex flex-col gap-3">
        <p class="sg-label">Scale & Rotate</p>
        <SliderRow v-model="s.scale" label="Scale" :min="0" :max="3" :step="0.1" />
        <SliderRow v-model="s.rotate" label="Rotate" :min="-180" :max="180" unit="deg" />
      </div>

      <!-- Center: Preview -->
      <div class="sg-card p-6 flex flex-col gap-4 items-center">
        <span class="sg-section-title w-full">Preview</span>
        <div class="flex-1 w-full flex justify-center items-center min-h-72 bg-slate-50 rounded-xl border overflow-hidden" style="border-color:var(--border)">
          <div class="w-32 h-32 rounded-xl flex items-center justify-center text-sm font-bold text-white transition-all duration-200"
            style="background:var(--primary)" :style="{ transform: transformValue }">
            Box
          </div>
        </div>
        <button @click="reset" class="sg-btn sg-btn-ghost w-full justify-center">
          <i class="bx bx-reset"></i> Reset All
        </button>
      </div>

      <!-- Right: Translate + Skew -->
      <div class="sg-card p-4 flex flex-col gap-3">
        <p class="sg-label">Translate</p>
        <SliderRow v-model="s.translateX" label="X" :min="-100" :max="100" unit="px" />
        <SliderRow v-model="s.translateY" label="Y" :min="-100" :max="100" unit="px" />
        <p class="sg-label mt-2">Skew</p>
        <SliderRow v-model="s.skewX" label="X" :min="-45" :max="45" unit="deg" />
        <SliderRow v-model="s.skewY" label="Y" :min="-45" :max="45" unit="deg" />
      </div>
    </div>

    <!-- Mobile: stacked -->
    <div class="md:hidden flex flex-col gap-4">
      <div class="sg-card p-4 flex justify-center items-center min-h-48 bg-slate-50 rounded-xl overflow-hidden">
        <div class="w-24 h-24 rounded-xl flex items-center justify-center text-sm font-bold text-white transition-all"
          style="background:var(--primary)" :style="{ transform: transformValue }">Box</div>
      </div>
      <div class="sg-card p-4 flex flex-col gap-3">
        <SliderRow v-model="s.scale" label="Scale" :min="0" :max="3" :step="0.1" />
        <SliderRow v-model="s.rotate" label="Rotate" :min="-180" :max="180" unit="deg" />
        <SliderRow v-model="s.translateX" label="Translate X" :min="-100" :max="100" unit="px" />
      </div>
    </div>
  </GeneratorLayout>
</template>

<script setup>
import { reactive, computed } from 'vue'
import GeneratorLayout from '../components/layouts/GeneratorLayout.vue'
import SliderRow from '../components/ui/SliderRow.vue'
import { buildTransformCSS, TRANSFORM_DEFAULTS } from '../utils/transformGen.js'

const s = reactive({ ...TRANSFORM_DEFAULTS })

const transformValue = computed(() =>
  `scale(${s.scale}) rotate(${s.rotate}deg) translate(${s.translateX}px, ${s.translateY}px) skew(${s.skewX}deg, ${s.skewY}deg)`
)
const css = computed(() => buildTransformCSS(s))

function reset() { Object.assign(s, TRANSFORM_DEFAULTS) }
</script>
