import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface TreatmentTemplate {
  id: string
  name: string
  description: string
  category: "comunicacion" | "social" | "sensorial" | "cognitivo" | "motor"
  ageRange: {
    min: number
    max: number
  }
  objectives: string[]
  activities: string[]
  duration: number // en semanas
  difficulty: "basico" | "intermedio" | "avanzado"
  createdAt: string
  updatedAt: string
  isActive: boolean
}

interface TreatmentTemplatesState {
  templates: TreatmentTemplate[]
  loading: boolean
  error: string | null
}

const initialState: TreatmentTemplatesState = {
  templates: [],
  loading: false,
  error: null,
}

const treatmentTemplatesSlice = createSlice({
  name: "treatmentTemplates",
  initialState,
  reducers: {
    setTreatmentTemplates: (state, action: PayloadAction<TreatmentTemplate[]>) => {
      state.templates = action.payload
    },
    addTreatmentTemplate: (state, action: PayloadAction<TreatmentTemplate>) => {
      state.templates.push(action.payload)
      localStorage.setItem("treatmentTemplates", JSON.stringify(state.templates))
    },
    updateTreatmentTemplate: (state, action: PayloadAction<TreatmentTemplate>) => {
      const index = state.templates.findIndex((template) => template.id === action.payload.id)
      if (index !== -1) {
        state.templates[index] = action.payload
        localStorage.setItem("treatmentTemplates", JSON.stringify(state.templates))
      }
    },
    deleteTreatmentTemplate: (state, action: PayloadAction<string>) => {
      state.templates = state.templates.filter((template) => template.id !== action.payload)
      localStorage.setItem("treatmentTemplates", JSON.stringify(state.templates))
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const {
  setTreatmentTemplates,
  addTreatmentTemplate,
  updateTreatmentTemplate,
  deleteTreatmentTemplate,
  setLoading,
  setError,
} = treatmentTemplatesSlice.actions
export default treatmentTemplatesSlice.reducer
