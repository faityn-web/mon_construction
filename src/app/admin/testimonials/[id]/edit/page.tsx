'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { getTestimonial, updateTestimonial } from '@/lib/supabase-data'
import { useRouter, useParams } from 'next/navigation'
import { 
  Upload, 
  X, 
  Save,
  Star,
  ArrowLeft
} from 'lucide-react'
import { Testimonial } from '@/types'

export default function EditTestimonial() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    company: '',
    content: '',
    rating: 5,
    image: '',
    active: true
  })
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const testimonial = await getTestimonial(id)
        if (testimonial) {
          setFormData({
            name: testimonial.name,
            position: testimonial.position,
            company: testimonial.company,
            content: testimonial.content,
            rating: testimonial.rating,
            image: testimonial.image,
            active: testimonial.active
          })
        }
      } catch (error) {
        console.error('Error fetching testimonial:', error)
        alert('Сэтгэгдэл олхгүй байна')
        router.push('/admin/testimonials')
      } finally {
        setFetchLoading(false)
      }
    }

    fetchTestimonial()
  }, [id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await updateTestimonial(id, formData)
      router.push('/admin/testimonials')
    } catch (error) {
      console.error('Error updating testimonial:', error)
      alert('Сэтгэгдэл шинэчлэхэд алдаа гарлаа')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => setFormData(prev => ({ ...prev, rating: i + 1 }))}
        className={`w-6 h-6 transition-colors ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300 hover:text-yellow-400'
        }`}
      >
        <Star className="w-full h-full" />
      </button>
    ))
  }

  if (fetchLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={() => router.push('/admin/testimonials')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Буцах
            </button>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900">Сэтгэгдэл засах</h1>
          <p className="text-gray-600">Сэтгэгдлийн мэдээллийг шинэчлэх</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Нэр *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Нэрээ оруулна уу"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Албан тушаал
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Албан тушаал"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Компани / Байгууллага
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Компани нэр"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Рейтинг *
                </label>
                <div className="flex items-center space-x-2">
                  {renderStars(formData.rating)}
                  <span className="text-sm text-gray-600">({formData.rating}.0)</span>
                </div>
              </div>
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Зураг
              </label>
              <div className="flex items-center space-x-4">
                {formData.image && (
                  <div className="relative">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Зурагны URL эсвэл placeholder/width/height"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Сэтгэгдэл *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Сэтгэгдлийн агуулга..."
              />
            </div>

            {/* Active Status */}
            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="active"
                  checked={formData.active}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Идэвхитэй (вэбсайт харагдах)
                </span>
              </label>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => router.push('/admin/testimonials')}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Цуцлах
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Хадгалах
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}
