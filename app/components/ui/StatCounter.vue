<script setup lang="ts">
const props = defineProps<{
  target: number
  suffix?: string
  label: string
}>()

const el = ref<HTMLElement | null>(null)
const current = ref(0)
const hasAnimated = ref(false)

function animate() {
  if (hasAnimated.value) return
  hasAnimated.value = true
  const duration = 1600
  const start = performance.now()
  function tick(now: number) {
    const progress = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    current.value = Math.round(props.target * eased)
    if (progress < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

onMounted(() => {
  if (!el.value) return
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        animate()
        observer.disconnect()
      }
    },
    { threshold: 0.4 }
  )
  observer.observe(el.value)
})
</script>

<template>
  <div ref="el" class="text-center">
    <p class="font-display text-4xl font-bold text-white sm:text-5xl">{{ current }}{{ suffix }}</p>
    <p class="mt-2 text-sm font-medium text-royal-200">{{ label }}</p>
  </div>
</template>
