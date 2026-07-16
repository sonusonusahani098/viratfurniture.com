<script setup lang="ts">
const steps = [
  {
    title: 'Site Visit & Measurement',
    desc: 'We visit your home or site anywhere in Surat, understand how you use the space, and take exact measurements.',
  },
  {
    title: 'Design & Clear Quote',
    desc: 'You get a practical design and an itemised estimate before any work begins — materials, hardware and timelines in writing.',
  },
  {
    title: 'Manufacturing',
    desc: 'Your furniture is built in our Palanpur workshop by our own fifteen-member team, not outsourced labour.',
  },
  {
    title: 'Delivery & Installation',
    desc: 'We deliver, install and finish on site — aligned to your possession date or renovation schedule.',
  },
]
</script>

<template>
  <section class="relative section-py overflow-hidden bg-surface-200">
    <div class="pointer-events-none absolute inset-0 bg-grain" />
    <div class="container-px relative mx-auto">
      <div class="reveal max-w-2xl">
        <p class="kicker">How We Work</p>
        <h2 class="mt-6 font-display text-3xl font-bold text-royal-900 sm:text-[2.6rem] sm:leading-tight">
          A simple process, <em class="italic text-royal-600">followed properly</em>
        </h2>
        <p class="mt-5 text-[17px] leading-relaxed text-royal-600">
          The same four steps whether we're building one bookshelf or fitting out an entire tower.
        </p>
      </div>

      <ol class="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <li
          v-for="(step, i) in steps"
          :key="step.title"
          class="reveal relative"
          :style="{ animationDelay: `${i * 0.1}s` }"
        >
          <div class="flex items-center gap-4">
            <span class="font-display text-6xl font-bold leading-none text-royal-900/10">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="hidden h-px flex-1 bg-gradient-to-r from-gold-400/70 to-transparent lg:block" :class="{ 'lg:hidden': i === steps.length - 1 }" />
          </div>
          <h3 class="mt-5 font-display text-xl font-semibold text-royal-900">{{ step.title }}</h3>
          <p class="mt-2.5 text-sm leading-relaxed text-royal-600">{{ step.desc }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
