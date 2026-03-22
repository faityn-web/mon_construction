"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { getServices, updateService, deleteService } from "@/lib/data";
import { Service } from "@/types";
import {
  Settings,
  Edit,
  Trash2,
  Eye,
  Search,
  Plus,
  GripVertical,
} from "lucide-react";

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

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActive, setFilterActive] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        console.error("Error loading services:", error);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterActive === "all" ||
      (filterActive === "active" && service.active) ||
      (filterActive === "inactive" && !service.active);
    return matchesSearch && matchesFilter;
  });

  const handleStatusChange = (id: string, active: boolean) => {
    updateService(id, { active })
      .then(() => {
        setServices((prev) =>
          prev.map((s) =>
            s.id === id
              ? { ...s, active, updated_at: new Date().toISOString() }
              : s,
          ),
        );
      })
      .catch((error) => {
        console.error("Error updating service:", error);
      });
  };

  const handleDelete = (id: string) => {
    if (confirm("Та энэ үйлчилгээг устгахдаа итгэлтэй байна уу?")) {
      deleteService(id)
        .then(() => {
          setServices((prev) => prev.filter((s) => s.id !== id));
        })
        .catch((error) => {
          console.error("Error deleting service:", error);
        });
    }
  };

  const moveService = (id: string, direction: "up" | "down") => {
    const currentIndex = services.findIndex((s) => s.id === id);
    if (
      (direction === "up" && currentIndex === 0) ||
      (direction === "down" && currentIndex === services.length - 1)
    ) {
      return;
    }

    const newServices = [...services];
    const targetIndex =
      direction === "up" ? currentIndex - 1 : currentIndex + 1;

    // Swap positions
    const temp = newServices[currentIndex].order_num;
    newServices[currentIndex].order_num = newServices[targetIndex].order_num;
    newServices[targetIndex].order_num = temp;

    // Reorder array
    newServices.sort((a, b) => a.order_num - b.order_num);
    setServices(newServices);

    // Update in database
    updateService(id, { order_num: newServices[currentIndex].order_num })
      .then(() => {
        updateService(newServices[targetIndex].id, {
          order_num: newServices[targetIndex].order_num,
        });
      })
      .catch((error) => {
        console.error("Error reordering services:", error);
      });
  };

  const getIconComponent = (iconName: string) => {
    // This would normally import the actual icon component
    // For now, return a placeholder
    return (
      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
        {iconName.charAt(0)}
      </div>
    );
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
            <h1 className="text-2xl font-bold text-gray-900">Үйлчилгээ</h1>
            <p className="text-gray-600">
              Нийт {filteredServices.length} үйлчилгээ
            </p>
          </div>
          <a
            href="/admin/services/new"
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Шинэ үйлчилгээ
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
                  placeholder="Үйлчилгээ хайх..."
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

        {/* Services List */}
        <div className="space-y-4">
          {filteredServices.map((service, index) => (
            <div key={service.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  {/* Drag Handle */}
                  <div className="flex flex-col space-y-1">
                    <button
                      onClick={() => moveService(service.id, "up")}
                      disabled={index === 0}
                      className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <GripVertical className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveService(service.id, "down")}
                      disabled={index === services.length - 1}
                      className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <GripVertical className="w-4 h-4 rotate-180" />
                    </button>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    {getIconComponent(service.icon)}
                  </div>

                  {/* Service Info */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {service.description}
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-xs text-gray-500">
                        Дараалал: {service.order_num}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          service.active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {service.active ? "Идэвхитэй" : "Идэвхигүй"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      handleStatusChange(service.id, !service.active)
                    }
                    className={`p-2 rounded-lg transition-colors ${
                      service.active
                        ? "bg-green-100 text-green-600 hover:bg-green-200"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    title={service.active ? "Идэвхитэй" : "Идэвхигүй"}
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <a
                    href={`/admin/services/${service.id}`}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    title="Засах"
                  >
                    <Edit className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => handleDelete(service.id)}
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

        {filteredServices.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <Settings className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">Үйлчилгээ олдсонгүй</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
