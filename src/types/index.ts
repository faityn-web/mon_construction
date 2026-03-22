export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  status: "active" | "completed" | "pending";
  created_at: string;
  updated_at: string;
  featured?: boolean;
  gallery?: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  order_num: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  image: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: "new" | "read" | "responded";
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: "admin" | "editor";
  created_at: string;
  last_login?: string;
}

export interface Hero {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  order_num: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: string;
  company_name: string;
  phone: string;
  email: string;
  address: string;
  social_links: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
  about_text: string;
  stats: {
    years: number;
    projects: number;
    engineers: number;
    employees: number;
  };
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  order_num: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}
