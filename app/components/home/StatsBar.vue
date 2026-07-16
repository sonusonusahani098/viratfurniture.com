<script setup lang="ts">
import { areas } from '~/utils/site-data'

const stats = [
  { target: 20, suffix: '+', label: 'Years of Experience' },
  { target: 15, suffix: '', label: 'Skilled Craftsmen' },
  { target: areas.length, suffix: '', label: 'Areas Served in Surat' },
  { target: 10, suffix: '+', label: 'Project Categories' },
]
</script>

<template>
  <section class="relative border-b border-surface-300 bg-surface-100 py-12">
    <div class="pointer-events-none absolute inset-0 bg-grain" />
    <div class="container-px relative mx-auto grid grid-cols-2 gap-y-10 sm:divide-x sm:divide-surface-300 lg:grid-cols-4">
      <StatCounter v-for="s in stats" :key="s.label" :target="s.target" :suffix="s.suffix" :label="s.label" />
    </div>
  </section>
</template>
