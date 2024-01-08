import { OptionType } from "components/SelectInput/SelectInput"
import { ActivityStatus } from "enums"
import { AllocationType } from "store/slices/allocation"
import { ApplicationType } from "store/slices/application"
import { processMasterData } from "utils/helpers"

export const AllocationMapper = {
  data: "allocations",
}

export type AllocationMapperType = {
  allocations: Array<AllocationType>
}

export const ApplicationMapper = {
  data: "application",
}

export type ApplicationMapperType = {
  application: ApplicationType
}

export const AgenciesMapper = {
  "data.agencies": {
    key: "agencies",
    default: [],
  },
}

export type AgenciesMapperType = {
  agencies: Array<Agency>
}

type Agency = {
  id: number
  agencyName: string
  status: ActivityStatus
  renewalContract: string
}

export const AgencyMapper = {
  id: "id",
  name: "agencyName",
  status: "status",
  renewal_contract: "renewalContract",
}

export const AgencyTypesMapper = {
  data: {
    key: "agencyTypes",
    default: [],
    transform: processMasterData,
  },
}

export type AgencyTypesMapperType = {
  agencyTypes: Array<OptionType>
}

export const CreateAgencyPayloadMapper = {
  "primaryDetails.agencyName": "agency.agency_name",
  "primaryDetails.agencyType": "agency.agency_type",
  "primaryDetails.panCard": "agency.pan_card",
  "primaryDetails.gstinNumber": "agency.gstin",
  "primaryDetails.reportingManager": "agency.reporting_manager",

  "addressDetails.registeredAddress": "agency.registered_address",
  "addressDetails.postalCode": "agency.pincode",

  "agreementAndRenewalDetails.firstAgreementDate": "agency.first_agreement",
  "agreementAndRenewalDetails.lastRenewalDate": "agency.last_renewal",
  "agreementAndRenewalDetails.contractExpiryDate": "agency.contract_expiry",
  "agreementAndRenewalDetails.remarks": "agency.remarks",
}

export const CreateAgencyResponseMapper = {
  "data.agency_id": "agencyId",
}

export type CreateAgencyResponseMapperType = {
  agencyId: number
}

export const CreateAgentPayloadMapper = {
  "primaryDetails.agentName": "agent.name",
  "primaryDetails.agentDesignation": "agent.designation",
  "primaryDetails.agencyId": "agent.agency_id",
  "primaryDetails.email": "agent.email",
  "primaryDetails.mobileNumber": "agent.mobile",
  "primaryDetails.reportingManager": "agent.user_id",

  "addressDetails.registeredAddress": "agent.registered_address",
  "addressDetails.postalCode": "agent.pincode",
}

export const CreateAgentResponseMapper = {
  "data.agent_id": "agentId",
}

export type CreateAgentResponseMapperType = {
  agentId: number
}

export const GetRoleGroupMapper = {
  "data.role_groups": "roleGroups",
}

export type RoleGroup = {
  id: number
  name: string
  isActive: boolean
}

export type GetRoleGroupMapperType = {
  roleGroups: Array<RoleGroup>
}

export const RoleGroupMapper = {
  id: "id",
  name: "name",
  is_active: "isActive",
}
