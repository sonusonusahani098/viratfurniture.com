<script setup lang="ts">
const featured = [
  {
    slug: 'custom-furniture',
    name: 'Custom Furniture',
    desc: 'Bespoke pieces designed around your space, budget and taste.',
    icon: 'M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5zM2 2l7.586 7.586M11 11a2 2 0 1 0 4 0 2 2 0 0 0-4 0z',
  },
  {
    slug: 'wooden-wardrobe',
    name: 'Wooden Wardrobes',
    desc: 'Hinged and loft wardrobes built to the millimetre for Surat bedrooms.',
    icon: 'M5 3h14a1 1 0 0 1 1 1v17H4V4a1 1 0 0 1 1-1zM12 3v18M9.5 12v2M14.5 12v2',
  },
  {
    slug: 'modular-kitchen',
    name: 'Modular Kitchens',
    desc: 'Space-efficient kitchens with durable cabinets and branded fittings.',
    icon: 'M3 9h18M3 9v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9M3 9l2-5h14l2 5M12 13v4M7 13v4M17 13v4',
  },
  {
    slug: 'bedroom-furniture',
    name: 'Bedroom Furniture',
    desc: 'Beds, side tables and storage designed as one complete set.',
    icon: 'M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 18h18M3 18v2M21 18v2M6 10V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3',
  },
  {
    slug: 'tv-unit',
    name: 'TV Units',
    desc: 'Wall-mounted and floor units with clean cable and storage planning.',
    icon: 'M3 5h18a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM8 21h8M12 17v4',
  },
  {
    slug: 'office-furniture',
    name: 'Office Furniture',
    desc: 'Workstations, cabins and reception counters for offices of every size.',
    icon: 'M4 21V8a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v13M2 21h20M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3M9 12h6',
  },
  {
    slug: 'sliding-wardrobe',
    name: 'Sliding Wardrobes',
    desc: 'Space-saving sliding doors for compact apartment bedrooms.',
    icon: 'M4 3h16a1 1 0 0 1 1 1v17H3V4a1 1 0 0 1 1-1zM11 3v18M11 3l-8 0M8 11v3M15 11v3',
  },
  {
    slug: 'furniture-repair',
    name: 'Furniture Repair',
    desc: 'Restoration, polishing and repair for sofas, beds and cupboards.',
    icon: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4L15 12l-3-3 2.7-2.7z',
  },
]
</script>

<template>
  <section class="section-py bg-white">
    <div class="container-px mx-auto">
      <div class="reveal mx-auto max-w-2xl text-center">
        <p class="kicker kicker-center justify-center">What We Build</p>
        <h2 class="mt-6 font-display text-3xl font-bold text-royal-900 sm:text-[2.6rem] sm:leading-tight">
          One workshop, <em class="italic text-royal-600">every</em> kind of furniture
        </h2>
        <p class="mt-5 text-[17px] leading-relaxed text-royal-600">
          From a single wardrobe to a full apartment fit-out, our team handles design, manufacturing and on-site installation — start to finish.
        </p>
      </div>

      <div class="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <NuxtLink
          v-for="(s, i) in featured"
          :key="s.slug"
          :to="`/services/${s.slug}`"
          class="reveal group relative flex h-full flex-col rounded-2xl border border-surface-300 bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-300 hover:shadow-premium"
          :style="{ animationDelay: `${(i % 4) * 0.07}s` }"
        >
          <div class="flex items-start justify-between">
            <span class="font-display text-sm italic text-royal-300 transition-colors group-hover:text-gold-600">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="flex h-11 w-11 items-center justify-center rounded-full border border-gold-200 text-gold-600 transition-all duration-300 group-hover:border-gold-500 group-hover:bg-gold-500 group-hover:text-white">
              <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path :d="s.icon" /></svg>
            </span>
          </div>
          <h3 class="mt-7 font-display text-xl font-semibold text-royal-900">{{ s.name }}</h3>
          <p class="mt-2.5 flex-1 text-sm leading-relaxed text-royal-600">{{ s.desc }}</p>
          <span class="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-royal-600 transition-colors group-hover:text-gold-600">
            Explore
            <svg viewBox="0 0 20 20" class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10h13M12 5l5 5-5 5" /></svg>
          </span>
        </NuxtLink>
      </div>

      <div class="reveal mt-14 text-center">
        <NuxtLink to="/services" class="btn-outline !px-8">View All 30 Services</NuxtLink>
      </div>
    </div>
  </section>
</template>
