<template>
  <GeneratorLayout title="Spacing / Box Model" subtitle="Visual margin and padding editor with box model diagram"
    :css="css" :tailwind="tw">
    <template #presets>
      <button @click="applyPreset('none')"    class="sg-preset-btn">None</button>
      <button @click="applyPreset('sm')"      class="sg-preset-btn">Small</button>
      <button @click="applyPreset('md')"      class="sg-preset-btn">Medium</button>
      <button @click="applyPreset('lg')"      class="sg-preset-btn">Large</button>
      <button @click="applyPreset('card')"    class="sg-preset-btn">Card</button>
    </template>

    <div class="hidden md:grid grid-cols-[220px_1fr_220px] gap-5 items-start">

      <!-- Left: Margin -->
      <div class="sg-card p-4 flex flex-col gap-3">
        <p class="sg-label">Margin</p>
        <SliderRow v-model="s.mt" label="Top"    :max="80" unit="px" />
        <SliderRow v-model="s.mr" label="Right"  :max="80" unit="px" />
        <SliderRow v-model="s.mb" label="Bottom" :max="80" unit="px" />
        <SliderRow v-model="s.ml" label="Left"   :max="80" unit="px" />
        <div class="h-px" style="background:var(--border)"></div>
        <button @click="syncMargin" class="sg-preset-btn w-full justify-center">Sync All</button>
      </div>

      <!-- Center: Box model diagram + reset -->
      <div class="sg-card p-5 flex flex-col gap-4">
        <span class="sg-section-title">Box Model</span>

        <!-- Diagram -->
        <div class="flex-1 flex items-center justify-center min-h-72">
          <div class="relative flex items-center justify-center text-xs font-bold"
            style="background:#fef9c3;border:2px dashed #ca8a04;color:#92400e"
            :style="{ padding: `${s.mt}px ${s.mr}px ${s.mb}px ${s.ml}px` }">
            <!-- Margin labels -->
            <span class="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold" style="color:#92400e">{{ s.mt }}px</span>
            <span class="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-bold" style="color:#92400e">{{ s.mb }}px</span>
            <span class="absolute top-1/2 -translate-y-1/2 -left-7 text-[10px] font-bold" style="color:#92400e">{{ s.ml }}px</span>
            <span class="absolute top-1/2 -translate-y-1/2 -right-7 text-[10px] font-bold" style="color:#92400e">{{ s.mr }}px</span>

            <!-- Padding box -->
            <div class="relative flex items-center justify-center text-[10px] font-bold"
              style="background:#bbf7d0;border:2px dashed #16a34a;color:#14532d"
              :style="{ padding: `${s.pt}px ${s.pr}px ${s.pb}px ${s.pl}px` }">
              <!-- Padding labels -->
              <span class="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px]" style="color:#14532d">{{ s.pt }}px</span>
              <span class="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px]" style="color:#14532d">{{ s.pb }}px</span>
              <span class="absolute top-1/2 -translate-y-1/2 -left-6 text-[10px]" style="color:#14532d">{{ s.pl }}px</span>
              <span class="absolute top-1/2 -translate-y-1/2 -right-6 text-[10px]" style="color:#14532d">{{ s.pr }}px</span>

              <!-- Content box -->
              <div class="flex items-center justify-center text-xs font-bold text-white rounded"
                style="background:#16a34a;min-width:80px;min-height:40px">
                Content
              </div>
            </div>
          </div>
        </div>

        <!-- Legend -->
        <div class="flex gap-4 justify-center text-xs font-semibold">
          <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-sm inline-block" style="background:#fef9c3;border:1.5px dashed #ca8a04"></span> Margin</span>
          <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-sm inline-block" style="background:#bbf7d0;border:1.5px dashed #16a34a"></span> Padding</span>
          <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-sm inline-block" style="background:#16a34a"></span> Content</span>
        </div>

        <button @click="reset" class="sg-btn sg-btn-ghost w-full justify-center">
          <i class="bx bx-reset"></i> Reset
        </button>
      </div>

      <!-- Right: Padding -->
      <div class="sg-card p-4 flex flex-col gap-3">
        <p class="sg-label">Padding</p>
        <SliderRow v-model="s.pt" label="Top"    :max="80" unit="px" />
        <SliderRow v-model="s.pr" label="Right"  :max="80" unit="px" />
        <SliderRow v-model="s.pb" label="Bottom" :max="80" unit="px" />
        <SliderRow v-model="s.pl" label="Left"   :max="80" unit="px" />
        <div class="h-px" style="background:var(--border)"></div>
        <button @click="syncPadding" class="sg-preset-btn w-full justify-center">Sync All</button>
      </div>
    </div>

    <!-- Mobile -->
    <div class="md:hidden flex flex-col gap-4">
      <div class="sg-card p-4 grid grid-cols-2 gap-3">
        <div class="flex flex-col gap-3">
          <p class="sg-label">Margin</p>
          <SliderRow v-model="s.mt" label="Top"    :max="80" unit="px" />
          <SliderRow v-model="s.mr" label="Right"  :max="80" unit="px" />
          <SliderRow v-model="s.mb" label="Bottom" :max="80" unit="px" />
          <SliderRow v-model="s.ml" label="Left"   :max="80" unit="px" />
        </div>
        <div class="flex flex-col gap-3">
          <p class="sg-label">Padding</p>
          <SliderRow v-model="s.pt" label="Top"    :max="80" unit="px" />
          <SliderRow v-model="s.pr" label="Right"  :max="80" unit="px" />
          <SliderRow v-model="s.pb" label="Bottom" :max="80" unit="px" />
          <SliderRow v-model="s.pl" label="Left"   :max="80" unit="px" />
        </div>
      </div>
      <div class="sg-card p-4 flex flex-col gap-3">
        <div class="flex items-center justify-center min-h-40">
          <div class="relative flex items-center justify-center text-xs"
            style="background:#fef9c3;border:2px dashed #ca8a04"
            :style="{ padding: `${s.mt}px ${s.mr}px ${s.mb}px ${s.ml}px` }">
            <div class="flex items-center justify-center text-xs font-bold text-white rounded px-4 py-2"
              style="background:#bbf7d0;border:2px dashed #16a34a">
              <div class="bg-green-600 text-white px-3 py-1 rounded text-xs font-bold">Content</div>
            </div>
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
import { buildSpacingCSS, buildSpacingTailwind } from '../utils/spacingGen.js'

const DEFAULTS = { mt:16, mr:16, mb:16, ml:16, pt:16, pr:16, pb:16, pl:16 }
const s = reactive({ ...DEFAULTS })

const PRESETS = {
  none: { mt:0,  mr:0,  mb:0,  ml:0,  pt:0,  pr:0,  pb:0,  pl:0  },
  sm:   { mt:8,  mr:8,  mb:8,  ml:8,  pt:8,  pr:8,  pb:8,  pl:8  },
  md:   { mt:16, mr:16, mb:16, ml:16, pt:16, pr:16, pb:16, pl:16 },
  lg:   { mt:32, mr:32, mb:32, ml:32, pt:32, pr:32, pb:32, pl:32 },
  card: { mt:0,  mr:0,  mb:0,  ml:0,  pt:24, pr:24, pb:24, pl:24 },
}

function applyPreset(name) { Object.assign(s, PRESETS[name]) }
function reset() { Object.assign(s, DEFAULTS) }
function syncMargin() { s.mr = s.mb = s.ml = s.mt }
function syncPadding() { s.pr = s.pb = s.pl = s.pt }

const css = computed(() => buildSpacingCSS(s))
const tw  = computed(() => buildSpacingTailwind(s))
</script>
