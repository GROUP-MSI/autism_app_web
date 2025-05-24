"use client"

import { useDispatch } from "react-redux"
import { deleteUser } from "../../../store/slices/usersSlice"
import type { User } from "../../../store/slices/usersSlice"

interface DeleteUserViewProps {
  user: User
  onClose: () => void
}

export const DeleteUserView = ({ user, onClose }: DeleteUserViewProps) => {
  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(deleteUser(user.id))
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-red-600">Eliminar Usuario</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center mb-4">
            <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-12 h-12 rounded-full mr-4" />
            <div>
              <h3 className="font-medium text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
              <p className="text-sm text-gray-500">{user.role}</p>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <i className="bi bi-exclamation-triangle text-red-400"></i>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  ¿Estás seguro de que quieres eliminar este usuario?
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>
                    Esta acción no se puede deshacer. Todos los datos asociados con este usuario se eliminarán
                    permanentemente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button onClick={handleDelete} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Eliminar Usuario
          </button>
        </div>
      </div>
    </div>
  )
}
