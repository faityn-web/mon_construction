"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { getHeroes, addHero, updateHero, deleteHero } from "@/lib/data";
import { Hero } from "@/types";
import {
  Plus,
  Edit2,
  Trash2,
  MoveUp,
  MoveDown,
  Image,
  Eye,
  EyeOff,
  Save,
  X,
} from "lucide-react";

export default function HeroManagement() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingHero, setEditingHero] = useState<Hero | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    image: "",
    active: true,
  });

  useEffect(() => {
    loadHeroes();
  }, []);

  const loadHeroes = async () => {
    try {
      const data = await getHeroes();
      setHeroes(data);
    } catch (error) {
      console.error("Error loading heroes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddHero = () => {
    setIsAddingNew(true);
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      image: "",
      active: true,
    });
  };

  const handleEditHero = (hero: Hero) => {
    setEditingHero(hero);
    setFormData({
      title: hero.title,
      subtitle: hero.subtitle,
      description: hero.description,
      image: hero.image,
      active: hero.active,
    });
  };

  const handleSaveHero = async () => {
    try {
      if (isAddingNew) {
        const newHero = await addHero({
          ...formData,
          order_num: heroes.length + 1,
        });
        setHeroes([...heroes, newHero]);
        setIsAddingNew(false);
      } else if (editingHero) {
        await updateHero(editingHero.id, formData);
        setHeroes(heroes.map(h => h.id === editingHero.id ? { ...h, ...formData } : h));
        setEditingHero(null);
      }
      setFormData({ title: "", subtitle: "", description: "", image: "", active: true });
    } catch (error) {
      console.error("Error saving hero:", error);
    }
  };

  const handleDeleteHero = async (id: string) => {
    if (confirm("Та энэ hero-г устгахдаа итгэлтэй байна уу?")) {
      try {
        await deleteHero(id);
        setHeroes(heroes.filter(h => h.id !== id));
      } catch (error) {
        console.error("Error deleting hero:", error);
      }
    }
  };

  const handleMoveHero = async (id: string, direction: "up" | "down") => {
    const currentIndex = heroes.findIndex(h => h.id === id);
    if (
      (direction === "up" && currentIndex === 0) ||
      (direction === "down" && currentIndex === heroes.length - 1)
    ) {
      return;
    }

    const newHeroes = [...heroes];
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    
    // Swap positions
    [newHeroes[currentIndex], newHeroes[targetIndex]] = [newHeroes[targetIndex], newHeroes[currentIndex]];
    
    // Update order_num
    const updatedHeroes = newHeroes.map((hero, index) => ({
      ...hero,
      order_num: index + 1,
    }));

    setHeroes(updatedHeroes);

    // Update in database
    try {
      for (const hero of updatedHeroes) {
        await updateHero(hero.id, { order_num: hero.order_num });
      }
    } catch (error) {
      console.error("Error updating hero order:", error);
      // Revert on error
      setHeroes(heroes);
    }
  };

  const handleToggleActive = async (id: string, active: boolean) => {
    try {
      await updateHero(id, { active });
      setHeroes(heroes.map(h => h.id === id ? { ...h, active } : h));
    } catch (error) {
      console.error("Error updating hero status:", error);
    }
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingHero(null);
    setFormData({ title: "", subtitle: "", description: "", image: "", active: true });
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
          <h1 className="text-2xl font-bold text-gray-900">Нүүр хуудасны Hero хэсэг</h1>
          <button
            onClick={handleAddHero}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Шинэ Hero нэмэх
          </button>
        </div>

        {/* Add/Edit Form */}
        {(isAddingNew || editingHero) && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {isAddingNew ? "Шинэ Hero нэмэх" : "Hero засварлах"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Гарчиг
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Гарчиг оруулна уу"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Дэд гарчиг
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Дэд гарчиг оруулна уу"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Тайлбар
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Тайлбар оруулна уу"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Зурагны URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Зурагны URL оруулна уу"
                  />
                  <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
                    <Image className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Идэвхтэй</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
              >
                <X className="w-4 h-4" />
                Цуцлах
              </button>
              <button
                onClick={handleSaveHero}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Save className="w-4 h-4" />
                Хадгалах
              </button>
            </div>
          </div>
        )}

        {/* Heroes List */}
        <div className="space-y-4">
          {heroes.map((hero, index) => (
            <div
              key={hero.id}
              className={`bg-white rounded-lg shadow-md p-6 ${
                !hero.active ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{hero.title}</h3>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        hero.active
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {hero.active ? "Идэвхтэй" : "Идэвхгүй"}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{hero.subtitle}</p>
                  <p className="text-gray-500 text-sm mb-3">{hero.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Image className="w-4 h-4" />
                    <span>{hero.image}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleMoveHero(hero.id, "up")}
                    disabled={index === 0}
                    className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <MoveUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleMoveHero(hero.id, "down")}
                    disabled={index === heroes.length - 1}
                    className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <MoveDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleToggleActive(hero.id, !hero.active)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {hero.active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleEditHero(hero)}
                    className="p-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteHero(hero.id)}
                    className="p-2 text-red-600 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {heroes.length === 0 && !isAddingNew && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Image className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Hero байхгүй байна</h3>
            <p className="text-gray-500 mb-4">Нүүр хуудасны hero хэсгийг нэмэх боломжтой</p>
            <button
              onClick={handleAddHero}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Эхний Hero нэмэх
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
