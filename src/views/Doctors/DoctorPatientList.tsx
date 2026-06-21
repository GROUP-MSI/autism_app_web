"use client"

import { useState } from "react"

export default function DoctorPatientsList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Datos quemados para simulación
  const [patients] = useState([
    {
      id: "1",
      name: "Juan Pérez",
      age: 7,
      diagnosis: "TEA Nivel 1",
      startDate: "2024-01-10",
      lastSession: "2024-12-14",
      nextSession: "2024-12-18",
      progress: 78,
      status: "active",
      sessionsCompleted: 24,
      avatar: "/whimsical-child.png",
    },
    {
      id: "2",
      name: "Miguel Rodríguez",
      age: 8,
      diagnosis: "TEA Nivel 1",
      startDate: "2024-03-20",
      lastSession: "2024-12-13",
      nextSession: "2024-12-17",
      progress: 65,
      status: "active",
      sessionsCompleted: 18,
      avatar: "/young-boy-drawing.png",
    },
    {
      id: "3",
      name: "Ana Torres",
      age: 6,
      diagnosis: "TEA Nivel 1",
      startDate: "2024-02-05",
      lastSession: "2024-12-15",
      nextSession: "2024-12-19",
      progress: 85,
      status: "active",
      sessionsCompleted: 28,
      avatar: "/young-woman-smiling.png",
    },
    {
      id: "4",
      name: "Laura Fernández",
      age: 5,
      diagnosis: "TEA Nivel 1",
      startDate: "2024-04-05",
      lastSession: "2024-12-12",
      nextSession: "2024-12-16",
      progress: 72,
      status: "active",
      sessionsCompleted: 20,
      avatar: "/kid.jpg",
    },
  ])

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || patient.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Mis Pacientes</h1>
          <p className="text-gray-600 mt-1">Gestiona y da seguimiento a tus pacientes asignados</p>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Total Pacientes</p>
            <p className="text-2xl font-bold text-gray-900">{patients.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Pacientes Activos</p>
            <p className="text-2xl font-bold text-green-600">{patients.filter((p) => p.status === "active").length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Sesiones Esta Semana</p>
            <p className="text-2xl font-bold text-blue-600">8</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Progreso Promedio</p>
            <p className="text-2xl font-bold text-purple-600">75%</p>
          </div>
        </div>

        {/* Búsqueda y filtros */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar paciente por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
            </select>
          </div>
        </div>

        {/* Lista de pacientes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPatients.map((patient) => (
            <div key={patient.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="p-6">
                {/* Header del paciente */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={patient.avatar || "/placeholder.svg"}
                    alt={patient.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                    <p className="text-sm text-gray-600">
                      {patient.age} años - {patient.diagnosis}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Activo</span>
                </div>

                {/* Información del tratamiento */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Inicio de tratamiento:</span>
                    <span className="font-medium text-gray-900">{patient.startDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Última sesión:</span>
                    <span className="font-medium text-gray-900">{patient.lastSession}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Próxima sesión:</span>
                    <span className="font-medium text-blue-600">{patient.nextSession}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Sesiones completadas:</span>
                    <span className="font-medium text-gray-900">{patient.sessionsCompleted}</span>
                  </div>
                </div>

                {/* Barra de progreso */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Progreso general:</span>
                    <span className="font-semibold text-gray-900">{patient.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${patient.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium">
                    Ver Detalle
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium">
                    Historial
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron pacientes</h3>
            <p className="text-gray-600">Intenta ajustar los filtros de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  )
}
