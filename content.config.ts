import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
})

const seoSchema = z.object({
  title: z.string(),
  metaDescription: z.string(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().optional(),
})

export default defineContentConfig({
  collections: {
    services: defineCollection({
      type: 'page',
      source: 'services/*.md',
      schema: z.object({
        seo: seoSchema,
        heroImage: z.string(),
        heroImageAlt: z.string(),
        shortDescription: z.string(),
        relatedServices: z.array(z.string()).default([]),
        relatedAreas: z.array(z.string()).default([]),
        faqs: z.array(faqSchema).default([]),
      }),
    }),
    areas: defineCollection({
      type: 'page',
      source: 'areas/*.md',
      schema: z.object({
        seo: seoSchema,
        heroImage: z.string(),
        heroImageAlt: z.string(),
        shortDescription: z.string(),
        landmarks: z.array(z.string()).default([]),
        relatedServices: z.array(z.string()).default([]),
        relatedAreas: z.array(z.string()).default([]),
        faqs: z.array(faqSchema).default([]),
      }),
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        seo: seoSchema,
        heroImage: z.string(),
        heroImageAlt: z.string(),
        shortDescription: z.string(),
        category: z.string(),
        author: z.string().default('Virat Furniture Team'),
        publishedAt: z.string(),
        readingTime: z.string().optional(),
        relatedServices: z.array(z.string()).default([]),
        relatedAreas: z.array(z.string()).default([]),
      }),
    }),
  },
})
