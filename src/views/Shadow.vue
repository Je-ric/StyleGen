<template>
  <GeneratorLayout title="Shadow Generator" subtitle="Customize box shadows for subtle or bold depth effects">
    <div class="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
      <!-- Preview + output -->
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
      <div class="sg-card p-5 flex flex-col gap-4 overflow-y-auto max-h-[80vh]">
        <!-- Presets -->
        <div>
          <p class="sg-label">Presets</p>
          <div class="flex flex-wrap gap-2">
            <button v-for="(_, name) in SHADOW_PRESETS" :key="name" @click="applyPreset(name)"
              class="sg-btn sg-btn-ghost sg-btn-sm capitalize">{{ name }}</button>
            <button @click="applyPreset('reset')" class="sg-btn sg-btn-ghost sg-btn-sm">Reset</button>
          </div>
        </div>

        <p class="sg-label">Shadow</p>
        <ColorRow v-model="s.color" label="Color" />
        <SliderRow v-model="s.h" label="Horizontal" :min="-50" :max="50" unit="px" />
        <SliderRow v-model="s.v" label="Vertical" :min="-50" :max="50" unit="px" />
        <SliderRow v-model="s.blur" label="Blur" :max="100" unit="px" />
        <SliderRow v-model="s.spread" label="Spread" :min="-50" :max="100" unit="px" />
        <div class="flex items-center gap-3">
          <label class="text-sm font-medium" style="color:var(--text-dark)">Inset:</label>
          <input type="checkbox" v-model="s.inset" class="w-4 h-4 cursor-pointer" />
        </div>

        <p class="sg-label mt-2">Border</p>
        <div class="flex flex-wrap gap-2 mb-2">
          <button v-for="side in ['top','right','bottom','left']" :key="side"
            @click="toggleSide(side)"
            :class="['sg-btn sg-btn-sm capitalize', s.borderSides.includes(side) ? 'sg-btn-primary' : 'sg-btn-ghost']">
            {{ side }}
          </button>
        </div>
        <ColorRow v-model="s.borderColor" label="Color" />
        <SelectRow v-model="s.borderStyle" label="Style" :options="BORDER_STYLES" />
        <SliderRow v-model="s.borderSize" label="Size" :max="25" unit="px" />
        <SliderRow v-model="s.borderRadius" label="Radius" :max="100" unit="px" />

        <p class="sg-label mt-2">Background</p>
        <ColorRow v-model="s.bgColor" label="Color" />
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
import { buildShadowCSS, SHADOW_PRESETS, BORDER_STYLES } from '../utils/shadowGen.js'

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
  if (s.borderSides.length) {
    s.borderSides.forEach(side => {
      style[`border${side[0].toUpperCase() + side.slice(1)}Width`] = s.borderSize + 'px'
      style[`border${side[0].toUpperCase() + side.slice(1)}Style`] = s.borderStyle
      style[`border${side[0].toUpperCase() + side.slice(1)}Color`] = s.borderColor
    })
  }
  return style
})

const css = computed(() => buildShadowCSS(s))
</script>
