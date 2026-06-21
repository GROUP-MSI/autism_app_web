"use client"

import { useState } from "react"

export default function DoctorDashboard() {
  // Datos quemados para simulación
  const [stats] = useState({
    myPatients: 8,
    pendingEvaluations: 3,
    activeSessionsToday: 2,
    avgProgress: 72,
  })

  const [recentPatients] = useState([
    {
      id: "1",
      name: "Juan Pérez",
      age: 7,
      lastSession: "2024-12-14",
      nextSession: "2024-12-18",
      progress: 78,
      status: "on-track",
    },
    {
      id: "2",
      name: "Miguel Rodríguez",
      age: 8,
      lastSession: "2024-12-13",
      nextSession: "2024-12-17",
      progress: 65,
      status: "needs-attention",
    },
    {
      id: "3",
      name: "Ana Torres",
      age: 6,
      lastSession: "2024-12-15",
      nextSession: "2024-12-19",
      progress: 85,
      status: "excellent",
    },
  ])

  const [todaySessions] = useState([
    {
      id: "1",
      patientName: "Juan Pérez",
      time: "10:00 AM",
      type: "Terapia Individual",
      status: "pending",
    },
    {
      id: "2",
      patientName: "Laura Fernández",
      time: "2:00 PM",
      type: "Evaluación",
      status: "pending",
    },
  ])

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel del Terapeuta</h1>
          <p className="text-gray-600 mt-1">Bienvenido Dr/a., aquí está el resumen de sus pacientes y actividades</p>
        </div>

        {/* Estadísticas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Mis Pacientes</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.myPatients}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Evaluaciones Pendientes</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.pendingEvaluations}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Sesiones Hoy</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.activeSessionsToday}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Progreso Promedio</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.avgProgress}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Sesiones de hoy */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Sesiones de Hoy</h3>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {todaySessions.length} sesiones
                </span>
              </div>
              <div className="space-y-3">
                {todaySessions.map((session) => (
                  <div key={session.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{session.time}</span>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Pendiente</span>
                    </div>
                    <p className="text-sm font-medium text-gray-700">{session.patientName}</p>
                    <p className="text-xs text-gray-500 mt-1">{session.type}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Ver Agenda Completa
              </button>
            </div>
          </div>

          {/* Pacientes recientes */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Mis Pacientes Recientes</h3>
              <div className="space-y-3">
                {recentPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                            {patient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{patient.name}</p>
                            <p className="text-sm text-gray-600">{patient.age} años</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm text-gray-600">Progreso:</span>
                          <span className="font-semibold text-gray-900">{patient.progress}%</span>
                        </div>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              patient.status === "excellent"
                                ? "bg-green-600"
                                : patient.status === "on-track"
                                  ? "bg-blue-600"
                                  : "bg-yellow-600"
                            }`}
                            style={{ width: `${patient.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Próxima sesión: {patient.nextSession}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                Ver Todos los Pacientes
              </button>
            </div>
          </div>
        </div>

        {/* Alertas y recordatorios */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Alertas y Recordatorios</h3>
          <div className="space-y-3">
            <div className="flex items-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-yellow-800">Evaluación trimestral pendiente</p>
                <p className="text-sm text-yellow-600">Miguel Rodríguez requiere evaluación de progreso esta semana</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-blue-800">Reunión con padres programada</p>
                <p className="text-sm text-blue-600">Reunión con padres de Juan Pérez el 20/12/2024 a las 3:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
