<template>
  <GeneratorLayout title="Typography Generator" subtitle="font-size, weight, line-height, letter-spacing, and more"
    :css="css" :tailwind="tw">
    <template #presets>
      <button @click="applyPreset('heading')"  class="sg-preset-btn">Heading</button>
      <button @click="applyPreset('body')"     class="sg-preset-btn">Body</button>
      <button @click="applyPreset('caption')"  class="sg-preset-btn">Caption</button>
      <button @click="applyPreset('display')"  class="sg-preset-btn">Display</button>
      <button @click="applyPreset('mono')"     class="sg-preset-btn">Mono</button>
    </template>

    <div class="hidden md:grid grid-cols-[220px_1fr_220px] gap-5 items-start">

      <!-- Left: Font + Size + Weight -->
      <div class="flex flex-col gap-4">
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Font Family</p>
          <select v-model="s.fontFamily" @change="loadFont" class="sg-input text-sm cursor-pointer">
            <option v-for="f in GOOGLE_FONTS" :key="f" :value="f">{{ f }}</option>
          </select>
          <select v-model="s.fallback" class="sg-input text-sm cursor-pointer">
            <option value="sans-serif">sans-serif</option>
            <option value="serif">serif</option>
            <option value="monospace">monospace</option>
          </select>
        </div>
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Size & Weight</p>
          <SliderRow v-model="s.fontSize" label="Size" :min="8" :max="96" unit="px" />
          <div class="flex flex-col gap-1">
            <label class="text-xs font-semibold" style="color:var(--text-light)">Weight</label>
            <div class="grid grid-cols-3 gap-1">
              <button v-for="w in FONT_WEIGHTS" :key="w" @click="s.fontWeight = w"
                :class="['sg-preset-btn justify-center', s.fontWeight === w ? '!bg-green-100 !border-green-500 !text-green-700' : '']">
                {{ w }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Center: Preview + text input + reset -->
      <div class="sg-card p-5 flex flex-col gap-4">
        <span class="sg-section-title">Preview</span>
        <div class="flex-1 flex items-center justify-center min-h-48 bg-slate-50 rounded-xl border px-6 py-8 overflow-hidden"
          style="border-color:var(--border)">
          <p class="break-words w-full transition-all duration-200" :style="previewStyle">
            {{ previewText }}
          </p>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold" style="color:var(--text-light)">Preview Text</label>
          <input v-model="previewText" class="sg-input text-sm" placeholder="Type something…" />
        </div>
        <button @click="reset" class="sg-btn sg-btn-ghost w-full justify-center">
          <i class="bx bx-reset"></i> Reset
        </button>
      </div>

      <!-- Right: Spacing + Align + Transform + Color -->
      <div class="flex flex-col gap-4">
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Spacing</p>
          <SliderRow v-model="s.lineHeight"     label="Line Height"    :min="1" :max="3" :step="0.1" />
          <SliderRow v-model="s.letterSpacing"  label="Letter Spacing" :min="-0.1" :max="0.5" :step="0.01" />
        </div>
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Align</p>
          <div class="grid grid-cols-2 gap-1.5">
            <button v-for="a in TEXT_ALIGNS" :key="a" @click="s.align = a"
              :class="['sg-preset-btn justify-center capitalize', s.align === a ? '!bg-green-100 !border-green-500 !text-green-700' : '']">
              {{ a }}
            </button>
          </div>
        </div>
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Transform</p>
          <div class="grid grid-cols-2 gap-1.5">
            <button v-for="t in TEXT_TRANSFORMS" :key="t" @click="s.transform = t"
              :class="['sg-preset-btn justify-center capitalize', s.transform === t ? '!bg-green-100 !border-green-500 !text-green-700' : '']">
              {{ t === 'none' ? 'none' : t }}
            </button>
          </div>
        </div>
        <div class="sg-card p-4 flex flex-col gap-3">
          <p class="sg-label">Color</p>
          <ColorRow v-model="s.color" label="Color" />
        </div>
      </div>
    </div>

    <!-- Mobile -->
    <div class="md:hidden flex flex-col gap-4">
      <div class="sg-card p-4 flex flex-col gap-3">
        <select v-model="s.fontFamily" @change="loadFont" class="sg-input text-sm cursor-pointer">
          <option v-for="f in GOOGLE_FONTS" :key="f" :value="f">{{ f }}</option>
        </select>
        <SliderRow v-model="s.fontSize" label="Size" :min="8" :max="96" unit="px" />
        <SliderRow v-model="s.lineHeight" label="Line Height" :min="1" :max="3" :step="0.1" />
      </div>
      <div class="sg-card p-4 flex flex-col gap-3">
        <div class="flex items-center justify-center min-h-32 bg-slate-50 rounded-xl border px-4 py-4 overflow-hidden" style="border-color:var(--border)">
          <p class="break-words w-full" :style="previewStyle">{{ previewText }}</p>
        </div>
        <input v-model="previewText" class="sg-input text-sm" placeholder="Preview text…" />
        <button @click="reset" class="sg-btn sg-btn-ghost w-full justify-center"><i class="bx bx-reset"></i> Reset</button>
      </div>
    </div>
  </GeneratorLayout>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import GeneratorLayout from '../components/layouts/GeneratorLayout.vue'
import SliderRow from '../components/ui/SliderRow.vue'
import ColorRow from '../components/ui/ColorRow.vue'
import { buildTypographyCSS, buildTypographyTailwind, FONT_WEIGHTS, TEXT_ALIGNS, TEXT_TRANSFORMS, GOOGLE_FONTS } from '../utils/typographyGen.js'

const DEFAULTS = { fontFamily:'Inter', fallback:'sans-serif', fontSize:16, fontWeight:400, lineHeight:1.5, letterSpacing:0, color:'#052e16', align:'left', transform:'none' }
const s = reactive({ ...DEFAULTS })
const previewText = ref('The quick brown fox jumps over the lazy dog.')

const PRESETS = {
  heading: { fontFamily:'Oswald',           fontSize:48, fontWeight:700, lineHeight:1.1, letterSpacing:0,    align:'left',   transform:'none'      },
  body:    { fontFamily:'Inter',            fontSize:16, fontWeight:400, lineHeight:1.6, letterSpacing:0,    align:'left',   transform:'none'      },
  caption: { fontFamily:'Inter',            fontSize:12, fontWeight:400, lineHeight:1.4, letterSpacing:0.05, align:'left',   transform:'none'      },
  display: { fontFamily:'Playfair Display', fontSize:64, fontWeight:700, lineHeight:1.0, letterSpacing:-0.02,align:'center', transform:'none'      },
  mono:    { fontFamily:'Fira Code',        fontSize:14, fontWeight:400, lineHeight:1.7, letterSpacing:0,    align:'left',   transform:'none'      },
}

const loadedFonts = new Set()
function loadFont() {
  const f = s.fontFamily
  if (loadedFonts.has(f)) return
  loadedFonts.add(f)
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = `https://fonts.googleapis.com/css2?family=${f.replace(/ /g,'+')}:wght@100;200;300;400;500;600;700;800;900&display=swap`
  document.head.appendChild(link)
}

function applyPreset(name) { Object.assign(s, PRESETS[name]); loadFont() }
function reset() { Object.assign(s, DEFAULTS); previewText.value = 'The quick brown fox jumps over the lazy dog.' }

const previewStyle = computed(() => ({
  fontFamily: `'${s.fontFamily}', ${s.fallback}`,
  fontSize: s.fontSize + 'px',
  fontWeight: s.fontWeight,
  lineHeight: s.lineHeight,
  letterSpacing: s.letterSpacing + 'em',
  color: s.color,
  textAlign: s.align,
  textTransform: s.transform,
}))

const css = computed(() => buildTypographyCSS(s))
const tw  = computed(() => buildTypographyTailwind(s))
</script>
