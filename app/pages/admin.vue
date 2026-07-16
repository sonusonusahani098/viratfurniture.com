<script setup lang="ts">
import { areas, galleryCategories } from '~/utils/site-data'
import { cldUrl, type GalleryItem } from '~/utils/cloudinary'

useSeoMeta({
  title: 'Gallery Admin — Virat Furniture',
  robots: 'noindex, nofollow',
})

interface SessionState {
  configured: boolean
  authenticated: boolean
  cloudinaryConfigured: boolean
}

// useState (not ref): written during SSR inside useAsyncData, so it must be
// payload-synced or the client would hydrate back to the initial value.
const session = useState<SessionState>('admin-session-state', () => ({ configured: false, authenticated: false, cloudinaryConfigured: false }))
const items = useState<GalleryItem[]>('admin-items', () => [])
const password = ref('')
const loginError = ref('')
const uploadError = ref('')
const uploadSuccess = ref('')
const busy = ref(false)

const form = reactive({
  title: '',
  category: galleryCategories[0],
  area: '',
  file: null as File | null,
})
const previewUrl = ref('')

async function refreshSession() {
  session.value = await $fetch<SessionState>('/api/admin/session')
  if (session.value.authenticated) {
    items.value = await $fetch<GalleryItem[]>('/api/gallery')
  }
}

await useAsyncData('admin-session', async () => {
  await refreshSession()
  return true
})

async function login() {
  loginError.value = ''
  busy.value = true
  try {
    await $fetch('/api/admin/login', { method: 'POST', body: { password: password.value } })
    password.value = ''
    await refreshSession()
  } catch (e: any) {
    loginError.value = e?.statusMessage || e?.data?.statusMessage || 'Login failed'
  } finally {
    busy.value = false
  }
}

async function logout() {
  await $fetch('/api/admin/logout', { method: 'POST' })
  await refreshSession()
}

function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0] || null
  form.file = file
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
  previewUrl.value = file ? URL.createObjectURL(file) : ''
}

async function upload() {
  uploadError.value = ''
  uploadSuccess.value = ''
  if (!form.file) {
    uploadError.value = 'Choose an image file first.'
    return
  }
  busy.value = true
  try {
    const fd = new FormData()
    fd.append('file', form.file)
    fd.append('title', form.title)
    fd.append('category', form.category)
    if (form.area) fd.append('area', form.area)
    const item = await $fetch<GalleryItem>('/api/admin/upload', { method: 'POST', body: fd })
    items.value = [item, ...items.value]
    uploadSuccess.value = `Uploaded "${item.title}" — live on the gallery now.`
    form.title = ''
    form.area = ''
    form.file = null
    if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = ''
    ;(document.getElementById('admin-file-input') as HTMLInputElement | null)?.value &&
      ((document.getElementById('admin-file-input') as HTMLInputElement).value = '')
  } catch (e: any) {
    uploadError.value = e?.statusMessage || e?.data?.statusMessage || 'Upload failed'
  } finally {
    busy.value = false
  }
}

