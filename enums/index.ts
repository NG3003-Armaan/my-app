// TODO - rename this to something else
export const enum Role {
  CollectionAgent = "Collection Agent",
  CollectionManager = "Collection Manager",
  RegionalCollection = "Reginoal Collection",
  Manager = "Manager",
  CircleHead = "Circle Head",
  ChiefBusinessOffier = "Chief Business Officer",
}

export const enum RequestStatus {
  Approve = "Approve",
  Reject = "Reject",
}

export const enum ActivityStatus {
  Enable = "enable",
  TemporaryDisable = "disable",
  PermanentlyDisable = "Permanent Disable",
}

export const enum PriorityBucket {
  P1A_P1B = "P1A_P1B",
  P2 = "P2",
  P3 = "P3",
  P4A_P4B = "P4A_P4B",
  P5 = "P5",
}

export const enum Criticality {
  VERY_HIGH = "Very High",
  HIGH = "High",
  MEDIUM = "Medium",
}

export const enum Propensity {
  HIGH = "High",
  LOW = "Low",
}

export const enum ResolutionRate {
  BELOW_25 = "<25%",
  BETWEEN_25_50 = "25-50%",
  BETWEEN_50_75 = "50-75%",
  BETWEEN_75_100 = "75-100%",
}

export const enum Connectivity {
  YES = "Yes",
  NO = "No",
}

export const enum TrailTypes {
  FIELD_BUSINESS = "Field Business",
  FIELD_RESIDENTIAL = "Field Residential",
  TELE_CALLING = "Tele-calling",
  RCM_AND_ABOVE = "RCM and Above",
}

export const enum Disposition {
  NO_INTENTION_TO_PAY = "No Intention To pay",
  OUT_OF_STATION = "Out of station",
  PROMISE_TO_PAY = "Promise to pay",
  CUSTOMER_DECEASED = "Customer deceased",
  LEGAL_FOLLOW_UP = "Legal follow up",
  DISPUTE = "Dispute",
  REQUESTED_TO_VISIT_AFTER_A_SUITABLE_TIME = "Requested to visit after a suitable time",
  SETTLEMENT_REQUESTED = "Settlement requested",
  SETTLEMENT_CLOSED = "Settlement closed",
  PAYMENT_RECEIVED = "Payment received",
  SUPERVISORY_REVIEW = "Supervisory review",
  PICKUP = "Pick Up",
  NOT_TRACEABLE = "Not traceable",
}

export const enum ReasonForNonPayment {
  FACED_HUGED_BUSINESS_LOASS = "Faced huged business loss",
  TEMPORARAY_CRUNCH = "Temporary crunch",
  BUSINESS_IS_SHUT_DOWN = "Business is shut down",
  DISPUTE_FOR_OVERDUE_AMOUNT = "Dispute for overdue amount",
  CUSTOMER_DECEASED = "Customer Deceased",
  NATURAL_CIRCUMSTANCES = "Natural circumstances",
  PTP = "PTP",
  CUSTOMER_DENIED_TO_PAY = "Customer Denied to pay",
  CUSTOMER_IS_NOT_TRACEABLE = "Customer is not traceable",
  CUSTOMER_HAVING_DISPUTE = "Customer having dispute",
}

export const enum Revisit {
  REVISIT = "Revisit",
  SUPERVISORY_REVIEW = "Supervisory review",
  REALLOCATE = "Reallocate",
}
