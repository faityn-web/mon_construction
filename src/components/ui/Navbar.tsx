"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-blue-900">МонКонстракшн</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="/"
                className="text-gray-700 hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors"
              >
                Нүүр
              </a>
              <a
                href="/services"
                className="text-gray-700 hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors"
              >
                Үйлчилгээ
              </a>
              <a
                href="/projects"
                className="text-gray-700 hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors"
              >
                Төслүүд
              </a>
              <a
                href="/about"
                className="text-gray-700 hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors"
              >
                Бидний тухай
              </a>
              <a
                href="/faq"
                className="text-gray-700 hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors"
              >
                Түгээмэл асуулт
              </a>
              <a
                href="/contact"
                className="text-gray-700 hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors"
              >
                Холбоо барих
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-orange-500 p-2"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="/"
              className="text-gray-700 hover:text-orange-500 block px-3 py-2 text-base font-medium"
            >
              Нүүр
            </a>
            <a
              href="/services"
              className="text-gray-700 hover:text-orange-500 block px-3 py-2 text-base font-medium"
            >
              Үйлчилгээ
            </a>
            <a
              href="/projects"
              className="text-gray-700 hover:text-orange-500 block px-3 py-2 text-base font-medium"
            >
              Төслүүд
            </a>
            <a
              href="/about"
              className="text-gray-700 hover:text-orange-500 block px-3 py-2 text-base font-medium"
            >
              Бидний тухай
            </a>
            <a
              href="/faq"
              className="text-gray-700 hover:text-orange-500 block px-3 py-2 text-base font-medium"
            >
              Түгээмэл асуулт
            </a>
            <a
              href="/contact"
              className="text-gray-700 hover:text-orange-500 block px-3 py-2 text-base font-medium"
            >
              Холбоо барих
            </a>
            <a
              href="/admin"
              className="bg-orange-500 hover:bg-orange-600 text-white block px-3 py-2 text-base font-medium rounded-lg"
            >
              Админ
            </a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-2 space-y-2">
              <div className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm">+976 9999-9999</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-sm">info@monconstr.mn</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
