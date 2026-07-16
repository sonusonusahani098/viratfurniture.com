<script setup lang="ts">
import { blogCategories } from '~/utils/site-data'

usePageSeo({
  title: 'Blog | Furniture Tips & Ideas from Virat Furniture',
  description: 'Furniture tips, wardrobe guides, interior ideas and maintenance advice from Virat Furniture, Surat\'s furniture manufacturing specialists.',
  path: '/blog',
  breadcrumbs: [{ name: 'Blog' }],
})

const activeCategory = ref<string | null>(null)

const { data: posts } = await useAsyncData('blog-index', () =>
  queryCollection('blog').order('publishedAt', 'DESC').all()
)

const filteredPosts = computed(() => {
  if (!posts.value) return []
  if (!activeCategory.value) return posts.value
  return posts.value.filter((p) => p.category === activeCategory.value)
})
</script>

<template>
  <div>
    <section class="border-b border-surface-300 bg-surface-100 py-6">
      <div class="container-px mx-auto">
        <Breadcrumbs :items="[{ name: 'Blog' }]" />
      </div>
    </section>

    <section class="section-py">
      <div class="container-px mx-auto">
        <div class="mx-auto max-w-2xl text-center">
          <p class="eyebrow">Blog</p>
          <h1 class="mt-5 font-display text-4xl font-bold text-royal-900">Furniture Tips &amp; Ideas</h1>
          <p class="mt-4 text-royal-600">Practical advice on furniture, wardrobes, interiors and maintenance from our team's 20+ years in the trade.</p>
        </div>

        <div class="mt-10 flex flex-wrap justify-center gap-2.5">
          <button
            class="rounded-full border px-4 py-2 text-sm font-medium transition"
            :class="!activeCategory ? 'border-royal-600 bg-royal-600 text-white' : 'border-surface-400 text-royal-700 hover:border-royal-300'"
            @click="activeCategory = null"
          >
            All Posts
          </button>
          <button
            v-for="c in blogCategories"
            :key="c"
            class="rounded-full border px-4 py-2 text-sm font-medium transition"
            :class="activeCategory === c ? 'border-royal-600 bg-royal-600 text-white' : 'border-surface-400 text-royal-700 hover:border-royal-300'"
            @click="activeCategory = c"
          >
            {{ c }}
          </button>
        </div>

        <div v-if="filteredPosts.length" class="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="post in filteredPosts"
            :key="post.path"
            :to="post.path"
            class="group overflow-hidden rounded-xl2 border border-surface-300 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-premium"
          >
            <div class="aspect-[16/9] overflow-hidden">
              <img :src="post.heroImage" :alt="post.heroImageAlt" loading="lazy" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110">
            </div>
            <div class="p-5">
              <p class="text-xs font-semibold uppercase tracking-wider text-gold-600">{{ post.category }}</p>
              <h2 class="mt-2 font-display text-lg font-semibold text-royal-900">{{ post.title }}</h2>
              <p class="mt-2 text-sm text-royal-600 line-clamp-2">{{ post.shortDescription }}</p>
            </div>
          </NuxtLink>
        </div>

        <div v-else class="mt-14 rounded-xl2 border border-dashed border-royal-200 bg-surface-100 p-12 text-center">
          <p class="font-display text-xl font-semibold text-royal-900">New articles are on the way</p>
          <p class="mx-auto mt-2 max-w-md text-royal-600">We're writing practical, experience-based guides on furniture and interiors for Surat homes. Check back soon.</p>
        </div>
      </div>
    </section>
  </div>
</template>
