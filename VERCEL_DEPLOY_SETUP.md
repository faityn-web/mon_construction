# Vercel Deploy Environment Variables Setup

## Problem
Vercel deploy хийхэд Supabase environment variables-г олж чадахгүй байна. Энэ нь .env файлууд Vercel-р automatically уншигдахгүй тул гарах асуудал юм.

## Solution
Vercel dashboard-д environment variables-г гараар тохируулах хэрэгтэй:

### 1. Vercel Dashboard-д орох
- https://vercel.com/dashboard руу ороод төсөлөө сонгоно уу

### 2. Environment Variables тохируулах
- Settings → Environment Variables → Add Variable
- Дараахь variables-г нэмнэ:

```
NEXT_PUBLIC_SUPABASE_URL=https://iszakcbmlxbdhjhvpvba.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzemFrY2JtbHhiZGhqaHZwdmJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2NjE2MjQsImV4cCI6MjA4OTIzNzYyNH0.V_4kaM7lPjvnsaJQvtiMuXzK4xYD9UFFwgrrJhAn13s
ADMIN_EMAIL=admin@monconstr.mn
ADMIN_PASSWORD=admin123
```

### 3. Environment Types
- `NEXT_PUBLIC_SUPABASE_URL`: Production (Production, Preview, Development)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Production (Production, Preview, Development)
- `ADMIN_EMAIL`: Production (Production, Preview, Development)
- `ADMIN_PASSWORD`: Production (Production, Preview, Development)

### 4. Deploy дахин хийх
- Environment variables нэмсэний дараа deploy дахин хийнэ
- Automatic deploy болгож болно

## Environment Variables утгууд:
- **NEXT_PUBLIC_SUPABASE_URL**: https://iszakcbmlxbdhjhvpvba.supabase.co
- **NEXT_PUBLIC_SUPABASE_ANON_KEY**: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzemFrY2JtbHhiZGhqaHZwdmJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2NjE2MjQsImV4cCI6MjA4OTIzNzYyNH0.V_4kaM7lPjvnsaJQvtiMuXzK4xYD9UFFwgrrJhAn13s
- **ADMIN_EMAIL**: admin@monconstr.mn
- **ADMIN_PASSWORD**: admin123

## Шалгах
- Deploy дууссаны дараа /admin хуудас руу оож login хийж үзэх
- Environment variables зөв тохируулагдсан эсэхийг шалгах

## Note
- .env.local файл нь зөвхөн local development-д ашиглагдана
- Vercel deploy-д dashboard-аас тохируулсан variables-г ашиглана
