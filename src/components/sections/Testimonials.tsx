'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { getTestimonials } from '@/lib/supabase-data'
import { Testimonial } from '@/types'

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const data = await getTestimonials()
        // Filter only active testimonials for frontend
        const activeTestimonials = data.filter(t => t.active)
        setTestimonials(activeTestimonials)
      } catch (error) {
        console.error('Error loading testimonials:', error)
      } finally {
        setLoading(false)
      }
    }

    loadTestimonials()
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Сэтгэгдэл ачаалж байна...</p>
          </div>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Quote className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">Одоогоор сэтгэгдэл байхгүй байна</p>
          </div>
        </div>
      </section>
    )
  }

  const currentTestimonial = testimonials[currentIndex]

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
        {currentTestimonial && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Content */}
                <div className="order-2 lg:order-1">
                  <Quote className="w-12 h-12 text-blue-200 mb-6" />
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 italic"
                  >
                    "{currentTestimonial.content}"
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex items-center space-x-4"
                  >
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                        {currentTestimonial.name}
                      </h3>
                      <p className="text-gray-600">
                        {currentTestimonial.position}
                      </p>
                      <p className="text-sm text-gray-500">
                        {currentTestimonial.company}
                      </p>
                    </div>
                  </motion.div>

                  {/* Rating */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex items-center space-x-1 mt-4"
                  >
                    {renderStars(currentTestimonial.rating)}
                  </motion.div>
                </div>

                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="order-1 lg:order-2 flex justify-center"
                >
                  <div className="relative">
                    <img
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover shadow-lg"
                    />
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full"></div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Navigation */}
            {testimonials.length > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-center justify-center space-x-4 mt-8"
              >
                <button
                  onClick={prevTestimonial}
                  className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
                  aria-label="Өмнөх сэтгэгдэл"
                >
                  <ChevronLeft className="w-5 h-5 text-blue-600" />
                </button>

                {/* Indicators */}
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentIndex
                          ? 'bg-orange-500 w-8'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Сэтгэгдэл ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextTestimonial}
                  className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
                  aria-label="Дараагийн сэтгэгдэл"
                >
                  <ChevronRight className="w-5 h-5 text-blue-600" />
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

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
