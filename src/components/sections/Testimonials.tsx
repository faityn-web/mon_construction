'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Батбаяр Ганбаатар',
    position: 'Хан-Уул дүүргийн Орлогч Захирал',
    company: 'Хан-Уул дүүрэг',
    content: 'МонКонстракшн компани түүхэндээ хамгийн том орон сууцны төслийг амжилттай хэрэгжүүлсэн. Чанар, хугацаа, төсөв бүх зүйлд тухтай байсан.',
    rating: 5,
    image: '/api/placeholder/100/100'
  },
  {
    id: 2,
    name: 'Сарангэрэл Дамдинсүрэн',
    position: 'Гүйцэтгэх захирал',
    company: 'Технологи Парк ХХК',
    content: 'Орон сууцны барилгадаа тэднээс үнэлж хараагүй. Мэргэжлийн баг, хурдан гүйцэтгэл, чанарын хяналт төгс байсан.',
    rating: 5,
    image: '/api/placeholder/100/100'
  },
  {
    id: 3,
    name: 'Намуунцэцэг Батзориг',
    position: 'Төслийн менежер',
    company: 'Монгол Фүүдс ХХК',
    content: 'Хүнсний үйлдвэрийн байрыг олон улсын стандартын дагуу барьсан. Ажилчид маань их сэтгэл хангалуун байна.',
    rating: 5,
    image: '/api/placeholder/100/100'
  },
  {
    id: 4,
    name: 'Энхбат Бат-Эрдэнэ',
    position: 'Ерөнхий захирал',
    company: 'Логистик Төв ХХК',
    content: 'Төсөвтөө нааштай, чанараар дээд зэрэглэлийн барилга барьсан. Дараагийн төслөө тэдээс дахин захиулахаар шийдлээ.',
    rating: 5,
    image: '/api/placeholder/100/100'
  }
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section className="py-20 bg-gray-50">
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
            Харилцагчдын Сэтгэгдэл
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Манай компанитай хамтран ажилласан харилцагчдын бодит сэтгэгдэл
          </p>
        </motion.div>

        {/* Testimonials Slider */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
            >
              {/* Quote Icon */}
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <Quote className="w-8 h-8 text-orange-500" />
              </div>

              {/* Testimonial Content */}
              <div className="mb-8">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed italic">
                  "{testimonials[currentIndex].content}"
                </p>
              </div>

              {/* Rating */}
              <div className="flex mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Author Info */}
              <div className="flex items-center">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-lg font-semibold text-blue-900">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-gray-600">
                    {testimonials[currentIndex].position}
                  </p>
                  <p className="text-sm text-orange-500">
                    {testimonials[currentIndex].company}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentIndex === index
                  ? 'bg-orange-500 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

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
            Манай Харилцагчид болох
          </a>
        </motion.div>
      </div>
    </section>
  )
}
