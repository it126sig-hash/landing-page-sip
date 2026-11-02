<script setup>
import { useContent } from '~/composables/useContent';

const { content } = useContent();

/**
 * Rasio tinggi logo bank disesuaikan agar seimbang secara visual di latar terang.
 */
const bankHeight = {
  BCA: 'h-[16px] sm:h-[18px] lg:h-[22px]',
  BTN: 'h-[14px] sm:h-[16px] lg:h-[19px]',
};
</script>

<template>
  <aside class="relative bg-[var(--paper)] border-b border-[var(--line)] py-3 sm:py-3.5 lg:h-[50px] lg:py-0 flex items-center">
    <div
      class="container flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 sm:gap-x-6"
    >
      <span
        class="font-body text-[9px] font-medium uppercase tracking-[0.16em] text-[var(--muted)] sm:text-[10px] lg:text-[11px]"
      >
        Bekerja sama dengan
      </span>

      <!-- Divider -->
      <span class="hidden h-3.5 w-px bg-[var(--line)] sm:block" aria-hidden="true"></span>

      <!-- Bank Logos -->
      <span class="flex items-center gap-3.5 sm:gap-5 lg:gap-6">
        <img
          v-for="bank in content.banks"
          :key="bank.name"
          :src="bank.image"
          :alt="`Bank ${bank.name}`"
          loading="lazy"
          decoding="async"
          class="w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
          :class="bankHeight[bank.name] || 'h-4 lg:h-5'"
        />
      </span>
    </div>
  </aside>
</template>
