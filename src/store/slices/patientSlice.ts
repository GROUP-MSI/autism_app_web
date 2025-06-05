import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Patient {
  id: string
  firstName: string
  lastName: string
  dateOfBirth: string
  age: number
  gender: "masculino" | "femenino" | "otro"
  diagnosis: string
  severityLevel: 1 | 2 | 3
  contactInfo: {
    phone: string
    email: string
    address: string
  }
  familyInfo: {
    primaryCaregiver: string
    relationship: string
    phone: string
    email: string
    emergencyContact: string
    emergencyPhone: string
  }
  medicalHistory: {
    allergies: string[]
    medications: string[]
    previousTherapies: string[]
    notes: string
  }
  currentStatus: "activo" | "inactivo" | "alta" | "derivado"
  enrollmentDate: string
  lastVisit: string
  nextAppointment: string
  assignedTherapist: string
  createdAt: string
  updatedAt: string
}

interface PatientsState {
  patients: Patient[]
  loading: boolean
  error: string | null
}

const initialState: PatientsState = {
  patients: [],
  loading: false,
  error: null,
}

const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    setPatients: (state, action: PayloadAction<Patient[]>) => {
      state.patients = action.payload
    },
    addPatient: (state, action: PayloadAction<Patient>) => {
      state.patients.push(action.payload)
    },
    updatePatient: (state, action: PayloadAction<Patient>) => {
      const index = state.patients.findIndex((p) => p.id === action.payload.id)
      if (index !== -1) {
        state.patients[index] = action.payload
      }
    },
    deletePatient: (state, action: PayloadAction<string>) => {
      state.patients = state.patients.filter((p) => p.id !== action.payload)
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { setPatients, addPatient, updatePatient, deletePatient, setLoading, setError } = patientsSlice.actions
export default patientsSlice.reducer
