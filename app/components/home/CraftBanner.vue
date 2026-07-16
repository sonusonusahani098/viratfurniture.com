<script setup lang="ts">
import { business } from '~/utils/site-data'

const towers = [
  { floors: 12, h: 'h-28' },
  { floors: 15, h: 'h-36' },
  { floors: 18, h: 'h-44' },
  { floors: 21, h: 'h-52' },
]
</script>

<template>
  <section class="pinstripes relative overflow-hidden bg-gradient-to-br from-[#101F44] via-royal-900 to-[#0C1731]" aria-label="Builder and high-rise furniture work">
    <div class="pointer-events-none absolute inset-0 bg-grain" />
    <div class="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-royal-600/20 blur-3xl" />
    <div class="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" />

    <div class="container-px relative mx-auto grid grid-cols-1 items-center gap-14 py-20 md:py-28 lg:grid-cols-[1.1fr_0.9fr]">
      <div class="max-w-xl">
        <p class="kicker !text-gold-400">Builder &amp; Tower Projects</p>
        <h2 class="mt-6 font-display text-3xl font-bold leading-tight text-white sm:text-[2.6rem]">
          From a single wardrobe to a
          <em class="italic text-gold-300">21-floor tower</em>
        </h2>
        <p class="reveal mt-5 text-[17px] leading-relaxed text-royal-100/90">
          We work directly with builders and interior contractors on Surat's high-rise residential projects — repeating consistent designs across dozens of flats, coordinated around site timelines and possession dates.
        </p>
        <div class="reveal mt-9 flex flex-wrap gap-4" style="animation-delay: 0.15s">
          <NuxtLink to="/services/builder-furniture-work" class="btn-gold !px-7">Builder Furniture Work</NuxtLink>
          <a :href="`tel:${business.phoneRaw}`" class="btn-outline !border-white/40 !px-7 !text-white hover:!border-white hover:!bg-white hover:!text-royal-900">Discuss Your Project</a>
        </div>

        <dl class="reveal mt-11 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-8" style="animation-delay: 0.25s">
          <div>
            <dd class="font-display text-2xl font-semibold text-white">100<span class="text-base text-gold-400">%</span></dd>
            <dt class="mt-1 text-[11px] font-medium uppercase tracking-wider text-royal-300">In-house team</dt>
          </div>
          <div>
            <dd class="font-display text-2xl font-semibold text-white">20<span class="text-base text-gold-400">+</span></dd>
            <dt class="mt-1 text-[11px] font-medium uppercase tracking-wider text-royal-300">Years on site</dt>
          </div>
          <div>
            <dd class="font-display text-2xl font-semibold text-white">4</dd>
            <dt class="mt-1 text-[11px] font-medium uppercase tracking-wider text-royal-300">Tower heights fitted</dt>
          </div>
        </dl>
      </div>

      <div class="reveal relative mx-auto w-full max-w-md" style="animation-delay: 0.2s">
        <div class="flex items-end justify-center gap-5 border-b border-white/15 pb-0">
          <div v-for="t in towers" :key="t.floors" class="flex w-16 flex-col items-center gap-3 sm:w-20">
            <div
              class="relative w-full overflow-hidden rounded-t-lg border border-white/10 bg-white/5"
              :class="t.h"
              :style="{ backgroundImage: 'radial-gradient(rgba(244,231,184,0.55) 1.2px, transparent 1.4px)', backgroundSize: '9px 12px', backgroundPosition: '4px 6px' }"
            >
              <span class="absolute inset-x-0 top-0 h-0.5 bg-gold-400/80" />
            </div>
          </div>
        </div>
        <div class="mt-3 flex items-end justify-center gap-5">
          <p v-for="t in towers" :key="t.floors" class="w-16 text-center text-xs font-semibold uppercase tracking-wider text-royal-200 sm:w-20">
            <span class="font-display text-lg font-semibold text-gold-300">{{ t.floors }}</span> floors
          </p>
        </div>
        <p class="mt-6 text-center text-xs uppercase tracking-[0.22em] text-royal-300/80">Residential towers we've furnished across Surat</p>
      </div>
    </div>
  </section>
</template>
