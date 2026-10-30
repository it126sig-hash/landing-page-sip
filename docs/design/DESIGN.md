# Sanggar Indah Palastri — Design Specification

> Dokumen acuan desain dan implementasi landing page Sanggar Indah Palastri.  
> Arah visual: **Natural Scandinavian × Modern Editorial**.  
> Status: **design mockup / draft**, belum menjadi spesifikasi final untuk publikasi.

---

## 1. Project overview

Sanggar Indah Palastri merupakan proyek hunian di bawah Sanggar Indah Group (SIG). Landing page perlu membangun identitas Palastri yang mandiri, tetapi tetap menunjukkan hubungan dengan developer induk.

Website harus terasa:

- **Natural** — dekat dengan alam, menggunakan warna bumi dan fotografi lingkungan.
- **Modern** — tata letak bersih, tipografi tegas, dan komponen yang sederhana.
- **Humanis** — berbicara tentang kehidupan dan kebutuhan keluarga, bukan hanya spesifikasi bangunan.
- **Accessible** — informasi pilihan hunian dan jalur konsultasi mudah ditemukan.

### Tujuan utama

1. Memperkenalkan Sanggar Indah Palastri dan hubungannya dengan Sanggar Indah Group.
2. Mengarahkan pengunjung untuk mengenal pilihan rumah.
3. Menjelaskan alasan memilih Palastri tanpa menggunakan klaim yang belum terverifikasi.
4. Memudahkan pengunjung melihat lokasi dan mengatur survei.
5. Menghasilkan prospek melalui konsultasi WhatsApp atau formulir marketing.

### Target pengguna

- Calon pembeli rumah pertama.
- Keluarga yang sedang mencari hunian.
- Calon pembeli yang membandingkan pilihan rumah komersial dan subsidi.
- Pengunjung yang membutuhkan informasi awal sebelum menghubungi marketing.

---

## 2. Brand direction

### Positioning visual

**Palastri harus terlihat berbeda dari Sanggar Indah Parahyangan.** Parahyangan menggunakan nuansa navy-gold, komposisi premium, serif yang dominan, dan hero sinematik. Palastri menggunakan pendekatan Natural Scandinavian dengan komposisi editorial yang lebih ringan dan ramah.

Perbedaan yang harus dipertahankan:

| Elemen | Sanggar Indah Parahyangan | Sanggar Indah Palastri |
|---|---|---|
| Karakter | Premium dan aspiratif | Natural, modern, humanis |
| Warna utama | Navy dan gold | Sage green dan warm neutral |
| Hero | Full-width cinematic | Split editorial |
| Tipografi | Serif elegan dominan | Sans-serif untuk UI, serif sebagai aksen editorial |
| Foto utama | Gerbang dan kawasan | Rumah, taman, ruang, dan kehidupan sehari-hari |
| Komponen | Kartu dan blok promosi | Panel bersih, daftar bernomor, dan foto asimetris |
| CTA | Gold | Deep green |

### Voice and tone

Gunakan bahasa Indonesia yang:

- Hangat, optimistis, dan mudah dipahami.
- Tidak terlalu formal dan tidak terlalu agresif menjual.
- Menekankan fungsi rumah sebagai tempat pulang dan bertumbuh.
- Menghindari klaim absolut seperti “paling strategis”, “pasti untung”, atau “termurah” tanpa data pendukung.

Contoh pesan utama:

**Rumah pertama, cerita baru.**

Contoh pesan pendukung:

“Temukan tempat untuk pulang, bertumbuh, dan menciptakan lebih banyak cerita bersama orang-orang tersayang.”

---

## 3. Design tokens

Gunakan CSS custom properties agar warna, jarak, radius, dan efek dapat dikelola dari satu tempat.

### Color palette

