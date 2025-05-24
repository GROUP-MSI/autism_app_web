import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Rol {
  id: string
  name: string
  description: string
}

interface RolsState {
  rols: Rol[]
  loading: boolean
  error: string | null
}

const initialState: RolsState = {
  rols: [],
  loading: false,
  error: null,
}

const rolsSlice = createSlice({
  name: "rols",
  initialState,
  reducers: {
    setRols: (state, action: PayloadAction<Rol[]>) => {
      state.rols = action.payload
    },
    addRol: (state, action: PayloadAction<Rol>) => {
      state.rols.push(action.payload)
      // Guardar en localStorage
      localStorage.setItem("rols", JSON.stringify(state.rols))
    },
    updateRol: (state, action: PayloadAction<Rol>) => {
      const index = state.rols.findIndex((rol) => rol.id === action.payload.id)
      if (index !== -1) {
        state.rols[index] = action.payload
        // Guardar en localStorage
        localStorage.setItem("rols", JSON.stringify(state.rols))
      }
    },
    deleteRol: (state, action: PayloadAction<string>) => {
      state.rols = state.rols.filter((rol) => rol.id !== action.payload)
      // Guardar en localStorage
      localStorage.setItem("rols", JSON.stringify(state.rols))
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { setRols, addRol, updateRol, deleteRol, setLoading, setError } = rolsSlice.actions
export default rolsSlice.reducer
