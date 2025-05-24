import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Evaluation {
  id: string
  clientId: string
  clientName: string
  templateId: string
  templateName: string
  evaluatorId: string
  evaluatorName: string
  date: string
  status: "pending" | "in_progress" | "completed" | "reviewed"
  responses: Record<string, any>
  score: number
  recommendations: string[]
  notes: string
  createdAt: string
  completedAt?: string
}

export interface EvaluationTemplate {
  id: string
  name: string
  description: string
  category: string
  questions: Question[]
  scoringCriteria: ScoringCriteria
  estimatedDuration: number
  createdAt: string
  isActive: boolean
}

export interface Question {
  id: string
  text: string
  type: "multiple_choice" | "scale" | "text" | "boolean" | "observation"
  options?: string[]
  scaleMin?: number
  scaleMax?: number
  required: boolean
  category: string
}

export interface ScoringCriteria {
  maxScore: number
  ranges: {
    min: number
    max: number
    label: string
    description: string
    color: string
  }[]
}

export interface EvaluationResult {
  id: string
  evaluationId: string
  clientId: string
  overallScore: number
  categoryScores: Record<string, number>
  strengths: string[]
  areasForImprovement: string[]
  recommendations: string[]
  riskLevel: "low" | "medium" | "high"
  nextEvaluationDate: string
  generatedAt: string
}

interface EvaluationsState {
  evaluations: Evaluation[]
  templates: EvaluationTemplate[]
  results: EvaluationResult[]
  loading: boolean
  error: string | null
}

const initialState: EvaluationsState = {
  evaluations: [],
  templates: [],
  results: [],
  loading: false,
  error: null,
}

const evaluationsSlice = createSlice({
  name: "evaluations",
  initialState,
  reducers: {
    // Evaluations
    setEvaluations: (state, action: PayloadAction<Evaluation[]>) => {
      state.evaluations = action.payload
    },
    addEvaluation: (state, action: PayloadAction<Evaluation>) => {
      state.evaluations.push(action.payload)
      localStorage.setItem("evaluations", JSON.stringify(state.evaluations))
    },
    updateEvaluation: (state, action: PayloadAction<Evaluation>) => {
      const index = state.evaluations.findIndex((evaluation) => evaluation.id === action.payload.id)
      if (index !== -1) {
        state.evaluations[index] = action.payload
        localStorage.setItem("evaluations", JSON.stringify(state.evaluations))
      }
    },
    deleteEvaluation: (state, action: PayloadAction<string>) => {
      state.evaluations = state.evaluations.filter((evaluation) => evaluation.id !== action.payload)
      localStorage.setItem("evaluations", JSON.stringify(state.evaluations))
    },

    // Templates
    setTemplates: (state, action: PayloadAction<EvaluationTemplate[]>) => {
      state.templates = action.payload
    },
    addTemplate: (state, action: PayloadAction<EvaluationTemplate>) => {
      state.templates.push(action.payload)
      localStorage.setItem("evaluationTemplates", JSON.stringify(state.templates))
    },
    updateTemplate: (state, action: PayloadAction<EvaluationTemplate>) => {
      const index = state.templates.findIndex((template) => template.id === action.payload.id)
      if (index !== -1) {
        state.templates[index] = action.payload
        localStorage.setItem("evaluationTemplates", JSON.stringify(state.templates))
      }
    },
    deleteTemplate: (state, action: PayloadAction<string>) => {
      state.templates = state.templates.filter((template) => template.id !== action.payload)
      localStorage.setItem("evaluationTemplates", JSON.stringify(state.templates))
    },

    // Results
    setResults: (state, action: PayloadAction<EvaluationResult[]>) => {
      state.results = action.payload
    },
    addResult: (state, action: PayloadAction<EvaluationResult>) => {
      state.results.push(action.payload)
      localStorage.setItem("evaluationResults", JSON.stringify(state.results))
    },

    // Common
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const {
  setEvaluations,
  addEvaluation,
  updateEvaluation,
  deleteEvaluation,
  setTemplates,
  addTemplate,
  updateTemplate,
  deleteTemplate,
  setResults,
  addResult,
  setLoading,
  setError,
} = evaluationsSlice.actions

export default evaluationsSlice.reducer
