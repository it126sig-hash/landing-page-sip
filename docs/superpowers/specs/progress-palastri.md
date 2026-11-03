# Progress & Debugging Ledger — Redesign Sanggar Indah Palastri

Dokumen acuan progres, log pengujian, catatan debugging, dan konteks antar-fase untuk redesign Sanggar Indah Palastri (mengacu pada [DESIGN.md](../../design/DESIGN.md), [DESIGN.html](../../design/DESIGN.html), dan [2026-10-30-redesign-palastri.md](2026-10-30-redesign-palastri.md)).

---

## Ringkasan Proyek & Status Branch

- **Git Branch:** `redesign-palastri` (dibuat dari `master` pada commit `dd954519c3977d0b36b0c17fb75dd388f582f44c`)
- **Status Sesi:** Fase E, Polish Desain, dan Refactoring HouseTypeModal (Compact Single-Stage) selesai diverifikasi QA (PASS), Fase F siap dikerjakan.
- **Tujuan Utama:**
  1. Transformasi identitas Parahyangan → Palastri (Arjasari, Kab. Bandung).
  2. Redesign visual Natural Scandinavian × Modern Editorial (sage green, warm neutral, Dream Orphans, Poppins).
  3. Content-Driven UI (100% teks di `data/content.js` dan `useContent.js`, 2 tipe rumah: 22/60 Subsidi & 31/72 Komersial).

---

## Tracker Fase Redesign

| Fase | Nama Fase | Status | Subagent PIC | Catatan / Hasil Verifikasi |
|---|---|---|---|---|
| **A** | **Fondasi (CSS, Config, Data Layer, Assets, Primitives)** | **selesai** | `frontend-agent` & `qa-agent` | Verifikasi PASS (Build, Playwright responsive, computed styles valid) |
| **B** | **Header, Hero Split, Trust Strip, KPR Strip** | **selesai** | `frontend-agent` & `qa-agent` | Verifikasi PASS (Build, Playwright responsive 1280/1440/768/375, 1-layar fold, arch portrait 0.82, mobile menu) |
| **C** | **Tentang, Pilihan Rumah (2 kartu + modal), Kenapa** | **selesai** | `frontend-agent` & `qa-agent` | Verifikasi PASS (Build, Playwright responsive 1280/768/375, modal interaktif, 0 JS error, 0 404) |
| **D** | **Lokasi, FAQ Accordion, Kontak Form, Footer** | **selesai** | `frontend-agent` & `qa-agent` | Verifikasi PASS (Build, Playwright responsive 1440/1280/768/375, accordion 1-item, form kontak inline, 0 error/404) |
| **E** | **Floating WA, Reskin Modal, Cleanup Aset Yatim** | **selesai** | `frontend-agent` & `qa-agent` | Verifikasi PASS (Build, Playwright responsive 1440/1280/768/375, FAB WA Palastri, Header Konsultasi WA, Reskin KPR/MGM/Referral modals, 0 broken asset / 404) |
| **Polish** | **Tipografi, Header Sticky, Logo SIG, WhySection USP** | **selesai** | `frontend-agent` & `qa-agent` | Verifikasi PASS (Build PASS, Playwright Desktop 1440x900 & Mobile 390x844/375x812 PASS, 0 console error, 0 404, sticky header verified, pin maps skipped) |
| **Modal Compact** | **Refactor HouseTypeModal (Compact Single-Stage)** | **selesai** | `frontend-agent` & `qa-agent` | Verifikasi PASS (Zero Desktop Overflow 1280x720 516px, Mobile 375x667 simetris, 9 spesifikasi berbingkai stroke 1.7, 0 error/404) |
| **F** | **QA Penuh & Dokumentasi Final** | **siap dikerjakan** | `qa-agent` & `doc-agent` | Siap dieksekusi setelah Fase E & Polish tuntas (Audit menyeluruh fungsionalitas, SEO, performa, dan final handoff docs) |

---

## Rincian Eksekusi Fase A (Fondasi)

### Checklist Task Builder (`frontend-agent`):
- [x] Hapus `tokens.css` dan `base.css` lama di root proyek.
- [x] Buat `assets/css/tokens.css` (variabel warna, radius, font sesuai DESIGN.md).
- [x] Buat `assets/css/base.css` (reset, container responsive, typography, shared buttons `.btn`, `.btn-primary`, `.btn-outline`, `.eyebrow`, `.serif`, reduced-motion).
- [x] Perbarui `tailwind.config.js` (palet Palastri, fontFamily Fraunces & DM Sans, hapus gradasi lama).
- [x] Perbarui `nuxt.config.ts` (daftarkan CSS di `assets/css/`, link Google Fonts DM Sans + Fraunces, pertahankan captcha & sheet config).
- [x] Perbarui `app.vue` (hapus deklarasi body lawas yang menimpa font).
- [x] Restrukturisasi `data/content.js`:
  - [x] 100% ganti teks Parahyangan ke Palastri.
  - [x] Tipe rumah diset ke 2: `22-60` (Subsidi) dan `31-72` (Komersial).
  - [x] Tambah struktur `trust`, `why`.
  - [x] Bersihkan properti spesifik Parahyangan (KBP, Whoosh, IKEA, mascot, reasons).
- [x] Perbarui `composables/useContent.js` (sesuaikan mapping dengan struktur konten baru, tetap sediakan `withBase` dan `wa()`).
- [x] Organisir aset `public/assets/images/palastri/`:
  - [x] Folder `public/assets/images/palastri/rumah/` untuk `2260-3d.png`, `2260-denah.jpg`, `3172-3d.jpg`, `3172-denah.jpg`.
  - [x] Placeholder foto Unsplash (`hero.jpg`, `about-main.jpg`, `about-small.jpg`).
- [x] Perbarui komponen primitif:
  - [x] `BaseButton.vue` (varian pill hijau, outline, whatsapp).
  - [x] `Badge.vue` (sage-pale).
  - [x] `LoadingScreen.vue` (tema paper, logo Palastri, spinner hijau).
  - [x] `pages/index.vue` (update SEO meta title & description Palastri).

---

## Rincian Eksekusi Fase B (Header, Hero Split, Trust Strip, KPR Strip)

