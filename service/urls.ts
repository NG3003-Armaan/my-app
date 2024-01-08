import { appConfig } from "config"

// user management

const LOGIN = `${appConfig.urls.COLLECTION_BACKEND_USER_MANAGEMENT}/api/v1/login`

const GET_ALLOCATION = `${appConfig.urls.COLLECTION_BACKEND_USER_MANAGEMENT}/api/v1/get_allocation`

const GET_APPLICATION = `${appConfig.urls.COLLECTION_BACKEND_USER_MANAGEMENT}/api/v1/get_application`

const GET_AGENTS = `${appConfig.urls.COLLECTION_BACKEND_USER_MANAGEMENT}/api/v1/agent`

const GET_NG_EMPLOYEES = `${appConfig.urls.COLLECTION_BACKEND_USER_MANAGEMENT}/api/v1/users`

const createNgEmployeeURL = (id: number) => `${appConfig.urls.COLLECTION_BACKEND_USER_MANAGEMENT}/api/v1/users/${id}`

const PINCODE_LOCATION_LOOKUP = `${appConfig.urls.COLLECTION_BACKEND_USER_MANAGEMENT}/api/v1/master/fetch_city_state`

const GET_AGENCIES = `${appConfig.urls.COLLECTION_BACKEND_USER_MANAGEMENT}/api/v1/agency`

const CREATE_AGENCY = `${appConfig.urls.COLLECTION_BACKEND_USER_MANAGEMENT}/api/v1/agency`

const createUpdateAgencyURL = (agencyCode: string | number) =>
  `${appConfig.urls.COLLECTION_BACKEND_USER_MANAGEMENT}/api/v1/agency/${agencyCode}`

const GET_AGENCY_TYPES = `${appConfig.urls.COLLECTION_BACKEND_USER_MANAGEMENT}/api/v1/agency/agency_types`

const createUpdateAgentURL = (agentCode: string | number) =>
  `${appConfig.urls.COLLECTION_BACKEND_USER_MANAGEMENT}/api/v1/agent/${agentCode}`

const CREATE_AGENT = `${appConfig.urls.COLLECTION_BACKEND_USER_MANAGEMENT}/api/v1/agent`

const createUpdateEmployeeURL = (employeeId: string | number) =>
  `${appConfig.urls.COLLECTION_BACKEND_USER_MANAGEMENT}/api/v1/users/${employeeId}`

const GET_ROLE_GROUP = `${appConfig.urls.COLLECTION_BACKEND_USER_MANAGEMENT}/api/v1/admin/role_group`

// Trial update
const TRAIL_MASTER_DATA = `${appConfig.urls.COLLECTION_BACKEND_PAYMENT_SERVICE}/api/v1/trails/new`

const PIS_DASHBOARD_DATA = `${appConfig.urls.COLLECTION_BACKEND_PAYMENT_SERVICE}/api/v1/pay_in_slips/dashboard`

const UPDATE_TRAIL = `${appConfig.urls.COLLECTION_BACKEND_PAYMENT_SERVICE}/api/v1/trails`

const SETTLEMENT_TYPES = `${appConfig.urls.COLLECTION_BACKEND_PAYMENT_SERVICE}/api/v1/settlement/fetch_settlement_types`

const PENDING_PIS = `${appConfig.urls.COLLECTION_BACKEND_PAYMENT_SERVICE}/api/v1/pay_in_slips/pending_pis`

const MIS_MATCHED_PIS = `${appConfig.urls.COLLECTION_BACKEND_PAYMENT_SERVICE}/api/v1/pay_in_slips/mis_matched_receipts`

const SUBMIT_MIS_MATCHED_PIS = `${appConfig.urls.COLLECTION_BACKEND_PAYMENT_SERVICE}/api/v1/pay_in_slips/submit_mis_matched_receipts`

const MANUAL_ACKNOWLEDGED_PIS = `${appConfig.urls.COLLECTION_BACKEND_PAYMENT_SERVICE}/api/v1/pay_in_slips/acknowledged_mis_matched_receipts`

const ACKNOWLEDGED_PIS = `${appConfig.urls.COLLECTION_BACKEND_PAYMENT_SERVICE}/api/v1/pay_in_slips`

const BULK_UPLOAD_AUM = `${appConfig.urls.COLLECTION_BACKEND_ALLOCATION}/allocation/bulk_upload`

const SETTLEMENTS = `${appConfig.urls.COLLECTION_BACKEND_PAYMENT_SERVICE}/api/v1/settlement`

const getSettlementInfo = (id: string | number) =>
  `${appConfig.urls.COLLECTION_BACKEND_PAYMENT_SERVICE}/api/v1/settlement/${id}/fetch_settlement_info`

const UPLOAD_LITIGATION_LEGAL_DOCS = `${appConfig.urls.COLLECTION_BACKEND_PAYMENT_SERVICE}/api/v1/litigation/upload_litigation_file`

const UPLOAD_LITIGATION_CASE_STATUS_FILE = `${appConfig.urls.COLLECTION_BACKEND_PAYMENT_SERVICE}/api/v1/litigation/upload_legal_status`

const SETTLEMENT_HISTORY = `${appConfig.urls.COLLECTION_BACKEND_PAYMENT_SERVICE}/api/v1/one_view/settlement_history`

