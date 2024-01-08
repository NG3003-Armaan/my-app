import { createSlice } from "@reduxjs/toolkit"
import _ from "lodash"

import { SelectInputDefaultValue, SelectInputDefaultValueType } from "components/SelectInput/SelectInput"
import { createSetState } from "store/utility"

export interface SettlementState {
  agentName: SelectInputDefaultValueType<string>
}

export const initialState: SettlementState = {
  agentName: SelectInputDefaultValue,
}

export const settlementSlice = createSlice({
  name: "settlement",
  initialState,
  reducers: {
    setAgentName: createSetState("agentName"),
  },
})

export const settlementActions = settlementSlice.actions

export default settlementSlice.reducer
