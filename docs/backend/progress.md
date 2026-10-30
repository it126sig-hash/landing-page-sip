# Progress Migrasi Backend — Supabase, Admin CMS & Blog SEO

Acuan status pengerjaan migrasi konten dinamis (`data/content.js` → Supabase), pembuatan Admin Dashboard (`/admin`), manajemen aset (Supabase Storage), dan modul Blog SEO.

Update kolom **Status** (`belum` · `jalan` · `selesai`) dan centang task di masing-masing file dokumen saat fase dikerjakan.

| # | Fase | Fokus Utama | Status | Dokumen |
|---|------|-------------|--------|---------|
| 1 | Database, Storage & Seed | Tabel `site_content` (JSONB) + `posts` (Relasional), RLS, Storage Bucket `public-assets`, seed `content.js` | `belum` | [fase-1-database-storage.md](fase-1-database-storage.md) |
| 2 | Client & Dynamic Data Layer | Integrasi `@supabase/supabase-js`, update `useContent.js` (fallback + dual-path gambar), `usePosts.js` | `belum` | [fase-2-data-layer.md](fase-2-data-layer.md) |
| 3 | Admin Dashboard & Konten | Login Supabase Auth (`/admin/login`), komponen upload/hapus aset, form editor 25 seksi Landing Page | `belum` | [fase-3-admin-konten.md](fase-3-admin-konten.md) |
| 4 | Modul Blog & Optimasi SEO | CRUD artikel di `/admin/posts`, halaman `/blog` & `/blog/[slug]`, dynamic SEO meta, JSON-LD, sitemap | `belum` | [fase-4-blog-seo.md](fase-4-blog-seo.md) |
| 5 | Deployment SEO & QA | Konfigurasi render SEO (SSG Webhook Rebuild / ISR), environment variables, uji regresi & fallback | `belum` | [fase-5-deploy-qa.md](fase-5-deploy-qa.md) |

---

## Ringkasan Keputusan Arsitektur

1. **Skema Database Hybrid:**
   - **Landing Page (`site_content`):** Key-Value JSONB (`key` PK, `data` JSONB). Satu baris mewakili satu seksi di `data/content.js` (`hero`, `houseTypes`, `faqs`, dll.). Ringkas dan fleksibel tanpa belasan tabel join.
   - **Blog SEO (`posts`):** Tabel relasional penuh (`id`, `slug`, `title`, `excerpt`, `content`, `cover_image`, `seo_title`, `seo_description`, `status`, `published_at`). Siap untuk pagination, pencarian slug, dan indeksasi Google.
2. **Manajemen Aset & Gambar:**
   - Menggunakan **Supabase Storage Bucket (`public-assets`)** untuk upload, ganti, dan hapus gambar dari `/admin`.
   - Aset bawaan di `public/assets/` tetap dipertahankan via helper *dual-path* `withBase()` (mendukung path lokal `/assets/...` sekaligus URL penuh `https://...`).
3. **Custom Admin Dashboard (`/admin`):**
   - Berjalan dalam mode SPA (`ssr: false` pada rute `/admin/**`) dengan autentikasi **Supabase Auth**.
4. **Strategi SEO:**
   - Halaman publik (`/` dan `/blog/[slug]`) tetap ter-render penuh menjadi HTML untuk crawler Google (baik via SSG + Webhook Auto-Rebuild di GitHub Pages maupun SSR/ISR di Cloudflare Pages/Vercel).

## Urutan Kerja
Kerjakan berurutan **Fase 1 → Fase 2 → Fase 3 → Fase 4 → Fase 5**. Jangan melompati fase karena setiap fase mengandalkan lapisan di bawahnya.