const PAYMENT_HISTORY = `${appConfig.urls.COLLECTION_BACKEND_PAYMENT_SERVICE}/api/v1/one_view/payment_history`

const TRAIL_HISTORY = `${appConfig.urls.COLLECTION_BACKEND_PAYMENT_SERVICE}/api/v1/one_view/trail_history`

const ALLOCATION_HISTORY = `${appConfig.urls.COLLECTION_BACKEND_ALLOCATION}/one_view/fetch_history`

const CUSTOMER_DETAILS = `${appConfig.urls.COLLECTION_BACKEND_PAYMENT_SERVICE}/api/v1/one_view/customer_details`

const LOAN_DETAILS = `${appConfig.urls.COLLECTION_BACKEND_PAYMENT_SERVICE}/api/v1/one_view/loan_details`

const LITIGATION_ELIGIBLE_BASE = `${appConfig.urls.COLLECTION_BACKEND_PAYMENT_SERVICE}/api/v1/litigation/pull_eligible_base`

const LITIGATION_FINAL_BASE = `${appConfig.urls.COLLECTION_BACKEND_PAYMENT_SERVICE}/api/v1/litigation/pull_final_base`

const LITIGATION_PARTIAL_BASE = `${appConfig.urls.COLLECTION_BACKEND_PAYMENT_SERVICE}/api/v1/litigation/pull_partial_base`

const LITIGATION_CASE_STATUS = `${appConfig.urls.COLLECTION_BACKEND_PAYMENT_SERVICE}/api/v1/litigation/fetch_legal_status`

const LITIGATION_PENDING_CASES = `${appConfig.urls.COLLECTION_BACKEND_PAYMENT_SERVICE}/api/v1/litigation/fetch_pending_cases`

const SEND_PAYMENT_LINK = `${appConfig.urls.COLLECTION_BACKEND_PAYMENT_SERVICE}/api/v1/payment`

const GET_PAYMENT_LINK_COMMUNICATION_TYPES = `${appConfig.urls.COLLECTION_BACKEND_PAYMENT_SERVICE}/api/v1/payment/payment_link_options`

const GET_PAYMENT_MODES = `${appConfig.urls.COLLECTION_BACKEND_PAYMENT_SERVICE}/api/v1/payment/payment_modes`

const FETCH_DUE_AMOUNT = `${appConfig.urls.COLLECTION_BACKEND_PAYMENT_SERVICE}/api/v1/payment/fetch_due_amount`

const GET_RECEIPTS = `${appConfig.urls.COLLECTION_BACKEND_PAYMENT_SERVICE}/api/v1/receipts`

const ACKNOWLEDGE_RECEIPTS = `${appConfig.urls.COLLECTION_BACKEND_PAYMENT_SERVICE}/api/v1/receipts/acknowledge_receipt`

const UPLOAD_RECEIPTS_IMAGE = `${appConfig.urls.COLLECTION_BACKEND_PAYMENT_SERVICE}/api/v1/receipts/upload_receipt_image`

const CREATE_RECEIPT = `${appConfig.urls.COLLECTION_BACKEND_PAYMENT_SERVICE}/api/v1/receipts`

const RECEIPTS_MASTER_DATA = `${appConfig.urls.COLLECTION_BACKEND_PAYMENT_SERVICE}/api/v1/receipts/new`

export const urls = {
  LOGIN,
  GET_ALLOCATION,
  GET_APPLICATION,
  GET_AGENTS,
  GET_NG_EMPLOYEES,
  createNgEmployeeURL,
  PINCODE_LOCATION_LOOKUP,
  GET_AGENCIES,
  createUpdateAgencyURL,
  GET_AGENCY_TYPES,
  CREATE_AGENCY,
  createUpdateAgentURL,
  CREATE_AGENT,
  createUpdateEmployeeURL,
  GET_ROLE_GROUP,
  TRAIL_MASTER_DATA,
  PIS_DASHBOARD_DATA,
  UPDATE_TRAIL,
  SETTLEMENT_TYPES,
  PENDING_PIS,
  MIS_MATCHED_PIS,
  SUBMIT_MIS_MATCHED_PIS,
  MANUAL_ACKNOWLEDGED_PIS,
  ACKNOWLEDGED_PIS,
  BULK_UPLOAD_AUM,
  SETTLEMENTS,
  getSettlementInfo,
  UPLOAD_LITIGATION_LEGAL_DOCS,
  UPLOAD_LITIGATION_CASE_STATUS_FILE,
  SETTLEMENT_HISTORY,
  PAYMENT_HISTORY,
  TRAIL_HISTORY,
  ALLOCATION_HISTORY,
  CUSTOMER_DETAILS,
  LOAN_DETAILS,
  LITIGATION_ELIGIBLE_BASE,
  LITIGATION_FINAL_BASE,
  LITIGATION_PARTIAL_BASE,
  LITIGATION_CASE_STATUS,
  LITIGATION_PENDING_CASES,
  SEND_PAYMENT_LINK,
  GET_PAYMENT_LINK_COMMUNICATION_TYPES,
  GET_PAYMENT_MODES,
  FETCH_DUE_AMOUNT,
  ACKNOWLEDGE_RECEIPTS,
  GET_RECEIPTS,
  UPLOAD_RECEIPTS_IMAGE,
  CREATE_RECEIPT,
  RECEIPTS_MASTER_DATA,
}
