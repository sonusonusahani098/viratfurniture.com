<script setup lang="ts">
import { business } from '~/utils/site-data'

withDefaults(
  defineProps<{
    title?: string
    description?: string
  }>(),
  {
    title: 'Planning a furniture project in Surat?',
    description: 'Tell us what you need and we\'ll get back with a free, no-obligation estimate within one business day.',
  }
)
</script>

<template>
  <div class="relative overflow-hidden rounded-xl3 bg-gradient-to-br from-royal-800 via-royal-700 to-royal-900 px-8 py-14 text-center shadow-premium sm:px-16">
    <div class="pointer-events-none absolute inset-0 bg-grain" />
    <div class="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-gold-500/20 blur-3xl" />
    <div class="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-royal-400/20 blur-3xl" />
    <div class="relative">
      <h2 class="font-display text-3xl font-semibold text-white sm:text-4xl">{{ title }}</h2>
      <p class="mx-auto mt-4 max-w-xl text-royal-200">{{ description }}</p>
      <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
        <a :href="`tel:${business.phoneRaw}`" class="btn-outline !border-white/40 !text-white hover:!bg-white hover:!text-royal-900">
          Call {{ business.phone }}
        </a>
        <NuxtLink to="/contact" class="btn-gold">Get Free Estimate</NuxtLink>
        <a :href="business.whatsappLink()" target="_blank" rel="noopener" class="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-premium transition-all duration-300 hover:-translate-y-0.5">
          <svg viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.39a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.14c-.24.68-1.4 1.32-1.93 1.36-.53.05-1.06.24-3.6-.86-3.05-1.32-5.02-4.53-5.17-4.74-.15-.2-1.24-1.65-1.24-3.15 0-1.5.79-2.24 1.07-2.55.28-.3.6-.38.8-.38.2 0 .4 0 .58.01.19.01.44-.07.68.52.25.6.85 2.08.93 2.23.08.15.13.33.02.53-.1.2-.15.33-.3.5-.15.18-.31.4-.44.53-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.36 1.46.3.15.48.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.68-.15.28.1 1.77.84 2.08 1 .3.15.5.23.58.35.08.13.08.75-.16 1.43z"/></svg>
          WhatsApp Us
        </a>
      </div>
    </div>
  </div>
</template>
