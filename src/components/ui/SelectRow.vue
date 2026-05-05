<template>
  <div class="flex items-center gap-3 mb-3 flex-wrap">
    <label class="text-sm font-medium min-w-[100px]" style="color:var(--text-dark)">{{ label }}:</label>
    <select :value="modelValue" @change="$emit('update:modelValue', $event.target.value)"
      class="sg-input w-auto text-sm cursor-pointer">
      <option v-for="opt in options" :key="opt" :value="opt">{{ opt }}</option>
    </select>
  </div>
</template>

<script setup>
defineProps({ label: String, modelValue: String, options: Array })
defineEmits(['update:modelValue'])
</script>
