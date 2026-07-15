<script setup lang="ts">
const stats = [
  { target: 20, suffix: '+', label: 'Years of Experience' },
  { target: 15, suffix: '', label: 'Skilled Craftsmen' },
  { target: 31, suffix: '', label: 'Areas Served in Surat' },
  { target: 10, suffix: '+', label: 'Project Categories Served' },
]
</script>

<template>
  <section class="relative bg-gradient-to-br from-royal-900 via-royal-800 to-royal-900 py-14">
    <div class="pointer-events-none absolute inset-0 bg-grain" />
    <div class="container-px relative mx-auto grid grid-cols-2 gap-8 lg:grid-cols-4">
      <StatCounter v-for="s in stats" :key="s.label" :target="s.target" :suffix="s.suffix" :label="s.label" />
    </div>
  </section>
</template>
