<template>
  <router-link :to="gen.path" class="gen-card sg-card p-5 flex flex-col gap-3" style="text-decoration:none">
    <div class="flex items-start justify-between gap-2">
      <div :class="`w-10 h-10 rounded-xl ${gen.iconBg} flex items-center justify-center ${gen.iconColor} text-xl shrink-0`">
        <i :class="`bx ${gen.icon}`"></i>
      </div>
      <span class="text-[10px] font-mono mt-0.5 shrink-0" style="color:var(--text-light)">{{ gen.num }}</span>
    </div>
    <div class="flex-1 min-w-0">
      <h2 class="text-sm font-semibold leading-snug" style="font-family:'Oswald',sans-serif;color:var(--text-dark)">{{ gen.name }}</h2>
      <p class="text-xs mt-1 leading-relaxed line-clamp-2" style="color:var(--text-light)">{{ gen.desc }}</p>
    </div>
    <div class="flex items-center gap-1 text-xs font-semibold mt-auto" style="color:var(--primary)">
      Try Now <i class="bx bx-right-arrow-alt text-sm"></i>
    </div>
  </router-link>
</template>

<script setup>
defineProps({ gen: { type: Object, required: true } })
</script>

<style scoped>
.gen-card { transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease; }
.gen-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(200,90,58,0.15);
  border-color: #e8c9b8;
}
</style>
