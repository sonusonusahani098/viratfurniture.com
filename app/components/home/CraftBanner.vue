<script setup lang="ts">
import { business } from '~/utils/site-data'

const bannerEl = ref<HTMLElement | null>(null)
const shift = ref(0)

function onScroll() {
  if (!bannerEl.value) return
  const rect = bannerEl.value.getBoundingClientRect()
  const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight
  shift.value = Math.max(-1, Math.min(1, progress)) * 46
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <section ref="bannerEl" class="relative overflow-hidden" aria-label="Builder and high-rise furniture work">
    <img
      src="/images/art/building.svg"
      alt="High-rise residential towers in Surat where Virat Furniture installs builder furniture"
      loading="lazy"
      class="absolute inset-0 h-[120%] w-full scale-110 object-cover will-change-transform"
      :style="{ transform: `translateY(${shift.toFixed(1)}px) scale(1.12)` }"
      width="1200"
      height="800"
    >
    <div class="absolute inset-0 bg-gradient-to-r from-royal-900/90 via-royal-900/70 to-royal-900/40" />

    <div class="container-px relative mx-auto py-20 md:py-28">
      <div class="max-w-xl">
        <p class="reveal inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-royal-900/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold-300 backdrop-blur">
          <span class="h-1.5 w-1.5 rounded-full bg-gold-400" />
          Builder &amp; Tower Projects
        </p>
        <h2 class="reveal mt-5 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
          From a Single Wardrobe to a 21-Floor Tower
        </h2>
        <p class="reveal mt-4 text-royal-100" style="animation-delay: 0.1s">
          We work directly with builders and interior contractors on Surat's high-rise residential projects — repeating consistent designs across dozens of flats, coordinated around site timelines and possession dates.
        </p>
        <div class="reveal mt-8 flex flex-wrap gap-4" style="animation-delay: 0.2s">
          <NuxtLink to="/services/builder-furniture-work" class="btn-gold">Builder Furniture Work</NuxtLink>
          <a :href="`tel:${business.phoneRaw}`" class="btn-outline !border-white/40 !text-white hover:!bg-white hover:!text-royal-900">Discuss Your Project</a>
        </div>
        <dl class="reveal mt-10 grid max-w-md grid-cols-3 gap-6" style="animation-delay: 0.3s">
          <div>
            <dt class="text-xs font-medium uppercase tracking-wide text-royal-200">Tower Heights</dt>
            <dd class="mt-1 font-display text-2xl font-bold text-white">12–21 <span class="text-sm font-medium text-gold-300">floors</span></dd>
          </div>
          <div>
            <dt class="text-xs font-medium uppercase tracking-wide text-royal-200">Experience</dt>
            <dd class="mt-1 font-display text-2xl font-bold text-white">20+ <span class="text-sm font-medium text-gold-300">years</span></dd>
          </div>
          <div>
            <dt class="text-xs font-medium uppercase tracking-wide text-royal-200">In-House Team</dt>
            <dd class="mt-1 font-display text-2xl font-bold text-white">15 <span class="text-sm font-medium text-gold-300">craftsmen</span></dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>
