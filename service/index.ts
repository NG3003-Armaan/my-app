import { AxiosResponse } from "axios"
import { ActivityStatus } from "enums"
import { AllocationState } from "store/slices/allocation"
import { MisMatchedPisType } from "store/slices/pis"
import { ReceiptState } from "store/slices/receipts"
import { TrailState } from "store/slices/trail"
import { AgencyState } from "store/slices/user-management/agency"
import { AgentState } from "store/slices/user-management/agent"

import {
  AgenciesMapper,
  AgenciesMapperType,
  AgencyMapper,
  AgencyTypesMapper,
  AgencyTypesMapperType,
  CreateAgencyPayloadMapper,
  CreateAgencyResponseMapper,
  CreateAgencyResponseMapperType,
  CreateAgentPayloadMapper,
  CreateAgentResponseMapper,
  CreateAgentResponseMapperType,
  GetRoleGroupMapper,
  GetRoleGroupMapperType,
  RoleGroup,
  RoleGroupMapper,
} from "store/slices/user-management/ng-employee/mapper"
import { NgEmployee } from "types/interface"
import { processPayload } from "utils"
import { getCreateTrailPayload } from "utils/helpers/trails"
import axios, { AxiosResponseError } from "./axios"
import {
  EligibleBaseMapper,
  EligibleBaseMapperType,
  FinalBaseMapper,
  FinalBaseMapperType,
  LegalStatusMapper,
  LegalStatusMapperType,
  PartialBaseMapper,
  PartialBaseMapperType,
  PendingCasesMapper,
  PendingCasesMapperType,
} from "./mapper/litigation"
import {
  AllocationHistoryMapper,
  AllocationHistoryMapperType,
  CustomerDetailsMapper,
  CustomerDetailsTypeMapper,
  LoanDetailsMapper,
  LoanDetailsMapperType,
  PaymentHistoryMapper,
  PaymentHistoryMapperType,
  SettlementHistoryMapper,
  SettlementHistoryMapperType,
  TrailHistoryMapper,
  TrailHistoryMapperType,
} from "./mapper/one-view"
import {
  AcknowledgedPisMapper,
  AcknowledgedPisMapperType,
  ManualAcknowledgePisMapper,
  ManualAcknowledgePisMapperType,
  MisMatchedPisMapper,
  MisMatchedPisMapperType,
  PendingPisMapper,
  PendingPisMapperType,
  PisDashboardMapper,
  PisDashboardMapperType,
  SubmitMismatchedMapper,
} from "./mapper/pis"
import {
  AcknowledgeReceiptsMapper,
  CreateReceiptsPayloadMapper,
  CreateReceiptsResponseMapper,
  CreateReceiptsResponseMapperType,
  ReceiptsMapper,
  ReceiptsMapperType,
  ReceiptsMasterDataMapper,
  ReceiptsMasterDataMapperType,
} from "./mapper/receipts"
import {
  SettlementInfoMapper,
  SettlementInfoMapperType,
  SettlementsMapper,
  SettlementsMapperType,
  SettlementTypesMapper,
  type SettlementTypesMapperType,
} from "./mapper/settlement"
import {
  FetchDueAmountMapper,
  FetchDueAmountMapperType,
  PaymentCommunicationLinksMapper,
  PaymentCommunicationLinksMapperType,
  PaymentModesMapper,
  PaymentModesMapperType,
  sendPaymentLinkMapper,
  TrailsMasterDataMapper,
  TrailsMasterDataMapperType,
  UpdateTrailResponseMapper,
  UpdateTrailResponseMapperType,
} from "./mapper/trails"
import {
  AgentMapper,
  AgentType,
  GetAgentsMapper,
  GetAgentsMapperType,
  NgEmployeeMapper,
  NgEmployeesMapper,
  NgEmployeesMapperType,
  PincodeLocationLookUpMapper,
  PincodeLocationLookUpMapperType,
} from "./mapper/user-management"
import { urls } from "./urls"

// TODO move this inside axios response interceptor
function composeResponseData<ResponseType>(response: AxiosResponse<ResponseType>): {
  status: number
  data: ResponseType
} {
  return {
    status: response.status,
    data: response.data,
  }
}

export const enum APIResponseStatus {
  Success = "success",
  Failed = "failed",
}

export function createAPIResponse<TData>(
  type: "success",
  data: TData,
  error: null
): { status: "success"; data: TData; error: null }
export function createAPIResponse<TError>(
  type: "error",
  data: null,
  error: TError
): { status: "error"; data: null; error: TError }
export function createAPIResponse<TData, TError>(type: "success" | "error", data: TData, error: TError) {
  if (type === "success") {
    return {
      data,
      status: "success",
      error: null,
    }
  }

  return {
    data: null,
    status: "error",
    error: error,
  }
}

