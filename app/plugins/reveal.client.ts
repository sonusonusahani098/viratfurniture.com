export default defineNuxtPlugin(() => {
  let observer: IntersectionObserver | null = null

  const observe = () => {
    if (!observer) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              observer?.unobserve(entry.target)
            }
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
      )
    }
    document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => observer?.observe(el))
  }

  const router = useRouter()
  router.afterEach(() => {
    nextTick(() => setTimeout(observe, 50))
  })

  onNuxtReady(() => observe())
})
