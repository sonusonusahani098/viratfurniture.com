<script setup lang="ts">
import { areas } from '~/utils/site-data'

const shown = areas.slice(0, 18)
</script>

<template>
  <section class="relative section-py overflow-hidden bg-surface-200">
    <div class="pointer-events-none absolute inset-0 bg-grain" />
    <div class="container-px relative mx-auto">
      <div class="reveal mx-auto max-w-2xl text-center">
        <p class="kicker kicker-center justify-center">Service Areas</p>
        <h2 class="mt-6 font-display text-3xl font-bold text-royal-900 sm:text-[2.6rem] sm:leading-tight">
          Serving <em class="italic text-royal-600">every corner</em> of Surat
        </h2>
        <p class="mt-5 text-[17px] leading-relaxed text-royal-600">
          From Adajan to Sachin, our team travels across the city for site visits, measurements and installation — wherever your project is.
        </p>
      </div>

      <div class="reveal mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-3">
        <NuxtLink
          v-for="(a, i) in shown"
          :key="a.slug"
          :to="`/areas/${a.slug}`"
          class="reveal rounded-full border border-surface-400/70 bg-white px-5 py-2.5 text-sm font-medium text-royal-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400 hover:bg-gold-50 hover:text-royal-900 hover:shadow-soft"
          :style="{ animationDelay: `${(i % 9) * 0.04}s` }"
        >
          {{ a.name }}
        </NuxtLink>
        <NuxtLink
          to="/areas"
          class="rounded-full bg-royal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-royal-700 hover:shadow-premium"
        >
          +{{ areas.length - shown.length }} more areas →
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
