import { OptionType } from "components/SelectInput/SelectInput"
import { safelyConvertStringToNumber } from "utils"
import { processMasterData } from "utils/helpers"

export const ReceiptsMapper = {
  "data.receipts": {
    key: "receipts",
    default: [],
    transform: (
      data: Array<{
        id: number
        date: string
        amount: string
        payment_mode: string // TODO maybe we can use some other type for this.
        application_id: number | null
      }>
    ) => {
      return data.map((d) => ({
        id: d.id,
        date: d.date,
        amount: safelyConvertStringToNumber(d.amount) ?? 0,
        paymentMode: d.payment_mode,
        applicationId: d.application_id,
      }))
    },
  },
}

export type ReceiptsMapperType = {
  receipts: Array<{
    id: number
    date: string
    amount: string
    paymentMode: string // TODO maybe we can use some other type for this.
    applicationId: number | null
  }>
}

export const AcknowledgeReceiptsMapper = {
  receipts: {
    key: "receipts",
    default: [],
    transform: (data: Array<{ id: number; transactionId: string; status: string }>) => {
      return data.map((d) => ({ id: d.id, txn_id: d.transactionId, status: d.status }))
    },
  },
}

export type AcknowledgeReceiptsMapperType = {
  receipts: Array<{ id: number; txn_id: string; status: string }>
}

export const CreateReceiptsPayloadMapper = {
  allocationId: { key: "allocation_id", transform: safelyConvertStringToNumber },
  paymentMode: { key: "payment_mode_id", transform: safelyConvertStringToNumber },
  amount: { key: "amount", transform: safelyConvertStringToNumber },
  agentPanNumber: "agent_pan_no",
  coords: {
    key: "coords",
    default: { lat: "11.56", lng: "77.78" },
  },
}

export const CreateReceiptsResponseMapper = {
  "data.receipt_id": "receiptId",
}

export type CreateReceiptsResponseMapperType = {
  receiptId: number
}

export const ReceiptsMasterDataMapper = {
  "data.payment_modes": {
    key: "paymentModes",
    default: [],
    transform: processMasterData,
  },
}

export type ReceiptsMasterDataMapperType = {
  paymentModes: Array<OptionType>
}
