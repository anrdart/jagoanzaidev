# Panduan Setup Database Neon

## 1. Buat Database Neon

1. Buka [https://console.neon.tech/](https://console.neon.tech/)
2. Sign up atau login
3. Klik **"Create a project"**
4. Pilih region (pilih yang terdekat: Singapore)
5. Database akan dibuat otomatis

## 2. Jalankan SQL Schema

1. Di Neon Dashboard, klik **SQL Editor**
2. Copy semua isi dari file [`db/schema.sql`](../db/schema.sql)
3. Paste ke SQL Editor
4. Klik **Run** untuk membuat tabel-tabel

## 3. Setup Environment Variables

1. Di Neon Dashboard, pergi ke **Dashboard** → **Connection Details**
2. Copy **Connection string**
3. Buat file `.env` di root project:
   ```bash
   cp .env.example .env
   ```
4. Paste connection string ke file `.env`:
   ```
   NEON_DATABASE_URL=postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```

## 4. Struktur Database

### Tabel `users`
Menyimpan data user authentication
- `id` - UUID primary key
- `email` - Email unique
- `full_name` - Nama lengkap (opsional)
- `created_at` - Waktu dibuat
- `last_login_at` - Waktu login terakhir

### Tabel `user_progress`
Menyimpan progress belajar user
- `user_id` - Reference ke users
- `course_level` - Level: 'basic', 'fundamental', 'jagoan'
- `current_card_index` - Kartu yang sedang dibuka
- `completed_cards` - Array ID kartu yang selesai
- `is_level_completed` - Status level selesai

### Tabel `user_quiz_scores`
Menyimpan hasil quiz
- `user_id` - Reference ke users
- `course_level` - Level quiz
- `score` - Nilai 0-100
- `attempts` - Jumlah percobaan
- `passed` - Status lulus (score >= 70)

### Tabel `user_learning_mode`
Menyimpan mode belajar yang dipilih
- `user_id` - Reference ke users
- `learning_mode` - Mode: 'curated', 'path', 'story'

## 5. Testing Connection

Untuk test koneksi database:

```bash
npm run dev
```

Buka browser console dan coba:
```javascript
// Test if environment variable is loaded
console.log(import.meta.env.NEON_DATABASE_URL);
```

## Troubleshooting

### Error: "relation does not exist"
- Jalankan SQL schema di SQL Editor Neon

### Error: "connection refused"
- Cek NEON_DATABASE_URL di .env
- Pastikan connection string benar

### Error CORS
- Pastikan menggunakan Neon Serverless Driver (@neondatabase/serverless)
