<script setup>
import { useContent } from '~/composables/useContent';

const { content } = useContent();
</script>

<template>
  <section class="trust-strip" aria-label="Informasi singkat">
    <div class="container trust-inner">
      <div class="trust-label">{{ content.trust.label }}</div>
      <div class="trust-points">
        <div
          v-for="(item, idx) in content.trust.items"
          :key="idx"
          class="trust-point"
        >
          <span class="mini-icon" aria-hidden="true">{{ item.icon }}</span>
          <div>
            <strong>{{ item.title }}</strong>
            <small>{{ item.sub }}</small>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.trust-strip {
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background: var(--paper);
}

.trust-inner {
  min-height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}

.trust-label {
  max-width: 175px;
  color: var(--muted);
  font-size: 10px;
  line-height: 1.6;
}

.trust-points {
  display: flex;
  gap: clamp(25px, 5vw, 74px);
  align-items: center;
}

.trust-point {
  display: flex;
  align-items: center;
  gap: 11px;
}

.trust-point .mini-icon {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border: 1px solid var(--line);
  border-radius: 50%;
  color: var(--green);
  font-size: 15px;
  flex-shrink: 0;
}

.trust-point strong {
  display: block;
  font-size: 11px;
  color: var(--ink);
}

.trust-point small {
  display: block;
  margin-top: 3px;
  color: var(--muted);
  font-size: 9px;
}

@media (max-width: 680px) {
  .trust-inner {
    padding: 22px 0;
    align-items: flex-start;
    flex-direction: column;
    gap: 18px;
  }

  .trust-label {
    max-width: none;
  }

  .trust-points {
    width: 100%;
    justify-content: space-between;
    gap: 10px;
  }

  .trust-point {
    gap: 7px;
  }

  .trust-point .mini-icon {
    width: 29px;
    height: 29px;
    font-size: 13px;
  }

  .trust-point strong {
    font-size: 9px;
  }

  .trust-point small {
    font-size: 8px;
  }
}

@media (max-width: 380px) {
  .trust-points {
    align-items: flex-start;
  }

  .trust-point {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
