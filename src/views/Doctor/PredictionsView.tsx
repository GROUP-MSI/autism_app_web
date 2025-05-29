"use client"

import { useState, useEffect } from "react"
import axios from "axios"
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
} from "recharts"
import { getEnvVariables } from "../../utils"

// Types
interface ClusterData {
  patientId: string
  cluster: number
  scores: {
    communication: number
    socialInteraction: number
    repetitiveBehaviors: number
    sensoryResponses: number
  }
}

interface StatisticsData {
  totalPatients: number
  averageAge: number
  patientsByGender: Array<{
    gender: string
    count: number
  }>
  severityDistribution: Array<{
    severity: string
    count: number
  }>
}

interface ApiResponse {
  clusters: ClusterData[]
}

export const PredictionsView = () => {
  const [clusterData, setClusterData] = useState<ClusterData[]>([])
  const [statisticsData, setStatisticsData] = useState<StatisticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { VITE_HOST_BACKEND } = getEnvVariables()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch both APIs simultaneously
        const [clusterResponse, statisticsResponse] = await Promise.all([
          axios.get<ApiResponse>(`${VITE_HOST_BACKEND}/Analysis/advanced-cluster?k=3&maxIterations=100`),
          axios.get<StatisticsData>(`${VITE_HOST_BACKEND}/Analysis/advanced-statistics`),
        ])

        setClusterData(clusterResponse.data.clusters)
        setStatisticsData(statisticsResponse.data)
      } catch (err) {
        setError("Error al cargar los datos. Verifique la conexión con el servidor.")
        console.error("Error fetching data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [VITE_HOST_BACKEND])

  // Process data for visualizations
  const processClusterDistribution = () => {
    const clusterCounts = clusterData.reduce(
      (acc, patient) => {
        acc[patient.cluster] = (acc[patient.cluster] || 0) + 1
        return acc
      },
      {} as Record<number, number>,
    )

    return Object.entries(clusterCounts).map(([cluster, count]) => ({
      cluster: `Cluster ${cluster}`,
      count,
      percentage: ((count / clusterData.length) * 100).toFixed(1),
    }))
  }

  const processScoresByCluster = () => {
    const clusterScores = clusterData.reduce(
      (acc, patient) => {
        if (!acc[patient.cluster]) {
          acc[patient.cluster] = {
            communication: [],
            socialInteraction: [],
            repetitiveBehaviors: [],
            sensoryResponses: [],
          }
        }

        acc[patient.cluster].communication.push(patient.scores.communication)
        acc[patient.cluster].socialInteraction.push(patient.scores.socialInteraction)
        acc[patient.cluster].repetitiveBehaviors.push(patient.scores.repetitiveBehaviors)
        acc[patient.cluster].sensoryResponses.push(patient.scores.sensoryResponses)

        return acc
      },
      {} as Record<number, Record<string, number[]>>,
    )

    return Object.entries(clusterScores).map(([cluster, scores]) => ({
      cluster: `Cluster ${cluster}`,
      comunicación: (scores.communication.reduce((a, b) => a + b, 0) / scores.communication.length).toFixed(2),
      interacciónSocial: (
        scores.socialInteraction.reduce((a, b) => a + b, 0) / scores.socialInteraction.length
      ).toFixed(2),
      comportamientosRepetitivos: (
        scores.repetitiveBehaviors.reduce((a, b) => a + b, 0) / scores.repetitiveBehaviors.length
      ).toFixed(2),
      respuestasSensoriales: (
        scores.sensoryResponses.reduce((a, b) => a + b, 0) / scores.sensoryResponses.length
      ).toFixed(2),
    }))
  }

  const processGenderData = () => {
    if (!statisticsData) return []

    return statisticsData.patientsByGender.map((item) => ({
      gender: item.gender === "f" ? "Femenino" : "Masculino",
      count: item.count,
      percentage: ((item.count / statisticsData.totalPatients) * 100).toFixed(1),
    }))
  }

  // Colors
  // const blueColors = ["#3B82F6", "#1D4ED8", "#1E40AF", "#1E3A8A"]
  const pieColors = ["#60A5FA", "#3B82F6", "#2563EB", "#1D4ED8"]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-700 text-lg font-medium">Cargando análisis de datos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg border border-red-200">
          <div className="text-red-600 text-center">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-semibold mb-2">Error de Conexión</h3>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  const clusterDistribution = processClusterDistribution()
  const scoresByCluster = processScoresByCluster()
  const genderData = processGenderData()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            Sistema de Tratamiento Personalizado - Análisis de Datos
          </h1>
          <p className="text-blue-700">Análisis avanzado basado en inteligencia artificial para niños autistas</p>
        </div>

        {/* Statistics Cards */}
        {statisticsData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de Pacientes</p>
                  <p className="text-2xl font-bold text-blue-900">{statisticsData.totalPatients}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Edad Promedio</p>
                  <p className="text-2xl font-bold text-blue-900">{statisticsData.averageAge.toFixed(1)} años</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Clusters Identificados</p>
                  <p className="text-2xl font-bold text-blue-900">{clusterDistribution.length}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Gender Distribution */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">Distribución por Género</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={genderData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="gender" stroke="#374151" />
                <YAxis stroke="#374151" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#F8FAFC",
                    border: "1px solid #3B82F6",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Cluster Distribution */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">Distribución de Clusters</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={clusterDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ cluster, percentage }) => `${cluster}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {clusterDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} className={"" + entry}/>
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Scores by Cluster */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">Puntuaciones Promedio por Cluster</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={scoresByCluster} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="cluster" stroke="#374151" />
              <YAxis stroke="#374151" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#F8FAFC",
                  border: "1px solid #3B82F6",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="comunicación" fill="#60A5FA" radius={[2, 2, 0, 0]} />
              <Bar dataKey="interacciónSocial" fill="#3B82F6" radius={[2, 2, 0, 0]} />
              <Bar dataKey="comportamientosRepetitivos" fill="#2563EB" radius={[2, 2, 0, 0]} />
              <Bar dataKey="respuestasSensoriales" fill="#1D4ED8" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart for Average Scores */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">Perfil de Puntuaciones por Cluster</h3>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={scoresByCluster}>
              <PolarGrid stroke="#E5E7EB" />
              <PolarAngleAxis dataKey="cluster" tick={{ fill: "#374151" }} />
              <PolarRadiusAxis tick={{ fill: "#374151" }} />
              <Radar
                name="Comunicación"
                dataKey="comunicación"
                stroke="#60A5FA"
                fill="#60A5FA"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Radar
                name="Interacción Social"
                dataKey="interacciónSocial"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Radar
                name="Comportamientos Repetitivos"
                dataKey="comportamientosRepetitivos"
                stroke="#2563EB"
                fill="#2563EB"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Radar
                name="Respuestas Sensoriales"
                dataKey="respuestasSensoriales"
                stroke="#1D4ED8"
                fill="#1D4ED8"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Legend />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#F8FAFC",
                  border: "1px solid #3B82F6",
                  borderRadius: "8px",
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
