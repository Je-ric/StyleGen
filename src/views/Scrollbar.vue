<template>
  <GeneratorLayout title="Scrollbar Styler" subtitle="::-webkit-scrollbar CSS with live scrollable preview"
    :css="css" tailwind="">
    <template #presets>
      <button v-for="(_, name) in SCROLLBAR_PRESETS" :key="name" @click="applyPreset(name)" class="sg-preset-btn capitalize">{{ name }}</button>
    </template>

    <div class="hidden md:grid grid-cols-[220px_1fr_220px] gap-5 items-start">

      <!-- Left: Width + Radius -->
      <div class="flex flex-col gap-4">
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Size & Shape</p>
          <SliderRow v-model="s.width"       label="Width"        :max="24" unit="px" />
          <SliderRow v-model="s.radius"      label="Radius"       :max="99" unit="px" />
          <SliderRow v-model="s.thumbBorder" label="Thumb Border" :max="6"  unit="px" />
        </div>
      </div>

      <!-- Center: Preview + reset -->
      <div class="sg-card p-5 flex flex-col gap-4">
        <span class="sg-section-title">Preview</span>
        <div class="flex gap-4 flex-1 min-h-72">
          <!-- Vertical scrollbar preview -->
          <div class="flex-1 rounded-xl border overflow-y-scroll p-4 text-sm leading-relaxed"
            style="border-color:var(--border);max-height:288px"
            :style="scrollbarStyle">
            <p class="font-semibold mb-2" style="color:var(--text-dark)">Vertical Scroll</p>
            <p v-for="i in 20" :key="i" class="mb-1" style="color:var(--text-light)">
              Line {{ i }} — scroll to see the custom scrollbar in action.
            </p>
          </div>
          <!-- Horizontal scrollbar preview -->
          <div class="flex-1 rounded-xl border overflow-x-scroll p-4"
            style="border-color:var(--border);max-height:288px"
            :style="scrollbarStyle">
            <p class="font-semibold mb-2 whitespace-nowrap" style="color:var(--text-dark)">Horizontal Scroll →</p>
            <div class="flex gap-3">
              <div v-for="i in 12" :key="i"
                class="shrink-0 w-24 h-32 rounded-xl flex items-center justify-center text-xs font-bold text-white"
                :style="{ background: COLORS[(i-1) % COLORS.length] }">
                {{ i }}
              </div>
            </div>
          </div>
        </div>
        <button @click="reset" class="sg-btn sg-btn-ghost w-full justify-center">
          <i class="bx bx-reset"></i> Reset
        </button>
      </div>

      <!-- Right: Colors -->
      <div class="sg-card p-4 flex flex-col gap-3">
        <p class="sg-label">Colors</p>
        <ColorRow v-model="s.trackColor"      label="Track" />
        <ColorRow v-model="s.thumbColor"      label="Thumb" />
        <ColorRow v-model="s.thumbHoverColor" label="Hover" />
      </div>
    </div>

    <!-- Mobile -->
    <div class="md:hidden flex flex-col gap-4">
      <div class="sg-card p-4 flex flex-col gap-3">
        <SliderRow v-model="s.width"  label="Width"  :max="24" unit="px" />
        <SliderRow v-model="s.radius" label="Radius" :max="99" unit="px" />
        <ColorRow v-model="s.trackColor" label="Track" />
        <ColorRow v-model="s.thumbColor" label="Thumb" />
      </div>
      <div class="sg-card p-4 flex flex-col gap-3">
        <div class="rounded-xl border overflow-y-scroll p-3 text-sm" style="border-color:var(--border);max-height:200px" :style="scrollbarStyle">
          <p v-for="i in 15" :key="i" class="mb-1" style="color:var(--text-light)">Line {{ i }} — scroll me</p>
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
import { buildScrollbarCSS, SCROLLBAR_PRESETS } from '../utils/scrollbarGen.js'

const COLORS = ['#16a34a','#6366f1','#f43f5e','#f59e0b','#06b6d4','#8b5cf6']
const DEFAULTS = { width:6, trackColor:'#f0fdf4', thumbColor:'#86efac', thumbHoverColor:'#4ade80', radius:99, thumbBorder:0 }
const s = reactive({ ...DEFAULTS })

// Inject scoped scrollbar styles dynamically
const scrollbarStyle = computed(() => ({
  '--sb-width':        s.width + 'px',
  '--sb-track':        s.trackColor,
  '--sb-thumb':        s.thumbColor,
  '--sb-thumb-hover':  s.thumbHoverColor,
  '--sb-radius':       s.radius + 'px',
  '--sb-border':       s.thumbBorder + 'px',
}))

function applyPreset(name) { Object.assign(s, SCROLLBAR_PRESETS[name]) }
function reset() { Object.assign(s, DEFAULTS) }

const css = computed(() => buildScrollbarCSS(s))
</script>

<style>
/* Apply CSS vars to the preview scrollbars */
[style*="--sb-width"]::-webkit-scrollbar        { width: var(--sb-width); height: var(--sb-width); }
[style*="--sb-width"]::-webkit-scrollbar-track  { background: var(--sb-track); border-radius: var(--sb-radius); }
[style*="--sb-width"]::-webkit-scrollbar-thumb  { background: var(--sb-thumb); border-radius: var(--sb-radius); border: var(--sb-border) solid var(--sb-track); }
[style*="--sb-width"]::-webkit-scrollbar-thumb:hover { background: var(--sb-thumb-hover); }
</style>
