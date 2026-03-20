'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { getContacts, saveContacts } from '@/lib/data'
import { Contact } from '@/types'
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  Search,
  Filter,
  Check,
  Eye,
  Trash2
} from 'lucide-react'

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const data = await getContacts()
        setContacts(data)
      } catch (error) {
        console.error('Error loading contacts:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadContacts()
  }, [])

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || contact.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleStatusChange = (id: string, newStatus: Contact['status']) => {
    const updatedContacts = contacts.map(c => 
      c.id === id ? { ...c, status: newStatus, updatedAt: new Date() } : c
    )
    saveContacts(updatedContacts)
    setContacts(updatedContacts)
  }

  const handleDelete = (id: string) => {
    if (confirm('Та энэ мессежийг устгахдаа итгэлтэй байна уу?')) {
      const updatedContacts = contacts.filter(c => c.id !== id)
      saveContacts(updatedContacts)
      setContacts(updatedContacts)
      if (selectedContact?.id === id) {
        setSelectedContact(null)
      }
    }
  }

  const markAsRead = (id: string) => {
    handleStatusChange(id, 'read')
  }

  const markAsResponded = (id: string) => {
    handleStatusChange(id, 'responded')
  }

  const getStatusColor = (status: Contact['status']) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800'
      case 'read': return 'bg-yellow-100 text-yellow-800'
      case 'responded': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: Contact['status']) => {
    switch (status) {
      case 'new': return 'Шинэ'
      case 'read': return 'Уншсан'
      case 'responded': return 'Хариу өгсөн'
      default: return 'Тодорхойгүй'
    }
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contacts List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Холбогдол</h1>
              <p className="text-gray-600">Нийт {filteredContacts.length} мессеж</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Мессеж хайх..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Бүх төлөв</option>
                <option value="new">Шинэ</option>
                <option value="read">Уншсан</option>
                <option value="responded">Хариу өгсөн</option>
              </select>
            </div>
          </div>

          {/* Contacts List */}
          <div className="space-y-4">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className={`bg-white rounded-lg shadow p-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedContact?.id === contact.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => {
                  setSelectedContact(contact)
                  if (contact.status === 'new') {
                    markAsRead(contact.id)
                  }
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      contact.status === 'new' ? 'bg-red-500' :
                      contact.status === 'read' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(contact.status)}`}>
                          {getStatusText(contact.status)}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          {contact.email}
                        </div>
                        {contact.phone && (
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-1" />
                            {contact.phone}
                          </div>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-700 line-clamp-2">{contact.message}</p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-gray-500">
                          {new Date(contact.created_at).toLocaleDateString('mn-MN', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                        
                        <div className="flex items-center space-x-2">
                          {contact.status === 'new' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                markAsRead(contact.id)
                              }}
                              className="text-yellow-600 hover:text-yellow-700"
                              title="Уншсанаар тэмдэглэх"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                          
                          {contact.status === 'read' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                markAsResponded(contact.id)
                              }}
                              className="text-green-600 hover:text-green-700"
                              title="Хариу өгсөнөөр тэмдэглэх"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDelete(contact.id)
                            }}
                            className="text-red-600 hover:text-red-700"
                            title="Устгах"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredContacts.length === 0 && (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">Мессеж олдсонгүй</p>
            </div>
          )}
        </div>

        {/* Contact Detail */}
        <div className="lg:col-span-1">
          {selectedContact ? (
            <div className="bg-white rounded-lg shadow p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Мессежийн дэлгэрэнгүй</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Нэр</label>
                  <p className="text-gray-900">{selectedContact.name}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Имэйл</label>
                  <p className="text-gray-900">{selectedContact.email}</p>
                </div>
                
                {selectedContact.phone && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Утас</label>
                    <p className="text-gray-900">{selectedContact.phone}</p>
                  </div>
                )}
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Төлөв</label>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(selectedContact.status)}`}>
                    {getStatusText(selectedContact.status)}
                  </span>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Мессеж</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedContact.message}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Илгээсэн огноо</label>
                  <p className="text-gray-900">
                    {new Date(selectedContact.created_at).toLocaleDateString('mn-MN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                
                {/* Quick Actions */}
                <div className="flex space-x-2 pt-4 border-t">
                  {selectedContact.status === 'new' && (
                    <button
                      onClick={() => markAsRead(selectedContact.id)}
                      className="flex-1 px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 text-sm"
                    >
                      Уншсанаар тэмдэглэх
                    </button>
                  )}
                  
                  {selectedContact.status === 'read' && (
                    <button
                      onClick={() => markAsResponded(selectedContact.id)}
                      className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                    >
                      Хариу өгсөнөөр тэмдэглэх
                    </button>
                  )}
                  
                  <a
                    href={`mailto:${selectedContact.email}`}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm text-center"
                  >
                    Хариу бичих
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">Мессеж сонгоно уу</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
