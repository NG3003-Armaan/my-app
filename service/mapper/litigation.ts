import { OptionType } from "components/SelectInput/SelectInput"

type EligibleBaseTypes = {
  appId: string
  name: string
  dpd: string
  pbal: string
  location: string
  loanAmount: string
  history: string
}

export type EligibleBaseMapperType = {
  eligibleBase: Array<EligibleBaseTypes>
}

export const EligibleBaseMapper = {
  data: {
    key: "eligibleBase",
    default: [],
    transform: (
      data: Array<{
        app_id: string
        name: string
        dpd: string
        pbal: string
        location: string
        loanAmount: string
        history: string
      }>
    ) => {
      return data.map((item) => ({
        ...item,
        appId: item.app_id,
        location: "Hyderabad",
        loanAmount: "12L",
        history: "LRN",
      }))
    },
  },
}

interface FinalBaseType {
  appId: string | number
  name: string
  dpd: string
  pbal: string
  activity: string
}

export type FinalBaseMapperType = {
  finalBase: Array<FinalBaseType>
  caseActions: Array<OptionType>
}

export const FinalBaseMapper = {
  "data.final_base": {
    key: "finalBase",
    default: [],
    transform: (
      data: Array<{
        app_id: number | string
        name: string
        dpd: string
        pbal: string
        activity: string
      }>
    ) => {
      return data.map((item) => ({
        ...item,
        activity: item.activity.toLocaleUpperCase(),
        appId: item.app_id,
      }))
    },
  },
  "data.case_actions": {
    key: "caseActions",
    default: [],
    transform: (
      data: Array<{
        id: number
        value: string
        title: string
      }>
    ) => {
      return data.map((item) => ({
        ...item,
      }))
    },
  },
}

type LegalStatusType = {
  appId: number | string
  name: string
  dpd: string
  pbal: string
  status: string
  location: string
  loan: string
}

export type LegalStatusMapperType = {
  legalStatus: Array<LegalStatusType>
}

export const LegalStatusMapper = {
  data: {
    key: "legalStatus",
    default: [],
    transform: (
      data: Array<{
        app_id: number | string
        name: string
        dpd: string
        pbal: string
        location: string
        loan: string
        status: string | null
      }>
    ) => {
      return data.map((item) => ({
        ...item,
        appId: item.app_id,
        location: "Benguluru",
        loan: "12L",
      }))
    },
  },
}

type PartialBaseType = {
  appId: String | number
  name: string
  dpd: string
  pbal: string
  activity: string
  remarks: string
  location: string
  loanAmount: string
}

export type PartialBaseMapperType = {
  partialBase: Array<PartialBaseType>
  caseActions: Array<OptionType>
}

export const PartialBaseMapper = {
  "data.partial_base": {
    key: "partialBase",
    default: [],
    transform: (
      data: Array<{
        app_id: String | number
        name: string
        dpd: string
        pbal: string
        activity: string
        location: string
        loan_amount: string
        remarks: string
      }>
    ) => {
      return data.map((item) => ({
        ...item,
        appId: item.app_id,
        location: "Benguluru",
        loanAmount: "12L",
      }))
    },
  },
  "data.case_actions": {
    key: "caseActions",
    default: [],
    transform: (
      data: Array<{
        id: number
        value: string
        title: string
      }>
    ) => {
      return data.map((item) => ({
        ...item,
      }))
    },
  },
}

type pendingCaseType = {
  appId: string | number
  name: string
  dpd: string
  pbal: string
  location: string
  loanAmount: string
  activity: string
}

export type PendingCasesMapperType = {
  pendingCases: Array<pendingCaseType>
  approvalActions: Array<OptionType>
  partialApproveReasons: Array<OptionType>
}

export const PendingCasesMapper = {
  "data.pending_cases": {
    key: "pendingCases",
    default: [],
    transform: (
      data: Array<{
        app_id: string | number
        name: string
        dpd: string
        pbal: string
        location: string
        loan_amount: string
        activity: string
      }>
    ) => {
      return data.map((item) => ({
        ...item,
        appId: item.app_id,
        activity: item.activity.toLocaleUpperCase(),
        location: "Benguluru",
        loanAmount: "15L",
      }))
    },
  },
  "data.approval_actions": {
    key: "approvalActions",
    default: [],
    transform: (
      data: Array<{
        id: number
        value: string
        title: string
      }>
    ) => {
      return data.map((item) => ({
        ...item,
      }))
    },
  },
  "data.partial_approve_reasons": {
    key: "partialApproveReasons",
    default: [],
    transform: (
      data: Array<{
        id: number
        value: string
        title: string
      }>
    ) => {
      return data.map((item) => ({
        ...item,
      }))
    },
  },
}
