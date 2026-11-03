# Design Guide: Modal Detail Unit (Compact Single-Stage)

Panduan tata letak, hierarki komponen, dan sistem desain untuk modal detail tipe rumah (contoh: Tipe 22/60, Tipe 30/60, dsb.) pada proyek perumahan **Sanggar Indah Parahyangan (SIP)**. 

Dokumen ini menjadi acuan tunggal implementasi komponen [`HouseTypeModal.vue`](file:///c:/Users/Salivs/Data/laragon/www/sipar/components/HouseTypeModal.vue) agar selaras 100% dengan token resmi di [`tailwind.config.js`](file:///c:/Users/Salivs/Data/laragon/www/sipar/tailwind.config.js) dan spesifikasi arsitektur [`2026-11-03-modal-detail-unit-compact-design.md`](file:///c:/Users/Salivs/Data/laragon/www/sipar/docs/superpowers/specs/2026-11-03-modal-detail-unit-compact-design.md).

---

## 1. Prinsip Desain

- **Padat, bukan sesak (*Enlarged & Breathable*).** Menghilangkan elemen mubazir (seperti kartu per item spesifikasi atau judul seksi berulang) tanpa mengecilkan teks di bawah ambang keterbacaan normal. Format baru memperbesar modal ke lebar `max-w-[700px]` dan stage visual ke tinggi 280px agar foto fasad dan denah tampil megah.
- **Prinsip Zero Desktop Overflow.** Pada viewport laptop/desktop standar (1280×720 px), seluruh konten inti (identitas tipe, 4 chip ringkasan, stage visual, panel 9 spesifikasi teknis, tombol CTA WhatsApp, dan catatan legal) terbukti muat 100% dalam satu layar tanpa scrollbar vertikal internal (`scrollHeight === clientHeight`).
- **Satu Panggung Visual Terpadu (*Single Visual Stage*).** Foto tampak depan, perspektif 3D, dan denah arsitektur berbagi satu wadah panggung (*stage*) bertab *segmented control*. Dilarang menumpuk gambar-gambar tersebut secara vertikal.
- **Spesifikasi Berbingkai Efisien (*Single Bordered Panel*).** Sembilan spesifikasi material disatukan ke dalam satu wadah berbingkai dengan grid rapi dan icon garis emas SIP `#c9a84c` (stroke 1.7), bukan kartu-kartu terpisah.
- **CTA Selalu Terlihat (*Pinned Action Footer*).** Tombol WhatsApp dan catatan serah terima terkunci di dasar modal (*sticky/fixed footer*), tidak ikut tergulung saat bodi modal di-scroll pada layar ponsel sempit.

---

## 2. Struktur Layout (3-Zona)

Komposisi modal terbagi ke dalam 3 zona vertikal yang kokoh:

| Zona | Isi & Komponen | Perilaku Layout | Token Visual |
| :--- | :--- | :--- | :--- |
| **1. Header** | Judul tipe, 4 chip ringkasan (LB, LT, KT, KM), tombol close bulat | Tetap di atas (*shrink-0*), satu baris horizontal tanpa wrap | `bg-white`, border `border-cream-light`, teks `forest-deep` |
| **2. Body** | Tab *segmented control*, stage visual terpadu, panel 9 spesifikasi | Fleksibel (*flex-1*), scroll vertikal hanya jika viewport tidak mencukupi | Latar luar `bg-off-white`, jarak blok `space-y-2.5`, padding `p-3 sm:p-4` |
| **3. Footer** | Tombol CTA WhatsApp, catatan serah terima unit | Tetap di bawah (*shrink-0*), menempel pada dasar modal | `bg-white`, border `border-cream-light`, gradien `grad-wa` |

```
+-------------------------------------------------------------------------+
| 1. HEADER (Pinned Top, Single-line, bg-white, border-cream-light)       |
| [Judul Tipe]   [LB 22m²] [LT 60m²] [1 KT] [1 KM] (Sage Chips)     [ (X) ]|
+-------------------------------------------------------------------------+
| 2. BODY (bg-off-white, Zero Scrollbar di Desktop 1280x720)              |
|  [ Tampak Depan | Perspektif | Denah ]  <-- Segmented Tab (bg-cream/60)|
|  +-------------------------------------------------------------------+  |
|  | Visual Stage (sm:h-[280px] Desktop / h-[220px] Mobile)            |  |
|  | [Caption Pill: Forest Deep/85]                [ < ] [ > ] Nav Panah|  |
|  +-------------------------------------------------------------------+  |
|  +-------------------------------------------------------------------+  |
|  | Panel Spesifikasi (1 Wadah Berbingkai, border-cream-light, Grid)  |  |
|  | Pondasi | Struktur | Dinding | Lantai | Atap | Kusen              |  |
|  | Pintu   | Listrik  | Air (Icon Emas SIP #c9a84c stroke 1.7)       |  |
|  +-------------------------------------------------------------------+  |
+-------------------------------------------------------------------------+
| 3. FOOTER (Pinned Bottom, bg-white, border-cream-light)                 |
| [ WhatsApp: Tanya unit ini -> ]               [*Catatan serah terima]   |
+-------------------------------------------------------------------------+
```

---

## 3. Design Tokens

### A. Pemetaan Token Warna Resmi (Tailwind & CSS)

Seluruh warna menggunakan token resmi proyek yang terdaftar di [`tailwind.config.js`](file:///c:/Users/Salivs/Data/laragon/www/sipar/tailwind.config.js):

| Token Tailwind | Utility Class | Nilai HEX / Karakteristik | Peruntukan pada Modal |
| :--- | :--- | :--- | :--- |
| `forest-deep` | `text-forest-deep`<br>`bg-forest-deep` | `#1C4A2A` | Judul modal tipe, nilai spesifikasi, background tab aktif, teks chip ringkasan, pill caption, tombol panah stage, dan focus ring |
| `charcoal-gray` | `text-charcoal-gray` | `#6E7268` | Label kecil spesifikasi (uppercase), teks tab inaktif, teks catatan serah terima |
| `charcoal` | `bg-charcoal/60` | `#23271F` (60% + blur) | Backdrop overlay modal (`bg-charcoal/60 backdrop-blur-sm`) |
| `off-white` | `bg-off-white` | `#FBFAF6` | Latar belakang bodi modal dan area scroll luar |
| `white` | `bg-white`<br>`text-white` | `#FFFFFF` | Latar header, footer, stage gambar, dan panel spesifikasi; teks tab aktif & tombol WA |
| `cream-light` | `border-cream-light`<br>`bg-cream-light/60` | `#ECEAE1` | Semua garis pembatas (header, footer, stage, panel spesifikasi) & latar wadah tab segmented |
| `sage-pale` | `bg-sage-pale` | `#E4EFDD` | Latar belakang chip ringkasan spesifikasi di header (selaras dengan `Badge.vue`) |
| `sage-mist` | `border-sage-mist` | `#BFD8B6` | Border chip ringkasan spesifikasi di header |
| `accent-gold` | `text-[#c9a84c]` | `#c9a84c` | 9 Icon outline SVG spesifikasi teknis (stroke 1.7), focus ring aksen |
| `grad-wa` | `from-[#1cba5a] to-[#2eec72]` | Gradien Hijau WA | Tombol CTA WhatsApp dengan bayangan timbul `shadow-btn-wa` |
| `orange` | `text-orange`<br>`hover:border-orange/40` | `#EE8322` | State hover tombol tutup (`hover:border-orange/40 hover:bg-[#FFF4E6] hover:text-orange`) |

### B. Tipografi Dinamis

Tipografi mengikuti hierarki tipografi landing page SIP: font display serif untuk judul unit, dan font body sans-serif untuk seluruh teks fungsional.

| Peran Elemen | Font Family | Kelas Ukuran | Berat (Weight) | Tracking / Leading |
| :--- | :--- | :--- | :--- | :--- |
| **Judul Tipe** | `font-display` (`Cormorant Garamond`, serif) | 24px desktop (`sm:text-[24px]`), 22px mobile (`text-[22px]`) | Bold (700) | `leading-tight`, `lining-nums`, `whitespace-nowrap` |
| **Nilai Spesifikasi** | `font-body` (`Be Vietnam Pro`, sans) | 13px (`text-[13px]`) | Bold (700) | `leading-tight text-forest-deep truncate mt-0.5` |
| **Tombol WhatsApp** | `font-body` (`Be Vietnam Pro`, sans) | 13.5px (`text-[13.5px]`) | Semibold (600) | Kontras putih, tombol `shadow-btn-wa` |
| **Tab Segmented** | `font-body` (`Be Vietnam Pro`, sans) | 13px desktop (`sm:text-[13px]`), 12px mobile (`text-xs`) | Semibold (aktif: 600), Medium (inaktif: 500) | `transition-all` |
| **Chip Ringkasan** | `font-body` (`Be Vietnam Pro`, sans) | 12px (`text-xs`) | Semibold (600) | `whitespace-nowrap` |
| **Caption Visual Stage** | `font-body` (`Be Vietnam Pro`, sans) | 12px (`text-xs`) | Semibold (600) | `tracking-wide text-white` |
| **Catatan Serah Terima** | `font-body` (`Be Vietnam Pro`, sans) | 12px (`text-xs`) | Normal (400) | `leading-tight text-charcoal-gray` |
| **Label Spesifikasi** | `font-body` (`Be Vietnam Pro`, sans) | 11px (`text-[11px]`) | Semibold (600) | `uppercase tracking-wider text-charcoal-gray` |

> [!NOTE]
> Seluruh teks angka pada judul unit dan ukuran luas bangunan/tanah menggunakan angka proporsional terbaca (`lining-nums`). Teks serif murni dikhususkan untuk nama tipe rumah di header.

### C. Dimensi, Spacing, dan Radius

| Elemen | Nilai / Utility Tailwind | Keterangan & Perubahan |
| :--- | :--- | :--- |
| **Lebar Modal** | `max-w-[700px]` | Diperbesar dari batas lama 560px untuk kelegaan visual |
| **Batas Tinggi Modal** | `max-h-[94vh]` | Menggantikan pembatasan statis 720px untuk fleksibilitas layar dinamis |
| **Radius Sudut Modal** | `rounded-[20px]` | Elevasi bayangan: `shadow-[0_24px_60px_rgba(20,43,32,0.25)]` |
| **Padding Modal Luar** | `p-3 sm:p-4` | Jarak batas modal terhadap tepi viewport browser |
| **Padding Header** | `px-4 py-3 sm:px-5 sm:py-3.5` | Border bawah `border-b border-cream-light bg-white` |
| **Padding Body** | `p-3 sm:p-4` | Latar `bg-off-white` dengan jarak antar blok `space-y-2.5` (10px) |
| **Padding Footer** | `px-4 py-2.5 sm:px-5 sm:py-3` | Border atas `border-t border-cream-light bg-white` |
| **Tinggi Visual Stage** | `sm:h-[280px]` (desktop)<br>`h-[220px]` (mobile) | Diperbesar dari standar lama 230px / 200px |
| **Radius Stage & Panel**| `rounded-xl` (12px) | Border `border border-cream-light bg-white` |
| **Radius Tombol WhatsApp**| `rounded-btn` (11px) | Sesuai konfigurasi tombol resmi `borderRadius.btn` di Tailwind |
| **Radius Chip & Badge** | `rounded-full` (pill 999px) | Chip spesifikasi header dan caption pill stage |
| **Tombol Tutup** | `h-8 w-8 rounded-full` (32px) | Lingkaran dengan border tipis `border-cream-light` |

---

## 4. Komponen Terperinci

### A. Header (Single-line Header, Tetap di Atas)

Header dirancang dalam 1 baris datar horizontal (`flex items-center justify-between gap-3`):
1. **Sisi Kiri:** Judul tipe rumah (`font-display font-bold text-[22px] sm:text-[24px] text-forest-deep whitespace-nowrap`).
2. **Sisi Tengah:** Empat chip ringkasan bernuansa sage (`bg-sage-pale border border-sage-mist text-forest-deep`):
   - Luas Bangunan: `LB {type.lb} m²` (dengan icon rumah mini 12px `text-forest-deep/75`)
   - Luas Tanah: `LT {type.lt} m²` (dengan icon kavling mini 12px `text-forest-deep/75`)
   - Kamar Tidur: `{type.kt} KT` (dengan icon tempat tidur mini 12px `text-forest-deep/75`)
   - Kamar Mandi: `{type.km} KM` (dengan icon bathtub mini 12px `text-forest-deep/75`)
   - Wadah chip dilengkapi `overflow-x-auto no-scrollbar` agar tidak terjadi pembungkusan baris (*no line wrapping*) pada layar resolusi sempit.
3. **Sisi Kanan:** Tombol tutup lingkaran 32px (`h-8 w-8 rounded-full border border-cream-light bg-white`). Memiliki transisi hover interaktif khas landing page: `hover:border-orange/40 hover:bg-[#FFF4E6] hover:text-orange`.

### B. Tab Segmented Control

Kontrol navigasi visual diletakkan tepat di atas stage visual dengan wadah `rounded-xl border border-cream-light bg-cream-light/60 p-1`:
- Pilihan tab: **Tampak Depan**, **Perspektif**, dan **Denah**.
- State Tab Aktif: `bg-forest-deep font-semibold text-white shadow-sm rounded-lg px-2.5 py-1.5`.
- State Tab Inaktif: `font-medium text-charcoal-gray hover:text-forest-deep`.
- Transisi gambar instan tanpa jeda layout yang merusak ketinggian modal.

### C. Stage Visual Terpadu (Enlarged Stage & Lightbox)

Panggung visual tunggal untuk seluruh sudut pandang unit:
- **Dimensi:** Tinggi desktop **280px** (`sm:h-[280px]`) dan mobile **220px** (`h-[220px]`), radius `rounded-xl`, border `border-cream-light`.
- **Mode Render Gambar:**
  - Tampak Depan & Perspektif 3D: `object-cover` untuk menghadirkan ketajaman visual fasad.
  - Denah Arsitektur: `object-contain p-2 bg-white` untuk menjamin seluruh skala ruang, arsiran dinding, dan dimensi ukuran denah tidak terpotong tepi stage.
- **Caption Pill:** Terletak di kiri atas gambar dengan latar semitransparan `bg-forest-deep/85 text-white backdrop-blur-sm rounded-full px-2.5 py-0.5 text-xs font-semibold shadow-xs`.
- **Navigasi Panah Stage:** Dua tombol lingkaran di kanan bawah stage (`h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-forest-deep/80 text-white backdrop-blur-sm hover:bg-forest-deep`) untuk navigasi melingkar bolak-balik (*cyclic carousel*).
- **Integrasi Lightbox:** Klik langsung pada area panggung visual akan mengeksekusi `openLightboxFromStage()`, meneruskan data gambar ke composable `useLightbox()` untuk pembesaran resolusi tinggi dengan kemampuan zoom interaktif.

### D. Panel Spesifikasi Berbingkai (Single Bordered Panel)

Satu panel berbingkai terpadu (`rounded-xl border border-cream-light bg-white p-3 sm:p-3.5 shadow-xs`) yang menampung 9 item spesifikasi teknis unit:
- **Tata Letak Grid:**
  - Desktop (`min-[520px]`): 3 kolom (`grid-cols-3 gap-x-3 gap-y-2.5`).
  - Mobile (`< 520px`): 2 kolom (`grid-cols-2`), dengan item ke-9 (Air) membentang 2 kolom penuh (`last:col-span-2 min-[520px]:last:col-span-1`) agar baris penutup tetap simetris.
- **9 Icon Outline Emas SIP (`#c9a84c`):**
  - Menggunakan inline SVG murni berdimensi 18px (`h-[18px] w-[18px]`) dengan ketebalan garis konsisten `stroke-width="1.7"`.
  - Terdiri dari: **Pondasi**, **Struktur**, **Dinding**, **Lantai**, **Atap**, **Kusen**, **Pintu**, **Listrik**, dan **Air** (dilengkapi fallback default icon).
- **Hierarki Teks:**
  - Label spesifikasi di atas: 11px uppercase `font-semibold text-charcoal-gray tracking-wider leading-tight`.
  - Nilai spesifikasi di bawah: 13px `font-bold text-forest-deep truncate leading-tight mt-0.5`, dilengkapi atribut HTML `title` sebagai tooltip bawaan saat teks panjang terpotong.

### E. Fixed Action Footer & Catatan Serah Terima

Zona aksi konversi terkunci di bagian bawah modal:
- **Tombol WhatsApp CTA:**
  - Menggunakan gradien resmi landing page: `bg-gradient-to-r from-[#1cba5a] to-[#2eec72] text-white shadow-btn-wa rounded-btn (11px) px-4 py-2 text-[13.5px] font-semibold transition-all hover:brightness-105 active:scale-[0.99]`.
  - Dilengkapi ikon SVG WhatsApp 16px di kiri dan panah mini di kanan dengan teks lugas `"Tanya unit ini"`.
  - Tautan WhatsApp dinamis otomatis menyertakan nama tipe rumah via composable `useContent().wa('type', { type: type.name })`.
- **Catatan Perlindungan Konsumen:**
  - Teks resmi: `*Konsumen tidak dapat merubah/merenovasi bangunan sebelum proses serah terima unit.`
  - Warna `text-charcoal-gray text-xs font-normal leading-tight`.
- **Perilaku Responsif Footer:**
  - Desktop (`min-[520px]`): Bersebelahan dalam satu baris (WhatsApp di kiri, catatan di kanan rata kanan).
  - Mobile (`< 520px`): Bertumpuk vertikal dengan tombol WhatsApp membentang selebar 100% dan catatan rata tengah di bawah tombol.

---

## 5. Responsif & Prinsip Zero Desktop Overflow

### A. Evaluasi Zero Desktop Overflow pada Layar Desktop 720p (1280×720)

Layout dihitung secara matematis agar total ketinggian modal berada di bawah ambang batas container `max-h-[94vh]` (676.8 px pada viewport 720px):

| Komponen Modal | Dimensi Ketinggian Terukur | Detail Utility CSS |
| :--- | :--- | :--- |
| **Header (1 Baris)** | 56 px | `py-3 sm:py-3.5` + judul + border |
| **Segmented Tab Control** | 36 px | `p-1 py-1.5 text-xs sm:text-[13px]` + border |
| **Visual Stage (Desktop)** | 280 px | `sm:h-[280px]` + border |
| **Panel Spesifikasi (Grid 3×3)** | 98 px | `p-3 sm:p-3.5` + 3 baris item spesifikasi + `gap-y-2.5` |
| **Body Padding & Gaps** | 52 px | `p-3 sm:p-4` (32px) + 2x `space-y-2.5` (20px) |
| **Footer CTA & Catatan** | 54 px | `py-2.5 sm:py-3` + tombol WA `py-2` + border |
| **Total Akumulasi Tinggi Modal** | **~576 px** | **Margin aman: ~100.8 px di bawah 676.8 px** |
| **Status DOM Scroll** | **`scrollHeight === clientHeight`** | **PASS: 100% Zero internal scrollbar (0px)** |

### B. Breakpoint Responsif 520px

- **Desktop & Tablet (Lebar ≥ 520px):**
  - Panel spesifikasi tersusun 3 kolom presisi.
  - Footer tersusun horizontal dalam 1 baris.
  - Tinggi visual stage terkunci di 280px.
  - Judul tipe berukuran 24px (`sm:text-[24px]`).
- **Mobile (Lebar < 520px):**
  - Panel spesifikasi beralih menjadi 2 kolom; item ke-9 (Air) membentang 2 kolom penuh (`last:col-span-2`).
  - Footer beralih menjadi susunan bertumpuk vertikal (*full-width button*).
  - Tinggi visual stage menyesuaikan menjadi 220px (`h-[220px]`).
  - Judul tipe berukuran 22px (`text-[22px]`).
  - Area Body adalah satu-satunya wadah yang dapat di-scroll vertikal bila tinggi layar ponsel terbatas.

---

## 6. Aksesibilitas (a11y) & Interaksi Keyboard

- **Semantic Role & Dialog:** Kontainer utama memiliki `role="dialog"`, `aria-modal="true"`, dan `aria-label` yang merefleksikan nama tipe unit secara dinamis.
- **Tab Navigation & ARIA:** Wadah segmented control memakai `role="tablist"` dan tombol tab memakai `role="tab"` dengan state dinamis `:aria-selected="activeTabId === tab.id"`.
- **Keyboard Shortcuts:**
  - Tombol keyboard `Escape`: Menutup modal seketika dan mengembalikan fokus.
  - Tombol keyboard `ArrowLeft` / `ArrowRight`: Berpindah tab visual bolak-balik secara instan (*cyclic*).
- **Body Scroll Locking:** Saat modal terbuka, scrolling halaman latar belakang dimatikan otomatis via `document.body.style.overflow = 'hidden'`, dan dikembalikan normal saat modal tertutup.
- **Focus Rings Standar SIP:** Seluruh tombol interaktif (tab, panah stage, tombol tutup, dan WhatsApp) dilengkapi indikator fokus yang tegas: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-deep focus-visible:ring-offset-2`.
- **Kontras Rasio WCAG AA:** Rasio kontras teks `forest-deep` (#1C4A2A) dan `charcoal-gray` (#6E7268) terhadap latar putih/off-white melebihi 4.5:1, menjamin kenyamanan baca bagi seluruh pengguna.

---

## 7. Do dan Don't

| Do (Wajib Diterapkan) | Don't (Dilarang) |
| :--- | :--- |
| Pertahankan header satu baris dengan 4 chip sage dan judul berdampingan | Menambah subjudul panjang, tagline promosi, atau deskripsi di header |
| Gabungkan seluruh 9 spesifikasi dalam 1 panel berbingkai terpadu | Membungkus masing-masing spesifikasi ke dalam kartu individual terpisah (*card bloat*) |
| Gunakan satu panggung visual bertab untuk fasad, 3D, dan denah | Menumpuk foto fasad dan denah secara vertikal ke bawah |
| Gunakan outline inline SVG konsisten warna `#c9a84c` dengan garis 1.7 | Mencampur icon solid dengan outline atau memakai paket icon eksternal yang berat |
| Terapkan `object-contain p-2 bg-white` khusus untuk gambar denah arsitektur | Memotong denah dengan `object-cover` sehingga dimensi ruangan hilang |
| Potong nilai spesifikasi panjang dengan `truncate` dan sediakan atribut `title` | Membiarkan teks melipat ke baris baru dan merusak simetri baris grid |
| Kunci tombol WhatsApp dan catatan serah terima di dasar modal (*pinned footer*) | Menaruh tombol WhatsApp di dalam area scroll body yang bisa terkubur |
| Pertahankan prinsip Zero Desktop Overflow pada viewport 1280×720 | Menambah padding atau margin liar yang memicu vertical scrollbar di desktop |

---

## 8. Catatan Implementasi & Pemeliharaan

1. **Sinkronisasi Token Tailwind:** Seluruh token warna dan radius terikat langsung ke `tailwind.config.js`. Dilarang mendeklarasikan CSS variable mandiri yang berdiri sendiri tanpa sinkronisasi tema.
2. **Kesesuaian Aset Gambar:**
   - Foto fasad dan perspektif berasal dari `type.facades[0]` dan `type.facades[1]`.
   - Denah arsitektur diambil dari `type.gallery[0]`.
   - Jika aset fasad belum lengkap, sistem secara aman menggunakan fallback galeri dengan rasio yang terjaga.
3. **Ukuran Layar Standar QA:** Setiap pembaruan komponen wajib diuji pada resolusi desktop acuan `1280×720 px` untuk memastikan `scrollHeight === clientHeight` tetap terpenuhi, serta diuji pada resolusi mobile `375×667 px` dan `390×844 px`.
4. **Konsistensi Tautan WhatsApp:** Parameter teks otomatis yang dibuat oleh fungsi `wa('type', { type: type.name })` tidak boleh diubah secara sepihak agar tim marketing tetap dapat mengidentifikasi unit yang ditanyakan oleh calon pembeli.
