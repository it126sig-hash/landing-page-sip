<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { useContent } from '~/composables/useContent';
import { useLightbox } from '~/composables/useLightbox';

const props = defineProps({
  type: { type: Object, default: null },
});
const emit = defineEmits(['close']);

const dialogRef = ref(null);
const activeSlideIndex = ref(0);
const { wa } = useContent();
const { openGallery } = useLightbox();

/**
 * Slide visual terpadu:
 * 1. Fasad dari type.facades (Tampak Depan, Perspektif, dll)
 * 2. Denah dari type.gallery[0]
 */
const slides = computed(() => {
  if (!props.type) return [];
  const list = [];

  if (props.type.facades && props.type.facades.length > 0) {
    props.type.facades.forEach((f, idx) => {
      list.push({
        id: `facade-${idx}`,
        label: f.label || (idx === 0 ? 'Tampak Depan' : `Perspektif ${idx}`),
        src: f.src,
        isPlan: false,
      });
    });
  } else if (props.type.gallery?.[1]) {
    list.push({
      id: 'facade-0',
      label: 'Perspektif',
      src: props.type.gallery[1],
      isPlan: false,
    });
  }

  if (props.type.gallery?.[0]) {
    list.push({
      id: 'denah',
      label: 'Denah',
      src: props.type.gallery[0],
      isPlan: true,
    });
  }

  return list;
});

const activeSlide = computed(() => {
  if (!slides.value.length) return null;
  return slides.value[activeSlideIndex.value] || slides.value[0];
});

function setActiveSlide(index) {
  if (index >= 0 && index < slides.value.length) {
    activeSlideIndex.value = index;
  }
}

function stepSlide(delta) {
  if (!slides.value.length) return;
  const n = slides.value.length;
  activeSlideIndex.value = (activeSlideIndex.value + delta + n) % n;
}

function openLightboxFromStage() {
  if (!slides.value.length || !props.type) return;
  openGallery(
    slides.value.map(s => ({
      src: s.src,
      alt: `${s.label} ${props.type.name}`,
    })),
    activeSlideIndex.value
  );
}

const waLink = computed(() => {
  if (!props.type) return '#';
  return wa('type', { type: props.type.name });
});

/**
 * Definisi 9 Spesifikasi Teknis Standar dengan Fallback
 */
const defaultSpecsDefinition = [
  { key: 'pondasi', label: 'Pondasi', defaultVal: 'Batu Kali' },
  { key: 'struktur', label: 'Struktur', defaultVal: 'Beton Bertulang' },
  { key: 'dinding', label: 'Dinding', defaultVal: 'Bata Hebel / Ringan' },
  { key: 'lantai', label: 'Lantai', defaultVal: 'Keramik 40x40' },
  { key: 'atap', label: 'Atap', defaultVal: 'Baja Ringan / Genteng Beton' },
  { key: 'kusen', label: 'Kusen', defaultVal: 'Aluminium' },
  { key: 'pintu', label: 'Pintu', defaultVal: 'Kayu Panel / Engineering Door' },
  { key: 'listrik', label: 'Listrik', defaultVal: '1300 VA' },
  { key: 'air', label: 'Air', defaultVal: 'PAM / Sumur Bor' },
];

const normalizedSpecs = computed(() => {
  if (!props.type) return [];
  const rawSpecs = props.type.specs || [];
  const overrides = new Map(
    rawSpecs.map(s => [s.label.toLowerCase().trim(), s.value])
  );
  const isSubsidi = (props.type.tag || '').toLowerCase().includes('subsidi') ||
                    (props.type.category || '').toLowerCase().includes('subsidi');

  return defaultSpecsDefinition.map(item => {
    let value = overrides.get(item.label.toLowerCase().trim());
    if (!value) {
      if (item.key === 'listrik') {
        value = isSubsidi ? '900 VA' : '1300 VA';
      } else {
        value = item.defaultVal;
      }
    }
    return {
      key: item.key,
      label: item.label,
      value,
    };
  });
});

function onKeydown(e) {
  if (!props.type) return;
  if (e.key === 'Escape') {
    emit('close');
  } else if (e.key === 'ArrowLeft') {
    stepSlide(-1);
  } else if (e.key === 'ArrowRight') {
    stepSlide(1);
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown);
  if (typeof document !== 'undefined') {
    document.body.style.overflow = '';
  }
});

