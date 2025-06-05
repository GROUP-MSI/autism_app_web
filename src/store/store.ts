import { configureStore } from "@reduxjs/toolkit"
import usersReducer from "./slices/usersSlice"
import clientsReducer from "./slices/clientsSlice"
import evaluationsReducer from "./slices/evaluationSlice"
import activitiesReducer from "./slices/activitiesSlice"
import treatmentPlanReducer from "./slices/treatmentPlanSlice";
import aiSystemReducer from "./slices/iaSystemSlice";
import communicationReducer from "./slices/communicationSlice"

export const store = configureStore({
  reducer: {
    users: usersReducer,
    clients: clientsReducer,
    evaluations: evaluationsReducer,
    activities: activitiesReducer,
    treatmentPlans: treatmentPlanReducer,
    aiSystem: aiSystemReducer,
    communication: communicationReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch