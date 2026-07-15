<script setup lang="ts">
import { areas } from '~/utils/site-data'

usePageSeo({
  title: 'Areas We Serve in Surat | Virat Furniture',
  description: 'Virat Furniture provides custom furniture, wardrobes and repair services across 31+ areas of Surat including Adajan, Vesu, Piplod, City Light and more.',
  path: '/areas',
  breadcrumbs: [{ name: 'Areas We Serve' }],
})
</script>

<template>
  <div>
    <section class="border-b border-surface-300 bg-surface-100 py-6">
      <div class="container-px mx-auto">
        <Breadcrumbs :items="[{ name: 'Areas We Serve' }]" />
      </div>
    </section>

    <section class="section-py">
      <div class="container-px mx-auto">
        <div class="reveal is-visible mx-auto max-w-2xl text-center">
          <p class="eyebrow">Areas We Serve</p>
          <h1 class="mt-5 font-display text-4xl font-bold text-royal-900">Furniture Services Across Surat</h1>
          <p class="mt-4 text-royal-600">We travel across the city for measurement, delivery and installation. Find your area below for local details.</p>
        </div>

        <div class="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <AreaCard v-for="a in areas" :key="a.slug" :name="a.name" :slug="a.slug" />
        </div>
      </div>
    </section>

    <section class="pb-16 md:pb-24">
      <div class="container-px mx-auto">
        <CtaBanner title="Don't see your area listed?" description="We likely still serve it. Get in touch and we'll confirm right away." />
      </div>
    </section>
  </div>
</template>
