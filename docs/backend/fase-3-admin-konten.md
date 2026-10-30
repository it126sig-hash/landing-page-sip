# Fase 3 — Admin Dashboard: Auth, Media & Editor Konten

Membangun halaman `/admin` khusus untuk tim pengelola agar dapat login, mengunggah/menghapus gambar, dan mengubah seluruh konten Landing Page tanpa menyentuh kode.

## 1. Routing, Layout & Proteksi Auth (`/admin`)
- [ ] Atur `routeRules` di `nuxt.config.ts` untuk `/admin/**`:
  - `ssr: false` (mode SPA agar interaksi admin selalu langsung/real-time ke Supabase).
  - Header/meta `robots: 'noindex, nofollow'` agar halaman admin tidak di-index Google.
- [ ] Buat halaman login `pages/admin/login.vue` menggunakan `supabase.auth.signInWithPassword()`.
- [ ] Buat middleware `middleware/admin-auth.js` untuk mengarahkan user yang belum login ke `/admin/login`.
- [ ] Buat layout `layouts/admin.vue` dengan sidebar navigasi:
  - **Konten Landing Page** (`/admin/content`)
  - **Artikel Blog** (`/admin/posts`)
  - **Media / Aset** (`/admin/media` atau terintegrasi di tiap form)
  - Tombol **Lihat Website** & **Logout**

## 2. Komponen Manajemen Aset (`components/admin/ImageUploader.vue`)
- [ ] Fitur upload gambar ke bucket `public-assets` dengan sub-folder sesuai kategori (`hero/`, `rumah/`, `awards/`, `fasilitas/`, `bank/`, `blog/`).
- [ ] Validasi ukuran & tipe file di sisi klien (utamakan WebP/PNG/JPG, maks 2–5 MB).
- [ ] Fitur **Ganti / Hapus Gambar**:
  - Jika gambar lama berasal dari bucket `public-assets`, hapus file lama di Storage saat diganti/dihapus agar penyimpanan tetap bersih.
  - Jika gambar lama berasal dari folder lokal `/assets/...`, cukup ganti path di database tanpa menghapus file statis repo.

## 3. Editor Konten Landing Page (`pages/admin/content.vue`)
Kelompokkan 25 key dari `site_content` ke dalam 5 tab yang rapi dan mudah dipahami non-developer:
- [ ] **Tab 1 — Identitas & Kontak (`meta`, `footer`, `finalCta`)**
  - Nama proyek, developer, tagline, logo, nomor WhatsApp, template chat WA, alamat kantor, email, Instagram, menu navigasi.
- [ ] **Tab 2 — Hero & Tentang Kami (`hero`, `about`, `projects`, `mascot`, `carousel`)**
  - Badge, headline, sub-headline, gambar hero desktop & mobile, paragraf tentang kami (dengan highlight warna), daftar penghargaan (`awards` — tambah/edit/hapus + upload gambar), daftar riwayat proyek (`projects.items` + gambar timeline), dan maskot.
- [ ] **Tab 3 — Tipe Rumah & Cicilan (`defaultSpecs`, `houseTypes`, `products`, `installment`)**
  - Spesifikasi bangunan standar, CRUD daftar tipe rumah (nama, LB/LT, KT/KM, tag Subsidi/Komersil, harga mulai, thumbnail, galeri denah/fasad, perspektif 3D, override spesifikasi), dan copy section cicilan.
- [ ] **Tab 4 — Keunggulan & Lokasi (`advantages`, `reasons`, `oneGate`, `stats`, `locationSection`, `locations`)**
  - Kartu keunggulan (beserta upload gambar & opsi `imageFit`/`imageWide`), poin One Gate System, angka statistik, gambar peta lokasi, link Google Maps, dan daftar fasilitas sekitar.
- [ ] **Tab 5 — FAQ, KPR & Formulir (`faqs`, `faqSection`, `banks`, `kprRequirements`, `consultationForm`, `memberGetMember`, `referralWelcome`)**
  - Tambah/edit/urutkan daftar pertanyaan FAQ, daftar bank mitra KPR (logo warna & putih), syarat dokumen KPR (karyawan, joint income, batas gaji subsidi), serta label & pesan formulir.
- [ ] Tambahkan tombol **Simpan Perubahan** per seksi dengan indikator status (*Menyimpan...* / *Tersimpan*).

## Definisi Selesai
- Admin dapat login di `/admin/login`, mengubah teks atau daftar item (mis. tambah tipe rumah / tambah FAQ / ganti foto), klik Simpan, dan data di tabel `site_content` serta Storage Bucket `public-assets` ter-update dengan benar.
- Pengunjung tanpa login tidak dapat mengakses rute `/admin/**` maupun mengubah data di Supabase.
