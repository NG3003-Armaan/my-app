import { createSlice } from "@reduxjs/toolkit"
import _ from "lodash"

import { SelectInputDefaultValue, SelectInputDefaultValueType } from "components/SelectInput/SelectInput"
import { Criticality, PriorityBucket, Propensity, ResolutionRate } from "enums"
import { createSetState } from "store/utility"

export interface AllocationType {
  id: string
  appId: string
  allocationDate: string
  businessName: string
  dpd: string
  priorityBucket: PriorityBucket
  reAllocation: string
  resolutionRate: ResolutionRate
  propensity: Propensity
  criticality: Criticality
  allocatedNgId: string
}

export interface AllocationState {
  agentId: string | SelectInputDefaultValueType<string>
  allocations: Array<AllocationType>
  advanceFilter: {
    appId: string
    allocationDate: string
    dpd: string
    priorityBucket: PriorityBucket | SelectInputDefaultValueType<string>
    resolutionRate: ResolutionRate | SelectInputDefaultValueType<string>
    propensity: Propensity | SelectInputDefaultValueType<string>
    criticality: Criticality | SelectInputDefaultValueType<string>
  }
}

export const initialState: AllocationState = {
  agentId: SelectInputDefaultValue,
  allocations: [],
  advanceFilter: {
    appId: "",
    allocationDate: "",
    dpd: SelectInputDefaultValue,
    priorityBucket: SelectInputDefaultValue,
    resolutionRate: SelectInputDefaultValue,
    propensity: SelectInputDefaultValue,
    criticality: SelectInputDefaultValue,
  },
}

export const allocationSlice = createSlice({
  name: "allocation",
  initialState,
  reducers: {
    setAgentName: createSetState("agentId"),
    setAllocations: createSetState("allocations"),
    setAdvanceFilterAppId: createSetState("advanceFilter", "appId"),
    setAdvanceFilterAllocationDate: createSetState("advanceFilter", "allocationDate"),
    setAdvanceFilterDbd: createSetState("advanceFilter", "dpd"),
    setAdvanceFilterPriorityBucket: createSetState("advanceFilter", "priorityBucket"),
    setAdvanceFilterResolutionRate: createSetState("advanceFilter", "resolutionRate"),
    setAdvanceFilterPropensity: createSetState("advanceFilter", "propensity"),
    setAdvanceFilterCriticality: createSetState("advanceFilter", "criticality"),
    clearAdvanceFilter: createSetState("advanceFilter"),
  },
})

export const allocationActions = allocationSlice.actions

export default allocationSlice.reducer
