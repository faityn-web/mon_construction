import { Project, Service, Testimonial, Contact, SiteSettings, Hero, FAQ } from "@/types";
import { supabase } from "./supabase";

// Projects functions
export const getProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })
    .order("id", { ascending: false });

  if (error) throw error;
  return data || [];
};

export const saveProjects = async (projects: Project[]): Promise<void> => {
  // Supabase doesn't support bulk updates easily, so we'll handle individual updates
  for (const project of projects) {
    const { error } = await supabase.from("projects").upsert(project);
    if (error) throw error;
  }
};

export const addProject = async (
  project: Omit<Project, "id" | "created_at" | "updated_at">,
): Promise<Project> => {
  const { data, error } = await supabase
    .from("projects")
    .insert(project)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateProject = async (
  id: string,
  updates: Partial<Project>,
): Promise<void> => {
  const { created_at, ...safeUpdates } = updates as any;

  const { error } = await supabase
    .from("projects")
    .update(safeUpdates)
    .eq("id", id);

  if (error) throw error;
};

export const deleteProject = async (id: string): Promise<void> => {
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) throw error;
};

// Services functions
export const getServices = async (): Promise<Service[]> => {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("order_num", { ascending: true });

  if (error) throw error;
  return data || [];
};

export const saveServices = async (services: Service[]): Promise<void> => {
  for (const service of services) {
    const { error } = await supabase.from("services").upsert(service);
    if (error) throw error;
  }
};

export const addService = async (
  service: Omit<Service, "id" | "created_at" | "updated_at">,
): Promise<Service> => {
  const { data, error } = await supabase
    .from("services")
    .insert(service)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateService = async (
  id: string,
  updates: Partial<Service>,
): Promise<void> => {
  const { error } = await supabase
    .from("services")
    .update(updates)
    .eq("id", id);

  if (error) throw error;
};

export const getService = async (id: string): Promise<Service | null> => {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching service:", error);
    return null;
  }

  return data;
};

export const deleteService = async (id: string): Promise<void> => {
  const { error } = await supabase.from("services").delete().eq("id", id);

  if (error) throw error;
};

// Testimonials functions
export const getTestimonials = async (): Promise<Testimonial[]> => {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
};

export const saveTestimonials = async (
  testimonials: Testimonial[],
): Promise<void> => {
  for (const testimonial of testimonials) {
    const { error } = await supabase.from("testimonials").upsert(testimonial);
    if (error) throw error;
  }
};

