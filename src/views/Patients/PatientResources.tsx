"use client"

import { useState } from "react"

export default function PatientResources() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Datos quemados para simulación
  const categories = [
    { id: "all", name: "Todos", icon: "📚", color: "bg-blue-500" },
    { id: "games", name: "Juegos", icon: "🎮", color: "bg-green-500" },
    { id: "videos", name: "Videos", icon: "🎥", color: "bg-purple-500" },
    { id: "stories", name: "Historias", icon: "📖", color: "bg-orange-500" },
    { id: "music", name: "Música", icon: "🎵", color: "bg-pink-500" },
  ]

  const resources = [
    {
      id: "1",
      title: "Aprende las Emociones",
      description: "Juego interactivo para identificar emociones básicas",
      category: "games",
      icon: "😊",
      type: "Juego",
      duration: "15 min",
      difficulty: "Fácil",
      popular: true,
    },
    {
      id: "2",
      title: "Video: ¿Cómo me siento?",
      description: "Video educativo sobre reconocimiento de emociones",
      category: "videos",
      icon: "🎥",
      type: "Video",
      duration: "8 min",
      difficulty: "Fácil",
      popular: true,
    },
    {
      id: "3",
      title: "La Historia de Lucas",
      description: "Historia social sobre hacer amigos",
      category: "stories",
      icon: "📖",
      type: "Historia",
      duration: "10 min",
      difficulty: "Media",
      popular: false,
    },
    {
      id: "4",
      title: "Canciones de Rutinas",
      description: "Música para aprender rutinas diarias",
      category: "music",
      icon: "🎵",
      type: "Música",
      duration: "20 min",
      difficulty: "Fácil",
      popular: true,
    },
    {
      id: "5",
      title: "Puzzle de Colores",
      description: "Juego de asociación de colores y formas",
      category: "games",
      icon: "🧩",
      type: "Juego",
      duration: "12 min",
      difficulty: "Media",
      popular: false,
    },
    {
      id: "6",
      title: "Video: Esperar mi Turno",
      description: "Aprende la importancia de esperar turnos",
      category: "videos",
      icon: "⏰",
      type: "Video",
      duration: "6 min",
      difficulty: "Fácil",
      popular: false,
    },
  ]

  const filteredResources =
    selectedCategory === "all" ? resources : resources.filter((r) => r.category === selectedCategory)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Fácil":
        return "bg-green-100 text-green-800"
      case "Media":
        return "bg-yellow-100 text-yellow-800"
      case "Difícil":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Mis Recursos</h1>
          <p className="text-gray-600 mt-1">Materiales educativos y divertidos para ti</p>
        </div>

        {/* Categorías */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                  selectedCategory === category.id
                    ? `${category.color} text-white scale-105`
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recursos populares */}
        {selectedCategory === "all" && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">✨ Más Populares</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {resources
                .filter((r) => r.popular)
                .map((resource) => (
                  <div
                    key={resource.id}
                    className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg shadow-lg p-6 border-2 border-yellow-300"
                  >
                    <div className="text-5xl mb-3">{resource.icon}</div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{resource.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}
                      >
                        {resource.difficulty}
                      </span>
                      <span className="text-xs text-gray-600">• {resource.duration}</span>
                    </div>
                    <button className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-bold">
                      ¡Abrir!
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Todos los recursos */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {selectedCategory === "all"
              ? "Todos los Recursos"
              : categories.find((c) => c.id === selectedCategory)?.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-32 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <div className="text-6xl">{resource.icon}</div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg text-gray-900">{resource.title}</h3>
                    {resource.popular && <span className="text-xl">⭐</span>}
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{resource.description}</p>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {resource.type}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}
                    >
                      {resource.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {resource.duration}
                    </span>
                  </div>

                  <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold transition-colors">
                    ¡Explorar!
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredResources.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No hay recursos en esta categoría</h3>
            <p className="text-gray-600">Prueba seleccionando otra categoría</p>
          </div>
        )}
      </div>
    </div>
  )
}
