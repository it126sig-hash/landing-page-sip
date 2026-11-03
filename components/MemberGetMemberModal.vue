<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useContent } from '~/composables/useContent';
import { useConsultationForm } from '~/composables/useConsultationForm';
import { useReferralCheck } from '~/composables/useReferralCheck';
import { useReferralFromUrl } from '~/composables/useReferralFromUrl';

const props = defineProps({
  isOpen: { type: Boolean, default: false }
});

const emit = defineEmits(['close']);

const { content, houseTypes } = useContent();
const mgmContent = content.memberGetMember;
const cf = content.consultationForm;

const dialogRef = ref(null);

// Verifikasi kode referral ke SIG App
const {
  status: referralStatus,
  data: referralData,
  message: referralMessage,
  isChecking: referralChecking,
  isValid: referralValid,
  markAsStale: markReferralStale,
  check: checkReferralCode,
  seedVerified: seedVerifiedReferral,
  reset: resetReferral,
} = useReferralCheck();

// Kode referral dari URL
const { urlData: urlReferralData } = useReferralFromUrl();

const {
  state,
  isCaptchaStep,
  isSubmitting,
  isSuccess,
  isError,
  isNotConfigured,
  waFallbackUrl,
  captchaSiteKey,
  captchaLoading,
  captchaErrorMsg,
  retryCaptcha,
  submit: submitToEngine,
  reset: resetEngine,
  renderRecaptchaWidget,
} = useConsultationForm();

const form = ref({
  name: '',
  phone: '',
  houseType: mgmContent.houseTypeDefault,
  hasReferral: false,
  referralCode: ''
});

const errors = ref({
  name: '',
  phone: '',
  referralCode: ''
});

const recaptchaContainer = ref(null);

// Reset referral code when unchecked
watch(() => form.value.hasReferral, (newVal) => {
  if (!newVal) {
    form.value.referralCode = '';
    errors.value.referralCode = '';
    resetReferral();
  }
});

// Watcher referral code
watch(() => form.value.referralCode, (val) => {
  markReferralStale(val);
  if (errors.value.referralCode) errors.value.referralCode = '';
});

async function handleCheckReferral() {
  if (referralChecking.value) return;
  errors.value.referralCode = '';
  await checkReferralCode(form.value.referralCode);
}

function normalizePhone(phone) {
  let p = (phone || '').trim().replace(/[\s\-().]/g, '').replace(/\D/g, '');
  if (p.startsWith('0')) p = '62' + p.slice(1);
  if (p.startsWith('8')) p = '62' + p;
  return p;
}

function validateForm() {
  let isValid = true;
  errors.value = { name: '', phone: '', referralCode: '' };

  if (!form.value.name.trim()) {
    errors.value.name = mgmContent.validation.nameRequired;
    isValid = false;
  } else if (form.value.name.trim().length < 2) {
    errors.value.name = mgmContent.validation.nameMin;
    isValid = false;
  }

  const phone = normalizePhone(form.value.phone);
  if (!form.value.phone.trim()) {
    errors.value.phone = mgmContent.validation.phoneRequired;
    isValid = false;
  } else if (!/^62[0-9]{8,13}$/.test(phone)) {
    errors.value.phone = mgmContent.validation.phoneInvalid;
    isValid = false;
  }

  if (form.value.hasReferral) {
    if (!form.value.referralCode.trim()) {
      errors.value.referralCode = mgmContent.referral.requiredMessage;
      isValid = false;
    } else if (!referralValid.value) {
      errors.value.referralCode = mgmContent.referral.unverifiedMessage;
      isValid = false;
    }
  }

  return isValid;
}

function handleSubmit() {
  state.value = 'editing';
  if (!validateForm()) return;
  
  submitToEngine({
    formType: 'member_get_member',
    name: form.value.name.trim(),
    phone: normalizePhone(form.value.phone),
    houseType: form.value.houseType,
    referralEnabled: form.value.hasReferral,
    referralCode: form.value.hasReferral ? (referralData.value?.kode_referal || '') : '',
    referralName: form.value.hasReferral ? (referralData.value?.nama_konsumen || '') : '',
    referralKavling: form.value.hasReferral ? (referralData.value?.kavling_dimiliki || '') : '',
    source: 'landing-page-palastri'
  });
}

