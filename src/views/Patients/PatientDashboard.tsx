"use client"

import { useState } from "react"

export default function PatientDashboard() {
  // Datos quemados para simulación
  const patientInfo = {
    name: "Juan Pérez",
    age: 7,
    avatar: "/whimsical-child.png",
  }

  const [stats] = useState({
    activitiesCompleted: 24,
    currentStreak: 5,
    totalPoints: 1250,
    nextSession: "2024-12-18",
  })

  const [todayActivities] = useState([
    { id: "1", title: "Reconocimiento de Emociones", time: "10:00 AM", status: "pending", points: 50 },
    { id: "2", title: "Juego de Turnos", time: "2:00 PM", status: "pending", points: 60 },
  ])

  const [recentAchievements] = useState([
    { id: "1", title: "¡5 días seguidos!", icon: "🏆", date: "Hoy" },
    { id: "2", title: "10 actividades completadas", icon: "⭐", date: "Ayer" },
    { id: "3", title: "Experto en emociones", icon: "😊", date: "15 Dic" },
  ])

  const [weekProgress] = useState([
    { day: "L", completed: true },
    { day: "M", completed: true },
    { day: "M", completed: true },
    { day: "J", completed: true },
    { day: "V", completed: true },
    { day: "S", completed: false },
    { day: "D", completed: false },
  ])

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header personalizado */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <img
              src={patientInfo.avatar || "/placeholder.svg"}
              alt={patientInfo.name}
              className="w-20 h-20 rounded-full border-4 border-blue-200"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">¡Hola, {patientInfo.name.split(" ")[0]}!</h1>
              <p className="text-gray-600 text-lg">¿Listo para aprender y jugar hoy?</p>
            </div>
          </div>
        </div>

        {/* Estadísticas en tarjetas coloridas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
            <div className="text-4xl mb-2">🎯</div>
            <p className="text-sm opacity-90">Actividades Completadas</p>
            <p className="text-3xl font-bold">{stats.activitiesCompleted}</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 text-white">
            <div className="text-4xl mb-2">🔥</div>
            <p className="text-sm opacity-90">Racha Actual</p>
            <p className="text-3xl font-bold">{stats.currentStreak} días</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
            <div className="text-4xl mb-2">⭐</div>
            <p className="text-sm opacity-90">Puntos Totales</p>
            <p className="text-3xl font-bold">{stats.totalPoints}</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
            <div className="text-4xl mb-2">📅</div>
            <p className="text-sm opacity-90">Próxima Sesión</p>
            <p className="text-lg font-bold">{stats.nextSession}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Actividades de hoy */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Mis Actividades de Hoy</h3>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {todayActivities.length} actividades
                </span>
              </div>

              <div className="space-y-3">
                {todayActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200 hover:border-blue-400 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900 text-lg">{activity.title}</h4>
                      <span className="px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
                        +{activity.points} pts
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {activity.time}
                      </span>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm">
                        ¡Empezar!
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {todayActivities.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🎉</div>
                  <p className="text-lg font-medium text-gray-900">¡Excelente trabajo!</p>
                  <p className="text-gray-600">Completaste todas tus actividades de hoy</p>
                </div>
              )}
            </div>
          </div>

          {/* Logros recientes */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Mis Logros</h3>
              <div className="space-y-3">
                {recentAchievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900">{achievement.title}</p>
                        <p className="text-xs text-gray-600">{achievement.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progreso semanal */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Mi Semana</h3>
          <div className="flex justify-between gap-2">
            {weekProgress.map((day, index) => (
              <div key={index} className="flex-1 text-center">
                <div
                  className={`w-full aspect-square rounded-lg flex items-center justify-center font-bold text-lg mb-2 ${
                    day.completed
                      ? "bg-gradient-to-br from-green-400 to-green-500 text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {day.completed ? "✓" : day.day}
                </div>
                <p className="text-xs font-medium text-gray-600">{day.day}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mensaje motivacional */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg p-6 text-white text-center">
          <div className="text-4xl mb-3">🌟</div>
          <h3 className="text-2xl font-bold mb-2">¡Sigue así!</h3>
          <p className="text-lg opacity-90">Estás haciendo un trabajo increíble. ¡Cada día mejoras más!</p>
        </div>
      </div>
    </div>
  )
}
