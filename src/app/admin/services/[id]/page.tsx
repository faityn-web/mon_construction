'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { getService, updateService } from '@/lib/data';
import { useRouter, useParams } from 'next/navigation'
import { 
  Upload, 
  X, 
  Save,
  GripVertical
} from 'lucide-react'
import { Service } from '@/types'

const iconOptions = [
  "FileText",
  "Building",
  "Palette",
  "Wrench",
  "Home",
  "Tool",
  "Hammer",
  "Blueprint",
];

export default function EditService() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'FileText',
    active: true
  })
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)

  useEffect(() => {
    const fetchService = async () => {
      try {
        const service = await getService(id)
        if (service) {
          setFormData({
            title: service.title,
            description: service.description,
            icon: service.icon,
            active: service.active
          })
        }
      } catch (error) {
        console.error('Error fetching service:', error)
        alert('Үйлчилгэл олхгүй байна')
        router.push('/admin/services')
      } finally {
        setFetchLoading(false)
      }
    }

    fetchService()
  }, [id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await updateService(id, formData)
      router.push('/admin/services')
    } catch (error) {
      console.error('Error updating service:', error)
      alert('Үйлчилгэл шинэчлэхэд алдаа гарлаа')
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
              onClick={() => router.push('/admin/services')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <X className="w-4 h-4 mr-2" />
              Буцах
            </button>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900">Үйлчилгэл засах</h1>
          <p className="text-gray-600">Үйлчилгэлийн мэдээллийг шинэчлэх</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Үйлчилгэлийн нэр *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Үйлчилгэлийн нэрээ оруулна уу"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Тайлбар *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Үйлчилгэлийн тайлбарын агуулга..."
              />
            </div>

            {/* Icon */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Икон *
              </label>
              <select
                name="icon"
                value={formData.icon}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {iconOptions.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
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
                onClick={() => router.push('/admin/services')}
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
