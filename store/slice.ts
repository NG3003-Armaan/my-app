import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createSetState } from "./utility"

export const enum CONTEXT_ID {
  ACKNOWLEDGE_RECEIPT,
  CREATE_RECEIPT,
  GET_ALLOCATION,
  UPLOAD_ALLOCATION,
  GET_APPLICATION,
  CREATE_AGENCY,
  UPDATE_AGENT,
  UPDATE_NG_EMPLOYEE,
  CREATE_AGENT,
  UPDATE_TRAIL,
  GET_PENDING_PIS,
}

type ShowNotificationModalType = { message: string } & (
  | { show: true; type: "error" | "success" }
  | { show: false; type: "error" | "success" | null }
)

export interface AppState {
  showNotificationModal: ShowNotificationModalType
  contextualLoadingState: {
    id: CONTEXT_ID | null
    loading: boolean
    message?: string
  }
  popUpNotification: {
    type: "success" | "error" | null
    message: string
  }
}

const initialState: AppState = {
  showNotificationModal: {
    show: false,
    message: "",
    type: null,
  },
  contextualLoadingState: {
    id: null,
    loading: false,
    message: "",
  },
  popUpNotification: {
    type: null,
    message: "",
  },
}

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setContextualLoadingState: createSetState("contextualLoadingState"),
    setShowNotificationModal: createSetState("showNotificationModal"),
    resetNotificationModal(state: AppState) {
      state.showNotificationModal = { type: null, message: "", show: false }
    },
    resetPopupNotification(state: AppState) {
      state.popUpNotification = { type: null, message: "" }
    },
    setPopupErrorNotification(state: AppState, action: PayloadAction<{ message: string }>) {
      state.popUpNotification.type = "error"
      state.popUpNotification.message = action.payload.message
    },
    setPopupSuccessNotification(state: AppState, action: PayloadAction<{ message: string }>) {
      state.popUpNotification.type = "success"
      state.popUpNotification.message = action.payload.message
    },
  },
})

export const appActions = appSlice.actions

export default appSlice.reducer
