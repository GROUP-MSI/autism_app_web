"use client"

import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../store"
import { initialMessagesData, initialRecommendationsData } from "../../utils/data/other"
import { addMessage, addRecommendation, implementRecommendation, markMessageAsRead, setMessages, setRecommendations } from "../../store/slices/communicationSlice"

export default function CommunicationCenter() {
  const dispatch = useDispatch()
  const { messages, recommendations } = useSelector((state: RootState) => state.communication)
  const [activeTab, setActiveTab] = useState<"messages" | "recommendations" | "resources">("messages")
  const [newMessage, setNewMessage] = useState({
    patientId: "",
    to: "",
    subject: "",
    content: "",
    type: "info" as const,
  })

  useEffect(() => {
    // Cargar datos desde localStorage
    const savedMessages = localStorage.getItem("messages")
    const savedRecommendations = localStorage.getItem("recommendations")

    if (savedMessages) {
      dispatch(setMessages(JSON.parse(savedMessages)))
    } else {
      dispatch(setMessages(initialMessagesData))
      localStorage.setItem("messages", JSON.stringify(initialMessagesData))
    }

    if (savedRecommendations) {
      dispatch(setRecommendations(JSON.parse(savedRecommendations)))
    } else {
      dispatch(setRecommendations(initialRecommendationsData))
      localStorage.setItem("recommendations", JSON.stringify(initialRecommendationsData))
    }
  }, [dispatch])

  useEffect(() => {
    // Guardar en localStorage cuando cambien los datos
    localStorage.setItem("messages", JSON.stringify(messages))
    localStorage.setItem("recommendations", JSON.stringify(recommendations))
  }, [messages, recommendations])

  const handleSendMessage = () => {
    if (newMessage.subject && newMessage.content && newMessage.to) {
      const message = {
        id: `msg-${Date.now()}`,
        patientId: newMessage.patientId || "patient-1",
        from: "Dr. Sistema TEA",
        to: newMessage.to,
        subject: newMessage.subject,
        content: newMessage.content,
        type: newMessage.type,
        read: false,
        createdAt: new Date().toISOString(),
      }

      dispatch(addMessage(message))
      setNewMessage({
        patientId: "",
        to: "",
        subject: "",
        content: "",
        type: "info",
      })
    }
  }

  const generateAIRecommendation = () => {
    const recommendations = [
      {
        type: "activity" as const,
        title: "Incrementar actividades de comunicación",
        description:
          "Basado en el análisis de datos, se recomienda aumentar las sesiones de comunicación verbal para mejorar el progreso del paciente.",
        priority: "medium" as const,
      },
      {
        type: "therapy" as const,
        title: "Terapia sensorial especializada",
        description:
          "Los patrones de comportamiento sugieren que el paciente se beneficiaría de terapia sensorial enfocada en integración vestibular.",
        priority: "high" as const,
      },
      {
        type: "lifestyle" as const,
        title: "Rutina de ejercicios en casa",
        description:
          "Implementar una rutina de ejercicios motores finos en el hogar para complementar las sesiones terapéuticas.",
        priority: "low" as const,
      },
    ]

    const randomRec = recommendations[Math.floor(Math.random() * recommendations.length)]

    const newRecommendation = {
      id: `rec-${Date.now()}`,
      patientId: "patient-1",
      type: randomRec.type,
      title: randomRec.title,
      description: randomRec.description,
      priority: randomRec.priority,
      aiGenerated: true,
      implemented: false,
      createdAt: new Date().toISOString(),
    }

    dispatch(addRecommendation(newRecommendation))
  }

  const getMessageTypeColor = (type: string) => {
    const colors = {
      info: "bg-blue-100 text-blue-800",
      recommendation: "bg-green-100 text-green-800",
      alert: "bg-red-100 text-red-800",
      feedback: "bg-yellow-100 text-yellow-800",
    }
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-red-100 text-red-800",
    }
    return colors[priority as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Centro de Comunicación</h1>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("messages")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "messages"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Mensajes ({messages.filter((m) => !m.read).length})
              </button>
              <button
                onClick={() => setActiveTab("recommendations")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "recommendations"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Recomendaciones IA ({recommendations.filter((r) => !r.implemented).length})
              </button>
              <button
                onClick={() => setActiveTab("resources")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "resources"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Recursos para Familias
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Tab: Mensajes */}
            {activeTab === "messages" && (
              <div className="space-y-6">
                {/* Formulario para nuevo mensaje */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Enviar Nuevo Mensaje</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Para</label>
                      <input
                        type="text"
                        value={newMessage.to}
                        onChange={(e) => setNewMessage({ ...newMessage, to: e.target.value })}
                        placeholder="Destinatario"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                      <select
                        value={newMessage.type}
                        onChange={(e) => setNewMessage({ ...newMessage, type: e.target.value as any })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="info">Información</option>
                        <option value="recommendation">Recomendación</option>
                        <option value="alert">Alerta</option>
                        <option value="feedback">Retroalimentación</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Asunto</label>
                    <input
                      type="text"
                      value={newMessage.subject}
                      onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                      placeholder="Asunto del mensaje"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contenido</label>
                    <textarea
                      value={newMessage.content}
                      onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                      placeholder="Escriba su mensaje aquí..."
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Enviar Mensaje
                  </button>
                </div>

                {/* Lista de mensajes */}
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`border rounded-lg p-4 ${!message.read ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-gray-900">{message.subject}</h4>
                          <span className={`px-2 py-1 text-xs rounded-full ${getMessageTypeColor(message.type)}`}>
                            {message.type}
                          </span>
                          {!message.read && (
                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Nuevo</span>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(message.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">De:</span> {message.from} →{" "}
                        <span className="font-medium">Para:</span> {message.to}
                      </div>
                      <p className="text-gray-700 mb-3">{message.content}</p>
                      {!message.read && (
                        <button
                          onClick={() => dispatch(markMessageAsRead(message.id))}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Marcar como leído
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Recomendaciones IA */}
            {activeTab === "recommendations" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Recomendaciones Generadas por IA</h3>
                  <button
                    onClick={generateAIRecommendation}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Generar Nueva Recomendación
                  </button>
                </div>

                <div className="space-y-4">
                  {recommendations.map((recommendation) => (
                    <div key={recommendation.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-gray-900">{recommendation.title}</h4>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(recommendation.priority)}`}
                          >
                            {recommendation.priority}
                          </span>
                          {recommendation.aiGenerated && (
                            <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">IA</span>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(recommendation.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="mb-3">
                        <span className="text-sm font-medium text-gray-600">Tipo:</span>
                        <span className="ml-2 text-sm text-gray-900 capitalize">{recommendation.type}</span>
                      </div>

                      <p className="text-gray-700 mb-4">{recommendation.description}</p>

                      <div className="flex space-x-2">
                        {!recommendation.implemented && (
                          <button
                            onClick={() => dispatch(implementRecommendation(recommendation.id))}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                          >
                            Implementar
                          </button>
                        )}
                        {recommendation.implemented && (
                          <span className="px-4 py-2 bg-green-100 text-green-800 rounded-md text-sm">
                            ✓ Implementada
                          </span>
                        )}
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm">
                          Ver Detalles
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Recursos para Familias */}
            {activeTab === "resources" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Recursos para Familias</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                      </div>
                      <h4 className="ml-3 font-semibold text-gray-900">Guías Educativas</h4>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Materiales educativos sobre TEA y estrategias de apoyo en el hogar.
                    </p>
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Descargar Guías
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <h4 className="ml-3 font-semibold text-gray-900">Videos Tutoriales</h4>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Videos explicativos sobre técnicas terapéuticas y actividades en casa.
                    </p>
                    <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                      Ver Videos
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                      <h4 className="ml-3 font-semibold text-gray-900">Grupos de Apoyo</h4>
                    </div>
                    <p className="text-gray-600 mb-4">Conecta con otras familias y comparte experiencias.</p>
                    <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                      Unirse a Grupos
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <h4 className="ml-3 font-semibold text-gray-900">Plantillas de Actividades</h4>
                    </div>
                    <p className="text-gray-600 mb-4">Plantillas descargables para actividades en casa.</p>
                    <button className="w-full px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors">
                      Descargar Plantillas
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <h4 className="ml-3 font-semibold text-gray-900">Línea de Apoyo</h4>
                    </div>
                    <p className="text-gray-600 mb-4">Contacto directo para consultas y apoyo emocional.</p>
                    <button className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                      Contactar Ahora
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          />
                        </svg>
                      </div>
                      <h4 className="ml-3 font-semibold text-gray-900">Recursos Legales</h4>
                    </div>
                    <p className="text-gray-600 mb-4">Información sobre derechos y recursos legales disponibles.</p>
                    <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                      Ver Recursos
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
