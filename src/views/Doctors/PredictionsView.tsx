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
} from "recharts"

// Datos simulados para demostración
const simulatedPatientData = [
  {
    patientId: "P001",
    treatmentGroup: 1,
    riskLevel: "Bajo",
    scores: {
      communication: 8.5,
      socialInteraction: 7.2,
      repetitiveBehaviors: 3.1,
      sensoryResponses: 4.2,
    },
    age: 4,
    gender: "m",
  },
  {
    patientId: "P002",
    treatmentGroup: 2,
    riskLevel: "Moderado",
    scores: {
      communication: 5.8,
      socialInteraction: 4.9,
      repetitiveBehaviors: 6.7,
      sensoryResponses: 7.1,
    },
    age: 6,
    gender: "f",
  },
  {
    patientId: "P003",
    treatmentGroup: 1,
    riskLevel: "Bajo",
    scores: {
      communication: 9.1,
      socialInteraction: 8.3,
      repetitiveBehaviors: 2.8,
      sensoryResponses: 3.5,
    },
    age: 5,
    gender: "m",
  },
  {
    patientId: "P004",
    treatmentGroup: 3,
    riskLevel: "Alto",
    scores: {
      communication: 3.2,
      socialInteraction: 2.8,
      repetitiveBehaviors: 8.9,
      sensoryResponses: 8.7,
    },
    age: 7,
    gender: "f",
  },
  {
    patientId: "P005",
    treatmentGroup: 2,
    riskLevel: "Moderado",
    scores: {
      communication: 6.1,
      socialInteraction: 5.4,
      repetitiveBehaviors: 6.2,
      sensoryResponses: 6.8,
    },
    age: 4,
    gender: "m",
  },
  {
    patientId: "P006",
    treatmentGroup: 1,
    riskLevel: "Bajo",
    scores: {
      communication: 8.8,
      socialInteraction: 7.9,
      repetitiveBehaviors: 3.4,
      sensoryResponses: 4.1,
    },
    age: 6,
    gender: "f",
  },
]