| Token | Hex | Penggunaan |
|---|---|---|
| `--paper` | `#F6F5EF` | Background utama |
| `--paper-deep` | `#EBE9DF` | Background alternatif / bidang sekunder |
| `--white` | `#FFFEFA` | Kartu, FAQ, dan permukaan terang |
| `--ink` | `#26352E` | Teks utama |
| `--muted` | `#6D786F` | Teks sekunder |
| `--green` | `#536B55` | Warna brand utama dan CTA |
| `--green-deep` | `#344B3C` | Hover, footer, dan aksen gelap |
| `--green-soft` | `#DCE4D8` | Elemen lembut |
| `--sage-pale` | `#E9EEE5` | Background ikon dan highlight |
| `--sand` | `#D9CDB4` | Aksen hangat |
| `--line` | `rgba(38, 53, 46, 0.14)` | Border dan divider |

**Aturan warna:**

- Sage green adalah warna identitas, bukan warna dekorasi di setiap elemen.
- Gunakan `--paper` dan `--white` sebagai permukaan dominan.
- Gunakan `--green-deep` untuk bidang gelap seperti footer.
- Hindari memperkenalkan warna emas Parahyangan sebagai aksen utama Palastri.
- Pastikan teks kecil tetap memiliki kontras yang cukup di atas background.

### Typography

| Peran | Font | Aturan |
|---|---|---|
| UI, navigasi, body | DM Sans | Default untuk hampir semua teks |
| Headline editorial | Fraunces | Headline besar, judul section, dan judul kartu tertentu |
| Fallback sans | Arial, sans-serif | Jika DM Sans gagal dimuat |
| Fallback serif | Georgia, serif | Jika Fraunces gagal dimuat |

Prinsip tipografi:

- Sans-serif menjadi fondasi agar UI tetap modern dan mudah dibaca.
- Fraunces digunakan sebagai kontras editorial, bukan untuk semua teks.
- Headline menggunakan line-height rapat dan sedikit negative letter spacing.
- Body text menggunakan line-height sekitar `1.8–1.9` untuk keterbacaan.
- Hindari paragraf panjang; pecah menjadi beberapa paragraf pendek.

### Layout and spacing

| Token / aturan | Nilai |
|---|---|
| Lebar kontainer desktop | `min(1180px, calc(100% - 64px))` |
| Kontainer tablet | `min(100% - 44px, 720px)` |
| Kontainer mobile | `calc(100% - 38px)` |
| Kontainer mobile kecil | `calc(100% - 30px)` |
| Radius umum | `22px` |
| Shadow kartu utama | `0 22px 60px rgba(39, 54, 45, 0.10)` |
| Jarak antar-section desktop | Umumnya `105–120px` |
| Jarak antar-section mobile | Umumnya `76–82px` |

Gunakan whitespace sebagai bagian dari identitas. Jangan menambahkan border, card, badge, dan ikon hanya untuk mengisi ruang kosong.

### Buttons

**Primary button**

- Background: `--green`.
- Text: putih.
- Bentuk: pill / fully rounded.
- Padding desktop: sekitar `15px 21px`.
- Hover: berubah ke `--green-deep`, sedikit naik, dan shadow bertambah.

**Secondary button**

- Background transparan atau putih transparan.
- Border: `--line`.
- Text: `--ink`.
- Hover: border `--green`, background `--white`.

CTA sebaiknya menggunakan label berbentuk tindakan, misalnya “Jelajahi Pilihan Rumah”, “Atur Kunjungan”, atau “Konsultasi”. Hindari label generik seperti “Klik Di Sini”.

---

## 4. Page architecture

Urutan halaman yang direkomendasikan:

1. Header / Navigation
2. Hero
3. Trust strip
4. Tentang Kami
5. Pilihan Rumah
6. Kenapa Palastri
7. Lokasi
8. FAQ
9. Contact CTA
10. Footer

### 4.1 Header / Navigation

**Tujuan:** menyediakan identitas dan akses cepat ke konten utama.

Elemen:

- Logo / wordmark Sanggar Indah Palastri di kiri.
- Sub-label `by Sanggar Indah Group`.
- Navigasi: Tentang Kami, Pilihan Rumah, Keunggulan, FAQ.
- CTA utama: Konsultasi.

Perilaku:

