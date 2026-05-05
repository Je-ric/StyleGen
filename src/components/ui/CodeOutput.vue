<template>
  <div class="sg-card p-4 flex flex-col gap-3">
    <div class="flex items-center justify-between">
      <span class="sg-section-title">Generated CSS</span>
      <CopyBtn :text="code" />
    </div>
    <pre class="sg-code">{{ code }}</pre>
  </div>
</template>

<script setup>
import CopyBtn from './CopyBtn.vue'
defineProps({ code: { type: String, default: '' } })
</script>
