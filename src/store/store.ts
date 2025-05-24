import { configureStore } from "@reduxjs/toolkit"
import usersReducer from "./slices/usersSlice"
import clientsReducer from "./slices/clientsSlice"
import evaluationsReducer from "./slices/evaluationSlice"


export const store = configureStore({
  reducer: {
    users: usersReducer,
    clients: clientsReducer,
    evaluations: evaluationsReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch