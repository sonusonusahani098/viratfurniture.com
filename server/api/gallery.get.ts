export default defineEventHandler(async () => {
  const items = await getGalleryItems()
  return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
})
