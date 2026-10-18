# A Tale of Two Hearts

Scrapbook Noy dan Poy, bermula dari first date di pameran buku pada 23 September 2025. Pesan, like, dan jumlah hati disimpan di Supabase.

## Menjalankan Lokal

1. Install Node.js LTS.
2. Install dependency dengan `npm install` (di PowerShell yang memblokir `npm.ps1`, gunakan `npm.cmd install`).
3. Buat project Supabase, lalu jalankan [`supabase/schema.sql`](supabase/schema.sql) di Supabase SQL Editor.
4. Salin `.env.example` menjadi `.env.local`, lalu isi `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` dari pengaturan API project Supabase.
5. Jalankan `npm run dev` atau `npm.cmd run dev`.

## Supabase

Messages, likes, and the shared heart counter are stored in Supabase, not in browser local storage.

1. Create a Supabase project and run [`supabase/schema.sql`](supabase/schema.sql) in the Supabase SQL Editor. It creates the tables, RLS policies, atomic like and heart-count functions, and two sample notes.
2. In **Authentication → Users**, create one confirmed user with email `password-gate@example.com` and the password you want to use for the site. The password is stored by Supabase Auth; it is never put in this repository or a `VITE_*` variable.
3. In **Authentication → Settings**, disable public sign-ups. RLS also checks the dedicated account email, so other authenticated accounts cannot access scrapbook data.
4. Copy `.env.example` to `.env.local`, then set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from your Supabase project settings.
5. Restart the Vite dev server. The shared heart counter starts at 365 when the schema is first run. The password is requested again after a page refresh.

Only use the publishable/anon key in this frontend. Never put a Supabase `service_role` key or the site password in `VITE_*` variables or commit `.env.local`.

## Deploy ke Vercel

1. Push repository ke GitHub lalu import repository di Vercel. Build command `npm run build` dan output directory `dist` sudah disetel di `vercel.json`.
2. Tambahkan `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` di **Project Settings → Environment Variables** untuk environment yang akan digunakan. Akun Supabase Auth yang sama akan memvalidasi password di halaman masuk.
3. Pastikan schema Supabase sudah dijalankan, lalu redeploy setelah mengisi environment variables.

Password gate ini mengunci tampilan aplikasi dan akses database. Karena Vercel menyajikan frontend statis, file HTML/JavaScript tetap dapat diunduh; gunakan **Vercel Deployment Protection** jika kamu juga perlu memblokir seluruh request ke domain sebelum halaman dimuat.

## Musik Sendiri

Letakkan file musik milikmu di folder `public/music`, lalu tambahkan setiap lagu ke `public/music/playlist.json`. Playlist awal sengaja kosong agar tombol tidak mencoba memutar file yang belum tersedia. Contoh:

```json
[
   {
      "title": "Judul Lagu",
      "artist": "Nama Artis",
      "src": "/music/lagu-saya.mp3"
   }
]
```

Format audio yang didukung bergantung pada browser, umumnya MP3, M4A, dan OGG. Lagu diputar mengikuti urutan playlist; gunakan tombol sebelumnya/berikutnya di header untuk berpindah lagu. Playlist berlanjut otomatis setelah lagu selesai.

## Pemeriksaan

- `npm run lint`
- `npm run build`
