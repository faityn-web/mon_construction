'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FileText, Building, Palette, Wrench, ArrowRight, CheckCircle } from 'lucide-react'
import { getServices } from '@/lib/supabase-data'

const iconMap: { [key: string]: any } = {
  'FileText': FileText,
  'Building': Building,
  'Palette': Palette,
  'Wrench': Wrench
}

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await getServices()
        setServices(data)
      } catch (error) {
        console.error('Error loading services:', error)
      } finally {
        setLoading(false)
      }
    }

    loadServices()
  }, [])

  const features = [
    '10+ жилийн туршлага',
    '120+ амжилттай төсөл',
    '50+ мэргэжилтэн инженер',
    '300+ туршлагатай ажилтан',
    'Олон улсын стандарт',
    'Баталгаат хугацаа 2-10 жил'
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Манай Үйлчилгээ
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Монгол Улсын тэргүүлэгч барилгын компанид зориулсан бүрэн хүрээний үйлчилгээ
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Бидний Санал Болгож Буй Үйлчилгээ
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Барилгын бүх шатанд таны хэрэгцээнд зориулсан үр дүнтэй шийдлүүд
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || FileText
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-all"
                >
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-orange-500" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-blue-900 mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  
                  <a
                    href="/contact"
                    className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium transition-colors"
                  >
                    Дэлгэрэнгүй
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Яагаад Биднийг Сонгох Хэрэгтэй Вэ?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Бидний давуу тал бол таны амжилтын тулгаар болно
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center space-x-4"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <span className="text-gray-700 font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
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
              Манай Ажлын Процесс
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Төслийн эхнээс дуустал танд илүү сайн үйлчилгээ үзүүлэх зорилготой
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Зөвлөгөө', desc: 'Таны хэрэгцээг сонирхож, шаардлагыг тодорхойлно' },
              { step: 2, title: 'Төлөвлөлт', desc: 'Нарийвчилсан төсөл, хуваарь, үнийн санал бэлтгэнэ' },
              { step: 3, title: 'Хэрэгжилт', desc: 'Чанарын стандартыг баримталж, ажлыг гүйцэтгэнэ' },
              { step: 4, title: 'Хүлээлгэж өгөх', desc: 'Баталгаажуулалт, гарын авалт, ашиглалтад оруулна' }
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  {process.step}
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  {process.title}
                </h3>
                <p className="text-gray-600">
                  {process.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Төслийнхөө Талаар Зөвлөгөө Авахыг Хүсвэл
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Манай мэргэжилтэнүүд таны төсөлд зориулсан шилдэг шийдлийг санал болгох болно
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition-all transform hover:scale-105"
              >
                Үнэгүй Зөвлөгөө Авах
              </a>
              <a
                href="/projects"
                className="px-8 py-4 border border-white hover:bg-white hover:text-blue-900 rounded-lg font-semibold transition-all"
              >
              Манай Төслүүд Харах
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
