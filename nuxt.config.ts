// Cloudflare Workers builds set WORKERS_CI=1; NITRO_PRESET override also honoured.
const isCloudflare = Boolean(process.env.WORKERS_CI) || (process.env.NITRO_PRESET || '').startsWith('cloudflare')

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxt/fonts',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-schema-org',
    'nuxt-og-image',
  ],

  css: ['~/assets/css/main.css'],

  components: [
    { path: '~/components/ui', pathPrefix: false },
    { path: '~/components/layout', pathPrefix: false },
    { path: '~/components/home', pathPrefix: false, prefix: 'Home' },
  ],

  app: {
    head: {
      htmlAttrs: { lang: 'en-IN' },
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/images/favicon/favicon.ico' },
        { rel: 'icon', type: 'image/png', href: '/images/favicon/favicon-32x32.png', sizes: '32x32' },
        { rel: 'icon', type: 'image/png', href: '/images/favicon/favicon-16x16.png', sizes: '16x16' },
        { rel: 'apple-touch-icon', href: '/images/favicon/apple-icon.png' },
        { rel: 'manifest', href: '/images/favicon/manifest.json' },
      ],
      meta: [{ name: 'msapplication-config', content: '/images/favicon/browserconfig.xml' }],
    },
  },

  site: {
    url: 'https://viratfurniture.com',
    name: 'Virat Furniture',
    description: 'Custom furniture, modular furniture, wardrobes, office furniture and furniture repair in Surat, Gujarat. 20+ years experience, trusted by builders and homeowners across the city.',
    defaultLocale: 'en-IN',
  },

  sitemap: {
    sources: ['/api/__sitemap__/urls'],
    exclude: ['/admin'],
  },

  robots: {
    disallow: ['/admin'],
  },

  runtimeConfig: {
    adminPassword: '',
    cloudinary: {
      cloudName: '',
      apiKey: '',
      apiSecret: '',
      folder: 'virat-furniture/gallery',
    },
    public: {
      cloudinaryCloudName: '',
    },
  },

  schemaOrg: {
    identity: {
      type: 'LocalBusiness',
      name: 'Virat Furniture',
      url: 'https://viratfurniture.com',
      logo: '/images/favicon/android-icon-192x192.png',
      telephone: '+91-9725713944',
      email: 'service@viratfurniture.com',
      address: {
        streetAddress: 'Shop Number G109, Gaurav Path Road, Palanpur',
        addressLocality: 'Surat',
        addressRegion: 'Gujarat',
        postalCode: '395009',
        addressCountry: 'IN',
      },
    },
  },

  fonts: {
    defaults: {
      weights: [400, 500, 600, 700, 800],
    },
  },

  content: {
    build: {
      markdown: {
        toc: { depth: 2 },
      },
    },
    // Workers have no filesystem/SQLite — Nuxt Content must use a D1 database
    // there (binding "DB" in wrangler.jsonc). Local dev/build keeps SQLite.
    ...(isCloudflare ? { database: { type: 'd1' as const, bindingName: 'DB' } } : {}),
  },

  routeRules: {
    '/': { prerender: true },
  },

  nitro: {
    ...(isCloudflare ? { preset: 'cloudflare_module' } : {}),
    prerender: {
      crawlLinks: false,
      routes: ['/', '/sitemap.xml'],
      failOnError: false,
    },
    storage: {
      // Gallery metadata: KV on Workers (binding "DATA" in wrangler.jsonc),
      // plain filesystem locally.
      data: isCloudflare
        ? { driver: 'cloudflare-kv-binding', binding: 'DATA' }
        : { driver: 'fs', base: './.data/storage' },
    },
    devStorage: {
      data: { driver: 'fs', base: './.data/storage' },
    },
  },

  typescript: {
    strict: true,
  },
})
