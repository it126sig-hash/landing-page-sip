<script setup>
import { computed } from 'vue';
import { useContent } from '~/composables/useContent';

const { content } = useContent();

const currentYear = new Date().getFullYear();
const waMarketingLink = computed(() => `https://wa.me/${content.meta.whatsapp.number}`);
</script>

<template>
  <footer class="site-footer bg-[#26382E] text-[#f5f3e9] pt-14 pb-8 border-t border-white/10">
    <div class="container">
      <div class="footer-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.25fr_0.75fr_1fr] gap-10 lg:gap-16 pb-12">
        <!-- Kolom 1: Brand & Pengembang -->
        <div class="footer-brand flex flex-col justify-between">
          <div>
            <a href="#beranda" class="inline-flex items-center gap-3" aria-label="Sanggar Indah Palastri — Beranda">
              <span class="w-10 h-10 rounded-full bg-[#d9e1d3] text-[var(--green-deep)] flex items-center justify-center font-serif text-xl font-bold">
                P
              </span>
              <span class="flex flex-col">
                <strong class="font-serif text-lg text-white font-medium tracking-tight leading-tight">
                  {{ content.meta.projectName }}
                </strong>
                <small class="text-[10px] text-white/50 tracking-wide">
                  by {{ content.meta.developer }}
                </small>
              </span>
            </a>

            <p class="mt-4 text-xs text-white/60 leading-relaxed max-w-xs">
              {{ content.footer.desc }}
            </p>
          </div>

          <div class="group-lockup flex items-center gap-2.5 mt-6 pt-4 border-t border-white/10 text-xs text-white/60">
            <span>{{ content.footer.developedByLabel }}</span>
            <strong class="font-serif text-base text-white font-semibold tracking-wide">
              {{ content.footer.developerShort || 'SIG' }}.
            </strong>
          </div>
        </div>

        <!-- Kolom 2: Jelajahi -->
        <div class="footer-col">
          <h4 class="text-[10px] font-semibold uppercase tracking-widest text-[#e5e4d8] mb-5">
            Jelajahi
          </h4>
          <nav class="flex flex-col space-y-2.5">
            <a
              v-for="link in content.footer.quickLinks"
              :key="link.id"
              :href="`#${link.id}`"
              class="text-xs text-white/65 hover:text-white transition-colors"
            >
              {{ link.label }}
            </a>
          </nav>
        </div>

        <!-- Kolom 3: Kontak & Alamat -->
        <div class="footer-col space-y-4">
          <h4 class="text-[10px] font-semibold uppercase tracking-widest text-[#e5e4d8] mb-5">
            Kontak & Alamat
          </h4>

          <!-- WhatsApp -->
          <div>
            <a
              :href="waMarketingLink"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-xs text-emerald-300 hover:text-white transition-colors font-medium"
            >
              <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>{{ content.footer.phoneDisplay }}</span>
            </a>
          </div>

          <!-- Alamat Proyek -->
          <div>
            <strong class="block text-[11px] font-semibold text-white/90">
              {{ content.footer.mainAddress.label }}
            </strong>
            <p v-for="(line, i) in content.footer.mainAddress.lines" :key="i" class="text-xs text-white/60 leading-relaxed">
              {{ line }}
            </p>
          </div>

          <!-- Kantor Pusat -->
          <div>
            <strong class="block text-[11px] font-semibold text-white/90">
              {{ content.footer.secondAddress.label }}
            </strong>
            <p v-for="(line, i) in content.footer.secondAddress.lines" :key="i" class="text-xs text-white/60 leading-relaxed">
              {{ line }}
            </p>
          </div>

          <!-- Konsultasi Link -->
          <div class="pt-1">
            <a href="#kontak" class="inline-flex items-center gap-1.5 text-xs text-[#e2ddc5] hover:text-white transition-colors font-medium">
              Konsultasi & Jadwal Survei <span class="arrow">↗</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Bar Bawah -->
      <div class="footer-bottom flex flex-col sm:flex-row justify-between items-center gap-3 pt-5 border-t border-white/10 text-xs text-white/45">
        <span>© {{ currentYear }} {{ content.meta.projectName }}. All rights reserved.</span>
        <span>Bagian dari {{ content.meta.developer }}</span>
      </div>
    </div>
  </footer>
</template>
