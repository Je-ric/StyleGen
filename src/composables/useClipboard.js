import { onScopeDispose, ref } from 'vue'

export function useClipboard(duration = 1500) {
  const copied = ref(false)
  const error = ref('')
  let timer
  let request = 0
  async function copy(text) {
    const current = ++request
    clearTimeout(timer)
    copied.value = false
    error.value = ''
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(text)
      if (current !== request) return
      copied.value = true
      timer = setTimeout(() => (copied.value = false), duration)
    } catch {
      if (current === request) error.value = 'Could not copy. Select the code and copy it manually.'
    }
  }
  onScopeDispose(() => { clearTimeout(timer); request++ })
  return { copied, error, copy }
}
