import { galleryCategories } from '~~/app/utils/site-data'

const MAX_BYTES = 10 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/heic']

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  if (!cloudinaryConfigured()) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Cloudinary is not configured. Add NUXT_CLOUDINARY_* keys to .env and restart.',
    })
  }

  const parts = await readMultipartFormData(event)
  if (!parts?.length) throw createError({ statusCode: 400, statusMessage: 'No form data received' })

  const fields: Record<string, string> = {}
  let file: { data: Buffer; type?: string; filename?: string } | undefined

  for (const part of parts) {
    if (part.name === 'file' && part.filename) file = part
    else if (part.name) fields[part.name] = part.data.toString('utf8')
  }

  const title = (fields.title || '').trim()
  const category = (fields.category || '').trim()
  const area = (fields.area || '').trim()

  if (!file) throw createError({ statusCode: 400, statusMessage: 'Image file is required' })
  if (!title || title.length < 3) throw createError({ statusCode: 400, statusMessage: 'Title is required (min 3 characters)' })
  if (!galleryCategories.includes(category)) throw createError({ statusCode: 400, statusMessage: 'Choose a valid category' })
  if (file.data.length > MAX_BYTES) throw createError({ statusCode: 413, statusMessage: 'Image too large (max 10 MB)' })
  if (!file.type || !ALLOWED_TYPES.includes(file.type)) {
    throw createError({ statusCode: 415, statusMessage: 'Unsupported file type — use JPG, PNG, WEBP, AVIF or HEIC' })
  }

  // SEO-friendly public id, e.g. "sliding-wardrobe-vesu-m3k2xa"
  const publicId = `${slugify([title, area].filter(Boolean).join(' '))}-${Date.now().toString(36)}`
  const alt = [title, '—', category, 'by Virat Furniture, Surat', area ? `(${area})` : '']
    .filter(Boolean)
    .join(' ')
    .replace(' — ', ' — ')

  const uploaded = await cloudinaryUpload({
    buffer: file.data,
    mimeType: file.type,
    publicId,
    alt,
    caption: title,
    tags: ['virat-furniture', category, area].filter(Boolean),
  })

  const item = {
    publicId: uploaded.public_id,
    title,
    category,
    area: area || undefined,
    alt,
    width: uploaded.width,
    height: uploaded.height,
    format: uploaded.format,
    secureUrl: uploaded.secure_url,
    createdAt: new Date().toISOString(),
  }

  const items = await getGalleryItems()
  items.push(item)
  await saveGalleryItems(items)

  return item
})
