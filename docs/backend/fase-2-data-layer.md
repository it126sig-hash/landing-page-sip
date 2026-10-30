# Fase 2 — Integrasi Client & Dynamic Data Layer

Menghubungkan Nuxt 3 dengan Supabase melalui *seam layer* `composables/useContent.js` tanpa mengubah 15+ komponen UI yang sudah ada, serta menyiapkan composable untuk Blog.

## 1. Setup Dependency & Konfigurasi
- [ ] Install `@supabase/supabase-js`.
- [ ] Tambahkan runtimeConfig publik di `nuxt.config.ts`:
  - `supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL || ''`
  - `supabaseKey: process.env.NUXT_PUBLIC_SUPABASE_KEY || ''`
- [ ] Buat helper/composable `composables/useSupabase.js` untuk inisialisasi singleton Supabase client (aman dipanggil saat SSR/SSG maupun di browser).

## 2. Upgrade `composables/useContent.js` (Seam Layer)
- [ ] Pertahankan import statis `defaultContent from '~/data/content'` sebagai nilai awal (*fallback*).
- [ ] Ambil seluruh baris `site_content` dari Supabase dan gabungkan per seksi di atas `defaultContent` (jika ada key yang belum ada di DB atau koneksi gagal, otomatis memakai `defaultContent`).
- [ ] Perbarui helper `withBase(path)` menjadi **dual-path**:
  ```js
  const withBase = (path) => {
    if (!path) return '';
    if (/^https?:\/\//i.test(path)) return path; // URL penuh dari Supabase Storage
    return useRuntimeConfig().app.baseURL.replace(/\/$/, '') + path; // Path lokal /assets/...
  };
  ```
- [ ] Pastikan properti turunan (`houseTypes`, `wa`, `mergeSpecs`, dll.) bersifat reaktif (`computed` atau ter-resolve dari state `useAsyncData`) dan tetap mengembalikan bentuk objek yang 100% sama ke semua komponen.

## 3. Composable Blog (`composables/usePosts.js`)
- [ ] Buat fungsi `fetchPublishedPosts({ page, limit })` untuk halaman daftar artikel `/blog`.
- [ ] Buat fungsi `fetchPostBySlug(slug)` untuk halaman detail artikel `/blog/[slug]`.

## Definisi Selesai
- Situs berjalan normal tanpa error baik saat `NUXT_PUBLIC_SUPABASE_URL` kosong (fallback ke `data/content.js`) maupun saat terhubung ke Supabase.
- Mengubah satu teks/angka di tabel `site_content` Supabase dan me-refresh halaman langsung menampilkan perubahan tersebut di UI.
- Gambar dengan path lokal (`/assets/...`) dan gambar dengan URL Supabase Storage (`https://...`) sama-sama tampil dengan benar.
