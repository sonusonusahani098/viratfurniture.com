<template>
  <div class="flex min-h-screen flex-col">
    <TheHeader />
    <main class="flex-1 pb-16 lg:pb-0">
      <slot />
    </main>
    <TheFooter />
    <StickyMobileBar />
    <BackToTop />
  </div>
</template>
