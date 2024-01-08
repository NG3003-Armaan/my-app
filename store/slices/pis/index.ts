import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SelectInputDefaultValueType } from "components/SelectInput/SelectInput"
import { createSetState } from "store/utility"

export type PisType = {
  id: string
  appId: string
  receiptDate: string
  businessName: string
  receiptAmount: string
  mode: string
  agentName: string
  acknowledgementUser: string
  transactionId: string
}

export type MisMatchedPisType = {
  id: string
  date: string
  amount: string
  paymentMode: string
  transactionId: string
  action: string
  sendToCmReason: string
  applicationId: string
}

export type ManualAcknowledgePisType = {
  id: string | number
  applicationId: string
  date: string
  amount: string
  paymentMode: string
  acknowledgementUser: string
  transactionId: string
}

export type AcknowledgePisType = {
  id: string | number
  date: string
  amount: string
  paymentMode: string
  transactionId: string
  applicationId: string
  acknowledgedUser: string
  status: string
}

export interface PisState {
  acknowledgementUserId: string | SelectInputDefaultValueType<string>
  pis: Array<PisType>
  misMatchedPis: Array<MisMatchedPisType>
  manualAcknowledgePis: Array<ManualAcknowledgePisType>
  acknowledgedPis: Array<AcknowledgePisType>
}

export const initialState: PisState = {
  acknowledgementUserId: "",
  pis: [],
  misMatchedPis: [],
  manualAcknowledgePis: [],
  acknowledgedPis: [],
}

export const pisSlice = createSlice({
  name: "pis",
  initialState,
  reducers: {
    setName: createSetState("acknowledgementUserId"),
    setPendingPis: createSetState("pis"),
    setMisMatchedPis: createSetState("misMatchedPis"),
    setSelectedAction(
      state: PisState,
      action: PayloadAction<{ id: MisMatchedPisType["id"]; value: MisMatchedPisType["action"] }>
    ) {
      const selectedApplication = state.misMatchedPis.find((item) => item.id === action.payload.id)
      if (!selectedApplication) {
        return
      }
      selectedApplication.action = action.payload.value
    },
    setSelectedReason(
      state: PisState,
      action: PayloadAction<{
        id: MisMatchedPisType["id"]
        value: MisMatchedPisType["sendToCmReason"]
      }>
    ) {
      const selectedApplication = state.misMatchedPis.find((item) => item.id === action.payload.id)
      if (!selectedApplication) {
        return
      }
      selectedApplication.sendToCmReason = action.payload.value
    },
    setManualAcknowledgePis: createSetState("manualAcknowledgePis"),
    setAcknowledgedPis: createSetState("acknowledgedPis"),
  },
})

export const pisActions = pisSlice.actions

export default pisSlice.reducer
