export default defineEventHandler((event) => {
  return {
    configured: adminConfigured(),
    authenticated: isAdmin(event),
    cloudinaryConfigured: cloudinaryConfigured(),
  }
})
