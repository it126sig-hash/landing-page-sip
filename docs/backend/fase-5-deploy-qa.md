# Fase 5 — Strategi Render SEO, Deployment & QA

Memastikan hasil editan konten maupun artikel blog baru ter-render penuh menjadi HTML untuk Googlebot, serta menguji ketahanan aplikasi di lingkungan produksi.

## 1. Keputusan & Konfigurasi Mode Render Produksi
Pilih salah satu jalur deploy berikut saat masuk tahap rilis:

### Jalur A — Tetap di GitHub Pages (SSG + Trigger Rebuild)
- [ ] Tambahkan `NUXT_PUBLIC_SUPABASE_URL` dan `NUXT_PUBLIC_SUPABASE_KEY` ke **GitHub Repository Secrets** dan teruskan di `.github/workflows/deploy.yml`.
- [ ] Tambahkan hook pre-render di Nuxt (`nitro:config` / `prerender:routes`) agar saat `npm run generate` berjalan, Nuxt mengambil semua `slug` artikel `published` dari Supabase dan mencetak file statis `/blog/<slug>/index.html`.
- [ ] Tambahkan tombol **"Terbitkan ke Website Publik"** di `/admin` (atau pasang Supabase Database Webhook) yang memanggil GitHub API `repository_dispatch` untuk memicu workflow `Deploy to GitHub Pages` secara otomatis.

### Jalur B — Pindah ke Cloudflare Pages / Vercel (SSR / ISR Instan)
- [ ] *(Opsional jika ingin tayang instan tanpa tunggu build 1 menit)* Hubungkan repository GitHub ke Cloudflare Pages atau Vercel.
- [ ] Set environment variables `NUXT_PUBLIC_SUPABASE_URL` dan `NUXT_PUBLIC_SUPABASE_KEY`.
- [ ] Atur `routeRules` untuk `/` dan `/blog/**` menggunakan `isr: 60` (atau `swr: 60`) sehingga HTML dirender di server untuk SEO dan otomatis diperbarui maksimal dalam 60 detik setelah admin menekan Simpan.

## 2. Quality Assurance (QA) & Uji Ketahanan
- [ ] **Uji Fallback Offline:** Matikan koneksi / kosongkan env Supabase secara lokal → pastikan halaman utama tetap tampil 100% utuh dari `data/content.js`.
- [ ] **Uji Keamanan (RLS):** Coba lakukan request `UPDATE` / `DELETE` ke `site_content`, `posts`, dan Storage `public-assets` menggunakan `anon` key tanpa login → pastikan ditolak oleh Supabase (`401/403` atau `0 rows affected`).
- [ ] **Uji Siklus Hidup Aset:** Upload gambar baru di `/admin`, ganti dengan gambar lain, lalu cek bucket `public-assets` → pastikan gambar lama terhapus dan gambar baru tampil di halaman publik.
- [ ] **Uji SEO & View-Source:** Buka `view-source:` pada halaman `/` dan `/blog/[slug]` hasil build/produksi → pastikan judul, konten artikel, dan meta tag sudah tercetak di HTML awal (bukan kosong).
- [ ] **Audit Lighthouse:** Pastikan skor SEO ≥ 95 dan Performance ≥ 90 di mobile & desktop.

## Definisi Selesai
- Seluruh alur dari edit konten/blog di `/admin` hingga tampil di halaman publik berjalan mulus, aman (RLS aktif), dan lolos verifikasi SEO HTML penuh.
