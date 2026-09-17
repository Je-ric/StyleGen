<template>
  <teleport to="body">
    <transition name="sg-fade">
      <div v-if="visible" @keydown="handleKeydown" class="fixed inset-0 bg-slate-900/75 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        @click.self="$emit('close')">
        <div ref="dialog" role="dialog" aria-modal="true" aria-labelledby="code-dialog-title" tabindex="-1" class="max-h-[90dvh] overflow-y-auto bg-white rounded-2xl shadow-2xl w-full max-w-xl relative">
          <!-- Accent bar -->
          <div class="h-1.5 w-full" style="background:linear-gradient(90deg,#15803d,#22c55e)"></div>

          <div class="p-6 flex flex-col gap-4">
            <!-- Header -->
            <div class="flex items-center justify-between">
              <h2 id="code-dialog-title" class="text-lg font-bold flex items-center gap-2" style="color:var(--text-dark)">
                <i class="bx bx-code-alt" style="color:var(--primary)"></i>
                Generated Code
              </h2>
              <button aria-label="Close code dialog" @click="$emit('close')" class="text-gray-400 hover:text-gray-600 transition-colors">
                <i class="bx bx-x text-2xl"></i>
              </button>
            </div>

            <!-- Tabs -->
            <div class="flex gap-1 p-1 rounded-lg" style="background:var(--bg)">
              <button :aria-pressed="tab === 'css'" @click="tab = 'css'"
                :class="['flex-1 py-1.5 text-sm font-semibold rounded-md transition-all', tab === 'css' ? 'bg-white shadow-sm' : '']"
                :style="tab === 'css' ? 'color:var(--primary)' : 'color:var(--text-light)'">
                CSS
              </button>
              <button :aria-pressed="tab === 'tw'" v-if="tailwind" @click="tab = 'tw'"
                :class="['flex-1 py-1.5 text-sm font-semibold rounded-md transition-all', tab === 'tw' ? 'bg-white shadow-sm' : '']"
                :style="tab === 'tw' ? 'color:var(--primary)' : 'color:var(--text-light)'">
                Tailwind
              </button>
            </div>

            <!-- Code block -->
            <pre tabindex="0" aria-label="Generated code" class="sg-code text-sm leading-relaxed max-h-72 overflow-y-auto">{{ tab === 'css' ? css : tailwind }}</pre>

            <p v-if="error" role="status" class="text-sm text-red-700">{{ error }}</p>
            <!-- Copy button -->
            <button @click="handleCopy"
              class="w-full py-2.5 rounded-xl font-bold text-sm text-white transition-all flex items-center justify-center gap-2"
              style="background:linear-gradient(90deg,#15803d,#22c55e)"
              onmouseover="this.style.filter='brightness(1.1)'" onmouseout="this.style.filter=''">
              <i :class="`bx ${copied ? 'bx-check' : 'bx-copy'}`"></i>
              {{ copied ? 'Copied!' : `Copy ${tab === 'css' ? 'CSS' : 'Tailwind'}` }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useClipboard } from '../../composables/useClipboard.js'

const props = defineProps({
  visible:  { type: Boolean, default: false },
  css:      { type: String, default: '' },
  tailwind: { type: String, default: '' },
})
const emit = defineEmits(['close'])

const tab = ref('css')
const dialog = ref(null)
let previousFocus
let previousOverflow
function restore() {
  if (previousOverflow !== undefined) document.body.style.overflow = previousOverflow
  previousOverflow = undefined
  previousFocus?.focus()
}
watch(() => props.visible, async visible => {
  if (!visible) { restore(); return }
  previousFocus = document.activeElement
  previousOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  tab.value = 'css'
  error.value = ''
  await nextTick()
  if (props.visible) dialog.value?.focus()
})
onBeforeUnmount(restore)
function handleKeydown(event) {
  if (event.key === 'Escape') { event.preventDefault(); emit('close') }
  if (event.key !== 'Tab') return
  const elements = [...dialog.value.querySelectorAll('button, [tabindex="0"]')]
  const first = elements[0], last = elements.at(-1)
  if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog.value)) {
    event.preventDefault(); last?.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault(); first?.focus()
  }
}
const { copied, error, copy } = useClipboard()
function handleCopy() { copy(tab.value === 'css' ? props.css : props.tailwind) }
</script>

<style scoped>
.sg-fade-enter-active, .sg-fade-leave-active { transition: opacity 0.2s ease; }
.sg-fade-enter-from, .sg-fade-leave-to { opacity: 0; }
</style>
