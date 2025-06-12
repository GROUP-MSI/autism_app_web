"use client"

import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../store"
import { setClusterAnalyses, setModels, updateSystemPerformance, type AIModel } from "../../store/slices/iaSystemSlice"

export default function AIAnalytics() {
  const dispatch = useDispatch()
  const { models, clusterAnalyses, systemPerformance } = useSelector((state: RootState) => state.aiSystem)
  // const { activities } = useSelector((state: RootState) => state.activities)

  const [isRunningAnalysis, setIsRunningAnalysis] = useState(false)
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("KNN")
  const [kValue, setKValue] = useState(5)
  const [svmKernel, setSvmKernel] = useState("rbf")

  useEffect(() => {
    // Cargar datos desde localStorage
    const savedModels = localStorage.getItem("aiModels")
    const savedClusters = localStorage.getItem("clusterAnalyses")

    if (savedModels) {
      dispatch(setModels(JSON.parse(savedModels)))
    } else {
      // Modelos específicos para detección de autismo
      const autismModels :AIModel[] = [
        {
          id: "knn-autism",
          name: "KNN Clasificador TEA",
          description: "Algoritmo K-Nearest Neighbors para clasificación de niveles del espectro autista",
          type: "Aprendizaje Supervisado",
          status: "ready",
          accuracy: 89.2,
          lastTrained: new Date().toISOString(),
          parameters: { k: 5, distance: "euclidean" },
        },
        {
          id: "svm-autism",
          name: "SVM Detector TEA",
          description: "Support Vector Machine para detección binaria de TEA",
          type: "Aprendizaje Supervisado",
          status: "ready",
          accuracy: 91.7,
          lastTrained: new Date().toISOString(),
          parameters: { kernel: "rbf", C: 1.0, gamma: "scale" },
        },
        {
          id: "rf-autism",
          name: "Random Forest TEA",
          description: "Ensemble de árboles para predicción multiclase de niveles TEA",
          type: "Ensemble Learning",
          status: "training",
          accuracy: 87.5,
          lastTrained: new Date().toISOString(),
          parameters: { n_estimators: 100, max_depth: 10 },
        },
        {
          id: "nn-autism",
          name: "Red Neuronal TEA",
          description: "Red neuronal profunda para análisis de patrones complejos en TEA",
          type: "Deep Learning",
          status: "ready",
          accuracy: 93.1,
          lastTrained: new Date().toISOString(),
          parameters: { layers: [64, 32, 16], activation: "relu" },
        },
        {
          id: "logreg-autism",
          name: "Regresión Logística TEA",
          description: "Modelo de regresión logística para clasificación binaria de TEA",
          type: "Aprendizaje Supervisado",
          status: "ready",
          accuracy: 85.4,
          lastTrained: new Date().toISOString(),
          parameters: { penalty: "l2", C: 1.0, solver: "lbfgs" },
        },
        {
          id: "nb-autism",
          name: "Naive Bayes TEA",
          description: "Clasificador probabilístico basado en el teorema de Bayes para detección de TEA",
          type: "Aprendizaje Supervisado",
          status: "ready",
          accuracy: 82.3,
          lastTrained: new Date().toISOString(),
          parameters: { var_smoothing: 1e-9 },
        },
        {
          id: "xgb-autism",
          name: "XGBoost TEA",
          description: "Modelo de boosting para clasificación precisa de TEA",
          type: "Ensemble Learning",
          status: "ready",
          accuracy: 92.5,
          lastTrained: new Date().toISOString(),
          parameters: { n_estimators: 150, max_depth: 6, learning_rate: 0.1 },
        },
        {
          id: "cnn-autism",
          name: "CNN para TEA",
          description: "Red neuronal convolucional para análisis de imágenes relacionadas con TEA",
          type: "Deep Learning",
          status: "training",
          accuracy: 90.8,
          lastTrained: new Date().toISOString(),
          parameters: { layers: [32, 64, 128], activation: "relu", kernel_size: 3 },
        },
        {
          id: "lstm-autism",
          name: "LSTM TEA",
          description: "Red neuronal recurrente LSTM para secuencias temporales en detección de TEA",
          type: "Deep Learning",
          status: "ready",
          accuracy: 89.9,
          lastTrained: new Date().toISOString(),
          parameters: { layers: [50, 50], activation: "tanh", dropout: 0.2 },
        },
      ]
      dispatch(setModels(autismModels))
      localStorage.setItem("aiModels", JSON.stringify(autismModels))
    }

    if (savedClusters) {
      dispatch(setClusterAnalyses(JSON.parse(savedClusters)))
    } else {
      // Análisis de clusters específicos para TEA
      const autismClusters = [
        {
          id: "cluster-tea-2024",
          name: "Análisis de Subtipos TEA",
          clusters: [
            {
              id: "c1",
              name: "TEA con Fortalezas Cognitivas",
              characteristics: [
                "CI normal/alto",
                "Hiperlexia",
                "Intereses específicos intensos",
                "Dificultades sociales leves",
              ],
              patientCount: 45,
              avgProgress: 78,
            },
            {
              id: "c2",
              name: "TEA con Desafíos Sensoriales",
              characteristics: [
                "Hipersensibilidad sensorial",
                "Comportamientos autorregulatorios",
                "Comunicación limitada",
                "Rutinas rígidas",
              ],
              patientCount: 67,
              avgProgress: 52,
            },
            {
              id: "c3",
              name: "TEA con Comorbilidades",
              characteristics: [
                "TDAH comórbido",
                "Ansiedad elevada",
                "Desregulación emocional",
                "Necesidades de apoyo múltiples",
              ],
              patientCount: 38,
              avgProgress: 41,
            },
            {
              id: "c4",
              name: "TEA de Alto Funcionamiento",
              characteristics: [
                "Comunicación verbal fluida",
                "Adaptación social emergente",
                "Autoconciencia desarrollada",
                "Motivación intrínseca",
              ],
              patientCount: 52,
              avgProgress: 85,
            },
          ],
          createdAt: new Date().toISOString(),
        },
      ]
      dispatch(setClusterAnalyses(autismClusters))
      localStorage.setItem("clusterAnalyses", JSON.stringify(autismClusters))
    }

    // Simular métricas del sistema mejoradas
    dispatch(
      updateSystemPerformance({
        accuracy: 91.3,
        responseTime: 187,
        uptime: 99.9,
        lastUpdate: new Date().toISOString(),
      }),
    )
  }, [dispatch])

  const runAdvancedAnalysis = async () => {
    setIsRunningAnalysis(true)

    // Simular análisis avanzado con diferentes algoritmos
    setTimeout(() => {
      const analysisType =
        selectedAlgorithm === "KNN"
          ? "K-Nearest Neighbors"
          : selectedAlgorithm === "SVM"
            ? "Support Vector Machine"
            : "Clustering Avanzado"

      const newAnalysis = {
        id: `analysis-${Date.now()}`,
        name: `${analysisType} - Detección TEA`,
        algorithm: selectedAlgorithm,
        parameters: selectedAlgorithm === "KNN" ? { k: kValue } : { kernel: svmKernel },
        clusters: [
          {
            id: "c1",
            name: "Comunicación Verbal Emergente",
            characteristics: [
              "Desarrollo del lenguaje en progreso",
              "Ecolalia funcional",
              "Gestos comunicativos",
              "Edad 3-5 años",
            ],
            patientCount: Math.floor(Math.random() * 20) + 15,
            avgProgress: Math.floor(Math.random() * 25) + 65,
            confidence: 0.87,
          },
          {
            id: "c2",
            name: "Perfil Sensorial Complejo",
            characteristics: [
              "Hiposensibilidad táctil",
              "Hipersensibilidad auditiva",
              "Búsqueda de estímulos vestibulares",
              "Edad 4-7 años",
            ],
            patientCount: Math.floor(Math.random() * 18) + 12,
            avgProgress: Math.floor(Math.random() * 20) + 45,
            confidence: 0.92,
          },
          {
            id: "c3",
            name: "Habilidades Sociales Adaptativas",
            characteristics: [
              "Imitación social emergente",
              "Juego paralelo desarrollado",
              "Reconocimiento emocional básico",
              "Edad 5-8 años",
            ],
            patientCount: Math.floor(Math.random() * 15) + 8,
            avgProgress: Math.floor(Math.random() * 30) + 55,
            confidence: 0.79,
          },
          {
            id: "c4",
            name: "Autorregulación y Flexibilidad",
            characteristics: [
              "Estrategias de calma autodirigidas",
              "Transiciones con apoyo mínimo",
              "Tolerancia a cambios menores",
              "Edad 6-9 años",
            ],
            patientCount: Math.floor(Math.random() * 12) + 6,
            avgProgress: Math.floor(Math.random() * 25) + 70,
            confidence: 0.84,
          },
        ],
        metrics: {
          silhouetteScore: 0.73,
          inertia: 1247.8,
          accuracy: selectedAlgorithm === "SVM" ? 0.917 : 0.892,
          precision: 0.885,
          recall: 0.903,
          f1Score: 0.894,
        },
        createdAt: new Date().toISOString(),
      }

      const updatedAnalyses = [...clusterAnalyses, newAnalysis]
      dispatch(setClusterAnalyses(updatedAnalyses))
      localStorage.setItem("clusterAnalyses", JSON.stringify(updatedAnalyses))
      setIsRunningAnalysis(false)
    }, 4000)
  }

  const getModelStatusColor = (status: string) => {
    const colors = {
      ready: "bg-green-100 text-green-800",
      training: "bg-yellow-100 text-yellow-800",
      error: "bg-red-100 text-red-800",
    }
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getAlgorithmIcon = (type: string) => {
    switch (type) {
      case "Aprendizaje Supervisado":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        )
      case "Deep Learning":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            />
          </svg>
        )
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sistema de IA para Detección de TEA</h1>
        <p className="text-gray-600 mb-8">
          Análisis avanzado con algoritmos de aprendizaje automático especializados en Trastorno del Espectro Autista
        </p>

        {/* Algorithm Selection */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Configuración de Algoritmos</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Algoritmo Principal</label>
                <select
                  value={selectedAlgorithm}
                  onChange={(e) => setSelectedAlgorithm(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="KNN">K-Nearest Neighbors</option>
                  <option value="SVM">Support Vector Machine</option>
                  <option value="RandomForest">Random Forest</option>
                  <option value="NeuralNetwork">Red Neuronal</option>
                </select>
              </div>

              {selectedAlgorithm === "KNN" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Valor K (vecinos)</label>
                  <input
                    type="range"
                    min="3"
                    max="15"
                    value={kValue}
                    onChange={(e) => setKValue(Number.parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-center text-sm text-gray-600 mt-1">K = {kValue}</div>
                </div>
              )}

              {selectedAlgorithm === "SVM" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kernel SVM</label>
                  <select
                    value={svmKernel}
                    onChange={(e) => setSvmKernel(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="rbf">RBF (Radial Basis Function)</option>
                    <option value="linear">Linear</option>
                    <option value="poly">Polynomial</option>
                    <option value="sigmoid">Sigmoid</option>
                  </select>
                </div>
              )}

              <div className="flex items-end">
                <button
                  onClick={runAdvancedAnalysis}
                  disabled={isRunningAnalysis}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isRunningAnalysis ? "Ejecutando Análisis..." : "Ejecutar Análisis Avanzado"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Métricas del sistema mejoradas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Precisión Global</p>
                <p className="text-2xl font-semibold text-gray-900">{systemPerformance.accuracy}%</p>
                <p className="text-xs text-green-600">+2.1% vs mes anterior</p>
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
                <p className="text-sm font-medium text-gray-600">Tiempo Inferencia</p>
                <p className="text-2xl font-semibold text-gray-900">{systemPerformance.responseTime}ms</p>
                <p className="text-xs text-green-600">-58ms optimización</p>
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
                <p className="text-sm font-medium text-gray-600">Disponibilidad</p>
                <p className="text-2xl font-semibold text-gray-900">{systemPerformance.uptime}%</p>
                <p className="text-xs text-blue-600">SLA cumplido</p>
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
                <p className="text-sm font-medium text-gray-600">Casos Procesados</p>
                <p className="text-2xl font-semibold text-gray-900">2,847</p>
                <p className="text-xs text-green-600">+156 esta semana</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modelos de IA especializados */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Modelos Especializados en TEA</h2>
            <p className="text-sm text-gray-600 mt-1">
              Algoritmos entrenados específicamente para detección y clasificación del espectro autista
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {models.map((model) => (
                <div key={model.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="p-2 rounded-lg bg-blue-100 text-blue-600 mr-3">
                        {getAlgorithmIcon(model.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{model.name}</h3>
                        <p className="text-sm text-gray-500">{model.type}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-xs rounded-full font-medium ${getModelStatusColor(model.status)}`}>
                      {model.status === "ready" ? "Activo" : model.status === "training" ? "Entrenando" : "Error"}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{model.description}</p>

                  <div className="space-y-3">
                    {model.status === "ready" && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Precisión:</span>
                        <div className="flex items-center">
                          <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${model.accuracy}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{model.accuracy}%</span>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Última actualización:</span>
                      <span className="font-medium">{new Date(model.lastTrained).toLocaleDateString()}</span>
                    </div>

                    {model.parameters && (
                      <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                        <strong>Parámetros:</strong> {JSON.stringify(model.parameters)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Análisis de Clusters Avanzado */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Análisis de Subgrupos TEA</h2>
              <p className="text-sm text-gray-600 mt-1">
                Identificación automática de perfiles específicos dentro del espectro autista
              </p>
            </div>
          </div>
          <div className="p-6">
            {isRunningAnalysis && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-lg text-gray-700 font-medium">Ejecutando análisis {selectedAlgorithm}...</p>
                <p className="text-sm text-gray-500 mt-2">
                  {selectedAlgorithm === "KNN"
                    ? `Calculando distancias con K=${kValue}`
                    : selectedAlgorithm === "SVM"
                      ? `Optimizando hiperplano con kernel ${svmKernel}`
                      : "Procesando características multidimensionales"}
                </p>
              </div>
            )}

            <div className="space-y-8">
              {clusterAnalyses.map((analysis) => (
                <div key={analysis.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{analysis.name}</h3>
                      <div className="flex items-center space-x-4 mt-2">
                        <p className="text-sm text-gray-600">
                          Creado: {new Date(analysis.createdAt).toLocaleDateString()}
                        </p>
                        {analysis.algorithm && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {analysis.algorithm}
                          </span>
                        )}
                        {analysis.metrics && (
                          <span className="text-sm text-green-600 font-medium">
                            Precisión: {(analysis.metrics.accuracy ?? 0* 100).toFixed(1)}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {analysis.metrics && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Silhouette Score</p>
                        <p className="text-lg font-semibold text-gray-900">{analysis.metrics.silhouetteScore}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Precisión</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {(analysis.metrics.precision ?? 0 * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Recall</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {(analysis.metrics.recall ?? 0 * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">F1-Score</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {(analysis.metrics.f1Score ?? 0 * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {analysis.clusters.map((cluster) => (
                      <div
                        key={cluster.id}
                        className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-5 border border-blue-200"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-semibold text-gray-900 text-sm">{cluster.name}</h4>
                          {cluster.confidence && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              {(cluster.confidence * 100).toFixed(0)}%
                            </span>
                          )}
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600">Casos:</span>
                            <span className="text-sm font-medium text-blue-900">{cluster.patientCount}</span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600">Progreso:</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                <div
                                  className="bg-blue-600 h-1.5 rounded-full"
                                  style={{ width: `${cluster.avgProgress}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium text-blue-900">{cluster.avgProgress}%</span>
                            </div>
                          </div>

                          <div>
                            <span className="text-xs text-gray-600 block mb-2">Características principales:</span>
                            <ul className="space-y-1">
                              {cluster.characteristics.slice(0, 3).map((char, index) => (
                                <li key={index} className="text-xs text-gray-700 flex items-start">
                                  <span className="w-1 h-1 bg-blue-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                  {char}
                                </li>
                              ))}
                              {cluster.characteristics.length > 3 && (
                                <li className="text-xs text-blue-600 font-medium">
                                  +{cluster.characteristics.length - 3} más...
                                </li>
                              )}
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

        {/* Visualización de rendimiento por categorías */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Análisis de Rendimiento por Dominio</h2>
            <p className="text-sm text-gray-600 mt-1">Efectividad de los modelos en diferentes áreas del desarrollo</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Distribución por categorías TEA */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Precisión por Dominio TEA</h3>
                <div className="space-y-4">
                  {[
                    { domain: "Comunicación Social", accuracy: 0.923, cases: 1247 },
                    { domain: "Comportamientos Repetitivos", accuracy: 0.887, cases: 1156 },
                    { domain: "Procesamiento Sensorial", accuracy: 0.901, cases: 1089 },
                    { domain: "Flexibilidad Cognitiva", accuracy: 0.876, cases: 967 },
                    { domain: "Regulación Emocional", accuracy: 0.854, cases: 892 },
                  ].map((item) => (
                    <div key={item.domain} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="text-sm font-medium text-gray-700">{item.domain}</span>
                        <p className="text-xs text-gray-500">{item.cases} casos evaluados</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                            style={{ width: `${item.accuracy * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-gray-900 w-12 text-right">
                          {(item.accuracy * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comparación de algoritmos */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Comparación de Algoritmos</h3>
                <div className="space-y-4">
                  {[
                    { algorithm: "Red Neuronal Profunda", accuracy: 0.931, speed: "Lenta", complexity: "Alta" },
                    { algorithm: "Support Vector Machine", accuracy: 0.917, speed: "Rápida", complexity: "Media" },
                    { algorithm: "K-Nearest Neighbors", accuracy: 0.892, speed: "Media", complexity: "Baja" },
                    { algorithm: "Random Forest", accuracy: 0.875, speed: "Rápida", complexity: "Media" },
                    { algorithm: "Regresión Logística", accuracy: 0.834, speed: "Muy Rápida", complexity: "Baja" },
                  ].map((item) => (
                    <div key={item.algorithm} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900 text-sm">{item.algorithm}</h4>
                        <span className="text-lg font-bold text-blue-600">{(item.accuracy * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>
                          Velocidad: <span className="font-medium">{item.speed}</span>
                        </span>
                        <span>
                          Complejidad: <span className="font-medium">{item.complexity}</span>
                        </span>
                      </div>
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${item.accuracy * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
