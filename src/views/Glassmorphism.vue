<template>
  <GeneratorLayout title="Glassmorphism Generator" subtitle="backdrop-filter, rgba background, border, and shadow combined"
    :css="css" :tailwind="tw">
    <template #presets>
      <button v-for="(_, name) in GLASS_PRESETS" :key="name" @click="applyPreset(name)" class="sg-preset-btn capitalize">{{ name }}</button>
    </template>

    <div class="hidden md:grid grid-cols-[220px_1fr_220px] gap-5 items-start">

      <!-- Left: Background + Blur -->
      <div class="flex flex-col gap-4">
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Background</p>
          <ColorRow v-model="s.bgColor" label="Color" />
          <SliderRow v-model="s.bgOpacity" label="Opacity" :max="1" :step="0.01" />
        </div>
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Blur & Saturate</p>
          <SliderRow v-model="s.blur"     label="Blur"     :max="40"  unit="px" />
          <SliderRow v-model="s.saturate" label="Saturate" :max="300" unit="%" />
        </div>
      </div>

      <!-- Center: Preview + reset -->
      <div class="sg-card p-5 flex flex-col gap-4">
        <span class="sg-section-title">Preview</span>
        <!-- Colorful background to show glass effect -->
        <div class="flex-1 flex justify-center items-center min-h-72 rounded-xl overflow-hidden relative"
          style="background:linear-gradient(135deg,#6366f1,#ec4899,#f59e0b)">
          <!-- Decorative blobs -->
          <div class="absolute w-32 h-32 rounded-full opacity-60" style="background:#fff;top:10%;left:10%;filter:blur(20px)"></div>
          <div class="absolute w-24 h-24 rounded-full opacity-40" style="background:#f59e0b;bottom:15%;right:15%;filter:blur(15px)"></div>
          <!-- Glass card -->
          <div class="relative z-10 w-56 p-6 flex flex-col gap-2 transition-all duration-200" :style="glassStyle">
            <div class="w-8 h-8 rounded-full bg-white/30 mb-1"></div>
            <div class="h-2 rounded-full bg-white/40 w-3/4"></div>
            <div class="h-2 rounded-full bg-white/30 w-1/2"></div>
            <div class="h-2 rounded-full bg-white/20 w-2/3 mt-1"></div>
            <div class="mt-2 px-3 py-1.5 rounded-lg text-xs font-bold text-white/80 w-fit" style="background:rgba(255,255,255,0.2)">Button</div>
          </div>
        </div>
        <button @click="reset" class="sg-btn sg-btn-ghost w-full justify-center">
          <i class="bx bx-reset"></i> Reset
        </button>
      </div>

      <!-- Right: Border + Shadow + Radius -->
      <div class="flex flex-col gap-4">
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Border</p>
          <SliderRow v-model="s.borderWidth"   label="Width"   :max="4"  unit="px" />
          <SliderRow v-model="s.borderOpacity" label="Opacity" :max="1"  :step="0.01" />
        </div>
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Shadow</p>
          <SliderRow v-model="s.shadowV"       label="Offset"  :max="40" unit="px" />
          <SliderRow v-model="s.shadowBlur"    label="Blur"    :max="80" unit="px" />
          <SliderRow v-model="s.shadowOpacity" label="Opacity" :max="1"  :step="0.01" />
        </div>
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Shape</p>
          <SliderRow v-model="s.radius" label="Radius" :max="40" unit="px" />
        </div>
      </div>
    </div>

    <!-- Mobile -->
    <div class="md:hidden flex flex-col gap-4">
      <div class="sg-card p-4 flex flex-col gap-3">
        <ColorRow v-model="s.bgColor" label="BG Color" />
        <SliderRow v-model="s.bgOpacity" label="Opacity" :max="1" :step="0.01" />
        <SliderRow v-model="s.blur" label="Blur" :max="40" unit="px" />
        <SliderRow v-model="s.radius" label="Radius" :max="40" unit="px" />
      </div>
      <div class="sg-card p-4 flex flex-col gap-3">
        <div class="flex justify-center items-center min-h-48 rounded-xl overflow-hidden relative"
          style="background:linear-gradient(135deg,#6366f1,#ec4899,#f59e0b)">
          <div class="relative z-10 w-40 p-4 flex flex-col gap-2" :style="glassStyle">
            <div class="h-2 rounded-full bg-white/40 w-3/4"></div>
            <div class="h-2 rounded-full bg-white/30 w-1/2"></div>
          </div>
        </div>
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
import { buildGlassCSS, buildGlassTailwind, GLASS_PRESETS, hexToRgb } from '../utils/glassGen.js'

const DEFAULTS = { bgColor:'#ffffff', bgOpacity:0.15, blur:12, saturate:180, borderWidth:1, borderOpacity:0.3, radius:16, shadowV:8, shadowBlur:32, shadowOpacity:0.15 }
const s = reactive({ ...DEFAULTS })

const glassStyle = computed(() => {
  const { r, g, b } = hexToRgb(s.bgColor)
  return {
    background: `rgba(${r},${g},${b},${s.bgOpacity})`,
    backdropFilter: `blur(${s.blur}px) saturate(${s.saturate}%)`,
    WebkitBackdropFilter: `blur(${s.blur}px) saturate(${s.saturate}%)`,
    border: `${s.borderWidth}px solid rgba(${r},${g},${b},${s.borderOpacity})`,
    borderRadius: s.radius + 'px',
    boxShadow: `0 ${s.shadowV}px ${s.shadowBlur}px rgba(0,0,0,${s.shadowOpacity})`,
  }
})

function applyPreset(name) { Object.assign(s, GLASS_PRESETS[name]) }
function reset() { Object.assign(s, DEFAULTS) }

const css = computed(() => buildGlassCSS(s))
const tw  = computed(() => buildGlassTailwind(s))
</script>
