<script setup lang="ts">
defineProps<{
  name: string
  slug: string
}>()
</script>

<template>
  <div class="group relative overflow-hidden rounded-xl border border-surface-300 bg-white p-4 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-premium">
    <NuxtLink :to="`/areas/${slug}`" class="absolute inset-0 z-10" :aria-label="`Furniture services in ${name}, Surat`" />
    <div class="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-royal-50 text-royal-600 transition group-hover:bg-gold-500 group-hover:text-white">
      <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>
    </div>
    <p class="mt-2.5 text-sm font-semibold text-royal-900">{{ name }}</p>
  </div>
</template>
