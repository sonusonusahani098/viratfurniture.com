<script setup lang="ts">
const visible = ref(false)

function onScroll() {
  visible.value = window.scrollY > 500
}

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-3"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-3"
  >
    <button
      v-if="visible"
      class="fixed bottom-24 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-royal-800/90 text-white shadow-premium backdrop-blur transition hover:bg-royal-700 lg:bottom-8"
      aria-label="Back to top"
      @click="scrollTop"
    >
      <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
    </button>
  </Transition>
</template>
