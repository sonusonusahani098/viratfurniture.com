<script setup lang="ts">
import { getServiceImage } from '~/utils/placeholder-map'

defineProps<{
  name: string
  slug: string
  description?: string
}>()

const { target, style } = useTilt(5)
</script>

<template>
  <div
    ref="target"
    :style="style"
    class="group relative flex flex-col overflow-hidden rounded-xl2 border border-surface-300 bg-white shadow-soft transition-shadow duration-300 will-change-transform hover:shadow-premium"
  >
    <NuxtLink :to="`/services/${slug}`" class="absolute inset-0 z-10" :aria-label="`${name} in Surat`" />
    <div class="relative aspect-[4/3] overflow-hidden">
      <img
        :src="getServiceImage(slug)"
        :alt="`${name} in Surat by Virat Furniture`"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        width="640"
        height="480"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-royal-900/70 via-royal-900/0 to-transparent" />
    </div>
    <div class="flex flex-1 flex-col p-5">
      <h3 class="font-display text-lg font-semibold text-royal-900 transition group-hover:text-royal-600">{{ name }}</h3>
      <p v-if="description" class="mt-2 text-sm leading-relaxed text-royal-600 line-clamp-2">{{ description }}</p>
      <span class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600">
        Explore Service
        <svg viewBox="0 0 20 20" class="h-4 w-4 transition-transform group-hover:translate-x-1"><path d="M7 5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
      </span>
    </div>
  </div>
</template>
