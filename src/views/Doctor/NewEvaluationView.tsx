"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../store/store"
import { addEvaluation } from "../../store/slices/evaluationSlice"
import type { Evaluation } from "../../store/slices/evaluationSlice"

export const NewEvaluationView = () => {
  const dispatch = useDispatch()
  const { clients } = useSelector((state: RootState) => state.clients)
  const { templates } = useSelector((state: RootState) => state.evaluations)
  const { users } = useSelector((state: RootState) => state.users)

  const [formData, setFormData] = useState({
    clientId: "",
    templateId: "",
    evaluatorId: "",
    date: new Date().toISOString().split("T")[0],
    notes: "",
  })

  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [responses, setResponses] = useState<Record<string, any>>({})

  useEffect(() => {
    if (formData.templateId) {
      const template = templates.find((t) => t.id === formData.templateId)
      setSelectedTemplate(template)
      setResponses({})
    }
  }, [formData.templateId, templates])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const selectedClient = clients.find((c) => c.id === formData.clientId)
    const selectedEvaluator = users.find((u) => u.id === formData.evaluatorId)
    const template = templates.find((t) => t.id === formData.templateId)

    if (!selectedClient || !selectedEvaluator || !template) return

    const newEvaluation: Evaluation = {
      id: Date.now().toString(),
      clientId: formData.clientId,
      clientName: selectedClient.name,
      templateId: formData.templateId,
      templateName: template.name,
      evaluatorId: formData.evaluatorId,
      evaluatorName: selectedEvaluator.name,
      date: formData.date,
      status: "pending",
      responses,
      score: 0,
      recommendations: [],
      notes: formData.notes,
      createdAt: new Date().toISOString(),
    }

    dispatch(addEvaluation(newEvaluation))

    // Reset form
    setFormData({
      clientId: "",
      templateId: "",
      evaluatorId: "",
      date: new Date().toISOString().split("T")[0],
      notes: "",
    })
    setResponses({})
    setSelectedTemplate(null)
  }

  const handleResponseChange = (questionId: string, value: any) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Nueva Evaluación</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cliente/Paciente</label>
              <select
                value={formData.clientId}
                onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar cliente</option>
                {clients
                  .filter((client) => client.status === "active")
                  .map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name} - {client.age} años
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Plantilla de Evaluación</label>
              <select
                value={formData.templateId}
                onChange={(e) => setFormData({ ...formData, templateId: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar plantilla</option>
                {templates
                  .filter((template) => template.isActive)
                  .map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name} ({template.estimatedDuration} min)
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Evaluador</label>
              <select
                value={formData.evaluatorId}
                onChange={(e) => setFormData({ ...formData, evaluatorId: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar evaluador</option>
                {users
                  .filter((user) => user.status === "active")
                  .map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} - {user.role}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Evaluación</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {selectedTemplate && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Preguntas de Evaluación</h3>
              <div className="space-y-4">
                {selectedTemplate.questions.map((question: any) => (
                  <div key={question.id} className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {question.text}
                      {question.required && <span className="text-red-500 ml-1">*</span>}
                    </label>

                    {question.type === "scale" && (
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">{question.scaleMin}</span>
                        <input
                          type="range"
                          min={question.scaleMin}
                          max={question.scaleMax}
                          value={responses[question.id] || question.scaleMin}
                          onChange={(e) => handleResponseChange(question.id, Number.parseInt(e.target.value))}
                          className="flex-1"
                        />
                        <span className="text-sm text-gray-500">{question.scaleMax}</span>
                        <span className="text-sm font-medium text-blue-600 min-w-[2rem]">
                          {responses[question.id] || question.scaleMin}
                        </span>
                      </div>
                    )}

                    {question.type === "multiple_choice" && (
                      <select
                        value={responses[question.id] || ""}
                        onChange={(e) => handleResponseChange(question.id, e.target.value)}
                        required={question.required}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Seleccionar opción</option>
                        {question.options?.map((option: string) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}

                    {question.type === "text" && (
                      <textarea
                        value={responses[question.id] || ""}
                        onChange={(e) => handleResponseChange(question.id, e.target.value)}
                        required={question.required}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Escriba su respuesta aquí..."
                      />
                    )}

                    {question.type === "boolean" && (
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name={question.id}
                            value="true"
                            checked={responses[question.id] === "true"}
                            onChange={(e) => handleResponseChange(question.id, e.target.value)}
                            className="mr-2"
                          />
                          Sí
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name={question.id}
                            value="false"
                            checked={responses[question.id] === "false"}
                            onChange={(e) => handleResponseChange(question.id, e.target.value)}
                            className="mr-2"
                          />
                          No
                        </label>
                      </div>
                    )}

                    <div className="mt-2 text-xs text-gray-500">Categoría: {question.category}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notas Adicionales</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Observaciones, comentarios adicionales..."
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Crear Evaluación
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
