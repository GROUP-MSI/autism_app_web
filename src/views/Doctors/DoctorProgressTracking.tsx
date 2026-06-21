"use client"

import { useState } from "react"

export default function DoctorProgressTracking() {
  const [selectedPatient, setSelectedPatient] = useState("1")

  // Datos quemados para simulación
  const patients = [
    { id: "1", name: "Juan Pérez" },
    { id: "2", name: "Miguel Rodríguez" },
    { id: "3", name: "Ana Torres" },
    { id: "4", name: "Laura Fernández" },
  ]

  const progressData = {
    "1": {
      name: "Juan Pérez",
      areas: [
        { area: "Comunicación", current: 78, goal: 85, change: +5 },
        { area: "Habilidades Sociales", current: 72, goal: 80, change: +3 },
        { area: "Procesamiento Sensorial", current: 65, goal: 75, change: +2 },
        { area: "Autonomía Personal", current: 80, goal: 85, change: +4 },
      ],
      recentActivities: [
        { date: "2024-12-14", activity: "Reconocimiento de Emociones", score: 85, duration: "30 min" },
        { date: "2024-12-13", activity: "Juego de Turnos", score: 78, duration: "25 min" },
        { date: "2024-12-12", activity: "Integración Sensorial", score: 72, duration: "35 min" },
      ],
      weeklyProgress: [
        { week: "Sem 1", score: 65 },
        { week: "Sem 2", score: 68 },
        { week: "Sem 3", score: 72 },
        { week: "Sem 4", score: 78 },
      ],
    },
  }

  const currentData = progressData["1"]

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Seguimiento de Progreso</h1>
          <p className="text-gray-600 mt-1">Monitorea el avance y desarrollo de tus pacientes</p>
        </div>

        {/* Selector de paciente */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Seleccionar Paciente:</label>
          <select
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>
        </div>

        {/* Resumen de progreso por áreas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {currentData.areas.map((area, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{area.area}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    area.change > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {area.change > 0 ? "+" : ""}
                  {area.change}%
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Nivel Actual</span>
                    <span className="font-semibold text-gray-900">{area.current}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${area.current}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Meta</span>
                    <span className="font-semibold text-gray-900">{area.goal}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all"
                      style={{ width: `${area.goal}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <p className="text-sm text-gray-600">
                    Faltan <span className="font-semibold">{area.goal - area.current}%</span> para alcanzar la meta
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actividades recientes */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividades Recientes</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actividad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Puntuación
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duración
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData.recentActivities.map((activity, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {activity.activity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          activity.score >= 80
                            ? "bg-green-100 text-green-800"
                            : activity.score >= 60
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {activity.score}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{activity.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Gráfico de progreso semanal */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Progreso Semanal</h3>
          <div className="flex items-end justify-between h-64 gap-4">
            {currentData.weeklyProgress.map((week, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gray-200 rounded-t-lg relative" style={{ height: "200px" }}>
                  <div
                    className="absolute bottom-0 w-full bg-blue-600 rounded-t-lg transition-all"
                    style={{ height: `${(week.score / 100) * 200}px` }}
                  >
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-gray-900">
                      {week.score}%
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-sm font-medium text-gray-600">{week.week}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
