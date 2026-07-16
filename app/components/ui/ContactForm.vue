<script setup lang="ts">
import { services } from '~/utils/site-data'

const form = reactive({
  name: '',
  phone: '',
  email: '',
  location: '',
  service: '',
  message: '',
})

const errors = reactive({ name: '', phone: '', email: '', location: '' })
const status = ref<'idle' | 'submitting' | 'success' | 'error'>('idle')
const errorMessage = ref('')

function validate() {
  errors.name = form.name.trim().length < 2 ? 'Please enter your name.' : ''
  errors.phone = /^[0-9+\-\s()]{7,15}$/.test(form.phone.trim()) ? '' : 'Please enter a valid phone number.'
  errors.email = form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) ? 'Please enter a valid email address.' : ''
  errors.location = form.location.trim().length < 2 ? 'Please tell us your area or address.' : ''
  return !errors.name && !errors.phone && !errors.email && !errors.location
}

async function onSubmit() {
  if (!validate()) return
  status.value = 'submitting'
  errorMessage.value = ''
  try {
    await $fetch('/api/contact', { method: 'POST', body: { ...form } })
    status.value = 'success'
  } catch (err: any) {
    status.value = 'error'
    errorMessage.value = err?.data?.statusMessage || 'Something went wrong. Please call or WhatsApp us instead.'
  }
}

function resetForm() {
  form.name = ''
  form.phone = ''
  form.email = ''
  form.location = ''
  form.service = ''
  form.message = ''
  status.value = 'idle'
}
</script>

<template>
  <div class="glass-card p-7 sm:p-9">
    <div v-if="status === 'success'" class="flex flex-col items-center py-10 text-center">
      <div class="flex h-16 w-16 items-center justify-center rounded-full bg-royal-600 text-white">
        <svg viewBox="0 0 24 24" class="h-8 w-8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
      </div>
      <h3 class="mt-5 font-display text-2xl font-semibold text-royal-900">Thank you, {{ form.name || 'there' }}!</h3>
      <p class="mt-2 max-w-sm text-royal-600">We've received your request and will get back to you within one business day. For anything urgent, please call us directly.</p>
      <button class="btn-outline mt-6" @click="resetForm">Send Another Request</button>
    </div>

    <form v-else class="space-y-5" novalidate @submit.prevent="onSubmit">
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label for="name" class="mb-1.5 block text-sm font-medium text-royal-800">Name *</label>
          <input id="name" v-model="form.name" type="text" placeholder="Your full name" class="w-full rounded-xl border border-surface-400 bg-white px-4 py-3 text-sm text-royal-900 outline-none transition focus:border-royal-500 focus:ring-2 focus:ring-royal-100">
          <p v-if="errors.name" class="mt-1.5 text-xs text-red-600">{{ errors.name }}</p>
        </div>
        <div>
          <label for="phone" class="mb-1.5 block text-sm font-medium text-royal-800">Phone *</label>
          <input id="phone" v-model="form.phone" type="tel" placeholder="98xxxxxxxx" class="w-full rounded-xl border border-surface-400 bg-white px-4 py-3 text-sm text-royal-900 outline-none transition focus:border-royal-500 focus:ring-2 focus:ring-royal-100">
          <p v-if="errors.phone" class="mt-1.5 text-xs text-red-600">{{ errors.phone }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label for="email" class="mb-1.5 block text-sm font-medium text-royal-800">Email</label>
          <input id="email" v-model="form.email" type="email" placeholder="you@example.com" class="w-full rounded-xl border border-surface-400 bg-white px-4 py-3 text-sm text-royal-900 outline-none transition focus:border-royal-500 focus:ring-2 focus:ring-royal-100">
          <p v-if="errors.email" class="mt-1.5 text-xs text-red-600">{{ errors.email }}</p>
        </div>
        <div>
          <label for="location" class="mb-1.5 block text-sm font-medium text-royal-800">Area / Address *</label>
          <input id="location" v-model="form.location" type="text" placeholder="e.g. Adajan, Surat" class="w-full rounded-xl border border-surface-400 bg-white px-4 py-3 text-sm text-royal-900 outline-none transition focus:border-royal-500 focus:ring-2 focus:ring-royal-100">
          <p v-if="errors.location" class="mt-1.5 text-xs text-red-600">{{ errors.location }}</p>
        </div>
      </div>

      <div>
        <label for="service" class="mb-1.5 block text-sm font-medium text-royal-800">Service Required</label>
        <select id="service" v-model="form.service" class="w-full rounded-xl border border-surface-400 bg-white px-4 py-3 text-sm text-royal-900 outline-none transition focus:border-royal-500 focus:ring-2 focus:ring-royal-100">
          <option value="">Select a service</option>
          <option v-for="s in services" :key="s.slug" :value="s.name">{{ s.name }}</option>
          <option value="Other">Other / Not Sure</option>
        </select>
      </div>

      <div>
        <label for="message" class="mb-1.5 block text-sm font-medium text-royal-800">Message</label>
        <textarea id="message" v-model="form.message" rows="4" placeholder="Tell us a bit about your project..." class="w-full rounded-xl border border-surface-400 bg-white px-4 py-3 text-sm text-royal-900 outline-none transition focus:border-royal-500 focus:ring-2 focus:ring-royal-100" />
      </div>

      <p v-if="status === 'error'" class="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{{ errorMessage }}</p>

      <button type="submit" class="btn-primary w-full" :disabled="status === 'submitting'">
        <span v-if="status === 'submitting'">Sending...</span>
        <span v-else>Send Request</span>
      </button>
      <p class="text-center text-xs text-royal-500">We typically respond within one business day.</p>
    </form>
  </div>
</template>
