<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useContent } from '~/composables/useContent';

const { content, withBase } = useContent();

// Origin dinormalkan tanpa trailing slash, lalu URL absolut dirakit dari path
// yang selalu diawali '/'. Dinormalkan di sini supaya benar di root maupun sub-folder.
const origin = useRuntimeConfig().public.siteUrl.replace(/\/+$/, '');
const absoluteUrl = (path) => origin + path;
const pageUrl = absoluteUrl(withBase('/'));
const ogImage = absoluteUrl(content.hero.image || withBase('/assets/images/palastri/hero.jpg'));

const title = 'Sanggar Indah Palastri — Rumah untuk Cerita Baru';
const description = 'Temukan hunian yang nyaman untuk memulai cerita baru bersama Sanggar Indah Palastri.';

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogUrl: pageUrl,
  ogImage,
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: ogImage,
});
useHead({
  link: [{ rel: 'canonical', href: pageUrl }],
});

let revealObserver = null;

onMounted(() => {
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length > 0) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach((el) => revealObserver.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }
});

onUnmounted(() => {
  if (revealObserver) {
    revealObserver.disconnect();
    revealObserver = null;
  }
});
</script>

<template>
  <div>
    <!-- Section Container 1 Layar Penuh di Desktop & Tablet Landscape (lg) -->
    <div class="lg:h-screen lg:max-h-[100dvh] lg:flex lg:flex-col lg:justify-between lg:overflow-hidden">
      <TheHeader class="lg:flex-shrink-0" />
      <main class="lg:flex-1 lg:min-h-0 lg:flex lg:flex-col lg:justify-between">
        <HeroSection class="lg:flex-1 lg:min-h-0" />
        <div class="lg:flex-shrink-0">
          <TrustStrip />
          <KprPartnerStrip />
        </div>
      </main>
    </div>

    <!-- Section Lanjutan (Diakses dengan Scroll) -->
    <AboutSection />
    <ProductsSection />
    <WhySection />
    <FaqSection />
    <FinalCtaSection />
    <TheFooter />
  </div>
</template>
