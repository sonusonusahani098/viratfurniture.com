export function useTilt(maxTilt = 8) {
  const target = ref<HTMLElement | null>(null)
  const style = ref({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)' })

  function onMove(e: PointerEvent) {
    if (!target.value || e.pointerType === 'touch') return
    const rect = target.value.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    const rotateY = x * maxTilt * 2
    const rotateX = y * -maxTilt * 2
    style.value = {
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`,
    }
  }

  function onLeave() {
    style.value = { transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)' }
  }

  onMounted(() => {
    target.value?.addEventListener('pointermove', onMove)
    target.value?.addEventListener('pointerleave', onLeave)
  })
  onBeforeUnmount(() => {
    target.value?.removeEventListener('pointermove', onMove)
    target.value?.removeEventListener('pointerleave', onLeave)
  })

  return { target, style }
}
