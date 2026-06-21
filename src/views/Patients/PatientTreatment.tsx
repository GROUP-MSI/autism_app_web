"use client"

import { useState } from "react"

export default function PatientTreatment() {
  // Datos quemados para simulación
  const [treatmentInfo] = useState({
    doctorName: "Dr. María González",
    doctorAvatar: "/caring-doctor.png",
    startDate: "2024-01-10",
    nextSession: "2024-12-18",
    sessionsCompleted: 24,
    totalSessions: 40,
  })

  const [treatmentPlan] = useState({
    objectives: [
      {
        id: "1",
        title: "Mejorar habilidades de comunicación",
        description: "Aumentar vocabulario y capacidad de expresión",
        progress: 82,
        status: "on-track",
      },
      {
        id: "2",
        title: "Desarrollar habilidades sociales",
        description: "Aprender a interactuar con otros niños",
        progress: 75,
        status: "on-track",
      },
      {
        id: "3",
        title: "Integración sensorial",
        description: "Mejorar tolerancia a diferentes estímulos",
        progress: 68,
        status: "needs-attention",
      },
    ],
    upcomingSessions: [
      { id: "1", date: "2024-12-18", time: "10:00 AM", type: "Terapia Individual", duration: "45 min" },
      { id: "2", date: "2024-12-20", time: "2:00 PM", type: "Terapia Grupal", duration: "60 min" },
      { id: "3", date: "2024-12-22", time: "10:00 AM", type: "Evaluación de Progreso", duration: "30 min" },
    ],
    recommendations: [
      {
        id: "1",
        title: "Practicar en casa",
        description: "Realizar ejercicios de comunicación 15 minutos diarios",
        icon: "🏠",
      },
      {
        id: "2",
        title: "Juego interactivo",
        description: "Jugar con otros niños al menos 3 veces por semana",
        icon: "👥",
      },
      {
        id: "3",
        title: "Rutina de sueño",
        description: "Mantener horarios regulares de descanso",
        icon: "😴",
      },
    ],
  })

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Mi Tratamiento</h1>
          <p className="text-gray-600 mt-1">Información sobre tu plan de tratamiento</p>
        </div>

        {/* Información del terapeuta */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Mi Terapeuta</h3>
          <div className="flex items-center gap-4">
            <img
              src={treatmentInfo.doctorAvatar || "/placeholder.svg"}
              alt={treatmentInfo.doctorName}
              className="w-20 h-20 rounded-full border-4 border-blue-200"
            />
            <div className="flex-1">
              <h4 className="text-xl font-bold text-gray-900">{treatmentInfo.doctorName}</h4>
              <p className="text-gray-600">Terapeuta Principal</p>
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                Enviar Mensaje
              </button>
            </div>
          </div>
        </div>

        {/* Resumen del tratamiento */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-3xl mb-2">📅</div>
            <p className="text-sm text-gray-600 mb-1">Fecha de inicio</p>
            <p className="font-bold text-gray-900">{treatmentInfo.startDate}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-3xl mb-2">🎯</div>
            <p className="text-sm text-gray-600 mb-1">Sesiones completadas</p>
            <p className="font-bold text-gray-900">
              {treatmentInfo.sessionsCompleted}/{treatmentInfo.totalSessions}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-3xl mb-2">📊</div>
            <p className="text-sm text-gray-600 mb-1">Progreso general</p>
            <p className="font-bold text-green-600">78%</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-3xl mb-2">⏰</div>
            <p className="text-sm text-gray-600 mb-1">Próxima sesión</p>
            <p className="font-bold text-blue-600">{treatmentInfo.nextSession}</p>
          </div>
        </div>

        {/* Objetivos del tratamiento */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Mis Objetivos</h3>
          <div className="space-y-4">
            {treatmentPlan.objectives.map((objective) => (
              <div key={objective.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-1">{objective.title}</h4>
                    <p className="text-sm text-gray-600">{objective.description}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      objective.status === "on-track" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {objective.status === "on-track" ? "En camino" : "Necesita atención"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all"
                      style={{ width: `${objective.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{objective.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Próximas sesiones */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Próximas Sesiones</h3>
          <div className="space-y-3">
            {treatmentPlan.upcomingSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-2 border-blue-200"
              >
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{session.date.split("-")[2]}</div>
                    <div className="text-xs text-gray-600">DIC</div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{session.type}</h4>
                    <p className="text-sm text-gray-600">
                      {session.time} • {session.duration}
                    </p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                  Ver Detalles
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recomendaciones */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Recomendaciones para Casa</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {treatmentPlan.recommendations.map((recommendation) => (
              <div
                key={recommendation.id}
                className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200"
              >
                <div className="text-4xl mb-3">{recommendation.icon}</div>
                <h4 className="font-bold text-gray-900 mb-2">{recommendation.title}</h4>
                <p className="text-sm text-gray-600">{recommendation.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
