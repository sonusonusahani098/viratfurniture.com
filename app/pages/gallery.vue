<script setup lang="ts">
import { business, galleryCategories } from '~/utils/site-data'
import { cldUrl, cldSrcset, type GalleryItem } from '~/utils/cloudinary'

usePageSeo({
  title: 'Project Gallery | Virat Furniture, Surat',
  description: 'Photos from real furniture projects by Virat Furniture — wardrobes, kitchens, bedrooms, offices and builder work completed across Surat.',
  path: '/gallery',
  breadcrumbs: [{ name: 'Gallery' }],
})

const { data: items } = await useAsyncData('gallery-items', () => $fetch<GalleryItem[]>('/api/gallery'), {
  default: () => [],
})

const activeCategory = ref('All')
const filtered = computed(() =>
  activeCategory.value === 'All' ? items.value : items.value.filter((i) => i.category === activeCategory.value)
)
const presentCategories = computed(() => {
  const present = new Set(items.value.map((i) => i.category))
  return galleryCategories.filter((c) => present.has(c))
})

// Fan deck: real photos when available, design tiles otherwise.
const fanned = ref(false)
onMounted(() => setTimeout(() => (fanned.value = true), 120))

interface FanCard {
  label: string
  sub: string
  image?: GalleryItem
  tone: string
  icon: string
}

const tiles: Omit<FanCard, 'image'>[] = [
  { label: 'Wardrobes', sub: 'Hinged · Sliding · Loft', tone: 'from-royal-700 via-royal-800 to-royal-950', icon: 'M5 3h14a1 1 0 0 1 1 1v17H4V4a1 1 0 0 1 1-1zM12 3v18M9.5 12v2M14.5 12v2' },
  { label: 'Modular Kitchens', sub: 'Cabinets · Counters', tone: 'from-wood-400 via-wood-600 to-wood-800', icon: 'M3 9h18M3 9v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9M3 9l2-5h14l2 5M12 13v4' },
  { label: 'Bedrooms', sub: 'Beds · Side Tables', tone: 'from-gold-400 via-gold-600 to-gold-800', icon: 'M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 18h18M6 10V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3' },
  { label: 'Living Rooms', sub: 'TV Units · Panelling', tone: 'from-royal-500 via-royal-700 to-royal-900', icon: 'M3 5h18a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM8 21h8M12 17v4' },
  { label: 'Office Spaces', sub: 'Workstations · Cabins', tone: 'from-[#2E3A52] via-[#1E2940] to-[#101A2E]', icon: 'M4 21V8a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v13M2 21h20M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3M9 12h6' },
  { label: 'Wooden Work', sub: 'Ceilings · Wall Panels', tone: 'from-wood-300 via-wood-500 to-wood-700', icon: 'M3 5h18M3 9h18M6 9v12M12 9v12M18 9v12' },
  { label: 'Builder Projects', sub: '12–21 Floor Towers', tone: 'from-[#1B2B52] via-[#142042] to-[#0C1731]', icon: 'M6 22V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v18M9 9h1M9 13h1M14 9h1M14 13h1M9 22v-4h6v4M2 22h20' },
]

const fanCards = computed<FanCard[]>(() => {
  if (items.value.length >= 5) {
    return items.value.slice(0, 7).map((image) => ({
      label: image.title,
      sub: image.category,
      image,
      tone: 'from-royal-800 to-royal-950',
      icon: '',
    }))
  }
  return tiles
})

function fanStyle(i: number, total: number) {
  const spread = 44
  const center = (total - 1) / 2
  const angle = fanned.value ? (i - center) * (spread / Math.max(total - 1, 1)) : 0
  return {
    transform: `translateX(-50%) rotate(${angle}deg)`,
    zIndex: 30 - Math.round(Math.abs(i - center) * 4),
    transitionDelay: `${i * 55}ms`,
  }
}
</script>

