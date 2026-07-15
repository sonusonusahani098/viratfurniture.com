<script setup lang="ts">
import { business } from '~/utils/site-data'
</script>

<template>
  <section class="section-py">
    <div class="container-px mx-auto">
      <div class="reveal grid grid-cols-1 gap-8 overflow-hidden rounded-xl3 border border-surface-300 bg-white shadow-premium lg:grid-cols-2">
        <div class="flex flex-col justify-center p-8 sm:p-12">
          <p class="eyebrow w-fit">Visit Us</p>
          <h2 class="mt-5 font-display text-3xl font-semibold text-royal-900">Our Workshop &amp; Showroom</h2>
          <p class="mt-4 text-royal-600">{{ business.address }}</p>
          <div class="mt-6 space-y-2 text-sm text-royal-700">
            <p><span class="font-semibold text-royal-900">Hours:</span> {{ business.hours.weekdays }}</p>
            <p>{{ business.hours.sunday }}</p>
          </div>
          <div class="mt-8 flex flex-wrap gap-4">
            <a :href="business.mapLink" target="_blank" rel="noopener" class="btn-primary">Get Directions</a>
            <a :href="`tel:${business.phoneRaw}`" class="btn-outline">{{ business.phone }}</a>
          </div>
        </div>
        <div class="min-h-[320px]">
          <iframe
            :src="business.mapEmbedSrc"
            class="h-full min-h-[320px] w-full grayscale-[15%]"
            style="border: 0"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Virat Furniture location on Google Maps"
          />
        </div>
      </div>
    </div>
  </section>
</template>
