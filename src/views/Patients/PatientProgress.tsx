"use client"

import { useState } from "react"

export default function PatientProgress() {
  // Datos quemados para simulación
  const [progressData] = useState({
    overallProgress: 78,
    areas: [
      {
        name: "Comunicación",
        progress: 82,
        goal: 90,
        icon: "💬",
        color: "bg-blue-500",
        achievements: ["Primera palabra clara", "10 conversaciones exitosas"],
      },
      {
        name: "Habilidades Sociales",
        progress: 75,
        goal: 85,
        icon: "👥",
        color: "bg-green-500",
        achievements: ["Primer amigo", "Jugar en grupo"],
      },
      {
        name: "Procesamiento Sensorial",
        progress: 68,
        goal: 80,
        icon: "🎨",
        color: "bg-purple-500",
        achievements: ["Tolerar nuevas texturas"],
      },
      {
        name: "Autonomía Personal",
        progress: 85,
        goal: 90,
        icon: "🎯",
        color: "bg-orange-500",
        achievements: ["Vestirse solo", "Cepillarse los dientes"],
      },
    ],
    weeklyScores: [
      { week: "Sem 1", score: 65 },
      { week: "Sem 2", score: 68 },
      { week: "Sem 3", score: 72 },
      { week: "Sem 4", score: 78 },
    ],
    recentMilestones: [
      { id: "1", title: "Primera semana completa", date: "2024-12-10", icon: "🏆" },
      { id: "2", title: "20 actividades completadas", date: "2024-12-12", icon: "⭐" },
      { id: "3", title: "Nivel de comunicación avanzado", date: "2024-12-14", icon: "💎" },
    ],
  })

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Mi Progreso</h1>
          <p className="text-gray-600 mt-1">Mira todo lo que has logrado</p>
        </div>

        {/* Progreso general */}
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg p-8 mb-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Progreso General</h2>
              <p className="opacity-90">¡Vas muy bien!</p>
            </div>
            <div className="text-6xl">🌟</div>
          </div>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-white bg-opacity-30">
                  En progreso
                </span>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold">{progressData.overallProgress}%</span>
              </div>
            </div>
            <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-white bg-opacity-30">
              <div
                style={{ width: `${progressData.overallProgress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white transition-all"
              ></div>
            </div>
          </div>
        </div>

        {/* Progreso por áreas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {progressData.areas.map((area, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">{area.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{area.name}</h3>
                  <p className="text-sm text-gray-600">Meta: {area.goal}%</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Progreso actual</span>
                  <span className="font-bold text-gray-900">{area.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`${area.color} h-3 rounded-full transition-all`}
                    style={{ width: `${area.progress}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-700 mb-2">Logros obtenidos:</p>
                <div className="space-y-1">
                  {area.achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-green-500">✓</span>
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gráfico de progreso semanal */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Mi Evolución Semanal</h3>
          <div className="flex items-end justify-between h-64 gap-4">
            {progressData.weeklyScores.map((week, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gray-200 rounded-t-lg relative" style={{ height: "200px" }}>
                  <div
                    className="absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-purple-500 rounded-t-lg transition-all"
                    style={{ height: `${(week.score / 100) * 200}px` }}
                  >
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-lg font-bold text-gray-900">
                      {week.score}%
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-sm font-medium text-gray-700">{week.week}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hitos recientes */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Mis Hitos Recientes</h3>
          <div className="space-y-3">
            {progressData.recentMilestones.map((milestone) => (
              <div
                key={milestone.id}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-200"
              >
                <div className="text-4xl">{milestone.icon}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">{milestone.title}</h4>
                  <p className="text-sm text-gray-600">{milestone.date}</p>
                </div>
                <button className="px-4 py-2 bg-yellow-400 text-yellow-900 rounded-lg hover:bg-yellow-500 font-medium text-sm">
                  Ver Detalles
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
