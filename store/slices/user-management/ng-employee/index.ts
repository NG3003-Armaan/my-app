import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import _ from "lodash"

import { ActivityStatus } from "enums"
import { createSetState } from "store/utility"
import { RoleGroup } from "./mapper"

export interface NgEmployeeDetail {
  id: number
  name: string
  department: string
  hrDesignation: string
  roles: Array<RoleGroup>
  status: ActivityStatus
}

export interface NgEmployeeState {
  employees: Array<NgEmployeeDetail>
  searchedEmployeeDetail: NgEmployeeDetail | null
  searchQuery: { value: number; label: string } | null
  updatedEmployeeRoles: Array<{
    employeeId: NgEmployeeDetail["id"]
    roles: Array<{
      status: "initial" | "newly_added" | "deleted"
      id: RoleGroup["id"]
      label: RoleGroup["name"]
      value: RoleGroup["id"]
    }>
  }>
}

const initialState: NgEmployeeState = {
  employees: [],
  updatedEmployeeRoles: [],
  searchedEmployeeDetail: null,
  searchQuery: null,
}

export const ngEmployeeSlice = createSlice({
  name: "user-management/ng-employee",
  initialState,
  reducers: {
    resetSearchResult(state: NgEmployeeState) {
      state.searchQuery = null
      state.searchedEmployeeDetail = null
    },
    setUpdateEmployeesRoles: createSetState("updatedEmployeeRoles"),
    setUpdateEmployeeRole(
      state: NgEmployeeState,
      action: PayloadAction<{
        employeeId: NgEmployeeDetail["id"]
        roles: NgEmployeeState["updatedEmployeeRoles"][number]["roles"]
      }>
    ) {
      state.updatedEmployeeRoles.push({ ...action.payload })

      // if (!employee) {
      //   state.updatedEmployeeRoles.push({ ...action.payload })
      //   return
      // }

      // if (action.payload.roles.length === 0) {
      //   // employee.roles.map(r => ({...r, status:  }))
      // }

      // const roleIds = employee.roles.map((r) => r.id)

      // // action.payload.roles.map(r => ({
      // //   ...r,
      // //   status: roleIds.includes(r.id) ?
      // // }))
      // //

      // const newRoles = action.payload.roles
      //   .filter((r) => !roleIds.includes(r.id))
      //   .map((r) => ({ ...r, status: "newly_added" }))

      // const existingRole = action.payload.roles.filter((r) => roleIds.includes(r.id))

      // if (action.payload.roles) employee.roles = action.payload.roles

      //
      // if (action.payload.roles.length === 0) {
      //   state.updatedEmployeeRoles = state.updatedEmployeeRoles.filter(
      //     (e) => e.employeeId !== action.payload.employeeId
      //   )
      // }
    },
    setEmployees: createSetState("employees"),
    setSearchQuery: createSetState("searchQuery"),
    setSearchedEmployeeDetail: createSetState("searchedEmployeeDetail"),
    setSearchedEmployeeDetailStatus(state: NgEmployeeState, action: PayloadAction<{ activityStatus: ActivityStatus }>) {
      if (state.searchedEmployeeDetail) {
        state.searchedEmployeeDetail.status = action.payload.activityStatus
      }
    },
  },
})

export const ngEmployeeActions = ngEmployeeSlice.actions

export default ngEmployeeSlice.reducer
