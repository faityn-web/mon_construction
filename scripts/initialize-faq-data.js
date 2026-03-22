// Скрипт жишээ FAQ өгөгдлийг оруулах
const { createClient } = require('@supabase/supabase-js');

// Supabase тохиргоо
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Service role key хэрэгтэй

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL эсвэл Service Role Key олдсонгүй!');
  console.error('.env файлдаа NEXT_PUBLIC_SUPABASE_URL болон SUPABASE_SERVICE_ROLE_KEY-г оруулна уу');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const sampleFAQs = [
  // General FAQs
  {
    category: "general",
    question: "МонКонстракшн хэдэн жилийн туршлагатай вэ?",
    answer: "Манай компани 2014 оноос хойш Монгол Улсын барилгын салбарт тэргүүлэх байр суурь эзэлж, 10 жилийн туршлагатай бөгөөд 120 гаруй амжилттай төслийг хэрэгжүүлсэн байна.",
    order_num: 0,
    active: true,
  },
  {
    category: "general",
    question: "Ямар төрлийн барилга барих чадвартай вэ?",
    answer: "Бид орон сууц, оффис, үйлдвэрийн барилга, логистикийн төв, бизнес төв зэрэг бүх төрлийн барилгын ажлыг хийдэг. Мөн интерьер дизайн, инженерийн шийдэл зэрэг нэмэлт үйлчилгээ үзүүлдэг.",
    order_num: 1,
    active: true,
  },
  {
    category: "general",
    question: "Бид ямар материал ашигладаг вэ?",
    answer: "Бид зөвхөн олон улсын стандартын чанартай, бат бөх, экологийн хувьд аюулгүй материалыг ашигладаг. Хамгийн сүүлийн үеийн барилгын материал, технологийг нэвтрүүлдэг.",
    order_num: 2,
    active: true,
  },
  {
    category: "general",
    question: "Баталгаат хугацаа хэд вэ?",
    answer: "Бид бүх барилгад 2-10 жилийн баталгаат хугацаа олгодог. Мөн ашиглалтын үеийн үйлчилгээ, засвар үйлчилгээ үзүүлдэг.",
    order_num: 3,
    active: true,
  },

  // Project FAQs
  {
    category: "projects",
    question: "Төсөл хэд хиргээд дуусдаг вэ?",
    answer: "Төслийн хэмжээ, нарийвчлалаас хамаарч 6 сараас 2 хүртэлх хугацаанд дуусдаг. Төсөл эхлэхээс өмнө нарийвчилсан хуваарь, төлөвлөгөө төвлөрүүлдэг.",
    order_num: 0,
    active: true,
  },
  {
    category: "projects",
    question: "Төслийн өртөг яаж тооцогддог вэ?",
    answer: "Төслийн өртгийг хэмжээ, материал, ажлын хүндрэл, хугацаа зэрэг олон хүчин зүйлс дээр суурилан нарийвчилж тооцдог. Үнэгүй зөвлөгөө, үнийн санал олгодог.",
    order_num: 1,
    active: true,
  },
  {
    category: "projects",
    question: "Төслөөсөө татгалзах боломжтой юу?",
    answer: "Гэрээ байгуулахаас өмнө та өөрийн хүсэлтээр татгалзах боломжтой. Гэрээ байгуулсны дараа талуудын харилцан тохиролцоогоор татгалзах боломжтой.",
    order_num: 2,
    active: true,
  },
  {
    category: "projects",
    question: "Төслийн явцад ямар мэдээлэл өгдөг вэ?",
    answer: "Бид төслийн явцыг 7 хоног тутамд зураг, тайлбартайгаар мэдэгддэг. Мөн шууд холбогдох боломж, онлайн хянах системтэй.",
    order_num: 3,
    active: true,
  },

  // Technical FAQs
  {
    category: "technical",
    question: "Барилгын зураг төсөл ямар хөтөч ашигладаг вэ?",
    answer: "Бид AutoCAD, Revit, SketchUp, 3D Max зэрэг сүүлийн үеийн програм хангамж ашиглан нарийвчилсан зураг төсөл хийдэг. 3D загвар, визуалчлал хийдэг.",
    order_num: 0,
    active: true,
  },
  {
    category: "technical",
    question: "Барилгын стандартуудыг хангадаг уу?",
    answer: "Тиймээ! Бид Монгол Улсын барилгын стандарт (MNS), олон улсын стандарт (ISO) бүгдийг хангадаг. Батлан хамгаалалтын шаардлагыг мөн хангадаг.",
    order_num: 1,
    active: true,
  },
  {
    category: "technical",
    question: "Эрчим хүчний хэмнэлттэй барилга барих уу?",
    answer: "Тиймээ! Бид эрчим хүчний хэмнэлттэй, ногоон барилгын технологи ашигладаг. Нарны цахилгаан, дулааны насос, хаалгагч систем суулгадаг.",
    order_num: 2,
    active: true,
  },
  {
    category: "technical",
    question: "Барилгын аюулгүй байдал хэр хангагддаг вэ?",
    answer: "Бид аюулгүй байдлыг тэргүүлэх чухал зүйл гэж үздэг. Бүх ажилчид мэргэжлийн сургалттай, аюулгүй байдлын хэрэгсэлтэй, дахин сайжруулалт хийдэг.",
    order_num: 3,
    active: true,
  },
];

async function initializeFAQData() {
  try {
    console.log('Жишээ FAQ өгөгдлийг оруулж байна...');

    // Өмнө нь байгаа өгөгдлийг шалгах
    const { data: existingFAQs, error: checkError } = await supabase
      .from('faqs')
      .select('count');

    if (checkError) {
      console.error('Өгөгдөл шалгахад алдаа гарлаа:', checkError);
      return;
    }

    if (existingFAQs && existingFAQs.length > 0) {
      console.log(`Өмнө нь ${existingFAQs.length} FAQ байна. Шинээр оруулахгүй.`);
      return;
    }

    // Жишээ өгөгдлийг оруулах
    const { data, error } = await supabase
      .from('faqs')
      .insert(sampleFAQs)
      .select();

    if (error) {
      console.error('Өгөгдөл оруулахад алдаа гарлаа:', error);
      return;
    }

    console.log(`✅ Амжилттай ${sampleFAQs.length} жишээ FAQ оруулагдлаа!`);
    console.log('Оруулсан өгөгдөл:', data);

  } catch (error) {
    console.error('Скрипт ажиллахад алдаа гарлаа:', error);
  }
}

// Скриптийг ажиллуулах
initializeFAQData();
