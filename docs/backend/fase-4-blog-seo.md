# Fase 4 — Modul Blog & Optimasi SEO

Menambahkan fitur artikel Blog yang dikelola dari `/admin/posts` dan dirender secara ramah SEO untuk mendatangkan trafik pencarian organik.

## 1. Manajemen Artikel di Admin (`/admin/posts`)
- [ ] Buat halaman daftar artikel `pages/admin/posts/index.vue`:
  - Menampilkan judul, status (`Draft` / `Published`), tanggal terbit, dan tombol aksi (Edit, Lihat, Hapus).
  - Filter berdasarkan status dan pencarian judul.
- [ ] Buat halaman form editor artikel `pages/admin/posts/[id].vue` (dan `/admin/posts/new.vue`):
  - Input **Judul** + generator **Slug** otomatis (bisa diedit manual).
  - Upload **Cover Image** menggunakan `AdminImageUploader` (masuk ke `public-assets/blog/`).
  - Input **Excerpt / Ringkasan Singkat**.
  - **Editor Konten Artikel** (mendukung heading `H2`/`H3`, bold/italic, bullet list, link, dan sisipan gambar).
  - Panel **Pengaturan SEO**: `seo_title` (dengan penghitung karakter ≤ 60) dan `seo_description` (≤ 160 karakter).
  - Pilihan **Status** (`Draft` / `Published`) dan tanggal publikasi.

## 2. Halaman Publik Blog (`/blog` & `/blog/[slug]`)
- [ ] Buat halaman indeks `pages/blog/index.vue`:
  - Menampilkan daftar artikel berstatus `published` dengan urutan terbaru, gambar sampul, tanggal, ringkasan, dan pagination.
  - Mengikuti design system Sanggar Indah Parahyangan (`TheHeader`, `TheFooter`, font & palet warna brand).
- [ ] Buat halaman baca artikel `pages/blog/[slug].vue`:
  - Render isi artikel dengan tipografi yang nyaman dibaca di mobile & desktop.
  - Tambahkan komponen CTA kontekstual di akhir artikel (mengarahkan pembaca ke konsultasi WhatsApp atau melihat Tipe Rumah).
  - Handle `404 Not Found` jika slug tidak ditemukan atau masih berstatus `draft`.

## 3. Optimasi Teknis SEO Blog
- [ ] Pasang `useSeoMeta()` dinamis di `pages/blog/[slug].vue`:
  - `title`: `post.seo_title || post.title`
  - `description`: `post.seo_description || post.excerpt`
  - `ogTitle`, `ogDescription`, `ogImage` (`post.cover_image`), `ogType: 'article'`, `twitterCard: 'summary_large_image'`.
- [ ] Tambahkan **JSON-LD Schema.org `BlogPosting` / `Article`** di `<head>` halaman artikel (judul, tanggal terbit, tanggal modifikasi, gambar, dan publisher `Sanggar Indah Group`).
- [ ] Tambahkan link "Blog / Artikel" pada navigasi header/footer.
- [ ] Buat generator `sitemap.xml` dinamis (atau saat build) yang menyertakan URL `/` beserta seluruh `/blog/[slug]` yang berstatus `published`.

## Definisi Selesai
- Admin dapat membuat artikel baru dari `/admin/posts`, mengunggah foto sampul, dan mempublikasikannya.
- Halaman `/blog` dan `/blog/[slug]` tampil rapi di mobile/desktop dan memiliki meta tag OpenGraph serta JSON-LD `BlogPosting` yang valid.