- Sticky di bagian atas viewport.
- Background semi-opaque dengan blur ringan.
- Tinggi desktop sekitar `76px`; mobile sekitar `67px`.
- Pada layar mobile, navigasi diganti tombol menu.
- Menu mobile terbuka sebagai panel vertikal di bawah header dan menutup setelah tautan dipilih.

**Logo:** huruf `P` dalam lingkaran pada mockup hanya placeholder. Ganti dengan logo resmi Palastri setelah tersedia. Jangan membuat logo SIG baru atau mengubah logo resmi.

### 4.2 Hero

**Tujuan:** menyampaikan positioning Palastri dalam beberapa detik pertama.

Headline:

> Rumah pertama, cerita baru.

Supporting copy:

> Temukan tempat untuk pulang, bertumbuh, dan menciptakan lebih banyak cerita bersama orang-orang tersayang.

CTA:

- Primary: `Jelajahi Pilihan Rumah` → section pilihan rumah.
- Secondary: `Kenali Palastri` → section tentang.

Komposisi desktop:

- Layout dua kolom: copy di kiri (`0.88fr`) dan visual di kanan (`1.12fr`).
- Headline besar, maksimal sekitar `83px`.
- Foto tinggi sekitar `535px`, menggunakan crop vertikal dengan bagian atas membulat.
- Tambahkan caption pada bagian bawah foto.
- Tambahkan stamp dekoratif dan floating information card, tetapi jangan menutup subjek utama foto.

Komposisi mobile:

- Copy di atas dan foto di bawah.
- Ukuran headline responsif, sekitar `51–72px`.
- Foto menggunakan rasio tinggi, dengan dekorasi dan floating card yang lebih kecil.
- Pastikan CTA tidak terpotong dan dapat disentuh dengan nyaman.

Catatan:

- Jangan gunakan gerbang perumahan sebagai visual utama jika belum tersedia foto gerbang Palastri yang representatif.
- Foto Unsplash pada mockup hanya aset sementara; ganti dengan foto proyek asli sebelum publikasi.
- Angka `01 / 03` pada caption adalah ornamen mockup. Jika tidak ada galeri, hapus agar tidak memberi kesan ada carousel yang belum dibuat.

### 4.3 Trust strip

**Tujuan:** memberi pengantar singkat sebelum pengunjung membaca detail proyek.

Tiga poin pada mockup:

- Pilihan Hunian — Menyesuaikan kebutuhan.
- Lingkungan Nyaman — Ruang untuk bertumbuh.
- Bagian dari SIG — Sanggar Indah Group.

Desktop menggunakan satu baris horizontal. Mobile berubah menjadi susunan vertikal dengan tiga poin yang tetap ringkas.

Jangan menampilkan angka, penghargaan, fasilitas, atau keunggulan teknis yang belum dikonfirmasi.

### 4.4 Tentang Kami

**Tujuan:** membangun konteks proyek dan kepercayaan terhadap developer.

Headline:

> Bukan sekadar rumah. Tempat kehidupan dimulai.

Komposisi:

- Desktop: foto besar di kiri dan teks di kanan.
- Visual memakai satu foto utama dan satu foto inset yang overlap.
- Badge nomor `01 / Awal cerita` menjadi aksen editorial.
- Mobile: visual berada di atas teks.

Isi konten:

- Pengenalan Sanggar Indah Palastri.
- Gambaran singkat hunian dan target kebutuhan keluarga.
- Hubungan Palastri dengan Sanggar Indah Group.

Hindari sejarah atau angka pengalaman developer apabila belum dilengkapi data resmi yang disetujui.

### 4.5 Pilihan Rumah

**Tujuan:** membawa pengunjung ke informasi produk yang paling penting.

Headline:

> Pilihan rumah, pilihan cerita.

Pada mockup terdapat dua kategori:

1. **Pilihan komersial** — pendekatan desain modern dan ruang untuk keluarga.
2. **Pilihan subsidi** — pendekatan fungsional dan langkah awal memiliki rumah.

Desain kartu:

- Dua kartu besar berdampingan di desktop.
- Satu kolom pada mobile.
- Foto menjadi bagian paling dominan.
- Label kategori berada di atas foto.
- Konten kartu berisi meta singkat, headline, deskripsi, dan tautan diskusi.
- Hindari harga atau angka cicilan sampai ada pricelist resmi.

