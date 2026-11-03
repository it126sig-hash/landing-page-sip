<script setup>
import { computed } from 'vue';
import { useContent } from '~/composables/useContent';
import { useLightbox } from '~/composables/useLightbox';

const props = defineProps({
  faq: { type: Object, required: true },
  open: { type: Boolean, default: false },
});
const emit = defineEmits(['toggle']);

const { content, withBase } = useContent();
const { openLightbox, openGallery } = useLightbox();

const awardItems = computed(() => (content.about?.awards || []).map(a => ({
  key: a.id,
  image: a.image,
  meta: a.year,
  title: a.title,
})));

function openAt(item) {
  const items = awardItems.value.map(a => ({ src: a.image, alt: `${a.meta} — ${a.title}` }));
  openGallery(items, awardItems.value.findIndex(a => a.key === item.key));
}

const parsedParagraphs = computed(() => {
  if (!props.faq.answer) return [];
  return props.faq.answer
    .split('\n\n')
    .filter(p => p.trim())
    .map(para => {
      const lines = para.split('\n');
      const isList = lines.some(l => l.startsWith('• '));
      if (isList) {
        return { type: 'list', items: lines.filter(l => l.trim()).map(l => l.replace(/^• /, '')) };
      }
      return { type: 'text', html: para.replace(/\n/g, '<br>') };
    });
});
</script>

<template>
  <div class="faq-item border-b border-[var(--line)]">
    <button
      type="button"
      :id="`faq-btn-${faq.id}`"
      :aria-expanded="open"
      :aria-controls="`faq-answer-${faq.id}`"
      class="faq-question w-full flex justify-between items-center gap-4 sm:gap-6 py-5 sm:py-[21px] text-left font-medium text-xs sm:text-sm text-[var(--ink)] hover:text-[var(--green)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green)]/20 cursor-pointer"
      @click="emit('toggle', faq.id)"
    >
      <span class="font-semibold">{{ faq.question }}</span>
      <span
        class="faq-plus flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-bold text-base sm:text-lg transition-all duration-300 select-none"
        :class="open ? 'bg-[var(--green)] text-white rotate-45' : 'bg-[var(--sage-pale)] text-[var(--green)] rotate-0'"
        aria-hidden="true"
      >
        +
      </span>
    </button>

    <div
      :id="`faq-answer-${faq.id}`"
      role="region"
      :aria-labelledby="`faq-btn-${faq.id}`"
      class="faq-answer grid transition-[grid-template-rows] duration-300 ease-in-out"
      :class="open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
    >
      <div class="faq-answer-inner overflow-hidden">
        <div class="pb-5 pr-2 sm:pr-8 space-y-3">
          <template v-for="(para, idx) in parsedParagraphs" :key="idx">
            <!-- List paragraph -->
            <ul v-if="para.type === 'list'" class="space-y-1.5">
              <li
                v-for="(item, li) in para.items"
                :key="li"
                class="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-[var(--muted)]"
              >
                <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--green)]" aria-hidden="true"></span>
                <span>{{ item }}</span>
              </li>
            </ul>

            <!-- Text paragraph -->
            <p
              v-else
              class="text-xs sm:text-sm leading-relaxed text-[var(--muted)] text-justify text-pretty hyphens-auto"
              v-html="para.html"
            />
          </template>

          <!-- Media FAQ: Penghargaan -->
          <template v-if="faq.media === 'awards'">
            <div
              class="mt-3 grid grid-cols-2 min-[375px]:grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3"
              role="group"
              :aria-label="content.carousel.awardsLabel"
            >
              <button
                v-for="item in awardItems"
                :key="item.key"
                type="button"
                class="rounded-[12px] border border-[var(--line)] bg-[var(--white)] p-2.5 sm:p-3 text-left transition-all hover:border-[var(--green)] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green)]/30 cursor-pointer"
                :aria-label="`Perbesar penghargaan ${item.title}`"
                @click="openAt(item)"
              >
                <span class="block h-[78px] sm:h-[95px] w-full overflow-hidden rounded-md bg-[var(--paper)]">
                  <img
                    :src="item.image"
                    :alt="item.title"
                    loading="lazy"
                    class="h-full w-full object-contain p-1.5"
                  />
                </span>
                <span class="mt-2 block font-body text-[11px] font-bold text-[var(--green)]">{{ item.meta }}</span>
                <span class="mt-0.5 block font-body text-[10px] leading-snug text-[var(--ink)] line-clamp-2">{{ item.title }}</span>
              </button>
            </div>
          </template>

          <!-- Media FAQ: Proyek Timeline -->
          <template v-if="faq.media === 'projects'">
            <button
              type="button"
              class="mt-3 block w-full overflow-hidden rounded-[12px] border border-[var(--line)] bg-[var(--white)] p-2 transition-all hover:border-[var(--green)] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green)]/30 text-left cursor-pointer"
              :aria-label="content.projects.timelineCaption"
              @click="openLightbox(withBase(content.projects.timelineImage), content.projects.timelineAlt)"
            >
              <img
                :src="withBase(content.projects.timelineImage)"
                :alt="content.projects.timelineAlt"
                loading="lazy"
                class="w-full rounded-md object-contain"
              />
              <span class="mt-1.5 block text-center font-body text-[10px] text-[var(--muted)]">
                {{ content.projects.timelineCaption }}
              </span>
            </button>
            <p class="font-body text-xs italic leading-relaxed text-[var(--muted)] text-pretty mt-2">
              {{ content.projects.note }}
            </p>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
