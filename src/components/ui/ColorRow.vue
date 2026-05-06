<template>
  <div class="flex items-center gap-2 flex-wrap">
    <label class="text-sm font-medium min-w-[90px] shrink-0" style="color:var(--text-dark)">{{ label }}</label>
    <input type="color" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
    <input type="text" :value="modelValue" @input="onHex" placeholder="#000000" class="sg-input w-24 text-sm" />
  </div>
</template>

<script setup>
const props = defineProps({ label: String, modelValue: String })
const emit = defineEmits(['update:modelValue'])
function onHex(e) {
  const v = e.target.value
  if (/^#([0-9A-F]{3}){1,2}$/i.test(v)) emit('update:modelValue', v)
}
</script>