Setiap kartu idealnya mengarah ke detail tipe yang berisi:

- Kode tipe dan luas tanah/bangunan.
- Denah dan foto rumah.
- Spesifikasi material dan fasilitas.
- Harga dan skema pembayaran.
- Persyaratan KPR bila relevan.
- Status ketersediaan unit yang diperbarui.

**Data produk pada mockup belum final.** Nama tipe, luas, spesifikasi, harga, promo, dan ketersediaan harus diisi berdasarkan data resmi proyek. Jangan menganggap foto kartu saat ini mewakili bangunan aktual.

### 4.6 Kenapa Palastri?

**Tujuan:** menjawab pertanyaan “mengapa saya perlu mempertimbangkan proyek ini?”.

Headline:

> Kenapa memulai di Palastri?

Gunakan pola editorial dua kolom:

- Kiri: headline, deskripsi, tautan konsultasi. Pada desktop, intro dapat sticky selama daftar keunggulan terbaca.
- Kanan: daftar bernomor dengan divider horizontal.

Poin draft:

1. Pilihan sesuai kebutuhan.
2. Ruang yang fungsional.
3. Bagian dari Sanggar Indah Group.
4. Awal untuk masa depan.

Setiap keunggulan perlu dijelaskan secara spesifik dan didukung bukti proyek. Jangan menambahkan klaim akses, fasilitas, keamanan, bebas banjir, atau jarak tempuh tanpa konfirmasi.

### 4.7 Lokasi

**Tujuan:** membantu pengunjung memahami lokasi dan mengatur kunjungan.

Komposisi:

- Satu panel besar dengan dua kolom.
- Kiri: headline, deskripsi, alamat ringkas, dan CTA.
- Kanan: peta.
- Mobile: teks di atas dan peta di bawah.

Alamat pada mockup:

`Mangunjaya, Arjasari, Kabupaten Bandung`

**Alamat ini harus diverifikasi sebelum digunakan sebagai alamat publik final.**

Peta pada mockup hanyalah ilustrasi CSS, bukan peta geografis yang akurat. Untuk versi produksi:

- Ganti dengan Google Maps embed atau peta resmi yang sudah diverifikasi.
- Tambahkan tombol `Buka Google Maps`.
- Gunakan koordinat pin proyek yang benar.
- Jangan menggambar rute, jarak, atau waktu tempuh tanpa data yang valid.

### 4.8 FAQ

**Tujuan:** menjawab keberatan awal dan mengurangi pertanyaan berulang kepada tim marketing.

Layout:

- Desktop: pengantar di kiri, accordion di kanan.
- Mobile: pengantar di atas, accordion di bawah.
- Accordion menggunakan garis pemisah, bukan kumpulan kartu tebal.
- Satu pertanyaan terbuka dalam satu waktu.

Pertanyaan draft:

1. Apa saja pilihan rumah yang tersedia di Palastri?
2. Apa perbedaan rumah komersial dan rumah subsidi?
3. Bagaimana cara mengetahui harga dan promo terbaru?
4. Apakah bisa melakukan survei lokasi terlebih dahulu?
5. Bagaimana proses pengajuan KPR?

Jawaban harus diperiksa oleh tim marketing/legal, khususnya bagian persyaratan pembeli, proses KPR, harga, promo, dan ketersediaan unit.

### 4.9 Contact CTA

**Tujuan:** mengubah minat menjadi prospek yang bisa ditindaklanjuti.

Headline:

> Satu langkah kecil menuju rumah impian.

Komposisi:

- Background `--green`.
- Copy di kiri dan form di kanan pada desktop.
- Satu kolom pada mobile.
- Form berada dalam panel transparan dengan border halus.

Field mockup:

- Nama.
- Nomor WhatsApp.
- Pilihan kebutuhan: belum menentukan, rumah komersial, rumah subsidi, atau jadwal survei.

Perilaku produksi:

