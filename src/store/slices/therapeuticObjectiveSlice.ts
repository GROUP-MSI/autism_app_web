import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface TherapeuticObjective {
  id: string
  title: string
  description: string
  category: "comunicacion" | "social" | "sensorial" | "cognitivo" | "motor"
  priority: "alta" | "media" | "baja"
  measurable: boolean
  criteria: string[]
  targetAge: {
    min: number
    max: number
  }
  estimatedDuration: number // en semanas
  prerequisites: string[]
  createdAt: string
  updatedAt: string
  isActive: boolean
}

interface TherapeuticObjectivesState {
  objectives: TherapeuticObjective[]
  loading: boolean
  error: string | null
}

const initialState: TherapeuticObjectivesState = {
  objectives: [],
  loading: false,
  error: null,
}

const therapeuticObjectivesSlice = createSlice({
  name: "therapeuticObjectives",
  initialState,
  reducers: {
    setTherapeuticObjectives: (state, action: PayloadAction<TherapeuticObjective[]>) => {
      state.objectives = action.payload
    },
    addTherapeuticObjective: (state, action: PayloadAction<TherapeuticObjective>) => {
      state.objectives.push(action.payload)
      localStorage.setItem("therapeuticObjectives", JSON.stringify(state.objectives))
    },
    updateTherapeuticObjective: (state, action: PayloadAction<TherapeuticObjective>) => {
      const index = state.objectives.findIndex((obj) => obj.id === action.payload.id)
      if (index !== -1) {
        state.objectives[index] = action.payload
        localStorage.setItem("therapeuticObjectives", JSON.stringify(state.objectives))
      }
    },
    deleteTherapeuticObjective: (state, action: PayloadAction<string>) => {
      state.objectives = state.objectives.filter((obj) => obj.id !== action.payload)
      localStorage.setItem("therapeuticObjectives", JSON.stringify(state.objectives))
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
  setTherapeuticObjectives,
  addTherapeuticObjective,
  updateTherapeuticObjective,
  deleteTherapeuticObjective,
  setLoading,
  setError,
} = therapeuticObjectivesSlice.actions
export default therapeuticObjectivesSlice.reducer
