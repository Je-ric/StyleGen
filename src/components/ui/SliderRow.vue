<template>
  <div class="flex flex-col gap-1">
    <div class="flex items-center justify-between">
      <label class="text-xs font-semibold" style="color:var(--text-light)">{{ label }}</label>
      <span class="text-xs font-bold tabular-nums" style="color:var(--primary)">{{ modelValue }}{{ unit }}</span>
    </div>
    <input type="range" :min="min" :max="max" :step="step" :value="modelValue"
      @input="$emit('update:modelValue', +$event.target.value)" class="w-full" />
  </div>
</template>

<script setup>
defineProps({
  label:      String,
  modelValue: Number,
  min:        { type: Number, default: 0 },
  max:        { type: Number, default: 100 },
  step:       { type: Number, default: 1 },
  unit:       { type: String, default: '' },
})
defineEmits(['update:modelValue'])
</script>
