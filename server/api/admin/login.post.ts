export default defineEventHandler(async (event) => {
  const body = await readBody<{ password?: string }>(event)
  const { adminPassword } = useRuntimeConfig()

  if (!adminPassword) {
    throw createError({ statusCode: 503, statusMessage: 'Admin is not configured. Set NUXT_ADMIN_PASSWORD in .env.' })
  }
  if (!body?.password || body.password !== adminPassword) {
    throw createError({ statusCode: 401, statusMessage: 'Incorrect password' })
  }

  startAdminSession(event)
  return { ok: true }
})
