<template>
  <GeneratorLayout title="Filter Generator" subtitle="Apply blur, brightness, contrast, and more visually">
    <div class="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">
      <!-- Preview + output -->
      <div class="sg-card p-6 flex flex-col gap-4">
        <span class="sg-section-title">Preview</span>
        <div class="flex justify-center items-center min-h-64 bg-slate-100 rounded-xl overflow-hidden">
          <img :src="imgSrc" alt="preview" class="max-w-full max-h-80 object-contain rounded-lg transition-all duration-300" :style="{ filter: filterValue }" />
        </div>
        <label class="sg-btn sg-btn-ghost cursor-pointer w-fit">
          <i class="bx bx-upload"></i> Upload Image
          <input type="file" accept="image/*" class="hidden" @change="onUpload" />
        </label>
        <CodeOutput :code="css" />
      </div>

      <!-- Controls -->
      <div class="sg-card p-5 flex flex-col gap-3 overflow-y-auto max-h-[80vh]">
        <div class="flex items-center justify-between mb-1">
          <p class="sg-label mb-0">Presets</p>
          <div class="flex gap-1 flex-wrap">
            <button v-for="(_, name) in FILTER_PRESETS" :key="name" @click="applyPreset(name)"
              class="sg-btn sg-btn-ghost sg-btn-sm capitalize">{{ name }}</button>
          </div>
        </div>

        <p class="sg-label mt-2">Basic</p>
        <SliderRow v-model="s.brightness" label="Brightness" :max="200" unit="%" />
        <SliderRow v-model="s.contrast" label="Contrast" :max="200" unit="%" />
        <SliderRow v-model="s.saturate" label="Saturation" :max="200" unit="%" />

        <p class="sg-label mt-2">Color Effects</p>
        <SliderRow v-model="s.grayscale" label="Grayscale" unit="%" />
        <SliderRow v-model="s.sepia" label="Sepia" unit="%" />
        <SliderRow v-model="s.hueRotate" label="Hue Rotate" :max="360" unit="deg" />
        <SliderRow v-model="s.invert" label="Invert" unit="%" />

        <p class="sg-label mt-2">Advanced</p>
        <SliderRow v-model="s.blur" label="Blur" :max="20" unit="px" />
        <SliderRow v-model="s.opacity" label="Opacity" unit="%" />

        <button @click="Object.assign(s, FILTER_DEFAULTS)" class="sg-btn sg-btn-ghost mt-2">
          <i class="bx bx-reset"></i> Reset All
        </button>
      </div>
    </div>
  </GeneratorLayout>
</template>

<script setup>
import { reactive, computed, ref } from 'vue'
import GeneratorLayout from '../components/layouts/GeneratorLayout.vue'
import SliderRow from '../components/ui/SliderRow.vue'
import CodeOutput from '../components/ui/CodeOutput.vue'
import { buildFilterCSS, FILTER_DEFAULTS, FILTER_PRESETS } from '../utils/filterGen.js'

const DEFAULT_IMG = 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=600'
const imgSrc = ref(DEFAULT_IMG)

const s = reactive({ ...FILTER_DEFAULTS })

const filterValue = computed(() =>
  `blur(${s.blur}px) brightness(${s.brightness}%) contrast(${s.contrast}%) grayscale(${s.grayscale}%) hue-rotate(${s.hueRotate}deg) invert(${s.invert}%) opacity(${s.opacity}%) saturate(${s.saturate}%) sepia(${s.sepia}%)`
)
const css = computed(() => buildFilterCSS(s))

function applyPreset(name) { Object.assign(s, FILTER_PRESETS[name]) }

function onUpload(e) {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = ev => (imgSrc.value = ev.target.result)
  reader.readAsDataURL(file)
}
</script>
