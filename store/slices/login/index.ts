import { createSlice } from "@reduxjs/toolkit"

import _ from "lodash"

import { createSetState, setInvalidFields } from "store/utility"

import type { ValidationResults } from "types/store"

export interface LoginState {
  ngId: string
  password: string

  invalidFields: ValidationResults<LoginState>
}

const initialState: LoginState = {
  ngId: "",
  password: "",

  invalidFields: {
    password: { isInvalid: false, errorMessage: "" },
    ngId: { isInvalid: false, errorMessage: "" },
  },
}

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setNgId: createSetState("ngId"),
    setPassword: createSetState("password"),

    setInvalidFields: setInvalidFields,
  },
})

export const loginActions = loginSlice.actions

export default loginSlice.reducer
