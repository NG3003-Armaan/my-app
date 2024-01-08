import { createSlice } from "@reduxjs/toolkit"
import { SelectInputDefaultValue, SelectInputDefaultValueType } from "components/SelectInput/SelectInput"
import { createSetState, setInvalidFields } from "store/utility"
import { ValidationResults } from "types/store"
import { validate } from "utils/validation"

export interface TrailState {
  basicInformation: {
    connectivity: SelectInputDefaultValueType<string>
    trailType: SelectInputDefaultValueType<string>
    disposition: SelectInputDefaultValueType<string>
    additionalRemarks: string
    reasonForNonPayment: SelectInputDefaultValueType<string>
    nextAction: SelectInputDefaultValueType<string>
    ptpDate: string
    ptpAmount: string
  }
  secondaryInformation: {
    mobileNumber: string
    address: string
    pincode: string
  }
  settlement: {
    paymentMode: string
    paymentFrequency: number
    settlementAmount: string
    settlementType: SelectInputDefaultValueType<string>
    settlementStartDate: string
    deferredAmount: string
  }
  invalidFields: ValidationResults<TrailState>
}

const initialState: TrailState = {
  basicInformation: {
    connectivity: SelectInputDefaultValue,
    trailType: SelectInputDefaultValue,
    disposition: SelectInputDefaultValue,
    additionalRemarks: "",
    reasonForNonPayment: SelectInputDefaultValue,
    nextAction: SelectInputDefaultValue,
    ptpDate: "",
    ptpAmount: "",
  },
  secondaryInformation: {
    mobileNumber: "",
    address: "",
    pincode: "",
  },
  settlement: {
    paymentMode: "",
    paymentFrequency: 1,
    settlementAmount: "",
    settlementType: "",
    settlementStartDate: "",
    deferredAmount: "",
  },
  invalidFields: {
    basicInformation: {
      connectivity: { isInvalid: false, errorMessage: "" },
      trailType: { isInvalid: false, errorMessage: "" },
      disposition: { isInvalid: false, errorMessage: "" },
      additionalRemarks: { isInvalid: false, errorMessage: "" },
      reasonForNonPayment: { isInvalid: false, errorMessage: "" },
      nextAction: { isInvalid: false, errorMessage: "" },
      ptpDate: { isInvalid: false, errorMessage: "" },
      ptpAmount: { isInvalid: false, errorMessage: "" },
    },
    secondaryInformation: {
      mobileNumber: { isInvalid: false, errorMessage: "" },
      address: { isInvalid: false, errorMessage: "" },
      pincode: { isInvalid: false, errorMessage: "" },
    },
    settlement: {
      paymentFrequency: { isInvalid: false, errorMessage: "" },
      paymentMode: { isInvalid: false, errorMessage: "" },
      settlementAmount: { isInvalid: false, errorMessage: "" },
      settlementType: { isInvalid: false, errorMessage: "" },
      settlementStartDate: { isInvalid: false, errorMessage: "" },
      deferredAmount: { isInvalid: false, errorMessage: "" },
    },
  },
}

export const trailSlice = createSlice({
  name: "trail-update",
  initialState,
  reducers: {
    resetTrailFields(state: TrailState) {
      state.basicInformation = initialState.basicInformation
      state.secondaryInformation = initialState.secondaryInformation
      state.invalidFields = initialState.invalidFields
    },
    setInvalidFields: setInvalidFields,
    resetForm(state: TrailState) {
      state.basicInformation = initialState.basicInformation
      state.secondaryInformation = initialState.secondaryInformation
    },

    //Basic information
    setConnectivity: createSetState("basicInformation", "connectivity"),
    setTrailType: createSetState("basicInformation", "trailType"),
    setDisposition: createSetState("basicInformation", "disposition"),
    setAdditionalRemarks: createSetState("basicInformation", "additionalRemarks"),
    setReasonForNonPayment: createSetState("basicInformation", "reasonForNonPayment"),
    setNextAction: createSetState("basicInformation", "nextAction"),
    setPtpDate: createSetState("basicInformation", "ptpDate"),
    setPtpAmount: createSetState(
      "basicInformation",
      "ptpAmount",
      (value) => !value || validate(value).is.valid("number")
    ),

    //Secondary Information
    setMobileNumber: createSetState(
      "secondaryInformation",
      "mobileNumber",
      (value) => !value || validate(value).is.valid("number")
    ),
    setAddress: createSetState("secondaryInformation", "address"),
    setPincode: createSetState(
      "secondaryInformation",
      "pincode",
      (value) => !value || validate(value).is.valid("number")
    ),
    setPaymentMode: createSetState("settlement", "paymentMode"),
    setPaymentFrequency: createSetState("settlement", "paymentFrequency"),
    setSettlementAmount: createSetState("settlement", "settlementAmount"),
    setSettlementType: createSetState("settlement", "settlementType"),
    setDeferredAmount: createSetState("settlement", "deferredAmount"),
    setSettlementStartDate: createSetState("settlement", "settlementStartDate"),
  },
})

export const trailAction = trailSlice.actions

export default trailSlice.reducer
