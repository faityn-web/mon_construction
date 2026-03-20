'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Building2, Users, HardHat, Wrench } from 'lucide-react'

const stats = [
  {
    icon: Building2,
    value: 120,
    suffix: '+',
    label: 'Төслүүд',
    description: 'Амжилттай хэрэгжүүлсэн'
  },
  {
    icon: Users,
    value: 50,
    suffix: '+',
    label: 'Инженер',
    description: 'Мэргэжилтнүүд'
  },
  {
    icon: HardHat,
    value: 300,
    suffix: '+',
    label: 'Ажилтан',
    description: 'Нэгдсэн баг'
  },
  {
    icon: Wrench,
    value: 10,
    suffix: '+',
    label: 'Жил',
    description: 'Туршлага'
  }
]

interface AnimatedCounterProps {
  value: number
  suffix?: string
  duration?: number
}

function AnimatedCounter({ value, suffix = '', duration = 2000 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref)

  useEffect(() => {
    if (isInView) {
      const startTime = Date.now()
      const endTime = startTime + duration

      const updateCount = () => {
        const now = Date.now()
        const progress = Math.min((now - startTime) / duration, 1)
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        setCount(Math.floor(easeOutQuart * value))

        if (progress < 1) {
          requestAnimationFrame(updateCount)
        }
      }

      updateCount()
    }
  }, [isInView, value, duration])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="py-16 bg-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Манай Амжилт
          </h2>
          <p className="text-blue-200 max-w-2xl mx-auto">
            Тоон үзүүлэлтээр бидний амжилтыг хараарай
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-400 transition-colors duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Counter */}
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  <AnimatedCounter 
                    value={stat.value} 
                    suffix={stat.suffix}
                    duration={2000}
                  />
                </div>

                {/* Label */}
                <h3 className="text-xl font-semibold text-orange-400 mb-2">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-blue-200">
                  {stat.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a 
            href="#projects" 
            className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105"
          >
            Төслүүдээс харах
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
