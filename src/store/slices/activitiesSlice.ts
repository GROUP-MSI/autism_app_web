import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Activity {
  id: string
  title: string
  description: string
  type: "interactiva" | "biblioteca" | "personalizada"
  category: "comunicacion" | "social" | "sensorial" | "cognitivo" | "motor"
  difficulty: "basico" | "intermedio" | "avanzado"
  ageRange: {
    min: number
    max: number
  }
  duration: number // en minutos
  materials: string[]
  instructions: string[]
  objectives: string[]
  progress?: {
    completed: boolean
    score?: number
    notes?: string
    completedAt?: string
  }
  createdAt: string
  updatedAt: string
  isActive: boolean
}

interface ActivitiesState {
  activities: Activity[]
  loading: boolean
  error: string | null
}

const initialState: ActivitiesState = {
  activities: [],
  loading: false,
  error: null,
}

const activitiesSlice = createSlice({
  name: "activities",
  initialState,
  reducers: {
    setActivities: (state, action: PayloadAction<Activity[]>) => {
      state.activities = action.payload
    },
    addActivity: (state, action: PayloadAction<Activity>) => {
      state.activities.push(action.payload)
      localStorage.setItem("activities", JSON.stringify(state.activities))
    },
    updateActivity: (state, action: PayloadAction<Activity>) => {
      const index = state.activities.findIndex((activity) => activity.id === action.payload.id)
      if (index !== -1) {
        state.activities[index] = action.payload
        localStorage.setItem("activities", JSON.stringify(state.activities))
      }
    },
    deleteActivity: (state, action: PayloadAction<string>) => {
      state.activities = state.activities.filter((activity) => activity.id !== action.payload)
      localStorage.setItem("activities", JSON.stringify(state.activities))
    },
    updateActivityProgress: (state, action: PayloadAction<{ id: string; progress: Activity["progress"] }>) => {
      const index = state.activities.findIndex((activity) => activity.id === action.payload.id)
      if (index !== -1) {
        state.activities[index].progress = action.payload.progress
        localStorage.setItem("activities", JSON.stringify(state.activities))
      }
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
  setActivities,
  addActivity,
  updateActivity,
  deleteActivity,
  updateActivityProgress,
  setLoading,
  setError,
} = activitiesSlice.actions
export default activitiesSlice.reducer
