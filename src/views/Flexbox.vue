<template>
  <GeneratorLayout title="Flexbox Generator" subtitle="Visually build display:flex layouts with live preview"
    :css="css" :tailwind="tw">
    <template #presets>
      <button @click="applyPreset('row-center')"    class="sg-preset-btn">Row Center</button>
      <button @click="applyPreset('col-center')"    class="sg-preset-btn">Col Center</button>
      <button @click="applyPreset('space-between')" class="sg-preset-btn">Space Between</button>
      <button @click="applyPreset('wrap-grid')"     class="sg-preset-btn">Wrap Grid</button>
    </template>

    <div class="hidden md:grid grid-cols-[220px_1fr_220px] gap-5 items-start">

      <!-- Left: Direction + Wrap + Gap -->
      <div class="flex flex-col gap-4">
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Direction</p>
          <div class="grid grid-cols-2 gap-1.5">
            <button v-for="d in FLEX_DIRECTIONS" :key="d" @click="s.direction = d"
              :class="['sg-preset-btn justify-center text-center', s.direction === d ? '!bg-green-100 !border-green-500 !text-green-700' : '']">
              {{ d }}
            </button>
          </div>
        </div>
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Wrap</p>
          <div class="flex flex-col gap-1.5">
            <button v-for="w in FLEX_WRAPS" :key="w" @click="s.wrap = w"
              :class="['sg-preset-btn text-left', s.wrap === w ? '!bg-green-100 !border-green-500 !text-green-700' : '']">
              {{ w }}
            </button>
          </div>
        </div>
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Gap</p>
          <SliderRow v-model="s.gap" label="Gap" :max="48" unit="px" />
        </div>
      </div>

      <!-- Center: Preview + child count + reset -->
      <div class="sg-card p-5 flex flex-col gap-4">
        <span class="sg-section-title">Preview</span>
        <div class="flex-1 min-h-72 bg-slate-50 rounded-xl border p-3 transition-all duration-200 overflow-auto"
          style="border-color:var(--border)"
          :style="{ display:'flex', flexDirection:s.direction, flexWrap:s.wrap, justifyContent:s.justify, alignItems:s.align, alignContent:s.alignContent, gap:s.gap+'px' }">
          <div v-for="i in childCount" :key="i"
            class="rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0 transition-all"
            :style="{ width: s.childW+'px', height: s.childH+'px', background: CHILD_COLORS[(i-1) % CHILD_COLORS.length] }">
            {{ i }}
          </div>
        </div>
        <div class="flex gap-3">
          <div class="flex flex-col gap-1 flex-1">
            <label class="text-xs font-semibold" style="color:var(--text-light)">Children</label>
            <input type="number" v-model.number="childCount" min="1" max="12" class="sg-input text-sm" />
          </div>
          <div class="flex flex-col gap-1 flex-1">
            <label class="text-xs font-semibold" style="color:var(--text-light)">Child W</label>
            <input type="number" v-model.number="s.childW" min="20" max="200" class="sg-input text-sm" />
          </div>
          <div class="flex flex-col gap-1 flex-1">
            <label class="text-xs font-semibold" style="color:var(--text-light)">Child H</label>
            <input type="number" v-model.number="s.childH" min="20" max="200" class="sg-input text-sm" />
          </div>
        </div>
        <button @click="reset" class="sg-btn sg-btn-ghost w-full justify-center">
          <i class="bx bx-reset"></i> Reset
        </button>
      </div>

      <!-- Right: Justify + Align -->
      <div class="flex flex-col gap-4">
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Justify Content</p>
          <div class="flex flex-col gap-1.5">
            <button v-for="j in FLEX_JUSTIFIES" :key="j" @click="s.justify = j"
              :class="['sg-preset-btn text-left', s.justify === j ? '!bg-green-100 !border-green-500 !text-green-700' : '']">
              {{ j }}
            </button>
          </div>
        </div>
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Align Items</p>
          <div class="flex flex-col gap-1.5">
            <button v-for="a in FLEX_ALIGNS" :key="a" @click="s.align = a"
              :class="['sg-preset-btn text-left', s.align === a ? '!bg-green-100 !border-green-500 !text-green-700' : '']">
              {{ a }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile -->
    <div class="md:hidden flex flex-col gap-4">
      <div class="sg-card p-4 flex flex-col gap-3">
        <SelectRow v-model="s.direction" label="Direction" :options="FLEX_DIRECTIONS" />
        <SelectRow v-model="s.justify"   label="Justify"   :options="FLEX_JUSTIFIES" />
        <SelectRow v-model="s.align"     label="Align"     :options="FLEX_ALIGNS" />
        <SliderRow v-model="s.gap" label="Gap" :max="48" unit="px" />
      </div>
      <div class="sg-card p-4 flex flex-col gap-3">
        <div class="min-h-48 bg-slate-50 rounded-xl border p-2 overflow-auto"
          style="border-color:var(--border)"
          :style="{ display:'flex', flexDirection:s.direction, flexWrap:s.wrap, justifyContent:s.justify, alignItems:s.align, gap:s.gap+'px' }">
          <div v-for="i in childCount" :key="i"
            class="rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0"
            :style="{ width:'40px', height:'40px', background: CHILD_COLORS[(i-1) % CHILD_COLORS.length] }">
            {{ i }}
          </div>
        </div>
        <button @click="reset" class="sg-btn sg-btn-ghost w-full justify-center"><i class="bx bx-reset"></i> Reset</button>
      </div>
    </div>
  </GeneratorLayout>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import GeneratorLayout from '../components/layouts/GeneratorLayout.vue'
import SliderRow from '../components/ui/SliderRow.vue'
import SelectRow from '../components/ui/SelectRow.vue'
import { buildFlexCSS, buildFlexTailwind, FLEX_DIRECTIONS, FLEX_WRAPS, FLEX_JUSTIFIES, FLEX_ALIGNS } from '../utils/flexboxGen.js'

const CHILD_COLORS = ['#16a34a','#6366f1','#f43f5e','#f59e0b','#06b6d4','#8b5cf6','#ec4899','#14b8a6']
const DEFAULTS = { direction:'row', wrap:'wrap', justify:'flex-start', align:'flex-start', alignContent:'normal', gap:8, childW:60, childH:60 }
const s = reactive({ ...DEFAULTS })
const childCount = ref(6)

const PRESETS = {
  'row-center':    { direction:'row',    wrap:'nowrap', justify:'center',        align:'center',     gap:8  },
  'col-center':    { direction:'column', wrap:'nowrap', justify:'center',        align:'center',     gap:8  },
  'space-between': { direction:'row',    wrap:'nowrap', justify:'space-between', align:'center',     gap:0  },
  'wrap-grid':     { direction:'row',    wrap:'wrap',   justify:'flex-start',    align:'flex-start', gap:12 },
}

function applyPreset(name) { Object.assign(s, PRESETS[name]) }
function reset() { Object.assign(s, DEFAULTS) }

const css = computed(() => buildFlexCSS(s))
const tw  = computed(() => buildFlexTailwind(s))
</script>
