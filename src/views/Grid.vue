<template>
  <GeneratorLayout title="Grid Generator" subtitle="Define grid-template-columns/rows and visualize your layout"
    :css="css" :tailwind="tw">
    <template #presets>
      <button @click="applyPreset('2col')"    class="sg-preset-btn">2 Cols</button>
      <button @click="applyPreset('3col')"    class="sg-preset-btn">3 Cols</button>
      <button @click="applyPreset('4col')"    class="sg-preset-btn">4 Cols</button>
      <button @click="applyPreset('sidebar')" class="sg-preset-btn">Sidebar</button>
      <button @click="applyPreset('holy')"    class="sg-preset-btn">Holy Grail</button>
    </template>

    <div class="hidden md:grid grid-cols-[220px_1fr_220px] gap-5 items-start">

      <!-- Left: Columns + Rows -->
      <div class="flex flex-col gap-4">
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Columns</p>
          <div class="flex gap-2 items-center">
            <label class="text-xs font-semibold shrink-0" style="color:var(--text-light)">Count</label>
            <input type="number" v-model.number="colCount" min="1" max="12" @input="updateCols" class="sg-input text-sm w-16" />
          </div>
          <div class="flex gap-2 items-center">
            <label class="text-xs font-semibold shrink-0" style="color:var(--text-light)">Size</label>
            <select v-model="colSize" @change="updateCols" class="sg-input text-sm cursor-pointer">
              <option value="1fr">1fr</option>
              <option value="auto">auto</option>
              <option value="minmax(0,1fr)">minmax(0,1fr)</option>
              <option value="200px">200px</option>
              <option value="150px">150px</option>
            </select>
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-xs font-semibold" style="color:var(--text-light)">Custom</label>
            <input v-model="s.columns" class="sg-input text-xs font-mono" placeholder="repeat(3, 1fr)" />
          </div>
        </div>
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Rows</p>
          <div class="flex flex-col gap-1">
            <label class="text-xs font-semibold" style="color:var(--text-light)">Custom</label>
            <input v-model="s.rows" class="sg-input text-xs font-mono" placeholder="auto" />
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
        <div class="flex-1 min-h-72 bg-slate-50 rounded-xl border p-3 overflow-auto"
          style="border-color:var(--border)"
          :style="{ display:'grid', gridTemplateColumns:s.columns, gridTemplateRows:s.rows, gap:s.gap+'px' }">
          <div v-for="i in childCount" :key="i"
            class="rounded-lg flex items-center justify-center text-xs font-bold text-white min-h-[40px] transition-all"
            :style="{ background: CHILD_COLORS[(i-1) % CHILD_COLORS.length] }">
            {{ i }}
          </div>
        </div>
        <div class="flex gap-3">
          <div class="flex flex-col gap-1 flex-1">
            <label class="text-xs font-semibold" style="color:var(--text-light)">Children</label>
            <input type="number" v-model.number="childCount" min="1" max="24" class="sg-input text-sm" />
          </div>
        </div>
        <button @click="reset" class="sg-btn sg-btn-ghost w-full justify-center">
          <i class="bx bx-reset"></i> Reset
        </button>
      </div>

      <!-- Right: Align options -->
      <div class="flex flex-col gap-4">
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Justify Items</p>
          <div class="flex flex-col gap-1.5">
            <button v-for="j in ['start','end','center','stretch']" :key="j" @click="s.justifyItems = j"
              :class="['sg-preset-btn text-left', s.justifyItems === j ? '!bg-green-100 !border-green-500 !text-green-700' : '']">
              {{ j }}
            </button>
          </div>
        </div>
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Align Items</p>
          <div class="flex flex-col gap-1.5">
            <button v-for="a in ['start','end','center','stretch']" :key="a" @click="s.alignItems = a"
              :class="['sg-preset-btn text-left', s.alignItems === a ? '!bg-green-100 !border-green-500 !text-green-700' : '']">
              {{ a }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile -->
    <div class="md:hidden flex flex-col gap-4">
      <div class="sg-card p-4 flex flex-col gap-3">
        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold" style="color:var(--text-light)">Columns</label>
          <input v-model="s.columns" class="sg-input text-xs font-mono" />
        </div>
        <SliderRow v-model="s.gap" label="Gap" :max="48" unit="px" />
      </div>
      <div class="sg-card p-4 flex flex-col gap-3">
        <div class="min-h-48 bg-slate-50 rounded-xl border p-2 overflow-auto"
          style="border-color:var(--border)"
          :style="{ display:'grid', gridTemplateColumns:s.columns, gap:s.gap+'px' }">
          <div v-for="i in childCount" :key="i"
            class="rounded-lg flex items-center justify-center text-xs font-bold text-white min-h-[36px]"
            :style="{ background: CHILD_COLORS[(i-1) % CHILD_COLORS.length] }">{{ i }}</div>
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
import { buildGridCSS, buildGridTailwind } from '../utils/gridGen.js'

const CHILD_COLORS = ['#16a34a','#6366f1','#f43f5e','#f59e0b','#06b6d4','#8b5cf6','#ec4899','#14b8a6','#f97316','#0ea5e9','#a855f7','#10b981']
const DEFAULTS = { columns:'repeat(3, 1fr)', rows:'auto', gap:8, justifyItems:'stretch', alignItems:'stretch' }
const s = reactive({ ...DEFAULTS })
const childCount = ref(6)
const colCount = ref(3)
const colSize = ref('1fr')

function updateCols() { s.columns = `repeat(${colCount.value}, ${colSize.value})` }

const PRESETS = {
  '2col':    { columns:'repeat(2, 1fr)',       rows:'auto', gap:8  },
  '3col':    { columns:'repeat(3, 1fr)',       rows:'auto', gap:8  },
  '4col':    { columns:'repeat(4, 1fr)',       rows:'auto', gap:8  },
  'sidebar': { columns:'240px 1fr',            rows:'auto', gap:16 },
  'holy':    { columns:'200px 1fr 200px',      rows:'auto', gap:16 },
}

function applyPreset(name) { Object.assign(s, PRESETS[name]) }
function reset() { Object.assign(s, DEFAULTS); colCount.value = 3; colSize.value = '1fr' }

const css = computed(() => buildGridCSS(s))
const tw  = computed(() => buildGridTailwind(s))
</script>
