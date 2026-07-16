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

/* ---------- filters ---------- */
const activeCategory = ref('All')
const filtered = computed(() =>
  activeCategory.value === 'All' ? items.value : items.value.filter((i) => i.category === activeCategory.value)
)
const categoryCounts = computed(() => {
  const counts: Record<string, number> = {}
  for (const i of items.value) counts[i.category] = (counts[i.category] || 0) + 1
  return counts
})
const presentCategories = computed(() => galleryCategories.filter((c) => categoryCounts.value[c]))

/* ---------- hero fan ---------- */
const heroEl = ref<HTMLElement | null>(null)
const fanned = ref(false)
const mx = ref(0)
const my = ref(0)

onMounted(() => setTimeout(() => (fanned.value = true), 150))

function onPointerMove(e: PointerEvent) {
  if (e.pointerType === 'touch' || !heroEl.value) return
  const rect = heroEl.value.getBoundingClientRect()
  mx.value = (e.clientX - rect.left) / rect.width - 0.5
  my.value = (e.clientY - rect.top) / rect.height - 0.5
}

interface FanCard {
  label: string
  sub: string
  image?: GalleryItem
  tone: string
  icon: string
}

const tiles: FanCard[] = [
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
  const spread = 46
  const center = (total - 1) / 2
  const angle = (i - center) * (spread / Math.max(total - 1, 1))
  if (!fanned.value) {
    return {
      '--angle': '0deg',
      transform: 'translateX(-50%) rotate(0deg) translateY(70px) scale(0.82)',
      opacity: '0',
      zIndex: 30 - Math.round(Math.abs(i - center) * 4),
      transitionDelay: `${i * 70}ms`,
    }
  }
  return {
    '--angle': `${angle.toFixed(2)}deg`,
    transform: `translateX(-50%) rotate(${angle.toFixed(2)}deg)`,
    opacity: '1',
    zIndex: 30 - Math.round(Math.abs(i - center) * 4),
    transitionDelay: `${i * 70}ms`,
  }
}

function onFanCardClick(card: FanCard) {
  if (card.image) {
    activeCategory.value = 'All'
    nextTick(() => {
      const idx = filtered.value.findIndex((i) => i.publicId === card.image!.publicId)
      if (idx >= 0) lightbox.value = idx
    })
  } else {
    scrollToBrowse()
  }
}

function scrollToBrowse() {
  document.getElementById('gallery-browse')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* ---------- lightbox ---------- */
const lightbox = ref<number | null>(null)
const lightboxItem = computed(() => (lightbox.value === null ? null : filtered.value[lightbox.value] ?? null))

function lightboxStep(dir: 1 | -1) {
  if (lightbox.value === null || !filtered.value.length) return
  lightbox.value = (lightbox.value + dir + filtered.value.length) % filtered.value.length
}

function onKeydown(e: KeyboardEvent) {
  if (lightbox.value === null) return
  if (e.key === 'Escape') lightbox.value = null
  else if (e.key === 'ArrowRight') lightboxStep(1)
  else if (e.key === 'ArrowLeft') lightboxStep(-1)
}

watch(lightbox, (v) => {
  if (import.meta.client) document.documentElement.classList.toggle('overflow-hidden', v !== null)
})

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  if (import.meta.client) document.documentElement.classList.remove('overflow-hidden')
})

