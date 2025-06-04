"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../store/store"
import { setResults } from "../../store/slices/evaluationSlice"
import { initialResultsData } from "../../utils/data/evaluations"

export const ResultsAnalysisView = () => {
  const dispatch = useDispatch()
  const { results } = useSelector((state: RootState) => state.evaluations)
  const { clients } = useSelector((state: RootState) => state.clients)
  const [selectedResult, setSelectedResult] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [riskFilter, setRiskFilter] = useState("")

  useEffect(() => {
    const savedResults = localStorage.getItem("evaluationResults")
    if (savedResults) {
      dispatch(setResults(JSON.parse(savedResults)))
    } else {
      dispatch(setResults(initialResultsData))
      localStorage.setItem("evaluationResults", JSON.stringify(initialResultsData))
    }
  }, [dispatch])

  const filteredResults = results.filter((result) => {
    const client = clients.find((c) => c.id === result.clientId)
    const matchesSearch = client?.name.toLowerCase().includes(searchTerm.toLowerCase()) || false
    const matchesRisk = riskFilter === "" || result.riskLevel === riskFilter
    return matchesSearch && matchesRisk
  })

  const getRiskBadge = (riskLevel: string) => {
    const riskConfig = {
      low: { label: "Bajo", color: "bg-green-100 text-green-800" },
      medium: { label: "Medio", color: "bg-yellow-100 text-yellow-800" },
      high: { label: "Alto", color: "bg-red-100 text-red-800" },
    }

    const config = riskConfig[riskLevel as keyof typeof riskConfig] || riskConfig.medium

    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${config.color}`}>{config.label}</span>
    )
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    if (score >= 40) return "text-orange-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resultados y Análisis</h1>
          <p className="text-gray-600">Análisis detallado de los resultados de evaluaciones</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="bi bi-search text-gray-400"></i>
              </div>
              <input
                type="text"
                placeholder="Buscar por nombre del cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los niveles de riesgo</option>
              <option value="low">Riesgo Bajo</option>
              <option value="medium">Riesgo Medio</option>
              <option value="high">Riesgo Alto</option>
            </select>
          </div>
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <i className="bi bi-graph-up text-2xl text-blue-600"></i>
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-medium text-gray-900">Total Análisis</h4>
              <p className="text-2xl font-bold text-blue-600">{results.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <i className="bi bi-shield-check text-2xl text-green-600"></i>
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-medium text-gray-900">Riesgo Bajo</h4>
              <p className="text-2xl font-bold text-green-600">{results.filter((r) => r.riskLevel === "low").length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <i className="bi bi-exclamation-triangle text-2xl text-yellow-600"></i>
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-medium text-gray-900">Riesgo Medio</h4>
              <p className="text-2xl font-bold text-yellow-600">
                {results.filter((r) => r.riskLevel === "medium").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <i className="bi bi-shield-x text-2xl text-red-600"></i>
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-medium text-gray-900">Riesgo Alto</h4>
              <p className="text-2xl font-bold text-red-600">{results.filter((r) => r.riskLevel === "high").length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Puntuación General
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nivel de Riesgo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Próxima Evaluación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha de Análisis
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredResults.map((result) => {
                const client = clients.find((c) => c.id === result.clientId)
                return (
                  <tr key={result.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{client?.name || "Cliente no encontrado"}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-bold ${getScoreColor(result.overallScore)}`}>
                        {result.overallScore}/100
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getRiskBadge(result.riskLevel)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(result.nextEvaluationDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(result.generatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => setSelectedResult(result)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Ver análisis completo"
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredResults.length === 0 && (
          <div className="text-center py-12">
            <i className="bi bi-graph-up text-4xl text-gray-400 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron resultados</h3>
            <p className="text-gray-500">
              {searchTerm || riskFilter ? "Intenta con otros filtros de búsqueda" : "Aún no hay análisis disponibles"}
            </p>
          </div>
        )}
      </div>

      {/* Detailed Result Modal */}
      {selectedResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Análisis Detallado</h2>
              <button onClick={() => setSelectedResult(null)} className="text-gray-400 hover:text-gray-600">
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* General Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-4">Información General</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Cliente:</span>{" "}
                    {clients.find((c) => c.id === selectedResult.clientId)?.name}
                  </p>
                  <p>
                    <span className="font-medium">Puntuación General:</span>{" "}
                    <span className={`font-bold ${getScoreColor(selectedResult.overallScore)}`}>
                      {selectedResult.overallScore}/100
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">Nivel de Riesgo:</span> {getRiskBadge(selectedResult.riskLevel)}
                  </p>
                  <p>
                    <span className="font-medium">Próxima Evaluación:</span>{" "}
                    {new Date(selectedResult.nextEvaluationDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Category Scores */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-4">Puntuaciones por Categoría</h3>
                <div className="space-y-3">
                  {Object.entries(selectedResult.categoryScores as Record<string, number>).map(
                    ([category, score]) => (
                    <div key={category}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">{category}</span>
                        <span className={`text-sm font-bold ${getScoreColor(score)}`}>
                          {score}/100
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            (score as number) >= 80
                              ? "bg-green-500"
                              : (score as number) >= 60
                                ? "bg-yellow-500"
                                : (score as number) >= 40
                                  ? "bg-orange-500"
                                  : "bg-red-500"
                          }`}
                          style={{ width: `${score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Strengths and Areas for Improvement */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                  <i className="bi bi-check-circle text-green-600 mr-2"></i>
                  Fortalezas Identificadas
                </h3>
                <ul className="space-y-2">
                  {selectedResult.strengths.map((strength: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <i className="bi bi-plus-circle text-green-500 mr-2 mt-0.5 text-sm"></i>
                      <span className="text-sm text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                  <i className="bi bi-exclamation-circle text-orange-600 mr-2"></i>
                  Áreas de Mejora
                </h3>
                <ul className="space-y-2">
                  {selectedResult.areasForImprovement.map((area: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <i className="bi bi-arrow-up-circle text-orange-500 mr-2 mt-0.5 text-sm"></i>
                      <span className="text-sm text-gray-700">{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recommendations */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                <i className="bi bi-lightbulb text-blue-600 mr-2"></i>
                Recomendaciones de Tratamiento
              </h3>
              <div className="bg-blue-50 rounded-lg p-4">
                <ul className="space-y-2">
                  {selectedResult.recommendations.map((recommendation: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <i className="bi bi-arrow-right text-blue-500 mr-2 mt-0.5 text-sm"></i>
                      <span className="text-sm text-gray-700">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setSelectedResult(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cerrar
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Generar Reporte PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
