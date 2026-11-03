<script setup>
import { useContent } from '~/composables/useContent';

const { content } = useContent();
</script>

<template>
  <section class="why-section" id="keunggulan">
    <div class="container why-layout">
      <!-- Left: Sticky Intro -->
      <div class="why-intro reveal">
        <span class="eyebrow">{{ content.why.eyebrow }}</span>
        <h2 class="serif">
          {{ content.why.titleLines?.[0] || 'Kenapa memulai' }}<br>
          <em>{{ content.why.titleLines?.[1] || 'di Palastri?' }}</em>
        </h2>
        <p>{{ content.why.sub }}</p>
        <a class="text-link" href="#kontak">
          {{ content.why.cta }} <span class="arrow">→</span>
        </a>
      </div>

      <!-- Right: Why List -->
      <div class="why-list">
        <article
          v-for="item in content.why.items"
          :key="item.no"
          class="why-item reveal"
        >
          <span class="why-no">{{ item.no }}</span>
          <div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
          <div class="why-visual">
            <img
              v-if="item.image"
              :src="item.image"
              :alt="item.title"
              class="why-thumb"
              loading="lazy"
            />
            <span v-else class="why-symbol" aria-hidden="true">{{ item.symbol }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.why-section {
  padding: 120px 0 112px;
  background: var(--paper);
}

.why-layout {
  display: grid;
  grid-template-columns: 0.82fr 1.18fr;
  gap: 90px;
  align-items: start;
}

.why-intro {
  position: sticky;
  top: 120px;
}

.why-intro .eyebrow {
  margin-bottom: 20px;
}

.why-intro h2 {
  max-width: 390px;
  margin: 0;
  font-size: clamp(42px, 4.7vw, 62px);
  line-height: 1.02;
}

.why-intro h2 em {
  color: var(--green);
  font-style: normal;
}

.why-intro p {
  max-width: 330px;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.9;
  margin: 18px 0 24px;
}

.why-list {
  border-top: 1px solid var(--line);
}

.why-item {
  display: grid;
  grid-template-columns: 48px 1fr 80px;
  gap: 20px;
  align-items: center;
  padding: 27px 0;
  border-bottom: 1px solid var(--line);
}

.why-no {
  color: #9ca79b;
  font-family: var(--serif);
  font-size: 22px;
}

.why-item h3 {
  margin: 0 0 8px;
  font-family: var(--serif);
  font-size: 23px;
  font-weight: 500;
  color: var(--ink);
}

.why-item p {
  max-width: 440px;
  margin: 0;
  color: var(--muted);
  font-size: 11px;
  line-height: 1.8;
}

.why-visual {
  display: grid;
  place-items: center;
  width: 80px;
  height: 80px;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid var(--line);
  background: var(--paper-deep);
  box-shadow: 0 4px 14px rgba(39, 54, 45, 0.06);
  flex-shrink: 0;
}

.why-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.why-symbol {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border: 1px solid var(--line);
  border-radius: 50%;
  color: var(--green);
  font-size: 15px;
}

@media (max-width: 900px) {
  .why-layout {
    gap: 48px;
  }
}

@media (max-width: 680px) {
  .why-section {
    padding: 80px 0;
  }
  .why-layout {
    grid-template-columns: 1fr;
    gap: 35px;
  }
  .why-intro {
    position: static;
  }
  .why-intro h2 {
    max-width: 390px;
    font-size: 48px;
  }
  .why-item {
    grid-template-columns: 32px 1fr 64px;
    gap: 12px;
    padding: 20px 0;
  }
  .why-no {
    font-size: 18px;
  }
  .why-item h3 {
    font-size: 19px;
  }
  .why-visual {
    width: 64px;
    height: 64px;
    border-radius: 12px;
  }
  .why-symbol {
    width: 32px;
    height: 32px;
  }
}
</style>
