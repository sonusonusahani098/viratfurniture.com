export interface GalleryItem {
  /** Cloudinary public_id — also the stable id of the item */
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

const KEY = 'gallery-items.json'

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const items = await useStorage('data').getItem<GalleryItem[]>(KEY)
  return Array.isArray(items) ? items : []
}

export async function saveGalleryItems(items: GalleryItem[]) {
  await useStorage('data').setItem(KEY, items)
}
