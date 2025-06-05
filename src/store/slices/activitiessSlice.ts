import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Activity {
  id: string
  title: string
  description: string
  type: "interactiva" | "biblioteca" | "personalizada"
  category: "comunicacion" | "sensorial" | "social" | "cognitiva" | "motora"
  difficulty: "basico" | "intermedio" | "avanzado"
  ageRange: { min: number; max: number }
  duration: number
  materials: string[]
  instructions: string[]
  objectives: string[]
  progress?: {
    completed: boolean
    score: number
    notes: string
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
    },
    updateActivity: (state, action: PayloadAction<Activity>) => {
      const index = state.activities.findIndex((a) => a.id === action.payload.id)
      if (index !== -1) {
        state.activities[index] = action.payload
      }
    },
    updateActivityProgress: (state, action: PayloadAction<{ id: string; progress: Activity["progress"] }>) => {
      const activity = state.activities.find((a) => a.id === action.payload.id)
      if (activity) {
        activity.progress = action.payload.progress
        activity.updatedAt = new Date().toISOString()
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

export const { setActivities, addActivity, updateActivity, updateActivityProgress, setLoading, setError } =
  activitiesSlice.actions
export default activitiesSlice.reducer
