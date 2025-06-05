import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface AIModel {
  id: string
  name: string
  type: "classification" | "regression" | "clustering" | "recommendation"
  status: "training" | "ready" | "error"
  accuracy: number
  lastTrained: string
  description: string
}

export interface Prediction {
  id: string
  patientId: string
  modelId: string
  prediction: any
  confidence: number
  createdAt: string
  type: "progress" | "recommendation" | "risk_assessment"
}

export interface ClusterAnalysis {
  id: string
  name: string
  clusters: {
    id: string
    name: string
    characteristics: string[]
    patientCount: number
    avgProgress: number
  }[]
  createdAt: string
}

interface AISystemState {
  models: AIModel[]
  predictions: Prediction[]
  clusterAnalyses: ClusterAnalysis[]
  systemPerformance: {
    accuracy: number
    responseTime: number
    uptime: number
    lastUpdate: string
  }
  loading: boolean
  error: string | null
}

const initialState: AISystemState = {
  models: [],
  predictions: [],
  clusterAnalyses: [],
  systemPerformance: {
    accuracy: 0,
    responseTime: 0,
    uptime: 0,
    lastUpdate: "",
  },
  loading: false,
  error: null,
}

const aiSystemSlice = createSlice({
  name: "aiSystem",
  initialState,
  reducers: {
    setModels: (state, action: PayloadAction<AIModel[]>) => {
      state.models = action.payload
    },
    addPrediction: (state, action: PayloadAction<Prediction>) => {
      state.predictions.push(action.payload)
    },
    setClusterAnalyses: (state, action: PayloadAction<ClusterAnalysis[]>) => {
      state.clusterAnalyses = action.payload
    },
    updateSystemPerformance: (state, action: PayloadAction<AISystemState["systemPerformance"]>) => {
      state.systemPerformance = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { setModels, addPrediction, setClusterAnalyses, updateSystemPerformance, setLoading, setError } =
  aiSystemSlice.actions
export default aiSystemSlice.reducer
