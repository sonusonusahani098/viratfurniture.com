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
  <div class="relative flex h-full flex-col rounded-2xl border border-surface-300 bg-white p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-premium">
    <span v-if="sample" class="absolute right-5 top-5 rounded-full bg-surface-200 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-royal-500">
      Sample
    </span>
    <span class="font-display text-6xl font-bold leading-none text-gold-400" aria-hidden="true">&ldquo;</span>
    <p class="mt-2 flex-1 text-[15px] leading-relaxed text-royal-700">{{ quote }}</p>
    <div class="mt-7 flex items-center gap-3.5 border-t border-surface-300 pt-6">
      <div class="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-royal-500 to-royal-800 font-display text-base font-semibold text-white">
        {{ name.charAt(0) }}
      </div>
      <div>
        <p class="font-display text-[15px] font-semibold text-royal-900">{{ name }}</p>
        <p class="mt-0.5 text-xs uppercase tracking-wide text-royal-500">{{ project }} · {{ location }}</p>
      </div>
    </div>
  </div>
</template>
