<script setup lang="ts">
import { business } from '~/utils/site-data'
</script>

<template>
  <div class="fixed inset-x-0 bottom-0 z-40 flex border-t border-surface-300 bg-white/95 backdrop-blur-lg shadow-[0_-4px_20px_rgba(16,31,68,0.08)] lg:hidden">
    <a :href="`tel:${business.phoneRaw}`" class="flex flex-1 items-center justify-center gap-2 bg-royal-600 py-3.5 text-sm font-semibold text-white">
      <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      Call Now
    </a>
    <a :href="business.whatsappLink()" target="_blank" rel="noopener" class="flex flex-1 items-center justify-center gap-2 bg-[#25D366] py-3.5 text-sm font-semibold text-white">
      <svg viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.39a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.14c-.24.68-1.4 1.32-1.93 1.36-.53.05-1.06.24-3.6-.86-3.05-1.32-5.02-4.53-5.17-4.74-.15-.2-1.24-1.65-1.24-3.15 0-1.5.79-2.24 1.07-2.55.28-.3.6-.38.8-.38.2 0 .4 0 .58.01.19.01.44-.07.68.52.25.6.85 2.08.93 2.23.08.15.13.33.02.53-.1.2-.15.33-.3.5-.15.18-.31.4-.44.53-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.36 1.46.3.15.48.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.68-.15.28.1 1.77.84 2.08 1 .3.15.5.23.58.35.08.13.08.75-.16 1.43z"/></svg>
      WhatsApp
    </a>
    <NuxtLink to="/contact" class="flex flex-1 items-center justify-center gap-2 bg-gold-500 py-3.5 text-sm font-semibold text-white">
      <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
      Estimate
    </NuxtLink>
  </div>
</template>
