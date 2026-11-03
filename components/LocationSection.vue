<script setup>
import { useContent } from '~/composables/useContent';

const { content } = useContent();
</script>

<template>
  <section class="location-section py-[90px] max-[680px]:py-[78px] scroll-mt-20" id="lokasi">
    <div class="container">
      <div class="location-card grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] bg-[var(--paper-deep)] border border-[var(--line)] rounded-[22px] overflow-hidden reveal">
        <!-- Copy Kiri -->
        <div class="location-copy p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
          <span class="eyebrow mb-4 text-[var(--green)]">{{ content.locationSection.eyebrow }}</span>
          <h2
            class="serif text-3xl sm:text-4xl lg:text-[44px] leading-tight text-[var(--ink)] mb-4"
            v-html="content.locationSection.titleHtml || content.locationSection.title"
          />
          <p class="text-xs sm:text-sm text-[var(--muted)] leading-relaxed mb-6 max-w-[420px]">
            {{ content.locationSection.desc }}
          </p>
          <div class="location-points space-y-3 mb-8 text-xs sm:text-sm text-[var(--ink)] font-medium">
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--green)]/10 text-[var(--green)] flex items-center justify-center text-sm font-semibold" aria-hidden="true">⌖</span>
              <span class="pt-0.5">{{ content.locationSection.address }}</span>
            </div>
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--green)]/10 text-[var(--green)] flex items-center justify-center text-sm font-semibold" aria-hidden="true">↗</span>
              <span class="pt-0.5">Jadwalkan survei lokasi bersama tim</span>
            </div>
          </div>
          <div class="flex flex-wrap items-center gap-3">
            <a
              :href="content.locationSection.mapUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-primary"
            >
              {{ content.locationSection.primaryCta }} <span class="arrow">↗</span>
            </a>
            <a href="#kontak" class="btn btn-outline">
              {{ content.locationSection.secondaryCta }}
            </a>
          </div>
        </div>

        <!-- Peta Kanan -->
        <div class="map-wrap min-h-[340px] lg:min-h-full w-full relative bg-[#e5e9dc] overflow-hidden">
          <iframe
            :src="content.locationSection.embedMapUrl"
            class="w-full h-full min-h-[340px] border-0"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            :title="`Peta Lokasi ${content.meta.projectName}`"
          ></iframe>

          <!-- Subtle Editorial Caption Badge -->
          <div class="pointer-events-none absolute left-4 bottom-4 sm:left-6 sm:bottom-6 px-3.5 py-2.5 rounded-lg bg-[var(--white)]/90 backdrop-blur-sm border border-[var(--line)] shadow-sm text-[var(--green-deep)] text-[10px] font-bold tracking-wider">
            <span>{{ content.meta.projectName.toUpperCase() }}</span>
            <span class="block mt-0.5 text-[9px] font-normal text-[var(--muted)]">Mangunjaya · Arjasari</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
