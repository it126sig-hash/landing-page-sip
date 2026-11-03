<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useContent } from '~/composables/useContent';
import { useReferralFromUrl } from '~/composables/useReferralFromUrl';

/**
 * Sambutan untuk pengunjung yang datang lewat QR / tautan berkode referral.
 * HANYA muncul kalau ada ?kode= di URL DAN kodenya sudah dikonfirmasi server.
 */
const emit = defineEmits(['open-form']);

const { content } = useContent();
const copy = content.referralWelcome;
const { urlData, urlStatus } = useReferralFromUrl();

const isOpen = ref(false);
const primaryBtn = ref(null);

// Halaman punya layar pemuatan sendiri (LoadingScreen)
const pageReady = ref(false);

/** Kunci penanda "sudah pernah dilihat", dipisah per kode. */
const seenKey = computed(() => `palastri:referral-welcome:${urlData.value?.kode_referal || ''}`);

function alreadySeen() {
  try {
    return sessionStorage.getItem(seenKey.value) === '1';
  } catch {
    return false;
  }
}

function rememberSeen() {
  try {
    sessionStorage.setItem(seenKey.value, '1');
  } catch { /* diabaikan */ }
}

const kavlingShort = computed(() => {
  const raw = (urlData.value?.kavling_dimiliki || '').trim();
  if (!raw) return '';
  const parts = raw.split(/\s*[—–]\s*/);
  return parts.length > 1 ? parts.slice(1).join(' — ').trim() : raw;
});

const bodyText = computed(() =>
  copy.body.replace('{code}', urlData.value?.kode_referal || '')
);

function lockScroll(on) {
  if (typeof document === 'undefined') return;
  document.body.style.overflow = on ? 'hidden' : '';
}

function dismiss() {
  isOpen.value = false;
  rememberSeen();
  lockScroll(false);
}

function openForm() {
  dismiss();
  emit('open-form');
}

function onKeydown(e) {
  if (e.key === 'Escape' && isOpen.value) dismiss();
}

watch([urlStatus, pageReady], ([status, ready]) => {
  if ((status !== 'valid' && status !== 'invalid') || !ready || isOpen.value) return;
  if (alreadySeen()) return;
  isOpen.value = true;
  lockScroll(true);
  requestAnimationFrame(() => primaryBtn.value?.focus());
}, { immediate: true });

onMounted(() => {
  document.addEventListener('keydown', onKeydown);
  const markReady = () => setTimeout(() => { pageReady.value = true; }, 700);
  if (document.readyState === 'complete') markReady();
  else window.addEventListener('load', markReady, { once: true });
});

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown);
  lockScroll(false);
});
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out motion-reduce:transition-none"
      enter-from-class="opacity-0" enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in motion-reduce:transition-none"
      leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="isOpen"
        class="fixed inset-0 z-[65] flex items-center justify-center overflow-y-auto bg-black/60 p-4 sm:p-6"
        @click.self="dismiss">

        <Transition
          enter-active-class="transition duration-300 ease-out motion-reduce:transition-none"
          enter-from-class="scale-95 opacity-0 translate-y-3"
          enter-to-class="scale-100 opacity-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in motion-reduce:transition-none"
          leave-from-class="scale-100 opacity-100 translate-y-0"
          leave-to-class="scale-95 opacity-0 translate-y-3"
          appear>
          <div role="dialog" aria-modal="true" aria-labelledby="referral-welcome-name"
            class="relative w-full max-w-sm overflow-hidden rounded-3xl bg-[var(--white)] border border-[var(--line)] shadow-2xl">

            <template v-if="urlStatus === 'valid'">
              <!-- Kop undangan -->
              <div class="relative bg-[#26382E] px-7 pb-8 pt-7 text-center">
                <button type="button" :aria-label="copy.closeLabel"
                  class="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/60"
                  @click="dismiss">
                  <svg class="h-4 w-4 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <p class="font-sans text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--green-soft)]">
                  {{ copy.eyebrow }}
                </p>

                <p class="mt-6 font-sans text-xs text-white/70">{{ copy.invitedBy }}</p>
                <p id="referral-welcome-name"
                  class="mt-1 font-display font-serif text-[2rem] font-bold leading-tight text-white">
                  {{ urlData?.nama_konsumen }}
                </p>

                <!-- Segel garis lembut Palastri -->
                <span class="mx-auto mt-4 block h-px w-10 bg-[var(--green-soft)]" aria-hidden="true"></span>

                <p v-if="kavlingShort" class="mt-4 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--green-soft)]">
                  {{ kavlingShort }}
                </p>
                <p v-if="urlData?.nama_proyek" class="mt-0.5 font-sans text-[11px] capitalize tracking-wide text-white/50">
                  {{ urlData.nama_proyek.toLowerCase() }}
                </p>
              </div>

              <!-- Badan sambutan -->
              <div class="px-7 py-6">
                <p class="text-center font-sans text-sm leading-relaxed text-[var(--muted)]">
                  {{ bodyText }}
                </p>

                <div class="mt-6 flex flex-col gap-2.5">
                  <button ref="primaryBtn" type="button"
                    class="btn-primary w-full rounded-full px-6 py-3.5 text-base font-bold text-white transition-all duration-200 motion-reduce:transform-none motion-reduce:transition-none"
                    @click="openForm">
                    {{ copy.primaryCta }}
                  </button>
                  <button type="button"
                    class="w-full rounded-full px-6 py-2.5 text-sm font-bold text-[var(--muted)] transition-colors hover:bg-[var(--sage-pale)] hover:text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--green)]/30"
                    @click="dismiss">
                    {{ copy.secondaryCta }}
                  </button>
                </div>
              </div>
            </template>

            <template v-else-if="urlStatus === 'invalid'">
              <div class="relative bg-red-50 px-7 pb-8 pt-8 text-center border-b border-red-100">
                <button type="button" aria-label="Tutup"
                  class="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-red-400 transition-colors hover:bg-red-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                  @click="dismiss">
                  <svg class="h-4 w-4 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 mb-4">
                  <svg class="h-7 w-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <p id="referral-welcome-name" class="font-display font-serif text-xl font-bold leading-tight text-red-900">
                  Kode Referal Tidak Valid
                </p>
              </div>
              <div class="px-7 py-6">
                <p class="text-center font-sans text-sm leading-relaxed text-[var(--muted)]">
                  Kode referral yang Anda gunakan tidak ditemukan atau sudah tidak berlaku. Anda tetap dapat mengisi formulir konsultasi tanpa kode referral.
                </p>
                <div class="mt-6">
                  <button ref="primaryBtn" type="button"
                    class="w-full rounded-full bg-[var(--sage-pale)] px-6 py-3 text-sm font-bold text-[var(--ink)] transition-colors hover:bg-[var(--paper-deep)] focus:outline-none focus:ring-2 focus:ring-[var(--green)]/30"
                    @click="dismiss">
                    Tutup
                  </button>
                </div>
              </div>
            </template>

          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