/* ---------- empty-state category explorer ---------- */
const explorer = [
  { name: 'Wardrobes', to: '/services/wooden-wardrobe', sub: 'Hinged · sliding · walk-in', icon: 'M5 3h14a1 1 0 0 1 1 1v17H4V4a1 1 0 0 1 1-1zM12 3v18M9.5 12v2M14.5 12v2' },
  { name: 'Bedrooms', to: '/services/bedroom-furniture', sub: 'Beds · dressing · storage', icon: 'M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 18h18M6 10V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3' },
  { name: 'Living Rooms & TV Units', to: '/services/tv-unit', sub: 'TV walls · display', icon: 'M3 5h18a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM8 21h8M12 17v4' },
  { name: 'Modular Kitchens', to: '/services/modular-kitchen', sub: 'Cabinets · tall units', icon: 'M3 9h18M3 9v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9M3 9l2-5h14l2 5M12 13v4' },
  { name: 'Office & Commercial', to: '/services/office-furniture', sub: 'Workstations · counters', icon: 'M4 21V8a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v13M2 21h20M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3M9 12h6' },
  { name: 'Wooden Work & Ceilings', to: '/services/wooden-ceiling', sub: 'Panelling · partitions', icon: 'M3 5h18M3 9h18M6 9v12M12 9v12M18 9v12' },
  { name: 'Repair & Renovation', to: '/services/furniture-renovation', sub: 'Reface · re-polish', icon: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4L15 12l-3-3 2.7-2.7z' },
  { name: 'Builder Projects', to: '/services/builder-furniture-work', sub: 'Towers · show flats', icon: 'M6 22V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v18M9 9h1M9 13h1M14 9h1M14 13h1M9 22v-4h6v4M2 22h20' },
]
</script>

<template>
  <div>
    <section class="border-b border-surface-300 bg-surface-100 py-6">
      <div class="container-px mx-auto">
        <Breadcrumbs :items="[{ name: 'Gallery' }]" />
      </div>
    </section>

    <!-- Immersive hero -->
    <section
      ref="heroEl"
      class="pinstripes relative overflow-hidden bg-gradient-to-br from-[#101F44] via-royal-900 to-[#0C1731]"
      @pointermove="onPointerMove"
    >
      <div class="pointer-events-none absolute inset-0 bg-grain" />
      <div class="pointer-events-none absolute -left-32 top-0 h-[26rem] w-[26rem] rounded-full bg-royal-600/25 blur-3xl" />
      <div class="pointer-events-none absolute -right-24 bottom-0 h-[22rem] w-[22rem] rounded-full bg-gold-500/15 blur-3xl" />

      <div class="container-px relative mx-auto max-w-3xl pt-16 text-center sm:pt-20">
        <p class="kicker kicker-center justify-center !text-gold-400">Project Gallery</p>
        <h1 class="mt-6 font-display text-4xl font-bold text-white sm:text-5xl">
          Real projects, <em class="italic text-gold-300">real homes</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-royal-100/90">
          Every photo here comes from work our own team measured, built and installed across Surat — added project by project as we complete them.
        </p>
      </div>

      <div
        class="fan-stage relative mx-auto mt-8 h-[300px] w-full max-w-4xl sm:h-[340px]"
        :style="{ transform: `translate3d(${(mx * 14).toFixed(1)}px, ${(my * 8).toFixed(1)}px, 0)` }"
      >
        <div class="fan-sway absolute inset-0">
          <button
            v-for="(card, i) in fanCards"
            :key="card.label + i"
            type="button"
            class="fan-card absolute left-1/2 top-2 w-48 origin-[50%_115%] cursor-pointer sm:w-60"
            :class="{ 'hidden sm:block': i === 0 || i === fanCards.length - 1 }"
            :style="fanStyle(i, fanCards.length)"
            :aria-label="card.image ? `View photo: ${card.label}` : `Browse ${card.label}`"
            @click="onFanCardClick(card)"
          >
            <span class="fan-card-inner relative block aspect-[3/4] overflow-hidden rounded-2xl border-4 border-white shadow-premium">
              <template v-if="card.image">
                <img
                  :src="cldUrl(card.image, 480)"
                  :alt="card.image.alt"
                  class="h-full w-full object-cover"
                  loading="lazy"
                  width="480"
                  height="640"
                >
                <span class="absolute inset-0 bg-gradient-to-b from-royal-950/80 via-transparent to-transparent" />
              </template>
              <template v-else>
                <span class="pinstripes absolute inset-0 bg-gradient-to-br" :class="card.tone" />
              </template>
              <span class="absolute inset-x-0 top-0 p-4 text-left sm:p-5">
                <span v-if="!card.image" class="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-gold-200">
                  <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path :d="card.icon" /></svg>
                </span>
                <span class="block font-display text-base font-semibold leading-snug text-white sm:text-lg">{{ card.label }}</span>
                <span class="mt-1 block text-[11px] font-medium uppercase tracking-wider text-gold-200">{{ card.sub }}</span>
              </span>
              <span class="fan-shine pointer-events-none absolute inset-0" />
            </span>
          </button>
        </div>
      </div>

      <div class="relative flex justify-center pb-6">
        <button
          type="button"
          class="group flex flex-col items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-royal-300 transition hover:text-gold-300"
          @click="scrollToBrowse"
        >
          {{ items.length ? 'Browse all photos' : 'Explore our work' }}
          <svg viewBox="0 0 24 24" class="h-5 w-5 animate-bounce text-gold-400" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6" /></svg>
        </button>
      </div>
    </section>

    <!-- Browse -->
    <section id="gallery-browse" class="section-py scroll-mt-20 bg-white">
      <div class="container-px mx-auto">
        <template v-if="items.length">
          <div class="flex flex-wrap items-center justify-center gap-2.5">
            <button
              v-for="c in ['All', ...presentCategories]"
              :key="c"
              type="button"
              class="group flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300"
              :class="activeCategory === c
                ? 'border-royal-600 bg-royal-600 text-white shadow-premium'
                : 'border-surface-400/70 bg-white text-royal-700 hover:-translate-y-0.5 hover:border-gold-400 hover:bg-gold-50'"
              @click="activeCategory = c; lightbox = null"
            >
              {{ c }}
              <span
                class="rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none transition-colors"
                :class="activeCategory === c ? 'bg-white/20 text-gold-200' : 'bg-surface-200 text-royal-500 group-hover:bg-gold-100 group-hover:text-gold-700'"
              >
                {{ c === 'All' ? items.length : categoryCounts[c] }}
              </span>
            </button>
          </div>

          <TransitionGroup
            tag="div"
            class="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5"
            enter-active-class="transition-all duration-500"
            enter-from-class="opacity-0 translate-y-6"
            leave-active-class="transition-all duration-200 absolute opacity-0"
          >
            <button
              v-for="(item, idx) in filtered"
              :key="item.publicId"
              type="button"
              class="group block w-full break-inside-avoid overflow-hidden rounded-2xl border border-surface-300 bg-white text-left shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-300 hover:shadow-premium"
              :aria-label="`View ${item.title}`"
              @click="lightbox = idx"
            >
              <span class="relative block overflow-hidden">
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
                <span class="absolute inset-0 bg-gradient-to-t from-royal-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span class="absolute inset-x-0 bottom-0 flex translate-y-3 items-center justify-between p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span class="text-xs font-semibold uppercase tracking-wider text-gold-200">{{ item.category }}</span>
                  <span class="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur">
                    <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" /></svg>
                  </span>
                </span>
              </span>
              <span class="flex items-center justify-between gap-3 p-4">
                <span>
                  <span class="block font-display text-[15px] font-semibold text-royal-900">{{ item.title }}</span>
                  <span class="mt-0.5 block text-xs uppercase tracking-wide text-royal-500"><template v-if="item.area">{{ item.area }} · </template>{{ item.category }}</span>
                </span>
              </span>
            </button>
          </TransitionGroup>
        </template>

        <template v-else>
          <div class="reveal mx-auto flex max-w-3xl flex-col items-center gap-8 rounded-[2rem] border border-surface-300 bg-gradient-to-b from-surface-100 to-white p-10 text-center shadow-soft sm:p-14">
            <span class="flex h-16 w-16 items-center justify-center rounded-full border border-gold-200 bg-gold-50 text-gold-600">
              <svg viewBox="0 0 24 24" class="h-8 w-8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>
            </span>
            <div>
              <p class="font-display text-2xl font-semibold text-royal-900 sm:text-3xl">Project photos are on their way</p>
              <p class="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-royal-600">
                We're photographing recent wardrobe, kitchen and office projects and adding them here one by one —
                real work only, no stock photos. Want to see examples of a specific type of furniture right now?
                Message us and we'll share them directly.
              </p>
            </div>
            <div class="flex flex-wrap justify-center gap-4">
              <a :href="business.whatsappLink('Hi, could you share photos of your recent furniture work?')" target="_blank" rel="noopener" class="btn-gold">Ask on WhatsApp</a>
              <a :href="`tel:${business.phoneRaw}`" class="btn-outline">Call {{ business.phone }}</a>
            </div>
          </div>

          <div class="mt-20">
            <div class="reveal mx-auto max-w-2xl text-center">
              <p class="kicker kicker-center justify-center">Browse by Space</p>
              <h2 class="mt-6 font-display text-3xl font-bold text-royal-900 sm:text-[2.4rem] sm:leading-tight">
                Meanwhile, explore <em class="italic text-royal-600">what we build</em>
              </h2>
            </div>
            <div class="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <NuxtLink
                v-for="(e, i) in explorer"
                :key="e.name"
                :to="e.to"
                class="reveal group relative flex h-full flex-col rounded-2xl border border-surface-300 bg-surface-100 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-300 hover:bg-white hover:shadow-premium"
                :style="{ animationDelay: `${(i % 4) * 0.07}s` }"
              >
                <span class="flex h-11 w-11 items-center justify-center rounded-full border border-gold-200 bg-white text-gold-600 transition-all duration-300 group-hover:border-gold-500 group-hover:bg-gold-500 group-hover:text-white">
                  <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path :d="e.icon" /></svg>
                </span>
                <span class="mt-5 block font-display text-lg font-semibold leading-snug text-royal-900">{{ e.name }}</span>
                <span class="mt-1 block flex-1 text-xs uppercase tracking-wider text-royal-500">{{ e.sub }}</span>
                <span class="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-royal-600 transition-colors group-hover:text-gold-600">
                  Explore
                  <svg viewBox="0 0 20 20" class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10h13M12 5l5 5-5 5" /></svg>
                </span>
              </NuxtLink>
            </div>
          </div>
        </template>
      </div>
    </section>

    <section class="pb-16 md:pb-24">
      <div class="container-px mx-auto">
        <CtaBanner title="Want furniture like this in your home?" description="Tell us what you have in mind and we'll visit your site with samples and ideas." />
      </div>
    </section>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="lightboxItem"
          class="fixed inset-0 z-[100] flex flex-col bg-[#0A1329]/95 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          :aria-label="lightboxItem.title"
          @click.self="lightbox = null"
        >
          <div class="flex items-center justify-between gap-4 p-4 sm:p-6">
            <div class="min-w-0">
              <p class="truncate font-display text-lg font-semibold text-white">{{ lightboxItem.title }}</p>
              <p class="mt-0.5 text-xs uppercase tracking-wider text-gold-300"><template v-if="lightboxItem.area">{{ lightboxItem.area }} · </template>{{ lightboxItem.category }}</p>
            </div>
            <button
              type="button"
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white hover:text-royal-900"
              aria-label="Close"
              @click="lightbox = null"
            >
              <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>

          <div class="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 sm:px-16" @click.self="lightbox = null">
            <img
              :key="lightboxItem.publicId"
              :src="cldUrl(lightboxItem, 1600)"
              :alt="lightboxItem.alt"
              class="max-h-full max-w-full rounded-xl object-contain shadow-premium"
            >
            <button
              v-if="filtered.length > 1"
              type="button"
              class="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-royal-900 sm:left-5"
              aria-label="Previous photo"
              @click="lightboxStep(-1)"
            >
              <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button
              v-if="filtered.length > 1"
              type="button"
              class="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-royal-900 sm:right-5"
              aria-label="Next photo"
              @click="lightboxStep(1)"
            >
              <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6" /></svg>
            </button>
          </div>

          <p v-if="filtered.length > 1" class="pb-5 text-center text-xs font-medium uppercase tracking-[0.22em] text-royal-300">
            {{ (lightbox ?? 0) + 1 }} / {{ filtered.length }}
          </p>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.fan-card {
  transition: transform 0.9s cubic-bezier(0.34, 1.4, 0.5, 1), opacity 0.6s ease;
}
.fan-card:hover,
.fan-card:focus-visible {
  z-index: 60 !important;
}
.fan-card-inner {
  transition: translate 0.35s cubic-bezier(0.22, 1, 0.36, 1), rotate 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease;
}
.fan-card:hover .fan-card-inner,
.fan-card:focus-visible .fan-card-inner {
  translate: 0 -26px;
  rotate: calc(var(--angle, 0deg) * -0.45);
  box-shadow: 0 0 0 1px rgba(228, 197, 108, 0.45), 0 24px 60px -12px rgba(4, 10, 30, 0.7);
}
.fan-shine {
  background: linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.22) 50%, transparent 60%);
  background-size: 220% 100%;
  background-position: 120% 0;
}
.fan-card:hover .fan-shine {
  animation: shine-sweep 0.85s ease forwards;
}
@keyframes shine-sweep {
  to { background-position: -120% 0; }
}
.fan-sway {
  transform-origin: 50% 120%;
  animation: fan-sway 10s ease-in-out infinite;
}
.fan-stage:hover .fan-sway {
  animation-play-state: paused;
}
@keyframes fan-sway {
  0%, 100% { rotate: -0.8deg; }
  50% { rotate: 0.8deg; }
}
.fan-stage {
  transition: transform 0.25s ease-out;
}
@media (prefers-reduced-motion: reduce) {
  .fan-card, .fan-card-inner, .fan-stage { transition: none; }
  .fan-sway { animation: none; }
  .fan-card:hover .fan-shine { animation: none; }
}
</style>
