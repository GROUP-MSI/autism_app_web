"use client"

import { useDispatch } from "react-redux"
import { deleteTreatmentPlan, type TreatmentPlan } from "../../../store/slices/treatmentPlanSlice"
import { toast } from "react-toastify"

interface DeleteTreatmentPlanViewProps {
  plan: TreatmentPlan
  onClose: () => void
}

export const DeleteTreatmentPlanView = ({ plan, onClose }: DeleteTreatmentPlanViewProps) => {
  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(deleteTreatmentPlan(plan.id))
    toast.success("Plan de tratamiento eliminado exitosamente")
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <i className="bi bi-exclamation-triangle text-red-600"></i>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">Eliminar Plan de Tratamiento</h3>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-600">
            ¿Estás seguro de que deseas eliminar el plan de tratamiento <strong>"{plan.title}"</strong> para{" "}
            <strong>{plan.childName}</strong>?
          </p>
          <p className="text-sm text-red-600 mt-2">
            Esta acción no se puede deshacer y se perderán todos los datos asociados.
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
            Cancelar
          </button>
          <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Eliminar Plan
          </button>
        </div>
      </div>
    </div>
  )
}