export const addTestimonial = async (
  testimonial: Omit<Testimonial, "id" | "created_at" | "updated_at">,
): Promise<Testimonial> => {
  const { data, error } = await supabase
    .from("testimonials")
    .insert(testimonial)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateTestimonial = async (
  id: string,
  updates: Partial<Testimonial>,
): Promise<void> => {
  const { error } = await supabase
    .from("testimonials")
    .update(updates)
    .eq("id", id);

  if (error) throw error;
};

export const deleteTestimonial = async (id: string): Promise<void> => {
  const { error } = await supabase.from("testimonials").delete().eq("id", id);

  if (error) throw error;
};

// Contacts functions
export const getContacts = async (): Promise<Contact[]> => {
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
};

export const saveContacts = async (contacts: Contact[]): Promise<void> => {
  for (const contact of contacts) {
    const { error } = await supabase.from("contacts").upsert(contact);
    if (error) throw error;
  }
};

export const addContact = async (
  contact: Omit<Contact, "id" | "created_at" | "updated_at">,
): Promise<Contact> => {
  const { data, error } = await supabase
    .from("contacts")
    .insert(contact)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateContact = async (
  id: string,
  updates: Partial<Contact>,
): Promise<void> => {
  const { error } = await supabase
    .from("contacts")
    .update(updates)
    .eq("id", id);

  if (error) throw error;
};

export const deleteContact = async (id: string): Promise<void> => {
  const { error } = await supabase.from("contacts").delete().eq("id", id);

  if (error) throw error;
};

// Settings functions
export const getSettings = async (): Promise<SiteSettings | null> => {
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .single();

  if (error && error.code !== "PGRST116") throw error; // PGRST116 is "not found"
  return data;
};

export const saveSettings = async (settings: SiteSettings): Promise<void> => {
  const { error } = await supabase.from("site_settings").upsert(settings);

  if (error) throw error;
};

// Hero functions
export const getHeroes = async (): Promise<Hero[]> => {
  const { data, error } = await supabase
    .from("heroes")
    .select("*")
    .order("order_num", { ascending: true });

  if (error) throw error;
  return data || [];
};

export const saveHeroes = async (heroes: Hero[]): Promise<void> => {
  for (const hero of heroes) {
    const { error } = await supabase.from("heroes").upsert(hero);
    if (error) throw error;
  }
};

export const addHero = async (
  hero: Omit<Hero, "id" | "created_at" | "updated_at">,
): Promise<Hero> => {
  const { data, error } = await supabase
    .from("heroes")
    .insert(hero)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateHero = async (
  id: string,
  updates: Partial<Hero>,
): Promise<void> => {
  const { error } = await supabase
    .from("heroes")
    .update(updates)
    .eq("id", id);

  if (error) throw error;
};

export const deleteHero = async (id: string): Promise<void> => {
  const { error } = await supabase.from("heroes").delete().eq("id", id);

  if (error) throw error;
};

// Initialize data function (no longer needed for localStorage)
export const initializeData = async () => {
  // Check if settings exist, if not create initial data
  const settings = await getSettings();
  if (!settings) {
    const initialSettings: SiteSettings = {
      id: "1",
      company_name: "МонКонстракшн",
      phone: "+976 9999-9999",
      email: "info@monconstr.mn",
      address: "Улаанбаатар хот, 1-р хороо, Бөхийн өргөөний гудамж-8",
      social_links: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        youtube: "#",
      },
      about_text:
        "2014 оноос хойш манай компани Монгол Улсын барилгын салбарт тэргүүлэх байр суурь эзэлж, орон сууц, оффис, үйлдвэрийн барилгын төслүүдийг амжилттай хэрэгжүүлж ирлээ. Бид чанар, хамгаалалт, хугацаанд гүйцэтгэлийг эрхэмлэн түлхүүлдэг.",
      stats: {
        years: 10,
        projects: 120,
        engineers: 50,
        employees: 300,
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    await saveSettings(initialSettings);
  }

  // Initialize hero data if empty
  const heroes = await getHeroes();
  if (heroes.length === 0) {
    const initialHeroes: Omit<Hero, "id" | "created_at" | "updated_at">[] = [
      {
        title: "Барилгын Шилдэг Шийдэл",
        subtitle: "Чанартай барилга, найдвартай гүйцэтгэл",
        description: "Манай компани таны бүх барилгын хэрэгцээг шийдэхэд бэлэн",
        image: "/api/placeholder/1920/1080",
        order_num: 1,
        active: true,
      },
      {
        title: "Орчин Үеийн Технологи",
        subtitle: "Дэлхийн стандартын барилга угсралт",
        description: "Сүүлийн үеийн техник технологиор таны төслийг хэрэгжүүлнэ",
        image: "/api/placeholder/1920/1080",
        order_num: 2,
        active: true,
      },
      {
        title: "Туршлага & Чанар",
        subtitle: "10 жилийн туршлагатай мэргэжилтнүүд",
        description: "Чанартай гүйцэтгэл, таны итгэл найдварыг хүлээн зөвшөөрнө",
        image: "/api/placeholder/1920/1080",
        order_num: 3,
        active: true,
      },
    ];

    for (const hero of initialHeroes) {
      await addHero(hero);
    }
  }

  // Initialize FAQ data if empty
  await initializeFAQData();
};

// FAQ functions
export const getFAQs = async (): Promise<FAQ[]> => {
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .order("category", { ascending: true })
    .order("order_num", { ascending: true });

  if (error) throw error;
  return data || [];
};

export const getFAQsByCategory = async (category: string): Promise<FAQ[]> => {
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .eq("category", category)
    .order("order_num", { ascending: true });

  if (error) throw error;
  return data || [];
};

export const saveFAQs = async (faqs: FAQ[]): Promise<void> => {
  for (const faq of faqs) {
    const { error } = await supabase.from("faqs").upsert(faq);
    if (error) throw error;
  }
};

export const addFAQ = async (
  faq: Omit<FAQ, "id" | "created_at" | "updated_at">,
): Promise<FAQ> => {
  const { data, error } = await supabase
    .from("faqs")
    .insert(faq)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateFAQ = async (
  id: string,
  updates: Partial<FAQ>,
): Promise<void> => {
  const { error } = await supabase
    .from("faqs")
    .update(updates)
    .eq("id", id);

  if (error) throw error;
};

export const getFAQ = async (id: string): Promise<FAQ | null> => {
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching FAQ:", error);
    return null;
  }

  return data;
};

export const deleteFAQ = async (id: string): Promise<void> => {
  const { error } = await supabase.from("faqs").delete().eq("id", id);

  if (error) throw error;
};

// Initialize sample FAQ data
export const initializeFAQData = async () => {
  const existingFAQs = await getFAQs();
  if (existingFAQs.length === 0) {
    const sampleFAQs: Omit<FAQ, "id" | "created_at" | "updated_at">[] = [
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

    for (const faq of sampleFAQs) {
      await addFAQ(faq);
    }
  }
};
