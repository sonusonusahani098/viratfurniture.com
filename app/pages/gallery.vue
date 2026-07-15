<script setup lang="ts">
usePageSeo({
  title: 'Furniture Gallery | Virat Furniture, Surat',
  description: 'Browse furniture styles and categories crafted by Virat Furniture — wardrobes, beds, kitchens, office furniture and more, made in Surat.',
  path: '/gallery',
  breadcrumbs: [{ name: 'Gallery' }],
})

const items = [
  { name: 'Living Room Furniture', image: '/images/art/living-room.svg' },
  { name: 'Bedroom Furniture', image: '/images/art/bedroom.svg' },
  { name: 'Wooden Wardrobes', image: '/images/art/wardrobe.svg' },
  { name: 'Sliding Wardrobes', image: '/images/art/sliding-wardrobe.svg' },
  { name: 'Modern Beds', image: '/images/art/modern-bed.svg' },
  { name: 'TV Units', image: '/images/art/tv-unit.svg' },
  { name: 'Modular Kitchens', image: '/images/art/kitchen.svg' },
  { name: 'Office Furniture', image: '/images/art/office.svg' },
  { name: 'Reception Counters', image: '/images/art/reception.svg' },
  { name: 'Dining Tables', image: '/images/art/dining.svg' },
  { name: 'Study Tables', image: '/images/art/study.svg' },
  { name: 'Bookshelves', image: '/images/art/bookshelf.svg' },
  { name: 'Pooja Units', image: '/images/art/pooja.svg' },
  { name: 'Wooden Wall & Ceiling Work', image: '/images/art/woodwork.svg' },
  { name: 'Storage Cabinets', image: '/images/art/storage.svg' },
  { name: 'Hotel & Restaurant Furniture', image: '/images/art/restaurant.svg' },
]
</script>

<template>
  <div>
    <section class="border-b border-surface-300 bg-surface-100 py-6">
      <div class="container-px mx-auto">
        <Breadcrumbs :items="[{ name: 'Gallery' }]" />
      </div>
    </section>

    <section class="section-py">
      <div class="container-px mx-auto">
        <div class="mx-auto max-w-2xl text-center">
          <p class="eyebrow">Gallery</p>
          <h1 class="mt-5 font-display text-4xl font-bold text-royal-900">Furniture Styles We Build</h1>
          <p class="mt-4 text-royal-600">
            A preview of the categories we work in. We're adding real project photography here soon —
            for now, each image represents a category we regularly build for Surat homes and offices.
          </p>
        </div>

        <div class="mt-14 columns-2 gap-5 sm:columns-3 lg:columns-4 [&>*]:mb-5">
          <div v-for="(item, i) in items" :key="item.name" class="group break-inside-avoid overflow-hidden rounded-xl2 border border-surface-300 bg-white shadow-soft transition hover:shadow-premium">
            <div :class="i % 3 === 0 ? 'aspect-[4/5]' : 'aspect-square'" class="overflow-hidden">
              <img :src="item.image" :alt="`${item.name} by Virat Furniture, Surat`" loading="lazy" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110">
            </div>
            <p class="p-4 text-sm font-semibold text-royal-900">{{ item.name }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="pb-16 md:pb-24">
      <div class="container-px mx-auto">
        <CtaBanner title="Like what you see?" description="Tell us which style fits your space and we'll help you plan it." />
      </div>
    </section>
  </div>
</template>
