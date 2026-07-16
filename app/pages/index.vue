<script setup lang="ts">
usePageSeo({
  title: 'Virat Furniture | Custom Furniture Maker in Surat, Gujarat',
  description: 'Virat Furniture designs, manufactures and installs custom furniture, modular interiors, wardrobes and office furniture across Surat. 20+ years experience, team of 15 craftsmen.',
  path: '/',
})

useSchemaOrg([
  defineLocalBusiness({
    name: 'Virat Furniture',
    description: 'Custom furniture manufacturing, modular furniture, wardrobes, office furniture and furniture repair serving Surat, Gujarat for over 20 years.',
    telephone: '+919725713944',
    email: 'service@viratfurniture.com',
    address: {
      streetAddress: 'Shop Number G109, Gaurav Path Road, Palanpur',
      addressLocality: 'Surat',
      addressRegion: 'Gujarat',
      postalCode: '395009',
      addressCountry: 'IN',
    },
    openingHoursSpecification: [
      { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '09:00', closes: '19:00' },
    ],
  }),
])
</script>

<template>
  <div>
    <HomeHero />
    <HomeStatsBar />
    <HomeServicesOverview />
    <HomeProcess />
    <HomeCraftBanner />
    <HomeWhyChooseUs />
    <HomeAreasOverview />
    <HomeTestimonials />
    <HomeFaqSection />
    <HomeBlogPreview />
    <HomeMapSection />
  </div>
</template>
