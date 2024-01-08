type customerDetailsType = {
  firstName: string
  middleName: string
  lastName: string
  emailId: string
  mobile: string
  product: string
  state: string
  region: string
  city: string
  industry: string
  residential: {
    pincode: string
    address: string
  }
  business: {
    pincode: string
    address: string
  }
}

export type CustomerDetailsTypeMapper = {
  customerDetails: customerDetailsType
}

export const CustomerDetailsMapper = {
  "data.first_name": "customerDetails.firstName",
  "data.middle_name": "customerDetails.middleName",
  "data.last_name": "customerDetails.lastName",
  "data.email_id": "customerDetails.emailId",
  "data.mobile": "customerDetails.mobile",
  "data.product": "customerDetails.product",
  "data.city": "customerDetails.city",
  "data.state": "customerDetails.state",
  "data.region": "customerDetails.region",
  "data.residential.pincode": "customerDetails.residential.pincode",
  "data.residential.address": "customerDetails.residential.address",
  "data.business.pincode": "customerDetails.business.pincode",
  "data.business.address": "customerDetails.business.address",
  "data.industry": "industry",
}

type loanDetailsType = {
  pbal: string
  lbal: string
  dpd: string | number
  fundingAmount: string
  fundingDate: string
  emi: string | number
  actual_recovery: string | number
}

export type LoanDetailsMapperType = {
  loanDetails: loanDetailsType
}

export const LoanDetailsMapper = {
  "data.pbal": "loanDetails.pbal",
  "data.lbal": "loanDetails.lbal",
  "data.dpd": "loanDetails.dpd",
  "data.funding_amount": "loanDetails.fundingAmount",
  "data.funding_date": "loanDetails.fundingDate",
  "data.emi": "loanDetails.emi",
  "data.actual_recovery": "loanDetails.actualRecovery",
}

type paymentHistoryType = {
  amount: string
  source: string
  date: string
}

export type PaymentHistoryMapperType = {
  paymentHistory: Array<paymentHistoryType>
}

export const PaymentHistoryMapper = {
  data: {
    key: "paymentHistory",
    default: [],
    transform: (
      data: Array<{
        amount: string
        source: string
        date: string
      }>
    ) => {
      return data.map((item) => ({
        ...item,
      }))
    },
  },
}

type settlementHistoryType = {
  settlementStartDate: string
  amount: string | number
  type: string | number
  paymentMode: string | number
  approvalDate: string
  finalApprovalBy: string
  raisedBy: string
  remarks: string
  settlementEndDate: string
}

export type SettlementHistoryMapperType = {
  settlementHistory: Array<settlementHistoryType>
}

export const SettlementHistoryMapper = {
  data: {
    key: "settlementHistory",
    default: [],
    transform: (
      data: Array<{
        start_date: string
        amount: string | number
        type: string | number
        payment_mode: string | number
        approval_date: string
        final_approval_by: string
        raised_by: string
        remarks: string
        end_date: string
      }>
    ) => {
      return data.map((item) => ({
        ...item,
        settlementStartDate: item.start_date,
        paymentMode: item.payment_mode,
        approvalDate: item.approval_date,
        finalApprovalBy: item.final_approval_by,
        raisedBy: item.raised_by,
        settlementEndDate: item.end_date,
      }))
    },
  },
}

type trailHistoryType = {
  date: string
  vistType: string
  dispositionCode: string
  remarks: string
  agentName: string
}

export type TrailHistoryMapperType = {
  trailHistory: Array<trailHistoryType>
}

export const TrailHistoryMapper = {
  data: {
    key: "trailHistory",
    default: [],
    transform: (
      data: Array<{
        date: string
        vist_type: string
        disposition_code: string
        remarks: string
        agent_name: string
      }>
    ) => {
      return data.map((item) => ({
        ...item,
        vistType: item.vist_type,
        dispositionCode: item.disposition_code,
        agentName: item.agent_name,
      }))
    },
  },
}

type allocationHistoryType = {
  allocationDate: string
  expiryDate: string
  agentName: string
  agentType: string
}

export type AllocationHistoryMapperType = {
  allocationHistory: Array<allocationHistoryType>
}

export const AllocationHistoryMapper = {
  data: {
    key: "allocationHistory",
    default: [],
    transform: (
      data: Array<{
        allocation_date: string
        expiry_date: string
        agent_name: string
        agent_type: string
      }>
    ) => {
      return data.map((item) => ({
        allocationDate: item.allocation_date,
        expiryDate: item.expiry_date,
        agentName: item.agent_name,
        agentType: item.agent_type,
      }))
    },
  },
}
