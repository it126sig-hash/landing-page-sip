<script setup>
import { ref } from 'vue';
import { useContent } from '~/composables/useContent';

const { content, wa } = useContent();

// Item pertama 'f1' default terbuka sesuai arahan editorial
const openFaqId = ref('f1');

function toggle(id) {
  openFaqId.value = openFaqId.value === id ? null : id;
}

const consultasiLink = wa('konsultasi');
</script>

<template>
  <section id="faq" class="scroll-mt-20 relative bg-[var(--white)] py-[105px] max-[680px]:py-[76px]">
    <div class="container faq-grid grid grid-cols-1 lg:grid-cols-[0.72fr_1.28fr] gap-10 lg:gap-[95px] items-start">
      <!-- Kiri: Intro Sticky -->
      <div class="faq-intro reveal lg:sticky lg:top-28">
        <span class="eyebrow mb-4 block">{{ content.faqSection.eyebrow }}</span>
        <h2
          class="serif text-3xl sm:text-4xl lg:text-[52px] leading-tight text-[var(--ink)] mb-4"
          v-html="content.faqSection.titleHtml || content.faqSection.title"
        />
        <p class="text-xs sm:text-sm text-[var(--muted)] leading-relaxed mb-6 max-w-[320px]">
          {{ content.faqSection.subtitle }}
        </p>
        <a
          :href="consultasiLink"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-outline text-xs"
        >
          {{ content.faqSection.ctaLabel }} <span class="arrow">↗</span>
        </a>
      </div>

      <!-- Kanan: Accordion List -->
      <div class="faq-list border-t border-[var(--line)] reveal">
        <FaqItem
          v-for="faq in content.faqs"
          :key="faq.id"
          :faq="faq"
          :open="openFaqId === faq.id"
          @toggle="toggle"
        />
      </div>
    </div>
  </section>
</template>
