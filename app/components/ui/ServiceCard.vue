<script setup lang="ts">
import { getServiceIcon } from '~/utils/service-icons'

defineProps<{
  name: string
  slug: string
  description?: string
}>()
</script>

<template>
  <div class="group relative flex h-full flex-col rounded-2xl border border-surface-300 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-300 hover:shadow-premium">
    <NuxtLink :to="`/services/${slug}`" class="absolute inset-0 z-10" :aria-label="`${name} in Surat`" />
    <div class="flex items-center gap-4">
      <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold-200 text-gold-600 transition-all duration-300 group-hover:border-gold-500 group-hover:bg-gold-500 group-hover:text-white">
        <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path :d="getServiceIcon(slug)" /></svg>
      </span>
      <h3 class="font-display text-lg font-semibold leading-snug text-royal-900 transition group-hover:text-royal-600">{{ name }}</h3>
    </div>
    <p v-if="description" class="mt-3.5 flex-1 text-sm leading-relaxed text-royal-600">{{ description }}</p>
    <span class="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-royal-600 transition-colors group-hover:text-gold-600">
      Explore Service
      <svg viewBox="0 0 20 20" class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"><path d="M3 10h13M12 5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
    </span>
  </div>
</template>
