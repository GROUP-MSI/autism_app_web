"use client"

import type React from "react"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { addTreatmentPlan, type TreatmentPlan } from "../../../store/slices/treatmentPlanSlice"

interface CreateTreatmentPlanViewProps {
  onClose: () => void
}

export const CreateTreatmentPlanView = ({ onClose }: CreateTreatmentPlanViewProps) => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    childName: "",
    childAge: "",
    therapistName: "",
    objectives: [""],
    startDate: "",
    endDate: "",
    sessions: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.childName || !formData.therapistName) {
      toast.error("Por favor completa todos los campos requeridos")
      return
    }

    const newPlan: TreatmentPlan = {
      id: `tp-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      childName: formData.childName,
      childAge: Number.parseInt(formData.childAge),
      therapistId: `user-${Date.now()}`,
      therapistName: formData.therapistName,
      objectives: formData.objectives.filter((obj) => obj.trim() !== ""),
      startDate: formData.startDate,
      endDate: formData.endDate,
      status: "draft",
      sessions: Number.parseInt(formData.sessions),
      completedSessions: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    dispatch(addTreatmentPlan(newPlan))
    toast.success("Plan de tratamiento creado exitosamente")
    onClose()
  }

  const addObjective = () => {
    setFormData((prev) => ({
      ...prev,
      objectives: [...prev.objectives, ""],
    }))
  }

  const removeObjective = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      objectives: prev.objectives.filter((_, i) => i !== index),
    }))
  }

  const updateObjective = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      objectives: prev.objectives.map((obj, i) => (i === index ? value : obj)),
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Crear Plan de Tratamiento</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <i className="bi bi-x-lg text-xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Título del Plan *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: Plan de Comunicación Básica"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Niño *</label>
              <input
                type="text"
                value={formData.childName}
                onChange={(e) => setFormData((prev) => ({ ...prev, childName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nombre completo"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Edad del Niño *</label>
              <input
                type="number"
                value={formData.childAge}
                onChange={(e) => setFormData((prev) => ({ ...prev, childAge: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Edad en años"
                min="1"
                max="18"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Terapeuta Responsable *</label>
              <input
                type="text"
                value={formData.therapistName}
                onChange={(e) => setFormData((prev) => ({ ...prev, therapistName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nombre del terapeuta"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Descripción detallada del plan de tratamiento"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Objetivos Terapéuticos</label>
            {formData.objectives.map((objective, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={objective}
                  onChange={(e) => updateObjective(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Objetivo ${index + 1}`}
                />
                {formData.objectives.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeObjective(index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addObjective} className="text-blue-600 hover:text-blue-700 text-sm">
              <i className="bi bi-plus-circle mr-1"></i>
              Agregar objetivo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Inicio</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Finalización</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, endDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Número de Sesiones</label>
              <input
                type="number"
                value={formData.sessions}
                onChange={(e) => setFormData((prev) => ({ ...prev, sessions: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Total de sesiones"
                min="1"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Crear Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
