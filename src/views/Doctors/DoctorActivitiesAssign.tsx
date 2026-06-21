"use client"

import { useState } from "react"

export default function DoctorActivitiesAssign() {
  const [selectedPatient, setSelectedPatient] = useState("")
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null)

  // Datos quemados para simulación
  const patients = [
    { id: "1", name: "Juan Pérez" },
    { id: "2", name: "Miguel Rodríguez" },
    { id: "3", name: "Ana Torres" },
    { id: "4", name: "Laura Fernández" },
  ]

  const activities = [
    {
      id: "1",
      title: "Reconocimiento de Emociones",
      category: "Habilidades Sociales",
      description: "Actividad para identificar y nombrar emociones básicas usando tarjetas visuales",
      difficulty: "Fácil",
      duration: "20-30 min",
      materials: "Tarjetas con emociones, espejo",
    },
    {
      id: "2",
      title: "Juego de Turnos",
      category: "Comunicación",
      description: "Práctica de esperar turnos en juegos grupales simples",
      difficulty: "Media",
      duration: "30-40 min",
      materials: "Juego de mesa, temporizador",
    },
    {
      id: "3",
      title: "Integración Sensorial",
      category: "Procesamiento Sensorial",
      description: "Ejercicios de estimulación sensorial controlada con diferentes texturas",
      difficulty: "Media",
      duration: "25-35 min",
      materials: "Objetos con texturas, piscina de pelotas",
    },
    {
      id: "4",
      title: "Comunicación Visual",
      category: "Comunicación",
      description: "Uso de pictogramas para expresar necesidades y deseos",
      difficulty: "Fácil",
      duration: "15-25 min",
      materials: "Tablero de pictogramas, velcro",
    },
    {
      id: "5",
      title: "Historias Sociales",
      category: "Habilidades Sociales",
      description: "Lectura y comprensión de historias sociales sobre situaciones cotidianas",
      difficulty: "Media",
      duration: "20-30 min",
      materials: "Libro de historias sociales",
    },
    {
      id: "6",
      title: "Ejercicios de Atención",
      category: "Autonomía Personal",
      description: "Actividades para mejorar la concentración y atención sostenida",
      difficulty: "Difícil",
      duration: "30-40 min",
      materials: "Puzzles, juegos de atención",
    },
  ]

  const assignedActivities = [
    { patientId: "1", activityId: "1", assignedDate: "2024-12-14", status: "completed" },
    { patientId: "1", activityId: "2", assignedDate: "2024-12-15", status: "in-progress" },
    { patientId: "2", activityId: "3", assignedDate: "2024-12-13", status: "pending" },
  ]

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
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Asignar Actividades</h1>
          <p className="text-gray-600 mt-1">Selecciona y asigna actividades terapéuticas a tus pacientes</p>
        </div>

        {/* Selector de paciente */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Seleccionar Paciente:</label>
          <select
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Selecciona un paciente --</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>

          {selectedPatient && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Actividades Asignadas:</h4>
              <div className="space-y-2">
                {assignedActivities
                  .filter((a) => a.patientId === selectedPatient)
                  .map((assigned, index) => {
                    const activity = activities.find((a) => a.id === assigned.activityId)
                    return (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-gray-900">{activity?.title}</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            assigned.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : assigned.status === "in-progress"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {assigned.status === "completed"
                            ? "Completada"
                            : assigned.status === "in-progress"
                              ? "En progreso"
                              : "Pendiente"}
                        </span>
                      </div>
                    )
                  })}
              </div>
            </div>
          )}
        </div>

        {/* Biblioteca de actividades */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Biblioteca de Actividades</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedActivity === activity.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
                onClick={() => setSelectedActivity(activity.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 text-sm">{activity.title}</h4>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(activity.difficulty)}`}
                  >
                    {activity.difficulty}
                  </span>
                </div>

                <p className="text-xs text-gray-600 mb-3 line-clamp-2">{activity.description}</p>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center text-xs text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    {activity.category}
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {activity.duration}
                  </div>
                </div>

                <button
                  disabled={!selectedPatient}
                  className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedPatient
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (selectedPatient) {
                      alert(
                        `Actividad "${activity.title}" asignada a ${patients.find((p) => p.id === selectedPatient)?.name}`,
                      )
                    }
                  }}
                >
                  Asignar Actividad
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
