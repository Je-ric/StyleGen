<template>
  <div class="flex items-center gap-3 mb-3">
    <label class="text-sm font-medium min-w-[100px]" style="color:var(--text-dark)">{{ label }}:</label>
    <input type="range" :min="min" :max="max" :step="step" :value="modelValue" @input="$emit('update:modelValue', +$event.target.value)" class="flex-1" />
    <span class="text-sm font-bold min-w-[50px] text-right" style="color:var(--primary)">{{ modelValue }}{{ unit }}</span>
  </div>
</template>

<script setup>
defineProps({ label: String, modelValue: Number, min: { type: Number, default: 0 }, max: { type: Number, default: 100 }, step: { type: Number, default: 1 }, unit: { type: String, default: '' } })
defineEmits(['update:modelValue'])
</script>
