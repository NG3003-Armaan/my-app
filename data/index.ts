import { ActivityStatus, Criticality, PriorityBucket, Propensity, ResolutionRate, Role } from "enums"

export const roles = [
  { id: "1", title: Role.CollectionAgent, value: Role.CollectionAgent },
  { id: "2", title: Role.CollectionManager, value: Role.CollectionManager },
  { id: "3", title: Role.RegionalCollection, value: Role.RegionalCollection },
  { id: "4", title: Role.Manager, value: Role.Manager },
  { id: "5", title: Role.CircleHead, value: Role.CircleHead },
  { id: "6", title: Role.ChiefBusinessOffier, value: Role.ChiefBusinessOffier },
]

export const activityStatuses = [
  { id: "1", title: "Enable", value: ActivityStatus.Enable },
  { id: "2", title: "Temporary disable", value: ActivityStatus.TemporaryDisable },
  { id: "3", title: "Permanently disable", value: ActivityStatus.PermanentlyDisable },
]

export const priorityBuckets = [
  { id: "1", title: PriorityBucket.P1A_P1B, value: PriorityBucket.P1A_P1B },
  { id: "2", title: PriorityBucket.P2, value: PriorityBucket.P2 },
  { id: "3", title: PriorityBucket.P3, value: PriorityBucket.P3 },
  { id: "4", title: PriorityBucket.P4A_P4B, value: PriorityBucket.P4A_P4B },
  { id: "5", title: PriorityBucket.P5, value: PriorityBucket.P5 },
]

export const resolutionRates = [
  { id: "1", title: ResolutionRate.BELOW_25, value: PriorityBucket.P1A_P1B },
  { id: "2", title: ResolutionRate.BETWEEN_25_50, value: ResolutionRate.BETWEEN_25_50 },
  { id: "3", title: ResolutionRate.BETWEEN_50_75, value: ResolutionRate.BETWEEN_50_75 },
  { id: "5", title: ResolutionRate.BETWEEN_75_100, value: ResolutionRate.BETWEEN_75_100 },
]

export const propensities = [
  { id: "1", title: Propensity.HIGH, value: Propensity.HIGH },
  { id: "2", title: Propensity.LOW, value: Propensity.LOW },
]

export const criticalities = [
  { id: "1", title: Criticality.HIGH, value: Criticality.HIGH },
  { id: "2", title: Criticality.MEDIUM, value: Criticality.MEDIUM },
  { id: "3", title: Criticality.VERY_HIGH, value: Criticality.VERY_HIGH },
]

export const paymentModes = [
  { id: "1", title: "Cash", value: "Cash" },
  { id: "2", title: "Online", value: "Online" },
  { id: "3", title: "Cheque", value: "Cheque" },
  { id: "4", title: "DD", value: "DD" },
]
