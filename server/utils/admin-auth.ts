import { createHmac } from 'node:crypto'
import type { H3Event } from 'h3'

const COOKIE = 'vf_admin_session'

function sessionToken(password: string) {
  return createHmac('sha256', 'virat-furniture-admin-v1').update(password).digest('hex')
}

export function adminConfigured(): boolean {
  return Boolean(useRuntimeConfig().adminPassword)
}

export function startAdminSession(event: H3Event) {
  const { adminPassword } = useRuntimeConfig()
  setCookie(event, COOKIE, sessionToken(adminPassword), {
    httpOnly: true,
    sameSite: 'lax',
    secure: !import.meta.dev,
    maxAge: 60 * 60 * 8,
    path: '/',
  })
}

export function endAdminSession(event: H3Event) {
  deleteCookie(event, COOKIE, { path: '/' })
}

export function isAdmin(event: H3Event): boolean {
  const { adminPassword } = useRuntimeConfig()
  if (!adminPassword) return false
  const cookie = getCookie(event, COOKIE)
  return Boolean(cookie) && cookie === sessionToken(adminPassword)
}

export function requireAdmin(event: H3Event) {
  if (!isAdmin(event)) {
    throw createError({ statusCode: 401, statusMessage: 'Admin session required' })
  }
}
