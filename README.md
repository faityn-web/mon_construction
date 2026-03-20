# МонКонстракшн - Барилгын Шилдэг Шийдэл

Монгол Улсын тэргүүлэгч барилгын компанид зориулсан орчин үеийн, premium вэбсайт.

## 🌟 Онцлог

- **Fullscreen Hero Slider** - Автомат слайддах харагдац бүхий хуудасны хэсэг
- **Animated Services Cards** - Хөдөлгөөнт үйлчилгээний карт
- **Portfolio Grid** - Төслийн галерей шүүлтүүртэй
- **Animated Counters** - Тоон үзүүлэлтүүдийн хөдөлгөөнт дэлгэц
- **Testimonials Slider** - Харилцагчдын сэтгэгдэлийн слайдер
- **Contact Form** - Бүртгэлийн форм (Supabase-д илгээдэг)
- **Admin Dashboard** - Бүрэн функцтэй админ хэсэг
- **Real-time Updates** - Supabase real-time subscriptions
- **Responsive Design** - Бүх төхөөрмжид зориулсан дизайн

## 🛠 Технологи

- **Next.js 16** - React framework (App Router)
- **TypeScript** - Төрлийн аюулгүй байдал
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Хөдөлгөөний сан
- **Lucide React** - Icon library
- **Supabase** - Backend-as-a-Service (PostgreSQL + Real-time)

## 🚀 Эхлүүлэх

```bash
# Суулгах
npm install

# Хөгжүүлэлтийн сервер
npm run dev

# Бүтээх
npm run build

# Production server эхлүүлэх
npm start
```

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── placeholder/          # Placeholder image API
│   ├── admin/                   # Admin panel routes
│   │   ├── page.tsx            # Admin dashboard
│   │   ├── projects/
│   │   │   ├── page.tsx        # Projects list
│   │   │   └── new/
│   │   │       └── page.tsx    # New project form
│   │   └── contacts/
│   │       └── page.tsx        # Contact messages
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/
│   ├── sections/
│   │   ├── Hero.tsx             # Hero section
│   │   ├── Services.tsx         # Services section
│   │   ├── Projects.tsx         # Projects section
│   │   ├── About.tsx            # About section
│   │   ├── Stats.tsx            # Stats section
│   │   ├── Testimonials.tsx     # Testimonials section
│   │   └── Contact.tsx          # Contact section
│   ├── admin/
│   │   └── AdminLayout.tsx     # Admin layout
│   └── ui/
│       ├── Navbar.tsx           # Navigation
│       └── Footer.tsx           # Footer
├── lib/
│   ├── supabase.ts            # Supabase client
│   ├── supabase-data.ts       # Supabase data functions
│   └── data.ts               # Local storage fallback
├── types/
│   └── index.ts              # TypeScript interfaces
└── database/
    └── schema.sql             # Database schema
```

## 🎨 Дизайн Систем

- **Үндсэн өнгө**: Dark Blue (#0f172a)
- **Туслах өнгө**: Orange (#f97316)
- **Фонт**: Inter
- **Border Radius**: lg/2xl
- **Animations**: Framer Motion

## 🌏 Хэл

Бүх контент Монгол хэлээр (Крилл үсэг) бичигдсэн.

## 📱 Responsive Design

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🗄️ Supabase Database

### Tables:

- **projects** - Төслүүд
- **services** - Үйлчилгээ
- **testimonials** - Сэтгэгдэл
- **contacts** - Холбогдол (contact form-с ирэх)
- **site_settings** - Сайтын тохиргоо
- **users** - Админ хэрэгчид

### Features:

- **Real-time subscriptions** - Өгөгдөлт хийхэд шууд шинэчлэгддэг
- **Row Level Security (RLS)** - Аюулгүй байдлын хяналт
- **Auto timestamps** - created_at, updated_at талбарууд
- **CRUD operations** - Бүтэн Create, Read, Update, Delete

## 🖼 Зураг

Одоогоор placeholder зураг ашиглаж байна. `/api/placeholder` endpoint ашиглана.

## 📝 Features

### Hero Section

- Auto-sliding carousel (5 секунд)
- Smooth fade/slide animations
- Call-to-action buttons
- Responsive text sizing

### Services Section

- Hover animations (scale + shadow)
- Icon animations
- Grid layout (1-4 columns)

### Projects Section

- Filter by category
- Hover overlay effects
- Database-д хадгалагддаг
- Supabase-с дата авдаг

### Stats Section

- Animated counters on scroll
- Icon animations
- Responsive grid

### Testimonials Section

- Auto and manual sliding
- Star ratings
- Author information
- Navigation controls

### Contact Section

- Form validation
- Supabase-д илгээдэг
- Loading states
- Success/error messages
- Contact information cards

### Admin Dashboard

- **Statistics**: Төслүүд, холбогдол, сэтгэгдэл, статистик
- **Projects Management**: CRUD operations, status management
- **Contact Management**: Status tracking, quick actions
- **Real-time Updates**: Supabase subscriptions
- **Responsive Design**: Mobile, Tablet, Desktop

### Footer

- Company information
- Quick links
- Newsletter signup
- Social media links
- Back to top button

## 🔧 Customization

### Өнгө өөрчлөх

`tailwind.config.js` файлд өнгөний тохиргоог өөрчилнө.

### Контент өөрчлөх

Компонент файлууддаа контентыг шууд засварлана.

### Шинэ хуудас нэмэх

`src/app/` дотор шинэ folder үүсгээд `page.tsx` файл үүсгэнэ.

### Database тохиргоо

`database/schema.sql` файлд өөрчлөж Supabase-д upload хийнэ.

## 📄 License

MIT License

---

**МонКонстракшн ХХК** - Барилгын Шилдэг Шийдэл
