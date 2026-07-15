<script setup lang="ts">
usePageSeo({
  title: 'Our Projects | Virat Furniture, Surat',
  description: 'Virat Furniture takes on residential and commercial furniture projects across Surat — apartments, villas, offices, hotels, restaurants and builder developments.',
  path: '/projects',
  breadcrumbs: [{ name: 'Projects' }],
})

const categories = [
  { name: 'Apartments & Flats', image: '/images/art/living-room.svg' },
  { name: 'Villas & Bungalows', image: '/images/art/hotel.svg' },
  { name: 'Office & Commercial', image: '/images/art/office.svg' },
  { name: 'Hotels & Restaurants', image: '/images/art/restaurant.svg' },
  { name: 'Builder Projects', image: '/images/art/building.svg' },
  { name: 'High-Rise Towers', image: '/images/art/building.svg' },
]
</script>

<template>
  <div>
    <section class="border-b border-surface-300 bg-surface-100 py-6">
      <div class="container-px mx-auto">
        <Breadcrumbs :items="[{ name: 'Projects' }]" />
      </div>
    </section>

    <section class="section-py">
      <div class="container-px mx-auto">
        <div class="mx-auto max-w-2xl text-center">
          <p class="eyebrow">Our Projects</p>
          <h1 class="mt-5 font-display text-4xl font-bold text-royal-900">Work Across Surat</h1>
          <p class="mt-4 text-royal-600">
            Over 20 years, we've taken on furniture projects across every category below. We're currently building
            out a detailed project gallery with photos from completed work — in the meantime, browse by category
            or get in touch to discuss a similar project.
          </p>
        </div>

        <div class="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="c in categories" :key="c.name" class="group overflow-hidden rounded-xl2 border border-surface-300 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-premium">
            <div class="aspect-[4/3] overflow-hidden">
              <img :src="c.image" :alt="`${c.name} furniture projects by Virat Furniture`" loading="lazy" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110">
            </div>
            <div class="p-5">
              <p class="font-display text-lg font-semibold text-royal-900">{{ c.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pb-16 md:pb-24">
      <div class="container-px mx-auto">
        <CtaBanner title="Have a similar project in mind?" description="Tell us about it and we'll put together a free estimate." />
      </div>
    </section>
  </div>
</template>
