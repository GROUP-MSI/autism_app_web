"use client"

import { useState } from "react"

export default function PatientActivities() {
  const [filter, setFilter] = useState("all")

  // Datos quemados para simulación
  const [activities] = useState([
    {
      id: "1",
      title: "Reconocimiento de Emociones",
      category: "Habilidades Sociales",
      status: "completed",
      points: 50,
      completedDate: "2024-12-14",
      score: 85,
      icon: "😊",
      color: "from-blue-400 to-blue-500",
    },
    {
      id: "2",
      title: "Juego de Turnos",
      category: "Comunicación",
      status: "completed",
      points: 60,
      completedDate: "2024-12-15",
      score: 78,
      icon: "🎮",
      color: "from-green-400 to-green-500",
    },
    {
      id: "3",
      title: "Integración Sensorial",
      category: "Procesamiento Sensorial",
      status: "in-progress",
      points: 55,
      progress: 65,
      icon: "🎨",
      color: "from-purple-400 to-purple-500",
    },
    {
      id: "4",
      title: "Comunicación Visual",
      category: "Comunicación",
      status: "pending",
      points: 45,
      icon: "📱",
      color: "from-yellow-400 to-yellow-500",
    },
    {
      id: "5",
      title: "Historias Sociales",
      category: "Habilidades Sociales",
      status: "pending",
      points: 50,
      icon: "📖",
      color: "from-pink-400 to-pink-500",
    },
    {
      id: "6",
      title: "Ejercicios de Atención",
      category: "Autonomía Personal",
      status: "pending",
      points: 70,
      icon: "🎯",
      color: "from-orange-400 to-orange-500",
    },
  ])

  const filteredActivities = filter === "all" ? activities : activities.filter((activity) => activity.status === filter)

  const stats = {
    total: activities.length,
    completed: activities.filter((a) => a.status === "completed").length,
    inProgress: activities.filter((a) => a.status === "in-progress").length,
    pending: activities.filter((a) => a.status === "pending").length,
  }

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Mis Actividades</h1>
          <p className="text-gray-600 mt-1">Completa tus actividades y gana puntos</p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-3xl mb-2">📚</div>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-sm text-gray-600">Total</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-3xl mb-2">✅</div>
            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            <p className="text-sm text-gray-600">Completadas</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-3xl mb-2">⏳</div>
            <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
            <p className="text-sm text-gray-600">En Progreso</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-3xl mb-2">📝</div>
            <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
            <p className="text-sm text-gray-600">Pendientes</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "all" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "pending" ? "bg-orange-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Pendientes
            </button>
            <button
              onClick={() => setFilter("in-progress")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "in-progress" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              En Progreso
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "completed" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Completadas
            </button>
          </div>
        </div>

        {/* Grid de actividades */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className={`h-32 bg-gradient-to-br ${activity.color} flex items-center justify-center`}>
                <div className="text-7xl">{activity.icon}</div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{activity.title}</h3>
                    <p className="text-sm text-gray-600">{activity.category}</p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full shrink-0 ml-2">
                    +{activity.points} pts
                  </span>
                </div>

                {/* Estado */}
                {activity.status === "completed" && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Puntuación:</span>
                      <span className="font-bold text-green-600">{activity.score}%</span>
                    </div>
                    <p className="text-xs text-gray-500">Completado el {activity.completedDate}</p>
                  </div>
                )}

                {activity.status === "in-progress" && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Progreso:</span>
                      <span className="font-bold text-blue-600">{activity.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${activity.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Botón de acción */}
                <button
                  className={`w-full py-3 rounded-lg font-bold text-white transition-colors ${
                    activity.status === "completed"
                      ? "bg-gray-400 cursor-not-allowed"
                      : activity.status === "in-progress"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-green-600 hover:bg-green-700"
                  }`}
                  disabled={activity.status === "completed"}
                >
                  {activity.status === "completed"
                    ? "✓ Completada"
                    : activity.status === "in-progress"
                      ? "Continuar"
                      : "¡Empezar!"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">¡No hay actividades en esta categoría!</h3>
            <p className="text-gray-600">Selecciona otro filtro para ver más actividades</p>
          </div>
        )}
      </div>
    </div>
  )
}