function resetForm() {
  const prefill = urlReferralData.value;

  form.value = {
    name: '',
    phone: '',
    houseType: mgmContent.houseTypeDefault,
    hasReferral: !!prefill,
    referralCode: prefill ? prefill.kode_referal : ''
  };
  errors.value = { name: '', phone: '', referralCode: '' };

  if (prefill) seedVerifiedReferral(prefill);
  else resetReferral();

  resetEngine();
}

watch(urlReferralData, (prefill) => {
  if (!prefill || !props.isOpen) return;
  if (form.value.hasReferral || form.value.referralCode) return;
  form.value.hasReferral = true;
  form.value.referralCode = prefill.kode_referal;
  seedVerifiedReferral(prefill);
});

function onKeydown(e) {
  if (e.key === 'Escape' && props.isOpen) emit('close');
}

watch(() => props.isOpen, (open) => {
  if (open) {
    resetForm();
    if (typeof document !== 'undefined') document.body.style.overflow = 'hidden';
  } else {
    if (typeof document !== 'undefined') document.body.style.overflow = '';
  }
});

onMounted(() => document.addEventListener('keydown', onKeydown));
onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown);
  if (typeof document !== 'undefined') document.body.style.overflow = '';
});

function handleClose() {
  if (typeof document !== 'undefined') document.body.style.overflow = '';
  emit('close');
}

// Watch state: render reCAPTCHA saat masuk state 'captcha'
watch(state, async (s) => {
  if (s === 'captcha') {
    await nextTick();
    if (recaptchaContainer.value) {
      renderRecaptchaWidget(recaptchaContainer.value);
    }
  }
});
</script>

