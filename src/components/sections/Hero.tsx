"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, Play } from "lucide-react";
import { getHeroes } from "@/lib/data";
import { Hero as HeroType } from "@/types";
import { getSettings } from "@/lib/supabase-data";
import { SiteSettings } from "@/types";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroSlides, setHeroSlides] = useState<HeroType[]>([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    const loadHeroes = async () => {
      try {
        const heroes = await getHeroes();

        const activeHeroes = heroes.filter((hero) => hero.active);

        setHeroSlides(activeHeroes);
      } catch (error) {
        console.error("Error loading heroes:", error);
        // Fallback to default data if API fails
        // setHeroSlides([
        //   {
        //     id: '1',
        //     title: 'Барилгын Шилдэг Шийдэл',
        //     subtitle: 'Чанартай барилга, найдвартай гүйцэтгэл',
        //     image: '/api/placeholder/1920/1080',
        //     description: 'Манай компани таны бүх барилгын хэрэгцээг шийдэхэд бэлэн',
        //     order_num: 1,
        //     active: true,
        //     created_at: '',
        //     updated_at: ''
        //   }
        // ])
      } finally {
        setLoading(false);
      }
    };

    loadHeroes();
  }, []);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await getSettings();
        setSettings(data);
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    };

    loadSettings();
  }, []);

  useEffect(() => {
    if (heroSlides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const slideVariants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  if (loading) {
    return (
      <section
        id="home"
        className="relative h-screen overflow-hidden bg-gray-900"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-900/70"></div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <div className="animate-pulse">
                <div className="h-16 bg-gray-700 rounded mb-4"></div>
                <div className="h-8 bg-gray-700 rounded mb-4 w-3/4"></div>
                <div className="h-6 bg-gray-700 rounded mb-8 w-2/3"></div>
                <div className="flex gap-4">
                  <div className="h-12 bg-gray-700 rounded w-32"></div>
                  <div className="h-12 bg-gray-700 rounded w-32"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (heroSlides.length === 0) {
    return (
      <section
        id="home"
        className="relative h-screen overflow-hidden bg-gray-900"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-900/70"></div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl text-center">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                {settings?.company_name || "МонКонстракшн"}
              </h1>
              <p className="text-xl md:text-2xl text-orange-400 mb-8">
                Чанарыг тэргүүлж, туршлагатай бүтээгдэхүүн хүргэнэ
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${heroSlides[currentSlide].image})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-3xl">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl"
                >
                  {heroSlides[currentSlide].title}
                </motion.h1>

                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl md:text-2xl lg:text-3xl text-orange-400 mb-6 font-semibold drop-shadow-xl"
                >
                  {heroSlides[currentSlide].subtitle}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-gray-100 mb-8 max-w-2xl drop-shadow-lg leading-relaxed"
                >
                  {heroSlides[currentSlide].description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center group shadow-xl drop-shadow-lg">
                    Манай төслүүд
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg font-semibold transition-all flex items-center justify-center group shadow-xl backdrop-blur-sm bg-white/10">
                    <Play className="mr-2 w-5 h-5" />
                    Холбоо барих
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators */}
      {heroSlides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index
                  ? "bg-orange-500 w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      )}

      {/* Engineer Silhouette (Decorative) */}
      <div className="absolute bottom-0 right-10 hidden lg:block">
        <div className="w-64 h-96 bg-gradient-to-t from-blue-900/50 to-transparent opacity-30"></div>
      </div>
    </section>
  );
}
