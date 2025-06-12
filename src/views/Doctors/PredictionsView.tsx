"use client"

import { useState, useEffect } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ScatterChart,
  Scatter,
  LineChart,
  Line,
} from "recharts"

interface AutismScores {
  communication: number
  socialInteraction: number
  repetitiveBehaviors: number
  sensoryResponses: number
}

interface KNNResult {
  patientId: string
  predictedClass: string
  confidence: number
  nearestNeighbors: Array<{
    id: string
    distance: number
    class: string
  }>
}

interface ConfusionMatrix {
  truePositive: number
  falsePositive: number
  trueNegative: number
  falseNegative: number
}

const generateAutismPatientData = (numPatients: number) => {
  const patients: Array<{
    patientId: string
    patientName: string
    autismClassification: string
    riskLevel: string
    scores: AutismScores
    age: number
    gender: string
    registrationDate: Date
    lastEvaluation: Date
    knnPrediction?: KNNResult
  }> = []

  // const autismClassifications = [
  //   "Desarrollo Típico",
  //   "TEA Nivel 1 (Apoyo Leve)",
  //   "TEA Nivel 2 (Apoyo Sustancial)",
  //   "TEA Nivel 3 (Apoyo Muy Sustancial)",
  // ]

  const genders = ["m", "f"] as const

  const firstNames = ["Liam", "Noah", "Oliver", "Emma", "Ava", "Sophia", "Mateo", "Santiago", "Valentina", "Isabella"]
  const lastNames = [
    "García",
    "Rodríguez",
    "González",
    "Fernández",
    "López",
    "Martínez",
    "Sánchez",
    "Pérez",
    "Gómez",
    "Martín",
  ]

  for (let i = 0; i < numPatients; i++) {
    const gender = genders[Math.floor(Math.random() * genders.length)]
    const firstName = firstNames[gender === "m" ? Math.floor(Math.random() * 7) : Math.floor(Math.random() * 3) + 7]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]

    const age = Math.floor(Math.random() * 8) + 2

    // Distribución más realista de clasificaciones de autismo
    let autismClassification
    const randClass = Math.random()
    if (randClass < 0.4) {
      autismClassification = "Desarrollo Típico"
    } else if (randClass < 0.7) {
      autismClassification = "TEA Nivel 1 (Apoyo Leve)"
    } else if (randClass < 0.9) {
      autismClassification = "TEA Nivel 2 (Apoyo Sustancial)"
    } else {
      autismClassification = "TEA Nivel 3 (Apoyo Muy Sustancial)"
    }

    let riskLevel
    if (autismClassification === "Desarrollo Típico") {
      riskLevel = "Bajo"
    } else if (autismClassification === "TEA Nivel 1 (Apoyo Leve)") {
      riskLevel = "Moderado"
    } else {
      riskLevel = "Alto"
    }

    // Generar scores más realistas basados en la clasificación
    let scores: AutismScores = {
      communication: 0,
      socialInteraction: 0,
      repetitiveBehaviors: 0,
      sensoryResponses: 0,
    }

    if (autismClassification === "Desarrollo Típico") {
      scores = {
        communication: +(8 + Math.random() * 2).toFixed(1),
        socialInteraction: +(7.5 + Math.random() * 2).toFixed(1),
        repetitiveBehaviors: +(1 + Math.random() * 2).toFixed(1),
        sensoryResponses: +(2 + Math.random() * 2).toFixed(1),
      }
    } else if (autismClassification === "TEA Nivel 1 (Apoyo Leve)") {
      scores = {
        communication: +(5.5 + Math.random() * 2).toFixed(1),
        socialInteraction: +(4.5 + Math.random() * 2).toFixed(1),
        repetitiveBehaviors: +(4 + Math.random() * 2).toFixed(1),
        sensoryResponses: +(5 + Math.random() * 2).toFixed(1),
      }
    } else if (autismClassification === "TEA Nivel 2 (Apoyo Sustancial)") {
      scores = {
        communication: +(3.5 + Math.random() * 2).toFixed(1),
        socialInteraction: +(3 + Math.random() * 2).toFixed(1),
        repetitiveBehaviors: +(6 + Math.random() * 2).toFixed(1),
        sensoryResponses: +(6.5 + Math.random() * 2).toFixed(1),
      }
    } else {
      // TEA Nivel 3
      scores = {
        communication: +(1.5 + Math.random() * 2).toFixed(1),
        socialInteraction: +(1.5 + Math.random() * 2).toFixed(1),
        repetitiveBehaviors: +(7.5 + Math.random() * 2).toFixed(1),
        sensoryResponses: +(8 + Math.random() * 2).toFixed(1),
      }
    }

    // Simular predicción KNN
    const knnPrediction: KNNResult = {
      patientId: `P${(i + 1).toString().padStart(3, "0")}`,
      predictedClass: autismClassification,
      confidence: +(0.75 + Math.random() * 0.24).toFixed(3),
      nearestNeighbors: Array.from({ length: 5 }, (_, j) => ({
        id: `N${j + 1}`,
        distance: +(Math.random() * 2).toFixed(3),
        class: autismClassification,
      })),
    }

    patients.push({
      patientId: `P${(i + 1).toString().padStart(3, "0")}`,
      patientName: `${firstName} ${lastName}`,
      autismClassification,
      riskLevel,
      scores,
      age,
      gender,
      registrationDate: new Date(2020 + Math.floor(Math.random() * 4)),
      lastEvaluation: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28 + 1)),
      knnPrediction,
    })
  }

  return patients
}

