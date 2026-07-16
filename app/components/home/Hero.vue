<script setup lang="ts">
import { business } from '~/utils/site-data'

const heroEl = ref<HTMLElement | null>(null)
const offsetY = ref(0)
const mx = ref(0)
const my = ref(0)

function onScroll() {
  offsetY.value = window.scrollY
}

function onPointerMove(e: PointerEvent) {
  if (e.pointerType === 'touch' || !heroEl.value) return
  const rect = heroEl.value.getBoundingClientRect()
  mx.value = (e.clientX - rect.left) / rect.width - 0.5
  my.value = (e.clientY - rect.top) / rect.height - 0.5
}

function layer(depth: number) {
  return { transform: `translate3d(${(mx.value * depth).toFixed(2)}px, ${(my.value * depth).toFixed(2)}px, 0)` }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const ribbon = [
  'Wardrobes',
  'Modular Kitchens',
  'TV Units',
  'Sofas & Living Rooms',
  'Office Workstations',
  'Pooja Units',
  'Dining Tables',
  'Furniture Repair',
  'Wooden Ceilings',
  'Wall Panels',
]
</script>

<template>
  <section
    ref="heroEl"
    class="relative overflow-hidden bg-gradient-to-b from-[#F7F4EC] via-white to-white"
    @pointermove="onPointerMove"
  >
    <div
      class="pointer-events-none absolute -top-40 right-[-12%] h-[36rem] w-[36rem] rounded-full bg-royal-100/70 blur-3xl"
      :style="{ transform: `translateY(${offsetY * 0.12}px)` }"
    />
    <div
      class="pointer-events-none absolute -bottom-44 left-[-12%] h-[30rem] w-[30rem] rounded-full bg-gold-100/80 blur-3xl"
      :style="{ transform: `translateY(${offsetY * -0.08}px)` }"
    />
    <div class="pointer-events-none absolute inset-0 bg-grain" />

    <div class="container-px relative mx-auto grid grid-cols-1 items-center gap-16 pb-16 pt-16 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24">
      <div class="max-w-2xl">
        <p class="reveal is-visible kicker">Furniture Makers · Surat</p>

        <h1 class="reveal is-visible mt-7 font-display text-[2.75rem] font-bold leading-[1.08] text-royal-900 sm:text-6xl lg:text-[4.1rem]">
          Furniture
          <em class="font-display italic text-royal-600">crafted</em>
          around
          <span class="underline-gold whitespace-nowrap px-1">your home.</span>
        </h1>

        <p class="reveal is-visible mt-7 max-w-xl text-lg leading-relaxed text-royal-700/90" style="animation-delay: 0.1s">
          For over twenty years, our workshop in Palanpur has designed, built and installed custom furniture across Surat — wardrobes, kitchens, offices and complete homes, made to measure by our own team of fifteen craftsmen.
        </p>

        <div class="reveal is-visible mt-9 flex flex-wrap items-center gap-4" style="animation-delay: 0.2s">
          <a :href="`tel:${business.phoneRaw}`" class="btn-primary !px-7">
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Call Now
          </a>
          <NuxtLink to="/contact" class="btn-gold !px-7">Get Free Estimate</NuxtLink>
          <a :href="business.whatsappLink()" target="_blank" rel="noopener" class="btn-outline !px-7">
            WhatsApp
          </a>
        </div>

        <div class="reveal is-visible mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-royal-600" style="animation-delay: 0.3s">
          <span class="inline-flex items-center gap-2">
            <span class="h-1.5 w-1.5 rounded-full bg-gold-500" />
            Free site visit &amp; estimate
          </span>
          <span class="inline-flex items-center gap-2">
            <span class="h-1.5 w-1.5 rounded-full bg-gold-500" />
            Mon–Sat, 9 AM – 7 PM
          </span>
          <span class="inline-flex items-center gap-2">
            <span class="h-1.5 w-1.5 rounded-full bg-gold-500" />
            {{ business.addressShort }}
          </span>
        </div>
      </div>

      <div class="relative lg:pl-4">
        <div class="pointer-events-none absolute -inset-8 hidden rounded-[3rem] bg-gradient-to-br from-gold-100/60 via-transparent to-royal-100/60 lg:block" :style="layer(-5)" />

        <div
          class="pinstripes relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-royal-800 via-royal-900 to-[#0C1731] p-8 shadow-premium sm:p-10"
          :style="layer(7)"
        >
          <div class="pointer-events-none absolute inset-0 bg-grain" />
          <div class="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-royal-500/20 blur-2xl" />

          <p class="relative font-display text-xl italic text-gold-300">Measured. Made. Installed.</p>
          <div class="relative mt-3 h-px w-16 bg-gold-500/70" />

          <div class="relative mt-9 flex items-end gap-3">
            <span class="font-display text-7xl font-bold leading-[0.9] text-white sm:text-8xl">20</span>
            <span class="mb-1 font-display text-4xl font-semibold text-gold-400">+</span>
            <span class="mb-2 text-sm leading-snug text-royal-200">years of furniture<br>making in Surat</span>
          </div>

          <dl class="relative mt-9 grid grid-cols-3 gap-5 border-t border-white/10 pt-7">
            <div>
              <dd class="font-display text-2xl font-semibold text-white">15</dd>
              <dt class="mt-1 text-[11px] font-medium uppercase tracking-wider text-royal-300">Craftsmen, no outsourcing</dt>
            </div>
            <div>
              <dd class="font-display text-2xl font-semibold text-white">33</dd>
              <dt class="mt-1 text-[11px] font-medium uppercase tracking-wider text-royal-300">Surat areas covered</dt>
            </div>
            <div>
              <dd class="font-display text-2xl font-semibold text-white">21<span class="text-base text-gold-400">F</span></dd>
              <dt class="mt-1 text-[11px] font-medium uppercase tracking-wider text-royal-300">Tallest tower fitted out</dt>
            </div>
          </dl>

          <div class="relative mt-9 flex items-center gap-5 rounded-2xl border border-white/10 bg-white/5 p-5">
            <div class="flex -space-x-2">
              <span class="h-9 w-9 rounded-full border-2 border-royal-900 bg-gradient-to-br from-wood-300 to-wood-600" title="Seasoned wood" />
              <span class="h-9 w-9 rounded-full border-2 border-royal-900 bg-gradient-to-br from-royal-400 to-royal-700" title="Premium laminates" />
              <span class="h-9 w-9 rounded-full border-2 border-royal-900 bg-gradient-to-br from-gold-300 to-gold-600" title="Brass-finish hardware" />
            </div>
            <p class="text-sm leading-snug text-royal-100">Seasoned wood, premium laminates &amp; branded hardware — chosen for Surat's climate.</p>
          </div>
        </div>

        <div class="glass-card animate-float absolute -top-16 left-2 hidden w-48 p-4 lg:block" :style="layer(22)">
          <p class="text-sm font-semibold text-royal-900">On-Time Delivery</p>
          <p class="mt-0.5 text-xs text-royal-500">Planned around your possession date</p>
        </div>

        <div class="glass-card animate-float-slow absolute -bottom-12 right-8 hidden w-52 p-4 lg:block" :style="layer(16)">
          <p class="text-sm font-semibold text-royal-900">Free Site Visit</p>
          <p class="mt-0.5 text-xs text-royal-500">Measurement &amp; estimate, no obligation</p>
        </div>
      </div>
    </div>

    <div class="relative border-t border-surface-300 bg-white/70 py-5 backdrop-blur">
      <div class="marquee" aria-hidden="true">
        <div class="marquee-track items-center">
          <template v-for="pass in 2">
            <span
              v-for="item in ribbon"
              :key="`${pass}-${item}`"
              class="mx-7 flex shrink-0 items-center gap-7 text-xs font-semibold uppercase tracking-[0.22em] text-royal-400"
            >
              {{ item }}
              <span class="h-1 w-1 rounded-full bg-gold-400" />
            </span>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
