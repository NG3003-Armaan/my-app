import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import _ from "lodash"
import { OptionType, SelectInputDefaultValue, SelectInputDefaultValueType } from "components/SelectInput/SelectInput"
import { ActivityStatus } from "enums"
import { createSetState, setInvalidFields } from "store/utility"
import { UploadedDocumentType } from "types"
import { ValidationResults } from "types/store"

interface AgentDetail {
  id: number
  agentName: string
  agencyCode: number
  renewalContract: string
  status: ActivityStatus
}

export interface AgentState {
  searchedAgentDetail: AgentDetail | null
  searchQuery: { value: number; label: string } | null
  agencyNames: Array<OptionType>
  employees: Array<OptionType>

  primaryDetails: {
    agentName: string
    agentDesignation: string
    agencyId: string | SelectInputDefaultValueType<string>
    email: string
    mobileNumber: string
    reportingManager: string | SelectInputDefaultValueType<string>
  }
  addressDetails: {
    registeredAddress: string
    city: string | SelectInputDefaultValueType<string>
    state: string | SelectInputDefaultValueType<string>
    postalCode: string
  }
  documentDetails: {
    idProof: UploadedDocumentType | null
    addressProof: UploadedDocumentType | null
    agencyIdCard: UploadedDocumentType | null
    circleHeadApproval: UploadedDocumentType | null
  }

  invalidFields: ValidationResults<
    Omit<AgentState, "agencyNames" | "employees" | "searchedAgentDetail" | "searchQuery">
  >
}

const initialState: AgentState = {
  agencyNames: [],
  employees: [],
  searchedAgentDetail: null,
  searchQuery: null,
  primaryDetails: {
    agentName: "",
    agentDesignation: "",
    agencyId: SelectInputDefaultValue,
    email: "",
    mobileNumber: "",
    reportingManager: SelectInputDefaultValue,
  },
  addressDetails: {
    city: SelectInputDefaultValue,
    state: SelectInputDefaultValue,
    postalCode: "",
    registeredAddress: "",
  },
  documentDetails: {
    idProof: null,
    addressProof: null,
    agencyIdCard: null,
    circleHeadApproval: null,
  },

  invalidFields: {
    primaryDetails: {
      email: { isInvalid: false, errorMessage: "" },
      mobileNumber: { isInvalid: false, errorMessage: "" },
      agentName: { isInvalid: false, errorMessage: "" },
      agencyId: { isInvalid: false, errorMessage: "" },
      agentDesignation: { isInvalid: false, errorMessage: "" },
      reportingManager: { isInvalid: false, errorMessage: "" },
    },
    addressDetails: {
      city: { isInvalid: false, errorMessage: "" },
      state: { isInvalid: false, errorMessage: "" },
      postalCode: { isInvalid: false, errorMessage: "" },
      registeredAddress: { isInvalid: false, errorMessage: "" },
    },
    documentDetails: {
      idProof: { isInvalid: false, errorMessage: "" },
      addressProof: { isInvalid: false, errorMessage: "" },
      agencyIdCard: { isInvalid: false, errorMessage: "" },
      circleHeadApproval: { isInvalid: false, errorMessage: "" },
    },
  },
}

export const agentSlice = createSlice({
  name: "user-management/agent",
  initialState,
  reducers: {
    resetAgentDetails(state: AgentState) {
      state.addressDetails = initialState.addressDetails
      state.primaryDetails = initialState.primaryDetails
    },

    // Primary details
    setAgentName: createSetState("primaryDetails", "agentName"),
    setAgencyId: createSetState("primaryDetails", "agencyId"),
    setAgentDesignation: createSetState("primaryDetails", "agentDesignation"),
    setMobileNumber: createSetState("primaryDetails", "mobileNumber"),
    setEmail: createSetState("primaryDetails", "email"),
    setReportingManager: createSetState("primaryDetails", "reportingManager"),

    // AddressDetails
    setRegisteredAddress: createSetState("addressDetails", "registeredAddress"),
    setCity: createSetState("addressDetails", "city"),
    setState: createSetState("addressDetails", "state"),
    setPostalCode: createSetState("addressDetails", "postalCode"),

    // Document Details
    setIdProofDocument: createSetState("documentDetails", "idProof"),
    setAddressProofDocument: createSetState("documentDetails", "addressProof"),
    setAgencyIdCard: createSetState("documentDetails", "agencyIdCard"),
    setCircleHeadApprovalDocument: createSetState("documentDetails", "circleHeadApproval"),
    setInvalidFields: setInvalidFields,

    setAgencyNames: createSetState("agencyNames"),
    setEmployees: createSetState("employees"),

    setSearchQuery: createSetState("searchQuery"),
    setSearchedAgentDetail: createSetState("searchedAgentDetail"),
    setSearchedAgentDetailStatus(state: AgentState, action: PayloadAction<{ activityStatus: ActivityStatus }>) {
      if (state.searchedAgentDetail) {
        state.searchedAgentDetail.status = action.payload.activityStatus
      }
    },
    resetSearchResult(state: AgentState) {
      state.searchQuery = null
      state.searchedAgentDetail = null
    },
  },
})

export const agentActions = agentSlice.actions

export default agentSlice.reducer
