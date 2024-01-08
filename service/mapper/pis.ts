import { OptionType } from "components/SelectInput/SelectInput"

export const PisDashboardMapper = {
  "data.pis_penetration": {
    key: "pisPenetration",
    default: {
      pending: 0,
      acknowledged: 0,
      total: 0,
    },
  },
  "data.pis_acknowledgement_status.date_range_wise": {
    key: "dateRangeWise",
    default: {
      today: 0,
      weekly: 0,
      monthly: 0,
    },
  },
  "data.pis_acknowledgement_status.status_wise.matched": {
    key: "statusWise.matched",
    default: {
      matched: 0,
    },
  },
  "data.pis_acknowledgement_status.status_wise.mis_matched": {
    key: "statusWise.misMatched",
    default: {
      misMatched: 0,
    },
  },
  "data.location_wise_pis": {
    key: "locationWise",
    default: [],
    transform: (data: Array<{ location_name: string; count: number }>): Array<LocationWisePisType> => {
      return data.map((item) => ({
        locationName: item.location_name,
        count: item.count,
      }))
    },
  },
}

export type LocationWisePisType = {
  locationName: string
  count: number
}

export type PisDashboardMapperType = {
  pisPenetration: {
    pending: number
    acknowledged: number
    total: number
  }
  dateRangeWise: {
    today: number
    weekly: number
    monthly: number
  }
  statusWise: {
    matched: number
    misMatched: number
  }
  locationWise: Array<LocationWisePisType>
}

export type PendingPisType = {
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

export type PendingPisMapperType = {
  pendingPis: Array<PendingPisType>
}

export const PendingPisMapper = {
  "data.pending_pis": {
    key: "pendingPis",
    default: [],
    transform: (
      data: Array<{
        id: string
        date: string
        amount: string
        payment_mode: string
        txn_id: string
        application_id: string
        business_name: string
        acknowledged_user_name: string
        agent_name: string
      }>
    ) => {
      return data.map((item) => ({
        ...item,
        receiptDate: item.date,
        mode: item.payment_mode,
        receiptAmount: item.amount,
        transactionId: item.txn_id,
        appId: item.application_id,
        businessName: item.business_name,
        acknowledgedUserName: item.acknowledged_user_name,
        agentName: item.agent_name,
      }))
    },
  },
}

export const MisMatchedPisMapper = {
  "data.receipts": {
    key: "misMatchedPis",
    default: [],
    transform: (
      data: Array<{
        id: string
        date: string
        amount: string
        payment_mode: string
        txn_id: string
        action: string
        send_to_cm_reason: string
        application_id: string
      }>
    ) => {
      return data.map((item) => ({
        ...item,
        paymentMode: item.payment_mode,
        transactionId: item.txn_id,
        sendToCmReason: item.send_to_cm_reason,
        applicationId: item.application_id,
      }))
    },
  },
  "data.send_to_cm_reasons": {
    key: "sendToCmReasonsMasterData",
    default: [],
    transform: (
      data: Array<{
        id: string
        name: string
      }>
    ) => {
      return data.map((item) => ({
        id: item.id,
        value: item.id,
        title: item.name,
      }))
    },
  },
  "data.mis_matched_process": {
    key: "misMatchedProcessMasterData",
    default: [],
    transform: (
      data: Array<{
        id: string
        value: string
      }>
    ) => {
      return data.map((item) => ({
        id: item.id,
        value: item.id,
        title: item.value,
      }))
    },
  },
}

interface MisMatchedPisType {
  id: string
  date: string
  amount: string
  paymentMode: string
  transactionId: string
  action: string
  sendToCmReason: string
  applicationId: string
}

export type MisMatchedPisMapperType = {
  misMatchedPis: Array<MisMatchedPisType>
  sendToCmReasonsMasterData: Array<OptionType>
  misMatchedProcessMasterData: Array<OptionType>
}

export const SubmitMismatchedMapper = {
  applicationId: "mis_matched_receipts.id",
  action: "mis_matched_receipts.process",
  sendToCmReason: "mis_matched_receipts.send_to_cm_reason",
}

export const ManualAcknowledgePisMapper = {
  "data.receipts": {
    key: "manualAcknowledgePis",
    default: [],
    transform: (
      data: Array<{
        id: string | number
        date: string
        amount: string
        payment_mode: string
        txn_id: string
        ack_by: string
        application_id: string
      }>
    ) => {
      return data.map((item) => ({
        ...item,
        applicationId: item.application_id,
        paymentMode: item.payment_mode,
        transactionId: item.txn_id,
        acknowledgementUser: item.ack_by,
      }))
    },
  },
}

type manualAcknowledgePisType = {
  id: string
  date: string
  amount: string
  applicationId: string
  paymentMode: string
  transactionId: string
  acknowledgementUser: string
}

export type ManualAcknowledgePisMapperType = {
  manualAcknowledgePis: Array<manualAcknowledgePisType>
}

export const AcknowledgedPisMapper = {
  "data.receipts": {
    key: "acknowledgePis",
    default: [],
    transform: (
      data: Array<{
        id: string | number
        date: string
        amount: string
        payment_mode: string
        txn_id: string
        application_id: string
        acknowledged_user_name: string
        status: string
      }>
    ) => {
      return data.map((item) => ({
        ...item,
        paymentMode: item.payment_mode,
        transactionId: item.txn_id,
        applicationId: item.application_id,
        acknowledgedUser: item.acknowledged_user_name,
      }))
    },
  },
}

export type AcknowledgedPisType = {
  id: string | number
  date: string
  amount: string
  paymentMode: string
  transactionId: string
  applicationId: string
  acknowledgedUser: string
  status: string
}

export type AcknowledgedPisMapperType = {
  acknowledged: Array<AcknowledgedPisType>
}
