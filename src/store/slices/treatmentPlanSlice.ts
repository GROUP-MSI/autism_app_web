import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface TreatmentPlan {
  id: string
  title: string
  description: string
  childName: string
  childAge: number
  therapistId: string
  therapistName: string
  objectives: string[]
  startDate: string
  endDate: string
  status: "draft" | "active" | "completed" | "paused"
  sessions: number
  completedSessions: number
  createdAt: string
  updatedAt: string
}

interface TreatmentPlansState {
  plans: TreatmentPlan[]
  loading: boolean
  error: string | null
}

const initialState: TreatmentPlansState = {
  plans: [],
  loading: false,
  error: null,
}

const treatmentPlansSlice = createSlice({
  name: "treatmentPlans",
  initialState,
  reducers: {
    setTreatmentPlans: (state, action: PayloadAction<TreatmentPlan[]>) => {
      state.plans = action.payload
    },
    addTreatmentPlan: (state, action: PayloadAction<TreatmentPlan>) => {
      state.plans.push(action.payload)
      localStorage.setItem("treatmentPlans", JSON.stringify(state.plans))
    },
    updateTreatmentPlan: (state, action: PayloadAction<TreatmentPlan>) => {
      const index = state.plans.findIndex((plan) => plan.id === action.payload.id)
      if (index !== -1) {
        state.plans[index] = action.payload
        localStorage.setItem("treatmentPlans", JSON.stringify(state.plans))
      }
    },
    deleteTreatmentPlan: (state, action: PayloadAction<string>) => {
      state.plans = state.plans.filter((plan) => plan.id !== action.payload)
      localStorage.setItem("treatmentPlans", JSON.stringify(state.plans))
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { setTreatmentPlans, addTreatmentPlan, updateTreatmentPlan, deleteTreatmentPlan, setLoading, setError } =
  treatmentPlansSlice.actions
export default treatmentPlansSlice.reducer
