-- Create tables for the construction company website

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  image TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed')),
  featured BOOLEAN DEFAULT false,
  gallery TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100) NOT NULL,
  order_num INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255),
  company VARCHAR(255),
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  image TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  email VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Site settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL DEFAULT 'МонКонстракшн',
  phone VARCHAR(50),
  email VARCHAR(255),
  address TEXT,
  social_links JSONB DEFAULT '{}',
  about_text TEXT,
  stats JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users table for admin
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_testimonials_active ON testimonials(active);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(active);

-- Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policies for public read access
CREATE POLICY "Enable read access for all users" ON projects FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON services FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON site_settings FOR SELECT USING (true);

-- Policies for authenticated users (admin)
CREATE POLICY "Enable insert for authenticated users" ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON projects FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users" ON services FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON services FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON services FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users" ON testimonials FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON testimonials FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON testimonials FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for contacts" ON contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users" ON contacts FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON contacts FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users" ON site_settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON site_settings FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users" ON users FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON users FOR UPDATE USING (auth.role() = 'authenticated');

-- Functions for automatic timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for automatic timestamps
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert initial data
INSERT INTO services (title, description, icon, order_num) VALUES
('Барилгын зураг төсөл', 'Сүүлийн үеийн програм хангамж ашиглан нарийвчилсан зураг төсөл хийх үйлчилгээ', 'FileText', 1),
('Барилга угсралт', 'Орон сууц, оффис, үйлдвэрийн барилгын бүх төрлийн угсралтын ажил', 'Building', 2),
('Интерьер дизайн', 'Орчин үеийн загварын интерьер дизайн, таны сэтгэлд хүрэх шийдэл', 'Palette', 3),
('Инженерийн шийдэл', 'Цахилгаан, ус хангамж, халаалт, вентиляцийн системийн шийдэл', 'Wrench', 4)
ON CONFLICT DO NOTHING;

INSERT INTO site_settings (company_name, phone, email, address, about_text, stats) VALUES
('МонКонстракшн', '+976 9999-9999', 'info@monconstr.mn', 'Улаанбаатар хот, 1-р хороо, Бөхийн өргөөний гудамж-8', 
'2014 оноос хойш манай компани Монгол Улсын барилгын салбарт тэргүүлэх байр суурь эзэлж, орон сууц, оффис, үйлдвэрийн барилгын төслүүдийг амжилттай хэрэгжүүлж ирлээ. Бид чанар, хамгаалалт, хугацаанд гүйцэтгэлийг эрхэмлэн түлхүүлдэг.',
'{"years": 10, "projects": 120, "engineers": 50, "employees": 300}')
ON CONFLICT DO NOTHING;

-- Insert sample projects
INSERT INTO projects (title, category, description, image, status, featured, gallery) VALUES
('Хан-Уул дүүргийн Орон сууц', 'Орон сууц', '12 давхарт 48 өрхийн орчин үеийн орон сууц. Эрүүл аюулгүй орчин, тав тухтай амьдралын байр. Хамгийн сүүлийн үеийн барилгын материал ашигласан.', '/api/placeholder/400/300', 'completed', true, ARRAY['/api/placeholder/400/300', '/api/placeholder/400/300', '/api/placeholder/400/300']),
('Бизнес Төв Байр', 'Оффис', 'Үндэсний хэмжээний бизнес төв, орчин үеийн оффис. 25 давхарт 500+ ажилтны багтаамжтай, ухаалаг барилга.', '/api/placeholder/400/300', 'completed', true, ARRAY['/api/placeholder/400/300', '/api/placeholder/400/300']),
('Хүнсний Үйлдвэр', 'Үйлдвэр', 'Олон улсын стандартын хүнсний үйлдвэр. 5000м² талбай, орчин үеийн тоног төхөөрөмжтэй.', '/api/placeholder/400/300', 'active', false, ARRAY['/api/placeholder/400/300', '/api/placeholder/400/300']),
('Сүхбаатар дүүргийн Орон сууц', 'Орон сууц', '9 давхарт 36 өрхийн тав тухтай орон сууц. Ногоон бүс, хүүхдийн тоглоомын талбайтай.', '/api/placeholder/400/300', 'active', false, ARRAY['/api/placeholder/400/300', '/api/placeholder/400/300']),
('Технологийн Парк', 'Оффис', 'IT компаниудад зориулсан ухаалаг оффис барилга. 15 давхарт, 300+ ажилтны багтаамжтай.', '/api/placeholder/400/300', 'active', false, ARRAY['/api/placeholder/400/300', '/api/placeholder/400/300']),
('Логистикийн Төв', 'Үйлдвэр', 'Агуулах, логистикийн комплекс. 10000м² талбай, орчин үеийн хадгалах системтэй.', '/api/placeholder/400/300', 'pending', false, ARRAY['/api/placeholder/400/300', '/api/placeholder/400/300']),
('Багануур дүүргийн Орон сууц', 'Орон сууц', '8 давхарт 64 өрхийн орон сууц. Эрүүл аюулгүй байгууламж, орчин үеийн дизайн.', '/api/placeholder/400/300', 'pending', false, ARRAY['/api/placeholder/400/300', '/api/placeholder/400/300']),
('Гадаад худалдааны төв', 'Оффис', 'Олон улсын гадаад худалдааны төв. 20 давхарт, 400+ дэлгүүрийн багтаамжтай.', '/api/placeholder/400/300', 'pending', false, ARRAY['/api/placeholder/400/300', '/api/placeholder/400/300'])
ON CONFLICT DO NOTHING;

-- Insert sample testimonials
INSERT INTO testimonials (name, position, company, content, rating, image, active) VALUES
('Батбаяр Ганбаатар', 'Хан-Уул дүүргийн Орлогч Захирал', 'Хан-Уул дүүрэг', 'МонКонстракшн компани түүхэндээ хамгийн том орон сууцны төслийг амжилттай хэрэгжүүлсэн. Чанар, хугацаа, төсөв бүх зүйлд тухтай байсан. Мэргэжлийн баг, нарийвчилсан ажил.', 5, '/api/placeholder/100/100', true),
('Сарангэрэл Дамдинсүрэн', 'Гүйцэтгэх захирал', 'Технологи Парк ХХК', 'Орон сууцны барилгадаа тэднээс үнэлж хараагүй. Мэргэжлийн баг, хурдан гүйцэтгэл, чанарын хяналт төгс байсан. Дараагийн төслөө тэдэнд дахин итгэх болно.', 5, '/api/placeholder/100/100', true),
('Ганбат Батбаяр', 'Ерөнхий менежер', 'Хүнсний Үйлдвэр ХХК', 'Үйлдвэрийн барилгын төсөлд манай шаардлагад бүрэн нийцсэн шийдэл санал болгосон. Хугацаанд нь дуусгаж, чанартай ажилласанд талархаж байна.', 5, '/api/placeholder/100/100', true),
('Нарантуяа Батбаяр', 'Төслийн менежер', 'Логистик Компани', 'Агуулахын барилгын ажилд тэдний туршлага, мэдлэг маш их тус боллоо. Төсөл хугацаандаа дуусч, бидний хүлээлтийг бүрэн хангасан.', 5, '/api/placeholder/100/100', true),
('Энхжаргал Батсүх', 'Захирал', 'IT Solutions ХХК', 'Технологийн паркийн оффис барилгын төсөлд тэдний ухаалаг шийдэл, орчин үеийн технологи ашигласанд талархаж байна. Ажлын байр бидний ажилтнуудад маш сэтгэлд хүрч байна.', 5, '/api/placeholder/100/100', true)
ON CONFLICT DO NOTHING;
