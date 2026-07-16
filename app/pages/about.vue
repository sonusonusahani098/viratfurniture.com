<script setup lang="ts">
import { business } from '~/utils/site-data'

usePageSeo({
  title: 'About Us | Virat Furniture, Surat',
  description: '20+ years of furniture manufacturing in Surat. Meet the team behind Virat Furniture and learn how we design, build and install custom furniture across the city.',
  path: '/about',
  breadcrumbs: [{ name: 'About' }],
})

useSchemaOrg([
  defineWebPage({ '@type': 'AboutPage' }),
])

const projectTypes = [
  'Apartments', 'Villas', 'Bungalows', 'Commercial Offices', 'Shops', 'Hotels',
  'Restaurants', 'High-Rise Residential Towers', 'New Construction Projects',
  'Interior Contractors', 'Builders',
]

const timeline = [
  { year: '20+ Years Ago', text: 'Started as a small furniture workshop serving local Surat families with made-to-measure wooden furniture.' },
  { year: 'Over the Years', text: 'Grew into a full manufacturing setup with an in-house team, taking on larger residential and commercial projects across the city.' },
  { year: 'Today', text: 'A 15-member team handling everything from single-room custom furniture to bulk builder projects across 12 to 21-floor towers.' },
]
</script>

<template>
  <div>
    <section class="border-b border-surface-300 bg-surface-100 py-6">
      <div class="container-px mx-auto">
        <Breadcrumbs :items="[{ name: 'About' }]" />
      </div>
    </section>

    <section class="relative overflow-hidden bg-gradient-to-b from-[#F7F4EC] to-white section-py">
      <div class="pointer-events-none absolute inset-0 bg-grain" />
      <div class="container-px relative mx-auto grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        <div class="reveal is-visible">
          <p class="kicker">About Virat Furniture</p>
          <h1 class="mt-6 font-display text-4xl font-bold leading-tight text-royal-900 sm:text-5xl">
            Twenty years of building furniture for <em class="italic text-royal-600">Surat</em>
          </h1>
          <p class="mt-6 text-lg leading-relaxed text-royal-600">
            Virat Furniture has spent over two decades designing, manufacturing and installing furniture for homes and businesses across Surat. What started as a small carpentry workshop has grown into a full in-house team of 15 craftsmen, handling everything from a single wardrobe to furniture for entire residential towers.
          </p>
          <p class="mt-4 text-royal-600">
            We're based at Gaurav Path Road, Palanpur, and our work takes us across the city — Adajan to Sachin, Vesu to Varachha — for homeowners, interior contractors and builders alike.
          </p>
          <div class="mt-8 flex flex-wrap gap-4">
            <NuxtLink to="/contact" class="btn-primary">Get a Free Estimate</NuxtLink>
            <NuxtLink to="/services" class="btn-outline">View Our Services</NuxtLink>
          </div>
        </div>
        <div class="pinstripes relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-royal-800 via-royal-900 to-[#0C1731] p-8 shadow-premium sm:p-10">
          <div class="pointer-events-none absolute inset-0 bg-grain" />
          <p class="relative font-display text-xl italic text-gold-300">The workshop, in numbers</p>
          <div class="relative mt-3 h-px w-16 bg-gold-500/70" />
          <dl class="relative mt-8 grid grid-cols-2 gap-x-6 gap-y-8">
            <div>
              <dd class="font-display text-4xl font-bold text-white">20<span class="text-2xl text-gold-400">+</span></dd>
              <dt class="mt-1 text-xs font-medium uppercase tracking-wider text-royal-300">Years in furniture making</dt>
            </div>
            <div>
              <dd class="font-display text-4xl font-bold text-white">15</dd>
              <dt class="mt-1 text-xs font-medium uppercase tracking-wider text-royal-300">In-house craftsmen</dt>
            </div>
            <div>
              <dd class="font-display text-4xl font-bold text-white">33</dd>
              <dt class="mt-1 text-xs font-medium uppercase tracking-wider text-royal-300">Surat areas served</dt>
            </div>
            <div>
              <dd class="font-display text-4xl font-bold text-white">21<span class="text-2xl text-gold-400">F</span></dd>
              <dt class="mt-1 text-xs font-medium uppercase tracking-wider text-royal-300">Tallest tower fitted out</dt>
            </div>
          </dl>
          <div class="relative mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
            <p class="text-sm leading-relaxed text-royal-100">One team handles your project end to end — measurement, manufacturing in our Palanpur workshop, delivery and installation.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-py bg-surface-200">
      <div class="container-px mx-auto grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div class="rounded-xl2 bg-white p-8 text-center shadow-soft">
          <p class="font-display text-4xl font-bold text-royal-900">{{ business.yearsExperience }}+</p>
          <p class="mt-2 text-sm font-medium text-royal-600">Years of Experience</p>
        </div>
        <div class="rounded-xl2 bg-white p-8 text-center shadow-soft">
          <p class="font-display text-4xl font-bold text-royal-900">{{ business.teamSize }}</p>
          <p class="mt-2 text-sm font-medium text-royal-600">In-House Craftsmen</p>
        </div>
        <div class="rounded-xl2 bg-white p-8 text-center shadow-soft">
          <p class="font-display text-4xl font-bold text-royal-900">31+</p>
          <p class="mt-2 text-sm font-medium text-royal-600">Areas Served in Surat</p>
        </div>
      </div>
    </section>

    <section class="section-py">
      <div class="container-px mx-auto max-w-3xl">
        <div class="text-center">
          <p class="eyebrow">Our Journey</p>
          <h2 class="mt-5 font-display text-3xl font-semibold text-royal-900">How We Got Here</h2>
        </div>
        <div class="mt-12 space-y-8 border-l-2 border-royal-100 pl-8">
          <div v-for="t in timeline" :key="t.year" class="relative">
            <span class="absolute -left-[2.55rem] top-1 h-4 w-4 rounded-full border-4 border-white bg-gold-500 shadow" />
            <p class="text-sm font-semibold uppercase tracking-wide text-gold-600">{{ t.year }}</p>
            <p class="mt-1.5 text-royal-700">{{ t.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-py bg-surface-200">
      <div class="container-px mx-auto">
        <div class="mx-auto max-w-2xl text-center">
          <p class="eyebrow">What We Take On</p>
          <h2 class="mt-5 font-display text-3xl font-semibold text-royal-900">Projects We Work On</h2>
          <p class="mt-4 text-royal-600">From individual homes to large-scale builder projects, we adapt our process to the scale of the work.</p>
        </div>
        <div class="mt-10 flex flex-wrap justify-center gap-3">
          <span v-for="p in projectTypes" :key="p" class="rounded-full border border-surface-400 bg-white px-4 py-2 text-sm font-medium text-royal-700">{{ p }}</span>
        </div>
      </div>
    </section>

    <section class="section-py">
      <div class="container-px mx-auto grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div class="reveal rounded-xl2 border border-surface-300 bg-white p-8">
          <h2 class="font-display text-2xl font-semibold text-royal-900">How We Work</h2>
          <p class="mt-4 text-royal-600 leading-relaxed">Every project starts with a free site visit and measurement, followed by a clear design and quotation before any manufacturing begins. Our own team handles production and installation, so there's a single point of contact from first visit to final fitting — not a design agency, a separate factory and a separate installer who've never spoken to each other.</p>
        </div>
        <div class="reveal rounded-xl2 border border-surface-300 bg-white p-8">
          <h2 class="font-display text-2xl font-semibold text-royal-900">High-Rise & Builder Experience</h2>
          <p class="mt-4 text-royal-600 leading-relaxed">We regularly work directly with builders and interior contractors on 12, 15, 18 and 21-floor residential towers across Surat — repeating consistent designs across dozens of units while still adjusting for the small variations every real building has.</p>
        </div>
      </div>
    </section>

    <section class="pb-16 md:pb-24">
      <div class="container-px mx-auto">
        <CtaBanner title="Want to work with us?" description="Tell us about your project and we'll get back with a free, no-obligation estimate." />
      </div>
    </section>
  </div>
</template>
