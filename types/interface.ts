import { ActivityStatus } from "enums"
import { RoleGroup } from "store/slices/user-management/ng-employee/mapper"

export type NgEmployee = {
  name: string
  hrDesignation: string
  department: string
  roles: Array<RoleGroup>
  status: ActivityStatus
  id: number
}
