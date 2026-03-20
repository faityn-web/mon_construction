import { supabase } from "./supabase";
import { Project, Service, Testimonial, Contact, SiteSettings } from "@/types";

// Projects
export const getProjectsHome = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .limit(6)
    .order("created_at", { ascending: false })
    .order("id", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  return data || [];
};

export const getProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })
    .order("id", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  return data || [];
};

export const getProject = async (id: string): Promise<Project | null> => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching project:", error);
    return null;
  }

  return data;
};

export const createProject = async (
  project: Omit<Project, "id" | "created_at" | "updated_at">,
): Promise<Project> => {
  const { data, error } = await supabase
    .from("projects")
    .insert([project])
    .select()
    .single();

  if (error) {
    console.error("Error creating project:", error);
    throw error;
  }

  return data;
};

export const updateProject = async (
  id: string,
  updates: Partial<Project>,
): Promise<Project> => {
  const { data, error } = await supabase
    .from("projects")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating project:", error);
    throw error;
  }

  return data;
};

export const deleteProject = async (id: string): Promise<void> => {
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

// Services
export const getServices = async (): Promise<Service[]> => {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("order_num", { ascending: true });

  if (error) {
    console.error("Error fetching services:", error);
    return [];
  }

  return data || [];
};

export const createService = async (
  service: Omit<Service, "id" | "created_at" | "updated_at">,
): Promise<Service> => {
  const { data, error } = await supabase
    .from("services")
    .insert([service])
    .select()
    .single();

  if (error) {
    console.error("Error creating service:", error);
    throw error;
  }

  return data;
};

export const updateService = async (
  id: string,
  updates: Partial<Service>,
): Promise<Service> => {
  const { data, error } = await supabase
    .from("services")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating service:", error);
    throw error;
  }

  return data;
};

export const deleteService = async (id: string): Promise<void> => {
  const { error } = await supabase.from("services").delete().eq("id", id);

  if (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
};

// Testimonials
export const getTestimonials = async (): Promise<Testimonial[]> => {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }

  return data || [];
};

export const createTestimonial = async (
  testimonial: Omit<Testimonial, "id" | "created_at" | "updated_at">,
): Promise<Testimonial> => {
  const { data, error } = await supabase
    .from("testimonials")
    .insert([testimonial])
    .select()
    .single();

  if (error) {
    console.error("Error creating testimonial:", error);
    throw error;
  }

  return data;
};

export const updateTestimonial = async (
  id: string,
  updates: Partial<Testimonial>,
): Promise<Testimonial> => {
  const { data, error } = await supabase
    .from("testimonials")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating testimonial:", error);
    throw error;
  }

  return data;
};

export const deleteTestimonial = async (id: string): Promise<void> => {
  const { error } = await supabase.from("testimonials").delete().eq("id", id);

  if (error) {
    console.error("Error deleting testimonial:", error);
    throw error;
  }
};

// Contacts
export const getContacts = async (): Promise<Contact[]> => {
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }

  return data || [];
};

export const createContact = async (
  contact: Omit<Contact, "id" | "created_at" | "updated_at">,
): Promise<Contact> => {
  const { data, error } = await supabase
    .from("contacts")
    .insert([contact])
    .select()
    .single();

  if (error) {
    console.error("Error creating contact:", error);
    throw error;
  }

  return data;
};

export const updateContact = async (
  id: string,
  updates: Partial<Contact>,
): Promise<Contact> => {
  const { data, error } = await supabase
    .from("contacts")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating contact:", error);
    throw error;
  }

  return data;
};

export const deleteContact = async (id: string): Promise<void> => {
  const { error } = await supabase.from("contacts").delete().eq("id", id);

  if (error) {
    console.error("Error deleting contact:", error);
    throw error;
  }
};

// Site Settings
export const getSettings = async (): Promise<SiteSettings | null> => {
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .single();

  if (error) {
    console.error("Error fetching settings:", error);
    return null;
  }

  return data;
};

export const updateSettings = async (
  updates: Partial<SiteSettings>,
): Promise<SiteSettings> => {
  const { data, error } = await supabase
    .from("site_settings")
    .update(updates)
    .eq("id", "1")
    .select()
    .single();

  if (error) {
    console.error("Error updating settings:", error);
    throw error;
  }

  return data;
};

export const saveSettings = async (
  settings: SiteSettings,
): Promise<SiteSettings> => {
  const { data, error } = await supabase
    .from("site_settings")
    .upsert(settings)
    .select()
    .single();

  if (error) {
    console.error("Error saving settings:", error);
    throw error;
  }

  return data;
};

// Utility functions for real-time updates
export const subscribeToProjects = (callback: (payload: any) => void) => {
  return supabase
    .channel("projects")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "projects" },
      callback,
    )
    .subscribe();
};

export const subscribeToContacts = (callback: (payload: any) => void) => {
  return supabase
    .channel("contacts")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "contacts" },
      callback,
    )
    .subscribe();
};

export const subscribeToTestimonials = (callback: (payload: any) => void) => {
  return supabase
    .channel("testimonials")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "testimonials" },
      callback,
    )
    .subscribe();
};
