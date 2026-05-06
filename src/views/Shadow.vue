<template>
  <GeneratorLayout title="Shadow Generator" subtitle="Customize box shadows for subtle or bold depth effects"
    :css="css" :tailwind="tw">
    <template #presets>
      <button v-for="(_, name) in SHADOW_PRESETS" :key="name" @click="applyPreset(name)" class="sg-preset-btn capitalize">{{ name }}</button>
      <button @click="applyPreset('reset')" class="sg-preset-btn">Reset</button>
    </template>

    <!-- md+: 3-col -->
    <div class="hidden md:grid grid-cols-[240px_1fr_240px] gap-5 items-start">

      <!-- Left: Shadow controls -->
      <div class="sg-card p-4 flex flex-col gap-3">
        <p class="sg-label">Shadow</p>
        <ColorRow v-model="s.color" label="Color" />
        <SliderRow v-model="s.h" label="Horizontal" :min="-50" :max="50" unit="px" />
        <SliderRow v-model="s.v" label="Vertical" :min="-50" :max="50" unit="px" />
        <SliderRow v-model="s.blur" label="Blur" :max="100" unit="px" />
        <SliderRow v-model="s.spread" label="Spread" :min="-50" :max="100" unit="px" />
        <div class="flex items-center gap-3 mt-1">
          <label class="text-sm font-medium" style="color:var(--text-dark)">Inset:</label>
          <input type="checkbox" v-model="s.inset" class="w-4 h-4 cursor-pointer accent-green-600" />
        </div>
      </div>

      <!-- Center: Preview -->
      <div class="sg-card p-6 flex flex-col gap-4 items-center">
        <span class="sg-section-title w-full">Preview</span>
        <div class="flex-1 w-full flex justify-center items-center min-h-72 bg-slate-50 rounded-xl border" style="border-color:var(--border)">
          <div class="w-48 h-48 flex items-center justify-center text-sm font-medium transition-all duration-200"
            style="color:var(--text-light)" :style="previewStyle">
            Preview
          </div>
        </div>
      </div>

      <!-- Right: Border + Background -->
      <div class="flex flex-col gap-4">
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Border Sides</p>
          <div class="grid grid-cols-2 gap-1.5">
            <button v-for="side in ['top','right','bottom','left']" :key="side"
              @click="toggleSide(side)"
              :class="['sg-preset-btn capitalize', s.borderSides.includes(side) ? '!bg-green-100 !border-green-500 !text-green-700' : '']">
              {{ side }}
            </button>
          </div>
          <ColorRow v-model="s.borderColor" label="Color" />
          <SelectRow v-model="s.borderStyle" label="Style" :options="BORDER_STYLES" />
          <SliderRow v-model="s.borderSize" label="Size" :max="25" unit="px" />
        </div>
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Shape & Background</p>
          <SliderRow v-model="s.borderRadius" label="Radius" :max="100" unit="px" />
          <ColorRow v-model="s.bgColor" label="Background" />
        </div>
      </div>
    </div>

    <!-- Mobile: stacked -->
    <div class="md:hidden flex flex-col gap-4">
      <div class="sg-card p-4 flex flex-col gap-3">
        <p class="sg-label">Shadow</p>
        <ColorRow v-model="s.color" label="Color" />
        <SliderRow v-model="s.h" label="H" :min="-50" :max="50" unit="px" />
        <SliderRow v-model="s.v" label="V" :min="-50" :max="50" unit="px" />
        <SliderRow v-model="s.blur" label="Blur" :max="100" unit="px" />
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
import SelectRow from '../components/ui/SelectRow.vue'
import ColorRow from '../components/ui/ColorRow.vue'
import { buildShadowCSS, buildShadowTailwind, SHADOW_PRESETS, BORDER_STYLES } from '../utils/shadowGen.js'

const s = reactive({
  h: 0, v: 0, blur: 10, spread: 0, color: '#000000', inset: false,
  borderSides: [], borderSize: 1, borderStyle: 'solid', borderColor: '#000000',
  borderRadius: 0, bgColor: '#ffffff',
})

function toggleSide(side) {
  const i = s.borderSides.indexOf(side)
  i === -1 ? s.borderSides.push(side) : s.borderSides.splice(i, 1)
}

function applyPreset(name) {
  if (name === 'reset') {
    Object.assign(s, { h:0, v:0, blur:10, spread:0, color:'#000000', inset:false, borderSides:[], borderSize:1, borderStyle:'solid', borderColor:'#000000', borderRadius:0, bgColor:'#ffffff' })
    return
  }
  Object.assign(s, SHADOW_PRESETS[name])
}

const previewStyle = computed(() => {
  const shadow = `${s.inset ? 'inset ' : ''}${s.h}px ${s.v}px ${s.blur}px ${s.spread}px ${s.color}`
  const style = { backgroundColor: s.bgColor, borderRadius: s.borderRadius + 'px', boxShadow: shadow }
  s.borderSides.forEach(side => {
    style[`border${side[0].toUpperCase() + side.slice(1)}Width`] = s.borderSize + 'px'
    style[`border${side[0].toUpperCase() + side.slice(1)}Style`] = s.borderStyle
    style[`border${side[0].toUpperCase() + side.slice(1)}Color`] = s.borderColor
  })
  return style
})

const css = computed(() => buildShadowCSS(s))
const tw  = computed(() => buildShadowTailwind(s))
</script>
