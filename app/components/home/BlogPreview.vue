<script setup lang="ts">
const { data: posts } = await useAsyncData('home-blog-preview', () =>
  queryCollection('blog').order('publishedAt', 'DESC').limit(3).all()
)
</script>

<template>
  <section class="section-py bg-surface-200">
    <div class="container-px mx-auto">
      <div class="reveal flex flex-wrap items-end justify-between gap-6">
        <div class="max-w-xl">
          <p class="eyebrow">From the Blog</p>
          <h2 class="mt-5 font-display text-3xl font-semibold text-royal-900 sm:text-4xl">Furniture Tips &amp; Ideas</h2>
        </div>
        <NuxtLink to="/blog" class="btn-outline">Visit the Blog</NuxtLink>
      </div>

      <div v-if="posts?.length" class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        <NuxtLink
          v-for="post in posts"
          :key="post.path"
          :to="post.path"
          class="reveal group overflow-hidden rounded-xl2 border border-surface-300 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-premium"
        >
          <div class="aspect-[16/9] overflow-hidden">
            <img :src="post.heroImage" :alt="post.heroImageAlt" loading="lazy" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110">
          </div>
          <div class="p-5">
            <p class="text-xs font-semibold uppercase tracking-wider text-gold-600">{{ post.category }}</p>
            <h3 class="mt-2 font-display text-lg font-semibold text-royal-900">{{ post.title }}</h3>
          </div>
        </NuxtLink>
      </div>

      <div v-else class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div v-for="c in ['Furniture Tips', 'Wardrobe Guide', 'Surat Home Ideas']" :key="c" class="reveal rounded-xl2 border border-dashed border-royal-200 bg-white/60 p-8 text-center">
          <p class="text-xs font-semibold uppercase tracking-wider text-gold-600">{{ c }}</p>
          <p class="mt-3 text-sm text-royal-500">New articles publishing soon.</p>
        </div>
      </div>
    </div>
  </section>
</template>
