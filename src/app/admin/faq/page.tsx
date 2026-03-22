"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { getFAQs, updateFAQ, deleteFAQ, initializeFAQData } from "@/lib/data";
import { FAQ } from "@/types";
import {
  HelpCircle,
  Edit,
  Trash2,
  Eye,
  Search,
  Plus,
  GripVertical,
} from "lucide-react";

const categoryOptions = [
  { value: "general", label: "Ерөнхий асуулт" },
  { value: "projects", label: "Төслийн асуулт" },
  { value: "technical", label: "Техникийн асуулт" },
];

export default function AdminFAQs() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterActive, setFilterActive] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFAQs = async () => {
      try {
        const data = await getFAQs();
        setFaqs(data);
      } catch (error) {
        console.error("Error loading FAQs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFAQs();
  }, []);

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || faq.category === filterCategory;
    const matchesFilter =
      filterActive === "all" ||
      (filterActive === "active" && faq.active) ||
      (filterActive === "inactive" && !faq.active);
    return matchesSearch && matchesCategory && matchesFilter;
  });

  const handleStatusChange = (id: string, active: boolean) => {
    updateFAQ(id, { active })
      .then(() => {
        setFaqs((prev) =>
          prev.map((f) =>
            f.id === id
              ? { ...f, active, updated_at: new Date().toISOString() }
              : f,
          ),
        );
      })
      .catch((error) => {
        console.error("Error updating FAQ:", error);
      });
  };

  const handleDelete = (id: string) => {
    if (confirm("Та энэ асуултыг устгахдаа итгэлтэй байна уу?")) {
      deleteFAQ(id)
        .then(() => {
          setFaqs((prev) => prev.filter((f) => f.id !== id));
        })
        .catch((error) => {
          console.error("Error deleting FAQ:", error);
        });
    }
  };

  const moveFAQ = (id: string, direction: "up" | "down") => {
    const currentIndex = faqs.findIndex((f) => f.id === id);
    if (
      (direction === "up" && currentIndex === 0) ||
      (direction === "down" && currentIndex === faqs.length - 1)
    ) {
      return;
    }

    const newFAQs = [...faqs];
    const targetIndex =
      direction === "up" ? currentIndex - 1 : currentIndex + 1;

    // Swap positions
    const temp = newFAQs[currentIndex].order_num;
    newFAQs[currentIndex].order_num = newFAQs[targetIndex].order_num;
    newFAQs[targetIndex].order_num = temp;

    // Reorder array
    newFAQs.sort((a, b) => a.order_num - b.order_num);
    setFaqs(newFAQs);

    // Update in database
    updateFAQ(id, { order_num: newFAQs[currentIndex].order_num })
      .then(() => {
        updateFAQ(newFAQs[targetIndex].id, {
          order_num: newFAQs[targetIndex].order_num,
        });
      })
      .catch((error) => {
        console.error("Error reordering FAQs:", error);
      });
  };

  const getCategoryLabel = (category: string) => {
    const cat = categoryOptions.find((c) => c.value === category);
    return cat ? cat.label : category;
  };

  const handleInitializeSampleData = async () => {
    if (confirm("Та жишээ асуултуудыг оруулахдаа итгэлтэй байна уу?")) {
      try {
        await initializeFAQData();
        // Reload the FAQs
        const data = await getFAQs();
        setFaqs(data);
        alert("Жишээ асуултууд амжилттай оруулагдлаа!");
      } catch (error) {
        console.error("Error initializing sample data:", error);
        alert("Жишээ өгөгдөл оруулахад алдаа гарлаа!");
      }
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Түгээмэл Асуулт Хариулт</h1>
            <p className="text-gray-600">
              Нийт {filteredFAQs.length} асуулт
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="/admin/faq/new"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Шинэ асуулт
            </a>
            <button
              onClick={handleInitializeSampleData}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Жишээ өгөгдөл оруулах
            </button>
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
                  placeholder="Асуулт хариулт хайх..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Бүх ангилал</option>
              {categoryOptions.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>

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

        {/* FAQs List */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <div key={faq.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  {/* Drag Handle */}
                  <div className="flex flex-col space-y-1">
                    <button
                      onClick={() => moveFAQ(faq.id, "up")}
                      disabled={index === 0}
                      className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <GripVertical className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveFAQ(faq.id, "down")}
                      disabled={index === faqs.length - 1}
                      className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <GripVertical className="w-4 h-4 rotate-180" />
                    </button>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    <HelpCircle className="w-6 h-6" />
                  </div>

                  {/* FAQ Info */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {faq.answer}
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-xs text-gray-500">
                        Дараалал: {faq.order_num}
                      </span>
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        {getCategoryLabel(faq.category)}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          faq.active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {faq.active ? "Идэвхитэй" : "Идэвхигүй"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      handleStatusChange(faq.id, !faq.active)
                    }
                    className={`p-2 rounded-lg transition-colors ${
                      faq.active
                        ? "bg-green-100 text-green-600 hover:bg-green-200"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    title={faq.active ? "Идэвхитэй" : "Идэвхигүй"}
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <a
                    href={`/admin/faq/${faq.id}`}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    title="Засах"
                  >
                    <Edit className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => handleDelete(faq.id)}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    title="Устгах"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <HelpCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">Асуулт олдсонгүй</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