async function removeItem(publicId: string, title: string) {
  if (!window.confirm(`Delete "${title}" from the gallery and Cloudinary?`)) return
  busy.value = true
  try {
    await $fetch('/api/admin/delete', { method: 'POST', body: { publicId } })
    items.value = items.value.filter((i) => i.publicId !== publicId)
  } catch (e: any) {
    uploadError.value = e?.statusMessage || 'Delete failed'
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <div class="min-h-[70vh] bg-surface-200 py-14">
    <div class="container-px mx-auto max-w-4xl">
      <p class="kicker">Admin</p>
      <h1 class="mt-5 font-display text-3xl font-bold text-royal-900">Gallery Manager</h1>

      <div v-if="!session.configured" class="mt-8 rounded-2xl border border-gold-300 bg-gold-50 p-7">
        <p class="font-display text-lg font-semibold text-royal-900">Admin is not configured yet</p>
        <p class="mt-2 text-sm leading-relaxed text-royal-700">
          Copy <code class="rounded bg-white px-1.5 py-0.5 text-xs">.env.example</code> to
          <code class="rounded bg-white px-1.5 py-0.5 text-xs">.env</code>, set
          <code class="rounded bg-white px-1.5 py-0.5 text-xs">NUXT_ADMIN_PASSWORD</code> and the
          <code class="rounded bg-white px-1.5 py-0.5 text-xs">NUXT_CLOUDINARY_*</code> keys, then restart the server.
        </p>
      </div>

      <form v-else-if="!session.authenticated" class="mt-8 max-w-sm rounded-2xl border border-surface-300 bg-white p-7 shadow-soft" @submit.prevent="login">
        <label for="admin-password" class="text-sm font-semibold text-royal-900">Admin password</label>
        <input
          id="admin-password"
          v-model="password"
          type="password"
          autocomplete="current-password"
          required
          class="mt-2 w-full rounded-xl border border-surface-400/70 px-4 py-3 text-sm outline-none transition focus:border-royal-500 focus:ring-2 focus:ring-royal-100"
        >
        <p v-if="loginError" class="mt-3 text-sm font-medium text-red-600">{{ loginError }}</p>
        <button type="submit" class="btn-primary mt-5 w-full" :disabled="busy">{{ busy ? 'Signing in…' : 'Sign In' }}</button>
      </form>

      <template v-else>
        <div class="mt-6 flex items-center justify-between">
          <p class="text-sm text-royal-600">{{ items.length }} photo{{ items.length === 1 ? '' : 's' }} live on the <NuxtLink to="/gallery" class="font-semibold text-royal-600 underline decoration-gold-400 decoration-2 underline-offset-2">gallery</NuxtLink></p>
          <button class="text-sm font-semibold text-royal-500 transition hover:text-royal-800" @click="logout">Sign out</button>
        </div>

        <div v-if="!session.cloudinaryConfigured" class="mt-6 rounded-2xl border border-gold-300 bg-gold-50 p-6 text-sm leading-relaxed text-royal-700">
          <strong class="text-royal-900">Cloudinary keys missing.</strong> Uploads are disabled until
          <code class="rounded bg-white px-1.5 py-0.5 text-xs">NUXT_CLOUDINARY_CLOUD_NAME / API_KEY / API_SECRET</code>
          (and <code class="rounded bg-white px-1.5 py-0.5 text-xs">NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME</code>) are set in <code class="rounded bg-white px-1.5 py-0.5 text-xs">.env</code>.
        </div>

        <form class="mt-6 rounded-2xl border border-surface-300 bg-white p-7 shadow-soft" @submit.prevent="upload">
          <p class="font-display text-lg font-semibold text-royal-900">Add a project photo</p>
          <p class="mt-1 text-xs text-royal-500">Images are converted to the best format automatically (AVIF/WebP) and get an SEO-friendly file name and alt text.</p>

          <div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div class="sm:col-span-2">
              <label for="admin-file-input" class="text-sm font-semibold text-royal-900">Photo</label>
              <div class="mt-2 flex items-center gap-4">
                <input
                  id="admin-file-input"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif,image/heic"
                  class="w-full rounded-xl border border-dashed border-surface-400 bg-surface-100 px-4 py-3 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-royal-600 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white"
                  @change="onFileChange"
                >
                <img v-if="previewUrl" :src="previewUrl" alt="Selected photo preview" class="h-16 w-16 rounded-xl border border-surface-300 object-cover">
              </div>
            </div>
            <div>
              <label for="admin-title" class="text-sm font-semibold text-royal-900">Title</label>
              <input
                id="admin-title"
                v-model="form.title"
                type="text"
                required
                minlength="3"
                placeholder="e.g. Sliding wardrobe in walnut laminate"
                class="mt-2 w-full rounded-xl border border-surface-400/70 px-4 py-3 text-sm outline-none transition focus:border-royal-500 focus:ring-2 focus:ring-royal-100"
              >
            </div>
            <div>
              <label for="admin-category" class="text-sm font-semibold text-royal-900">Category</label>
              <select
                id="admin-category"
                v-model="form.category"
                class="mt-2 w-full rounded-xl border border-surface-400/70 bg-white px-4 py-3 text-sm outline-none transition focus:border-royal-500 focus:ring-2 focus:ring-royal-100"
              >
                <option v-for="c in galleryCategories" :key="c" :value="c">{{ c }}</option>
              </select>
            </div>
            <div>
              <label for="admin-area" class="text-sm font-semibold text-royal-900">Area <span class="font-normal text-royal-400">(optional)</span></label>
              <select
                id="admin-area"
                v-model="form.area"
                class="mt-2 w-full rounded-xl border border-surface-400/70 bg-white px-4 py-3 text-sm outline-none transition focus:border-royal-500 focus:ring-2 focus:ring-royal-100"
              >
                <option value="">—</option>
                <option v-for="a in areas" :key="a.slug" :value="a.name">{{ a.name }}</option>
              </select>
            </div>
          </div>

          <p v-if="uploadError" class="mt-4 text-sm font-medium text-red-600">{{ uploadError }}</p>
          <p v-if="uploadSuccess" class="mt-4 text-sm font-medium text-green-700">{{ uploadSuccess }}</p>

          <button type="submit" class="btn-gold mt-6" :disabled="busy || !session.cloudinaryConfigured">
            {{ busy ? 'Uploading…' : 'Upload to Gallery' }}
          </button>
        </form>

        <div v-if="items.length" class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <div v-for="item in items" :key="item.publicId" class="group relative overflow-hidden rounded-xl border border-surface-300 bg-white">
            <img :src="cldUrl(item, 320)" :alt="item.alt" class="aspect-square w-full object-cover" loading="lazy">
            <div class="p-3">
              <p class="truncate text-xs font-semibold text-royal-900">{{ item.title }}</p>
              <p class="mt-0.5 text-[10px] uppercase tracking-wide text-royal-500">{{ item.category }}</p>
            </div>
            <button
              class="absolute right-2 top-2 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-red-600 opacity-0 shadow-soft transition group-hover:opacity-100"
              :disabled="busy"
              @click="removeItem(item.publicId, item.title)"
            >
              Delete
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
