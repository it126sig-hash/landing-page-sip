# Fase 1 — Database Schema, Storage & Seed

Menyiapkan infrastruktur Supabase: tabel database hybrid (`site_content` + `posts`), Row Level Security (RLS), Storage Bucket `public-assets`, dan script migrasi data awal dari `data/content.js`.

## 1. Skema Tabel Database (`scripts/supabase-schema.sql`)
- [ ] Buat tabel `public.site_content` untuk 25 seksi Landing Page:
  - `key` (`text`, Primary Key) — contoh: `'meta'`, `'hero'`, `'about'`, `'houseTypes'`, `'faqs'`, dll.
  - `data` (`jsonb`, `not null`) — struktur objek/array persis seperti di `data/content.js`.
  - `updated_at` (`timestamptz`, default `now()`).
- [ ] Buat tabel `public.posts` untuk artikel Blog SEO:
  - `id` (`uuid`, Primary Key, default `gen_random_uuid()`)
  - `slug` (`text`, Unique, `not null`) — URL ramah SEO (contoh: `panduan-kpr-subsidi-bandung-barat`)
  - `title` (`text`, `not null`)
  - `excerpt` (`text`) — ringkasan artikel untuk kartu list & fallback deskripsi SEO
  - `content` (`text`, `not null`) — isi artikel (HTML / Markdown)
  - `cover_image` (`text`) — URL gambar sampul dari Supabase Storage
  - `seo_title` (`text`) — opsional override `<title>`
  - `seo_description` (`text`) — opsional override `<meta name="description">`
  - `status` (`text`, default `'draft'`, check `in ('draft', 'published')`)
  - `published_at` (`timestamptz`)
  - `created_at` & `updated_at` (`timestamptz`, default `now()`)
- [ ] Tambahkan index pencarian pada `posts (slug)` dan `posts (status, published_at desc)`.
- [ ] Buat trigger otomatis update kolom `updated_at` saat baris di `site_content` atau `posts` diubah.

## 2. Row Level Security (RLS)
- [ ] Aktifkan RLS pada tabel `site_content` dan `posts`.
- [ ] Policy `site_content`:
  - `SELECT`: publik (`anon` & `authenticated`).
  - `INSERT / UPDATE / DELETE`: hanya `authenticated` (admin).
- [ ] Policy `posts`:
  - `SELECT` untuk `anon`: hanya baris dengan `status = 'published'`.
  - `ALL` untuk `authenticated`: akses penuh ke semua artikel (`draft` maupun `published`).

## 3. Supabase Storage (`public-assets`)
- [ ] Buat Storage Bucket bernama `public-assets` dengan opsi `public = true`.
- [ ] Atur Storage RLS Policy:
  - `SELECT`: publik (`anon` & `authenticated`) dapat melihat gambar.
  - `INSERT / UPDATE / DELETE`: hanya `authenticated` (admin) yang dapat mengunggah, mengganti, atau menghapus gambar di dalam folder bucket (`hero/`, `rumah/`, `awards/`, `blog/`, dll.).

## 4. Akun Admin & Seed Data Awal
- [ ] Buat 1 akun Admin pertama di menu **Supabase Authentication → Users** (Email & Password).
- [ ] Buat script `scripts/seed-supabase.js` untuk membaca `data/content.js` dan melakukan `upsert` seluruh 25 key ke tabel `site_content`.
- [ ] Jalankan seed script dan pastikan seluruh 25 baris masuk ke tabel `site_content` tanpa ada field yang hilang.

## Definisi Selesai
- Tabel `site_content` berisi 25 baris yang identik dengan `data/content.js`.
- Tabel `posts` dan bucket `public-assets` siap diakses: publik hanya bisa baca, sedangkan user login bisa tulis/hapus.
