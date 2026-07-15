import type { SitemapUrlInput } from '#sitemap/types'

export default defineSitemapEventHandler(async (event) => {
  const [services, areas, blog] = await Promise.all([
    queryCollection(event, 'services').select('path').all(),
    queryCollection(event, 'areas').select('path').all(),
    queryCollection(event, 'blog').select('path').all(),
  ])

  const urls: SitemapUrlInput[] = [
    ...services.map((s) => ({ loc: s.path })),
    ...areas.map((a) => ({ loc: a.path })),
    ...blog.map((b) => ({ loc: b.path })),
  ]

  return urls
})