const APIResponse = {
  success: <TData>(data: TData) => Promise.resolve(createAPIResponse("success", data, null)),
  error: <TError>(error: TError) => Promise.reject(createAPIResponse("error", null, error as AxiosResponseError)),
}

async function login<TResponse>(credentials: { ngId: string; password: string }) {
  const response = await axios.post(urls.LOGIN, {
    ng_id: credentials.ngId,
    password: credentials.password,
  })
  return composeResponseData<TResponse>(response)
}

async function getAllocation<TResponse>(agentId: AllocationState["agentId"]) {
  const response = await axios.post(urls.GET_ALLOCATION, {
    data: {
      id: agentId,
    },
  })

  return composeResponseData<TResponse>(response)
}

async function importAllocationFile(url: string) {
  const response = await axios.get(url)

  return response
}

async function uploadAllocation<TResponse>(file: File) {
  const formData = new FormData()
  formData.append("allocation_file", file)
  const response = await axios.post(urls.BULK_UPLOAD_AUM, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

  return composeResponseData<TResponse>(response)
}

async function getApplication<TResponse>(appId: AllocationState["agentId"]) {
  const response = await axios.post(urls.GET_APPLICATION, {
    data: {
      id: appId,
    },
  })

  return composeResponseData<TResponse>(response)
}

async function getAgents() {
  try {
    const response = await axios.get(urls.GET_AGENTS)
    const { agents } = processPayload<GetAgentsMapperType>(response.data, GetAgentsMapper)

    return APIResponse.success(agents.map((agent) => processPayload<AgentType>(agent, AgentMapper)))
  } catch (err) {
    return APIResponse.error(err)
  }
}

async function getNgEmployees() {
  try {
    const response = await axios.get(urls.GET_NG_EMPLOYEES)

    const { users } = processPayload<NgEmployeesMapperType>(response.data, NgEmployeesMapper)

    return APIResponse.success(users.map((user) => processPayload<NgEmployee>(user, NgEmployeeMapper)))
  } catch (err) {
    return APIResponse.error(err)
  }
}

async function pincodeLocationLookUp(pincode: string) {
  try {
    const response = await axios.get(urls.PINCODE_LOCATION_LOOKUP, {
      params: {
        pincode,
      },
    })

    return APIResponse.success(
      processPayload<PincodeLocationLookUpMapperType>(response.data, PincodeLocationLookUpMapper)
    )
  } catch (err) {
    return APIResponse.error(err)
  }
}

async function getAgencies() {
  try {
    const response = await axios.get(urls.GET_AGENCIES)

    const { agencies } = processPayload<AgenciesMapperType>(response.data, AgenciesMapper)

    return APIResponse.success(
      agencies.map((agency) => processPayload<AgenciesMapperType["agencies"][number]>(agency, AgencyMapper))
    )
  } catch (err) {
    return APIResponse.error(err)
  }
}

async function updateAgencyStatus({
  agencyCode,
  agencyStatus,
}: {
  agencyStatus: ActivityStatus
  agencyCode: string | number
}) {
  try {
    await axios.put(urls.createUpdateAgencyURL(agencyCode), {
      agency: {
        agency_code: agencyCode,
        activity_status: agencyStatus,
      },
    })

    return APIResponse.success(null)
  } catch (err) {
    return APIResponse.error(err)
  }
}

async function updateAgentStatus({
  agentCode,
  agentStatus,
}: {
  agentStatus: ActivityStatus
  agentCode: string | number
}) {
  try {
    await axios.put(urls.createUpdateAgentURL(agentCode), {
      agent: {
        id: agentCode,
        activity_status: agentStatus,
      },
    })

    return APIResponse.success(null)
  } catch (err) {
    return APIResponse.error(err)
  }
}

async function updateNgEmployeeStatus({
  employeeCode,
  employeeStatus,
}: {
  employeeStatus: ActivityStatus
  employeeCode: string | number
}) {
  try {
    await axios.put(urls.createUpdateEmployeeURL(employeeCode), {
      activity_status: employeeStatus,
    })

    return APIResponse.success(null)
  } catch (err) {
    return APIResponse.error(err)
  }
}

async function getAgencyTypes() {
  try {
    const response = await axios.get(urls.GET_AGENCY_TYPES)

    return APIResponse.success(processPayload<AgencyTypesMapperType>(response.data, AgencyTypesMapper).agencyTypes)
  } catch (err) {
    return APIResponse.error(err)
  }
}

async function createAgency(
  payload: Pick<AgencyState, "primaryDetails" | "addressDetails" | "agreementAndRenewalDetails">
) {
  try {
    const response = await axios.post(urls.CREATE_AGENCY, {
      ...(processPayload(payload, CreateAgencyPayloadMapper) as object),
    })

    return APIResponse.success(
      processPayload<CreateAgencyResponseMapperType>(response.data, CreateAgencyResponseMapper)
    )
  } catch (err) {
    return APIResponse.error(err)
  }
}

async function createAgent(payload: Pick<AgentState, "primaryDetails" | "addressDetails">) {
  try {
    const response = await axios.post(urls.CREATE_AGENT, {
      ...(processPayload(payload, CreateAgentPayloadMapper) as object),
    })

    return APIResponse.success(processPayload<CreateAgentResponseMapperType>(response.data, CreateAgentResponseMapper))
  } catch (err) {
    return APIResponse.error(err)
  }
}

async function getRoleGroups() {
  try {
    const response = await axios.get(urls.GET_ROLE_GROUP)

    const { roleGroups } = processPayload<GetRoleGroupMapperType>(response.data, GetRoleGroupMapper)

    return APIResponse.success(roleGroups.map((roleGroup) => processPayload<RoleGroup>(roleGroup, RoleGroupMapper)))
  } catch (err) {
    return APIResponse.error(err)
  }
}

async function getTrailsMasterData() {
  try {
    const response = await axios.get(urls.TRAIL_MASTER_DATA)

    return APIResponse.success(processPayload<TrailsMasterDataMapperType>(response.data, TrailsMasterDataMapper))
  } catch (err) {
    return APIResponse.error(err)
  }
}

async function updateTrail(payload: Pick<TrailState, "basicInformation" | "secondaryInformation" | "settlement">) {
  try {
    const response = await axios.post(urls.UPDATE_TRAIL, getCreateTrailPayload(payload))

    return APIResponse.success(processPayload<UpdateTrailResponseMapperType>(response.data, UpdateTrailResponseMapper))
  } catch (err) {
    return APIResponse.error(err)
  }
}

async function getPisDashboardData() {
  try {
    const response = await axios.get(urls.PIS_DASHBOARD_DATA)
    return APIResponse.success(processPayload<PisDashboardMapperType>(response.data, PisDashboardMapper))
  } catch (err) {
    return APIResponse.error(err)
  }
}

async function getSettlementTypes() {
  try {
    const response = await axios.get(urls.SETTLEMENT_TYPES)

    return APIResponse.success(
      processPayload<SettlementTypesMapperType>(response.data, SettlementTypesMapper).settlementTypes
    )
  } catch (error) {
    return APIResponse.error(error)
  }
}

async function getPendingPis() {
  try {
    const response = await axios.get(urls.PENDING_PIS)

    return APIResponse.success(processPayload<PendingPisMapperType>(response.data, PendingPisMapper))
  } catch (err) {
    return APIResponse.error(err)
  }
}

async function getMismatchedPis() {
  try {
    const response = await axios.get(urls.MIS_MATCHED_PIS)
    return APIResponse.success(processPayload<MisMatchedPisMapperType>(response.data, MisMatchedPisMapper))
  } catch (err) {
    return APIResponse.error(err)
  }
}

async function submitMismatchedPis(
  payload: Array<Pick<MisMatchedPisType, "applicationId" | "action" | "sendToCmReason">>
) {
  try {
    const mappedPayload = payload.map((item) => processPayload(item, SubmitMismatchedMapper))
    await axios.post(urls.SUBMIT_MIS_MATCHED_PIS, mappedPayload)
    return APIResponse.success(null)
  } catch (err) {
    return APIResponse.error(err)
  }
}

async function getManualAcknowledgedPis() {
  try {
    const response = await axios.get(urls.MANUAL_ACKNOWLEDGED_PIS)

    return APIResponse.success(
      processPayload<ManualAcknowledgePisMapperType>(response.data, ManualAcknowledgePisMapper)
    )
  } catch (err) {
    return APIResponse.error(err)
  }
}

async function getAcknowledgedPis() {
  try {
    const response = await axios.post(urls.ACKNOWLEDGED_PIS)

    return APIResponse.success(processPayload<AcknowledgedPisMapperType>(response.data, AcknowledgedPisMapper))
  } catch (err) {
    return APIResponse.error(err)
  }
}

async function getSettlements() {
  try {
    const response = await axios.get(urls.SETTLEMENTS)

    return APIResponse.success(processPayload<SettlementsMapperType>(response.data, SettlementsMapper).settlements)
  } catch (err) {
    return APIResponse.error(err)
  }
}

async function getSettlementInfo(id: string | number) {
  try {
    const response = await axios.get(urls.getSettlementInfo(id))

    return APIResponse.success(processPayload<SettlementInfoMapperType>(response.data, SettlementInfoMapper))
  } catch (err) {
    return APIResponse.error(err)
  }
}

async function uploadLrnDNFile<TResponse>(file: File) {
  const formData = new FormData()
  formData.append("file", file)

  const response = await axios.post(urls.UPLOAD_LITIGATION_LEGAL_DOCS, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

  return composeResponseData<TResponse>(response)
}

async function uploadCaseStatusFile<TResponse>(file: File) {
  const formData = new FormData()
  formData.append("file", file)

  const response = await axios.post(urls.UPLOAD_LITIGATION_CASE_STATUS_FILE, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

  return composeResponseData<TResponse>(response)
}
async function fetchCustomerDetails(appId: string | number) {
  try {
    const response = await axios.get(urls.CUSTOMER_DETAILS, {
      params: {
        application_id: appId,
      },
    })

    return APIResponse.success(processPayload<CustomerDetailsTypeMapper>(response.data, CustomerDetailsMapper))
  } catch (error) {
    return APIResponse.error(error)
  }
}

async function fetchLoanDetails(appId: string | number) {
  try {
    const response = await axios.get(urls.LOAN_DETAILS, {
      params: {
        application_id: appId,
      },
    })

    return APIResponse.success(processPayload<LoanDetailsMapperType>(response.data, LoanDetailsMapper))
  } catch (err) {
    return APIResponse.error(err)
  }
}

async function fetchPaymentHistory(appId: string | number) {
  try {
    const response = await axios.get(urls.PAYMENT_HISTORY, {
      params: {
        application_id: appId,
      },
    })

    return APIResponse.success(processPayload<PaymentHistoryMapperType>(response.data, PaymentHistoryMapper))
  } catch (err) {
    return APIResponse.error(err)
  }
}

async function fetchSettlementHistory(appId: string | number) {
  try {
    const response = await axios.get(urls.SETTLEMENT_HISTORY, {
      params: {
        application_id: appId,
      },
    })

    return APIResponse.success(processPayload<SettlementHistoryMapperType>(response.data, SettlementHistoryMapper))
  } catch (err) {
    return APIResponse.error(err)
  }
}

async function fetchTrailHistory(allocationId: string | number) {
  try {
    const response = await axios.get(urls.TRAIL_HISTORY, {
      params: {
        allocation_id: allocationId,
      },
    })

    return APIResponse.success(processPayload<TrailHistoryMapperType>(response.data, TrailHistoryMapper))
  } catch (err) {
    return APIResponse.error(err)
  }
}

async function fetchAllocationHistory(allocationId: string | number) {
  try {
    const response = await axios.get(urls.ALLOCATION_HISTORY, {
      params: {
        allocation_id: allocationId,
      },
    })

    return APIResponse.success(processPayload<AllocationHistoryMapperType>(response.data, AllocationHistoryMapper))
  } catch (err) {
    return APIResponse.error(err)
  }
}

async function pullEligibleBase() {
  try {
    const response = await axios.get(urls.LITIGATION_ELIGIBLE_BASE)

    return APIResponse.success(processPayload<EligibleBaseMapperType>(response.data, EligibleBaseMapper))
  } catch (error) {
    return APIResponse.error(error)
  }
}

async function pullFinalBase() {
  try {
    const response = await axios.get(urls.LITIGATION_FINAL_BASE)

    return APIResponse.success(processPayload<FinalBaseMapperType>(response.data, FinalBaseMapper))
  } catch (err) {
    return APIResponse.error(err)
  }
}

async function pullLegalStatus() {
  try {
    const response = await axios.get(urls.LITIGATION_CASE_STATUS)

    return APIResponse.success(processPayload<LegalStatusMapperType>(response.data, LegalStatusMapper))
  } catch (err) {
    return APIResponse.error(err)
  }
}

async function pullPartialBase() {
  try {
    const response = await axios.get(urls.LITIGATION_PARTIAL_BASE)

    return APIResponse.success(processPayload<PartialBaseMapperType>(response.data, PartialBaseMapper))
  } catch (err) {
    return APIResponse.error(err)
  }
}

async function fetchPendingCases() {
  try {
    const response = await axios.get(urls.LITIGATION_PENDING_CASES)

    return APIResponse.success(processPayload<PendingCasesMapperType>(response.data, PendingCasesMapper))
  } catch (err) {
    return APIResponse.error(err)
  }
}

async function sendPaymentLink(payload: Omit<ReceiptState["receiptInformation"], "paymentProof" | "agentPanNumber">) {
  try {
    await axios.post(urls.SEND_PAYMENT_LINK, {
      ...(processPayload(payload, sendPaymentLinkMapper) as object),
    })

    return APIResponse.success(null)
  } catch (err) {
    return APIResponse.error(err)
  }
}

async function getPaymentModes() {
  try {
    const response = await axios.get(urls.GET_PAYMENT_MODES)

    return APIResponse.success(processPayload<PaymentModesMapperType>(response.data, PaymentModesMapper).paymentModes)
  } catch (err) {
    return APIResponse.error(err)
  }
}

async function getPaymentCommunicationTypes() {
  try {
    const response = await axios.get(urls.GET_PAYMENT_LINK_COMMUNICATION_TYPES)

    return APIResponse.success(
      processPayload<PaymentCommunicationLinksMapperType>(response.data, PaymentCommunicationLinksMapper).paymentLinks
    )
  } catch (err) {
    return APIResponse.error(err)
  }
}

async function fetchDueAmount(applicationId: string) {
  try {
    const response = await axios.get(urls.FETCH_DUE_AMOUNT, { params: { application_id: applicationId } })
    return APIResponse.success(processPayload<FetchDueAmountMapperType>(response.data, FetchDueAmountMapper).amount)
  } catch (err) {
    return APIResponse.error(err)
  }
}

async function getReceipts() {
  try {
    const response = await axios.get(urls.GET_RECEIPTS)
    return APIResponse.success(processPayload<ReceiptsMapperType>(response.data, ReceiptsMapper))
  } catch (err) {
    return APIResponse.error(err)
  }
}

// TODO - maybe use correct status type here
async function acknowledgeReceipts(receipts: Array<{ id: number; transactionId: string; status: string }>) {
  try {
    await axios.post(urls.ACKNOWLEDGE_RECEIPTS, processPayload({ receipts }, AcknowledgeReceiptsMapper))
    return APIResponse.success(null)
  } catch (err) {
    return APIResponse.error(err)
  }
}

async function uploadReceiptsImage(image: FormData) {
  try {
    await axios.post(urls.UPLOAD_RECEIPTS_IMAGE, image, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  } catch (err) {
    return APIResponse.error(err)
  }
}

async function createReceipt(payload: {
  allocationId: number | string
  paymentMode: number | string
  amount: number | string
  agentPanNumber: string
  // TODO - for now disabling it.
  // coords: { lat: string; lng: string }
}) {
  try {
    const response = await axios.post(urls.CREATE_RECEIPT, processPayload(payload, CreateReceiptsPayloadMapper))

    return APIResponse.success(
      processPayload<CreateReceiptsResponseMapperType>(response.data, CreateReceiptsResponseMapper)
    )
  } catch (err) {
    return APIResponse.error(err)
  }
}

async function getReceiptsMasterData() {
  try {
    const response = await axios.get(urls.RECEIPTS_MASTER_DATA)

    return APIResponse.success(processPayload<ReceiptsMasterDataMapperType>(response.data, ReceiptsMasterDataMapper))
  } catch (err) {
    return APIResponse.error(err)
  }
}

export const API = {
  login,
  getAllocation,
  importAllocationFile,
  uploadAllocation,
  getApplication,
  getAgents,
  getNgEmployees,
  pincodeLocationLookUp,
  getAgencies,
  updateAgencyStatus,
  getAgencyTypes,
  createAgency,
  updateAgentStatus,
  createAgent,
  updateNgEmployeeStatus,
  getRoleGroups,
  getTrailsMasterData,
  getPisDashboardData,
  updateTrail,
  getSettlementTypes,
  getPendingPis,
  getMismatchedPis,
  submitMismatchedPis,
  getManualAcknowledgedPis,
  getAcknowledgedPis,
  getSettlements,
  getSettlementInfo,
  uploadLrnDNFile,
  uploadCaseStatusFile,
  pullEligibleBase,
  fetchCustomerDetails,
  fetchLoanDetails,
  fetchPaymentHistory,
  fetchSettlementHistory,
  fetchTrailHistory,
  fetchAllocationHistory,
  pullFinalBase,
  pullLegalStatus,
  pullPartialBase,
  fetchPendingCases,
  sendPaymentLink,
  getPaymentModes,
  getPaymentCommunicationTypes,
  fetchDueAmount,
  getReceipts,
  acknowledgeReceipts,
  uploadReceiptsImage,
  createReceipt,
  getReceiptsMasterData,
}