- Validasi format nomor telepon.
- Sertakan persetujuan penggunaan data untuk keperluan tindak lanjut.
- Kirim ke endpoint backend atau buka WhatsApp dengan pesan yang sudah terisi.
- Tampilkan status sukses hanya setelah pengiriman benar-benar berhasil.
- Sediakan status error jika pengiriman gagal.

**Penting:** form pada mockup hanya simulasi. Data tidak dikirim ke mana pun.

### 4.10 Footer

Background `#26382E` dengan teks terang.

Kolom desktop:

1. Identitas Palastri, deskripsi singkat, dan endorsement SIG.
2. Navigasi / Jelajahi.
3. Kontak dan alamat.

Mobile:

- Dua kolom untuk navigasi dan kontak.
- Identitas brand mengambil lebar penuh.
- Pada layar sangat kecil, seluruh kolom ditumpuk.

Konten yang harus dilengkapi:

- Logo resmi Palastri.
- Logo resmi Sanggar Indah Group.
- Nomor WhatsApp marketing.
- Email jika tersedia.
- Tautan media sosial resmi.
- Alamat dan tautan peta.
- Tahun copyright yang dikelola secara dinamis atau diperbarui setiap tahun.

---

## 5. Responsive behavior

Gunakan pendekatan desktop-first sesuai implementasi mockup saat ini, dengan tiga breakpoint utama.

| Breakpoint | Perilaku |
|---|---|
| `> 900px` | Layout desktop penuh, dua kolom untuk hero/about/why/FAQ/contact |
| `≤ 900px` | Lebar kontainer diperkecil, gap antar kolom dirapatkan, ukuran gambar dan headline disesuaikan |
| `≤ 680px` | Navigasi menjadi menu mobile, hampir seluruh layout berubah menjadi satu kolom |
| `≤ 380px` | Padding diperkecil, tombol dirapatkan, footer menjadi satu kolom |

Ketentuan mobile:

- Tidak boleh ada horizontal overflow.
- CTA harus memiliki tinggi sentuh yang nyaman.
- Isi kartu harus tetap terbaca tanpa hover.
- Gambar tidak boleh memotong bagian penting rumah atau subjek.
- Floating card tidak boleh menutupi judul atau CTA.
- Accordion harus mudah dibuka dengan sentuhan.
- Sticky header tidak boleh menutupi target anchor saat navigasi.

---

## 6. Interaction and motion

### Navigation

- Header sticky.
- Link navigasi melakukan smooth scroll ke section terkait.
- Menu mobile memiliki state terbuka/tertutup dan atribut `aria-expanded`.
- Menu mobile tertutup setelah salah satu link dipilih.

### FAQ accordion

- Klik pertanyaan untuk membuka jawaban.
- Maksimal satu item terbuka dalam satu waktu.
- `aria-expanded` harus selalu mencerminkan state visual.

### Scroll reveal

- Elemen dengan class `.reveal` muncul ketika masuk viewport.
- Gunakan `IntersectionObserver`.
- Setelah terlihat, hentikan observasi elemen tersebut.
- Hormati `prefers-reduced-motion: reduce`; konten harus tetap terlihat tanpa animasi.

### Form

- Saat ini hanya menampilkan pesan demo di sisi client.
- Jangan mempertahankan perilaku demo sebagai perilaku produksi.
- Hubungkan form ke WhatsApp atau backend sebelum rilis.

---

## 7. Image and asset direction

Prioritas aset:

1. Foto aktual proyek Palastri.
2. Foto rumah aktual dari developer dengan izin penggunaan.
3. Foto lingkungan dan fasilitas yang benar-benar tersedia.
4. Foto stok hanya untuk placeholder selama tahap mockup.

Arah fotografi:

- Cahaya natural dan warna hangat.
- Rumah terlihat realistis, bukan rendering yang terlalu artifisial.
- Tampilkan detail fasad, taman, ruang keluarga, dan aktivitas lingkungan.
- Gunakan framing yang lapang dan tidak terlalu banyak ornamen.
- Hindari menggunakan foto proyek lain seolah-olah foto Palastri.

Optimasi:

