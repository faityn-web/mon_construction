"use client";

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Phone,
  Mail,
  MapPin,
  ArrowUp,
  Building,
} from 'lucide-react'
import ContactInfo from './ContactInfo'
import { getSettings } from '@/lib/supabase-data'
import { SiteSettings } from '@/types'

const footerLinks = {
  Үйлчилгээ: [
    { name: "Барилгын зураг төсөл", href: "/services" },
    { name: "Барилга угсралт", href: "/services" },
    { name: "Интерьер дизайн", href: "/services" },
    { name: "Инженерийн шийдэл", href: "/services" },
  ],
  Компани: [
    { name: "Бидний тухай", href: "/about" },
    { name: "Төслүүд", href: "/projects" },
    { name: "Мэдээ", href: "#" },
    { name: "Ажлын байр", href: "#" },
  ],
  Тусламж: [
    { name: "Холбоо барих", href: "/contact" },
    { name: "Түгээмэл асуулт", href: "/faq" },
    { name: "Нөхцөл", href: "#" },
    { name: "Нууцлал", href: "#" },
  ],
  Админ: [
    { name: "Админ хэсэг", href: "/admin" },
    { name: "Нэвтрэх", href: "/admin" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export default function Footer() {
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  
  useEffect(() => {
    const fetchSettings = async () => {
      const settings = await getSettings();
      setSiteSettings(settings);
    };
    fetchSettings();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-blue-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center mb-6">
              <Building className="w-8 h-8 text-orange-500 mr-3" />
              <h3 className="text-2xl font-bold">
                {siteSettings?.company_name || 'МонКонстракшн'}
              </h3>
            </div>

            <p className="text-blue-200 mb-6 leading-relaxed">
              Монгол Улсын тэргүүлэгч барилгын компани. Чанартай барилга,
              найдвартай гүйцэтгэл, таны итгэл найдварыг хүлээн зөвшөөрнө.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-blue-200">
                <Phone className="w-4 h-4 mr-3 text-orange-500" />
                <ContactInfo showPhone={true} showEmail={false} showAddress={false} className="text-blue-200" />
              </div>
              <div className="flex items-center text-blue-200">
                <Mail className="w-4 h-4 mr-3 text-orange-500" />
                <ContactInfo showPhone={false} showEmail={true} showAddress={false} className="text-blue-200" />
              </div>
              <div className="flex items-center text-blue-200">
                <MapPin className="w-4 h-4 mr-3 text-orange-500" />
                <ContactInfo showPhone={false} showEmail={false} showAddress={true} className="text-blue-200" />
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(
            ([category, links], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * categoryIndex }}
              >
                <h4 className="text-lg font-semibold mb-6">{category}</h4>
                <ul className="space-y-3">
                  {links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-blue-200 hover:text-orange-400 transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ),
          )}
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-blue-800"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-xl font-semibold mb-4">
              Манай мэдээ, мэдээллийг аваарай
            </h4>
            <p className="text-blue-200 mb-6">
              Шинэ төслүүд, санал болгох үйлчилгээний талаар мэдээлэл авахыг
              хүсвэл бүртгүүлнэ үү
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Таны имэйл хаяг"
                className="flex-1 px-4 py-3 rounded-lg bg-blue-800 border border-blue-700 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Бүртгүүлэх
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-blue-200 text-sm mb-4 md:mb-0"
            >
              © 2024 {siteSettings?.company_name || 'МонКонстракшн'} ХХК. Бүх эрх хуулиар хамгаалагдсан.
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center space-x-6"
            >
              <a
                href="#"
                className="text-blue-200 hover:text-orange-400 text-sm transition-colors"
              >
                Нөхцөлүүд
              </a>
              <a
                href="#"
                className="text-blue-200 hover:text-orange-400 text-sm transition-colors"
              >
                Нууцлал
              </a>
              <button
                onClick={scrollToTop}
                className="w-10 h-10 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Дээшээ"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
