"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ExternalLink, Filter } from "lucide-react";
import { getProjects, getProjectsHome } from "@/lib/supabase-data";

const projects = [
  {
    id: "1",
    title: "Хан-Уул дүүргийн Орон сууц",
    category: "Орон сууц",
    description: "12 давхарт 48 өрхийн орчин үеийн орон сууц",
    image: "/api/placeholder/400/300",
  },
  {
    id: "2",
    title: "Бизнес Төв Байр",
    category: "Оффис",
    description: "Үндэсний хэмжээний бизнес төв, орчин үеийн оффис",
    image: "/api/placeholder/400/300",
  },
  {
    id: "3",
    title: "Хүнсний Үйлдвэр",
    category: "Үйлдвэр",
    description: "Олон улсын стандартын хүнсний үйлдвэр",
    image: "/api/placeholder/400/300",
  },
  {
    id: "4",
    title: "Сүхбаатар дүүргийн Орон сууц",
    category: "Орон сууц",
    description: "9 давхарт 36 өрхийн тав тухтай орон сууц",
    image: "/api/placeholder/400/300",
  },
  {
    id: "5",
    title: "Технологийн Парк",
    category: "Оффис",
    description: "IT компаниудад зориулсан ухаалаг оффис барилга",
    image: "/api/placeholder/400/300",
  },
  {
    id: "6",
    title: "Логистикийн Төв",
    category: "Үйлдвэр",
    description: "Агуулах, логистикийн комплекс",
    image: "/api/placeholder/400/300",
  },
];

const categories = ["Бүгд", "Орон сууц", "Оффис", "Үйлдвэр"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("Бүгд");
  const [projectData, setProjectData] = useState(projects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjectsHome();
        console.log(data);

        setProjectData(data.length > 0 ? data : projects);
      } catch (error) {
        console.error("Error loading projects:", error);
        setProjectData(projects);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const filteredProjects =
    activeCategory === "Бүгд"
      ? projectData
      : projectData.filter((project) => project.category === activeCategory);

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Манай Төслүүд
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Бидний гүйцэтгэсэн амжилттай төслүүдийн жишээ
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  activeCategory === category
                    ? "bg-orange-500 text-white"
                    : "text-gray-600 hover:text-blue-900"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                y: -10,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
            >
              {/* Project Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-200 mb-4">
                      {project.description}
                    </p>
                    <button className="flex items-center text-orange-400 hover:text-orange-300 transition-colors">
                      Дэлгэрэнгүй харах
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Info (Always Visible) */}
              <div className="p-6 bg-white">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <a
            href="/projects"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105"
          >
            Бүх төслийг харах
          </a>
        </motion.div>
      </div>
    </section>
  );
}
