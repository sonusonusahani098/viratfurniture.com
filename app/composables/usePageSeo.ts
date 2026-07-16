interface BreadcrumbItem {
  name: string
  path?: string
}

interface PageSeoOptions {
  title: string
  description: string
  path: string
  ogTitle?: string
  ogDescription?: string
  breadcrumbs?: BreadcrumbItem[]
}

const SITE_URL = 'https://viratfurniture.com'

export function usePageSeo(opts: PageSeoOptions) {
  const canonical = `${SITE_URL}${opts.path}`

  useSeoMeta({
    title: opts.title,
    description: opts.description,
    ogTitle: opts.ogTitle || opts.title,
    ogDescription: opts.ogDescription || opts.description,
    ogType: 'website',
    ogUrl: canonical,
    twitterCard: 'summary_large_image',
    robots: 'index, follow',
  })

  useHead({
    link: [{ rel: 'canonical', href: canonical }],
  })

  defineOgImage('Default', {
    title: opts.ogTitle || opts.title,
  })

  if (opts.breadcrumbs?.length) {
    const items = [{ name: 'Home', path: '/' }, ...opts.breadcrumbs]
    useSchemaOrg([
      defineBreadcrumb({
        itemListElement: items.map((item) => ({
          name: item.name,
          item: item.path ? `${SITE_URL}${item.path}` : undefined,
        })),
      }),
    ])
  }

  return { canonical }
}
