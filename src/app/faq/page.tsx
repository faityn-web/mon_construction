"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronDown, HelpCircle, Phone, Mail, Clock } from "lucide-react";
import ContactInfo from "@/components/ui/ContactInfo";
import { getFAQsByCategory } from "@/lib/data";
import type { FAQ } from "@/types";
import Navbar from "@/components/ui/Navbar";

const faqCategories = [
  {
    id: "general",
    title: "Ерөнхий асуулт",
    icon: HelpCircle,
    color: "blue",
  },
  {
    id: "projects",
    title: "Төслийн асуулт",
    icon: HelpCircle,
    color: "orange",
  },
  {
    id: "technical",
    title: "Техникийн асуулт",
    icon: HelpCircle,
    color: "blue",
  },
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("Ерөнхий");
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFAQs = async () => {
      try {
        const data = await getFAQsByCategory(activeCategory);

        console.log(data);

        setFaqs(data);
      } catch (error) {
        console.error("Error loading FAQs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFAQs();
  }, [activeCategory]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Түгээмэл Асуулт Хариулт
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Манай компани, үйлчилгээ, төслүүдийн талаар түгээмэл тавигддаг
              асуултуудын хариулт
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {faqCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                    activeCategory === category.id
                      ? `bg-${category.color}-500 text-white shadow-lg`
                      : "bg-white text-gray-700 hover:bg-gray-100 shadow"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {category.title}
                </button>
              );
            })}
          </motion.div>

          {/* FAQ Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            {faqs.map((faq, index: number) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedQuestion(
                      expandedQuestion === index ? null : index,
                    )
                  }
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      expandedQuestion === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedQuestion === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4"
                  >
                    <div className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 bg-blue-900 text-white rounded-2xl p-8 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Бусад асуулт байна уу?</h2>
            <p className="text-blue-200 mb-8">
              Хэрэв таны асуулт энд байхгүй бол бидэнтэй холбогдож дэлгэрэнгүй
              мэдээлэл авна уу.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col items-center">
                <Phone className="w-8 h-8 mb-2 text-orange-400" />
                <h3 className="font-semibold mb-1">Утас</h3>
                <p className="text-blue-200">+976 00000000</p>
                <p className="text-sm text-blue-300">Ажлын өдөр 9:00-18:00</p>
              </div>

              <div className="flex flex-col items-center">
                <Mail className="w-8 h-8 mb-2 text-orange-400" />
                <h3 className="font-semibold mb-1">Имэйл</h3>
                <div className="text-blue-200">
                  <ContactInfo
                    showPhone={false}
                    showEmail={true}
                    showAddress={false}
                    className="text-blue-200"
                  />
                </div>
                <p className="text-sm text-blue-300">24/7 онлайн</p>
              </div>

              <div className="flex flex-col items-center">
                <Clock className="w-8 h-8 mb-2 text-orange-400" />
                <h3 className="font-semibold mb-1">Хариу өгөх хугацаа</h3>
                <p className="text-blue-200">24 цагийн дотор</p>
                <p className="text-sm text-blue-300">Хурдан шуурхай</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+97600000000"
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition-colors"
              >
                Шууд залгах
              </a>
              <a
                href="/contact"
                className="px-6 py-3 border border-white hover:bg-white hover:text-blue-900 rounded-lg font-semibold transition-all"
              >
                Холбогдох хуудас
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
