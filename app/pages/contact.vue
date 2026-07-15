<script setup lang="ts">
import { business } from '~/utils/site-data'

usePageSeo({
  title: 'Contact Us | Virat Furniture, Surat',
  description: 'Get in touch with Virat Furniture for a free furniture estimate in Surat. Call, WhatsApp, or fill in our contact form — we usually respond within one business day.',
  path: '/contact',
  breadcrumbs: [{ name: 'Contact' }],
})

useSchemaOrg([
  defineWebPage({ '@type': 'ContactPage' }),
  defineLocalBusiness({
    name: 'Virat Furniture',
    telephone: '+919725713944',
    email: 'service@viratfurniture.com',
    address: {
      streetAddress: 'Shop Number G109, Gaurav Path Road, Palanpur',
      addressLocality: 'Surat',
      addressRegion: 'Gujarat',
      postalCode: '395009',
      addressCountry: 'IN',
    },
  }),
])
</script>

<template>
  <div>
    <section class="border-b border-surface-300 bg-surface-100 py-6">
      <div class="container-px mx-auto">
        <Breadcrumbs :items="[{ name: 'Contact' }]" />
      </div>
    </section>

    <section class="section-py">
      <div class="container-px mx-auto text-center">
        <p class="eyebrow">Get In Touch</p>
        <h1 class="mt-5 font-display text-4xl font-bold text-royal-900 sm:text-5xl">Let's Talk About Your Project</h1>
        <p class="mx-auto mt-4 max-w-xl text-royal-600">Call us, message on WhatsApp, or fill in the form below — whichever's easiest. We'll get back to you with a free estimate within one business day.</p>
      </div>

      <div class="container-px mx-auto mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <a :href="`tel:${business.phoneRaw}`" class="group rounded-xl2 border border-surface-300 bg-white p-6 text-center shadow-soft transition hover:-translate-y-1 hover:shadow-premium">
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-royal-50 text-royal-600 transition group-hover:bg-royal-600 group-hover:text-white">
            <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          <p class="mt-4 font-display text-lg font-semibold text-royal-900">Call Us</p>
          <p class="mt-1 text-sm text-royal-600">{{ business.phone }}</p>
        </a>

        <a :href="business.whatsappLink()" target="_blank" rel="noopener" class="group rounded-xl2 border border-surface-300 bg-white p-6 text-center shadow-soft transition hover:-translate-y-1 hover:shadow-premium">
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-royal-50 text-royal-600 transition group-hover:bg-[#25D366] group-hover:text-white">
            <svg viewBox="0 0 24 24" class="h-6 w-6" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.39a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.14c-.24.68-1.4 1.32-1.93 1.36-.53.05-1.06.24-3.6-.86-3.05-1.32-5.02-4.53-5.17-4.74-.15-.2-1.24-1.65-1.24-3.15 0-1.5.79-2.24 1.07-2.55.28-.3.6-.38.8-.38.2 0 .4 0 .58.01.19.01.44-.07.68.52.25.6.85 2.08.93 2.23.08.15.13.33.02.53-.1.2-.15.33-.3.5-.15.18-.31.4-.44.53-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.36 1.46.3.15.48.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.68-.15.28.1 1.77.84 2.08 1 .3.15.5.23.58.35.08.13.08.75-.16 1.43z"/></svg>
          </div>
          <p class="mt-4 font-display text-lg font-semibold text-royal-900">WhatsApp</p>
          <p class="mt-1 text-sm text-royal-600">Chat with us directly</p>
        </a>

        <a :href="`mailto:${business.email}`" class="group rounded-xl2 border border-surface-300 bg-white p-6 text-center shadow-soft transition hover:-translate-y-1 hover:shadow-premium">
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-royal-50 text-royal-600 transition group-hover:bg-gold-500 group-hover:text-white">
            <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
          </div>
          <p class="mt-4 font-display text-lg font-semibold text-royal-900">Email</p>
          <p class="mt-1 text-sm text-royal-600">{{ business.email }}</p>
        </a>
      </div>
    </section>

    <section class="pb-16 md:pb-24">
      <div class="container-px mx-auto grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.85fr]">
        <ContactForm />

        <div class="space-y-6">
          <div class="overflow-hidden rounded-xl2 border border-surface-300 shadow-soft">
            <iframe
              :src="business.mapEmbedSrc"
              class="h-64 w-full"
              style="border: 0"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Virat Furniture location on Google Maps"
            />
          </div>

          <div class="rounded-xl2 border border-surface-300 bg-white p-6">
            <p class="font-display text-lg font-semibold text-royal-900">Visit Our Workshop</p>
            <p class="mt-2 text-sm leading-relaxed text-royal-600">{{ business.address }}</p>
            <a :href="business.mapLink" target="_blank" rel="noopener" class="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-royal-600 hover:text-royal-800">
              Get Directions
              <svg viewBox="0 0 20 20" class="h-4 w-4"><path d="M7 5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </a>
          </div>

          <div class="rounded-xl2 border border-surface-300 bg-white p-6">
            <p class="font-display text-lg font-semibold text-royal-900">Working Hours</p>
            <div class="mt-3 space-y-1.5 text-sm text-royal-600">
              <p>{{ business.hours.weekdays }}</p>
              <p>{{ business.hours.sunday }}</p>
            </div>
          </div>

          <div class="rounded-xl2 border-2 border-gold-200 bg-gold-50 p-6">
            <p class="font-display text-base font-semibold text-royal-900">Quick Response</p>
            <p class="mt-2 text-sm leading-relaxed text-royal-700">For urgent requirements, calling or WhatsApp gets you the fastest response — usually within a few hours during working days.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
