<template>
  <article class="generator-tile">
  <button class="favorite-toggle" :class="{ saved: favorite }" :aria-label="`${favorite ? 'Remove' : 'Save'} ${gen.name} ${favorite ? 'from' : 'to'} favorites`" :aria-pressed="favorite" @click="$emit('toggle-favorite')"><span v-if="favorite" aria-hidden="true">&#9733;</span><span v-else aria-hidden="true">&#9734;</span></button>
  <router-link :to="gen.path" class="gen-card bg-white rounded-2xl p-5 flex flex-col gap-3"
    style="border:1px solid var(--border);box-shadow:var(--shadow-sm);text-decoration:none">
    <div class="flex items-start justify-between gap-2">
      <div :class="`w-11 h-11 rounded-xl ${gen.iconBg} flex items-center justify-center text-xl shrink-0 ${gen.iconColor}`">
        <i :class="`bx ${gen.icon}`"></i>
      </div>
    </div>
    <div class="flex-1 min-w-0">
      <h2 class="text-sm font-bold leading-snug transition-colors" style="color:var(--text-dark)">{{ gen.name }}</h2>
      <p class="text-xs mt-1 leading-relaxed line-clamp-2" style="color:var(--text-light)">{{ gen.desc }}</p>
    </div>
    <div class="flex items-center gap-1 text-xs font-bold mt-auto" style="color:var(--primary)">
      Try Now <i class="bx bx-right-arrow-alt text-sm"></i>
    </div>
  </router-link>
  </article>
</template>

<script setup>
defineProps({ gen: { type: Object, required: true }, favorite: Boolean })
defineEmits(['toggle-favorite'])
</script>

<style scoped>
.gen-card { transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease; }
.gen-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 28px rgba(22,163,74,0.18);
  border-color: #4ade80;
}
.gen-card:hover h2 { color: #16a34a; }
</style>
