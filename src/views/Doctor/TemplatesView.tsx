"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../store/store"
import { setTemplates, deleteTemplate } from "../../store/slices/evaluationSlice"
import { initialTemplatesData } from "../../utils/data/evaluations"
import type { EvaluationTemplate } from "../../store/slices/evaluationSlice"

export const TemplatesView = () => {
  const dispatch = useDispatch()
  const { templates } = useSelector((state: RootState) => state.evaluations)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState<EvaluationTemplate | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  console.log(showCreateModal);
  useEffect(() => {
    const savedTemplates = localStorage.getItem("evaluationTemplates")
    if (savedTemplates) {
      dispatch(setTemplates(JSON.parse(savedTemplates)))
    } else {
      dispatch(setTemplates(initialTemplatesData))
      localStorage.setItem("evaluationTemplates", JSON.stringify(initialTemplatesData))
    }
  }, [dispatch])

  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (id: string) => {
    if (confirm("¿Está seguro de que desea eliminar esta plantilla?")) {
      dispatch(deleteTemplate(id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Plantillas de Evaluación</h1>
          <p className="text-gray-600">Gestiona las plantillas disponibles para evaluaciones</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <i className="bi bi-plus-circle"></i>
          Nueva Plantilla
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="bi bi-search text-gray-400"></i>
          </div>
          <input
            type="text"
            placeholder="Buscar plantillas por nombre, descripción o categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{template.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedTemplate(template)}
                    className="text-blue-600 hover:text-blue-900"
                    title="Ver detalles"
                  >
                    <i className="bi bi-eye"></i>
                  </button>
                  <button
                    onClick={() => handleDelete(template.id)}
                    className="text-red-600 hover:text-red-900"
                    title="Eliminar plantilla"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Categoría:</span>
                  <span className="font-medium">{template.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Preguntas:</span>
                  <span className="font-medium">{template.questions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Duración:</span>
                  <span className="font-medium">{template.estimatedDuration} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Estado:</span>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      template.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {template.isActive ? "Activa" : "Inactiva"}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <button
                  onClick={() => setSelectedTemplate(template)}
                  className="w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                >
                  Ver Detalles
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <i className="bi bi-file-earmark-text text-4xl text-gray-400 mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron plantillas</h3>
          <p className="text-gray-500">
            {searchTerm ? "Intenta con otros términos de búsqueda" : "Comienza creando una nueva plantilla"}
          </p>
        </div>
      )}

      {/* Template Detail Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Detalles de la Plantilla</h2>
              <button onClick={() => setSelectedTemplate(null)} className="text-gray-400 hover:text-gray-600">
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Información General</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Nombre:</span> {selectedTemplate.name}
                  </p>
                  <p>
                    <span className="font-medium">Categoría:</span> {selectedTemplate.category}
                  </p>
                  <p>
                    <span className="font-medium">Duración estimada:</span> {selectedTemplate.estimatedDuration} minutos
                  </p>
                  <p>
                    <span className="font-medium">Total de preguntas:</span> {selectedTemplate.questions.length}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Criterios de Puntuación</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Puntuación máxima:</span> {selectedTemplate.scoringCriteria.maxScore}
                  </p>
                  <div className="space-y-1">
                    {selectedTemplate.scoringCriteria.ranges.map((range, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full bg-${range.color}-500`}></div>
                        <span>
                          {range.min}-{range.max}: {range.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Descripción</h3>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{selectedTemplate.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-4">Preguntas ({selectedTemplate.questions.length})</h3>
              <div className="space-y-4 max-h-60 overflow-y-auto">
                {selectedTemplate.questions.map((question, index) => (
                  <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">
                        {index + 1}. {question.text}
                      </h4>
                      {question.required && <span className="text-red-500 text-sm">Requerida</span>}
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        <span className="font-medium">Tipo:</span> {question.type}
                      </p>
                      <p>
                        <span className="font-medium">Categoría:</span> {question.category}
                      </p>
                      {question.options && (
                        <p>
                          <span className="font-medium">Opciones:</span> {question.options.join(", ")}
                        </p>
                      )}
                      {question.scaleMin && question.scaleMax && (
                        <p>
                          <span className="font-medium">Escala:</span> {question.scaleMin} - {question.scaleMax}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedTemplate(null)}
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
