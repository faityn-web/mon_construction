"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { addProject } from "@/lib/data";
import { uploadImage } from "@/lib/storage";
import { useRouter } from "next/navigation";
import { Upload, X, Plus, Save } from "lucide-react";

export default function NewProject() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    category: "Орон сууц",
    description: "",
    status: "pending" as const,
    featured: false,
  });
  const [gallery, setGallery] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState("");
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const categories = ["Орон сууц", "Оффис", "Үйлдвэр", "Бусад"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload main image
      let mainImageUrl = "/api/placeholder/400/300";
      if (mainImageFile) {
        mainImageUrl = await uploadImage(mainImageFile);
      }

      // Upload gallery images
      let galleryUrls: string[] = [];
      if (galleryFiles.length > 0) {
        galleryUrls = await Promise.all(
          galleryFiles.map((file) => uploadImage(file)),
        );
      } else {
        galleryUrls = ["/api/placeholder/400/300"];
      }

      const projectData = {
        ...formData,
        image: mainImageUrl,
        gallery: galleryUrls,
      };

      await addProject(projectData);
      router.push("/admin/projects");
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Төсөл хадгалахад алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const addGalleryImage = () => {
    setGalleryFiles((prev) => [...prev, new File([], "")]);
  };

  const removeGalleryImage = (index: number) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
    setGallery((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMainImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImage(reader.result as string);
      };
      reader.readAsDataURL(file);
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

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const newGallery = [...gallery];
        newGallery[index] = reader.result as string;
        setGallery(newGallery);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Шинэ төсөл нэмэх</h1>
          <p className="text-gray-600">
            Шинэ барилгын төслийн мэдээллийг оруулна уу
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
                  value={formData.title}
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
                  value={formData.category}
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
                  value={formData.status}
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
                  checked={formData.featured}
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
                value={formData.description}
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
                {mainImage ? (
                  <div className="relative inline-block">
                    <img
                      src={mainImage}
                      alt="Main project image"
                      className="w-64 h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setMainImage("");
                        setMainImageFile(null);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 mb-2">
                      Үндсэн зураг оруулна уу
                    </p>
                    <label className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
                      Зураг сонгох
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleMainImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
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
              {galleryFiles.map((file, index) => (
                <div key={index} className="relative group">
                  {gallery[index] ? (
                    <>
                      <img
                        src={gallery[index]}
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
                    </>
                  ) : (
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
                  )}
                </div>
              ))}
            </div>

            {galleryFiles.length === 0 && (
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
              disabled={loading}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? (
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
