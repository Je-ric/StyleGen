<template>
  <GeneratorLayout title="Border Generator" subtitle="Design stylish borders with color, width, and style">
    <div class="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
      <!-- Preview -->
      <div class="sg-card p-6 flex flex-col gap-4">
        <span class="sg-section-title">Preview</span>
        <div class="flex justify-center items-center min-h-64 bg-slate-50 rounded-xl border" style="border-color:var(--border)">
          <div class="w-48 h-48 flex items-center justify-center text-sm" style="color:var(--text-light)" :style="previewStyle">
            Preview
          </div>
        </div>
        <CodeOutput :code="css" />
      </div>

      <!-- Controls -->
      <div class="sg-card p-5 flex flex-col gap-5 overflow-y-auto max-h-[80vh]">
        <div v-for="side in sides" :key="side.key">
          <p class="sg-label">{{ side.label }}</p>
          <SliderRow v-model="state[side.key + 'W']" label="Width" :max="25" unit="px" />
          <SelectRow v-model="state[side.key + 'Style']" label="Style" :options="BORDER_STYLES" />
          <ColorRow v-model="state[side.key + 'Color']" label="Color" />
        </div>
        <div>
          <p class="sg-label">All Borders</p>
          <SliderRow v-model="allWidth" label="Width" :max="25" unit="px" />
          <ColorRow v-model="allColor" label="Color" />
        </div>
        <div>
          <p class="sg-label">Background</p>
          <ColorRow v-model="state.bgColor" label="Color" />
        </div>
      </div>
    </div>
  </GeneratorLayout>
</template>

<script setup>
import { reactive, computed, watch } from 'vue'
import GeneratorLayout from '../components/layouts/GeneratorLayout.vue'
import SliderRow from '../components/ui/SliderRow.vue'
import SelectRow from '../components/ui/SelectRow.vue'
import ColorRow from '../components/ui/ColorRow.vue'
import CodeOutput from '../components/ui/CodeOutput.vue'
import { buildBorderCSS, BORDER_STYLES } from '../utils/borderGen.js'

const sides = [
  { key: 'top',    label: 'Top Border'    },
  { key: 'right',  label: 'Right Border'  },
  { key: 'bottom', label: 'Bottom Border' },
  { key: 'left',   label: 'Left Border'   },
]

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

const previewStyle = computed(() => ({
  borderTop:    `${state.topW}px ${state.topStyle} ${state.topColor}`,
  borderRight:  `${state.rightW}px ${state.rightStyle} ${state.rightColor}`,
  borderBottom: `${state.bottomW}px ${state.bottomStyle} ${state.bottomColor}`,
  borderLeft:   `${state.leftW}px ${state.leftStyle} ${state.leftColor}`,
  backgroundColor: state.bgColor,
}))

const css = computed(() => buildBorderCSS(state))
</script>
