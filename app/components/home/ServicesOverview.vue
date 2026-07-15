<script setup lang="ts">
import { services } from '~/utils/site-data'

const descriptions: Record<string, string> = {
  'custom-furniture': 'Bespoke pieces designed around your space, budget and taste.',
  'wooden-wardrobe': 'Solid wood wardrobes built for Surat homes, from budget to premium.',
  'modular-kitchen': 'Space-efficient modular kitchens with durable cabinets and fittings.',
  'office-furniture': 'Workstations, cabins and storage for offices of every size.',
  'bedroom-furniture': 'Beds, side tables and storage units designed as complete sets.',
  'tv-unit': 'Wall-mounted and floor TV units with integrated storage.',
  'sliding-wardrobe': 'Space-saving sliding wardrobes for compact apartment bedrooms.',
  'furniture-repair': 'Restoration and repair for sofas, beds, cupboards and more.',
}

const featured = services.filter((s) => descriptions[s.slug])
</script>

<template>
  <section class="section-py">
    <div class="container-px mx-auto">
      <div class="reveal mx-auto max-w-2xl text-center">
        <p class="eyebrow">What We Build</p>
        <h2 class="mt-5 font-display text-3xl font-semibold text-royal-900 sm:text-4xl">Furniture Services for Every Space</h2>
        <p class="mt-4 text-royal-600">From a single wardrobe to a full apartment fit-out, our team handles design, manufacturing and on-site installation — start to finish.</p>
      </div>

      <div class="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="(s, i) in featured" :key="s.slug" class="reveal" :style="{ animationDelay: `${(i % 4) * 0.08}s` }">
          <ServiceCard :name="s.name" :slug="s.slug" :description="descriptions[s.slug]" />
        </div>
      </div>

      <div class="reveal mt-12 text-center">
        <NuxtLink to="/services" class="btn-outline">View All 30 Services</NuxtLink>
      </div>
    </div>
  </section>
</template>