<template>
  <div>
    <section class="border-b border-surface-300 bg-surface-100 py-6">
      <div class="container-px mx-auto">
        <Breadcrumbs :items="[{ name: 'Gallery' }]" />
      </div>
    </section>

    <section class="relative overflow-hidden bg-gradient-to-b from-[#F7F4EC] to-white pt-16 sm:pt-20">
      <div class="pointer-events-none absolute -top-32 left-[-10%] h-[28rem] w-[28rem] rounded-full bg-gold-100/70 blur-3xl" />
      <div class="pointer-events-none absolute -top-20 right-[-10%] h-[24rem] w-[24rem] rounded-full bg-royal-100/70 blur-3xl" />
      <div class="pointer-events-none absolute inset-0 bg-grain" />

      <div class="container-px relative mx-auto max-w-3xl text-center">
        <p class="kicker kicker-center justify-center">Project Gallery</p>
        <h1 class="mt-6 font-display text-4xl font-bold text-royal-900 sm:text-5xl">
          Real projects, <em class="italic text-royal-600">real homes</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-royal-600">
          Every photo here comes from work our own team measured, built and installed across Surat — added project by project as we complete them.
        </p>
      </div>

      <div class="fan-stage relative mx-auto mt-10 h-[300px] w-full max-w-4xl sm:h-[340px]" aria-hidden="true">
        <div
          v-for="(card, i) in fanCards"
          :key="card.label + i"
          class="fan-card absolute left-1/2 top-2 w-48 origin-[50%_115%] sm:w-60"
          :class="{ 'hidden sm:block': i === 0 || i === fanCards.length - 1 }"
          :style="fanStyle(i, fanCards.length)"
        >
          <div class="relative aspect-[3/4] overflow-hidden rounded-2xl border-4 border-white shadow-premium transition-shadow duration-300">
            <template v-if="card.image">
              <img
                :src="cldUrl(card.image, 480)"
                :alt="card.image.alt"
                class="h-full w-full object-cover"
                loading="lazy"
                width="480"
                height="640"
              >
              <div class="absolute inset-0 bg-gradient-to-b from-royal-950/80 via-transparent to-transparent" />
            </template>
            <template v-else>
              <div class="pinstripes h-full w-full bg-gradient-to-br" :class="card.tone" />
            </template>
            <div class="absolute inset-x-0 top-0 p-4 text-left sm:p-5">
              <span v-if="!card.image" class="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-gold-200">
                <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path :d="card.icon" /></svg>
              </span>
              <p class="font-display text-base font-semibold leading-snug text-white sm:text-lg">{{ card.label }}</p>
              <p class="mt-1 text-[11px] font-medium uppercase tracking-wider text-gold-200">{{ card.sub }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-py bg-white">
      <div class="container-px mx-auto">
        <template v-if="items.length">
          <div class="flex flex-wrap items-center justify-center gap-2.5">
            <button
              v-for="c in ['All', ...presentCategories]"
              :key="c"
              class="rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200"
              :class="activeCategory === c
                ? 'border-royal-600 bg-royal-600 text-white shadow-soft'
                : 'border-surface-400/70 bg-white text-royal-700 hover:border-gold-400 hover:bg-gold-50'"
              @click="activeCategory = c"
            >
              {{ c }}
            </button>
          </div>

          <div class="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
            <a
              v-for="item in filtered"
              :key="item.publicId"
              :href="cldUrl(item, 1600)"
              target="_blank"
              rel="noopener"
              class="group block break-inside-avoid overflow-hidden rounded-2xl border border-surface-300 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-premium"
            >
              <div class="overflow-hidden">
                <img
                  :src="cldUrl(item, 768)"
                  :srcset="cldSrcset(item)"
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                  :alt="item.alt"
                  :width="item.width"
                  :height="item.height"
                  loading="lazy"
                  class="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                >
              </div>
              <div class="flex items-center justify-between gap-3 p-4">
                <div>
                  <p class="font-display text-[15px] font-semibold text-royal-900">{{ item.title }}</p>
                  <p class="mt-0.5 text-xs uppercase tracking-wide text-royal-500">{{ item.category }}<span v-if="item.area"> · {{ item.area }}</span></p>
                </div>
                <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold-200 text-gold-600 transition group-hover:bg-gold-500 group-hover:text-white">
                  <svg viewBox="0 0 20 20" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 15L15 5M8 5h7v7" /></svg>
                </span>
              </div>
            </a>
          </div>
        </template>

        <div v-else class="mx-auto max-w-2xl rounded-[1.75rem] border border-surface-300 bg-surface-100 p-10 text-center sm:p-14">
          <p class="font-display text-2xl font-semibold text-royal-900">Project photos are on their way</p>
          <p class="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-royal-600">
            We're photographing recent wardrobe, kitchen and office projects and adding them here one by one —
            real work only, no stock photos. Want to see examples of a specific type of furniture right now?
            Message us and we'll share them directly.
          </p>
          <div class="mt-8 flex flex-wrap justify-center gap-4">
            <a :href="business.whatsappLink('Hi, could you share photos of your recent furniture work?')" target="_blank" rel="noopener" class="btn-gold">Ask on WhatsApp</a>
            <NuxtLink to="/services" class="btn-outline">Browse Services</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section class="pb-16 md:pb-24">
      <div class="container-px mx-auto">
        <CtaBanner title="Want furniture like this in your home?" description="Tell us what you have in mind and we'll visit your site with samples and ideas." />
      </div>
    </section>
  </div>
</template>

<style scoped>
.fan-card {
  transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}
.fan-card:hover {
  transition-duration: 0.3s;
}
.fan-card:hover {
  z-index: 60 !important;
}
.fan-card:hover > div {
  box-shadow: 0 0 0 1px rgba(201, 162, 39, 0.25), 0 18px 50px -12px rgba(16, 31, 68, 0.45);
  translate: 0 -18px;
}
.fan-card > div {
  transition: translate 0.3s ease, box-shadow 0.3s ease;
}
.fan-stage:hover .fan-card:not(:hover) {
  filter: saturate(0.92) brightness(0.97);
}
@media (prefers-reduced-motion: reduce) {
  .fan-card { transition: none; }
}
</style>
