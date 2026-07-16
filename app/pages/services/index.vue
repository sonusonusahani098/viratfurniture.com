<script setup lang="ts">
import { services } from '~/utils/site-data'

usePageSeo({
  title: 'Furniture Services in Surat | Virat Furniture',
  description: 'Browse all furniture services from Virat Furniture — custom furniture, modular kitchens, wardrobes, office furniture and repair, serving Surat for over 20 years.',
  path: '/services',
  breadcrumbs: [{ name: 'Services' }],
})

const groups = computed(() => {
  const map: Record<string, typeof services> = {}
  for (const s of services) {
    if (!map[s.group]) map[s.group] = []
    map[s.group].push(s)
  }
  return map
})

const descriptions: Record<string, string> = {
  'custom-furniture': 'Bespoke pieces designed around your space, budget and taste.',
  'modular-furniture': 'Factory-finished modular units assembled fast with less on-site work.',
  'wooden-wardrobe': 'Solid wood wardrobes built for Surat homes, from budget to premium.',
  'sliding-wardrobe': 'Space-saving sliding wardrobes for compact apartment bedrooms.',
  'bedroom-furniture': 'Beds, side tables and storage units designed as complete sets.',
  'living-room-furniture': 'TV units, storage and seating designed to work together.',
  'tv-unit': 'Wall-mounted and floor TV units with integrated storage.',
  'modular-kitchen': 'Space-efficient modular kitchens with durable cabinets and fittings.',
  'office-furniture': 'Workstations, cabins and storage for offices of every size.',
  'office-workstation': 'Ergonomic desking systems for teams of any size.',
  'reception-counter': 'Custom reception counters that set the tone for your office.',
  'dining-table': 'Dining tables built to match your space and seating needs.',
  'wooden-partition': 'Decorative and functional partitions to divide open spaces.',
  'sofa-repair': 'Reupholstery and structural repair to bring old sofas back to life.',
  'furniture-repair': 'Restoration and repair for sofas, beds, cupboards and more.',
  'bed-repair': 'Frame, joint and hardware repair for wooden and upholstered beds.',
  'cupboard-repair': 'Door, hinge and panel repair for wardrobes and cupboards.',
  'polishing': 'Re-polishing and refinishing to restore natural wood shine.',
  'furniture-renovation': 'Redesigning and upgrading existing furniture instead of replacing it.',
  'wooden-ceiling': 'False ceiling and wooden panelling work for a premium interior finish.',
  'wall-panel': 'Decorative wall panelling in wood and veneer finishes.',
  'storage-cabinets': 'Additional storage solutions for homes and offices.',
  'study-table': 'Study and work-from-home desks built for the space available.',
  'bookshelf': 'Open and closed bookshelves designed to match your interiors.',
  'pooja-unit': 'Dedicated pooja units and mandir furniture in wood finishes.',
  'commercial-furniture': 'Furniture for shops, showrooms and commercial spaces.',
  'hotel-furniture': 'Furniture for hotel rooms, lobbies and common areas.',
  'restaurant-furniture': 'Durable, design-led furniture for restaurants and cafes.',
  'builder-furniture-work': 'Bulk furniture manufacturing for builder and construction projects.',
  'apartment-furniture-installation': 'Complete furniture installation for apartments before handover.',
}
</script>

<template>
  <div>
    <section class="border-b border-surface-300 bg-surface-100 py-6">
      <div class="container-px mx-auto">
        <Breadcrumbs :items="[{ name: 'Services' }]" />
      </div>
    </section>

    <section class="section-py">
      <div class="container-px mx-auto">
        <div class="reveal is-visible mx-auto max-w-2xl text-center">
          <p class="eyebrow">All Services</p>
          <h1 class="mt-5 font-display text-4xl font-bold text-royal-900">Furniture Services in Surat</h1>
          <p class="mt-4 text-royal-600">From a single repair to a full apartment fit-out — here's everything our team designs, builds and installs.</p>
        </div>

        <div v-for="(items, group) in groups" :key="group" class="mt-16 first:mt-12">
          <h2 class="font-display text-2xl font-semibold text-royal-900">{{ group }}</h2>
          <div class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ServiceCard v-for="s in items" :key="s.slug" :name="s.name" :slug="s.slug" :description="descriptions[s.slug]" />
          </div>
        </div>
      </div>
    </section>

    <section class="pb-16 md:pb-24">
      <div class="container-px mx-auto">
        <CtaBanner />
      </div>
    </section>
  </div>
</template>
