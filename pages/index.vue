<script setup>
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
</script>

<template>
  <div>
    <TheHeader />
    <main>
      <!-- Hero + About Section Container: 1 screen on mobile/tablet (< lg), standard full hero on desktop (lg:) -->
      <div class="min-h-[calc(100vh-64px)] flex flex-col justify-between lg:min-h-0 lg:block">
        <HeroSection class="flex-1 lg:flex-none" />
        <KprPartnerStrip class="flex-shrink-0" />
        <AboutSection class="flex-shrink-0 lg:flex-none" />
      </div>
      <ProductsSection />
      <ReasonsCardsSection />
      <FaqSection />
      <FinalCtaSection />
    </main>
    <TheFooter />
  </div>
</template>
