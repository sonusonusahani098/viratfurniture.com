<script setup lang="ts">
import { services, areas, business } from '~/utils/site-data'

const route = useRoute()

const { data: page } = await useAsyncData(`blog-${route.params.slug}`, () =>
  queryCollection('blog').path(route.path).first()
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found', fatal: true })
}

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

const formattedDate = computed(() => {
  if (!page.value?.publishedAt) return ''
  return new Date(page.value.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
})

usePageSeo({
  title: page.value.seo.title,
  description: page.value.seo.metaDescription,
  ogTitle: page.value.seo.ogTitle,
  ogDescription: page.value.seo.ogDescription,
  path: route.path,
  breadcrumbs: [
    { name: 'Blog', path: '/blog' },
    { name: page.value.title },
  ],
})

useSchemaOrg([
  defineArticle({
    headline: page.value.title,
    description: page.value.shortDescription,
    image: page.value.heroImage,
    datePublished: page.value.publishedAt,
    author: { name: page.value.author },
  }),
])
</script>

<template>
  <div v-if="page">
    <section class="border-b border-surface-300 bg-surface-100 py-6">
      <div class="container-px mx-auto">
        <Breadcrumbs :items="[{ name: 'Blog', to: '/blog' }, { name: page.title }]" />
      </div>
    </section>

    <section class="section-py">
      <div class="container-px mx-auto max-w-3xl">
        <p class="eyebrow">{{ page.category }}</p>
        <h1 class="mt-5 font-display text-3xl font-bold text-royal-900 sm:text-4xl">{{ page.title }}</h1>
        <div class="mt-4 flex flex-wrap items-center gap-3 text-sm text-royal-500">
          <span>{{ page.author }}</span>
          <span>·</span>
          <span>{{ formattedDate }}</span>
          <template v-if="page.readingTime">
            <span>·</span>
            <span>{{ page.readingTime }}</span>
          </template>
        </div>

        <div class="mt-8 overflow-hidden rounded-xl3 border border-white shadow-premium">
          <img :src="page.heroImage" :alt="page.heroImageAlt" class="aspect-[16/9] w-full object-cover">
        </div>

        <article class="prose-content mt-10 max-w-none">
          <ContentRenderer :value="page" />
        </article>

        <div v-if="relatedServiceItems.length || relatedAreaItems.length" class="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div v-if="relatedServiceItems.length" class="rounded-xl2 border border-surface-300 bg-white p-6">
            <p class="font-display text-base font-semibold text-royal-900">Related Services</p>
            <ul class="mt-4 space-y-2.5">
              <li v-for="s in relatedServiceItems" :key="s.slug">
                <NuxtLink :to="`/services/${s.slug}`" class="text-sm text-royal-700 hover:text-royal-600">{{ s.name }}</NuxtLink>
              </li>
            </ul>
          </div>
          <div v-if="relatedAreaItems.length" class="rounded-xl2 border border-surface-300 bg-white p-6">
            <p class="font-display text-base font-semibold text-royal-900">Related Areas</p>
            <ul class="mt-4 space-y-2.5">
              <li v-for="a in relatedAreaItems" :key="a.slug">
                <NuxtLink :to="`/areas/${a.slug}`" class="text-sm text-royal-700 hover:text-royal-600">{{ a.name }}</NuxtLink>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-14 rounded-xl2 bg-royal-900 p-8 text-center">
          <p class="font-display text-xl font-semibold text-white">Need help with a furniture project?</p>
          <div class="mt-5 flex flex-wrap justify-center gap-4">
            <a :href="`tel:${business.phoneRaw}`" class="btn-outline !border-white/40 !text-white hover:!bg-white hover:!text-royal-900">Call Us</a>
            <NuxtLink to="/contact" class="btn-gold">Get Free Estimate</NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