- Gunakan WebP atau AVIF bila memungkinkan.
- Sediakan ukuran gambar yang sesuai dengan breakpoint.
- Gunakan `loading="lazy"` untuk gambar di bawah fold.
- Hero image dapat diprioritaskan dengan preload atau `fetchpriority="high"`.
- Seluruh gambar informatif membutuhkan `alt` yang deskriptif.
- Gambar dekoratif menggunakan `alt=""`.

---

## 8. Accessibility and usability

- Gunakan semantic HTML: `header`, `nav`, `main`, `section`, `article`, `form`, dan `footer`.
- Hanya satu `h1` untuk halaman.
- Urutan heading harus konsisten (`h1` → `h2` → `h3`).
- Semua tombol dan link dapat diakses dengan keyboard.
- Focus state harus terlihat jelas.
- Tombol menu memiliki `aria-label` dan `aria-expanded`.
- Accordion menggunakan tombol asli dan `aria-expanded`.
- Label form terhubung dengan input melalui `for` dan `id`.
- Jangan menyampaikan status form hanya melalui warna.
- Pastikan kontras teks memenuhi kebutuhan keterbacaan, khususnya muted text dan teks kecil.
- Hormati `prefers-reduced-motion`.

---

## 9. SEO and metadata

Draft metadata:

- **Title:** Sanggar Indah Palastri — Rumah untuk Cerita Baru
- **Description:** Temukan hunian yang nyaman untuk memulai cerita baru bersama Sanggar Indah Palastri.
- **Language:** `id`

Sebelum publikasi:

- Pastikan title dan description sesuai positioning dan informasi proyek resmi.
- Tambahkan Open Graph image, title, dan description.
- Tambahkan favicon dan logo resmi.
- Pastikan canonical URL benar.
- Tambahkan structured data `RealEstateAgent` atau tipe schema relevan hanya jika informasi entitasnya valid.
- Buat alt text gambar yang informatif dan tidak menumpuk keyword.

---

## 10. Technical implementation notes

Mockup saat ini berupa satu file HTML dengan CSS dan JavaScript di dalam file.

### Struktur yang disarankan saat dikembangkan

```text
palastri-landing/
├── public/
│   ├── images/
│   │   ├── hero.webp
│   │   ├── about-main.webp
│   │   ├── about-detail.webp
│   │   ├── type-commercial.webp
│   │   └── type-subsidi.webp
│   ├── logo/
│   │   ├── palastri.svg
│   │   └── sig.svg
│   └── favicon.svg
├── src/
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── base.css
│   │   ├── components.css
│   │   └── responsive.css
│   ├── scripts/
│   │   ├── navigation.js
│   │   ├── faq.js
│   │   └── contact-form.js
│   └── index.html
└── DESIGN.md
```

Struktur di atas adalah rekomendasi pemisahan file, bukan keharusan. Jika proyek menggunakan framework, pertahankan prinsip desain dan pecah section menjadi komponen yang mudah dirawat.

### Implementation principles

- Simpan semua warna dan nilai visual dasar sebagai design tokens.
- Hindari inline style untuk elemen berulang.
- Pisahkan data tipe rumah, FAQ, dan kontak dari markup jika konten akan dikelola secara dinamis.
- Jangan meng-hardcode nomor WhatsApp di banyak tempat; gunakan satu konfigurasi.
- Gunakan tautan yang memiliki tujuan nyata; jangan biarkan CTA mengarah ke `#` tanpa fungsi.
- Hindari library tambahan untuk interaksi sederhana yang sudah dapat ditangani JavaScript native.
- Pastikan halaman tetap dapat digunakan jika Google Fonts atau animasi gagal dimuat.

---

## 11. Content and data requirements before launch

Informasi berikut harus dikonfirmasi oleh tim proyek dan marketing.

