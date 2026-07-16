<script setup lang="ts">
import { business } from '~/utils/site-data'

const props = defineProps<{ error: { statusCode: number; statusMessage?: string } }>()

const isNotFound = computed(() => props.error?.statusCode === 404)

useHead({
  title: isNotFound.value ? 'Page Not Found | Virat Furniture' : 'Something Went Wrong | Virat Furniture',
})

function handleClear() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <TheHeader />
    <main class="flex flex-1 items-center justify-center overflow-hidden">
      <div class="container-px relative mx-auto flex flex-col items-center py-24 text-center">
        <div class="pointer-events-none absolute -top-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-royal-100 blur-3xl" />
        <p class="relative eyebrow">{{ isNotFound ? '404 Error' : `Error ${error?.statusCode || ''}` }}</p>
        <h1 class="relative mt-6 font-display text-4xl font-semibold text-royal-900 sm:text-5xl">
          {{ isNotFound ? "This page hasn't been built yet" : 'Something went wrong' }}
        </h1>
        <p class="relative mt-4 max-w-md text-royal-700">
          <template v-if="isNotFound">
            We're steadily adding new service and area pages across Surat. In the meantime, explore our services or get in touch directly.
          </template>
          <template v-else>
            Please try again, or contact us directly and our team will help you right away.
          </template>
        </p>
        <div class="relative mt-8 flex flex-wrap items-center justify-center gap-4">
          <button class="btn-primary" @click="handleClear">Back to Homepage</button>
          <NuxtLink to="/services" class="btn-outline">Browse Services</NuxtLink>
          <a :href="`tel:${business.phoneRaw}`" class="btn-outline">Call {{ business.phone }}</a>
        </div>
      </div>
    </main>
    <TheFooter />
  </div>
</template>
