import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface User {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive"
  createdAt: string
  avatar?: string
}

interface UsersState {
  users: User[]
  loading: boolean
  error: string | null
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload)
      // Guardar en localStorage
      localStorage.setItem("users", JSON.stringify(state.users))
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex((user) => user.id === action.payload.id)
      if (index !== -1) {
        state.users[index] = action.payload
        // Guardar en localStorage
        localStorage.setItem("users", JSON.stringify(state.users))
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== action.payload)
      // Guardar en localStorage
      localStorage.setItem("users", JSON.stringify(state.users))
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { setUsers, addUser, updateUser, deleteUser, setLoading, setError } = usersSlice.actions
export default usersSlice.reducer