### Checklist Task Builder (`frontend-agent`):
- [x] `components/TheHeader.vue`:
  - [x] Sticky navigation dengan backdrop blur 18px (tinggi 76px desktop, 67px mobile).
  - [x] Logo resmi Palastri (`content.meta.logo`) dan sub-label developer `by Sanggar Indah Group`.
  - [x] Nav links desktop (#tentang, #tipe, #keunggulan, #faq) dengan animasi hover garis hijau dinamis.
  - [x] Tombol pill CTA `Konsultasi ↗` menuju `#kontak`.
  - [x] Mobile menu dropdown panel responsif dengan auto-close saat klik tautan atau tombol Escape.
- [x] `components/HeroSection.vue`:
  - [x] Layout split editorial 0.88fr : 1.12fr (min-height 560px, gap 44px desktop, 1 kolom mobile).
  - [x] Typography editorial H1 Fraunces (`.serif`) dengan aksen kata miring (`em`).
  - [x] Foto arch vertikal 535px dengan radius Scandinavian (`48% 48% 20px 20px / 36% 36% 20px 20px`).
  - [x] Stamp dekoratif 10° (`Mulai langkah baik dari rumah`).
  - [x] Kartu informasi mengambang (*floating card*) putih dengan ikon `⌂` dan bayangan halus.
  - [x] Pembersihan total elemen signage lawas, efek emas Parahyangan, dan zero carousel counter `01 / 03`.
- [x] `components/TrustStrip.vue` [NEW]:
  - [x] Strip 3 poin horizontal (desktop) / vertikal (mobile) bersumber 100% dari `content.trust`.
  - [x] Ikon lingkaran border halus untuk Pilihan Hunian, Lingkungan Nyaman, dan Bagian dari SIG.
- [x] `components/KprPartnerStrip.vue`:
  - [x] Reskin tipis latar terang `var(--paper)` / `var(--paper-deep)` dengan border halus di bawah TrustStrip.
  - [x] Logo BCA & BTN proporsional dengan label pengantar rapi.
- [x] `pages/index.vue`:
  - [x] Urutan section diperbarui: `TheHeader` → `HeroSection` → `TrustStrip` → `KprPartnerStrip` → `AboutSection` → ...
  - [x] Aktivasi native `IntersectionObserver` untuk animasi kemunculan halus `.reveal`.
- [x] **Penyesuaian 1-Layar Penuh (*Above-the-Fold* 100dvh):**
  - [x] `pages/index.vue`: pembungkus `lg:h-screen lg:max-h-[100dvh] lg:flex lg:flex-col lg:justify-between lg:overflow-hidden` untuk Header + Hero + Trust + KPR.
  - [x] `components/HeroSection.vue`: fleksibilitas desktop (`flex-1`, padding `clamp(10px, 1.8vh, 24px) 0`, foto arch `clamp(380px, 48vh, 520px)`).
  - [x] `components/TrustStrip.vue`: desktop min-height 76px.
  - [x] `components/KprPartnerStrip.vue`: 50px di kaki fold desktop.
- [x] **Penyempurnaan Proporsi Arch Foto Hero (Aspect Ratio 0.82 Portrait):**
  - [x] `components/HeroSection.vue`: penyesuaian CSS di `@media (min-width: 1024px)` dengan `width: auto; max-width: 440px; margin-left: auto; height: clamp(500px, 58vh, 535px); aspect-ratio: 0.82;`.
  - [x] Mengeliminasi deformasi arch melebar pada layar lebar, mengunci lengkungan kubah setengah lingkaran simetris potret.

---

## Rincian Eksekusi Fase C (Tentang, Pilihan Rumah, Kenapa Palastri)

### Checklist Task Builder (`frontend-agent`):
- [x] `data/content.js`:
  - [x] Lengkapi `content.about` dengan properti signature lockup (`mark: 'P'`, `title: 'Sanggar Indah Palastri'`, `subtitle: 'Hunian untuk cerita baru'`).
  - [x] Tambahkan heading, eyebrow, subtitle, label tombol aksi, dan disclaimer footnote pada `content.products`.
  - [x] Susun 2 tipe hunian utama pada `houseTypes`: Tipe 31/72 Komersial (`01 / Hunian`) dan Tipe 22/60 Subsidi (`02 / Hunian`) lengkap dengan denah, fasad, dan metadata spesifikasi (LB, LT, KT, KM).
  - [x] Perbarui 4 pilar keunggulan pada `content.why.items` (Hunian Nyaman & Fungsional, Lokasi Berkembang Arjasari, Kualitas Terjamin SIG, Kemudahan Kepemilikan).
- [x] `components/AboutSection.vue`:
  - [x] Reskin total tata letak editorial asimetris Scandinavian (menghilangkan gradasi emas lawas).
  - [x] Visual kiri (`.about-visual`): foto utama dengan sudut lengkung Scandinavian (`14px 120px 14px 14px`), foto inset sudut kanan bawah dengan border 9px `var(--paper)`, serta floating badge `01` ("Awal cerita") berlatar `var(--green)`.
  - [x] Copy kanan (`.about-copy`): eyebrow `content.about.eyebrow`, H2 Fraunces editorial, paragraf deskripsi, pemisah garis halus `var(--line)`, dan signature lockup Palastri.
  - [x] Strip penghargaan SIG di bawah grid dipertahankan sebagai *calm strip* dengan kartu berlatar paper bersih dan marquee halus.
- [x] `components/ProductsSection.vue`:
  - [x] Latar belakang bertema `var(--sage-pale)` dengan dekorasi watermark teks `'PALASTRI'` yang elegan dan responsif.
  - [x] Header section: Eyebrow, H2 Fraunces (`Pilihan rumah, <em>pilihan cerita.</em>`), subtitle, dan tombol pill `.btn .btn-outline` ("Tanya pilihan rumah ↗").
  - [x] Grid 2 kolom kartu tipe rumah: Tipe 31/72 Komersial dan Tipe 22/60 Subsidi.
  - [x] Tiap kartu dilengkapi thumbnail 3D proporsional, tag kategori (.type-tag), penomoran (.type-count), metadata spesifikasi (LB, LT, KT, KM), tombol "Lihat Detail" (membuka modal), dan tautan WhatsApp "Diskusikan →".
  - [x] Catatan kaki / disclaimer ilustrasi resmi di bawah grid kartu.
- [x] `components/HouseTypeModal.vue`:
  - [x] Reskin modal tipe rumah menggunakan tokens Palastri (`var(--forest)`, `var(--sage-pale)`, `var(--paper)`, `var(--line)`).
  - [x] Header modal memuat nama tipe Fraunces, badges spesifikasi ringkas, dan tombol close bulat dengan efek hover lembut.
  - [x] Integrasi `FacadeGallery` untuk pratinjau fasad dan kartu denah interaktif yang terhubung ke `Lightbox`.
  - [x] Render kondisional untuk tabel spesifikasi teknis (disembunyikan otomatis bila data kosong tanpa merusak layout).
  - [x] Footer modal dengan tombol WhatsApp beraksen hijau ("Tanya Unit {type}").
  - [x] Interaksi dialog aksesibel: auto-focus, penutupan via tombol Escape, tombol close, maupun klik backdrop overlay.
- [x] `components/FacadeGallery.vue`:
  - [x] Pembersihan total kelas Tailwind lawas, beralih penuh ke tokens Palastri (`text-green`, `border-line`, `text-ink`, `text-muted`).
  - [x] Pertahankan fungsionalitas scroll snap horizontal, navigasi panah kiri/kanan, dan klik gambar untuk membuka lightbox pembesar.
- [x] `components/WhySection.vue` [NEW]:
  - [x] Komponen baru menggantikan `ReasonsCardsSection.vue` dengan anchor `id="keunggulan"`.
  - [x] Layout 2 kolom: Kiri intro sticky desktop (`top: 120px`, eyebrow, H2 Fraunces, paragraf pengantar, dan tautan teks "Bicarakan kebutuhanmu →" menuju `#kontak`).
  - [x] Kanan daftar 4 poin keunggulan dari `content.why.items` dengan nomor Fraunces (`01` s/d `04`), judul editorial, deskripsi padat, dan simbol melingkar (⌂, ▦, ✳, ♡).
- [x] `pages/index.vue`:
  - [x] Impor dan integrasi `<WhySection />` menggantikan `<ReasonsCardsSection />`.
  - [x] Penataan alur halaman berurutan: `TheHeader` → `HeroSection` → `TrustStrip` → `KprPartnerStrip` → `AboutSection` → `ProductsSection` → `WhySection` → `FaqSection` → `FinalCtaSection` → `TheFooter`.

---

## Rincian Eksekusi Fase D (Lokasi, FAQ Accordion, Kontak Form, Footer)

### Checklist Task Builder (`frontend-agent`):
- [x] `data/content.js`:
  - [x] Perkaya `content.locationSection` dengan `titleHtml` (aksen Fraunces `em`), `embedMapUrl` Google Maps Arjasari, `primaryCta` ("Buka Google Maps"), dan `secondaryCta` ("Atur kunjungan").
  - [x] Perbarui `content.faqSection` dengan eyebrow ("Punya pertanyaan?"), `titleHtml` ("Hal yang sering <em>ditanyakan.</em>"), dan subtitle editorial.
  - [x] Tambahkan `contactCta.titleHtml` dan opsi dropdown `contactCta.options` (Belum menentukan, Tipe 31/72 Komersial, Tipe 22/60 Subsidi, Jadwal survei lokasi).
  - [x] Perbarui `content.footer` dengan `developerShort: 'SIG'`, deskripsi brand Palastri yang hangat, dan sinkronisasi tautan navigasi.
- [x] `components/LocationSection.vue` [NEW]:
  - [x] Komponen baru dengan anchor `id="lokasi"`.
  - [x] Layout split 2-kolom: Kiri info lokasi, eyebrow, H2 Fraunces, poin alamat + survei dengan bullet ikon melingkar (⌖, ↗), tombol primary CTA Google Maps ↗ dan tombol outline menuju `#kontak`.
  - [x] Kanan iframe Google Maps responsif dengan subtle editorial caption badge ("PALASTRI · Mangunjaya · Arjasari") di sudut kiri bawah peta.
- [x] `components/FaqSection.vue` & `components/FaqItem.vue` [MODIFY]:
  - [x] `FaqSection.vue`: Layout 2-kolom editorial dengan intro sticky kiri (`top: 7rem`) dan tombol pill "Tanya Tim Kami ↗" menuju WhatsApp Marketing.
  - [x] `FaqSection.vue`: Logika accordion mutual-exclusion (maksimal 1 item terbuka sekaligus, item pertama `f1` default terbuka).
  - [x] `FaqItem.vue`: Reskin penuh dengan border token `var(--line)`, hover state `var(--green)`, dan indikator plus (+) bulat yang berotasi 45° dengan latar hijau saat terbuka.
  - [x] `FaqItem.vue`: Dukungan parsing paragraf ganda, bullet point, dan klik gambar penghargaan/sertifikat yang terhubung ke lightbox.
- [x] `components/FinalCtaSection.vue` [MODIFY]:
  - [x] Reskin total form konsultasi dengan palet forest green gelap Scandinavian (`#203227`) beraksen kartu hangat (`#26382E`).
  - [x] Layout 2-kolom: Kiri copy editorial penutup ("Satu langkah kecil menuju *rumah impian.*"), deskripsi, nomor WhatsApp marketing terformat, dan jam layanan.
  - [x] Kanan kartu form inline interaktif (input Nama, nomor WhatsApp, dropdown Kebutuhan/Tipe Rumah) dengan validasi client-side seketika.
  - [x] Integrasi `useConsultationForm()`: alur reCAPTCHA + submit Google Sheets Palastri, pesan sukses hangat dengan tombol fallback WhatsApp langsung berisikan pesan prefilled otomatis.
- [x] `components/TheFooter.vue` [MODIFY]:
  - [x] Reskin total dengan background `#26382E` dan border halus `white/10`.
  - [x] 3 Kolom grid desktop (1.25fr : 0.75fr : 1fr): Brand & lockup developer "SIG.", navigasi cepat Jelajahi (`#beranda`, `#tentang`, `#tipe`, `#keunggulan`, `#lokasi`, `#faq`), serta kontak resmi & kantor pemasaran.
  - [x] Bottom bar hak cipta Palastri dan kredit by Sanggar Indah Group.
- [x] `pages/index.vue` [MODIFY]:
  - [x] Daftarkan dan tempatkan `<LocationSection />` tepat sebelum `<FaqSection />`.
  - [x] Alur utuh landing page: `TheHeader` → `HeroSection` → `TrustStrip` → `KprPartnerStrip` → `AboutSection` → `ProductsSection` → `WhySection` → `LocationSection` → `FaqSection` → `FinalCtaSection` → `TheFooter`.

---

## Rincian Eksekusi Fase E (Floating WA, Header Konsultasi, Reskin Modals, Cleanup Aset Yatim)

### Checklist Task Builder (`frontend-agent`):
- [x] `components/TheHeader.vue`:
  - [x] Navigasi CTA Konsultasi langsung mengarah ke WhatsApp resmi via `wa('konsultasi')` dengan `target="_blank"` dan `rel="noopener noreferrer"`.
  - [x] Sinkronisasi link CTA pada navbar desktop maupun dropdown panel mobile menu.
- [x] `components/WhatsAppFloatingButton.vue`:
  - [x] Pembersihan tuntas hack `fixed top-3 right-20` yang menumpuk di atas navbar saat scroll di posisi puncak.
  - [x] Reskin FAB WhatsApp utama dengan warna brand hijau WhatsApp `#25D366` / `var(--green)`, ikon SVG tajam, dan bayangan lembut.
  - [x] Reskin 4 opsi menu pop-up (Syarat KPR BCA, Syarat KPR BTN, Formulir Member Get Member, dan Chat WhatsApp langsung) serta tombol penutup (✕) dengan design tokens Palastri.
  - [x] Penempatan ergonomis di pojok kanan bawah (`bottom-5 right-5`) dengan proteksi layout agar tidak menutupi form/footer di mobile.
- [x] `components/KprTermsModal.vue`:
  - [x] Reskin total dialog menggunakan tokens Palastri (`var(--white)`, border `var(--line)`).
  - [x] Header tipografi Fraunces (`font-serif text-[var(--ink)]`) dengan logo perbankan berlatar putih dan ring halus.
  - [x] Navigasi tabs berlatar `var(--sage-pale)` dengan tab aktif putih berbayang halus.
  - [x] Checklist dan kotak catatan bernuansa `var(--sage-pale)` & `var(--green)`.
  - [x] Tombol CTA konsultasi WhatsApp menggunakan green pill button `.btn-primary`.
- [x] `components/MemberGetMemberModal.vue`:
  - [x] Reskin tema dialog, judul Fraunces, dan font sans untuk input form.
  - [x] Checkbox dan aksen input menggunakan `accent-[var(--green)]`.
  - [x] Tombol "Cek Kode" dan tombol submit "Kirim Pendaftaran" diubah ke pill hijau `.btn-primary` (`var(--green)`).
  - [x] Sinkronisasi payload form pendaftaran dengan `source: 'landing-page-palastri'`.
- [x] `components/ReferralWelcomeModal.vue`:
  - [x] Reskin banner atas ke forest green deep `#26382E`.
  - [x] Tombol aksi diubah ke green pill `.btn-primary` (`var(--green)`).
  - [x] Session storage key diubah dari prefix Parahyangan ke `palastri:referral-welcome:`.
- [x] `composables/useConsultationForm.js`:
  - [x] Fallback source default pada formulir diperbarui dari `landing-page-sipar` ke `landing-page-palastri`.
- [x] Pembersihan Aset & Komponen Yatim (*Orphaned Assets Cleanup*):
  - [x] Hapus komponen mati `components/ReasonsCardsSection.vue` (sudah digantikan oleh `WhySection.vue`).
  - [x] Hapus 20+ file gambar warisan Parahyangan: `2260-3d-ilustrasi.webp`, `2260-denah.webp`, `2672-3d-ilustrasi.webp`, `2672-denah.webp`, `3672-3d-ilustrasi.webp`, `3672-denah.webp`, `hero-mobile.webp`, `hero.webp`, `kenapa.webp`, `logo.webp`, `mascot.webp`, `petalokasi-v2.webp`, `signage-glow-mobile.webp`, `signage-glow.webp`, `signage-letters-mobile.webp`, `signage-letters.webp`, `signgate.webp`.
  - [x] Hapus folder aset lawas `public/assets/images/fasilitas/` dan `public/assets/images/rumah/`.
  - [x] Hapus file mentah pra-crop di `public/assets/images/palastri/`: `sip 2260.png`, `sip 2260 denah.jpg`, `sip 3172.jpg`, `sip 3172 denah.jpg`.

---

## Rincian Eksekusi Polish Tipografi, Header Sticky, Logo SIG & WhySection USP (2026-11-03)

### Checklist Task Builder (`frontend-agent`):
- [x] **Tipografi Brand & Desain:**
  - [x] Pendaftaran font lokal Dream Orphans (`Dream Orphans.otf`, `Dream Orphans Bd.otf`, `Dream Orphans It.otf`, `Dream Orphans Bd It.otf`) di `public/assets/fonts/` via `@font-face` di `assets/css/base.css` dengan `font-display: swap`.
  - [x] Pemuatan Google Fonts Poppins (weights 300, 400, 500, 600, 700) di `nuxt.config.ts`.
  - [x] Konfigurasi font family di `tailwind.config.js`: `display` & `serif` diarahkan ke `'Dream Orphans'`, `body` & `sans` diarahkan ke `'Poppins'`.
  - [x] Konfigurasi tokens CSS di `assets/css/tokens.css`: `--serif: 'Dream Orphans', Georgia, sans-serif;` dan `--sans: 'Poppins', sans-serif;`.
- [x] **TheHeader & Sticky Navigation Global:**
  - [x] Penambahan logo SIG (`content.meta.logoGroupDark` / `logo-sig-dark.png`) berdampingan dengan logo Palastri dan dibatasi garis pemisah vertikal (`h-5 sm:h-6 w-px bg-[var(--line)]`).
  - [x] Perbaikan posisi sticky navigation secara global: memindahkan `<TheHeader />` ke root level `pages/index.vue` di luar pembungkus fold desktop 1-layar, sehingga navbar selalu menempel di `top: 0` saat pengguna menggulir ke seluruh section halaman.
  - [x] Responsivitas mobile brand lockup disesuaikan agar tidak overflow pada viewport sempit (375px - 390px).
- [x] **WhySection (Keunggulan / USP Card):**
  - [x] Transformasi icon list menjadi 5 list item dummy USP dengan gambar representatif di sisi kanan:
    1. `01` — Akses Dekat Pintu Tol (`/assets/images/palastri/about-small.jpg`)
    2. `02` — Bebas Banjir & Udara Asri (`/assets/images/palastri/about-main.jpg`)
    3. `03` — Fasilitas Kawasan Mandiri (`/assets/images/palastri/hero.jpg`)
    4. `04` — Keamanan 24 Jam & One Gate (`/assets/images/palastri/rumah/3172-3d.jpg`)
    5. `05` — Nilai Investasi Menjanjikan (`/assets/images/palastri/rumah/2260-3d.png`)
  - [x] Konfigurasi data terpusat di `data/content.js` pada `content.why.items`.
  - [x] Penanganan mapping path gambar dengan resolusi base URL di `composables/useContent.js` (`withBase`).
  - [x] Styling thumbnail gambar USP (`.why-visual`, `.why-thumb`) dengan border halus, radius 14px (desktop) / 12px (mobile), shadow lembut, dan fallback simbol bila gambar tidak didefinisikan.
- [x] **LocationSection:**
  - [x] Pinpoint koordinat kustom pada maps di-skip sesuai arahan user.

---

## Rincian Eksekusi Refactoring Modal Detail Unit Compact (2026-11-03)

### Acuan Desain & Dokumen:
- **Komponen:** `components/HouseTypeModal.vue`
- **Spesifikasi Acuan:** `docs/00-Design Guide Modal Detail Unit (Compact).md`
- **Rencana Kerja:** `plan-modal-detail-unit-compact.md`
- **Status Implementasi:** **selesai (PASS QA)**

### Checklist Task Builder (`frontend-agent`):
- [x] **Struktur 3-Zona Layout Kokoh (Rigid 3-Zone Architecture):**
  - [x] **Zona 1 - Header Pinned Top (1 Baris):**
    - Judul tipe rumah (`font-serif`, Dream Orphans `text-ink` 22px mobile / 24px desktop).
    - 4 chip spesifikasi ringkas bernuansa sage (`bg-sage-pale text-green-deep border border-line rounded-full px-2.5 py-1 text-xs font-semibold`): Luas Bangunan (LB), Luas Tanah (LT), Kamar Tidur (KT), Kamar Mandi (KM) dengan icon mini SVG proporsional.
    - Kontainer chip horizontal `overflow-x-auto no-scrollbar` (mencegah line wrap pada mobile).
    - Tombol tutup bulat 32px (`h-8 w-8 rounded-full border border-line bg-white text-ink`) dengan hover halus Palastri (`hover:border-green hover:bg-sage-pale hover:text-green-deep`).
  - [x] **Zona 2 - Body Fleksibel (Single Visual Stage & Panel Spesifikasi):**
    - Kontainer `p-3 sm:p-4 space-y-2.5 overflow-y-auto overscroll-contain flex-1`.
    - **Tab Segmented Control:** Wadah `bg-paper-deep/60 border border-line p-1 rounded-xl flex gap-1` untuk transisi instan antar slide fasad (`Tampak Depan`, `Perspektif`) dan denah arsitektur (`Denah`).
    - **Single Visual Stage:** Wadah panggung visual tunggal berketinggian 280px di desktop (`sm:h-[280px]`) dan 220px di mobile (`h-[220px]`). Gambar fasad dengan `object-cover` dan denah arsitektur dengan `object-contain p-2 bg-white` agar skala denah tidak terpotong tepi stage.
    - **Caption Pill & Navigasi Panah Stage:** Pill caption semitransparan `bg-green-deep/85` di kiri atas dan tombol panah bolak-balik melingkar (*cyclic carousel*) di kanan bawah.
    - **Integrasi Lightbox:** Klik pada visual stage membuka penampil gambar resolusi tinggi via composable `useLightbox()` (`openLightboxFromStage()`).
    - **Panel Spesifikasi Berbingkai (Single Bordered Panel):** 1 wadah berbingkai terpadu (`rounded-xl border border-line bg-white p-3 sm:p-3.5 shadow-xs`) dengan 9 item teknis (Pondasi, Struktur, Dinding, Lantai, Atap, Kusen, Pintu, Listrik, Air) dilengkapi icon outline SVG warna `text-green` bergaris konsisten `stroke-width="1.7"`.
    - **Responsivitas Grid Spesifikasi:** 3 kolom di desktop / lebar ≥ 520px (`min-[520px]:grid-cols-3 gap-x-3 gap-y-2.5`), dan 2 kolom di mobile (`grid-cols-2`) dengan item ke-9 (Air) membentang 2 kolom penuh (`last:col-span-2 min-[520px]:last:col-span-1`) agar baris penutup tetap simetris.
  - [x] **Zona 3 - Footer Pinned Bottom (Action & Compliance):**
    - Terkunci di dasar modal (`bg-white border-t border-line shrink-0 px-4 py-2.5 sm:px-5 sm:py-3`).
    - Tombol WhatsApp CTA dengan pesan prefilled otomatis berbasis tipe unit via `wa('type', { type: type.name })`.
    - Catatan perlindungan konsumen (*"Konsumen tidak dapat merubah/merenovasi bangunan sebelum proses serah terima unit"*).
    - Responsif: Bersebelahan 1 baris di desktop (`min-[520px]`), dan bertumpuk vertikal dengan tombol WhatsApp membentang full-width di mobile.
- [x] **Aksesibilitas & Interaksi Keyboard:**
  - [x] Kontainer modal mengimplementasikan `role="dialog"`, `aria-modal="true"`, dan dynamic `aria-label`.
  - [x] Segmented control menggunakan `role="tablist"` dan `role="tab"` dengan aria state dinamis.
  - [x] Pintasan keyboard: Tombol `Escape` menutup modal, tombol panah `ArrowLeft` & `ArrowRight` berpindah slide visual bolak-balik secara melingkar (*cyclic*).
  - [x] Body scroll locking aktif saat modal dibuka dan dinonaktifkan kembali saat modal ditutup.

---

## Log Debugging, Temuan & Catatan Teknis

### Log Verifikasi Fase A (`qa-agent` - 2026-10-30):
- **Build test:** PASS (`npm run build` & `npx nuxi generate` exit code 0).
- **Playwright browser test:** PASS pada viewport Desktop (1280x800), Tablet (768x1024), dan Mobile (375x667).
- **Computed styles valid:** `body` background `#f6f5ef`, font `DM Sans`, color `#26352e`.
- **Network test:** 29 requests 200 OK (0 error, 0 404).
- **Interaktivitas elemen:** Modal detail rumah, FAQ accordion, WA floating, dan MGM modal teruji interaktif dan berfungsi normal.
- **Tautan bukti visual screenshot:**
  - Desktop 1280x800: [screenshot-desktop-1280.png](file:///C:/Users/Salivs/.gemini/antigravity/brain/dac76ce9-aabb-42b7-9cb5-a3fafc507b0f/screenshot-desktop-1280.png)
  - Tablet 768x1024: [screenshot-tablet-768.png](file:///C:/Users/Salivs/.gemini/antigravity/brain/dac76ce9-aabb-42b7-9cb5-a3fafc507b0f/screenshot-tablet-768.png)
  - Mobile 375x667: [screenshot-mobile-375.png](file:///C:/Users/Salivs/.gemini/antigravity/brain/dac76ce9-aabb-42b7-9cb5-a3fafc507b0f/screenshot-mobile-375.png)

### Log Verifikasi Fase B (`qa-agent` - 2026-11-02):
- **Build test:** PASS (`npm run build` & `npx nuxi generate` exit code 0).
- **Runtime console & network:** 0 error console JS, 0 network 404 pada aset.
- **Playwright browser test:** PASS pada Desktop (1280x800), Tablet (768x1024), dan Mobile (375x667).
- **Interaksi mobile menu:** PASS (hamburger toggle membuka panel dropdown, klik link navigasi otomatis menutup panel dan scroll ke anchor tujuan, tombol Escape menutup panel).
- **Catatan untuk Fase E:** Docking `top-3 right-20` pada `WhatsAppFloatingButton.vue` lawas akan dirombak di Fase E agar serasi dengan layout baru.
- **Tautan bukti screenshot:**
  - Desktop 1280x800: [fase-b-desktop-1280.png](file:///C:/Users/Salivs/.gemini/antigravity/brain/1aab42a4-17e8-40c4-b354-d8ea9aa1aedb/fase-b-desktop-1280.png)
  - Tablet 768x1024: [fase-b-tablet-768.png](file:///C:/Users/Salivs/.gemini/antigravity/brain/1aab42a4-17e8-40c4-b354-d8ea9aa1aedb/fase-b-tablet-768.png)
  - Mobile 375x667: [fase-b-mobile-375.png](file:///C:/Users/Salivs/.gemini/antigravity/brain/1aab42a4-17e8-40c4-b354-d8ea9aa1aedb/fase-b-mobile-375.png)
  - Mobile Menu Open: [fase-b-mobile-menu-open.png](file:///C:/Users/Salivs/.gemini/antigravity/brain/1aab42a4-17e8-40c4-b354-d8ea9aa1aedb/fase-b-mobile-menu-open.png)

### Log Verifikasi 1-Layar Penuh / Above-the-Fold (`qa-agent` - 2026-11-02):
- **Desktop 1280x800:** Header 77px + Hero 595px + TrustStrip 78px + KprPartnerStrip 50px = tepat 800px (100% pas dalam 1 layar tanpa scroll awal).
- **Tablet 768x1024:** Total fold ~990px dari 1024px muat dalam 1 layar penuh.
- **Mobile 375x667:** Adaptive fluid scroll, zero horizontal overflow (`scrollWidth`: 360px <= 375px).
- **Tautan screenshot terbaru:**
  - Desktop 1280x800: [above-the-fold-desktop-1280.png](file:///C:/Users/Salivs/.gemini/antigravity/brain/1aab42a4-17e8-40c4-b354-d8ea9aa1aedb/above-the-fold-desktop-1280.png)
  - Tablet 768x1024: [above-the-fold-tablet-768.png](file:///C:/Users/Salivs/.gemini/antigravity/brain/1aab42a4-17e8-40c4-b354-d8ea9aa1aedb/above-the-fold-tablet-768.png)
  - Mobile 375x667: [above-the-fold-mobile-375.png](file:///C:/Users/Salivs/.gemini/antigravity/brain/1aab42a4-17e8-40c4-b354-d8ea9aa1aedb/above-the-fold-mobile-375.png)

### Log Verifikasi Proporsi Arch Foto Hero 0.82 (`qa-agent` - 2026-11-02):
- **1440x900 Desktop (Layar Lebar):** Lebar 428.03px, Tinggi 522.00px, Rasio 0.81998 (~0.82), bentuk arch potret ramping presisi (PASS).
- **1280x800 Desktop (Standar):** Lebar 410.00px, Tinggi 500.00px, Rasio 0.82000 (eksak 0.82), akumulasi fold tepat 800px (100% muat 1 layar) (PASS).
- **Tautan screenshot terbaru:**
  - 1440x900 Desktop: [hero-arch-exact-1440.png](file:///C:/Users/Salivs/.gemini/antigravity/brain/1aab42a4-17e8-40c4-b354-d8ea9aa1aedb/hero-arch-exact-1440.png)
  - 1280x800 Desktop: [hero-arch-exact-1280.png](file:///C:/Users/Salivs/.gemini/antigravity/brain/1aab42a4-17e8-40c4-b354-d8ea9aa1aedb/hero-arch-exact-1280.png)

### Log Verifikasi Fase C (`qa-agent` - 2026-11-02):
- **Build test:** PASS (`npm run build` & `npx nuxi generate` exit code 0).
- **Runtime console & network:** 0 JavaScript console error, 0 network 404 pada seluruh aset (gambar fasad, denah 3D, foto Scandinavian, font).
- **Playwright browser test:** PASS pada Desktop (1280x800), Tablet (768x1024), dan Mobile (375x667).
- **Interaksi modal tipe rumah:** PASS (klik tombol "Lihat Detail" pada kartu tipe 31/72 dan 22/60 sukses membuka `HouseTypeModal`, pratinjau denah/fasad berfungsi, tombol close & Escape menutup modal kembali tanpa kendala).
- **Responsivitas & Layout Check:**
  - `AboutSection.vue`: Layout asimetris Scandinavian proporsional, floating badge `01` dan signature lockup tampil harmonis.
  - `ProductsSection.vue`: Watermark latar "PALASTRI" tidak menyebabkan horizontal overflow; 2 kartu produk tersusun 2-kolom di desktop/tablet dan 1-kolom di mobile.
  - `WhySection.vue`: Sticky intro kiri beroperasi mulus di desktop dan unstick menjadi aliran vertikal natural di mobile.
- **Tautan bukti visual screenshot:**
  - Desktop 1280x800: [fase-c-desktop-1280.png](file:///C:/Users/Salivs/.gemini/antigravity/brain/1a13e94d-5fce-4ed6-acf9-b49be56a3236/fase-c-desktop-1280.png)
  - Modal Detail Terbuka: [fase-c-modal-open.png](file:///C:/Users/Salivs/.gemini/antigravity/brain/1a13e94d-5fce-4ed6-acf9-b49be56a3236/fase-c-modal-open.png)
  - Mobile 375x667: [fase-c-mobile-375.png](file:///C:/Users/Salivs/.gemini/antigravity/brain/1a13e94d-5fce-4ed6-acf9-b49be56a3236/fase-c-mobile-375.png)

### Log Verifikasi Fase D (`qa-agent` - 2026-11-03):
- **Build test:** PASS (`npm run build` & `npx nuxi generate` exit code 0).
- **Runtime console & network:** 0 JavaScript console error, 0 network 404 pada seluruh aset & iframe Maps.
- **Playwright multi-viewport browser test:** PASS pada Desktop Luas (1440x900), Desktop Standar (1280x800), Tablet (768x1024), dan Mobile (375x667).
- **Validasi Accordion FAQ (1-item aktif):**
  - Item pertama `f1` default terbuka saat load.
  - Klik item `f2` sukses membuka `f2` dan seketika menutup `f1` (mutual-exclusion).
  - Klik ulang item yang sedang terbuka menutup item tersebut (`openFaqId = null`).
  - Indikator (+) bulat berotasi 45° dengan transisi warna sage → green.
- **Validasi Form Kontak & WhatsApp Prefilled:**
  - Validasi form inline aktif (mencegah submit jika nama kosong / < 2 karakter, atau nomor telepon < 9 digit).
  - Generator fallback WhatsApp prefilled otomatis merangkai nama dan kebutuhan unit ke format pesan resmi marketing.
  - Opsi dropdown minat unit hunian (Belum menentukan, Tipe 31/72 Komersial, Tipe 22/60 Subsidi, Jadwal survei lokasi) bekerja responsif di seluruh layar.
- **Responsivitas & Layout Check:**
  - `LocationSection.vue`: Split card 2-kolom rapi di desktop, bertumpuk vertikal natural di mobile; iframe Google Maps responsif tanpa layout overflow.
  - `FinalCtaSection.vue`: Form input terlihat tajam dengan kontras tinggi di atas latar forest green (`#203227`), input focus ring beraksen sage green.
  - `TheFooter.vue`: Tata letak 3-kolom desktop bertransformasi menjadi 1-kolom mobile dengan spasi nyaman dan seluruh tautan navigasi anchor aktif.
- **Tautan bukti visual tangkapan layar (`docs/qa-evidence/fase-d/`):**
  - Desktop 1440x900:
    - [desktop-1440-lokasi.png](file:///c:/Users/Salivs/Data/laragon/www/landingpage-sip/docs/qa-evidence/fase-d/desktop-1440-lokasi.png)
    - [desktop-1440-faq-awards.png](file:///c:/Users/Salivs/Data/laragon/www/landingpage-sip/docs/qa-evidence/fase-d/desktop-1440-faq-awards.png)
    - [desktop-1440-kontak.png](file:///c:/Users/Salivs/Data/laragon/www/landingpage-sip/docs/qa-evidence/fase-d/desktop-1440-kontak.png)
    - [desktop-1440-footer.png](file:///c:/Users/Salivs/Data/laragon/www/landingpage-sip/docs/qa-evidence/fase-d/desktop-1440-footer.png)
  - Desktop 1280x800:
    - [desktop-1280-lokasi.png](file:///c:/Users/Salivs/Data/laragon/www/landingpage-sip/docs/qa-evidence/fase-d/desktop-1280-lokasi.png)
    - [desktop-1280-kontak.png](file:///c:/Users/Salivs/Data/laragon/www/landingpage-sip/docs/qa-evidence/fase-d/desktop-1280-kontak.png)
  - Tablet 768x1024:
    - [tablet-768-lokasi.png](file:///c:/Users/Salivs/Data/laragon/www/landingpage-sip/docs/qa-evidence/fase-d/tablet-768-lokasi.png)
    - [tablet-768-kontak.png](file:///c:/Users/Salivs/Data/laragon/www/landingpage-sip/docs/qa-evidence/fase-d/tablet-768-kontak.png)
    - [tablet-768-footer.png](file:///c:/Users/Salivs/Data/laragon/www/landingpage-sip/docs/qa-evidence/fase-d/tablet-768-footer.png)
  - Mobile 375x667:
    - [mobile-375-lokasi.png](file:///c:/Users/Salivs/Data/laragon/www/landingpage-sip/docs/qa-evidence/fase-d/mobile-375-lokasi.png)
    - [mobile-375-map.png](file:///c:/Users/Salivs/Data/laragon/www/landingpage-sip/docs/qa-evidence/fase-d/mobile-375-map.png)
    - [mobile-375-kontak.png](file:///c:/Users/Salivs/Data/laragon/www/landingpage-sip/docs/qa-evidence/fase-d/mobile-375-kontak.png)
    - [mobile-375-footer.png](file:///c:/Users/Salivs/Data/laragon/www/landingpage-sip/docs/qa-evidence/fase-d/mobile-375-footer.png)

### Log Verifikasi Fase E (`qa-agent` - 2026-11-03):
- **Build test:** PASS (`npm run build` & `npx nuxi generate` exit code 0).
- **Playwright multi-viewport browser test:** PASS pada Desktop Luas (1440x900), Desktop Standar (1280x800), Tablet (768x1024), dan Mobile (375x667).
- **Runtime console & network:**
  - 0 error JavaScript console pada seluruh viewport pengujian.
  - 0 broken image / 404 (seluruh 30 elemen gambar pada landing page termuat sempurna HTTP 200 OK pasca pembersihan aset yatim).
- **Validasi Header CTA & Eliminasi Overlap:**
  - Tombol CTA "Konsultasi ↗" di navbar desktop maupun mobile menu terhubung langsung ke link WhatsApp resmi `https://wa.me/6281222226683?text=Halo%20Admin%20Sanggar%20Indah%20Palastri...` via `wa('konsultasi')` dengan `target="_blank"`.
  - Hack `fixed top-3 right-20` tuntas dihapus, header di posisi paling atas (`top: 0`) bersih dari tumpang tindih elemen.
- **Validasi WhatsApp Floating Button (FAB) & Menu Interaktif:**
  - FAB berlatar hijau `#25D366` / `var(--green)` terletak ergonomis di `bottom-5 right-5` dengan bayangan lembut, tidak menutupi input atau tombol submit form `FinalCtaSection` di layar mobile 375px.
  - Klik FAB membuka pop-up menu 4 opsi (KPR BCA, KPR BTN, Form MGM, dan Chat WhatsApp Langsung) secara mulus.
  - Tombol penutup (✕) menutup menu kembali dengan transisi bersih.
- **Validasi Reskin Modal (KPR & Member Get Member):**
  - Klik "Syarat KPR BCA" & "Syarat KPR BTN" membuka `KprTermsModal` bertema Palastri (Fraunces header, border token `var(--line)`, tab `var(--sage-pale)`, tombol konsultasi hijau). Tab Karyawan, Joint Income, dan Unit Subsidi dapat berpindah mulus.
  - Klik "Isi Form Member Get Member" membuka `MemberGetMemberModal` dengan styling hijau Palastri, input fields responsif, dan tombol submit bertema hijau.
- **Tautan bukti visual tangkapan layar (`docs/qa-evidence/fase-e/`):**
  - Desktop 1440x900:
    - [desktop-1440-header-fab.png](file:///c:/Users/Salivs/Data/laragon/www/landingpage-sip/docs/qa-evidence/fase-e/desktop-1440-header-fab.png)
    - [desktop-1440-fab-menu-open.png](file:///c:/Users/Salivs/Data/laragon/www/landingpage-sip/docs/qa-evidence/fase-e/desktop-1440-fab-menu-open.png)
    - [desktop-1440-modal-kpr-bca.png](file:///c:/Users/Salivs/Data/laragon/www/landingpage-sip/docs/qa-evidence/fase-e/desktop-1440-modal-kpr-bca.png)
    - [desktop-1440-modal-kpr-btn.png](file:///c:/Users/Salivs/Data/laragon/www/landingpage-sip/docs/qa-evidence/fase-e/desktop-1440-modal-kpr-btn.png)
    - [desktop-1440-modal-mgm.png](file:///c:/Users/Salivs/Data/laragon/www/landingpage-sip/docs/qa-evidence/fase-e/desktop-1440-modal-mgm.png)
  - Desktop 1280x800:
    - [desktop-1280-header-fab.png](file:///c:/Users/Salivs/Data/laragon/www/landingpage-sip/docs/qa-evidence/fase-e/desktop-1280-header-fab.png)
    - [desktop-1280-fab-menu-open.png](file:///c:/Users/Salivs/Data/laragon/www/landingpage-sip/docs/qa-evidence/fase-e/desktop-1280-fab-menu-open.png)
    - [desktop-1280-modal-kpr.png](file:///c:/Users/Salivs/Data/laragon/www/landingpage-sip/docs/qa-evidence/fase-e/desktop-1280-modal-kpr.png)
    - [desktop-1280-modal-mgm.png](file:///c:/Users/Salivs/Data/laragon/www/landingpage-sip/docs/qa-evidence/fase-e/desktop-1280-modal-mgm.png)
  - Tablet 768x1024:
    - [tablet-768-header-fab.png](file:///c:/Users/Salivs/Data/laragon/www/landingpage-sip/docs/qa-evidence/fase-e/tablet-768-header-fab.png)
    - [tablet-768-fab-menu-open.png](file:///c:/Users/Salivs/Data/laragon/www/landingpage-sip/docs/qa-evidence/fase-e/tablet-768-fab-menu-open.png)
    - [tablet-768-modal-kpr.png](file:///c:/Users/Salivs/Data/laragon/www/landingpage-sip/docs/qa-evidence/fase-e/tablet-768-modal-kpr.png)
    - [tablet-768-modal-mgm.png](file:///c:/Users/Salivs/Data/laragon/www/landingpage-sip/docs/qa-evidence/fase-e/tablet-768-modal-mgm.png)
  - Mobile 375x667:
    - [mobile-375-header-fab.png](file:///c:/Users/Salivs/Data/laragon/www/landingpage-sip/docs/qa-evidence/fase-e/mobile-375-header-fab.png)
    - [mobile-375-menu-open.png](file:///c:/Users/Salivs/Data/laragon/www/landingpage-sip/docs/qa-evidence/fase-e/mobile-375-menu-open.png)
    - [mobile-375-fab-menu-open.png](file:///c:/Users/Salivs/Data/laragon/www/landingpage-sip/docs/qa-evidence/fase-e/mobile-375-fab-menu-open.png)
    - [mobile-375-modal-kpr.png](file:///c:/Users/Salivs/Data/laragon/www/landingpage-sip/docs/qa-evidence/fase-e/mobile-375-modal-kpr.png)
    - [mobile-375-modal-mgm.png](file:///c:/Users/Salivs/Data/laragon/www/landingpage-sip/docs/qa-evidence/fase-e/mobile-375-modal-mgm.png)
    - [mobile-375-form-and-fab.png](file:///c:/Users/Salivs/Data/laragon/www/landingpage-sip/docs/qa-evidence/fase-e/mobile-375-form-and-fab.png)

### Log Verifikasi Tipografi, Header Sticky, Logo SIG & WhySection USP (`qa-agent` - 2026-11-03):
- **Build test:** PASS (`npm run build` selesai tanpa error).
- **Playwright multi-viewport browser test:**
  - PASS pada Desktop (1440x900).
  - PASS pada Mobile Modern (390x844 - iPhone 12/13/14).
  - PASS pada Mobile Standar (375x812 - iPhone X/Mini).
- **Runtime console & network:**
  - 0 JavaScript console error.
  - 0 network request gagal / 404 (seluruh font lokal Dream Orphans, font Poppins dari Google Fonts CDN, gambar USP WhySection, dan logo SIG termuat dengan HTTP 200 OK).
- **Verifikasi Sticky Header Global:**
  - `<TheHeader />` terbukti secara konsisten menempel di `top: 0px` saat scroll dari Hero, About, Products, Why, Location, FAQ, hingga Footer baik pada Desktop (1440x900) maupun Mobile (390x844 & 375x812).
  - Logo SIG dan logo Palastri bersanding rapi dengan pemisah vertikal tanpa layout shift.
- **Verifikasi Tipografi & Font-face:**
  - Dream Orphans aktif pada heading display / serif (`.serif`, `h1`, `h2`, `h3`).
  - Poppins aktif pada body text, tombol, dan elemen navigasi.
- **Verifikasi WhySection 5 USP Item:**
  - Seluruh 5 poin USP tampil dengan urutan penomoran 01 s/d 05, copy deskripsi padat, dan gambar thumbnail di sebelah kanan dengan aspect ratio rapi dan responsif.
- **Catatan Pin Maps:** Fitur custom pin maps pada LocationSection di-skip sesuai arahan user.

### Log Verifikasi Refactoring HouseTypeModal Compact (`qa-agent` - 2026-11-03):
- **Build test:** PASS (`npm run build` selesai tanpa error, Nitro output terkompilasi bersih).
- **Playwright multi-viewport browser test:** PASS pada Desktop Standar (1280x720) dan Mobile (375x667).
- **Verifikasi Zero Desktop Overflow (1280x720):**
  - Modal muat 100% dalam satu layar desktop 720p tanpa scrollbar internal vertikal.
  - Nilai DOM terukur: `scrollHeight === clientHeight = 516px` (0px internal overflow, margin aman ~160px di bawah batas `max-h-[94vh]`).
  - Tiga zona layout (Header 1 baris, Single Visual Stage 280px + Panel 9 Spesifikasi berbingkai, Footer pinned WhatsApp CTA) tampil proporsional tanpa desak-desakan.
- **Verifikasi Mobile Simetris (375x667):**
  - Header: 4 chip sage (LB, LT, KT, KM) tidak wrapping baris dan dapat digulir horizontal mulus via `overflow-x-auto no-scrollbar`.
  - Visual Stage: Ketinggian adaptif 220px (`h-[220px]`), gambar denah arsitektur tampil utuh tanpa terpotong (`object-contain p-2 bg-white`).
  - Panel Spesifikasi: Grid 2 kolom rapi dengan item ke-9 (Air) membentang 2 kolom penuh (`last:col-span-2`), menciptakan tata letak simetris.
  - Footer Pinned: Tombol WhatsApp membentang selebar layar (*full-width button*) dengan catatan serah terima di bawahnya, terkunci di dasar layar ponsel.
- **Verifikasi Fungsional, Lightbox & Navigasi Keyboard:**
  - Tab segmented control responsif, transisi slide instan antara Tampak Depan, Perspektif, dan Denah.
  - Lightbox integration: Klik pada visual stage sukses mengeksekusi `openLightboxFromStage()`, membuka penampil gambar resolusi tinggi dengan kontrol zoom interaktif.
  - Cyclic carousel navigation: Tombol panah kiri/kanan pada panggung visual berfungsi melingkar bolak-balik tanpa batas ujung.
  - Aksesibilitas keyboard: Tombol `Escape` menutup modal dan mengembalikan fokus; tombol `ArrowLeft` / `ArrowRight` berpindah slide visual secara melingkar.
- **Runtime console & network:**
  - 0 JavaScript console error.
  - 0 network error / asset 404.
- **Tautan bukti visual tangkapan layar (`docs/qa-evidence/`):**
  - Desktop 1280x720: [modal-compact-desktop-1280.png](file:///c:/Users/Salivs/Data/laragon/www/landingpage-sip/docs/qa-evidence/modal-compact-desktop-1280.png)
  - Mobile 375x667: [modal-compact-mobile-375.png](file:///c:/Users/Salivs/Data/laragon/www/landingpage-sip/docs/qa-evidence/modal-compact-mobile-375.png)

### Log Awal:
- 2026-10-30: Branch `redesign-palastri` dibuat dari `master` (commit `dd954519c3977d0b36b0c17fb75dd388f582f44c`).
- Persiapan aset: file denah tipe 31/72 resolusi rendah (300x430 px) dicatat sebagai debt visual untuk diperbarui bila klien mengirim versi HQ.
- Integrasi reCAPTCHA & Sheets: `source` diatur ke `landing-page-palastri`. Default config di `nuxt.config.ts` dijaga agar fallback aman.

---

## Konteks untuk Fase F (QA Penuh & Dokumentasi Final)

- **Status:** **Siap dikerjakan** (Seluruh implementasi fitur dan visual Fase A, B, C, D, E, Polish Desain, dan Refactoring Modal Compact selesai 100% dan terverifikasi PASS).
- **Target Pekerjaan Fase F:**
  1. **Audit QA Menyeluruh & Regresi Lintas Browser/Viewport:**
     - Pengujian end-to-end dari atas ke bawah (Header → Hero → Trust → KPR → About → Products → Why → Location → FAQ → Final CTA → Footer).
     - Pengujian fungsionalitas seluruh tautan interaktif, modal (HouseType, KPR, MGM, Referral), accordion FAQ, dan lightbox galeri.
     - Verifikasi submit form konsultasi dan fallback WhatsApp generator.
  2. **Audit SEO & Metadata:**
     - Validasi Open Graph tags, Twitter card, canonical URL, sitemap, favicon, dan title/description Palastri di `nuxt.config.ts` dan `app.vue`.
  3. **Audit Kinerja & Aksesibilitas:**
     - Evaluasi Lighthouse / core web vitals dasar (CLS, LCP, FID).
     - Verifikasi kontras warna teks terhadap background token Palastri (`var(--ink)`, `var(--forest)`, `var(--paper)`).
  4. **Dokumentasi Final & Handoff:**
     - Penutupan progress tracker dan penyusunan catatan rilis final redesign Sanggar Indah Palastri.
     - Panduan serah terima dan langkah merge branch `redesign-palastri` ke branch utama (`master`).
- **Standar Eksekusi:**
  - Build produksi lulus bersih tanpa peringatan runtime (`npm run build` & `npx nuxi generate`).
  - Rekaman bukti QA lengkap dan ringkasan audit komprehensif.
