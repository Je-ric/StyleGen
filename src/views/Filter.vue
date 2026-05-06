<template>
  <GeneratorLayout title="Filter Generator" subtitle="Apply blur, brightness, contrast, and more visually"
    :css="css" :tailwind="tw">
    <template #presets>
      <button v-for="(_, name) in FILTER_PRESETS" :key="name" @click="applyPreset(name)" class="sg-preset-btn capitalize">{{ name }}</button>
    </template>

    <div class="hidden md:grid grid-cols-[220px_1fr_220px] gap-5 items-start">

      <!-- Left: Basic + Color Effects -->
      <div class="flex flex-col gap-4">
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Basic</p>
          <SliderRow v-model="s.brightness" label="Brightness" :max="200" unit="%" />
          <SliderRow v-model="s.contrast" label="Contrast" :max="200" unit="%" />
          <SliderRow v-model="s.saturate" label="Saturation" :max="200" unit="%" />
        </div>
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Color Effects</p>
          <SliderRow v-model="s.grayscale" label="Grayscale" unit="%" />
          <SliderRow v-model="s.sepia" label="Sepia" unit="%" />
          <SliderRow v-model="s.hueRotate" label="Hue Rotate" :max="360" unit="deg" />
          <SliderRow v-model="s.invert" label="Invert" unit="%" />
        </div>
      </div>

      <!-- Center: Preview + actions -->
      <div class="sg-card p-5 flex flex-col gap-4">
        <span class="sg-section-title">Preview</span>
        <div class="flex-1 flex justify-center items-center min-h-72 bg-slate-100 rounded-xl overflow-hidden">
          <img :src="imgSrc" alt="preview"
            class="max-w-full max-h-80 object-contain rounded-lg transition-all duration-300"
            :style="{ filter: filterValue }" />
        </div>
        <!-- Actions below preview -->
        <div class="flex gap-3">
          <label class="sg-btn sg-btn-ghost cursor-pointer flex-1 justify-center">
            <i class="bx bx-upload"></i> Upload Image
            <input type="file" accept="image/*" class="hidden" @change="onUpload" />
          </label>
          <button @click="reset" class="sg-btn sg-btn-ghost flex-1 justify-center">
            <i class="bx bx-reset"></i> Reset
          </button>
        </div>
      </div>

      <!-- Right: Advanced -->
      <div class="sg-card p-4 flex flex-col gap-3">
        <p class="sg-label">Advanced</p>
        <SliderRow v-model="s.blur" label="Blur" :max="20" unit="px" />
        <SliderRow v-model="s.opacity" label="Opacity" unit="%" />
      </div>
    </div>

    <!-- Mobile -->
    <div class="md:hidden flex flex-col gap-4">
      <div class="sg-card p-4 flex flex-col gap-3">
        <div class="flex justify-center items-center min-h-48 bg-slate-100 rounded-xl overflow-hidden">
          <img :src="imgSrc" alt="preview" class="max-w-full max-h-48 object-contain" :style="{ filter: filterValue }" />
        </div>
        <div class="flex gap-3">
          <label class="sg-btn sg-btn-ghost cursor-pointer flex-1 justify-center">
            <i class="bx bx-upload"></i> Upload
            <input type="file" accept="image/*" class="hidden" @change="onUpload" />
          </label>
          <button @click="reset" class="sg-btn sg-btn-ghost flex-1 justify-center"><i class="bx bx-reset"></i> Reset</button>
        </div>
      </div>
      <div class="sg-card p-4 flex flex-col gap-3">
        <SliderRow v-model="s.brightness" label="Brightness" :max="200" unit="%" />
        <SliderRow v-model="s.contrast" label="Contrast" :max="200" unit="%" />
        <SliderRow v-model="s.blur" label="Blur" :max="20" unit="px" />
      </div>
    </div>
  </GeneratorLayout>
</template>

<script setup>
import { reactive, computed, ref } from 'vue'
import GeneratorLayout from '../components/layouts/GeneratorLayout.vue'
import SliderRow from '../components/ui/SliderRow.vue'
import { buildFilterCSS, buildFilterTailwind, FILTER_DEFAULTS, FILTER_PRESETS } from '../utils/filterGen.js'

const DEFAULT_IMG = 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=600'
const imgSrc = ref(DEFAULT_IMG)
const s = reactive({ ...FILTER_DEFAULTS })

const filterValue = computed(() =>
  `blur(${s.blur}px) brightness(${s.brightness}%) contrast(${s.contrast}%) grayscale(${s.grayscale}%) hue-rotate(${s.hueRotate}deg) invert(${s.invert}%) opacity(${s.opacity}%) saturate(${s.saturate}%) sepia(${s.sepia}%)`
)
const css = computed(() => buildFilterCSS(s))
const tw  = computed(() => buildFilterTailwind(s))

function applyPreset(name) { Object.assign(s, FILTER_PRESETS[name]) }
function reset() { Object.assign(s, FILTER_DEFAULTS); imgSrc.value = DEFAULT_IMG }

function onUpload(e) {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = ev => (imgSrc.value = ev.target.result)
  reader.readAsDataURL(file)
}
</script>
