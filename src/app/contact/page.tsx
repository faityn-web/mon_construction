'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Phone, Mail, MapPin, Send, Clock, MessageSquare, CheckCircle } from 'lucide-react'
import { createContact } from '@/lib/supabase-data'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const contactData = {
        ...formData,
        status: 'new' as const
      }
      
      await createContact(contactData)
      setSubmitStatus('success')
      setFormData({ name: '', phone: '', email: '', message: '' })
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 3000)
    } catch (error) {
      console.error('Error submitting contact form:', error)
      setSubmitStatus('error')
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      title: 'Утас',
      content: '+976 9999-9999',
      description: 'Ажлын өдөр 9:00-18:00'
    },
    {
      icon: Mail,
      title: 'Имэйл',
      content: 'info@monconstr.mn',
      description: '24/7 онлайн'
    },
    {
      icon: MapPin,
      title: 'Хаяг',
      content: 'Улаанбаатар хот, 1-р хороо, Бөхийн өргөөний гудамж-8',
      description: 'Байршил'
    },
    {
      icon: Clock,
      title: 'Ажлын цаг',
      content: 'Даваа-Баасан: 9:00-18:00',
      description: 'Бямба-Ням: Амралт'
    }
  ]

  const services = [
    'Барилгын зураг төсөл',
    'Барилга угсралт',
    'Интерьер дизайн',
    'Инженерийн шийдэл',
    'Орон сууцны барилга',
    'Оффис барилга',
    'Үйлдвэрийн барилга',
    'Засвар үйлчилгээ'
  ]

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
              Холбоо Барих
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Таны төсөлд зориулж бидэнтэй холбогдож, зөвлөгөө аваарай
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
                  <MessageSquare className="w-6 h-6 mr-2 text-orange-500" />
                  Мессеж Илгээх
                </h2>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
                  >
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Таны мессеж амжилттай илгээгдлээ! Бид тантай удахгүй холбогдох болно.
                    </div>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
                  >
                    Мессеж илгээхэд алдаа гарлаа. Дахин оролдоно уу.
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Нэр *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="Таны нэр"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Утас *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="Утасны дугаар"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Имэйл
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Мессеж *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                      placeholder="Таны мессеж энд..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-semibold py-4 rounded-lg transition-all transform hover:scale-105 disabled:scale-100 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Илгээж байна...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Мессеж илгээх
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Map Placeholder */}
              <div className="rounded-2xl overflow-hidden shadow-lg h-64 bg-gray-200">
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p className="font-semibold">Газрын зураг</p>
                    <p className="text-sm">Улаанбаатар хот</p>
                  </div>
                </div>
              </div>

              {/* Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-orange-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-900 mb-1">
                            {info.title}
                          </h4>
                          <p className="text-gray-700 mb-1">
                            {info.content}
                          </p>
                          <p className="text-sm text-gray-500">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Quick Response */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="bg-blue-900 text-white rounded-xl p-6"
              >
                <h4 className="text-lg font-semibold mb-2">
                  Хурдан Хариу Өгнө
                </h4>
                <p className="text-blue-200 mb-4">
                  Бид таны мессежийг хүлээн авч 24 цагийн дотор хариу өгөх болно.
                </p>
                <div className="flex items-center space-x-4">
                  <a 
                    href="tel:+97699999999" 
                    className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Шууд залгах
                  </a>
                  <a 
                    href="mailto:info@monconstr.mn" 
                    className="border border-white hover:bg-white hover:text-blue-900 px-4 py-2 rounded-lg font-medium transition-all"
                  >
                    Имэйл илгээх
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
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
              Манай Үйлчилгээ
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Таны бүх барилгын хэрэгцээнд зориулсан бүрэн хүрээний үйлчилгээ
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-4 text-center hover:bg-orange-50 transition-colors"
              >
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-5 h-5 text-orange-500" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {service}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
