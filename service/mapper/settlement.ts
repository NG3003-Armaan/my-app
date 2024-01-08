import { OptionType } from "components/SelectInput/SelectInput"
import { processPayload } from "utils"
import { MasterDataDropDownInputType, processMasterData } from "utils/helpers"

export const SettlementTypesMapper = {
  data: {
    key: "settlementTypes",
    default: [],
    transform: (data: Array<MasterDataDropDownInputType>) => {
      return processMasterData(data)
    },
  },
}

export type SettlementTypesMapperType = {
  settlementTypes: Array<OptionType>
}

type Settlement = {
  id: number
  appId: number
  businessName: string
  dpd: string
  agentName: string
  settlementDate: string
  customerRemarks: string
  asStatus: string // TODO - maybe we have use some other type here
}

const SettlementMapper = {
  app_id: "appId",
  id: "id",
  business_name: "businessName",
  dpd: "dpd",
  agent_name: "agentName",
  date: "settlementDate",
  customer_remarks: "customerRemarks",
  as_status: "asStatus",
}

export type SettlementsMapperType = {
  settlements: Array<Settlement>
}

export const SettlementsMapper = {
  data: {
    key: "settlements",
    default: [],
    transform: (
      data: Array<{
        app_id: number
        bussiness_name: string
        dpd: string
        agent_name: string
        date: string
        customer_remarks: string
        as_status: string
      }>
    ) => {
      return data.map((e) => processPayload(e, SettlementMapper))
    },
  },
}

export type SettlementInfoMapperType = {
  settlementAmount: number
  settlementType: string
  deferredAmount: number
  settlementStartDate: string
  paymentMode: string
  paymentFrequency: number
  paymentDates: Array<string>
  wavier: string
  asRemarks: string
  settlementDocuments?: Array<string>
}

export const SettlementInfoMapper = {
  "data.id": "id",
  "data.settlement_type": "settlementType",
  "data.amount": "settlementAmount",
  "data.payment_frequency": "paymentFrequency",
  "data.payment_mode": "paymentMode",
  "data.deferred_amount": "deferredAmount",
  "data.start_date": "settlementStartDate",
  "data.wavier": "wavier",
  "data.as_remarks": "asRemarks",
  "data.documents": { key: "settlementDocuments", default: [] },
  "data.payment_dates": { key: "paymentDates", default: [] },
}
