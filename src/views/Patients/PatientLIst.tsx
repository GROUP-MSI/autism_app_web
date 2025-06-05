"use client"

import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../store/store"
import { initialPatientsData } from "../../utils/data/other"
import { deletePatient, setPatients } from "../../store/slices/patientSlice"

export const PatientsList = () => {
  const dispatch = useDispatch()
  const { patients } = useSelector((state: RootState) => state.patients)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null)

  useEffect(() => {
    const savedPatients = localStorage.getItem("patients")
    if (savedPatients) {
      dispatch(setPatients(JSON.parse(savedPatients)))
    } else {
      dispatch(setPatients(initialPatientsData))
      localStorage.setItem("patients", JSON.stringify(initialPatientsData))
    }
  }, [dispatch])

  const filteredPatients = patients.filter((patient: { firstName: string; lastName: string; currentStatus: string }) => {
    const matchesSearch =
      patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || patient.currentStatus === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    const colors = {
      activo: "bg-green-100 text-green-800",
      inactivo: "bg-gray-100 text-gray-800",
      alta: "bg-blue-100 text-blue-800",
      derivado: "bg-yellow-100 text-yellow-800",
    }
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getSeverityColor = (level: number) => {
    const colors = {
      1: "bg-green-100 text-green-800",
      2: "bg-yellow-100 text-yellow-800",
      3: "bg-red-100 text-red-800",
    }
    return colors[level as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date()
    const birth = new Date(dateOfBirth)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  const handleDelete = (patientId: string) => {
    if (confirm("¿Está seguro de que desea eliminar este paciente?")) {
      dispatch(deletePatient(patientId))

      // Actualizar localStorage
      const updatedPatients = patients.filter((p) => p.id !== patientId)
      localStorage.setItem("patients", JSON.stringify(updatedPatients))

      if (selectedPatient === patientId) {
        setSelectedPatient(null)
      }
    }
  }

  const selectedPatientData = patients.find((p) => p.id === selectedPatient)

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Lista de Pacientes</h1>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Registrar Nuevo Paciente
          </button>
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Buscar Paciente</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nombre..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todos los estados</option>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
                <option value="alta">Alta</option>
                <option value="derivado">Derivado</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm("")
                  setFilterStatus("all")
                }}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Limpiar Filtros
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de pacientes */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Pacientes ({filteredPatients.length})</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className={`p-6 hover:bg-gray-50 cursor-pointer transition-colors ${
                      selectedPatient === patient.id ? "bg-blue-50 border-l-4 border-blue-500" : ""
                    }`}
                    onClick={() => setSelectedPatient(patient.id)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {patient.firstName} {patient.lastName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {calculateAge(patient.dateOfBirth)} años • {patient.gender}
                        </p>
                        <p className="text-sm text-gray-600">Terapeuta: {patient.assignedTherapist}</p>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(patient.currentStatus)}`}>
                          {patient.currentStatus}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(patient.severityLevel)}`}>
                          Nivel {patient.severityLevel}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Última visita:</span>
                        <p>{new Date(patient.lastVisit).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="font-medium">Próxima cita:</span>
                        <p>{new Date(patient.nextAppointment).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 mt-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          // Lógica para editar
                        }}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Editar
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          // Lógica para ver historial
                        }}
                        className="text-green-600 hover:text-green-800 text-sm"
                      >
                        Historial
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(patient.id)
                        }}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}

                {filteredPatients.length === 0 && (
                  <div className="p-8 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                      />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No hay pacientes</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      No se encontraron pacientes con los filtros seleccionados.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Detalles del paciente seleccionado */}
          <div className="lg:col-span-1">
            {selectedPatientData ? (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Detalles del Paciente</h3>

                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Nombre Completo:</span>
                    <p className="text-gray-900">
                      {selectedPatientData.firstName} {selectedPatientData.lastName}
                    </p>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-gray-600">Fecha de Nacimiento:</span>
                    <p className="text-gray-900">
                      {new Date(selectedPatientData.dateOfBirth).toLocaleDateString()}(
                      {calculateAge(selectedPatientData.dateOfBirth)} años)
                    </p>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-gray-600">Diagnóstico:</span>
                    <p className="text-gray-900">{selectedPatientData.diagnosis}</p>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-gray-600">Nivel de Severidad:</span>
                    <span
                      className={`ml-2 px-2 py-1 text-xs rounded-full ${getSeverityColor(selectedPatientData.severityLevel)}`}
                    >
                      Nivel {selectedPatientData.severityLevel}
                    </span>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-gray-600">Contacto:</span>
                    <p className="text-gray-900">{selectedPatientData.contactInfo.phone}</p>
                    <p className="text-gray-900">{selectedPatientData.contactInfo.email}</p>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-gray-600">Cuidador Principal:</span>
                    <p className="text-gray-900">
                      {selectedPatientData.familyInfo.primaryCaregiver} ({selectedPatientData.familyInfo.relationship})
                    </p>
                    <p className="text-gray-600 text-sm">{selectedPatientData.familyInfo.phone}</p>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-gray-600">Terapeuta Asignado:</span>
                    <p className="text-gray-900">{selectedPatientData.assignedTherapist}</p>
                  </div>

                  {selectedPatientData.medicalHistory.allergies.length > 0 && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">Alergias:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedPatientData.medicalHistory.allergies.map((allergy, index) => (
                          <span key={index} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                            {allergy}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedPatientData.medicalHistory.medications.length > 0 && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">Medicamentos:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedPatientData.medicalHistory.medications.map((medication, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {medication}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-200 space-y-2">
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Ver Historial Completo
                    </button>
                    <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                      Nueva Evaluación
                    </button>
                    <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                      Editar Información
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-center text-gray-500">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                  <p className="mt-2">Selecciona un paciente para ver los detalles</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
