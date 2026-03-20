"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { getSettings, saveSettings } from "@/lib/supabase-data";
import { Save, X, Building2, Users, Award, Calendar } from "lucide-react";

export default function AboutManagement() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    company_name: "",
    phone: "",
    email: "",
    address: "",
    about_text: "",
    social_links: {
      facebook: "",
      twitter: "",
      instagram: "",
      youtube: "",
    } as { facebook: string; twitter: string; instagram: string; youtube: string },
    stats: {
      years: 0,
      projects: 0,
      engineers: 0,
      employees: 0,
    },
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await getSettings();
      if (data) {
        setSettings(data);
        setFormData({
          company_name: data.company_name || "",
          phone: data.phone || "",
          email: data.email || "",
          address: data.address || "",
          about_text: data.about_text || "",
          social_links: {
            facebook: data.social_links?.facebook || "",
            twitter: data.social_links?.twitter || "",
            instagram: data.social_links?.instagram || "",
            youtube: data.social_links?.youtube || "",
          },
          stats: data.stats || {
            years: 0,
            projects: 0,
            engineers: 0,
            employees: 0,
          },
        });
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await saveSettings({
        id: settings?.id || "1",
        ...formData,
        created_at: settings?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      setSettings({ ...formData, id: settings?.id || "1" });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  const handleCancel = () => {
    if (settings) {
      setFormData({
        company_name: settings.company_name || "",
        phone: settings.phone || "",
        email: settings.email || "",
        address: settings.address || "",
        about_text: settings.about_text || "",
        social_links: {
          facebook: settings.social_links?.facebook || "",
          twitter: settings.social_links?.twitter || "",
          instagram: settings.social_links?.instagram || "",
          youtube: settings.social_links?.youtube || "",
        },
        stats: settings.stats || {
          years: 0,
          projects: 0,
          engineers: 0,
          employees: 0,
        },
      });
    }
    setIsEditing(false);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Ачаалж байна...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Бидний тухай</h1>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Засварлах
            </button>
          )}
        </div>

        {/* View Mode */}
        {!isEditing && settings && (
          <div className="space-y-6">
            {/* Company Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Компанийн мэдээлэл
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Компанийн нэр
                  </label>
                  <p className="text-gray-900">{settings.company_name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Утас
                  </label>
                  <p className="text-gray-900">{settings.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Имэйл
                  </label>
                  <p className="text-gray-900">{settings.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Хаяг
                  </label>
                  <p className="text-gray-900">{settings.address}</p>
                </div>
              </div>
            </div>

            {/* About Text */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Бидний тухай</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{settings.about_text}</p>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Статистик
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-2">
                    {settings.stats?.years || 0}+
                  </div>
                  <div className="text-sm text-gray-600">Жилийн туршлага</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-2">
                    {settings.stats?.projects || 0}+
                  </div>
                  <div className="text-sm text-gray-600">Төсөл</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-2">
                    {settings.stats?.engineers || 0}+
                  </div>
                  <div className="text-sm text-gray-600">Инженер</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-2">
                    {settings.stats?.employees || 0}+
                  </div>
                  <div className="text-sm text-gray-600">Ажилтан</div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Сошиал сүлжээ</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Facebook
                  </label>
                  <p className="text-gray-900">{settings.social_links?.facebook || "-"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Twitter
                  </label>
                  <p className="text-gray-900">{settings.social_links?.twitter || "-"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Instagram
                  </label>
                  <p className="text-gray-900">{settings.social_links?.instagram || "-"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    YouTube
                  </label>
                  <p className="text-gray-900">{settings.social_links?.youtube || "-"}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Mode */}
        {isEditing && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Мэдээлэл засварлах</h2>
            
            {/* Company Info */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Компанийн мэдээлэл</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Компанийн нэр
                  </label>
                  <input
                    type="text"
                    value={formData.company_name}
                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Утас
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Имэйл
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Хаяг
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* About Text */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Бидний тухай
              </label>
              <textarea
                value={formData.about_text}
                onChange={(e) => setFormData({ ...formData, about_text: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                placeholder="Бидний тухай мэдээлэл оруулна уу"
              />
            </div>

            {/* Stats */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Статистик</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    Туршлага (жил)
                  </label>
                  <input
                    type="number"
                    value={formData.stats.years}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      stats: { ...formData.stats, years: parseInt(e.target.value) || 0 }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Building2 className="inline w-4 h-4 mr-1" />
                    Төсөл
                  </label>
                  <input
                    type="number"
                    value={formData.stats.projects}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      stats: { ...formData.stats, projects: parseInt(e.target.value) || 0 }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Users className="inline w-4 h-4 mr-1" />
                    Инженер
                  </label>
                  <input
                    type="number"
                    value={formData.stats.engineers}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      stats: { ...formData.stats, engineers: parseInt(e.target.value) || 0 }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Users className="inline w-4 h-4 mr-1" />
                    Ажилтан
                  </label>
                  <input
                    type="number"
                    value={formData.stats.employees}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      stats: { ...formData.stats, employees: parseInt(e.target.value) || 0 }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Сошиал сүлжээ</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Facebook
                  </label>
                  <input
                    type="text"
                    value={formData.social_links.facebook}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      social_links: { ...formData.social_links, facebook: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="URL оруулна уу"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Twitter
                  </label>
                  <input
                    type="text"
                    value={formData.social_links.twitter}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      social_links: { ...formData.social_links, twitter: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="URL оруулна уу"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Instagram
                  </label>
                  <input
                    type="text"
                    value={formData.social_links.instagram}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      social_links: { ...formData.social_links, instagram: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="URL оруулна уу"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    YouTube
                  </label>
                  <input
                    type="text"
                    value={formData.social_links.youtube}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      social_links: { ...formData.social_links, youtube: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="URL оруулна уу"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
              >
                <X className="w-4 h-4" />
                Цуцлах
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Save className="w-4 h-4" />
                Хадгалах
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