export const PredictionsView = () => {
  const [patientData, setPatientData] = useState(simulatedPatientData)
  const [loading, setLoading] = useState(true)
  setPatientData(simulatedPatientData);
  useEffect(() => {
    // Simular carga de datos
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Procesar datos para visualizaciones
  const processRiskDistribution = () => {
    const riskCounts = patientData.reduce(
      (acc, patient) => {
        acc[patient.riskLevel] = (acc[patient.riskLevel] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return Object.entries(riskCounts).map(([risk, count]) => ({
      riesgo: risk,
      cantidad: count,
      porcentaje: ((count / patientData.length) * 100).toFixed(1),
    }))
  }

  const processTreatmentGroups = () => {
    const groupCounts = patientData.reduce(
      (acc, patient) => {
        const groupName = `Grupo ${patient.treatmentGroup}`
        acc[groupName] = (acc[groupName] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return Object.entries(groupCounts).map(([group, count]) => ({
      grupo: group,
      pacientes: count,
      porcentaje: ((count / patientData.length) * 100).toFixed(1),
    }))
  }

  const processAverageScoresByGroup = () => {
    const groupScores = patientData.reduce(
      (acc, patient) => {
        const group = patient.treatmentGroup
        if (!acc[group]) {
          acc[group] = {
            communication: [],
            socialInteraction: [],
            repetitiveBehaviors: [],
            sensoryResponses: [],
          }
        }

        acc[group].communication.push(patient.scores.communication)
        acc[group].socialInteraction.push(patient.scores.socialInteraction)
        acc[group].repetitiveBehaviors.push(patient.scores.repetitiveBehaviors)
        acc[group].sensoryResponses.push(patient.scores.sensoryResponses)

        return acc
      },
      {} as Record<number, Record<string, number[]>>,
    )

    return Object.entries(groupScores).map(([group, scores]) => ({
      grupo: `Grupo ${group}`,
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

  const processGenderData = () => {
    const genderCounts = patientData.reduce(
      (acc, patient) => {
        const gender = patient.gender === "f" ? "Femenino" : "Masculino"
        acc[gender] = (acc[gender] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return Object.entries(genderCounts).map(([gender, count]) => ({
      género: gender,
      cantidad: count,
      porcentaje: ((count / patientData.length) * 100).toFixed(1),
    }))
  }

  const calculateStatistics = () => {
    const totalPatients = patientData.length
    const averageAge = patientData.reduce((sum, p) => sum + p.age, 0) / totalPatients
    const riskLevels = processRiskDistribution()

    return {
      totalPatients,
      averageAge,
      riskLevels,
    }
  }

  const pieColors = ["#10B981", "#F59E0B", "#EF4444"] // Verde, Amarillo, Rojo
  // const barColors = ["#3B82F6", "#8B5CF6", "#06B6D4"]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-700 text-lg font-medium">Analizando datos de evaluación...</p>
          <p className="text-blue-600 text-sm mt-2">Procesando información de pacientes</p>
        </div>
      </div>
    )
  }

  const riskDistribution = processRiskDistribution()
  const treatmentGroups = processTreatmentGroups()
  const scoresByGroup = processAverageScoresByGroup()
  const genderData = processGenderData()
  const statistics = calculateStatistics()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-blue-900 mb-3">Sistema de Evaluación para Detección de Autismo</h1>
          <p className="text-blue-700 text-lg">
            Análisis automático de evaluaciones para identificar patrones y recomendar tratamientos personalizados
          </p>
          <div className="mt-4 bg-blue-100 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <p className="text-blue-800 text-sm">
              <strong>¿Cómo funciona?</strong> Nuestro sistema analiza automáticamente las evaluaciones de los niños y
              los agrupa según sus necesidades similares para recomendar el mejor plan de tratamiento.
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                <p className="text-sm font-medium text-gray-600">Niños Evaluados</p>
                <p className="text-2xl font-bold text-blue-900">{statistics.totalPatients}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <p className="text-2xl font-bold text-green-900">{statistics.averageAge.toFixed(1)} años</p>
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Grupos de Tratamiento</p>
                <p className="text-2xl font-bold text-purple-900">{treatmentGroups.length}</p>
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Evaluaciones Completadas</p>
                <p className="text-2xl font-bold text-orange-900">100%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Risk Level Distribution */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Nivel de Riesgo Identificado</h3>
            <p className="text-gray-600 text-sm mb-4">Distribución de niños según el nivel de riesgo detectado</p>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ riesgo, porcentaje }) => `${riesgo}: ${porcentaje}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="cantidad"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} className={`${entry.cantidad}`}/>
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} niños`, "Cantidad"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Gender Distribution */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Distribución por Género</h3>
            <p className="text-gray-600 text-sm mb-4">Proporción de niños y niñas evaluados</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={genderData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="género" stroke="#374151" />
                <YAxis stroke="#374151" />
                <Tooltip
                  formatter={(value) => [`${value} niños`, "Cantidad"]}
                  contentStyle={{
                    backgroundColor: "#F8FAFC",
                    border: "1px solid #3B82F6",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="cantidad" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Treatment Groups */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-blue-900 mb-2">Grupos de Tratamiento Recomendados</h3>
          <p className="text-gray-600 text-sm mb-4">
            Los niños han sido agrupados según sus necesidades similares para recibir tratamientos personalizados
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={treatmentGroups}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="grupo" stroke="#374151" />
              <YAxis stroke="#374151" />
              <Tooltip
                formatter={(value) => [`${value} niños`, "Pacientes"]}
                contentStyle={{
                  backgroundColor: "#F8FAFC",
                  border: "1px solid #3B82F6",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="pacientes" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Scores by Treatment Group */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-blue-900 mb-2">Puntuaciones Promedio por Grupo de Tratamiento</h3>
          <p className="text-gray-600 text-sm mb-4">
            Comparación de las áreas evaluadas en cada grupo (puntuación de 0 a 10)
          </p>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={scoresByGroup} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="grupo" stroke="#374151" />
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
          <h3 className="text-xl font-semibold text-blue-900 mb-2">Perfil de Cada Grupo de Tratamiento</h3>
          <p className="text-gray-600 text-sm mb-4">
            Visualización del perfil característico de cada grupo para personalizar los tratamientos
          </p>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={scoresByGroup}>
              <PolarGrid stroke="#E5E7EB" />
              <PolarAngleAxis dataKey="grupo" tick={{ fill: "#374151", fontSize: 12 }} />
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
          <h3 className="text-xl font-semibold text-blue-900 mb-4">¿Cómo interpretar estos resultados?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Grupos de Tratamiento:</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>
                  • <strong>Grupo 1:</strong> Niños con desarrollo típico o riesgo bajo
                </li>
                <li>
                  • <strong>Grupo 2:</strong> Niños con necesidades moderadas de apoyo
                </li>
                <li>
                  • <strong>Grupo 3:</strong> Niños que requieren apoyo intensivo
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Áreas Evaluadas:</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>
                  • <strong>Comunicación:</strong> Habilidades de lenguaje y expresión
                </li>
                <li>
                  • <strong>Interacción Social:</strong> Capacidad de relacionarse con otros
                </li>
                <li>
                  • <strong>Comportamientos Repetitivos:</strong> Patrones de conducta
                </li>
                <li>
                  • <strong>Respuestas Sensoriales:</strong> Reacciones a estímulos del entorno
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
