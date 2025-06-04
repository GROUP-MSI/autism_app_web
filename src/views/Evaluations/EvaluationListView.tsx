"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../store/store"
import { setEvaluations, deleteEvaluation } from "../../store/slices/evaluationSlice"
import { initialEvaluationsData } from "../../utils/data/evaluations"

export const EvaluationsListView = () => {
  const dispatch = useDispatch()
  const { evaluations } = useSelector((state: RootState) => state.evaluations)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [selectedEvaluation, setSelectedEvaluation] = useState<any>(null)

  useEffect(() => {
    const savedEvaluations = localStorage.getItem("evaluations")
    if (savedEvaluations) {
      dispatch(setEvaluations(JSON.parse(savedEvaluations)))
    } else {
      dispatch(setEvaluations(initialEvaluationsData))
      localStorage.setItem("evaluations", JSON.stringify(initialEvaluationsData))
    }
  }, [dispatch])

  const filteredEvaluations = evaluations.filter((evaluation) => {
    const matchesSearch =
      evaluation.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evaluation.templateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evaluation.evaluatorName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "" || evaluation.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Pendiente", color: "bg-yellow-100 text-yellow-800" },
      in_progress: { label: "En Progreso", color: "bg-blue-100 text-blue-800" },
      completed: { label: "Completada", color: "bg-green-100 text-green-800" },
      reviewed: { label: "Revisada", color: "bg-purple-100 text-purple-800" },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending

    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${config.color}`}>{config.label}</span>
    )
  }

  const handleDelete = (id: string) => {
    if (confirm("¿Está seguro de que desea eliminar esta evaluación?")) {
      dispatch(deleteEvaluation(id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Evaluaciones Realizadas</h1>
          <p className="text-gray-600">Historial completo de evaluaciones del sistema</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="bi bi-search text-gray-400"></i>
              </div>
              <input
                type="text"
                placeholder="Buscar por cliente, plantilla o evaluador..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los estados</option>
              <option value="pending">Pendiente</option>
              <option value="in_progress">En Progreso</option>
              <option value="completed">Completada</option>
              <option value="reviewed">Revisada</option>
            </select>
          </div>
        </div>
      </div>

      {/* Evaluations Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plantilla
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Evaluador
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Puntuación
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEvaluations.map((evaluation) => (
                <tr key={evaluation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{evaluation.clientName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{evaluation.templateName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{evaluation.evaluatorName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(evaluation.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(evaluation.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {evaluation.status === "completed" || evaluation.status === "reviewed"
                        ? `${evaluation.score}/100`
                        : "-"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setSelectedEvaluation(evaluation)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Ver detalles"
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(evaluation.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Eliminar evaluación"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEvaluations.length === 0 && (
          <div className="text-center py-12">
            <i className="bi bi-clipboard-data text-4xl text-gray-400 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron evaluaciones</h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter ? "Intenta con otros filtros de búsqueda" : "Aún no hay evaluaciones creadas"}
            </p>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <i className="bi bi-clipboard-data text-2xl text-blue-600"></i>
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-medium text-gray-900">Total</h4>
              <p className="text-2xl font-bold text-blue-600">{evaluations.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <i className="bi bi-check-circle text-2xl text-green-600"></i>
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-medium text-gray-900">Completadas</h4>
              <p className="text-2xl font-bold text-green-600">
                {evaluations.filter((e) => e.status === "completed").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <i className="bi bi-clock text-2xl text-yellow-600"></i>
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-medium text-gray-900">En Progreso</h4>
              <p className="text-2xl font-bold text-yellow-600">
                {evaluations.filter((e) => e.status === "in_progress").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <i className="bi bi-hourglass text-2xl text-orange-600"></i>
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-medium text-gray-900">Pendientes</h4>
              <p className="text-2xl font-bold text-orange-600">
                {evaluations.filter((e) => e.status === "pending").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Evaluation Detail Modal */}
      {selectedEvaluation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Detalles de la Evaluación</h2>
              <button onClick={() => setSelectedEvaluation(null)} className="text-gray-400 hover:text-gray-600">
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Información General</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Cliente:</span> {selectedEvaluation.clientName}
                  </p>
                  <p>
                    <span className="font-medium">Plantilla:</span> {selectedEvaluation.templateName}
                  </p>
                  <p>
                    <span className="font-medium">Evaluador:</span> {selectedEvaluation.evaluatorName}
                  </p>
                  <p>
                    <span className="font-medium">Fecha:</span> {new Date(selectedEvaluation.date).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium">Estado:</span> {getStatusBadge(selectedEvaluation.status)}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Resultados</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Puntuación:</span>{" "}
                    {selectedEvaluation.status === "completed" ? `${selectedEvaluation.score}/100` : "Pendiente"}
                  </p>
                  <p>
                    <span className="font-medium">Recomendaciones:</span> {selectedEvaluation.recommendations.length}
                  </p>
                </div>
              </div>
            </div>

            {selectedEvaluation.notes && (
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Notas</h3>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{selectedEvaluation.notes}</p>
              </div>
            )}

            {selectedEvaluation.recommendations.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Recomendaciones</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  {selectedEvaluation.recommendations.map((rec: string, index: number) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedEvaluation(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
