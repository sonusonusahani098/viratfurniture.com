<script setup lang="ts">
defineProps<{
  faqs: { question: string; answer: string }[]
}>()

const openIndex = ref(0)

function toggle(i: number) {
  openIndex.value = openIndex.value === i ? -1 : i
}
</script>

<template>
  <div class="divide-y divide-surface-300 rounded-xl2 border border-surface-300 bg-white shadow-soft">
    <div v-for="(faq, i) in faqs" :key="faq.question">
      <button
        class="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        :aria-expanded="openIndex === i"
        @click="toggle(i)"
      >
        <span class="font-medium text-royal-900">{{ faq.question }}</span>
        <svg
          viewBox="0 0 20 20"
          class="h-5 w-5 shrink-0 text-gold-600 transition-transform duration-300"
          :class="{ 'rotate-45': openIndex === i }"
        >
          <path d="M10 4v12M4 10h12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="grid-rows-[0fr] opacity-0"
        enter-to-class="grid-rows-[1fr] opacity-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="grid-rows-[1fr] opacity-100"
        leave-to-class="grid-rows-[0fr] opacity-0"
      >
        <div v-if="openIndex === i" class="grid grid-rows-[1fr]">
          <div class="overflow-hidden">
            <p class="px-6 pb-5 text-sm leading-relaxed text-royal-600">{{ faq.answer }}</p>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>
