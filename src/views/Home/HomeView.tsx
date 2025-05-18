"use client"

import { useState } from "react"
import { Camera, MapPin, Phone, Info } from "lucide-react"
import { InitView } from "./InitView"
import { AboutView } from "./AboutView"
import { FindUsView } from "./FindUsView"
import { ContactView } from "./ContactView"
import { DiagnosticView } from "./DiagnosticView"

export const HomeView = () => 
{
  const [activeTab, setActiveTab] = useState("inicio")


  return (
    
    <>
      {/* Main navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto">
          <div className="w-full">
            <div className="flex overflow-x-auto border-b">
              {[
                { id: "inicio", label: "Inicio", icon: null },
                { id: "quienes-somos", label: "Quiénes Somos", icon: <Info className="mr-1 h-4 w-4" /> },
                { id: "encuentranos", label: "Encuéntranos", icon: <MapPin className="mr-1 h-4 w-4" /> },
                { id: "contactanos", label: "Contáctanos", icon: <Phone className="mr-1 h-4 w-4" /> },
                { id: "diagnostico", label: "Diagnóstico Previo", icon: <Camera className="mr-1 h-4 w-4" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 flex items-center whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-b-2 border-blue-500 font-medium"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab contents */}
            <div className="container mx-auto py-8">
              {activeTab === "inicio" && ( <InitView />)}

              {activeTab === "quienes-somos" && ( <AboutView /> )}

              {activeTab === "encuentranos" && ( <FindUsView /> )}

              {activeTab === "contactanos" && ( <ContactView /> )}

              {activeTab === "diagnostico" && ( <DiagnosticView /> )}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
