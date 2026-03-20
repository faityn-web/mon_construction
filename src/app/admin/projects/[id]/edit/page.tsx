"use client";

import { useState, useEffect } from "react";
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { getProjects, updateProject } from "@/lib/data";
import { uploadImage } from "@/lib/storage";
import { useRouter } from "next/navigation";
import { Upload, X, Plus, Save } from "lucide-react";
import { Project } from "@/types";

export default function EditProject({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const paramsId = React.use(params);

  const categories = ["Орон сууц", "Оффис", "Үйлдвэр", "Бусад"];

  useEffect(() => {
    loadProject();
  }, [paramsId.id]);

  const loadProject = async () => {
    try {
      const projects = await getProjects();
      const foundProject = projects.find((p) => p.id === paramsId.id);
      console.log(foundProject);

      if (foundProject) {
        setProject(foundProject);
      } else {
        alert("Төсөл олдсонгүй");
        router.push("/admin/projects");
      }
    } catch (error) {
      console.error("Error loading project:", error);
      alert("Төсөл ачаалахад алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) return;

    setSaving(true);

    try {
      // Upload new main image if selected
      let imageUrl = project.image;
      if (mainImageFile) {
        imageUrl = await uploadImage(mainImageFile);
        console.log(imageUrl);
      }

      // Upload new gallery images if selected
      let galleryUrls = project.gallery || [];
      if (galleryFiles.length > 0) {
        const newGalleryUrls = await Promise.all(
          galleryFiles.map((file) => uploadImage(file)),
        );
        galleryUrls = [...galleryUrls, ...newGalleryUrls];
      }

      const updates = {
        ...project,
        image: imageUrl,
        gallery: galleryUrls,
      };

      const { created_at, id, ...safeUpdates } = updates;
      await updateProject(project.id, safeUpdates);
      router.push("/admin/projects");
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Төсөл шинэчлэхэд алдаа гарлаа");
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    if (!project) return;

    const { name, value, type } = e.target;
    setProject((prev) => ({
      ...prev!,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const addGalleryImage = () => {
    if (!project) return;
    setGalleryFiles((prev) => [...prev, new File([], "")]);
  };

  const removeGalleryImage = (index: number) => {
    if (!project) return;
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
    setProject((prev) => ({
      ...prev!,
      gallery: prev!.gallery?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMainImageFile(file);
    }
  };

  const handleGalleryImageChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const newFiles = [...galleryFiles];
      newFiles[index] = file;
      setGalleryFiles(newFiles);
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

  if (!project) {
    return (
      <AdminLayout>
        <div className="text-center py-8">
          <p className="text-gray-500">Төсөл олдсонгүй</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Төсөл засах</h1>
          <p className="text-gray-600">
            "{project.title}" төслийн мэдээллийг засварлана уу
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Үндсэн мэдээлэл
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Төслийн нэр *
                </label>
                <input
                  type="text"
                  name="title"
                  value={project.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Төслийн нэрийг оруулна уу"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ангилал *
                </label>
                <select
                  name="category"
                  value={project.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Төлөв
                </label>
                <select
                  name="status"
                  value={project.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="pending">Хүлээгдэж буй</option>
                  <option value="active">Идэвхитэй</option>
                  <option value="completed">Дууссан</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="featured"
                  id="featured"
                  checked={project.featured || false}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="featured"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Онцлох төсөл
                </label>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Тайлбар *
              </label>
              <textarea
                name="description"
                value={project.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Төслийн тухай дэлгэрэнгүй тайлбар..."
              />
            </div>
          </div>

          {/* Main Image */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Үндсэн зураг
            </h2>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="text-center">
                <div className="relative inline-block">
                  <img
                    src={project.image}
                    alt="Main project image"
                    className="w-64 h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setProject((prev) => ({
                        ...prev!,
                        image: "/api/placeholder/400/300",
                      }))
                    }
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-4">
                  <label className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
                    Шинэ зураг солих
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleMainImageChange}
                      className="hidden"
                    />
                  </label>
                  {mainImageFile && (
                    <p className="text-sm text-green-600 mt-2">
                      Зураг сонгогдсон: {mainImageFile.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Галерей</h2>
              <button
                type="button"
                onClick={addGalleryImage}
                className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-1" />
                Зураг нэмэх
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(project.gallery || []).map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {galleryFiles.map((file, index) => (
                <div key={`new-${index}`} className="relative group">
                  <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <label className="cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-xs text-gray-500">
                        Зураг сонгох
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleGalleryImageChange(index, e)}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>

            {(!project.gallery || project.gallery.length === 0) &&
              galleryFiles.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Upload className="w-12 h-12 mx-auto mb-4" />
                  <p>Зураг оруулаагүй байна</p>
                </div>
              )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between bg-white rounded-lg shadow p-6">
            <button
              type="button"
              onClick={() => router.push("/admin/projects")}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Цуцлах
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Хадглаж байна...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Хадгалах
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
