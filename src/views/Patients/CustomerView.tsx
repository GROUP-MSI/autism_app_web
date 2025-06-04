"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../store/store"
import { setClients, deleteClient } from "../../store/slices/clientsSlice"
import { initialClientsData } from "../../utils/data/clients"
import type { Client } from "../../store/slices/clientsSlice"

export const CustomerView = () => {
  const dispatch = useDispatch()
  const { clients } = useSelector((state: RootState) => state.clients)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)


  console.log(showCreateModal);
  console.log(showEditModal);
  console.log(selectedClient);

  useEffect(() => {
    const savedClients = localStorage.getItem("clients")
    if (savedClients) {
      dispatch(setClients(JSON.parse(savedClients)))
    } else {
      dispatch(setClients(initialClientsData))
      localStorage.setItem("clients", JSON.stringify(initialClientsData))
    }
  }, [dispatch])

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "" || client.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: "Activo", color: "bg-green-100 text-green-800" },
      inactive: { label: "Inactivo", color: "bg-red-100 text-red-800" },
      completed: { label: "Completado", color: "bg-blue-100 text-blue-800" },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active

    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${config.color}`}>{config.label}</span>
    )
  }

  const handleEdit = (client: Client) => {
    setSelectedClient(client)
    setShowEditModal(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("¿Está seguro de que desea eliminar este Paciente?")) {
      dispatch(deleteClient(id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Pacientes</h1>
          <p className="text-gray-600">Administra la información de los pacientes y sus familias</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <i className="bi bi-plus-circle"></i>
          Nuevo Paciente
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
                placeholder="Buscar por nombre, padre/madre o diagnóstico..."
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
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
              <option value="completed">Completado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paciente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Diagnóstico
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Padre/Madre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={client.avatar || "/placeholder.svg"}
                          alt={client.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{client.name}</div>
                        <div className="text-sm text-gray-500">{client.gender}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{client.age} años</div>
                    <div className="text-sm text-gray-500">{new Date(client.birthDate).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{client.diagnosis}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{client.parentName}</div>
                    <div className="text-sm text-gray-500">{client.parentEmail}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(client.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setSelectedClient(client)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Ver detalles"
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                      <button
                        onClick={() => handleEdit(client)}
                        className="text-green-600 hover:text-green-900"
                        title="Editar Paciente"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(client.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Eliminar Paciente"
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

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <i className="bi bi-people text-4xl text-gray-400 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron Pacientes</h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter
                ? "Intenta con otros filtros de búsqueda"
                : "Comienza agregando un nuevo Paciente"}
            </p>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <i className="bi bi-people text-2xl text-blue-600"></i>
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-medium text-gray-900">Total Pacientes</h4>
              <p className="text-2xl font-bold text-blue-600">{clients.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <i className="bi bi-check-circle text-2xl text-green-600"></i>
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-medium text-gray-900">Activos</h4>
              <p className="text-2xl font-bold text-green-600">{clients.filter((c) => c.status === "active").length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <i className="bi bi-person-plus text-2xl text-purple-600"></i>
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-medium text-gray-900">Nuevos Este Mes</h4>
              <p className="text-2xl font-bold text-purple-600">2</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <i className="bi bi-graph-up text-2xl text-orange-600"></i>
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-medium text-gray-900">Edad Promedio</h4>
              <p className="text-2xl font-bold text-orange-600">
                {clients.length > 0 ? Math.round(clients.reduce((sum, c) => sum + c.age, 0) / clients.length) : 0} años
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
