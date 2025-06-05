"use client"

import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../store"
import { initialActivitiesData } from "../../utils/data/other"
import { setActivities, updateActivityProgress } from "../../store/slices/activitiessSlice"
export default function ActivitiesLibrary() {
  const dispatch = useDispatch()
  const { activities } = useSelector((state: RootState) => state.activities)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Cargar datos desde localStorage o usar datos iniciales
    const savedActivities = localStorage.getItem("activities")
    if (savedActivities) {
      dispatch(setActivities(JSON.parse(savedActivities)))
    } else {
      dispatch(setActivities(initialActivitiesData))
      localStorage.setItem("activities", JSON.stringify(initialActivitiesData))
    }
  }, [dispatch])

  useEffect(() => {
    // Guardar en localStorage cuando cambien las actividades
    localStorage.setItem("activities", JSON.stringify(activities))
  }, [activities])

  const filteredActivities = activities.filter((activity) => {
    const matchesCategory = selectedCategory === "all" || activity.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "all" || activity.difficulty === selectedDifficulty
    const matchesSearch =
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesCategory && matchesDifficulty && matchesSearch
  })

  const handleStartActivity = (activityId: string) => {
    const progress = {
      completed: false,
      score: 0,
      notes: "Actividad iniciada",
      completedAt: undefined,
    }
    dispatch(updateActivityProgress({ id: activityId, progress }))
  }

  const handleCompleteActivity = (activityId: string, score: number) => {
    const progress = {
      completed: true,
      score,
      notes: `Actividad completada con puntuación de ${score}`,
      completedAt: new Date().toISOString(),
    }
    dispatch(updateActivityProgress({ id: activityId, progress }))
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      comunicacion: "bg-blue-100 text-blue-800",
      sensorial: "bg-green-100 text-green-800",
      social: "bg-purple-100 text-purple-800",
      cognitiva: "bg-yellow-100 text-yellow-800",
      motora: "bg-red-100 text-red-800",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      basico: "bg-green-100 text-green-800",
      intermedio: "bg-yellow-100 text-yellow-800",
      avanzado: "bg-red-100 text-red-800",
    }
    return colors[difficulty as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Biblioteca de Actividades</h1>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar actividades..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todas las categorías</option>
                <option value="comunicacion">Comunicación</option>
                <option value="sensorial">Sensorial</option>
                <option value="social">Social</option>
                <option value="cognitiva">Cognitiva</option>
                <option value="motora">Motora</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dificultad</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todas las dificultades</option>
                <option value="basico">Básico</option>
                <option value="intermedio">Intermedio</option>
                <option value="avanzado">Avanzado</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSelectedCategory("all")
                  setSelectedDifficulty("all")
                  setSearchTerm("")
                }}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Limpiar Filtros
              </button>
            </div>
          </div>
        </div>

        {/* Lista de actividades */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{activity.title}</h3>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(activity.category)}`}>
                      {activity.category}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(activity.difficulty)}`}>
                      {activity.difficulty}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{activity.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {activity.duration} minutos
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    {activity.ageRange.min}-{activity.ageRange.max} años
                  </div>
                </div>

                {activity.progress && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Progreso</span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          activity.progress.completed ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {activity.progress.completed ? "Completada" : "En progreso"}
                      </span>
                    </div>
                    {(activity.progress.score ?? 0) > 0 && (
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${activity.progress.score}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{activity.progress.score}%</span>
                      </div>
                    )}
                    {activity.progress.notes && <p className="text-sm text-gray-600 mt-2">{activity.progress.notes}</p>}
                  </div>
                )}

                <div className="flex space-x-2">
                  {!activity.progress?.completed && (
                    <button
                      onClick={() => handleStartActivity(activity.id)}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                    >
                      {activity.progress ? "Continuar" : "Iniciar"}
                    </button>
                  )}

                  {activity.progress && !activity.progress.completed && (
                    <button
                      onClick={() => handleCompleteActivity(activity.id, Math.floor(Math.random() * 40) + 60)}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
                    >
                      Completar
                    </button>
                  )}

                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm">
                    Ver Detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v1.306m8 0V7a2 2 0 012 2v6.414l-1.293-1.293A1 1 0 0015 13h-2V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4H5a1 1 0 00-.707.293L3 14.586V8a2 2 0 012-2V5a2 2 0 012-2h6a2 2 0 012 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No se encontraron actividades</h3>
            <p className="mt-1 text-sm text-gray-500">Intenta ajustar los filtros de búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  )
}
