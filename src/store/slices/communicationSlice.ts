import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Message {
  id: string
  patientId: string
  from: string
  to: string
  subject: string
  content: string
  type: "info" | "recommendation" | "alert" | "feedback"
  read: boolean
  createdAt: string
}

export interface Recommendation {
  id: string
  patientId: string
  type: "activity" | "therapy" | "lifestyle" | "medication"
  title: string
  description: string
  priority: "low" | "medium" | "high"
  aiGenerated: boolean
  implemented: boolean
  createdAt: string
}

interface CommunicationState {
  messages: Message[]
  recommendations: Recommendation[]
  loading: boolean
  error: string | null
}

const initialState: CommunicationState = {
  messages: [],
  recommendations: [],
  loading: false,
  error: null,
}

const communicationSlice = createSlice({
  name: "communication",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload)
    },
    markMessageAsRead: (state, action: PayloadAction<string>) => {
      const message = state.messages.find((m) => m.id === action.payload)
      if (message) {
        message.read = true
      }
    },
    setRecommendations: (state, action: PayloadAction<Recommendation[]>) => {
      state.recommendations = action.payload
    },
    addRecommendation: (state, action: PayloadAction<Recommendation>) => {
      state.recommendations.push(action.payload)
    },
    implementRecommendation: (state, action: PayloadAction<string>) => {
      const recommendation = state.recommendations.find((r) => r.id === action.payload)
      if (recommendation) {
        recommendation.implemented = true
      }
    },
  },
})

export const {
  setMessages,
  addMessage,
  markMessageAsRead,
  setRecommendations,
  addRecommendation,
  implementRecommendation,
} = communicationSlice.actions
export default communicationSlice.reducer
