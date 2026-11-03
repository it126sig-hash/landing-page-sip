<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { useContent } from '~/composables/useContent';

const { content } = useContent();

const carouselRef = ref(null);
let ctx;
let tween;

onMounted(() => {
  if (!carouselRef.value) return;

  ctx = gsap.context(() => {
    const carousel = carouselRef.value;
    const items = Array.from(carousel.children);
    if (items.length < 2) return;

    const measurePitch = () => {
      const a = items[0].getBoundingClientRect();
      const b = items[1].getBoundingClientRect();
      return Math.round(b.left - a.left) || 160;
    };
    const itemWidth = measurePitch();

    // Clone items for seamless loop
    items.forEach(item => {
      const clone = item.cloneNode(true);
      carousel.appendChild(clone);
    });

    // Infinite horizontal scroll
    tween = gsap.to(carousel, {
      x: -itemWidth * items.length,
      duration: 24,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % (itemWidth * items.length))
      }
    });
  });
});

const pauseScroll = () => tween?.pause();
const resumeScroll = () => tween?.play();

onUnmounted(() => ctx?.revert());
</script>

<template>
  <section class="section about-section" id="tentang">
    <div class="container">
      <div class="about-grid">
        <!-- Visual (Kiri) -->
        <div class="about-visual reveal">
          <img
            class="about-main-photo"
            :src="content.about.photos.main"
            alt="Area hunian Sanggar Indah Palastri"
            loading="lazy"
          />
          <img
            class="about-small-photo"
            :src="content.about.photos.small"
            alt="Detail ruang Sanggar Indah Palastri"
            loading="lazy"
          />
          <div v-if="content.about.numberBadge" class="about-number">
            <strong>{{ content.about.numberBadge.number }}</strong>
            <small>{{ content.about.numberBadge.label }}</small>
          </div>
        </div>

        <!-- Copy (Kanan) -->
        <div class="about-copy reveal">
          <span class="eyebrow">{{ content.about.eyebrow }}</span>
          <h2 class="serif">
            {{ content.about.headlineLines?.[0] || 'Bukan sekadar rumah.' }}
            <em>{{ content.about.headlineLines?.[1] || 'Tempat kehidupan dimulai.' }}</em>
          </h2>
          <p v-for="(part, i) in content.about.description" :key="i">
            {{ part.text }}
          </p>
          <p v-if="content.about.sub" class="about-sub">
            {{ content.about.sub }}
          </p>
          <div v-if="content.about.signature" class="signature">
            <span class="signature-mark">{{ content.about.signature.mark }}</span>
            <div>
              <strong>{{ content.about.signature.title }}</strong>
              <small>{{ content.about.signature.subtitle }}</small>
            </div>
          </div>
        </div>
      </div>

      <!-- Awards Strip (Calm marquee SIG) -->
      <div v-if="content.about.awards && content.about.awards.length" class="awards-strip">
        <div class="awards-heading">
          <span class="eyebrow">Rekam Jejak & Penghargaan Sanggar Indah Group</span>
        </div>
        <div class="awards-marquee-wrap" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
          <div ref="carouselRef" class="awards-marquee">
            <div
              v-for="award in content.about.awards"
              :key="award.id"
              class="award-card-wrap"
            >
              <div class="award-card">
                <div class="award-img-box">
                  <img
                    v-if="award.image"
                    :src="award.image"
                    :alt="award.title"
                    class="award-img"
                    loading="lazy"
                  />
                  <span v-else class="text-2xl">🏆</span>
                </div>
                <div class="award-info">
                  <span class="award-year">{{ award.year }}</span>
                  <p class="award-title">{{ award.title }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section {
  padding: 116px 0;
}

.about-grid {
  display: grid;
  grid-template-columns: 1.03fr 0.97fr;
  gap: 90px;
  align-items: center;
}

.about-visual {
  position: relative;
  padding: 0 45px 38px 0;
}

.about-main-photo {
  height: 455px;
  border-radius: 14px 120px 14px 14px;
}

.about-small-photo {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 46%;
  height: 205px;
  border: 9px solid var(--paper);
  border-radius: 12px;
}

.about-number {
  position: absolute;
  left: -23px;
  top: 27px;
  padding: 14px 17px;
  background: var(--green);
  color: white;
  border-radius: 8px;
  box-shadow: var(--shadow);
}

.about-number strong {
  display: block;
  font-family: var(--serif);
  font-size: 27px;
  font-weight: 500;
  line-height: 1;
}

.about-number small {
  display: block;
  margin-top: 4px;
  font-size: 8px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.8;
}

.about-copy .eyebrow {
  margin-bottom: 21px;
}

.about-copy h2 {
  margin: 0;
  font-size: clamp(39px, 4.2vw, 58px);
  line-height: 1.06;
}

.about-copy h2 em {
  color: var(--green);
  font-style: normal;
  display: block;
}

.about-copy p {
  max-width: 455px;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.95;
  margin: 18px 0 0;
}

.about-copy .about-sub {
  margin-top: 24px;
  padding-top: 21px;
  border-top: 1px solid var(--line);
}

.signature {
  margin-top: 27px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.signature-mark {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border: 1px solid var(--green);
  border-radius: 50%;
  color: var(--green);
  font-family: var(--serif);
  font-size: 18px;
}

.signature strong {
  display: block;
  font-family: var(--serif);
  font-size: 16px;
  font-weight: 500;
  color: var(--ink);
  line-height: 1.2;
}

.signature small {
  display: block;
  color: var(--muted);
  font-size: 9px;
  margin-top: 2px;
}

/* Awards Strip */
.awards-strip {
  margin-top: 80px;
  padding-top: 48px;
  border-top: 1px solid var(--line);
}

.awards-heading {
  margin-bottom: 24px;
  text-align: center;
}

.awards-marquee-wrap {
  overflow: hidden;
  position: relative;
  padding: 4px 0;
}

.awards-marquee {
  display: flex;
  gap: 16px;
  align-items: stretch;
  width: max-content;
}

.award-card-wrap {
  flex-shrink: 0;
  width: 140px;
}

.award-card {
  height: 100%;
  background: var(--white);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(38, 53, 46, 0.04);
}

.award-img-box {
  width: 100%;
  height: 64px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--paper);
  border-radius: 8px;
  padding: 6px;
  overflow: hidden;
}

.award-img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

.award-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.award-year {
  display: block;
  font-family: var(--serif);
  font-size: 13px;
  font-weight: 600;
  color: var(--green);
  margin-bottom: 4px;
}

.award-title {
  margin: 0;
  font-size: 11px;
  line-height: 1.4;
  color: var(--ink);
}

@media (max-width: 900px) {
  .about-grid {
    gap: 48px;
  }
  .about-main-photo {
    height: 390px;
  }
  .about-small-photo {
    height: 165px;
  }
}

@media (max-width: 680px) {
  .section {
    padding: 76px 0;
  }
  .about-grid {
    grid-template-columns: 1fr;
    gap: 42px;
  }
  .about-visual {
    padding: 0 27px 29px 0;
    margin-left: 10px;
  }
  .about-main-photo {
    height: 340px;
    border-top-right-radius: 90px;
  }
  .about-small-photo {
    width: 45%;
    height: 143px;
    border-width: 7px;
  }
  .about-number {
    left: -10px;
    top: 18px;
    padding: 10px 13px;
  }
  .about-number strong {
    font-size: 22px;
  }
  .about-copy h2 {
    font-size: 43px;
  }
  .about-copy p {
    font-size: 12px;
  }
  .awards-strip {
    margin-top: 56px;
    padding-top: 36px;
  }
}
</style>