export const PredictionsView = () => {
  const [patientData] = useState(() => generateAutismPatientData(500))
  const [loading, setLoading] = useState(true)
  const [kValue, setKValue] = useState(5)
  const [selectedModel, setSelectedModel] = useState("KNN")

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Generar matriz de confusión simulada
  const generateConfusionMatrix = (): ConfusionMatrix => {
    const total = patientData.length
    const accuracy = 0.89 // 89% de precisión simulada

    return {
      truePositive: Math.floor(total * 0.35 * accuracy),
      falsePositive: Math.floor(total * 0.35 * (1 - accuracy)),
      trueNegative: Math.floor(total * 0.4 * accuracy),
      falseNegative: Math.floor(total * 0.4 * (1 - accuracy)),
    }
  }

  const confusionMatrix = generateConfusionMatrix()

  // Procesar datos para visualizaciones
  const processClassificationDistribution = () => {
    const classCounts = patientData.reduce(
      (acc, patient) => {
        acc[patient.autismClassification] = (acc[patient.autismClassification] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return Object.entries(classCounts).map(([classification, count]) => ({
      clasificacion: classification.replace("TEA ", ""),
      cantidad: count,
      porcentaje: ((count / patientData.length) * 100).toFixed(1),
    }))
  }

  const processAverageScoresByClassification = () => {
    const classScores = patientData.reduce(
      (acc, patient) => {
        const classification = patient.autismClassification
        if (!acc[classification]) {
          acc[classification] = {
            communication: [],
            socialInteraction: [],
            repetitiveBehaviors: [],
            sensoryResponses: [],
          }
        }

        acc[classification].communication.push(patient.scores.communication)
        acc[classification].socialInteraction.push(patient.scores.socialInteraction)
        acc[classification].repetitiveBehaviors.push(patient.scores.repetitiveBehaviors)
        acc[classification].sensoryResponses.push(patient.scores.sensoryResponses)

        return acc
      },
      {} as Record<string, Record<string, number[]>>,
    )

    return Object.entries(classScores).map(([classification, scores]) => ({
      clasificacion: classification.replace("TEA ", "").replace("(Apoyo ", "(").replace(")", ")"),
      comunicación: (scores.communication.reduce((a, b) => a + b, 0) / scores.communication.length).toFixed(1),
      interacciónSocial: (
        scores.socialInteraction.reduce((a, b) => a + b, 0) / scores.socialInteraction.length
      ).toFixed(1),
      comportamientosRepetitivos: (
        scores.repetitiveBehaviors.reduce((a, b) => a + b, 0) / scores.repetitiveBehaviors.length
      ).toFixed(1),
      respuestasSensoriales: (
        scores.sensoryResponses.reduce((a, b) => a + b, 0) / scores.sensoryResponses.length
      ).toFixed(1),
    }))
  }

  // Datos para scatter plot KNN
  const knnScatterData = patientData.slice(0, 50).map((patient) => ({
    x: patient.scores.communication,
    y: patient.scores.socialInteraction,
    clasificacion: patient.autismClassification,
    confidence: patient.knnPrediction?.confidence || 0,
  }))

  // Métricas del modelo
  const modelMetrics = {
    accuracy: 0.892,
    precision: 0.876,
    recall: 0.903,
    f1Score: 0.889,
    kValue: kValue,
  }

  const pieColors = ["#10B981", "#F59E0B", "#EF4444", "#8B5CF6"]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-700 text-lg font-medium">Ejecutando algoritmo KNN...</p>
          <p className="text-blue-600 text-sm mt-2">Clasificando patrones de autismo con K={kValue}</p>
        </div>
      </div>
    )
  }

  const classificationDistribution = processClassificationDistribution()
  const scoresByClassification = processAverageScoresByClassification()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-blue-900 mb-3">Sistema KNN para Clasificación de TEA</h1>
          <p className="text-blue-700 text-lg">
            Algoritmo K-Nearest Neighbors para detección automática del Trastorno del Espectro Autista
          </p>
          <div className="mt-4 bg-blue-100 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <p className="text-blue-800 text-sm">
              <strong>Modelo Activo:</strong> {selectedModel} con K={kValue} |<strong> Precisión:</strong>{" "}
              {(modelMetrics.accuracy * 100).toFixed(1)}% |<strong> F1-Score:</strong>{" "}
              {(modelMetrics.f1Score * 100).toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Model Controls */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">Configuración del Modelo</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Algoritmo</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="KNN">K-Nearest Neighbors</option>
                <option value="SVM">Support Vector Machine</option>
                <option value="Random Forest">Random Forest</option>
              </select>
            </div>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Validación</label>
              <div className="text-sm text-gray-600">
                <div>Cross-validation: 5-fold</div>
                <div>Train/Test: 80/20</div>
              </div>
            </div>
          </div>
        </div>

        {/* Model Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Precisión (Accuracy)</p>
                <p className="text-2xl font-bold text-green-900">{(modelMetrics.accuracy * 100).toFixed(1)}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Precisión (Precision)</p>
                <p className="text-2xl font-bold text-blue-900">{(modelMetrics.precision * 100).toFixed(1)}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 mr-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Recall (Sensibilidad)</p>
                <p className="text-2xl font-bold text-purple-900">{(modelMetrics.recall * 100).toFixed(1)}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-100 mr-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">F1-Score</p>
                <p className="text-2xl font-bold text-orange-900">{(modelMetrics.f1Score * 100).toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Confusion Matrix */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">Matriz de Confusión</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div></div>
                <div className="font-semibold text-sm bg-gray-100 p-2 rounded">Predicho: TEA</div>
                <div className="font-semibold text-sm bg-gray-100 p-2 rounded">Predicho: No TEA</div>

                <div className="font-semibold text-sm bg-gray-100 p-2 rounded">Real: TEA</div>
                <div className="bg-green-100 border-2 border-green-500 p-4 rounded font-bold text-green-800">
                  {confusionMatrix.truePositive}
                  <div className="text-xs">Verdaderos Positivos</div>
                </div>
                <div className="bg-red-100 border-2 border-red-500 p-4 rounded font-bold text-red-800">
                  {confusionMatrix.falseNegative}
                  <div className="text-xs">Falsos Negativos</div>
                </div>

                <div className="font-semibold text-sm bg-gray-100 p-2 rounded">Real: No TEA</div>
                <div className="bg-red-100 border-2 border-red-500 p-4 rounded font-bold text-red-800">
                  {confusionMatrix.falsePositive}
                  <div className="text-xs">Falsos Positivos</div>
                </div>
                <div className="bg-green-100 border-2 border-green-500 p-4 rounded font-bold text-green-800">
                  {confusionMatrix.trueNegative}
                  <div className="text-xs">Verdaderos Negativos</div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Interpretación de Resultados:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Sensibilidad (Recall):</span>
                  <span className="font-medium">
                    {(
                      (confusionMatrix.truePositive / (confusionMatrix.truePositive + confusionMatrix.falseNegative)) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Especificidad:</span>
                  <span className="font-medium">
                    {(
                      (confusionMatrix.trueNegative / (confusionMatrix.trueNegative + confusionMatrix.falsePositive)) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Valor Predictivo Positivo:</span>
                  <span className="font-medium">
                    {(
                      (confusionMatrix.truePositive / (confusionMatrix.truePositive + confusionMatrix.falsePositive)) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Valor Predictivo Negativo:</span>
                  <span className="font-medium">
                    {(
                      (confusionMatrix.trueNegative / (confusionMatrix.trueNegative + confusionMatrix.falseNegative)) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KNN Visualization */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">Visualización KNN - Espacio de Características</h3>
          <p className="text-gray-600 text-sm mb-4">
            Distribución de pacientes en el espacio bidimensional (Comunicación vs Interacción Social)
          </p>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart data={knnScatterData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="x" name="Comunicación" stroke="#374151" />
              <YAxis dataKey="y" name="Interacción Social" stroke="#374151" />
              <Tooltip
                formatter={(value, name) => [value, name]}
                labelFormatter={(label) => `Punto: ${label}`}
                contentStyle={{
                  backgroundColor: "#F8FAFC",
                  border: "1px solid #3B82F6",
                  borderRadius: "8px",
                }}
              />
              <Scatter
                name="Desarrollo Típico"
                data={knnScatterData.filter((d) => d.clasificacion === "Desarrollo Típico")}
                fill="#10B981"
              />
              <Scatter
                name="TEA Nivel 1"
                data={knnScatterData.filter((d) => d.clasificacion === "TEA Nivel 1 (Apoyo Leve)")}
                fill="#F59E0B"
              />
              <Scatter
                name="TEA Nivel 2"
                data={knnScatterData.filter((d) => d.clasificacion === "TEA Nivel 2 (Apoyo Sustancial)")}
                fill="#EF4444"
              />
              <Scatter
                name="TEA Nivel 3"
                data={knnScatterData.filter((d) => d.clasificacion === "TEA Nivel 3 (Apoyo Muy Sustancial)")}
                fill="#8B5CF6"
              />
              <Legend />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Classification Distribution */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Distribución de Clasificaciones TEA</h3>
            <p className="text-gray-600 text-sm mb-4">Resultados de la clasificación automática por niveles de apoyo</p>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={classificationDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ clasificacion, porcentaje }) => `${clasificacion}: ${porcentaje}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="cantidad"
                >
                  {classificationDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} className={`s ${entry}`}/>
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} casos`, "Cantidad"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Model Performance Over Time */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Rendimiento del Modelo KNN</h3>
            <p className="text-gray-600 text-sm mb-4">Evolución de la precisión con diferentes valores de K</p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={[
                  { k: 3, precision: 0.85, recall: 0.88 },
                  { k: 5, precision: 0.89, recall: 0.9 },
                  { k: 7, precision: 0.87, recall: 0.89 },
                  { k: 9, precision: 0.84, recall: 0.87 },
                  { k: 11, precision: 0.82, recall: 0.85 },
                  { k: 13, precision: 0.8, recall: 0.83 },
                  { k: 15, precision: 0.78, recall: 0.81 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="k" stroke="#374151" />
                <YAxis stroke="#374151" domain={[0.7, 1]} />
                <Tooltip
                  formatter={(value : number, name) => [`${(value * 100).toFixed(1)}%`, name]}
                  contentStyle={{
                    backgroundColor: "#F8FAFC",
                    border: "1px solid #3B82F6",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="precision" stroke="#3B82F6" strokeWidth={3} name="Precisión" />
                <Line type="monotone" dataKey="recall" stroke="#10B981" strokeWidth={3} name="Recall" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Scores by Classification */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-blue-900 mb-2">Perfiles de Puntuación por Clasificación TEA</h3>
          <p className="text-gray-600 text-sm mb-4">
            Características promedio de cada clasificación identificada por el algoritmo KNN
          </p>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={scoresByClassification} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="clasificacion" stroke="#374151" />
              <YAxis stroke="#374151" domain={[0, 10]} />
              <Tooltip
                formatter={(value, name) => [`${value}/10`, name]}
                contentStyle={{
                  backgroundColor: "#F8FAFC",
                  border: "1px solid #3B82F6",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="comunicación" fill="#10B981" radius={[2, 2, 0, 0]} />
              <Bar dataKey="interacciónSocial" fill="#3B82F6" radius={[2, 2, 0, 0]} />
              <Bar dataKey="comportamientosRepetitivos" fill="#F59E0B" radius={[2, 2, 0, 0]} />
              <Bar dataKey="respuestasSensoriales" fill="#EF4444" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart for Profile Comparison */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-blue-900 mb-2">Perfiles Multidimensionales por Clasificación</h3>
          <p className="text-gray-600 text-sm mb-4">
            Análisis radar de las características distintivas de cada nivel del espectro autista
          </p>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={scoresByClassification}>
              <PolarGrid stroke="#E5E7EB" />
              <PolarAngleAxis dataKey="clasificacion" tick={{ fill: "#374151", fontSize: 12 }} />
              <PolarRadiusAxis tick={{ fill: "#374151", fontSize: 10 }} domain={[0, 10]} tickCount={6} />
              <Radar
                name="Comunicación"
                dataKey="comunicación"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Radar
                name="Interacción Social"
                dataKey="interacciónSocial"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Radar
                name="Comportamientos Repetitivos"
                dataKey="comportamientosRepetitivos"
                stroke="#F59E0B"
                fill="#F59E0B"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Radar
                name="Respuestas Sensoriales"
                dataKey="respuestasSensoriales"
                stroke="#EF4444"
                fill="#EF4444"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Legend />
              <Tooltip
                formatter={(value, name) => [`${value}/10`, name]}
                contentStyle={{
                  backgroundColor: "#F8FAFC",
                  border: "1px solid #3B82F6",
                  borderRadius: "8px",
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Information Panel */}
        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg p-6 mt-8">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">Interpretación de Resultados del Modelo KNN</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Clasificaciones TEA:</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>
                  • <strong>Desarrollo Típico:</strong> Sin indicadores significativos de TEA
                </li>
                <li>
                  • <strong>TEA Nivel 1:</strong> Requiere apoyo leve, dificultades sociales menores
                </li>
                <li>
                  • <strong>TEA Nivel 2:</strong> Requiere apoyo sustancial, limitaciones notables
                </li>
                <li>
                  • <strong>TEA Nivel 3:</strong> Requiere apoyo muy sustancial, limitaciones severas
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Algoritmo KNN:</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>
                  • <strong>K={kValue}:</strong> Número de vecinos más cercanos considerados
                </li>
                <li>
                  • <strong>Distancia:</strong> Euclidiana en espacio multidimensional
                </li>
                <li>
                  • <strong>Validación:</strong> Cross-validation 5-fold
                </li>
                <li>
                  • <strong>Características:</strong> 4 dimensiones principales evaluadas
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
