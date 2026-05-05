<template>
  <GeneratorLayout title="Transform Generator" subtitle="Scale, rotate, translate, and skew elements visually">
    <div class="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">
      <!-- Preview + output -->
      <div class="sg-card p-6 flex flex-col gap-4">
        <span class="sg-section-title">Preview</span>
        <div class="flex justify-center items-center min-h-72 bg-slate-50 rounded-xl border overflow-hidden" style="border-color:var(--border)">
          <div class="w-32 h-32 rounded-xl flex items-center justify-center text-sm font-semibold text-white transition-all duration-200"
            style="background:var(--primary)" :style="{ transform: transformValue }">
            Box
          </div>
        </div>
        <button @click="reset" class="sg-btn sg-btn-ghost w-fit">
          <i class="bx bx-reset"></i> Reset
        </button>
        <CodeOutput :code="css" />
      </div>

      <!-- Controls -->
      <div class="sg-card p-5 flex flex-col gap-3">
        <SliderRow v-model="s.scale" label="Scale" :min="0" :max="3" :step="0.1" />
        <SliderRow v-model="s.rotate" label="Rotate" :min="-180" :max="180" unit="deg" />
        <SliderRow v-model="s.translateX" label="Translate X" :min="-100" :max="100" unit="px" />
        <SliderRow v-model="s.translateY" label="Translate Y" :min="-100" :max="100" unit="px" />
        <SliderRow v-model="s.skewX" label="Skew X" :min="-45" :max="45" unit="deg" />
        <SliderRow v-model="s.skewY" label="Skew Y" :min="-45" :max="45" unit="deg" />
      </div>
    </div>
  </GeneratorLayout>
</template>

<script setup>
import { reactive, computed } from 'vue'
import GeneratorLayout from '../components/layouts/GeneratorLayout.vue'
import SliderRow from '../components/ui/SliderRow.vue'
import CodeOutput from '../components/ui/CodeOutput.vue'
import { buildTransformCSS, TRANSFORM_DEFAULTS } from '../utils/transformGen.js'

const s = reactive({ ...TRANSFORM_DEFAULTS })

const transformValue = computed(() =>
  `scale(${s.scale}) rotate(${s.rotate}deg) translate(${s.translateX}px, ${s.translateY}px) skew(${s.skewX}deg, ${s.skewY}deg)`
)
const css = computed(() => buildTransformCSS(s))

function reset() { Object.assign(s, TRANSFORM_DEFAULTS) }
</script>
