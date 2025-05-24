import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Client {
  id: string
  name: string
  age: number
  birthDate: string
  gender: "masculino" | "femenino"
  diagnosis: string
  parentName: string
  parentEmail: string
  parentPhone: string
  address: string
  emergencyContact: string
  emergencyPhone: string
  medicalHistory: string
  currentMedications: string[]
  allergies: string[]
  status: "active" | "inactive" | "completed"
  registrationDate: string
  avatar?: string
}

interface ClientsState {
  clients: Client[]
  loading: boolean
  error: string | null
}

const initialState: ClientsState = {
  clients: [],
  loading: false,
  error: null,
}

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    setClients: (state, action: PayloadAction<Client[]>) => {
      state.clients = action.payload
    },
    addClient: (state, action: PayloadAction<Client>) => {
      state.clients.push(action.payload)
      localStorage.setItem("clients", JSON.stringify(state.clients))
    },
    updateClient: (state, action: PayloadAction<Client>) => {
      const index = state.clients.findIndex((client) => client.id === action.payload.id)
      if (index !== -1) {
        state.clients[index] = action.payload
        localStorage.setItem("clients", JSON.stringify(state.clients))
      }
    },
    deleteClient: (state, action: PayloadAction<string>) => {
      state.clients = state.clients.filter((client) => client.id !== action.payload)
      localStorage.setItem("clients", JSON.stringify(state.clients))
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { setClients, addClient, updateClient, deleteClient, setLoading, setError } = clientsSlice.actions
export default clientsSlice.reducer
