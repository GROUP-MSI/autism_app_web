"use client"

import { useState } from "react"

export default function DoctorMessages() {
  const [selectedConversation, setSelectedConversation] = useState("1")
  const [messageText, setMessageText] = useState("")

  // Datos quemados para simulación
  const conversations = [
    {
      id: "1",
      name: "Padres de Juan Pérez",
      lastMessage: "Gracias por el reporte, Doctor",
      timestamp: "10:30 AM",
      unread: 2,
      avatar: "/whimsical-child.png",
    },
    {
      id: "2",
      name: "Padres de Miguel Rodríguez",
      lastMessage: "¿Cuándo es la próxima sesión?",
      timestamp: "Ayer",
      unread: 0,
      avatar: "/young-boy-drawing.png",
    },
    {
      id: "3",
      name: "Padres de Ana Torres",
      lastMessage: "Ana ha mejorado mucho",
      timestamp: "15 Dic",
      unread: 1,
      avatar: "/young-woman-smiling.png",
    },
  ]

  const messages = {
    "1": [
      {
        id: "1",
        sender: "doctor",
        text: "Buenas tardes. Les comparto el reporte de progreso de Juan de esta semana.",
        timestamp: "10:15 AM",
      },
      {
        id: "2",
        sender: "parent",
        text: "Muchas gracias, Doctor. ¿Cómo ha estado Juan en las sesiones?",
        timestamp: "10:20 AM",
      },
      {
        id: "3",
        sender: "doctor",
        text: "Juan ha mostrado mejoras significativas en comunicación. Está participando más activamente en las actividades grupales.",
        timestamp: "10:25 AM",
      },
      {
        id: "4",
        sender: "parent",
        text: "Gracias por el reporte, Doctor",
        timestamp: "10:30 AM",
      },
    ],
  }

  const currentConversation = conversations.find((c) => c.id === selectedConversation)
  const currentMessages = messages["1"] || []

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Aquí iría la lógica para enviar el mensaje
      setMessageText("")
    }
  }

  return (
    <div className="p-6 bg-gray-50 h-screen">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Mensajes</h1>
          <p className="text-gray-600 mt-1">Comunícate con los padres de tus pacientes</p>
        </div>

        {/* Contenedor de mensajería */}
        <div className="flex-1 bg-white rounded-lg shadow overflow-hidden flex">
          {/* Lista de conversaciones */}
          <div className="w-80 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <input
                type="text"
                placeholder="Buscar conversación..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex-1 overflow-y-auto">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedConversation === conversation.id ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={conversation.avatar || "/placeholder.svg"}
                        alt={conversation.name}
                        className="w-12 h-12 rounded-full"
                      />
                      {conversation.unread > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{conversation.name}</h4>
                      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    </div>
                    <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Área de mensajes */}
          <div className="flex-1 flex flex-col">
            {/* Header de conversación */}
            <div className="p-4 border-b border-gray-200 flex items-center gap-3">
              <img
                src={currentConversation?.avatar || "/placeholder.svg"}
                alt={currentConversation?.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{currentConversation?.name}</h3>
                <p className="text-sm text-gray-600">En línea</p>
              </div>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {currentMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "doctor" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-md px-4 py-3 rounded-lg ${
                      message.sender === "doctor" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.sender === "doctor" ? "text-blue-100" : "text-gray-500"}`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input de mensaje */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
