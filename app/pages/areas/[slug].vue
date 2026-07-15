<script setup lang="ts">
import { services, areas, business } from '~/utils/site-data'

const route = useRoute()

const { data: page } = await useAsyncData(`area-${route.params.slug}`, () =>
  queryCollection('areas').path(route.path).first()
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Area page not found', fatal: true })
}

const navEntry = computed(() => areas.find((a) => a.slug === route.params.slug))

const relatedServiceItems = computed(() =>
  (page.value?.relatedServices || [])
    .map((slug) => services.find((s) => s.slug === slug))
    .filter(Boolean)
)

const relatedAreaItems = computed(() =>
  (page.value?.relatedAreas || [])
    .map((slug) => areas.find((a) => a.slug === slug))
    .filter(Boolean)
)

usePageSeo({
  title: page.value.seo.title,
  description: page.value.seo.metaDescription,
  ogTitle: page.value.seo.ogTitle,
  ogDescription: page.value.seo.ogDescription,
  path: route.path,
  breadcrumbs: [
    { name: 'Areas We Serve', path: '/areas' },
    { name: navEntry.value?.name || page.value.title },
  ],
})

useSchemaOrg([
  defineLocalBusiness({
    name: `Virat Furniture — ${navEntry.value?.name || ''}`,
    description: page.value.shortDescription,
    areaServed: navEntry.value?.name,
  }),
  ...(page.value.faqs?.length
    ? [
        defineWebPage({
          '@type': 'FAQPage',
          mainEntity: page.value.faqs.map((f) => defineQuestion({ question: f.question, answer: f.answer })),
        }),
      ]
    : []),
])
</script>

<template>
  <div v-if="page">
    <section class="border-b border-surface-300 bg-surface-100 py-6">
      <div class="container-px mx-auto">
        <Breadcrumbs :items="[{ name: 'Areas We Serve', to: '/areas' }, { name: navEntry?.name || page.title }]" />
      </div>
    </section>

    <section class="section-py">
      <div class="container-px mx-auto grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div class="reveal is-visible">
          <p class="eyebrow">Serving {{ navEntry?.name }}, Surat</p>
          <h1 class="mt-5 font-display text-3xl font-bold text-royal-900 sm:text-4xl lg:text-[2.6rem]">{{ page.title }}</h1>
          <p class="mt-5 text-lg leading-relaxed text-royal-600">{{ page.shortDescription }}</p>
          <div v-if="page.landmarks?.length" class="mt-6 flex flex-wrap gap-2">
            <span v-for="l in page.landmarks" :key="l" class="rounded-full bg-royal-50 px-3 py-1.5 text-xs font-medium text-royal-700">
              Near {{ l }}
            </span>
          </div>
          <div class="mt-8 flex flex-wrap gap-4">
            <a :href="`tel:${business.phoneRaw}`" class="btn-primary">Call {{ business.phone }}</a>
            <NuxtLink to="/contact" class="btn-gold">Get Free Estimate</NuxtLink>
          </div>
        </div>
        <div class="overflow-hidden rounded-xl3 border border-white shadow-premium">
          <img :src="page.heroImage" :alt="page.heroImageAlt" class="aspect-[4/3] w-full object-cover" width="800" height="600">
        </div>
      </div>
    </section>

    <section class="pb-16 md:pb-24">
      <div class="container-px mx-auto grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px]">
        <article class="prose-content max-w-none">
          <ContentRenderer :value="page" />
        </article>

        <aside class="space-y-6">
          <div class="glass-card p-6">
            <p class="font-display text-lg font-semibold text-royal-900">Planning a project in {{ navEntry?.name }}?</p>
            <p class="mt-2 text-sm text-royal-600">Free site visit and estimate — no obligation.</p>
            <div class="mt-5 flex flex-col gap-3">
              <a :href="`tel:${business.phoneRaw}`" class="btn-primary w-full">Call Now</a>
              <a :href="business.whatsappLink()" target="_blank" rel="noopener" class="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-premium transition hover:-translate-y-0.5">
                WhatsApp Us
              </a>
            </div>
          </div>

          <div v-if="relatedServiceItems.length" class="rounded-xl2 border border-surface-300 bg-white p-6">
            <p class="font-display text-base font-semibold text-royal-900">Popular Services Here</p>
            <ul class="mt-4 space-y-2.5">
              <li v-for="s in relatedServiceItems" :key="s.slug">
                <NuxtLink :to="`/services/${s.slug}`" class="flex items-center justify-between text-sm text-royal-700 transition hover:text-royal-600">
                  {{ s.name }}
                  <svg viewBox="0 0 20 20" class="h-4 w-4"><path d="M7 5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div v-if="relatedAreaItems.length" class="rounded-xl2 border border-surface-300 bg-white p-6">
            <p class="font-display text-base font-semibold text-royal-900">Nearby Areas</p>
            <ul class="mt-4 space-y-2.5">
              <li v-for="a in relatedAreaItems" :key="a.slug">
                <NuxtLink :to="`/areas/${a.slug}`" class="flex items-center justify-between text-sm text-royal-700 transition hover:text-royal-600">
                  {{ a.name }}
                  <svg viewBox="0 0 20 20" class="h-4 w-4"><path d="M7 5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </section>

    <section v-if="page.faqs?.length" class="section-py bg-surface-200">
      <div class="container-px mx-auto max-w-3xl">
        <div class="text-center">
          <p class="eyebrow">FAQ</p>
          <h2 class="mt-5 font-display text-3xl font-semibold text-royal-900">Questions About Our {{ navEntry?.name }} Service</h2>
        </div>
        <div class="mt-10">
          <FaqAccordion :faqs="page.faqs" />
        </div>
      </div>
    </section>

    <section class="section-py">
      <div class="container-px mx-auto">
        <CtaBanner
          :title="`Furniture project in ${navEntry?.name}?`"
          description="Share your requirement and we'll get back with a free estimate within one business day."
        />
      </div>
    </section>
  </div>
</template>
