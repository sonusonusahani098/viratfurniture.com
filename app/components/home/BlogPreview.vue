<script setup lang="ts">
const { data: posts } = await useAsyncData('home-blog-preview', () =>
  queryCollection('blog').order('publishedAt', 'DESC').limit(3).all()
)

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>

<template>
  <section class="section-py bg-white">
    <div class="container-px mx-auto">
      <div class="reveal flex flex-wrap items-end justify-between gap-6">
        <div class="max-w-xl">
          <p class="kicker">From the Blog</p>
          <h2 class="mt-6 font-display text-3xl font-bold text-royal-900 sm:text-[2.6rem] sm:leading-tight">
            Furniture tips &amp; <em class="italic text-royal-600">ideas</em>
          </h2>
        </div>
        <NuxtLink to="/blog" class="btn-outline !px-8">Visit the Blog</NuxtLink>
      </div>

      <div v-if="posts?.length" class="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
        <NuxtLink
          v-for="(post, i) in posts"
          :key="post.path"
          :to="post.path"
          class="reveal group flex h-full flex-col rounded-2xl border border-surface-300 bg-surface-100 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-300 hover:bg-white hover:shadow-premium"
          :style="{ animationDelay: `${i * 0.08}s` }"
        >
          <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-600">{{ post.category }}</p>
          <h3 class="mt-4 flex-1 font-display text-xl font-semibold leading-snug text-royal-900">{{ post.title }}</h3>
          <div class="mt-6 flex items-center justify-between border-t border-surface-300 pt-5 text-xs text-royal-500">
            <span>{{ formatDate(post.publishedAt) }}</span>
            <span class="inline-flex items-center gap-1.5 font-semibold text-royal-600 transition-colors group-hover:text-gold-600">
              Read
              <svg viewBox="0 0 20 20" class="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10h13M12 5l5 5-5 5" /></svg>
            </span>
          </div>
        </NuxtLink>
      </div>

      <div v-else class="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
        <div
          v-for="c in ['Furniture Tips', 'Wardrobe Guide', 'Surat Home Ideas']"
          :key="c"
          class="reveal rounded-2xl border border-dashed border-royal-200 bg-surface-100 p-9 text-center"
        >
          <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-600">{{ c }}</p>
          <p class="mt-3 font-display text-lg text-royal-400">New articles publishing soon.</p>
        </div>
      </div>
    </div>
  </section>
</template>
