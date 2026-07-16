<script setup lang="ts">
import { business } from '~/utils/site-data'

usePageSeo({
  title: 'Terms & Conditions | Virat Furniture',
  description: 'Terms and conditions for using the Virat Furniture website and requesting furniture manufacturing, repair and installation services.',
  path: '/terms',
  breadcrumbs: [{ name: 'Terms' }],
})
</script>

<template>
  <div>
    <section class="border-b border-surface-300 bg-surface-100 py-6">
      <div class="container-px mx-auto">
        <Breadcrumbs :items="[{ name: 'Terms' }]" />
      </div>
    </section>

    <section class="section-py">
      <div class="container-px mx-auto max-w-3xl">
        <p class="eyebrow">Legal</p>
        <h1 class="mt-5 font-display text-4xl font-bold text-royal-900">Terms &amp; Conditions</h1>
        <p class="mt-4 text-sm text-royal-500">Last updated: July 2026</p>

        <div class="prose-content mt-10 max-w-none">
          <p>These Terms & Conditions govern your use of viratfurniture.com and any enquiry or service request made through it. By using this website, you agree to the terms below.</p>

          <h2>Website Content</h2>
          <p>Content on this website — including service descriptions, area pages and blog articles — is provided for general information. While we keep it accurate and up to date, specific pricing, timelines and material availability are confirmed individually for each project after a site visit.</p>

          <h2>Estimates and Quotations</h2>
          <p>Any estimate provided through the website, phone or WhatsApp before a site visit is indicative only. Final pricing is confirmed in writing after measurement, design and material selection, and work begins only after you approve that quotation.</p>

          <h2>Service Engagement</h2>
          <p>Placing an enquiry through this website does not create a binding service agreement. A project is confirmed only once both parties agree on design, cost and timeline, typically documented in a written quotation or order confirmation.</p>

          <h2>Intellectual Property</h2>
          <p>Text, images and design elements on this website belong to Virat Furniture unless otherwise credited, and may not be reproduced for commercial use without permission.</p>

          <h2>Limitation of Liability</h2>
          <p>We aim to keep this website accurate and available at all times, but we don't guarantee uninterrupted access and aren't liable for losses arising from temporary unavailability or errors in general website content.</p>

          <h2>Governing Law</h2>
          <p>These terms are governed by the laws of India, with courts in Surat, Gujarat having jurisdiction over any disputes.</p>

          <h2>Changes to These Terms</h2>
          <p>We may update these terms from time to time. Continued use of the website after changes are posted constitutes acceptance of the revised terms.</p>

          <h2>Contact Us</h2>
          <p>
            Questions about these terms can be sent to
            <a :href="`mailto:${business.email}`">{{ business.email }}</a> or {{ business.phone }}.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
