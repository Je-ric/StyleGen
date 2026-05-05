import { ref } from 'vue'

export function useClipboard(duration = 1500) {
  const copied = ref(false)
  function copy(text) {
    navigator.clipboard.writeText(text).then(() => {
      copied.value = true
      setTimeout(() => (copied.value = false), duration)
    })
  }
  return { copied, copy }
}
