<script setup lang="ts">
defineProps<{
  items: { name: string; to?: string }[]
}>()
</script>

<template>
  <nav aria-label="Breadcrumb" class="text-sm">
    <ol class="flex flex-wrap items-center gap-1.5 text-royal-500">
      <li class="flex items-center gap-1.5">
        <NuxtLink to="/" class="transition hover:text-royal-700">Home</NuxtLink>
        <svg viewBox="0 0 20 20" class="h-3.5 w-3.5 text-royal-300"><path d="M7 5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
      </li>
      <li v-for="(item, i) in items" :key="item.name" class="flex items-center gap-1.5">
        <NuxtLink v-if="item.to && i < items.length - 1" :to="item.to" class="transition hover:text-royal-700">{{ item.name }}</NuxtLink>
        <span v-else class="font-medium text-royal-800">{{ item.name }}</span>
        <svg v-if="i < items.length - 1" viewBox="0 0 20 20" class="h-3.5 w-3.5 text-royal-300"><path d="M7 5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
      </li>
    </ol>
  </nav>
</template>
