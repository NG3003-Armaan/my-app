import { ActivityStatus } from "enums"
import { NgEmployee } from "types/interface"

export const GetAgentsMapper = {
  "data.agents": {
    key: "agents",
    default: [],
  },
}

export type AgentType = {
  id: number
  agentName: string
  status: ActivityStatus
  agencyCode: number
  renewalContract: string
}

export const AgentMapper = {
  id: "id",
  name: "agentName",
  status: "status",
  agency_code: "agencyCode",
  renewal_contract: "renewalContract",
}

export type GetAgentsMapperType = {
  agents: Array<AgentType>
}

export const NgEmployeeMapper = {
  name: "name",
  designation: "hrDesignation",
  department: "department",
  roles: "roles",
  status: "status",
  id: "id",
} as const

export const NgEmployeesMapper = {
  "data.users": {
    key: "users",
    default: [],
  },
}

export type NgEmployeesMapperType = {
  users: Array<NgEmployee>
}

export const PincodeLocationLookUpMapper = {
  "data.branch_name": "city",
  "data.state": "state",
}

export type PincodeLocationLookUpMapperType = {
  city: string
  state: string
}