watch(() => props.type, (t) => {
  activeSlideIndex.value = 0;
  if (t) {
    nextTick(() => dialogRef.value?.focus());
  }
  if (typeof document !== 'undefined') {
    document.body.style.overflow = t ? 'hidden' : '';
  }
});
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="type"
      class="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-3 sm:p-4 backdrop-blur-sm"
      @click.self="emit('close')"
    >
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="scale-95 opacity-0"
        enter-to-class="scale-100 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="scale-100 opacity-100"
        leave-to-class="scale-95 opacity-0"
      >
        <div
          ref="dialogRef"
          role="dialog"
          aria-modal="true"
          :aria-label="type.name"
          tabindex="-1"
          class="relative flex flex-col w-full max-w-[700px] max-h-[94vh] rounded-[22px] bg-paper shadow-2xl overflow-hidden border border-line focus:outline-none"
        >
          <!-- 1. HEADER (Pinned Top, Single-line, shrink-0) -->
          <div class="flex items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-3.5 bg-white border-b border-line shrink-0">
            <h3 class="font-serif text-[22px] sm:text-[24px] font-bold text-ink whitespace-nowrap">
              {{ type.name }}
            </h3>

            <!-- 4 Chip Sage Ringkasan -->
            <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              <!-- Luas Bangunan -->
              <span class="inline-flex items-center gap-1.5 bg-sage-pale text-green-deep border border-line rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap shrink-0">
                <svg class="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                LB {{ type.lb }} m²
              </span>

              <!-- Luas Tanah -->
              <span class="inline-flex items-center gap-1.5 bg-sage-pale text-green-deep border border-line rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap shrink-0">
                <svg class="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <rect width="18" height="18" x="3" y="3" rx="2"/>
                  <path d="M3 9h18M9 21V9"/>
                </svg>
                LT {{ type.lt }} m²
              </span>

              <!-- Kamar Tidur -->
              <span class="inline-flex items-center gap-1.5 bg-sage-pale text-green-deep border border-line rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap shrink-0">
                <svg class="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"/>
                </svg>
                {{ type.kt }} KT
              </span>

              <!-- Kamar Mandi -->
              <span class="inline-flex items-center gap-1.5 bg-sage-pale text-green-deep border border-line rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap shrink-0">
                <svg class="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1Z"/>
                  <path d="M6 12V5a2 2 0 0 1 2-2h1"/>
                  <path d="m4 20 1-2m15 2-1-2"/>
                </svg>
                {{ type.km }} KM
              </span>
            </div>

            <!-- Tombol Tutup 32px -->
            <button
              type="button"
              aria-label="Tutup modal"
              class="h-8 w-8 rounded-full border border-line bg-white text-ink hover:border-green hover:bg-sage-pale hover:text-green-deep flex items-center justify-center transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green"
              @click="emit('close')"
            >
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- 2. BODY (Flex-1, Scrollable hanya bila layar sangat pendek) -->
          <div class="flex-1 overflow-y-auto overscroll-contain p-3 sm:p-4 space-y-2.5 bg-paper">
            <!-- Segmented Control Tabs (Tampak Depan / Perspektif / Denah) -->
            <div
              v-if="slides.length > 1"
              role="tablist"
              aria-label="Sudut pandang unit"
              class="bg-paper-deep/60 border border-line p-1 rounded-xl flex gap-1"
            >
              <button
                v-for="(slide, index) in slides"
                :key="slide.id"
                type="button"
                role="tab"
                :aria-selected="activeSlideIndex === index"
                class="flex-1 text-center font-body rounded-lg px-2.5 py-1.5 text-xs sm:text-[13px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green"
                :class="activeSlideIndex === index
                  ? 'bg-green font-semibold text-white shadow-sm'
                  : 'font-medium text-muted hover:text-ink'"
                @click="setActiveSlide(index)"
              >
                {{ slide.label }}
              </button>
            </div>

            <!-- Visual Stage (Single Stage) -->
            <div
              role="button"
              tabindex="0"
              :aria-label="`Perbesar ${activeSlide ? activeSlide.label : 'gambar'} ${type.name}`"
              class="h-[220px] sm:h-[280px] rounded-xl border border-line bg-white relative overflow-hidden flex items-center justify-center cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green"
              @click="openLightboxFromStage"
              @keydown.enter.prevent="openLightboxFromStage"
              @keydown.space.prevent="openLightboxFromStage"
            >
              <!-- Gambar aktif -->
              <img
                v-if="activeSlide"
                :key="activeSlide.src"
                :src="activeSlide.src"
                :alt="`${activeSlide.label} ${type.name}`"
                loading="lazy"
                :class="activeSlide.isPlan ? 'object-contain w-full h-full p-2 bg-white' : 'object-cover w-full h-full'"
              />

              <!-- Caption Pill (Kiri Atas) -->
              <span
                v-if="activeSlide"
                class="absolute left-3 top-3 bg-green-deep/85 text-white backdrop-blur-sm rounded-full px-2.5 py-0.5 text-xs font-semibold shadow-xs z-10 pointer-events-none"
              >
                {{ activeSlide.label }}
              </span>

              <!-- Icon Zoom Hint (Kiri Bawah saat hover) -->
              <span
                class="absolute bottom-3 left-3 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white/90 text-green-deep opacity-0 shadow-sm ring-1 ring-line transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 z-10 pointer-events-none"
                aria-hidden="true"
              >
                <svg class="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5M11 8v6M8 11h6" />
                </svg>
              </span>

              <!-- Navigasi Panah (Kanan Bawah) -->
              <div
                v-if="slides.length > 1"
                class="absolute bottom-3 right-3 flex items-center gap-1.5 z-10"
                @click.stop
              >
                <button
                  type="button"
                  aria-label="Slide sebelumnya"
                  class="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-green-deep/80 text-white backdrop-blur-sm hover:bg-green-deep flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green"
                  @click.stop="stepSlide(-1)"
                >
                  <svg class="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Slide berikutnya"
                  class="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-green-deep/80 text-white backdrop-blur-sm hover:bg-green-deep flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green"
                  @click.stop="stepSlide(1)"
                >
                  <svg class="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Panel Spesifikasi Berbingkai (Single Bordered Panel) -->
            <div class="rounded-xl border border-line bg-white p-3 sm:p-3.5 shadow-xs">
              <div class="grid grid-cols-2 min-[520px]:grid-cols-3 gap-x-3 gap-y-2.5">
                <div
                  v-for="item in normalizedSpecs"
                  :key="item.key"
                  class="flex items-start gap-2 min-w-0 last:col-span-2 min-[520px]:last:col-span-1"
                >
                  <!-- 1. Pondasi -->
                  <svg v-if="item.key === 'pondasi'" class="h-[18px] w-[18px] text-green shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M3 21h18M4 16h16M6 11h12M9 6h6"/>
                  </svg>

                  <!-- 2. Struktur -->
                  <svg v-else-if="item.key === 'struktur'" class="h-[18px] w-[18px] text-green shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M9 3v18M15 3v18M5 9h14M5 15h14"/>
                  </svg>

                  <!-- 3. Dinding -->
                  <svg v-else-if="item.key === 'dinding'" class="h-[18px] w-[18px] text-green shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <path d="M3 9h18M3 15h18M8 3v6M16 3v6M12 9v6M8 15v6M16 15v6"/>
                  </svg>

                  <!-- 4. Lantai -->
                  <svg v-else-if="item.key === 'lantai'" class="h-[18px] w-[18px] text-green shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <path d="M3 12h18M12 3v18"/>
                  </svg>

                  <!-- 5. Atap -->
                  <svg v-else-if="item.key === 'atap'" class="h-[18px] w-[18px] text-green shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="m2 13 10-9 10 9M4 11.2V20a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8.8"/>
                  </svg>

                  <!-- 6. Kusen -->
                  <svg v-else-if="item.key === 'kusen'" class="h-[18px] w-[18px] text-green shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <path d="M12 3v18M3 12h18"/>
                    <rect x="5.5" y="5.5" width="4.5" height="4.5"/>
                    <rect x="14" y="5.5" width="4.5" height="4.5"/>
                    <rect x="5.5" y="14" width="4.5" height="4.5"/>
                    <rect x="14" y="14" width="4.5" height="4.5"/>
                  </svg>

                  <!-- 7. Pintu -->
                  <svg v-else-if="item.key === 'pintu'" class="h-[18px] w-[18px] text-green shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M4 21h16M5 21V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v17"/>
                    <circle cx="15.5" cy="12.5" r="1" fill="currentColor"/>
                  </svg>

                  <!-- 8. Listrik -->
                  <svg v-else-if="item.key === 'listrik'" class="h-[18px] w-[18px] text-green shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>

                  <!-- 9. Air -->
                  <svg v-else-if="item.key === 'air'" class="h-[18px] w-[18px] text-green shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                  </svg>

                  <!-- Fallback icon -->
                  <svg v-else class="h-[18px] w-[18px] text-green shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="9"/>
                    <path d="M12 8v8M8 12h8"/>
                  </svg>

                  <div class="min-w-0 flex-1">
                    <p class="font-body uppercase text-[11px] font-semibold text-muted tracking-wider leading-tight">
                      {{ item.label }}
                    </p>
                    <p
                      class="font-body text-[13px] font-bold text-ink truncate leading-tight mt-0.5"
                      :title="item.value"
                    >
                      {{ item.value }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 3. FOOTER (Pinned Bottom, shrink-0) -->
          <div class="px-4 py-2.5 sm:px-5 sm:py-3 bg-white border-t border-line shrink-0 flex flex-col min-[520px]:flex-row items-center justify-between gap-2.5">
            <a
              :href="waLink"
              target="_blank"
              rel="noopener"
              class="w-full min-[520px]:w-auto inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[13.5px] font-semibold text-white bg-[#25D366] hover:bg-[#20ba5a] shadow-md transition-all active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green"
            >
              <svg class="h-4 w-4 shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span>Tanya unit ini</span>
              <svg class="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

            <p class="font-body text-muted text-xs font-normal leading-tight text-center min-[520px]:text-right">
              *Konsumen tidak dapat merubah/merenovasi bangunan sebelum proses serah terima unit.
            </p>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
