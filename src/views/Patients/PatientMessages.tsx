"use client"

import { useState } from "react"

export default function PatientMessages() {
  const [messageText, setMessageText] = useState("")

  // Datos quemados para simulación
  const therapistInfo = {
    name: "Dr. María González",
    avatar: "/caring-doctor.png",
    status: "online",
  }

  const [messages] = useState([
    {
      id: "1",
      sender: "therapist",
      text: "¡Hola! ¿Cómo te fue con las actividades de hoy?",
      timestamp: "10:15 AM",
    },
    {
      id: "2",
      sender: "patient",
      text: "¡Muy bien! Me gustó mucho el juego de las emociones",
      timestamp: "10:20 AM",
    },
    {
      id: "3",
      sender: "therapist",
      text: "¡Qué alegría! Me encanta que te haya gustado. ¿Cuál fue tu emoción favorita?",
      timestamp: "10:22 AM",
    },
    {
      id: "4",
      sender: "patient",
      text: "La felicidad porque es cuando estoy con mis amigos",
      timestamp: "10:25 AM",
    },
    {
      id: "5",
      sender: "therapist",
      text: "¡Perfecto! Eso es muy bonito. Sigue practicando y nos vemos en la próxima sesión 😊",
      timestamp: "10:28 AM",
    },
  ])

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Aquí iría la lógica para enviar el mensaje
      setMessageText("")
    }
  }

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 h-screen flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Mensajes</h1>
          <p className="text-gray-600 mt-1">Habla con tu terapeuta</p>
        </div>

        {/* Chat container */}
        <div className="flex-1 bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
          {/* Therapist header */}
          <div className="p-4 border-b border-gray-200 bg-blue-50">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={therapistInfo.avatar || "/placeholder.svg"}
                  alt={therapistInfo.name}
                  className="w-12 h-12 rounded-full border-2 border-blue-200"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{therapistInfo.name}</h3>
                <p className="text-sm text-green-600">● En línea</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "patient" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-md px-4 py-3 rounded-2xl ${
                    message.sender === "patient"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-900 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm mb-1">{message.text}</p>
                  <p className={`text-xs ${message.sender === "patient" ? "text-blue-100" : "text-gray-500"}`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input area */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex gap-2">
              <button className="p-3 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>

              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Escribe un mensaje..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />

              <button
                onClick={handleSendMessage}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold transition-colors"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <button className="p-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center">
            <div className="text-2xl mb-1">📅</div>
            <p className="text-xs font-medium text-gray-700">Próxima Sesión</p>
          </button>
          <button className="p-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center">
            <div className="text-2xl mb-1">❓</div>
            <p className="text-xs font-medium text-gray-700">Hacer Pregunta</p>
          </button>
          <button className="p-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center">
            <div className="text-2xl mb-1">📋</div>
            <p className="text-xs font-medium text-gray-700">Ver Tareas</p>
          </button>
        </div>
      </div>
    </div>
  )
}
