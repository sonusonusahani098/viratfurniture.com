<script setup lang="ts">
useSchemaOrg([
  defineWebSite({
    name: 'Virat Furniture',
    description: 'Custom furniture, modular furniture, wardrobes and furniture repair across Surat, Gujarat.',
  }),
  defineOrganization({
    name: 'Virat Furniture',
    logo: '/images/favicon/android-icon-192x192.png',
  }),
])
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
