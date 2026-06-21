// src/store/slices/userSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface User {
  id: number | string
  name: string
  email: string
  photo?: string
  firstName?: string
  dadLastName?: string
  momLastName?: string
  age?: number
  ci?: string
}

interface UserState {
  currentUser: User | null
  isAuthenticated: boolean
  userRoles: {
    admin: string
    worker: string
    customer: string
  }
  loading: boolean
  error: string | null
}

// Helper para cargar usuario desde localStorage
const loadUserFromStorage = (): User | null => {
  try {
    const userData = localStorage.getItem("user")
    return userData ? JSON.parse(userData) : null
  } catch {
    return null
  }
}

// Helper para cargar roles desde localStorage
const loadRolesFromStorage = () => {
  try {
    const token = localStorage.getItem("token")
    if (token) {
      // Intentar decodificar el token para obtener roles
      // Nota: Esto es solo para sincronización, la verificación real la hace el contexto
      return {
        admin: localStorage.getItem("admin") || 'none',
        worker: localStorage.getItem("worker") || 'none',
        customer: localStorage.getItem("customer") || 'none'
      }
    }
  } catch {
    return { admin: 'none', worker: 'none', customer: 'none' }
  }
  return { admin: 'none', worker: 'none', customer: 'none' }
}

const savedUser = loadUserFromStorage()
const savedRoles = loadRolesFromStorage()

const initialState: UserState = {
  currentUser: savedUser || null,
  isAuthenticated: !!savedUser && localStorage.getItem("token") !== null,
  userRoles: savedRoles,
  loading: false,
  error: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Sincronizar con el contexto - llamado después del login desde el contexto
    syncUser: (state, action: PayloadAction<{ 
      user: User | null, 
      isAuthenticated: boolean,
      roles?: { admin: string, worker: string, customer: string }
    }>) => {
      state.currentUser = action.payload.user
      state.isAuthenticated = action.payload.isAuthenticated
      
      if (action.payload.roles) {
        state.userRoles = action.payload.roles
      }
    },
    
    // Para actualizar solo el usuario (sin cambiar autenticación)
    updateCurrentUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload }
        // Actualizar en localStorage
        localStorage.setItem("user", JSON.stringify(state.currentUser))
      }
    },
    
    // Para actualizar roles
    updateRoles: (state, action: PayloadAction<{ admin: string, worker: string, customer: string }>) => {
      state.userRoles = action.payload
      localStorage.setItem("admin", action.payload.admin)
      localStorage.setItem("worker", action.payload.worker)
      localStorage.setItem("customer", action.payload.customer)
    },
    
    // Limpiar estado (logout)
    clearUser: (state) => {
      state.currentUser = null
      state.isAuthenticated = false
      state.userRoles = { admin: 'none', worker: 'none', customer: 'none' }
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    
    // Sincronizar desde el contexto (para usar en useEffect)
    syncFromContext: (state) => {
      const user = loadUserFromStorage()
      const token = localStorage.getItem("token")
      
      state.currentUser = user || null
      state.isAuthenticated = !!user && token !== null
      
      // Actualizar roles desde localStorage
      state.userRoles = {
        admin: localStorage.getItem("admin") || 'none',
        worker: localStorage.getItem("worker") || 'none',
        customer: localStorage.getItem("customer") || 'none'
      }
    }
  },
})

export const {
  syncUser,
  updateCurrentUser,
  updateRoles,
  clearUser,
  setLoading,
  setError,
  syncFromContext,
} = userSlice.actions

export default userSlice.reducer