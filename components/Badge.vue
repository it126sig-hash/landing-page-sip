<script setup>
defineProps({
  label: { type: String, required: true },
  variant: { type: String, default: 'status' }, // status | tag | warning
});

const variants = {
  status: 'bg-sage-pale text-green-deep border-line',
  tag: 'bg-white/90 text-green-deep border-line',
  warning: 'bg-[#FAF3E6] text-[#A66C24] border-[#E8D7B8]',
};
</script>

<template>
  <span
    class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-body font-semibold"
    :class="variants[variant] || variants.status"
  >
    {{ label }}
  </span>
</template>
