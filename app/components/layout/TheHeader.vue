<script setup lang="ts">
import { business, services, areas, mainNav } from '~/utils/site-data'

const isScrolled = ref(false)
const isMobileOpen = ref(false)
const openMega = ref<string | null>(null)

const serviceGroups = computed(() => {
  const groups: Record<string, typeof services> = {}
  for (const s of services) {
    if (!groups[s.group]) groups[s.group] = []
    groups[s.group].push(s)
  }
  return groups
})

function onScroll() {
  isScrolled.value = window.scrollY > 12
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const route = useRoute()
watch(() => route.fullPath, () => {
  isMobileOpen.value = false
  openMega.value = null
})
</script>

<template>
  <header
    class="sticky top-0 z-50 transition-all duration-300"
    :class="isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-soft' : 'bg-white/40 backdrop-blur-md'"
  >
    <div class="container-px mx-auto flex h-20 items-center justify-between">
      <NuxtLink to="/" class="flex items-center gap-2.5 shrink-0">
        <span class="flex h-11 w-11 items-center justify-center rounded-xl2 bg-gradient-to-br from-royal-600 to-royal-800 text-white shadow-premium">
          <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 20v-6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6" />
            <path d="M3 14a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v3" />
            <path d="M6 14v-3a2 2 0 0 1 2-2h1M18 14v-3a2 2 0 0 0-2-2h-1" />
          </svg>
        </span>
        <span class="leading-tight">
          <span class="block font-display text-lg font-semibold text-royal-900">Virat Furniture</span>
          <span class="block text-[11px] font-medium uppercase tracking-wider text-gold-600">Surat</span>
        </span>
      </NuxtLink>

      <nav class="hidden items-center gap-1 lg:flex" @mouseleave="openMega = null">
        <div
          v-for="item in mainNav.slice(0, 1)"
          :key="item.to"
          class="relative"
        >
          <NuxtLink :to="item.to" class="rounded-full px-4 py-2 text-sm font-medium text-royal-800 transition hover:bg-royal-50">{{ item.name }}</NuxtLink>
        </div>

        <div class="relative" @mouseenter="openMega = 'services'">
          <button class="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-royal-800 transition hover:bg-royal-50" :class="{ 'bg-royal-50': openMega === 'services' }">
            Services
            <svg viewBox="0 0 20 20" class="h-4 w-4"><path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </button>
          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-2"
          >
            <div v-if="openMega === 'services'" class="absolute left-1/2 top-full z-50 mt-3 w-[720px] -translate-x-1/2 rounded-xl3 border border-surface-300 bg-white p-6 shadow-premium">
              <div class="grid grid-cols-3 gap-6">
                <div v-for="(items, group) in serviceGroups" :key="group">
                  <p class="mb-3 text-xs font-semibold uppercase tracking-wider text-gold-600">{{ group }}</p>
                  <ul class="space-y-1.5">
                    <li v-for="s in items" :key="s.slug">
                      <NuxtLink :to="`/services/${s.slug}`" class="block rounded-lg px-2 py-1 text-sm text-royal-800 transition hover:bg-royal-50 hover:text-royal-600">{{ s.name }}</NuxtLink>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="mt-5 flex items-center justify-between border-t border-surface-300 pt-4">
                <p class="text-sm text-royal-700">Can't find what you're looking for?</p>
                <NuxtLink to="/services" class="text-sm font-semibold text-royal-600 hover:text-royal-800">View all services →</NuxtLink>
              </div>
            </div>
          </Transition>
        </div>

        <div class="relative" @mouseenter="openMega = 'areas'">
          <button class="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-royal-800 transition hover:bg-royal-50" :class="{ 'bg-royal-50': openMega === 'areas' }">
            Areas We Serve
            <svg viewBox="0 0 20 20" class="h-4 w-4"><path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </button>
          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-2"
          >
            <div v-if="openMega === 'areas'" class="absolute left-1/2 top-full z-50 mt-3 w-[640px] -translate-x-1/2 rounded-xl3 border border-surface-300 bg-white p-6 shadow-premium">
              <div class="grid grid-cols-4 gap-x-4 gap-y-1.5">
                <NuxtLink v-for="a in areas" :key="a.slug" :to="`/areas/${a.slug}`" class="rounded-lg px-2 py-1.5 text-sm text-royal-800 transition hover:bg-royal-50 hover:text-royal-600">{{ a.name }}</NuxtLink>
              </div>
              <div class="mt-5 flex items-center justify-between border-t border-surface-300 pt-4">
                <p class="text-sm text-royal-700">We serve all major areas of Surat.</p>
                <NuxtLink to="/areas" class="text-sm font-semibold text-royal-600 hover:text-royal-800">View all areas →</NuxtLink>
              </div>
            </div>
          </Transition>
        </div>

        <NuxtLink
          v-for="item in mainNav.slice(4)"
          :key="item.to"
          :to="item.to"
          class="rounded-full px-4 py-2 text-sm font-medium text-royal-800 transition hover:bg-royal-50"
        >
          {{ item.name }}
        </NuxtLink>
      </nav>

      <div class="hidden items-center gap-3 lg:flex">
        <a :href="`tel:${business.phoneRaw}`" class="btn-outline !px-5 !py-2.5 text-sm">
          <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          Call Now
        </a>
        <NuxtLink to="/contact" class="btn-primary !px-5 !py-2.5 text-sm">Get Free Estimate</NuxtLink>
      </div>

      <button class="flex h-10 w-10 items-center justify-center rounded-lg text-royal-800 lg:hidden" aria-label="Open menu" @click="isMobileOpen = !isMobileOpen">
        <svg v-if="!isMobileOpen" viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        <svg v-else viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="isMobileOpen" class="max-h-[80vh] overflow-y-auto border-t border-surface-300 bg-white px-5 pb-8 pt-4 lg:hidden">
        <nav class="flex flex-col gap-1">
          <NuxtLink v-for="item in mainNav" :key="item.to" :to="item.to" class="rounded-lg px-3 py-3 text-base font-medium text-royal-900 hover:bg-royal-50">{{ item.name }}</NuxtLink>
        </nav>
        <div class="mt-5 grid grid-cols-2 gap-3">
          <a :href="`tel:${business.phoneRaw}`" class="btn-outline w-full text-sm">Call Now</a>
          <NuxtLink to="/contact" class="btn-primary w-full text-sm">Free Estimate</NuxtLink>
        </div>
      </div>
    </Transition>
  </header>
</template>
