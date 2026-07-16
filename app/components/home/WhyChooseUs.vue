<script setup lang="ts">
const points = [
  {
    title: '20+ Years in Furniture Making',
    desc: 'Two decades manufacturing, installing and repairing furniture across Surat — we\'ve seen every kind of space and requirement.',
    icon: 'M12 2l3 7h7l-5.5 4.5L18.5 21 12 16.5 5.5 21l2-7.5L2 9h7z',
  },
  {
    title: 'In-House Team of 15',
    desc: 'No outsourced labour. Our own carpenters and installers see every project through from measurement to final fitting.',
    icon: 'M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M11 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  },
  {
    title: 'Residential & Commercial',
    desc: 'Apartments, villas, bungalows, offices, shops, hotels and restaurants — we adapt to the scale each project demands.',
    icon: 'M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6',
  },
  {
    title: 'Built for High-Rise Projects',
    desc: 'Regular experience with 12, 15, 18 and 21-floor residential towers, coordinating directly with builders and site teams.',
    icon: 'M6 22V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v18M9 9h1M9 13h1M14 9h1M14 13h1M9 22v-4h6v4',
  },
  {
    title: 'Quality Materials, Honest Pricing',
    desc: 'Durable timber and hardware suited to Surat\'s climate, quoted clearly before work begins — no hidden costs.',
    icon: 'M9 12l2 2 4-4M12 22c4.97-1.4 8-5.4 8-10V5l-8-3-8 3v7c0 4.6 3.03 8.6 8 10z',
  },
  {
    title: 'On-Time Delivery',
    desc: 'We plan around your possession dates and renovation timelines so your furniture is ready when you need it.',
    icon: 'M12 8v4l3 3M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z',
  },
]
</script>

<template>
  <section class="section-py bg-white">
    <div class="container-px mx-auto">
      <div class="reveal mx-auto max-w-2xl text-center">
        <p class="kicker kicker-center justify-center">Why Virat Furniture</p>
        <h2 class="mt-6 font-display text-3xl font-bold text-royal-900 sm:text-[2.6rem] sm:leading-tight">
          Built on experience, <em class="italic text-royal-600">not promises</em>
        </h2>
        <p class="mt-5 text-[17px] leading-relaxed text-royal-600">
          Everything we do is grounded in two decades of real project work across Surat's homes and businesses.
        </p>
      </div>

      <div class="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(p, i) in points"
          :key="p.title"
          class="reveal group rounded-2xl border border-surface-300 bg-surface-100 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:bg-white hover:shadow-premium"
          :style="{ animationDelay: `${(i % 3) * 0.08}s` }"
        >
          <div class="flex items-center gap-4">
            <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold-200 bg-white text-gold-600 transition-colors duration-300 group-hover:border-gold-500 group-hover:bg-gold-500 group-hover:text-white">
              <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path :d="p.icon" /></svg>
            </span>
            <h3 class="font-display text-lg font-semibold leading-snug text-royal-900">{{ p.title }}</h3>
          </div>
          <p class="mt-4 text-sm leading-relaxed text-royal-600">{{ p.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
