<script setup lang="ts">
import { business } from '~/utils/site-data'

const faqs = [
  {
    question: 'Which areas in Surat do you serve?',
    answer: `We work across 31+ areas of Surat including Adajan, Vesu, Piplod, City Light, Palanpur, Althan, Varachha, Katargam and Rander. Our team travels to your site for measurement, delivery and installation regardless of which part of the city you're in.`,
  },
  {
    question: 'Do you provide a free estimate?',
    answer: 'Yes. Share your requirement by phone, WhatsApp or the contact form and we\'ll provide a free, no-obligation estimate after understanding your space and needs.',
  },
  {
    question: 'Do you work with builders and interior contractors on new projects?',
    answer: 'Yes, a significant part of our work is with builders and contractors on new construction — including furniture for 12, 15, 18 and 21-floor residential towers, show flats and bulk apartment fit-outs.',
  },
  {
    question: 'Can you repair existing furniture instead of replacing it?',
    answer: 'In most cases, yes. We repair and restore sofas, beds, wardrobes and cupboards — repolishing, fixing hardware, replacing damaged panels — so you don\'t always need to buy new furniture.',
  },
  {
    question: 'What materials do you use?',
    answer: 'We work with plywood, MDF and solid wood depending on the piece and budget, paired with branded hardware and fittings suited to Surat\'s humidity and daily use.',
  },
  {
    question: 'How long does a typical furniture project take?',
    answer: 'A single wardrobe or TV unit usually takes a few days to two weeks depending on design complexity. Full apartment or office fit-outs are scheduled around your timeline and confirmed upfront.',
  },
]
</script>

<template>
  <section class="relative section-py overflow-hidden bg-surface-200">
    <div class="pointer-events-none absolute inset-0 bg-grain" />
    <div class="container-px relative mx-auto grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
      <div class="reveal">
        <p class="kicker">FAQ</p>
        <h2 class="mt-6 font-display text-3xl font-bold text-royal-900 sm:text-[2.6rem] sm:leading-tight">
          Common questions, <em class="italic text-royal-600">answered</em>
        </h2>
        <p class="mt-5 text-[17px] text-royal-600">Can't find what you're looking for?</p>
        <div class="mt-6 flex flex-wrap gap-3">
          <a :href="`tel:${business.phoneRaw}`" class="btn-outline !py-3">Call Us</a>
          <NuxtLink to="/contact" class="btn-primary !py-3">Ask a Question</NuxtLink>
        </div>
      </div>
      <div class="reveal">
        <FaqAccordion :faqs="faqs" />
      </div>
    </div>
  </section>
</template>