<template>
  <Teleport to="body">
    <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0"
      enter-to-class="opacity-100" leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <div v-if="isOpen" class="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 bg-black/50 overflow-y-auto"
        @click.self="handleClose">
        
        <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="scale-95 opacity-0 translate-y-4"
          enter-to-class="scale-100 opacity-100 translate-y-0" leave-active-class="transition duration-150 ease-in"
          leave-from-class="scale-100 opacity-100 translate-y-0" leave-to-class="scale-95 opacity-0 translate-y-4">
          
          <div ref="dialogRef" role="dialog" aria-modal="true" tabindex="-1"
            class="relative w-full max-w-md max-h-[90vh] flex flex-col rounded-3xl bg-[var(--white)] border border-[var(--line)] shadow-2xl focus:outline-none">
            
            <!-- Header Area -->
            <div class="px-6 pt-6 pb-4 sm:px-8 sm:pt-8 md:pb-6 border-b border-[var(--line)] shrink-0">
              <button type="button" aria-label="Tutup"
                class="absolute right-5 top-5 sm:right-6 sm:top-6 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--sage-pale)] text-[var(--ink)] transition-colors hover:bg-[var(--paper-deep)] focus:outline-none focus:ring-2 focus:ring-[var(--green)] focus:ring-offset-2"
                @click="handleClose">
                <svg class="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div class="pr-8">
                <h3 class="font-display font-serif text-2xl font-bold text-[var(--ink)]">{{ mgmContent.title }}</h3>
                <p class="mt-2 text-sm text-[var(--muted)] leading-relaxed">
                  {{ mgmContent.subtitle }}
                </p>
              </div>
            </div>

            <!-- Body / Form Area -->
            <div class="overflow-y-auto px-6 py-4 sm:px-8 sm:py-6 overscroll-contain">
              
              <!-- STATE: idle / editing -->
              <div v-if="state === 'idle' || state === 'editing'">
                <form @submit.prevent="handleSubmit" class="space-y-4" novalidate>
                  <div>
                    <label class="block text-sm font-semibold text-[var(--ink)] mb-1.5">{{ mgmContent.labels.name }} <span class="text-red-500">*</span></label>
                    <input v-model="form.name" type="text" :placeholder="mgmContent.placeholders.name"
                      class="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-sm text-[var(--ink)] placeholder-[var(--muted)]/60 focus:border-[var(--green)] focus:bg-[var(--white)] focus:outline-none focus:ring-1 focus:ring-[var(--green)] transition" 
                      :class="{'border-red-500 focus:border-red-500 focus:ring-red-500': errors.name}"
                      />
                    <p v-if="errors.name" class="mt-1.5 text-xs font-medium text-red-500">{{ errors.name }}</p>
                  </div>

                  <div>
                    <label class="block text-sm font-semibold text-[var(--ink)] mb-1.5">{{ mgmContent.labels.phone }} <span class="text-red-500">*</span></label>
                    <input v-model="form.phone" type="tel" :placeholder="mgmContent.placeholders.phone"
                      class="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-sm text-[var(--ink)] placeholder-[var(--muted)]/60 focus:border-[var(--green)] focus:bg-[var(--white)] focus:outline-none focus:ring-1 focus:ring-[var(--green)] transition" 
                      :class="{'border-red-500 focus:border-red-500 focus:ring-red-500': errors.phone}"
                      />
                    <p v-if="errors.phone" class="mt-1.5 text-xs font-medium text-red-500">{{ errors.phone }}</p>
                  </div>

                  <div>
                    <label class="block text-sm font-semibold text-[var(--ink)] mb-1.5">{{ mgmContent.labels.houseType }}</label>
                    <div class="relative">
                      <select v-model="form.houseType"
                        class="w-full appearance-none rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-sm text-[var(--ink)] focus:border-[var(--green)] focus:bg-[var(--white)] focus:outline-none focus:ring-1 focus:ring-[var(--green)] transition pr-10">
                        <option value="Belum tahu / masih survei">Belum tahu / masih survei</option>
                        <option v-for="t in houseTypes" :key="t.id" :value="t.name">
                          {{ t.name }}
                        </option>
                      </select>
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[var(--muted)]">
                        <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <!-- Referral Checkbox -->
                  <div class="pt-2">
                    <label class="inline-flex items-center gap-3 cursor-pointer group">
                      <input v-model="form.hasReferral" type="checkbox"
                        class="h-5 w-5 rounded border-[var(--line)] text-[var(--green)] focus:ring-[var(--green)] accent-[var(--green)] cursor-pointer" />
                    <span class="text-sm font-medium text-[var(--ink)] group-hover:text-[var(--green-deep)] transition-colors">{{ mgmContent.referral.checkboxLabel }}</span>
                    </label>
                  </div>

                  <!-- Referral Code Input (Conditional) -->
                  <Transition enter-active-class="transition duration-300 ease-out"
                    enter-from-class="opacity-0 -translate-y-2 max-h-0" enter-to-class="opacity-100 translate-y-0 max-h-[420px]"
                    leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100 translate-y-0 max-h-[420px]"
                    leave-to-class="opacity-0 -translate-y-2 max-h-0">
                    <div v-show="form.hasReferral" class="pt-2 overflow-hidden">
                      <label for="mgm-referral-code" class="block text-sm font-semibold text-[var(--ink)] mb-1.5">{{ mgmContent.referral.label }} <span class="text-red-500">*</span></label>

                      <div class="flex items-stretch gap-2">
                        <input id="mgm-referral-code" v-model="form.referralCode" type="text"
                          :placeholder="mgmContent.referral.placeholder"
                          autocapitalize="characters" autocomplete="off" spellcheck="false"
                          :aria-invalid="referralStatus === 'invalid' || !!errors.referralCode"
                          aria-describedby="mgm-referral-feedback"
                          class="min-w-0 flex-1 rounded-xl border bg-[var(--paper)] px-4 py-3 text-sm uppercase text-[var(--ink)] placeholder-[var(--muted)]/60 placeholder:normal-case focus:bg-[var(--white)] focus:outline-none focus:ring-1 transition"
                          :class="referralValid
                            ? 'border-emerald-500 focus:border-emerald-600 focus:ring-emerald-600'
                            : (errors.referralCode || referralStatus === 'invalid' || referralStatus === 'error')
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                              : 'border-[var(--line)] focus:border-[var(--green)] focus:ring-[var(--green)]'"
                          @keydown.enter.prevent="handleCheckReferral" />

                        <button type="button"
                          :disabled="referralChecking || !form.referralCode.trim()"
                          class="shrink-0 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[var(--green)] hover:bg-[var(--green-deep)] px-5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[var(--green)] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:translate-y-0 disabled:shadow-none"
                          @click="handleCheckReferral">
                          <span v-if="referralChecking"
                            class="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white"></span>
                          {{ referralChecking ? mgmContent.referral.checkingCta : mgmContent.referral.checkCta }}
                        </button>
                      </div>

                      <div id="mgm-referral-feedback" aria-live="polite">
                        <div v-if="referralValid"
                          class="mt-2 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5">
                          <svg class="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                          </svg>
                          <div class="min-w-0 text-xs leading-relaxed">
                            <p class="font-bold text-emerald-800">{{ mgmContent.referral.validTitle }}</p>
                            <p class="text-emerald-700">
                              {{ mgmContent.referral.validSubtitle.replace('{name}', referralData.nama_konsumen) }}
                            </p>
                            <p v-if="referralData.kavling_dimiliki" class="mt-0.5 text-emerald-600/80">
                              {{ referralData.kavling_dimiliki }}
                            </p>
                          </div>
                        </div>

                        <p v-else-if="errors.referralCode" class="mt-1.5 text-xs font-medium text-red-500">{{ errors.referralCode }}</p>
                        <p v-else-if="referralMessage" class="mt-1.5 text-xs font-medium text-red-500">{{ referralMessage }}</p>
                        <p v-else class="mt-1.5 text-xs text-[var(--muted)]">{{ mgmContent.referral.hint }}</p>
                      </div>
                    </div>
                  </Transition>

                  <!-- Spacer before submit -->
                  <div class="pt-2">
                    <button type="submit"
                      class="w-full rounded-full bg-[var(--green)] hover:bg-[var(--green-deep)] px-6 py-3.5 text-base font-bold text-white shadow-[0_8px_20px_rgba(60,83,65,0.18)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--green)]/50 active:scale-[0.98]">
                      {{ mgmContent.submitLabel }}
                    </button>
                  </div>

                  <!-- Disclaimer Footer -->
                  <p class="text-center text-xs text-[var(--muted)] mt-2">
                    {{ mgmContent.disclaimer }}
                  </p>
                </form>
              </div>

              <!-- STATE: captcha — Security Check -->
              <div v-else-if="isCaptchaStep" class="py-2">
                <div class="pr-8 mb-5">
                  <h2 class="font-display font-serif text-xl font-bold text-[var(--ink)]">Verifikasi Keamanan</h2>
                  <p class="mt-1 text-sm text-[var(--muted)] leading-relaxed">Centang verifikasi berikut untuk mengirim data Member Get Member.</p>
                </div>

                <!-- reCAPTCHA Container -->
                <div class="my-4">
                  <div v-if="captchaLoading" class="flex flex-col items-center justify-center py-6 bg-[var(--paper)] rounded-xl border border-dashed border-[var(--line)]">
                    <div class="h-8 w-8 animate-spin rounded-full border-4 border-[var(--green)] border-t-transparent"></div>
                    <p class="mt-2 text-sm text-[var(--muted)]">Memuat verifikasi reCAPTCHA...</p>
                  </div>

                  <div class="flex justify-center">
                    <div ref="recaptchaContainer"></div>
                  </div>
                  <p v-if="captchaErrorMsg" class="mt-3 rounded-xl bg-amber-50 border border-amber-200 px-3 py-2 text-xs leading-relaxed text-amber-800" role="alert">
                    {{ captchaErrorMsg }}
                  </p>
                  <div class="mt-4 flex flex-col gap-2 border-t border-[var(--line)] pt-3">
                    <button type="button" class="w-full rounded-full border border-[var(--line)] bg-[var(--paper)] px-5 py-2.5 text-xs font-bold text-[var(--ink)] hover:bg-[var(--paper-deep)] transition-colors" @click="retryCaptcha(recaptchaContainer)">
                      {{ cf.captcha.retry }}
                    </button>
                    <p class="text-center text-[11px] text-[var(--muted)]">{{ cf.captcha.fallbackIntro }}</p>
                    <a :href="waFallbackUrl" target="_blank" rel="noopener noreferrer" class="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20bd5a] px-5 py-2.5 text-xs font-bold text-white shadow-[0_4px_12px_rgba(37,211,102,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
                      {{ cf.captcha.fallbackCta }}
                    </a>
                  </div>

                </div>
              </div>

              <!-- STATE: submitting -->
              <div v-else-if="isSubmitting" class="py-8 flex flex-col items-center gap-4">
                <div class="h-10 w-10 animate-spin rounded-full border-4 border-[var(--green)] border-t-transparent"></div>
                <p class="text-sm font-medium text-[var(--ink)]">{{ cf.messages.submitting }}</p>
              </div>

              <!-- STATE: success -->
              <div v-else-if="isSuccess" class="py-4 flex flex-col items-center text-center gap-4">
                <div class="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--sage-pale)] text-[var(--green)]">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <h3 class="font-display font-serif text-xl font-bold text-[var(--ink)] mb-2">Pesan Terkirim!</h3>
                  <p class="text-sm text-[var(--muted)] leading-relaxed max-w-xs mx-auto">{{ cf.messages.success }}</p>
                </div>
                <div class="flex flex-col sm:flex-row gap-3 w-full mt-2">
                  <a :href="waFallbackUrl" target="_blank" rel="noopener noreferrer" class="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20bd5a] px-5 py-3 text-sm font-bold text-white shadow-[0_4px_12px_rgba(37,211,102,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
                    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                    {{ cf.successCtaWa }}
                  </a>
                  <button type="button" class="flex-1 rounded-full border border-[var(--line)] bg-[var(--paper)] px-5 py-3 text-sm font-bold text-[var(--ink)] hover:bg-[var(--paper-deep)] transition-colors" @click="handleClose">
                    {{ cf.successCtaClose }}
                  </button>
                </div>
              </div>

              <!-- STATE: notConfigured -->
              <div v-else-if="isNotConfigured" class="py-4 flex flex-col items-center text-center gap-4">
                <div class="flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
                  <svg class="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /></svg>
                </div>
                <div>
                  <h3 class="font-display font-serif text-xl font-bold text-[var(--ink)] mb-2">{{ cf.notConfiguredTitle }}</h3>
                  <p class="text-sm text-[var(--muted)] leading-relaxed max-w-xs mx-auto">{{ cf.messages.notConfigured }}</p>
                </div>
                <a :href="waFallbackUrl" target="_blank" rel="noopener noreferrer" class="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20bd5a] px-5 py-3 text-sm font-bold text-white shadow-[0_4px_12px_rgba(37,211,102,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
                  {{ cf.errorCtaWa }}
                </a>
              </div>

              <!-- STATE: error -->
              <div v-else-if="isError" class="py-4 flex flex-col items-center text-center gap-4">
                <div class="flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                  <svg class="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </div>
                <div>
                  <h3 class="font-display font-serif text-xl font-bold text-[var(--ink)] mb-2">Pengiriman Gagal</h3>
                  <p class="text-sm text-[var(--muted)] leading-relaxed max-w-xs mx-auto">{{ cf.messages.error }}</p>
                </div>
                <div class="flex flex-col sm:flex-row gap-3 w-full mt-2">
                  <button type="button" class="flex-1 rounded-full bg-[var(--green)] hover:bg-[var(--green-deep)] px-5 py-3 text-sm font-bold text-white hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200" @click="() => { state = 'idle'; }">
                    {{ cf.errorCtaRetry }}
                  </button>
                  <a :href="waFallbackUrl" target="_blank" rel="noopener noreferrer" class="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20bd5a] px-5 py-3 text-sm font-bold text-white shadow-[0_4px_12px_rgba(37,211,102,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
                    {{ cf.errorCtaWa }}
                  </a>
                </div>
              </div>

            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
