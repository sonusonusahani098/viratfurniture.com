<script setup lang="ts">
usePageSeo({
  title: 'Furniture Gallery | Virat Furniture, Surat',
  description: 'Browse furniture styles and categories crafted by Virat Furniture — wardrobes, beds, kitchens, office furniture and more, made in Surat.',
  path: '/gallery',
  breadcrumbs: [{ name: 'Gallery' }],
})

const items = [
  { name: 'Living Room Furniture', image: '/images/placeholders/hero-living-room.svg' },
  { name: 'Bedroom Furniture', image: '/images/placeholders/hero-bedroom.svg' },
  { name: 'Wooden Wardrobes', image: '/images/placeholders/category-wardrobe.svg' },
  { name: 'Sliding Wardrobes', image: '/images/placeholders/category-sliding-wardrobe.svg' },
  { name: 'Modern Beds', image: '/images/placeholders/category-modern-bed.svg' },
  { name: 'TV Units', image: '/images/placeholders/category-tv-unit.svg' },
  { name: 'Modular Kitchens', image: '/images/placeholders/category-kitchen.svg' },
  { name: 'Office Furniture', image: '/images/placeholders/category-office.svg' },
  { name: 'Workstations', image: '/images/placeholders/category-workstation.svg' },
  { name: 'Reception Counters', image: '/images/placeholders/category-reception.svg' },
  { name: 'Luxury Wooden Furniture', image: '/images/placeholders/category-luxury-wood.svg' },
  { name: 'Study Tables', image: '/images/placeholders/category-study-table.svg' },
  { name: 'Bookshelves', image: '/images/placeholders/category-bookshelf.svg' },
  { name: 'Pooja Units', image: '/images/placeholders/category-pooja-unit.svg' },
  { name: 'Wall Panels', image: '/images/placeholders/category-wall-panel.svg' },
  { name: 'Wooden Ceilings', image: '/images/placeholders/category-wooden-ceiling.svg' },
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
