<script setup lang="ts">
import { business } from '~/utils/site-data'

usePageSeo({
  title: 'Privacy Policy | Virat Furniture',
  description: 'How Virat Furniture collects, uses and protects information submitted through our website.',
  path: '/privacy-policy',
  breadcrumbs: [{ name: 'Privacy Policy' }],
})
</script>

<template>
  <div>
    <section class="border-b border-surface-300 bg-surface-100 py-6">
      <div class="container-px mx-auto">
        <Breadcrumbs :items="[{ name: 'Privacy Policy' }]" />
      </div>
    </section>

    <section class="section-py">
      <div class="container-px mx-auto max-w-3xl">
        <p class="eyebrow">Legal</p>
        <h1 class="mt-5 font-display text-4xl font-bold text-royal-900">Privacy Policy</h1>
        <p class="mt-4 text-sm text-royal-500">Last updated: July 2026</p>

        <div class="prose-content mt-10 max-w-none">
          <p>This Privacy Policy explains how Virat Furniture ("we", "us", "our") collects, uses and protects information you provide through viratfurniture.com.</p>

          <h2>Information We Collect</h2>
          <p>When you use our contact form, call, or message us on WhatsApp, we may collect:</p>
          <ul>
            <li>Your name, phone number and email address</li>
            <li>Your location or address, where provided</li>
            <li>Details of the service you're enquiring about and any message you send us</li>
          </ul>
          <p>We do not collect payment information through this website, and we do not require account creation to browse or contact us.</p>

          <h2>How We Use Your Information</h2>
          <p>Information submitted through our contact form is used solely to respond to your enquiry, provide estimates, and coordinate site visits or project work. We do not sell or rent your personal information to third parties.</p>

          <h2>Cookies and Analytics</h2>
          <p>Our website may use basic analytics tools to understand how visitors use the site, which helps us improve content and navigation. These tools may set cookies in your browser. You can disable cookies through your browser settings; this may affect some site functionality.</p>

          <h2>Third-Party Services</h2>
          <p>We use Google Maps to display our location and WhatsApp to enable direct messaging. These third-party services have their own privacy policies governing the information you share with them directly.</p>

          <h2>Data Retention</h2>
          <p>We retain enquiry information for as long as needed to respond to your request and maintain reasonable business records, after which it may be deleted.</p>

          <h2>Your Rights</h2>
          <p>You can request details of the information we hold about you, ask us to correct it, or ask us to delete it, by contacting us using the details below.</p>

          <h2>Contact Us</h2>
          <p>
            For any questions about this Privacy Policy, contact us at
            <a :href="`mailto:${business.email}`">{{ business.email }}</a> or call {{ business.phone }}.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
