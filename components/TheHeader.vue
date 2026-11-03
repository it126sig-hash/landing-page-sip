<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useContent } from '~/composables/useContent';

const { content, wa } = useContent();
const isMenuOpen = ref(false);

const closeMenu = () => {
  isMenuOpen.value = false;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const onKeydown = (e) => {
  if (e.key === 'Escape' && isMenuOpen.value) {
    closeMenu();
  }
};

onMounted(() => {
  window.addEventListener('keydown', onKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown);
});
</script>

<template>
  <header class="site-header sticky top-0 z-50 bg-[rgba(246,245,239,0.91)] backdrop-blur-[18px] border-b border-[rgba(38,53,46,0.08)]">
    <div class="container nav h-[76px] max-[680px]:h-[67px] flex items-center justify-between">
      <!-- Brand -->
      <a
        class="brand inline-flex items-center gap-[11px] min-w-0"
        href="#beranda"
        :aria-label="`${content.meta.projectName} — Beranda`"
        @click="closeMenu"
      >
        <img
          :src="content.meta.logo"
          :alt="`Logo ${content.meta.projectName}`"
          class="h-9 w-auto object-contain shrink-0"
        />
        <span class="brand-name grid gap-0.5 leading-none">
          <strong class="text-[13px] tracking-[-0.04em] text-[var(--ink)] font-bold">
            {{ content.meta.projectName }}
          </strong>
          <small class="text-[8px] tracking-[0.15em] uppercase text-[var(--muted)]">
            by {{ content.meta.developer }}
          </small>
        </span>
      </a>

      <!-- Mobile Menu Toggle Button -->
      <button
        class="menu-toggle max-[680px]:grid hidden place-items-center w-[42px] h-[42px] border border-[var(--line)] rounded-full bg-transparent text-[var(--ink)] text-xl cursor-pointer"
        :aria-expanded="isMenuOpen"
        aria-label="Toggle navigasi menu"
        @click="toggleMenu"
      >
        <span aria-hidden="true">{{ isMenuOpen ? '✕' : '☰' }}</span>
      </button>

      <!-- Nav Links (Desktop + Mobile Dropdown) -->
      <nav
        class="nav-links flex items-center gap-[33px] text-[11px] font-semibold text-[#536057] max-[900px]:gap-[19px] max-[680px]:absolute max-[680px]:top-[66px] max-[680px]:left-0 max-[680px]:right-0 max-[680px]:p-5 max-[680px]:bg-[rgba(246,245,239,0.98)] max-[680px]:border-b max-[680px]:border-[var(--line)] max-[680px]:flex-col max-[680px]:items-stretch max-[680px]:shadow-[0_18px_30px_rgba(39,54,45,0.08)]"
        :class="{ 'max-[680px]:hidden': !isMenuOpen, 'max-[680px]:flex': isMenuOpen }"
        aria-label="Navigasi utama"
      >
        <template v-for="item in content.meta.nav" :key="item.id">
          <a
            v-if="!item.isCta"
            :href="`#${item.id}`"
            class="nav-item relative py-[9px] max-[680px]:py-[13px] max-[680px]:px-[7px] text-inherit hover:text-[var(--ink)] transition-colors"
            @click="closeMenu"
          >
            {{ item.label }}
          </a>
          <a
            v-else
            :href="wa('konsultasi')"
            target="_blank"
            rel="noopener noreferrer"
            class="nav-cta btn-primary rounded-full px-[18px] py-[12px] text-white text-center flex items-center justify-center gap-2 max-[680px]:mt-2"
            @click="closeMenu"
          >
            {{ item.label }} <span class="arrow text-[17px] leading-none">↗</span>
          </a>
        </template>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav-item::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 2px;
  height: 1px;
  width: 0;
  background-color: var(--green);
  transition: width 0.25s ease;
}

.nav-item:hover::after {
  width: 100%;
}

@media (max-width: 680px) {
  .nav-item::after {
    bottom: 6px;
  }
}

.nav-cta {
  background-color: var(--green);
  transition: background-color 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;
}

.nav-cta:hover {
  background-color: var(--green-deep);
}

.nav-cta:hover .arrow {
  transform: translateX(3px);
}
</style>
