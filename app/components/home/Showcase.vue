<script setup lang="ts">
const items = [
  { name: 'Living Rooms', slug: 'living-room-furniture', image: '/images/art/living-room.svg' },
  { name: 'Wardrobes', slug: 'wooden-wardrobe', image: '/images/art/wardrobe.svg' },
  { name: 'Modular Kitchens', slug: 'modular-kitchen', image: '/images/art/kitchen.svg' },
  { name: 'Bedrooms', slug: 'bedroom-furniture', image: '/images/art/bedroom.svg' },
  { name: 'TV Units', slug: 'tv-unit', image: '/images/art/tv-unit.svg' },
  { name: 'Offices', slug: 'office-furniture', image: '/images/art/office.svg' },
  { name: 'Dining Sets', slug: 'dining-table', image: '/images/art/dining.svg' },
  { name: 'Pooja Units', slug: 'pooja-unit', image: '/images/art/pooja.svg' },
]
</script>

<template>
  <section class="section-py overflow-hidden bg-white" aria-label="Furniture spaces we craft">
    <div class="container-px mx-auto">
      <div class="reveal flex flex-wrap items-end justify-between gap-6">
        <div class="max-w-xl">
          <p class="eyebrow">Spaces We Craft</p>
          <h2 class="mt-5 font-display text-3xl font-semibold text-royal-900 sm:text-4xl">One Team, Every Room</h2>
        </div>
        <NuxtLink to="/gallery" class="btn-outline">Browse the Gallery</NuxtLink>
      </div>
    </div>

    <div class="marquee mt-12" role="list">
      <div class="marquee-track">
        <template v-for="pass in 2">
          <NuxtLink
            v-for="item in items"
            :key="`${pass}-${item.slug}`"
            :to="`/services/${item.slug}`"
            role="listitem"
            :aria-hidden="pass === 2 ? 'true' : undefined"
            :tabindex="pass === 2 ? -1 : undefined"
            class="group relative mx-3 block w-64 shrink-0 overflow-hidden rounded-xl2 border border-surface-300 shadow-soft transition-shadow duration-300 hover:shadow-premium sm:w-72"
          >
            <img
              :src="item.image"
              :alt="`${item.name} crafted by Virat Furniture, Surat`"
              loading="lazy"
              class="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110"
              width="576"
              height="432"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-royal-900/75 via-royal-900/5 to-transparent" />
            <div class="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
              <p class="font-display text-base font-semibold text-white">{{ item.name }}</p>
              <span class="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition group-hover:bg-gold-500">
                <svg viewBox="0 0 20 20" class="h-4 w-4"><path d="M7 5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
              </span>
            </div>
          </NuxtLink>
        </template>
      </div>
    </div>
  </section>
</template>
