import { Project, Service, Testimonial, Contact, SiteSettings } from "@/types";
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
};
