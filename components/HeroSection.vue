<script setup>
import { useContent } from '~/composables/useContent';

const { content } = useContent();
</script>

<template>
  <section class="hero" id="beranda">
    <div class="container hero-grid">
      <!-- Left Column: Copy -->
      <div class="hero-copy reveal">
        <span class="eyebrow">{{ content.hero.eyebrow }}</span>
        <h1 class="serif">
          {{ content.hero.headlineLines[0] }}<br>
          <em>{{ content.hero.headlineLines[1] }}</em>
        </h1>
        <p class="hero-lead">{{ content.hero.sub }}</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="#tipe">
            {{ content.hero.primaryCta }} <span class="arrow">↗</span>
          </a>
          <a class="btn btn-outline" href="#tentang">
            {{ content.hero.secondaryCta }}
          </a>
        </div>
        <div class="hero-note">
          <div class="avatar-stack">
            <span>SI</span>
            <span>家</span>
            <span>+</span>
          </div>
          <span>{{ content.hero.note }}</span>
        </div>
      </div>

      <!-- Right Column: Visual -->
      <div class="hero-visual reveal">
        <div class="hero-photo-wrap">
          <img
            class="hero-photo"
            :src="content.hero.image"
            alt="Foto Sanggar Indah Palastri"
            loading="eager"
            decoding="async"
          />
          <div class="hero-caption">
            <div>
              <strong>{{ content.hero.caption.title }}</strong>
              <small>{{ content.hero.caption.sub }}</small>
            </div>
          </div>
        </div>
        <div class="hero-stamp" aria-hidden="true">
          <span>{{ content.hero.stamp }}</span>
        </div>
        <div class="hero-float">
          <span class="float-icon" aria-hidden="true">⌂</span>
          <strong>{{ content.hero.float.title }}</strong>
          <small>{{ content.hero.float.sub }}</small>
        </div>
        <div class="hero-deco" aria-hidden="true"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: 36px 0 72px;
  overflow: hidden;
}

.hero-grid {
  display: grid;
  grid-template-columns: 0.88fr 1.12fr;
  gap: 44px;
  align-items: center;
  min-height: 560px;
}

.hero-copy {
  position: relative;
  z-index: 2;
  padding: 28px 0 26px 2px;
}

.hero-copy .eyebrow {
  margin-bottom: 23px;
}

.hero h1 {
  max-width: 570px;
  margin: 0;
  font-size: clamp(50px, 6vw, 83px);
  line-height: 0.99;
}

.hero h1 em {
  color: var(--green);
  font-style: normal;
}

.hero-lead {
  max-width: 390px;
  margin: 26px 0 27px;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.85;
}

.hero-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.hero-note {
  display: flex;
  align-items: center;
  gap: 13px;
  margin-top: 50px;
  color: var(--muted);
  font-size: 10px;
}

.avatar-stack {
  display: flex;
  padding-left: 5px;
}

.avatar-stack span {
  display: grid;
  place-items: center;
  width: 27px;
  height: 27px;
  margin-left: -5px;
  border: 2px solid var(--paper);
  border-radius: 50%;
  background: #d2dfcd;
  color: var(--green-deep);
  font-size: 8px;
  font-weight: 700;
}

.hero-visual {
  position: relative;
  min-width: 0;
}

.hero-photo-wrap {
  position: relative;
  height: 535px;
  border-radius: 48% 48% 20px 20px / 36% 36% 20px 20px;
  overflow: hidden;
  background: #cbd6c4;
}

.hero-photo-wrap::after {
  content: '';
  position: absolute;
  inset: 35% 0 0;
  background: linear-gradient(transparent, rgba(20, 34, 25, 0.30));
  pointer-events: none;
}

.hero-photo {
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.hero-stamp {
  position: absolute;
  z-index: 3;
  top: 28px;
  right: -19px;
  width: 104px;
  height: 104px;
  display: grid;
  place-items: center;
  padding: 13px;
  border-radius: 50%;
  color: var(--green-deep);
  background: #e4e9d9;
  border: 1px solid rgba(52, 75, 60, 0.17);
  text-align: center;
  transform: rotate(10deg);
}

.hero-stamp span {
  max-width: 70px;
  font-family: var(--serif);
  font-size: 15px;
  line-height: 1.05;
}

.hero-caption {
  position: absolute;
  z-index: 4;
  left: 23px;
  right: 23px;
  bottom: 22px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  color: white;
}

.hero-caption strong {
  display: block;
  font-family: var(--serif);
  font-size: 25px;
  font-weight: 500;
}

.hero-caption small {
  display: block;
  margin-top: 4px;
  opacity: 0.83;
  font-size: 9px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.hero-float {
  position: absolute;
  z-index: 5;
  left: -35px;
  bottom: 76px;
  width: 190px;
  padding: 17px;
  border-radius: 16px;
  background: var(--white);
  box-shadow: var(--shadow);
}

.hero-float .float-icon {
  width: 31px;
  height: 31px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--sage-pale);
  color: var(--green);
  font-size: 15px;
}

.hero-float strong {
  display: block;
  margin: 12px 0 4px;
  font-family: var(--serif);
  font-size: 19px;
  font-weight: 500;
}

.hero-float small {
  color: var(--muted);
  font-size: 9px;
  line-height: 1.5;
}

.hero-deco {
  position: absolute;
  z-index: -1;
  right: -100px;
  bottom: -70px;
  width: 270px;
  height: 270px;
  border: 1px solid rgba(83, 107, 85, 0.18);
  border-radius: 50%;
  pointer-events: none;
}

.hero-deco::before,
.hero-deco::after {
  content: '';
  position: absolute;
  border: 1px solid rgba(83, 107, 85, 0.16);
  border-radius: 50%;
  inset: 22px;
}

.hero-deco::after {
  inset: 47px;
}

@media (max-width: 900px) {
  .hero-grid {
    gap: 25px;
    min-height: 490px;
  }
  .hero-photo-wrap {
    height: 470px;
  }
  .hero h1 {
    font-size: clamp(48px, 7vw, 68px);
  }
  .hero-float {
    left: -20px;
    width: 165px;
  }
}

@media (max-width: 680px) {
  .hero {
    padding: 31px 0 48px;
  }
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 26px;
    min-height: 0;
  }
  .hero-copy {
    padding: 9px 0 0;
  }
  .hero-copy .eyebrow {
    margin-bottom: 17px;
  }
  .hero h1 {
    max-width: 480px;
    font-size: clamp(51px, 13vw, 72px);
  }
  .hero-lead {
    margin: 18px 0 22px;
    font-size: 12px;
  }
  .hero-note {
    margin-top: 25px;
  }
  .hero-visual {
    margin: 0 9px 0 17px;
  }
  .hero-photo-wrap {
    height: min(112vw, 470px);
    border-radius: 47% 47% 15px 15px / 28% 28% 15px 15px;
  }
  .hero-stamp {
    width: 82px;
    height: 82px;
    right: -14px;
    top: 15px;
  }
  .hero-stamp span {
    font-size: 12px;
  }
  .hero-float {
    left: -17px;
    bottom: 52px;
    width: 145px;
    padding: 13px;
  }
  .hero-float strong {
    font-size: 16px;
  }
  .hero-float small {
    font-size: 8px;
  }
  .hero-caption {
    left: 16px;
    right: 16px;
    bottom: 16px;
  }
  .hero-caption strong {
    font-size: 20px;
  }
}

@media (max-width: 380px) {
  .hero-caption strong {
    font-size: 17px;
  }
}
</style>
