'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Users, Award, Clock } from 'lucide-react'

export default function About() {
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

  return (
    <section id="about" className="py-20 bg-gray-50">
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
            Бидний Тухай
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Монголын тэргүүлэгч барилгын компани - чанар, туршлага, найдвартай байдал
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://res.cloudinary.com/dsf9igcmh/image/upload/v1774009025/ChatGPT_Image_Mar_20_2026_08_16_05_PM_xkivkp.png"
                alt="Барилгын инженер"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent"></div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-orange-500 text-white p-6 rounded-xl shadow-xl">
              <div className="text-3xl font-bold mb-1">10+</div>
              <div className="text-sm">жилийн туршлага</div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                МонКонстракшн ХХК
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                2014 оноос хойш манай компани Монгол Улсын барилгын салбарт тэргүүлэх байр суурь эзэлж, 
                орон сууц, оффис, үйлдвэрийн барилгын төслүүдийг амжилттай хэрэгжүүлж ирлээ. 
                Бид чанар, хамгаалалт, хугацаанд гүйцэтгэлийг эрхэмлэн түлхүүлдэг.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Манай зорилго бол харилцагч таны хүсэл эрмэлзлийг биелүүлж, орчин үеийн, 
                бат бөх, тав тухтай барилгыг бүтээх явдал юм. Бидний мэргэжилтнүүд сүүлийн үеийн 
                технологи, материал ашиглан дэлхийн стандартын барилгыг бүтээхэд тань тусална.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-orange-500" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <a 
                href="#contact" 
                className="inline-flex items-center bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
              >
                Манай багтай танилцах
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
