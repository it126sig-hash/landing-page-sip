<script setup>
import { ref, computed, watch, nextTick } from 'vue';
import { useContent } from '~/composables/useContent';
import { useConsultationForm } from '~/composables/useConsultationForm';

const { content } = useContent();

const {
  isSubmitting,
  isSuccess,
  isError,
  isCaptchaStep,
  isNotConfigured,
  captchaLoading,
  captchaErrorMsg,
  submit: submitToEngine,
  reset: resetEngine,
  renderRecaptchaWidget,
} = useConsultationForm();

const form = ref({
  name: '',
  phone: '',
  interest: 'Belum menentukan',
});

const validationError = ref('');
const recaptchaContainer = ref(null);

const directWaUrl = computed(() => {
  const number = content.meta.whatsapp.number;
  const project = content.meta.projectName;
  const nameStr = form.value.name ? `Nama: ${form.value.name}. ` : '';
  const interestStr = form.value.interest ? `Kebutuhan: ${form.value.interest}. ` : '';
  const msg = `Halo tim marketing ${project}, saya ingin konsultasi. ${nameStr}${interestStr}Mohon informasi lebih lanjut.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
});

watch(isCaptchaStep, (newVal) => {
  if (newVal) {
    nextTick(() => {
      if (recaptchaContainer.value) {
        renderRecaptchaWidget(recaptchaContainer.value);
      }
    });
  }
});

function handleSubmit() {
  validationError.value = '';
  const trimmedName = form.value.name.trim();
  const trimmedPhone = form.value.phone.trim();

  if (!trimmedName || trimmedName.length < 2) {
    validationError.value = 'Silakan masukkan nama lengkap Anda.';
    return;
  }

  const cleanPhone = trimmedPhone.replace(/[\s\-().]/g, '');
  if (!cleanPhone || cleanPhone.length < 9) {
    validationError.value = 'Silakan masukkan nomor WhatsApp yang valid.';
    return;
  }

  submitToEngine({
    name: trimmedName,
    phone: cleanPhone,
    interest: form.value.interest,
    source: 'landing-page-palastri',
  });
}

function resetForm() {
  form.value = {
    name: '',
    phone: '',
    interest: 'Belum menentukan',
  };
  validationError.value = '';
  resetEngine();
}
</script>

<template>
  <section class="contact-section relative overflow-hidden bg-[var(--green)] text-white py-[92px] max-[680px]:py-[72px] scroll-mt-20" id="kontak">
    <!-- Dekorasi Lingkaran Halus -->
    <div class="pointer-events-none absolute -right-[100px] -top-[290px] w-[500px] h-[500px] rounded-full border border-white/10" aria-hidden="true"></div>
    <div class="pointer-events-none absolute -right-[45px] -top-[235px] w-[390px] h-[390px] rounded-full border border-white/10" aria-hidden="true"></div>

    <div class="container contact-grid relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_0.75fr] gap-10 lg:gap-20 items-center">
      <!-- Copy Kiri -->
      <div class="contact-copy reveal">
        <span class="eyebrow text-[#d5dfd2] mb-4 block">{{ content.contactCta.eyebrow }}</span>
        <h2
          class="serif text-3xl sm:text-5xl lg:text-[58px] leading-tight text-white mb-4"
          v-html="content.contactCta.titleHtml || content.contactCta.title"
        />
        <p class="text-xs sm:text-sm text-white/80 leading-relaxed max-w-[440px] mb-6">
          {{ content.contactCta.desc }}
        </p>
        <div class="inline-flex items-center gap-2.5 text-xs text-white/80 bg-white/10 px-3.5 py-2 rounded-full border border-white/10">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{{ content.contactCta.phoneDisplay }}</span>
        </div>
      </div>

      <!-- Form Kanan -->
      <div class="contact-card p-6 sm:p-7 rounded-[16px] border border-white/20 bg-white/[0.08] backdrop-blur-md reveal">
        <!-- Sukses State -->
        <div v-if="isSuccess" class="p-6 rounded-xl bg-white/10 border border-white/20 text-center space-y-4">
          <div class="w-12 h-12 mx-auto rounded-full bg-emerald-400/20 text-emerald-300 flex items-center justify-center text-2xl font-bold">✓</div>
          <h3 class="serif text-2xl font-medium text-white">Terima Kasih!</h3>
          <p class="text-xs sm:text-sm text-white/85 leading-relaxed">
            Data Anda telah kami terima. Tim marketing Sanggar Indah Palastri akan segera menghubungi Anda.
          </p>
          <a
            :href="directWaUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn w-full text-xs font-semibold bg-[#e2ddc5] text-[var(--green-deep)] hover:bg-white transition-colors"
          >
            Chat Tim Marketing Sekarang <span class="arrow">↗</span>
          </a>
          <button
            type="button"
            @click="resetForm"
            class="text-[11px] text-white/70 hover:text-white underline mt-2 block mx-auto cursor-pointer"
          >
            Kirim formulir lain
          </button>
        </div>

        <!-- Captcha Verification Step -->
        <div v-else-if="isCaptchaStep" class="p-4 rounded-xl bg-white/10 border border-white/20 space-y-4">
          <p class="text-xs text-white/90 font-medium text-center">
            Selesaikan verifikasi keamanan singkat di bawah untuk mengirim data:
          </p>
          <div ref="recaptchaContainer" class="flex justify-center min-h-[78px] py-1"></div>
          <div v-if="captchaLoading" class="text-xs text-white/70 text-center">
            Memuat verifikasi...
          </div>
          <div v-if="captchaErrorMsg" class="text-xs text-amber-200 text-center bg-amber-900/30 p-2 rounded-lg">
            {{ captchaErrorMsg }}
          </div>
          <a
            :href="directWaUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-outline w-full text-xs text-white border-white/30 hover:bg-white/15"
          >
            Atau Lanjut Langsung via WhatsApp <span class="arrow">↗</span>
          </a>
        </div>

        <!-- Error State / Not Configured -->
        <div v-else-if="isError || isNotConfigured" class="p-5 rounded-xl bg-white/10 border border-white/20 text-center space-y-3">
          <p class="text-xs text-amber-200 leading-relaxed">
            Sistem pengiriman form sedang sibuk atau dalam pemeliharaan. Anda tetap dapat melanjutkan konsultasi langsung melalui WhatsApp.
          </p>
          <a
            :href="directWaUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn w-full text-xs font-semibold bg-[#e2ddc5] text-[var(--green-deep)] hover:bg-white"
          >
            Lanjut via WhatsApp <span class="arrow">↗</span>
          </a>
          <button
            type="button"
            @click="resetForm"
            class="text-[11px] text-white/70 hover:text-white underline block mx-auto cursor-pointer"
          >
            Coba isi form lagi
          </button>
        </div>

        <!-- Input Form Normal -->
        <form v-else @submit.prevent="handleSubmit" class="space-y-4">
          <div v-if="validationError" class="p-2.5 rounded-lg bg-rose-900/40 border border-rose-400/30 text-rose-200 text-xs text-center">
            {{ validationError }}
          </div>

          <div>
            <label for="c-name" class="block text-[9px] font-semibold tracking-wider uppercase text-white/80 mb-1.5">
              Nama Lengkap
            </label>
            <input
              id="c-name"
              v-model="form.name"
              type="text"
              required
              placeholder="Nama Anda"
              class="w-full h-11 px-3.5 rounded-lg bg-white/95 text-[var(--ink)] text-xs border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#d9d3b0]"
            />
          </div>

          <div>
            <label for="c-phone" class="block text-[9px] font-semibold tracking-wider uppercase text-white/80 mb-1.5">
              Nomor WhatsApp
            </label>
            <input
              id="c-phone"
              v-model="form.phone"
              type="tel"
              required
              placeholder="08xxxxxxxxxx"
              class="w-full h-11 px-3.5 rounded-lg bg-white/95 text-[var(--ink)] text-xs border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#d9d3b0]"
            />
          </div>

          <div>
            <label for="c-interest" class="block text-[9px] font-semibold tracking-wider uppercase text-white/80 mb-1.5">
              Pilihan Kebutuhan
            </label>
            <select
              id="c-interest"
              v-model="form.interest"
              class="w-full h-11 px-3.5 rounded-lg bg-white/95 text-[var(--ink)] text-xs border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#d9d3b0]"
            >
              <option
                v-for="opt in content.contactCta.options"
                :key="opt.value"
                :value="opt.value"
              >
                {{ opt.label }}
              </option>
            </select>
          </div>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full py-3.5 rounded-full bg-[#e2ddc5] text-[var(--green-deep)] font-semibold text-xs hover:bg-white transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
          >
            <span>{{ isSubmitting ? 'Mengirim...' : content.contactCta.ctaLabel }}</span>
            <span class="arrow">↗</span>
          </button>

          <p class="text-[10px] text-white/60 text-center leading-relaxed pt-1">
            Data Anda hanya digunakan tim kami untuk keperluan konsultasi hunian.
          </p>
        </form>
      </div>
    </div>
  </section>
</template>
