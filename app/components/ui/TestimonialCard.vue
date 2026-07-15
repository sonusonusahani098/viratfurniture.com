<script setup lang="ts">
withDefaults(
  defineProps<{
    name: string
    location: string
    quote: string
    project: string
    sample?: boolean
  }>(),
  { sample: false }
)
</script>

<template>
  <div class="glass-card relative flex h-full flex-col p-7">
    <span v-if="sample" class="absolute right-5 top-5 rounded-full bg-royal-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-royal-500">
      Sample
    </span>
    <svg viewBox="0 0 32 24" class="h-7 w-7 text-gold-400" fill="currentColor"><path d="M0 24V14.4C0 6.4 4.8.8 12.8 0l1.6 3.2C8.8 4.8 6.4 8 6.4 11.2h6.4V24H0zm17.6 0V14.4c0-8 4.8-13.6 12.8-14.4L32 3.2c-5.6 1.6-8 4.8-8 8h6.4V24H17.6z"/></svg>
    <p class="mt-4 flex-1 text-[15px] leading-relaxed text-royal-800">{{ quote }}</p>
    <div class="mt-6 flex items-center gap-3 border-t border-royal-100 pt-5">
      <div class="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-royal-500 to-royal-700 font-display text-base font-semibold text-white">
        {{ name.charAt(0) }}
      </div>
      <div>
        <p class="text-sm font-semibold text-royal-900">{{ name }}</p>
        <p class="text-xs text-royal-500">{{ project }} · {{ location }}</p>
      </div>
    </div>
  </div>
</template>