| Data | Status pada mockup | Tindakan |
|---|---|---|
| Logo resmi Palastri | Placeholder huruf `P` | Ganti dengan logo final |
| Logo SIG | Disebut sebagai teks | Gunakan file logo resmi |
| Foto proyek | Menggunakan foto stok | Ganti dengan foto aktual atau rendering resmi |
| Alamat proyek | Draft lokasi Mangunjaya, Arjasari | Verifikasi alamat dan pin |
| Peta lokasi | Ilustrasi CSS | Ganti peta akurat |
| Kategori rumah | Komersial dan subsidi | Konfirmasi kategori serta penamaan resmi |
| Kode tipe dan luas | Belum ditampilkan secara spesifik | Masukkan data resmi per tipe |
| Harga dan promo | Tidak ditampilkan | Ambil dari pricelist aktif |
| Spesifikasi bangunan | Deskripsi generik | Konfirmasi dengan tim teknis |
| Fasilitas dan akses | Belum dibuat klaim spesifik | Cantumkan hanya yang terverifikasi |
| WhatsApp marketing | Belum tersedia | Masukkan nomor resmi |
| Email dan media sosial | Placeholder | Lengkapi bila tersedia |
| Form submission | Simulasi lokal | Integrasikan ke WhatsApp/backend |
| Privacy notice | Belum tersedia | Siapkan persetujuan penggunaan data |

---

## 12. Acceptance checklist

### Visual

- [ ] Palastri tidak terlihat seperti duplikasi landing page Parahyangan.
- [ ] Sage green, warm neutral, dan charcoal konsisten.
- [ ] DM Sans digunakan sebagai font UI dan Fraunces sebagai aksen editorial.
- [ ] Foto aktual proyek digunakan pada bagian utama.
- [ ] Tidak ada foto proyek lain yang disajikan seolah-olah foto Palastri.
- [ ] Spacing, radius, dan hierarchy konsisten di semua section.

### Content

- [ ] Copy telah diperiksa oleh tim marketing.
- [ ] Informasi tipe, harga, promo, dan spesifikasi sudah benar.
- [ ] Alamat dan peta sudah diverifikasi.
- [ ] Semua klaim keunggulan memiliki dasar yang jelas.
- [ ] Kontak resmi dan identitas SIG sudah benar.

### Functional

- [ ] Semua navigasi menuju section yang benar.
- [ ] Menu mobile dapat dibuka dan ditutup.
- [ ] FAQ bekerja dengan keyboard dan touch.
- [ ] Form tervalidasi dan data benar-benar terkirim.
- [ ] Status sukses dan error form bekerja sesuai respons server.
- [ ] Tautan Google Maps dan WhatsApp membuka tujuan yang benar.

### Responsive and accessibility

- [ ] Diuji pada desktop, tablet, dan mobile.
- [ ] Tidak ada horizontal overflow pada lebar layar kecil.
- [ ] Focus state terlihat.
- [ ] Alt text gambar tersedia.
- [ ] Kontras teks dapat dibaca.
- [ ] Reduced motion dihormati.

### SEO and performance

- [ ] Metadata final sudah dipasang.
- [ ] Open Graph image tersedia.
- [ ] Gambar sudah dioptimasi.
- [ ] Tidak ada broken image atau broken link.
- [ ] Layout tidak mengalami pergeseran besar saat aset dimuat.

---

## 13. Design guardrails

Saat menambahkan section atau fitur baru, ikuti batasan berikut:

1. Jangan kembali menggunakan navy-gold sebagai warna utama; itu identitas visual Parahyangan.
2. Jangan membuat semua section menjadi deretan kartu. Variasikan komposisi dengan foto editorial, daftar bernomor, dan ruang kosong.
3. Jangan memenuhi halaman dengan ikon dekoratif atau badge yang tidak menambah informasi.
4. Jangan menggunakan klaim marketing yang belum diverifikasi.
5. Jangan gunakan visual stok sebagai bukti kondisi proyek aktual.
6. Jangan menambahkan animasi yang mengganggu pembacaan atau interaksi.
7. Pertahankan CTA utama yang jelas: melihat pilihan rumah, konsultasi, dan survei lokasi.

**Prinsip akhir:** Palastri harus terasa sebagai brand hunian yang natural, modern, dan humanis; tetap satu keluarga dengan Sanggar Indah Group, tetapi memiliki pengalaman visual dan komunikasi yang berbeda dari proyek-proyek SIG lainnya.
