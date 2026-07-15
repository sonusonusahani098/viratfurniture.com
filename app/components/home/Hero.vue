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
</script>

<template>
  <section
    ref="heroEl"
    class="relative overflow-hidden bg-gradient-to-b from-royal-50 via-white to-white pt-14 pb-20 sm:pt-20 sm:pb-28"
    @pointermove="onPointerMove"
  >
    <div
      class="pointer-events-none absolute -top-32 right-[-10%] h-[32rem] w-[32rem] rounded-full bg-royal-100 blur-3xl"
      :style="{ transform: `translateY(${offsetY * 0.15}px)` }"
    />
    <div
      class="pointer-events-none absolute -bottom-40 left-[-10%] h-[28rem] w-[28rem] rounded-full bg-gold-100 blur-3xl"
      :style="{ transform: `translateY(${offsetY * -0.1}px)` }"
    />
    <div class="pointer-events-none absolute inset-0 bg-grain" />

    <div class="container-px relative mx-auto grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
      <div>
        <div class="reveal is-visible inline-flex items-center gap-2 rounded-full border border-gold-200 bg-gold-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold-700">
          <span class="h-1.5 w-1.5 rounded-full bg-gold-500" />
          20+ Years · Trusted Across Surat
        </div>

        <h1 class="reveal is-visible mt-6 font-display text-4xl font-bold leading-[1.1] text-royal-900 sm:text-5xl lg:text-[3.4rem]">
          Furniture Crafted for
          <span class="relative inline-block text-royal-600">
            Surat Homes
            <svg class="absolute -bottom-2 left-0 w-full text-gold-400" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M2 9c40-9 156-9 196 0" stroke="currentColor" stroke-width="4" stroke-linecap="round" /></svg>
          </span>
          &amp; Businesses
        </h1>

        <p class="reveal is-visible mt-6 max-w-lg text-lg leading-relaxed text-royal-700" style="animation-delay: 0.1s">
          Custom furniture, modular interiors, wardrobes and office setups — designed, manufactured and installed by a 15-member craftsmen team. From single apartments to 21-floor towers, we build furniture that lasts.
        </p>

        <div class="reveal is-visible mt-8 overflow-hidden rounded-xl2 border border-white shadow-premium lg:hidden" style="animation-delay: 0.15s">
          <img
            src="/images/art/living-room.svg"
            alt="Custom living room furniture crafted by Virat Furniture, Surat"
            class="aspect-[16/9] w-full object-cover"
            width="960"
            height="540"
            fetchpriority="high"
          >
        </div>

        <div class="reveal is-visible mt-9 flex flex-wrap items-center gap-4" style="animation-delay: 0.2s">
          <a :href="`tel:${business.phoneRaw}`" class="btn-primary">
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Call Now
          </a>
          <NuxtLink to="/contact" class="btn-gold">Get Free Estimate</NuxtLink>
          <a :href="business.whatsappLink()" target="_blank" rel="noopener" class="btn-outline">
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.39a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.14c-.24.68-1.4 1.32-1.93 1.36-.53.05-1.06.24-3.6-.86-3.05-1.32-5.02-4.53-5.17-4.74-.15-.2-1.24-1.65-1.24-3.15 0-1.5.79-2.24 1.07-2.55.28-.3.6-.38.8-.38.2 0 .4 0 .58.01.19.01.44-.07.68.52.25.6.85 2.08.93 2.23.08.15.13.33.02.53-.1.2-.15.33-.3.5-.15.18-.31.4-.44.53-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.36 1.46.3.15.48.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.68-.15.28.1 1.77.84 2.08 1 .3.15.5.23.58.35.08.13.08.75-.16 1.43z"/></svg>
            WhatsApp
          </a>
        </div>

        <div class="reveal is-visible mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-royal-600" style="animation-delay: 0.3s">
          <div class="flex items-center gap-2"><span class="font-display text-xl font-bold text-royal-900">20+</span> Years Experience</div>
          <div class="flex items-center gap-2"><span class="font-display text-xl font-bold text-royal-900">15</span> Skilled Craftsmen</div>
          <div class="flex items-center gap-2"><span class="font-display text-xl font-bold text-royal-900">31</span> Areas Served</div>
        </div>
      </div>

      <div class="relative hidden min-h-[560px] lg:block">
        <div class="pointer-events-none absolute right-16 top-0 h-[26rem] w-[26rem] rounded-full bg-gradient-to-br from-royal-100 via-gold-50 to-transparent" :style="layer(-6)" />

        <div class="absolute left-6 top-6 w-[62%] overflow-hidden rounded-xl3 border-4 border-white shadow-premium" :style="layer(10)">
          <img
            src="/images/art/living-room.svg"
            alt="Custom living room furniture crafted by Virat Furniture, Surat"
            class="aspect-[4/5] w-full object-cover"
            width="640"
            height="800"
            fetchpriority="high"
          >
        </div>

        <div class="absolute bottom-2 right-0 w-[46%] overflow-hidden rounded-xl3 border-4 border-white shadow-premium" :style="layer(20)">
          <img
            src="/images/art/bedroom.svg"
            alt="Bedroom furniture set designed by Virat Furniture"
            class="aspect-square w-full object-cover"
            width="520"
            height="520"
            loading="lazy"
          >
        </div>

        <div class="glass-card animate-float absolute -left-4 top-2 w-52 p-4" :style="layer(26)">
          <div class="flex items-center gap-3">
            <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-royal-600 text-white">
              <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-royal-900">On-Time Delivery</p>
              <p class="text-xs text-royal-500">Every project, tracked</p>
            </div>
          </div>
        </div>

        <div class="glass-card animate-float-slow absolute right-4 top-24 w-56 p-4" :style="layer(16)">
          <div class="flex items-center gap-3">
            <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-500 text-white">
              <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3 7h7l-5.5 4.5L18.5 21 12 16.5 5.5 21l2-7.5L2 9h7z"/></svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-royal-900">Quality Materials</p>
              <p class="text-xs text-royal-500">Built to last for years</p>
            </div>
          </div>
        </div>

        <div class="glass-card animate-float absolute bottom-10 left-10 w-48 p-4" :style="{ animationDelay: '1.5s', ...layer(22) }">
          <div class="flex items-center gap-3">
            <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-wood-600 text-white">
              <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/></svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-royal-900">High-Rise Ready</p>
              <p class="text-xs text-royal-500">Up to 21-floor towers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
