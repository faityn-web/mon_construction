"use client";

import { motion } from "framer-motion";
import { FileText, Building, Palette, Wrench } from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "Барилгын зураг төсөл",
    description:
      "Сүүлийн үеийн програм хангамж ашиглан нарийвчилсан зураг төсөл хийх үйлчилгээ",
  },
  {
    icon: Building,
    title: "Барилга угсралт",
    description:
      "Орон сууц, оффис, үйлдвэрийн барилгын бүх төрлийн угсралтын ажил",
  },
  {
    icon: Palette,
    title: "Интерьер дизайн",
    description:
      "Орчин үеийн загварын интерьер дизайн, таны сэтгэлд хүрэх шийдэл",
  },
  {
    icon: Wrench,
    title: "Инженерийн шийдэл",
    description: "Цахилгаан, ус хангамж, халаалт, вентиляцийн системийн шийдэл",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Манай Үйлчилгээ
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Бид барилгын бүх шатны үйлчилгээг чанартай гүйцэтгэж, таны хүсэл
            эрмэлзлийг биелүүлнэ
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                className="bg-white rounded-xl p-8 text-center hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-500 transition-colors duration-300">
                  <Icon className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors duration-300" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-blue-900 mb-4 group-hover:text-orange-500 transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Learn More Link */}
                <div className="mt-6">
                  <a
                    href="#contact"
                    className="text-orange-500 font-medium inline-flex items-center group-hover:text-orange-600 transition-colors"
                  >
                    Дэлгэрэнгүй
                    <svg
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <a
            href="#contact"
            className="inline-block bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105"
          >
            Зөвлөгөө авах
          </a>
        </motion.div>
      </div>
    </section>
  );
}
