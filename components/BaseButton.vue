<script setup>
defineProps({
  variant: { type: String, default: 'primary' }, // primary | outline | secondary | ghost | whatsapp
  href: { type: String, default: null },
});

const variants = {
  primary: 'text-white bg-green hover:bg-green-deep shadow-[0_8px_20px_rgba(60,83,65,.18)] hover:shadow-[0_12px_25px_rgba(60,83,65,.22)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50',
  primaryGradient: 'text-white bg-green hover:bg-green-deep shadow-[0_8px_20px_rgba(60,83,65,.18)] hover:shadow-[0_12px_25px_rgba(60,83,65,.22)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50',
  outline: 'text-ink border border-line bg-white/35 hover:border-green hover:bg-white active:bg-white/80 disabled:opacity-50',
  secondary: 'text-ink border border-line bg-white/35 hover:border-green hover:bg-white active:bg-white/80 disabled:opacity-50',
  ghost: 'text-ink bg-transparent hover:bg-white/60 hover:text-green active:bg-white/80 disabled:opacity-50',
  whatsapp: 'text-white bg-[#25D366] hover:bg-[#20ba5a] shadow-[0_8px_20px_rgba(37,211,102,.25)] hover:shadow-[0_12px_25px_rgba(37,211,102,.35)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50',
};
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    class="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-body font-semibold text-xs tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green cursor-pointer"
    :class="variants[variant] || variants.primary"
  >
    <slot />
  </component>
</template>
