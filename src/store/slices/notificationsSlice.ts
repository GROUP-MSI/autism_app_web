// src/store/slices/notificationsSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  date: string
  link?: string
}

interface NotificationsState {
  notifications: Notification[]
  unreadCount: number
  loading: boolean
  error: string | null
}

// Cargar notificaciones desde localStorage
const loadNotifications = (): Notification[] => {
  try {
    const data = localStorage.getItem("notifications")
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

const savedNotifications = loadNotifications()
const unreadCount = savedNotifications.filter((n) => !n.read).length

const initialState: NotificationsState = {
  notifications: savedNotifications,
  unreadCount: unreadCount,
  loading: false,
  error: null,
}

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = action.payload
      state.unreadCount = action.payload.filter((n) => !n.read).length
      localStorage.setItem("notifications", JSON.stringify(action.payload))
    },
    addNotification: (state, action: PayloadAction<Omit<Notification, "id" | "date" | "read">>) => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        ...action.payload,
        read: false,
        date: new Date().toISOString(),
      }
      state.notifications = [newNotification, ...state.notifications]
      state.unreadCount += 1
      localStorage.setItem("notifications", JSON.stringify(state.notifications))
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find((n) => n.id === action.payload)
      if (notification && !notification.read) {
        notification.read = true
        state.unreadCount -= 1
        localStorage.setItem("notifications", JSON.stringify(state.notifications))
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach((n) => (n.read = true))
      state.unreadCount = 0
      localStorage.setItem("notifications", JSON.stringify(state.notifications))
    },
    deleteNotification: (state, action: PayloadAction<string>) => {
      const deleted = state.notifications.find((n) => n.id === action.payload)
      state.notifications = state.notifications.filter((n) => n.id !== action.payload)
      if (deleted && !deleted.read) {
        state.unreadCount -= 1
      }
      localStorage.setItem("notifications", JSON.stringify(state.notifications))
    },
    clearAllNotifications: (state) => {
      state.notifications = []
      state.unreadCount = 0
      localStorage.removeItem("notifications")
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
  setNotifications,
  addNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearAllNotifications,
  setLoading,
  setError,
} = notificationsSlice.actions
export default notificationsSlice.reducer