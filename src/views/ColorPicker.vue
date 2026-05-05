<template>
  <GeneratorLayout title="Color Picker" subtitle="Upload an image and extract colors with precision">
    <div class="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5">
      <!-- Image panel -->
      <div class="sg-card p-6 flex flex-col gap-4">
        <span class="sg-section-title">Image</span>

        <!-- Image container -->
        <div class="relative flex justify-center items-center bg-slate-50 rounded-xl border min-h-64 overflow-hidden"
          style="border-color:var(--border)" ref="containerRef"
          :style="{ cursor: picking ? 'crosshair' : 'default' }"
          @mousemove="onMouseMove" @click="onPick" @mouseleave="crosshair.show = false">

          <div v-if="!imgLoaded" class="flex flex-col items-center gap-3 p-12 text-center">
            <i class="bx bx-image text-5xl" style="color:var(--text-light)"></i>
            <p class="text-sm" style="color:var(--text-light)">Upload an image to get started</p>
          </div>

          <img v-show="imgLoaded" ref="imgRef" :src="imgSrc" alt="" class="max-w-full max-h-80 object-contain" @load="onImgLoad" />
          <canvas ref="canvasRef" class="absolute inset-0 w-full h-full opacity-0 pointer-events-none"></canvas>

          <!-- Crosshair -->
          <div v-if="crosshair.show && picking" class="absolute pointer-events-none w-5 h-5 rounded-full border-2 border-white"
            style="box-shadow:0 0 0 1px #1e293b;transform:translate(-50%,-50%)"
            :style="{ left: crosshair.x + 'px', top: crosshair.y + 'px', backgroundColor: crosshair.color }">
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-3 flex-wrap">
          <label class="sg-btn sg-btn-primary cursor-pointer">
            <i class="bx bx-upload"></i> Upload Image
            <input type="file" accept="image/*" class="hidden" @change="onUpload" />
          </label>
          <button @click="togglePick" :class="['sg-btn', picking ? 'sg-btn-primary' : 'sg-btn-ghost']">
            <i class="bx bx-crosshair"></i> {{ picking ? 'Picking…' : 'Pick Color' }}
          </button>
        </div>

        <p v-if="error" class="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{{ error }}</p>

        <!-- Code output -->
        <CodeOutput :code="codeOutput" />
      </div>

      <!-- Sidebar -->
      <div class="sg-card p-5 flex flex-col gap-5">
        <span class="sg-section-title">Selected Color</span>

        <div class="h-20 rounded-xl border transition-all" style="border-color:var(--border)" :style="{ backgroundColor: picked.hex || '#06b6d4' }"></div>

        <div class="flex flex-col gap-2">
          <div class="flex gap-2">
            <input :value="picked.hex" readonly class="sg-input text-sm flex-1" placeholder="HEX" />
            <CopyBtn :text="picked.hex" label="Copy" />
          </div>
          <div class="flex gap-2">
            <input :value="picked.rgb" readonly class="sg-input text-sm flex-1" placeholder="RGB" />
            <CopyBtn :text="picked.rgb" label="Copy" />
          </div>
        </div>

        <div class="text-xs p-3 rounded-lg border-l-4" style="background:#ecfeff;border-color:#06b6d4;color:var(--text-light)">
          <p><strong>1.</strong> Upload an image</p>
          <p><strong>2.</strong> Click "Pick Color"</p>
          <p><strong>3.</strong> Click on any color</p>
        </div>

        <span class="sg-section-title">Palette</span>
        <div class="grid grid-cols-4 gap-2">
          <div v-for="(color, i) in palette" :key="i"
            class="aspect-square rounded-lg cursor-pointer border hover:scale-110 transition-transform"
            style="border-color:var(--border)"
            :style="{ backgroundColor: color }"
            :title="color"
            @click="selectColor(color)">
          </div>
        </div>
      </div>
    </div>
  </GeneratorLayout>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import GeneratorLayout from '../components/layouts/GeneratorLayout.vue'
import CodeOutput from '../components/ui/CodeOutput.vue'
import CopyBtn from '../components/ui/CopyBtn.vue'

const imgRef = ref(null)
const canvasRef = ref(null)
const containerRef = ref(null)
const imgSrc = ref('')
const imgLoaded = ref(false)
const picking = ref(false)
const error = ref('')
const palette = ref([])
const picked = reactive({ hex: '', rgb: '' })
const crosshair = reactive({ show: false, x: 0, y: 0, color: '' })

const codeOutput = computed(() =>
  picked.hex ? `/* Extracted Color */\nHEX: ${picked.hex}\nRGB: ${picked.rgb}` : '/* Pick a color from the image */'
)

function onUpload(e) {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = ev => { imgSrc.value = ev.target.result }
  reader.readAsDataURL(file)
  picking.value = false
  error.value = ''
}

function onImgLoad() {
  imgLoaded.value = true
  const canvas = canvasRef.value
  const img = imgRef.value
  canvas.width = img.naturalWidth
  canvas.height = img.naturalHeight
  canvas.getContext('2d').drawImage(img, 0, 0)
  extractPalette()
}

function togglePick() {
  if (!imgLoaded.value) { error.value = 'Please upload an image first.'; return }
  error.value = ''
  picking.value = !picking.value
}

function getPixel(clientX, clientY) {
  const img = imgRef.value
  const canvas = canvasRef.value
  const rect = img.getBoundingClientRect()
  const x = clientX - rect.left
  const y = clientY - rect.top
  const scaleX = img.naturalWidth / rect.width
  const scaleY = img.naturalHeight / rect.height
  const ox = Math.floor(x * scaleX)
  const oy = Math.floor(y * scaleY)
  if (ox < 0 || oy < 0 || ox >= canvas.width || oy >= canvas.height) return null
  const d = canvas.getContext('2d').getImageData(ox, oy, 1, 1).data
  return { r: d[0], g: d[1], b: d[2] }
}

function onMouseMove(e) {
  if (!picking.value || !imgLoaded.value) return
  const px = getPixel(e.clientX, e.clientY)
  if (!px) return
  const rect = containerRef.value.getBoundingClientRect()
  crosshair.x = e.clientX - rect.left
  crosshair.y = e.clientY - rect.top
  crosshair.color = `rgb(${px.r},${px.g},${px.b})`
  crosshair.show = true
}

function onPick(e) {
  if (!picking.value || !imgLoaded.value) return
  const px = getPixel(e.clientX, e.clientY)
  if (!px) return
  selectRGB(px.r, px.g, px.b)
}

function selectRGB(r, g, b) {
  picked.hex = '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')
  picked.rgb = `rgb(${r}, ${g}, ${b})`
}

function selectColor(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  selectRGB(r, g, b)
}

function extractPalette() {
  const img = imgRef.value
  const tmp = document.createElement('canvas')
  tmp.width = img.naturalWidth
  tmp.height = img.naturalHeight
  const ctx = tmp.getContext('2d')
  ctx.drawImage(img, 0, 0)
  const data = ctx.getImageData(0, 0, tmp.width, tmp.height).data
  const counts = {}
  const skip = Math.max(1, Math.floor(data.length / 4 / 10000))
  for (let i = 0; i < data.length; i += 4 * skip) {
    if (data[i + 3] === 0) continue
    const hex = '#' + [data[i], data[i+1], data[i+2]].map(v => v.toString(16).padStart(2,'0')).join('')
    counts[hex] = (counts[hex] || 0) + 1
  }
  palette.value = Object.keys(counts).sort((a, b) => counts[b] - counts[a]).slice(0, 8)
}
</script>
