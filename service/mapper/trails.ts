import { OptionType } from "components/SelectInput/SelectInput"
import { safelyConvertStringToNumber } from "utils"
import { processMasterData } from "utils/helpers"

export const TrailsMasterDataMapper = {
  "data.connectivity": {
    key: "connectivity",
    default: [],
    transform: processMasterData,
  },
  "data.dispositions": {
    key: "dispositions",
    default: [],
    transform: processMasterData,
  },
  "data.reason_for_non_payment": {
    key: "reasonForNonPayment",
    default: [],
    transform: processMasterData,
  },
  "data.trail_type": {
    key: "trailType",
    default: [],
    transform: processMasterData,
  },
  "data.next_action": {
    key: "nextAction",
    default: [],
    transform: processMasterData,
  },
}

export type TrailsMasterDataMapperType = {
  connectivity: Array<OptionType>
  dispositions: Array<OptionType>
  reasonForNonPayment: Array<OptionType>
  trailType: Array<OptionType>
  nextAction: Array<OptionType>
}

export const UpdateTrailPayloadMapper = {
  // TODO - here allocationId should be used
  "basicInformation.allocationId": { key: "trail.allocation_id", default: 1, transform: safelyConvertStringToNumber },
  "basicInformation.connectivity": "trail.connectivity",
  "basicInformation.trailType": { key: "trail.trail_type_id", transform: safelyConvertStringToNumber },
  "basicInformation.disposition": { key: "trail.disposition_id", transform: safelyConvertStringToNumber },
  // TODO - use this valid sub disposition value
  "basicInformation.subDispositionId": { key: "trail.sub_disposition_id", default: 11 },
  "basicInformation.reasonForNonPayment": {
    key: "trail.reason_for_non_payment_id",
    transform: safelyConvertStringToNumber,
  },
  "basicInformation.additionalRemarks": "trail.additional_remarks",
  "basicInformation.nextAction": { key: "trail.next_action_id", transform: safelyConvertStringToNumber },
  // TODO - use valid lat and lon
  "basicInformation.coords": { key: "trail.coords", default: { lat: "11.45", lng: "77.78" } },
  "secondaryInformation.mobileNumber": "secondary_contact_details.mobile_number",
  "secondaryInformation.address": "secondary_contact_details.address",
  "secondaryInformation.pincode": "secondary_contact_details.pincode",
  "basicInformation.ptpDate": "ptp.date",
  "basicInformation.ptpAmount": "ptp.amount",
}

export const UpdateTrailSettlementPayloadMapper = {
  "settlement.settlementAmount": "settlement.amount",
  "settlement.settlementType": "settlement.settlement_type",
  "settlement.paymentMode": "settlement.payment_mode",
  "settlement.paymentFrequency": "settlement.payment_frequency",
  "settlement.settlementStartDate": "settlement.start_date",
  "settlement.deferredAmount": "settlement.deferred_amount",
}

export const UpdateTrailResponseMapper = {
  "data.trail_id": "trailId",
}

export type UpdateTrailResponseMapperType = {
  trailId: number
}

export const sendPaymentLinkMapper = {
  applicationId: "payment.application_id",
  amount: "payment.amount",
  paymentMode: "payment.payment_mode",
  paymentLink: "payment.send_option",
  mobile: "payment.mobile",
  email: "payment.email",
}

export type PaymentModesMapperType = {
  paymentModes: Array<OptionType>
}

export const PaymentModesMapper = {
  data: {
    key: "paymentModes",
    default: [],
  },
}

export type PaymentCommunicationLinksMapperType = {
  paymentLinks: Array<OptionType>
}

export const PaymentCommunicationLinksMapper = {
  data: {
    key: "paymentLinks",
    default: [],
  },
}

export const FetchDueAmountMapper = {
  data: {
    key: "amount",
    default: "",
  },
}

export type FetchDueAmountMapperType = {
  amount: string
}
