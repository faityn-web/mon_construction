'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { getTestimonials, updateTestimonial, deleteTestimonial } from '@/lib/supabase-data'
import { Testimonial } from '@/types'
import { 
  Users, 
  Star, 
  Edit, 
  Trash2, 
  Eye,
  Search,
  Filter,
  Plus
} from 'lucide-react'

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterActive, setFilterActive] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const data = await getTestimonials()
        setTestimonials(data)
      } catch (error) {
        console.error('Error loading testimonials:', error)
      } finally {
        setLoading(false)
      }
    }

    loadTestimonials()
  }, [])

  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterActive === 'all' || 
                         (filterActive === 'active' && testimonial.active) ||
                         (filterActive === 'inactive' && !testimonial.active)
    return matchesSearch && matchesFilter
  })

  const handleStatusChange = (id: string, active: boolean) => {
    updateTestimonial(id, { active })
      .then(() => {
        setTestimonials(prev => prev.map(t => 
          t.id === id ? { ...t, active, updated_at: new Date().toISOString() } : t
        ))
      })
      .catch(error => {
        console.error('Error updating testimonial:', error)
      })
  }

  const handleDelete = (id: string) => {
    if (confirm('Та энэ сэтгэгдлийг устгахдаа итгэлтэй байна уу?')) {
      deleteTestimonial(id)
        .then(() => {
          setTestimonials(prev => prev.filter(t => t.id !== id))
        })
        .catch(error => {
          console.error('Error deleting testimonial:', error)
        })
    }
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
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Сэтгэгдэл</h1>
            <p className="text-gray-600">Нийт {filteredTestimonials.length} сэтгэгдэл</p>
          </div>
          <a
            href="/admin/testimonials/new"
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Шинэ сэтгэгдэл
          </a>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Сэтгэгдэл хайх..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <select
              value={filterActive}
              onChange={(e) => setFilterActive(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Бүх төлөв</option>
              <option value="active">Идэвхитэй</option>
              <option value="inactive">Идэвхигүй</option>
            </select>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{testimonial.position}</p>
                      <p className="text-xs text-gray-500">{testimonial.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleStatusChange(testimonial.id, !testimonial.active)}
                      className={`p-2 rounded-lg transition-colors ${
                        testimonial.active 
                          ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      title={testimonial.active ? 'Идэвхитэй' : 'Идэвхигүй'}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    
                    <a
                      href={`/admin/testimonials/${testimonial.id}/edit`}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                      title="Засах"
                    >
                      <Edit className="w-4 h-4" />
                    </a>
                    
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      title="Устгах"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-3">
                  {renderStars(testimonial.rating)}
                  <span className="text-sm text-gray-600">({testimonial.rating}.0)</span>
                </div>

                {/* Content */}
                <p className="text-gray-700 line-clamp-3">
                  {testimonial.content}
                </p>
              </div>

              {/* Footer */}
              <div className="px-6 py-3 bg-gray-50 border-t">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    testimonial.active 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {testimonial.active ? 'Идэвхитэй' : 'Идэвхигүй'}
                  </span>
                  
                  <span className="text-xs text-gray-500">
                    {new Date(testimonial.created_at).toLocaleDateString('mn-MN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTestimonials.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">Сэтгэгдэл олдсонгүй</p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
