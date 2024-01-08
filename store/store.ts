import type { Action, ThunkAction } from "@reduxjs/toolkit"

import { configureStore } from "@reduxjs/toolkit"

import appReducer from "./slice"
import AllocationReducer from "./slices/allocation"
import applicationReducer from "./slices/application"
import loginReducer from "./slices/login"
import pisReducer from "./slices/pis"
import receiptReducer from "./slices/receipts"
import settlementReducer from "./slices/settlement"
import trailReducer from "./slices/trail"
import agencyReducer from "./slices/user-management/agency"
import agentReducer from "./slices/user-management/agent"
import ngEmployeeReducer from "./slices/user-management/ng-employee"

export function makeStore() {
  return configureStore({
    reducer: {
      app: appReducer,
      login: loginReducer,
      ngEmployee: ngEmployeeReducer,
      agency: agencyReducer,
      allocation: AllocationReducer,
      trail: trailReducer,
      agent: agentReducer,
      application: applicationReducer,
      receipt: receiptReducer,
      pis: pisReducer,
      settlement: settlementReducer,
    },
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>

export default store
