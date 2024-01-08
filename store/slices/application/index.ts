import { createSlice } from "@reduxjs/toolkit"
import { createSetState } from "store/utility"

export interface ApplicationType {
  appId: string
  customerId: string
  firstName: string
  lastName: string
  dpdBucket: string
  overDueAmount: string
  loanAmount: string
  pBal: string
}
export interface ApplicationState {
  application: ApplicationType
  searchQuery: {
    value: string
    label: string
  }
}

export const initialState = {
  application: {
    appId: "",
    customerId: "",
    firstName: "",
    lastName: "",
    dpdBucket: "",
    overDueAmount: "",
    loanAmount: "",
    pBal: "",
  },
  searchQuery: {
    value: "",
    label: "",
  },
}

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setApplication: createSetState("application"),
    setSearchQuery: createSetState("searchQuery"),
  },
})

export const applicationAction = applicationSlice.actions

export default applicationSlice.reducer
