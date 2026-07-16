export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const body = await readBody<{ publicId?: string }>(event)
  if (!body?.publicId) throw createError({ statusCode: 400, statusMessage: 'publicId is required' })

  const items = await getGalleryItems()
  const item = items.find((i) => i.publicId === body.publicId)
  if (!item) throw createError({ statusCode: 404, statusMessage: 'Gallery item not found' })

  if (cloudinaryConfigured()) {
    await cloudinaryDestroy(item.publicId)
  }

  await saveGalleryItems(items.filter((i) => i.publicId !== body.publicId))
  return { ok: true }
})
