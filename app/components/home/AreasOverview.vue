<script setup lang="ts">
import { areas } from '~/utils/site-data'

const shown = areas.slice(0, 16)
</script>

<template>
  <section class="section-py">
    <div class="container-px mx-auto">
      <div class="reveal mx-auto max-w-2xl text-center">
        <p class="eyebrow">Service Areas</p>
        <h2 class="mt-5 font-display text-3xl font-semibold text-royal-900 sm:text-4xl">Serving Every Corner of Surat</h2>
        <p class="mt-4 text-royal-600">From Adajan to Sachin, our team travels across the city for site visits, measurements and installation — wherever your project is.</p>
      </div>

      <div class="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
        <div v-for="(a, i) in shown" :key="a.slug" class="reveal" :style="{ animationDelay: `${(i % 8) * 0.05}s` }">
          <AreaCard :name="a.name" :slug="a.slug" />
        </div>
      </div>

      <div class="reveal mt-12 text-center">
        <NuxtLink to="/areas" class="btn-outline">View All 31 Areas We Serve</NuxtLink>
      </div>
    </div>
  </section>
</template>
