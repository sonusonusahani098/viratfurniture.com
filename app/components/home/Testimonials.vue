<script setup lang="ts">
const sampleTestimonials = [
  {
    name: 'Sample Client',
    location: 'Adajan',
    project: 'Wardrobe & Bedroom Set',
    quote: 'This card shows how a real client testimonial will appear once added. Replace this placeholder with genuine feedback collected after project completion.',
  },
  {
    name: 'Sample Client',
    location: 'Vesu',
    project: 'Modular Kitchen',
    quote: 'Placeholder text only — swap in an actual quote from a homeowner or builder once you start collecting reviews for the site.',
  },
  {
    name: 'Sample Client',
    location: 'City Light',
    project: 'Office Workstations',
    quote: 'This is sample content demonstrating the testimonial layout. No real review has been added here yet.',
  },
]
</script>

<template>
  <section class="section-py bg-surface-200">
    <div class="container-px mx-auto">
      <div class="reveal mx-auto max-w-2xl text-center">
        <p class="eyebrow">Client Feedback</p>
        <h2 class="mt-5 font-display text-3xl font-semibold text-royal-900 sm:text-4xl">What Clients Say</h2>
        <p class="mt-4 text-royal-600">
          This section is ready to display genuine client testimonials. The cards below are placeholders —
          add real feedback as projects are completed.
        </p>
      </div>

      <div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div v-for="(t, i) in sampleTestimonials" :key="i" class="reveal" :style="{ animationDelay: `${i * 0.1}s` }">
          <TestimonialCard :name="t.name" :location="t.location" :project="t.project" :quote="t.quote" sample />
        </div>
      </div>
    </div>
  </section>
</template>
