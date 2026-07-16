<script setup lang="ts">
usePageSeo({
  title: 'Our Projects | Virat Furniture, Surat',
  description: 'Virat Furniture takes on residential and commercial furniture projects across Surat — apartments, villas, offices, hotels, restaurants and builder developments.',
  path: '/projects',
  breadcrumbs: [{ name: 'Projects' }],
})

const categories = [
  {
    name: 'Apartments & Flats',
    icon: 'M3 21V8l7-5 7 5M10 21v-6h4v6M17 11h4v10M2 21h20',
    desc: 'Complete fit-outs for 2, 3 and 4 BHK flats — wardrobes, kitchens, TV units and storage planned as one set.',
    note: '2–4 BHK fit-outs',
  },
  {
    name: 'Villas & Bungalows',
    icon: 'M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6',
    desc: 'Larger-format custom work — full-height wardrobes, wooden ceilings, panelling and bespoke pieces.',
    note: 'Full-home custom work',
  },
  {
    name: 'Office & Commercial',
    icon: 'M4 21V8a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v13M2 21h20M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3M9 12h6',
    desc: 'Workstations, cabins, reception counters and storage for offices, shops and showrooms.',
    note: 'Teams of 5 to 100+',
  },
  {
    name: 'Hotels & Restaurants',
    icon: 'M3 21V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v16M1 21h22M7 8h2M11 8h2M15 8h2M10 21v-4h4v4',
    desc: 'Room furniture, seating, tables and counters built for daily commercial use and easy upkeep.',
    note: 'Hospitality-grade builds',
  },
  {
    name: 'Builder Projects',
    icon: 'M6 22V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v18M9 9h1M9 13h1M14 9h1M14 13h1M9 22v-4h6v4M2 22h20',
    desc: 'Repeatable furniture packages across dozens of flats, coordinated with site teams and possession dates.',
    note: 'Bulk, on schedule',
  },
  {
    name: 'High-Rise Towers',
    icon: 'M8 22V2h8v20M4 22h16M11 6h2M11 10h2M11 14h2M11 18h2',
    desc: 'Regular work in 12, 15, 18 and 21-floor residential towers across Surat’s new corridors.',
    note: 'Up to 21 floors',
  },
]
</script>

<template>
  <div>
    <section class="border-b border-surface-300 bg-surface-100 py-6">
      <div class="container-px mx-auto">
        <Breadcrumbs :items="[{ name: 'Projects' }]" />
      </div>
    </section>

    <section class="relative overflow-hidden bg-gradient-to-b from-[#F7F4EC] to-white section-py">
      <div class="pointer-events-none absolute inset-0 bg-grain" />
      <div class="container-px relative mx-auto">
        <div class="mx-auto max-w-2xl text-center">
          <p class="kicker kicker-center justify-center">Our Projects</p>
          <h1 class="mt-6 font-display text-4xl font-bold text-royal-900">
            Work across <em class="italic text-royal-600">Surat</em>
          </h1>
          <p class="mt-5 text-[17px] leading-relaxed text-royal-600">
            Over 20 years we've taken on furniture projects in every category below. Photos from completed
            work are being added to the <NuxtLink to="/gallery" class="font-semibold text-royal-600 underline decoration-gold-400 decoration-2 underline-offset-2">gallery</NuxtLink> —
            in the meantime, browse by category or get in touch to discuss a similar project.
          </p>
        </div>

        <div class="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(c, i) in categories"
            :key="c.name"
            class="reveal group relative flex h-full flex-col rounded-2xl border border-surface-300 bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-300 hover:shadow-premium"
            :style="{ animationDelay: `${(i % 3) * 0.08}s` }"
          >
            <div class="flex items-start justify-between">
              <span class="flex h-12 w-12 items-center justify-center rounded-2xl border border-gold-200 text-gold-600 transition-all duration-300 group-hover:border-gold-500 group-hover:bg-gold-500 group-hover:text-white">
                <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path :d="c.icon" /></svg>
              </span>
              <span class="font-display text-sm italic text-royal-300 transition-colors group-hover:text-gold-600">{{ String(i + 1).padStart(2, '0') }}</span>
            </div>
            <h2 class="mt-6 font-display text-xl font-semibold text-royal-900">{{ c.name }}</h2>
            <p class="mt-2.5 flex-1 text-sm leading-relaxed text-royal-600">{{ c.desc }}</p>
            <p class="mt-5 border-t border-surface-300 pt-4 text-xs font-semibold uppercase tracking-wider text-royal-500">{{ c.note }}</p>
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
