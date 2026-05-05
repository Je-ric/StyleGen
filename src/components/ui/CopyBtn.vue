<template>
  <button @click="handleCopy" class="sg-btn sg-btn-primary">
    <i :class="`bx ${copied ? 'bx-check' : 'bx-copy'}`"></i>
    {{ copied ? 'Copied!' : label }}
  </button>
</template>

<script setup>
import { useClipboard } from '../../composables/useClipboard.js'
const props = defineProps({ text: { type: String, default: '' }, label: { type: String, default: 'Copy CSS' } })
const { copied, copy } = useClipboard()
function handleCopy() { copy(props.text) }
</script>
