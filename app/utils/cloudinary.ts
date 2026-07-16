export interface GalleryItem {
  publicId: string
  title: string
  category: string
  area?: string
  alt: string
  width: number
  height: number
  format: string
  secureUrl: string
  createdAt: string
}

/**
 * Delivery URL with automatic best format (avif/webp) and quality.
 * Falls back to the stored secure_url when the public cloud name is missing.
 */
export function cldUrl(item: GalleryItem, width = 800) {
  const cloudName = useRuntimeConfig().public.cloudinaryCloudName
  if (!cloudName) return item.secureUrl
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,c_limit,w_${width}/${item.publicId}`
}

export function cldSrcset(item: GalleryItem, widths = [480, 768, 1200]) {
  const cloudName = useRuntimeConfig().public.cloudinaryCloudName
  if (!cloudName) return undefined
  return widths.map((w) => `${cldUrl(item, w)} ${w}w`).join(', ')
}
