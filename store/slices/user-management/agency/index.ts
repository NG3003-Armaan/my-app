import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import _ from "lodash"

import { OptionType, SelectInputDefaultValue, SelectInputDefaultValueType } from "components/SelectInput/SelectInput"
import { ActivityStatus } from "enums"
import { createSetState, setInvalidFields } from "store/utility"
import { UploadedDocumentType } from "types"
import { ValidationResults } from "types/store"

interface ExistingAgency {
  agencyName: string
  renewalContract: string
  status: ActivityStatus
  id: number
}

export interface AgencyState {
  agencies: Array<OptionType>
  reportingManagers: Array<OptionType>
  agencyTypes: Array<OptionType>

  /* Add Agency */
  primaryDetails: {
    agencyName: string
    agencyType: string
    panCard: string
    gstinNumber: string
    reportingManager: SelectInputDefaultValueType<string>
  }

  addressDetails: {
    registeredAddress: string
    city: string
    state: string
    postalCode: string
  }

  documentDetails: {
    signedAgreement: UploadedDocumentType | null
    kycProof: UploadedDocumentType | null
    bankProof: UploadedDocumentType | null
    itr: UploadedDocumentType | null
  }

  agreementAndRenewalDetails: {
    firstAgreementDate: string
    lastRenewalDate: string
    contractExpiryDate: string
    remarks: string
  }

  invalidFields: ValidationResults<
    Omit<AgencyState, "agencyTypes" | "searchedAgency" | "agencies" | "reportingManagers" | "searchQuery">
  >

  /* Manage Agency */
  searchedAgency: ExistingAgency | null
  searchQuery: { value: number; label: string } | null
}

const initialState: AgencyState = {
  agencies: [],
  agencyTypes: [],
  reportingManagers: [],

  primaryDetails: {
    agencyName: "",
    agencyType: "",
    panCard: "",
    gstinNumber: "",
    reportingManager: SelectInputDefaultValue,
  },

  addressDetails: {
    registeredAddress: "",
    city: "",
    state: "",
    postalCode: "",
  },

  // TODO - for now we don't need this
  documentDetails: {
    signedAgreement: null,
    kycProof: null,
    bankProof: null,
    itr: null,
  },

  agreementAndRenewalDetails: {
    firstAgreementDate: "",
    lastRenewalDate: "",
    contractExpiryDate: "",
    remarks: "",
  },

  invalidFields: {
    primaryDetails: {
      agencyName: { isInvalid: false, errorMessage: "" },
      agencyType: { isInvalid: false, errorMessage: "" },
      panCard: { isInvalid: false, errorMessage: "" },
      gstinNumber: { isInvalid: false, errorMessage: "" },
      reportingManager: { isInvalid: false, errorMessage: "" },
    },

    addressDetails: {
      registeredAddress: { isInvalid: false, errorMessage: "" },
      city: { isInvalid: false, errorMessage: "" },
      state: { isInvalid: false, errorMessage: "" },
      postalCode: { isInvalid: false, errorMessage: "" },
    },

    documentDetails: {
      signedAgreement: { isInvalid: false, errorMessage: "" },
      kycProof: { isInvalid: false, errorMessage: "" },
      bankProof: { isInvalid: false, errorMessage: "" },
      itr: { isInvalid: false, errorMessage: "" },
    },

    agreementAndRenewalDetails: {
      firstAgreementDate: { isInvalid: false, errorMessage: "" },
      lastRenewalDate: { isInvalid: false, errorMessage: "" },
      contractExpiryDate: { isInvalid: false, errorMessage: "" },
      remarks: { isInvalid: false, errorMessage: "" },
    },
  },

  searchedAgency: null,
  searchQuery: null,
}

export const agencySlice = createSlice({
  name: "user-management/agency",
  initialState,
  reducers: {
    resetSearchResult(state: AgencyState) {
      state.searchQuery = null
      state.searchedAgency = null
    },

    resetAgencyDetails(state: AgencyState) {
      state.primaryDetails = initialState.primaryDetails
      state.addressDetails = initialState.addressDetails
      state.agreementAndRenewalDetails = initialState.agreementAndRenewalDetails
    },

    setInvalidFields: setInvalidFields,
    setAgencies: createSetState("agencies"),
    setAgencyTypes: createSetState("agencyTypes"),

    setSearchQuery: createSetState("searchQuery"),
    setReportingManagers: createSetState("reportingManagers"),

    /* Primary details */
    setAgencyName: createSetState("primaryDetails", "agencyName"),
    setAgencyType: createSetState("primaryDetails", "agencyType"),
    setPanCard: createSetState("primaryDetails", "panCard"),
    setGstinNumber: createSetState("primaryDetails", "gstinNumber"),
    setReportingManager: createSetState("primaryDetails", "reportingManager"),

    /* Address details */
    setRegisteredAddress: createSetState("addressDetails", "registeredAddress"),
    setCity: createSetState("addressDetails", "city"),
    setState: createSetState("addressDetails", "state"),
    setPostalCode: createSetState("addressDetails", "postalCode"),

    /* Document Details */
    setSignedAgreement: createSetState("documentDetails", "signedAgreement"),
    setKycProof: createSetState("documentDetails", "kycProof"),
    setBankProof: createSetState("documentDetails", "bankProof"),
    setItrProof: createSetState("documentDetails", "itr"),

    /* Agreement and Renewal Details */
    setFirstAgreementDate: createSetState("agreementAndRenewalDetails", "firstAgreementDate"),
    setLastRenewalDate: createSetState("agreementAndRenewalDetails", "lastRenewalDate"),
    setContractExpiryDate: createSetState("agreementAndRenewalDetails", "contractExpiryDate"),
    setRemarks: createSetState("agreementAndRenewalDetails", "remarks"),

    setSearchedAgency: createSetState("searchedAgency"),
    setSearchedAgencyStatus(state: AgencyState, action: PayloadAction<{ activityStatus: ActivityStatus }>) {
      if (state.searchedAgency) {
        state.searchedAgency.status = action.payload.activityStatus
      }
    },
  },
})

export const agencyAction = agencySlice.actions

export default agencySlice.reducer
