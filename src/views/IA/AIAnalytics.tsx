"use client"

import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../store"
import { initialAIModelsData, initialClusterAnalysisData } from "../../utils/data/other"
import { setClusterAnalyses, setModels, updateSystemPerformance } from "../../store/slices/iaSystemSlice"

export default function AIAnalytics() {
  const dispatch = useDispatch()
  const { models, clusterAnalyses, systemPerformance } = useSelector((state: RootState) => state.aiSystem)
  const { activities } = useSelector((state: RootState) => state.activities)

//   const [selectedAnalysis, setSelectedAnalysis] = useState<string>("")
  const [isRunningAnalysis, setIsRunningAnalysis] = useState(false)

  useEffect(() => {
    // Cargar datos desde localStorage
    const savedModels = localStorage.getItem("aiModels")
    const savedClusters = localStorage.getItem("clusterAnalyses")

    if (savedModels) {
      dispatch(setModels(JSON.parse(savedModels)))
    } else {
      dispatch(setModels(initialAIModelsData))
      localStorage.setItem("aiModels", JSON.stringify(initialAIModelsData))
    }

    if (savedClusters) {
      dispatch(setClusterAnalyses(JSON.parse(savedClusters)))
    } else {
      dispatch(setClusterAnalyses(initialClusterAnalysisData))
      localStorage.setItem("clusterAnalyses", JSON.stringify(initialClusterAnalysisData))
    }

    // Simular métricas del sistema
    dispatch(
      updateSystemPerformance({
        accuracy: 89.5,
        responseTime: 245,
        uptime: 99.8,
        lastUpdate: new Date().toISOString(),
      }),
    )
  }, [dispatch])

  const runClusterAnalysis = async () => {
    setIsRunningAnalysis(true)

    // Simular análisis de clustering
    setTimeout(() => {
      const newAnalysis = {
        id: `cluster-${Date.now()}`,
        name: "Análisis de Patrones de Respuesta",
        clusters: [
          {
            id: "c1",
            name: "Respuesta Rápida",
            characteristics: ["Alta motivación", "Comunicación verbal", "Edad 4-6 años"],
            patientCount: Math.floor(Math.random() * 15) + 5,
            avgProgress: Math.floor(Math.random() * 30) + 70,
          },
          {
            id: "c2",
            name: "Progreso Gradual",
            characteristics: ["Necesidades sensoriales", "Comunicación mixta", "Edad 5-8 años"],
            patientCount: Math.floor(Math.random() * 12) + 3,
            avgProgress: Math.floor(Math.random() * 25) + 50,
          },
          {
            id: "c3",
            name: "Apoyo Intensivo",
            characteristics: ["Desafíos múltiples", "Comunicación no verbal", "Edad 3-7 años"],
            patientCount: Math.floor(Math.random() * 8) + 2,
            avgProgress: Math.floor(Math.random() * 20) + 30,
          },
        ],
        createdAt: new Date().toISOString(),
      }

      const updatedAnalyses = [...clusterAnalyses, newAnalysis]
      dispatch(setClusterAnalyses(updatedAnalyses))
      localStorage.setItem("clusterAnalyses", JSON.stringify(updatedAnalyses))
      setIsRunningAnalysis(false)
    }, 3000)
  }

  const getModelStatusColor = (status: string) => {
    const colors = {
      ready: "bg-green-100 text-green-800",
      training: "bg-yellow-100 text-yellow-800",
      error: "bg-red-100 text-red-800",
    }
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Análisis de Datos con IA</h1>

        {/* Métricas del sistema */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Precisión Promedio</p>
                <p className="text-2xl font-semibold text-gray-900">{systemPerformance.accuracy}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tiempo de Respuesta</p>
                <p className="text-2xl font-semibold text-gray-900">{systemPerformance.responseTime}ms</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tiempo Activo</p>
                <p className="text-2xl font-semibold text-gray-900">{systemPerformance.uptime}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Modelos Activos</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {models.filter((m) => m.status === "ready").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modelos de IA */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Modelos de IA</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {models.map((model) => (
                <div key={model.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-900">{model.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getModelStatusColor(model.status)}`}>
                      {model.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{model.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tipo:</span>
                      <span className="font-medium">{model.type}</span>
                    </div>
                    {model.status === "ready" && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Precisión:</span>
                        <span className="font-medium">{model.accuracy}%</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Último entrenamiento:</span>
                      <span className="font-medium">{new Date(model.lastTrained).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Análisis de Clusters */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Análisis de Clusters</h2>
            <button
              onClick={runClusterAnalysis}
              disabled={isRunningAnalysis}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isRunningAnalysis ? "Analizando..." : "Ejecutar Nuevo Análisis"}
            </button>
          </div>
          <div className="p-6">
            {isRunningAnalysis && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-600">Ejecutando análisis de clustering...</p>
              </div>
            )}

            <div className="space-y-6">
              {clusterAnalyses.map((analysis) => (
                <div key={analysis.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{analysis.name}</h3>
                      <p className="text-sm text-gray-600">
                        Creado: {new Date(analysis.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {analysis.clusters.map((cluster) => (
                      <div key={cluster.id} className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{cluster.name}</h4>
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="text-gray-600">Pacientes:</span>
                            <span className="ml-2 font-medium">{cluster.patientCount}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-600">Progreso promedio:</span>
                            <span className="ml-2 font-medium">{cluster.avgProgress}%</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-600 block mb-1">Características:</span>
                            <ul className="list-disc list-inside text-xs space-y-1">
                              {cluster.characteristics.map((char, index) => (
                                <li key={index} className="text-gray-600">
                                  {char}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Visualización de datos */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Visualización de Patrones</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Distribución por categorías */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Distribución de Actividades por Categoría</h3>
                <div className="space-y-3">
                  {["comunicacion", "sensorial", "social", "cognitiva", "motora"].map((category) => {
                    const count = activities.filter((a) => a.category === category).length
                    const percentage = activities.length > 0 ? (count / activities.length) * 100 : 0
                    return (
                      <div key={category} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 capitalize">{category}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                          </div>
                          <span className="text-sm font-medium w-12 text-right">{count}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Progreso por dificultad */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Tasa de Completación por Dificultad</h3>
                <div className="space-y-3">
                  {["basico", "intermedio", "avanzado"].map((difficulty) => {
                    const total = activities.filter((a) => a.difficulty === difficulty).length
                    const completed = activities.filter(
                      (a) => a.difficulty === difficulty && a.progress?.completed,
                    ).length
                    const percentage = total > 0 ? (completed / total) * 100 : 0
                    return (
                      <div key={difficulty} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 capitalize">{difficulty}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                          </div>
                          <span className="text-sm font-medium w-16 text-right">{percentage.toFixed(1)}%</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
