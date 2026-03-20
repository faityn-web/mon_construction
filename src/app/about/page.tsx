"use client";

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Users, Award, Clock, ArrowRight } from 'lucide-react'
import Navbar from '@/components/ui/Navbar'
import { getSettings } from '@/lib/supabase-data'

export default function AboutPage() {
  const [settings, setSettings] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await getSettings()
        setSettings(data)
      } catch (error) {
        console.error('Error loading settings:', error)
      } finally {
        setLoading(false)
      }
    }

    loadSettings()
  }, [])

  const features = [
    {
      icon: CheckCircle,
      title: 'Чанарын баталгаа',
      description: 'Олон улсын стандартын чанартай барилга угсралт'
    },
    {
      icon: Users,
      title: 'Мэргэжлийн баг',
      description: '10+ жилийн туршлагатай инженер, архитекторууд'
    },
    {
      icon: Award,
      title: 'Шагналт компани',
      description: 'Олон улсын барилгын шагналуудад тусгагдсан'
    },
    {
      icon: Clock,
      title: 'Цаг хугацаанд',
      description: 'Төсөв, хугацаандаа чанартай гүйцэтгэл'
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-gray-500">Ачаалж байна...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Бидний Тухай
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {settings?.about_text || 'Монголын тэргүүлэгч барилгын компани - чанар, туршлага, найдвартай байдал'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {settings?.stats && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">
                    {settings.stats.years}+
                  </div>
                  <div className="text-gray-600">Жилийн туршлага</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">
                    {settings.stats.projects}+
                  </div>
                  <div className="text-gray-600">Амжилттай төсөл</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">
                    {settings.stats.engineers}+
                  </div>
                  <div className="text-gray-600">Инженер, архитектор</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">
                    {settings.stats.employees}+
                  </div>
                  <div className="text-gray-600">Ажилтан</div>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Яагаад Бид?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Бидний давуу тал бол чанар, туршлага, хэрэглэгчдийн төлөө үйлчлэхэд оршдог
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Төслийнхөө төлөвлөгөөг хөтлөлцүүлэх үү?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Манай мэргэжилтнүүд танд зөв шийдэл санал болгох болно
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors"
              >
                Холбоо барих
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a
                href="/projects"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-900 rounded-lg font-semibold transition-colors"
              >
                Төслүүд үзэх
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
