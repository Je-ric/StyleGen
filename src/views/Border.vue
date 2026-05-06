<template>
  <GeneratorLayout title="Border Generator" subtitle="Design stylish borders with color, width, and style"
    :css="css" :tailwind="tw">
    <template #presets>
      <button @click="applyAll(1,'solid','#000000','#ffffff')" class="sg-preset-btn">Default</button>
      <button @click="applyAll(3,'dashed','#16a34a','#f0fdf4')" class="sg-preset-btn">Dashed Green</button>
      <button @click="applyAll(4,'double','#6366f1','#eef2ff')" class="sg-preset-btn">Double Indigo</button>
      <button @click="applyAll(2,'dotted','#f43f5e','#fff1f2')" class="sg-preset-btn">Dotted Rose</button>
    </template>

    <!-- md+: 3-col layout -->
    <div class="hidden md:grid grid-cols-[240px_1fr_240px] gap-5 items-start">

      <!-- Left: Top + Right borders -->
      <div class="flex flex-col gap-4">
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Top Border</p>
          <SliderRow v-model="state.topW" label="Width" :max="25" unit="px" />
          <SelectRow v-model="state.topStyle" label="Style" :options="BORDER_STYLES" />
          <ColorRow v-model="state.topColor" label="Color" />
        </div>
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Right Border</p>
          <SliderRow v-model="state.rightW" label="Width" :max="25" unit="px" />
          <SelectRow v-model="state.rightStyle" label="Style" :options="BORDER_STYLES" />
          <ColorRow v-model="state.rightColor" label="Color" />
        </div>
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">All Borders</p>
          <SliderRow v-model="allWidth" label="Width" :max="25" unit="px" />
          <ColorRow v-model="allColor" label="Color" />
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

      <!-- Right: Bottom + Left + Background -->
      <div class="flex flex-col gap-4">
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Bottom Border</p>
          <SliderRow v-model="state.bottomW" label="Width" :max="25" unit="px" />
          <SelectRow v-model="state.bottomStyle" label="Style" :options="BORDER_STYLES" />
          <ColorRow v-model="state.bottomColor" label="Color" />
        </div>
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Left Border</p>
          <SliderRow v-model="state.leftW" label="Width" :max="25" unit="px" />
          <SelectRow v-model="state.leftStyle" label="Style" :options="BORDER_STYLES" />
          <ColorRow v-model="state.leftColor" label="Color" />
        </div>
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Background</p>
          <ColorRow v-model="state.bgColor" label="Color" />
        </div>
      </div>
    </div>

    <!-- Mobile: stacked -->
    <div class="md:hidden flex flex-col gap-4">
      <div class="sg-card p-4 flex flex-col gap-3">
        <p class="sg-label">All Borders</p>
        <SliderRow v-model="allWidth" label="Width" :max="25" unit="px" />
        <ColorRow v-model="allColor" label="Color" />
        <SelectRow v-model="state.topStyle" label="Style" :options="BORDER_STYLES" />
      </div>
      <div class="sg-card p-4 flex justify-center items-center min-h-48 bg-slate-50">
        <div class="w-36 h-36 flex items-center justify-center text-sm" style="color:var(--text-light)" :style="previewStyle">Preview</div>
      </div>
      <div class="sg-card p-4 flex flex-col gap-3">
        <p class="sg-label">Background</p>
        <ColorRow v-model="state.bgColor" label="Color" />
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
import { buildBorderCSS, buildBorderTailwind, BORDER_STYLES } from '../utils/borderGen.js'

const state = reactive({
  topW: 5,    topStyle: 'solid',    topColor: '#000000',
  rightW: 5,  rightStyle: 'solid',  rightColor: '#000000',
  bottomW: 5, bottomStyle: 'solid', bottomColor: '#000000',
  leftW: 5,   leftStyle: 'solid',   leftColor: '#000000',
  bgColor: '#ffffff',
})

const allWidth = computed({
  get: () => state.topW,
  set: v => { state.topW = state.rightW = state.bottomW = state.leftW = v },
})
const allColor = computed({
  get: () => state.topColor,
  set: v => { state.topColor = state.rightColor = state.bottomColor = state.leftColor = v },
})

function applyAll(w, style, color, bg) {
  state.topW = state.rightW = state.bottomW = state.leftW = w
  state.topStyle = state.rightStyle = state.bottomStyle = state.leftStyle = style
  state.topColor = state.rightColor = state.bottomColor = state.leftColor = color
  state.bgColor = bg
}

const previewStyle = computed(() => ({
  borderTop:    `${state.topW}px ${state.topStyle} ${state.topColor}`,
  borderRight:  `${state.rightW}px ${state.rightStyle} ${state.rightColor}`,
  borderBottom: `${state.bottomW}px ${state.bottomStyle} ${state.bottomColor}`,
  borderLeft:   `${state.leftW}px ${state.leftStyle} ${state.leftColor}`,
  backgroundColor: state.bgColor,
}))

const css = computed(() => buildBorderCSS(state))
const tw  = computed(() => buildBorderTailwind(state))
</script>

<style>
.sg-preset-btn {
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1.5px solid var(--border-md);
  background: var(--bg-card);
  color: var(--text-light);
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}
.sg-preset-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
  background: #dcfce7;
}
</style>
