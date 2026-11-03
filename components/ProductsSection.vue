<script setup>
import { computed, ref } from 'vue';
import { useContent } from '~/composables/useContent';

const { content, houseTypes } = useContent();

const selectedTypeId = ref(null);
const modalOpen = ref(false);
const selectedType = computed(() => houseTypes.find(t => t.id === selectedTypeId.value) || null);

function openType(id) {
  selectedTypeId.value = id;
  modalOpen.value = true;
}

function closeModal() {
  modalOpen.value = false;
}
</script>

<template>
  <section class="section types-section" id="tipe">
    <div class="container">
      <!-- Section Header -->
      <div class="section-top reveal">
        <div class="section-heading">
          <span class="eyebrow">{{ content.products.eyebrow }}</span>
          <h2 class="serif">
            {{ content.products.titleLines?.[0] || 'Pilihan rumah,' }}<br>
            <em>{{ content.products.titleLines?.[1] || 'pilihan cerita.' }}</em>
          </h2>
          <p>{{ content.products.subtitle }}</p>
        </div>
        <a class="btn btn-outline" :href="content.products.ctaHref || '#kontak'">
          {{ content.products.ctaLabel }} <span class="arrow">↗</span>
        </a>
      </div>

      <!-- House Types Grid -->
      <div class="type-grid">
        <article
          v-for="t in houseTypes"
          :key="t.id"
          class="type-card reveal"
        >
          <!-- Thumbnail -->
          <div
            class="type-image"
            role="button"
            tabindex="0"
            :aria-label="`Buka detail ${t.name}`"
            @click="openType(t.id)"
            @keydown.enter="openType(t.id)"
          >
            <img
              :src="t.thumbnail || t.gallery?.[0]"
              :alt="t.name"
              loading="lazy"
            />
            <span class="type-tag">{{ t.category || t.tag }}</span>
            <span v-if="t.count" class="type-count">{{ t.count }}</span>
          </div>

          <!-- Content -->
          <div class="type-content">
            <div v-if="t.meta && t.meta.length" class="type-meta">
              <span v-for="m in t.meta" :key="m">{{ m }}</span>
            </div>
            <h3>{{ t.headline || t.name }}</h3>
            <p>{{ t.desc }}</p>

            <div class="type-bottom">
              <button
                type="button"
                class="btn-detail"
                @click="openType(t.id)"
              >
                {{ content.products.detailCtaLabel }}
              </button>
              <a
                :href="t.waLink"
                target="_blank"
                rel="noopener"
                class="text-link"
              >
                {{ content.products.discussCtaLabel }} <span class="arrow">→</span>
              </a>
            </div>
          </div>
        </article>
      </div>

      <!-- Footnote -->
      <p v-if="content.products.footnote" class="type-footnote">
        {{ content.products.footnote }}
      </p>
    </div>

    <!-- Modal Detail Unit -->
    <HouseTypeModal :type="modalOpen ? selectedType : null" @close="closeModal" />
  </section>
</template>

<style scoped>
.section {
  padding: 116px 0;
}

.types-section {
  background: var(--sage-pale);
  position: relative;
  overflow: hidden;
}

.types-section::before {
  content: 'PALASTRI';
  position: absolute;
  left: -15px;
  bottom: -70px;
  font-family: var(--serif);
  font-size: clamp(130px, 21vw, 280px);
  color: rgba(83, 107, 85, 0.045);
  letter-spacing: -0.08em;
  pointer-events: none;
}

.section-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 28px;
  margin-bottom: 42px;
}

.section-heading .eyebrow {
  margin-bottom: 20px;
}

.section-heading h2 {
  margin: 0;
  font-size: clamp(39px, 4.2vw, 58px);
  line-height: 1.06;
}

.section-heading h2 em {
  color: var(--green);
  font-style: normal;
}

.section-heading p {
  margin: 15px 0 0;
  max-width: 410px;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.8;
}

.type-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  position: relative;
}

.type-card {
  overflow: hidden;
  border-radius: 17px;
  background: var(--white);
  box-shadow: 0 10px 35px rgba(39, 54, 45, 0.055);
  transition: transform 0.3s, box-shadow 0.3s;
}

.type-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow);
}

.type-image {
  height: 285px;
  position: relative;
  overflow: hidden;
  background: #d5dfd1;
  cursor: pointer;
}

.type-image img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  transition: transform 0.6s;
}

.type-card:hover .type-image img {
  transform: scale(1.04);
}

.type-tag {
  position: absolute;
  left: 18px;
  top: 18px;
  padding: 8px 12px;
  border-radius: 99px;
  background: rgba(255, 254, 250, 0.92);
  color: var(--green-deep);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.type-count {
  position: absolute;
  right: 18px;
  bottom: 17px;
  color: white;
  font-family: var(--serif);
  font-size: 13px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.type-content {
  padding: 24px 25px 23px;
}

.type-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--muted);
  font-size: 9px;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.type-meta span {
  display: inline-flex;
  align-items: center;
}

.type-meta span:not(:last-child)::after {
  content: '•';
  margin-left: 12px;
  opacity: 0.5;
}

.type-content h3 {
  margin: 13px 0 8px;
  font-family: var(--serif);
  font-size: 29px;
  font-weight: 500;
  letter-spacing: -0.04em;
  color: var(--ink);
}

.type-content p {
  margin: 0;
  max-width: 430px;
  color: var(--muted);
  font-size: 11px;
  line-height: 1.8;
}

.type-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 22px;
  padding-top: 17px;
  border-top: 1px solid var(--line);
}

.btn-detail {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--paper);
  border: 1px solid var(--line);
  color: var(--ink);
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-detail:hover {
  background: var(--white);
  border-color: var(--green);
  color: var(--green-deep);
  transform: translateY(-1px);
}

.type-footnote {
  margin: 24px 0 0;
  color: #778078;
  font-size: 9px;
  line-height: 1.6;
}

@media (max-width: 680px) {
  .types-section {
    padding: 77px 0;
  }
  .section-top {
    display: block;
    margin-bottom: 28px;
  }
  .section-top > .btn {
    margin-top: 20px;
  }
  .type-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  .type-image {
    height: 240px;
  }
  .type-content {
    padding: 20px;
  }
  .type-content h3 {
    font-size: 26px;
  }
}
</style>
