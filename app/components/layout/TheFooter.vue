<script setup lang="ts">
import { business, services, areas, blogCategories } from '~/utils/site-data'

const featuredServices = services.slice(0, 8)
const featuredAreas = areas.slice(0, 12)
const year = new Date().getFullYear()
</script>

<template>
  <footer class="relative overflow-hidden bg-royal-900 text-royal-100">
    <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600" />
    <div class="pointer-events-none absolute inset-0 bg-grain" />
    <div class="container-px section-py relative mx-auto">
      <div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
        <div class="lg:col-span-2">
          <NuxtLink to="/" class="flex items-center gap-2.5">
            <span class="flex h-11 w-11 items-center justify-center rounded-xl2 bg-gradient-to-br from-gold-500 to-gold-600 text-royal-900 shadow-premium">
              <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 20v-6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6" />
                <path d="M3 14a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v3" />
              </svg>
            </span>
            <span class="font-display text-xl font-semibold text-white">Virat Furniture</span>
          </NuxtLink>
          <p class="mt-5 max-w-sm text-sm leading-relaxed text-royal-200">
            For over {{ business.yearsExperience }} years, Virat Furniture has been designing, manufacturing and installing custom wooden furniture for homes, offices and builder projects across Surat — backed by a skilled in-house team of {{ business.teamSize }} craftsmen.
          </p>
          <div class="mt-6 flex gap-3">
            <a :href="business.whatsappLink()" target="_blank" rel="noopener" class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-gold-500 hover:text-royal-900" aria-label="Chat on WhatsApp">
              <svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.39a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.14c-.24.68-1.4 1.32-1.93 1.36-.53.05-1.06.24-3.6-.86-3.05-1.32-5.02-4.53-5.17-4.74-.15-.2-1.24-1.65-1.24-3.15 0-1.5.79-2.24 1.07-2.55.28-.3.6-.38.8-.38.2 0 .4 0 .58.01.19.01.44-.07.68.52.25.6.85 2.08.93 2.23.08.15.13.33.02.53-.1.2-.15.33-.3.5-.15.18-.31.4-.44.53-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.36 1.46.3.15.48.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.68-.15.28.1 1.77.84 2.08 1 .3.15.5.23.58.35.08.13.08.75-.16 1.43z"/></svg>
            </a>
            <a :href="`tel:${business.phoneRaw}`" class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-gold-500 hover:text-royal-900" aria-label="Call Virat Furniture">
              <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener" class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-gold-500 hover:text-royal-900" aria-label="Virat Furniture on Instagram">
              <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener" class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-gold-500 hover:text-royal-900" aria-label="Virat Furniture on Facebook">
              <svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor"><path d="M13.5 21v-7.5H16l.5-3.5h-3V7.8c0-1 .3-1.7 1.7-1.7H16.6V3.1C16.3 3.06 15.3 3 14.1 3c-2.5 0-4.1 1.5-4.1 4.3V10H7.5v3.5H10V21h3.5z"/></svg>
            </a>
          </div>
        </div>

        <div>
          <p class="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-400">Quick Links</p>
          <ul class="space-y-2.5 text-sm text-royal-200">
            <li><NuxtLink to="/about" class="transition hover:text-gold-300">About Us</NuxtLink></li>
            <li><NuxtLink to="/services" class="transition hover:text-gold-300">All Services</NuxtLink></li>
            <li><NuxtLink to="/areas" class="transition hover:text-gold-300">Areas We Serve</NuxtLink></li>
            <li><NuxtLink to="/projects" class="transition hover:text-gold-300">Projects</NuxtLink></li>
            <li><NuxtLink to="/gallery" class="transition hover:text-gold-300">Gallery</NuxtLink></li>
            <li><NuxtLink to="/blog" class="transition hover:text-gold-300">Blog</NuxtLink></li>
            <li><NuxtLink to="/contact" class="transition hover:text-gold-300">Contact</NuxtLink></li>
          </ul>
        </div>

        <div>
          <p class="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-400">Popular Services</p>
          <ul class="space-y-2.5 text-sm text-royal-200">
            <li v-for="s in featuredServices" :key="s.slug">
              <NuxtLink :to="`/services/${s.slug}`" class="transition hover:text-gold-300">{{ s.name }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <p class="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-400">Areas We Serve</p>
          <ul class="grid grid-cols-2 gap-x-3 gap-y-2.5 text-sm text-royal-200">
            <li v-for="a in featuredAreas" :key="a.slug">
              <NuxtLink :to="`/areas/${a.slug}`" class="transition hover:text-gold-300">{{ a.name }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-14 grid grid-cols-1 gap-8 rounded-xl3 border border-white/10 bg-white/5 p-8 sm:grid-cols-3">
        <div class="flex items-start gap-3">
          <svg viewBox="0 0 24 24" class="mt-0.5 h-5 w-5 shrink-0 text-gold-400" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>
          <div>
            <p class="text-sm font-semibold text-white">Visit Our Workshop</p>
            <p class="mt-1 text-sm text-royal-200">{{ business.address }}</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <svg viewBox="0 0 24 24" class="mt-0.5 h-5 w-5 shrink-0 text-gold-400" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
          <div>
            <p class="text-sm font-semibold text-white">Working Hours</p>
            <p class="mt-1 text-sm text-royal-200">{{ business.hours.weekdays }}</p>
            <p class="text-sm text-royal-200">{{ business.hours.sunday }}</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <svg viewBox="0 0 24 24" class="mt-0.5 h-5 w-5 shrink-0 text-gold-400" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
          <div>
            <p class="text-sm font-semibold text-white">Get In Touch</p>
            <a :href="`tel:${business.phoneRaw}`" class="mt-1 block text-sm text-royal-200 hover:text-gold-300">{{ business.phone }}</a>
            <a :href="`mailto:${business.email}`" class="block text-sm text-royal-200 hover:text-gold-300">{{ business.email }}</a>
          </div>
        </div>
      </div>

      <div class="mt-10 flex flex-wrap gap-x-2 gap-y-1 text-xs text-royal-300">
        <span>Blog categories:</span>
        <template v-for="(c, i) in blogCategories" :key="c">
          <NuxtLink to="/blog" class="hover:text-gold-300">{{ c }}</NuxtLink><span v-if="i < blogCategories.length - 1">·</span>
        </template>
      </div>

      <div class="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-royal-300 sm:flex-row">
        <p>© {{ year }} Virat Furniture. All rights reserved.</p>
        <div class="flex gap-5">
          <NuxtLink to="/privacy-policy" class="hover:text-gold-300">Privacy Policy</NuxtLink>
          <NuxtLink to="/terms" class="hover:text-gold-300">Terms</NuxtLink>
          <NuxtLink to="/sitemap.xml" class="hover:text-gold-300">Sitemap</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
