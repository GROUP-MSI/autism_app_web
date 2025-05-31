"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../store/store"
import { setTreatmentPlans, type TreatmentPlan } from "../../store/slices/treatmentPlanSlice"
import { initialTreatmentPlansData } from "../../utils/data/treatmentPlan"
import { CreateTreatmentPlanView } from "./TreatmentPlan/CreateTreatmentPlanView"
import { DeleteTreatmentPlanView } from "./TreatmentPlan/DeleteTreatmentPlanView"
import { EditTreatmentPlanView } from "./TreatmentPlan/EditTreatmentPlanView"

export const TreatmentPlansView = () => {
  const dispatch = useDispatch()
  const { plans } = useSelector((state: RootState) => state.treatmentPlans)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<TreatmentPlan | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  useEffect(() => {
    const savedPlans = localStorage.getItem("treatmentPlans")
    if (savedPlans) {
      dispatch(setTreatmentPlans(JSON.parse(savedPlans)))
    } else {
      dispatch(setTreatmentPlans(initialTreatmentPlansData))
      localStorage.setItem("treatmentPlans", JSON.stringify(initialTreatmentPlansData))
    }
  }, [dispatch])

  const filteredPlans = plans.filter((plan) => {
    const matchesSearch =
      plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.therapistName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "" || plan.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleEdit = (plan: TreatmentPlan) => {
    setSelectedPlan(plan)
    setShowEditModal(true)
  }

  const handleDelete = (plan: TreatmentPlan) => {
    setSelectedPlan(plan)
    setShowDeleteModal(true)
  }

  const getStatusBadge = (status: TreatmentPlan["status"]) => {
    const statusConfig = {
      draft: { bg: "bg-gray-100", text: "text-gray-800", label: "Borrador" },
      active: { bg: "bg-green-100", text: "text-green-800", label: "Activo" },
      completed: { bg: "bg-blue-100", text: "text-blue-800", label: "Completado" },
      paused: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Pausado" },
    }

    const config = statusConfig[status]
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>{config.label}</span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Planes de Tratamiento</h1>
          <p className="text-gray-600">Gestiona los planes de tratamiento personalizados para cada niño</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <i className="bi bi-plus-circle"></i>
          Crear Plan de Tratamiento
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="bi bi-search text-gray-400"></i>
              </div>
              <input
                type="text"
                placeholder="Buscar por título, niño o terapeuta..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los estados</option>
              <option value="draft">Borrador</option>
              <option value="active">Activo</option>
              <option value="completed">Completado</option>
              <option value="paused">Pausado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{plan.title}</h3>
                {getStatusBadge(plan.status)}
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <i className="bi bi-person-fill mr-2"></i>
                  <span>
                    {plan.childName} ({plan.childAge} años)
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <i className="bi bi-person-badge mr-2"></i>
                  <span>{plan.therapistName}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <i className="bi bi-calendar-range mr-2"></i>
                  <span>
                    {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progreso</span>
                  <span>
                    {plan.completedSessions}/{plan.sessions} sesiones
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(plan.completedSessions / plan.sessions) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 line-clamp-2">{plan.description}</p>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleEdit(plan)}
                  className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-md text-sm"
                >
                  <i className="bi bi-pencil mr-1"></i>
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(plan)}
                  className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-md text-sm"
                >
                  <i className="bi bi-trash mr-1"></i>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPlans.length === 0 && (
        <div className="text-center py-12">
          <i className="bi bi-clipboard-data text-4xl text-gray-400 mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron planes</h3>
          <p className="text-gray-600">No hay planes de tratamiento que coincidan con los filtros aplicados.</p>
        </div>
      )}

      {/* Modals */}
      {showCreateModal && <CreateTreatmentPlanView onClose={() => setShowCreateModal(false)} />}

      {showEditModal && selectedPlan && (
        <EditTreatmentPlanView plan={selectedPlan} onClose={() => setShowEditModal(false)} />
      )}

      {showDeleteModal && selectedPlan && (
        <DeleteTreatmentPlanView plan={selectedPlan} onClose={() => setShowDeleteModal(false)} />
      )}
    </div>
  )
}
