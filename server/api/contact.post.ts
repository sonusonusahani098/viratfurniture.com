export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, phone, email, location, service, message } = body || {}

  if (!name || !phone || !location) {
    throw createError({ statusCode: 400, statusMessage: 'Name, phone and location are required.' })
  }

  if (!/^[0-9+\-\s()]{7,15}$/.test(phone)) {
    throw createError({ statusCode: 400, statusMessage: 'Please enter a valid phone number.' })
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Please enter a valid email address.' })
  }

  // Email/CRM delivery is not wired up yet — no SMTP or CRM credentials exist for this
  // project. Submissions are logged server-side until a provider is connected.
  console.log('[contact-form]', { name, phone, email, location, service, message, at: new Date().toISOString() })

  return { success: true }
})
