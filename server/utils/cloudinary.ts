import { createHash } from 'node:crypto'

interface CloudinaryUploadResult {
  public_id: string
  secure_url: string
  width: number
  height: number
  format: string
}

export function cloudinaryConfigured(): boolean {
  const { cloudinary } = useRuntimeConfig()
  return Boolean(cloudinary.cloudName && cloudinary.apiKey && cloudinary.apiSecret)
}

/** Cloudinary request signature: sha1 over alphabetically sorted params + api_secret. */
function sign(params: Record<string, string>, apiSecret: string) {
  const toSign = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join('&')
  return createHash('sha1').update(toSign + apiSecret).digest('hex')
}

export async function cloudinaryUpload(opts: {
  buffer: Buffer
  mimeType: string
  publicId: string
  alt: string
  caption: string
  tags: string[]
}): Promise<CloudinaryUploadResult> {
  const { cloudinary } = useRuntimeConfig()
  const timestamp = String(Math.floor(Date.now() / 1000))

  const params: Record<string, string> = {
    context: `alt=${opts.alt}|caption=${opts.caption}`,
    folder: cloudinary.folder,
    public_id: opts.publicId,
    tags: opts.tags.join(','),
    timestamp,
  }

  const form = new FormData()
  form.append('file', new Blob([opts.buffer], { type: opts.mimeType }))
  for (const [k, v] of Object.entries(params)) form.append(k, v)
  form.append('api_key', cloudinary.apiKey)
  form.append('signature', sign(params, cloudinary.apiSecret))

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudinary.cloudName}/image/upload`, {
    method: 'POST',
    body: form,
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw createError({ statusCode: 502, statusMessage: `Cloudinary upload failed (${res.status}): ${detail.slice(0, 300)}` })
  }
  return (await res.json()) as CloudinaryUploadResult
}

export async function cloudinaryDestroy(publicId: string) {
  const { cloudinary } = useRuntimeConfig()
  const timestamp = String(Math.floor(Date.now() / 1000))
  const params: Record<string, string> = { public_id: publicId, timestamp }

  const form = new FormData()
  form.append('public_id', publicId)
  form.append('timestamp', timestamp)
  form.append('api_key', cloudinary.apiKey)
  form.append('signature', sign(params, cloudinary.apiSecret))

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudinary.cloudName}/image/destroy`, {
    method: 'POST',
    body: form,
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw createError({ statusCode: 502, statusMessage: `Cloudinary delete failed (${res.status}): ${detail.slice(0, 300)}` })
  }
  return await res.json()
}
