import Collapse from "components/Collapse/Collapse"
import FormInput from "components/Form/FormInput"
import Stack from "components/Stack/Stack"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { agentActions, AgentState } from "store/slices/user-management/agent"

export default function PrimaryDetailsForm() {
  const { agencyId, reportingManager, email, mobileNumber, agentDesignation, agentName } = useAppSelector<
    AgentState["primaryDetails"]
  >((state) => state.agent.primaryDetails)

  const invalidFields = useAppSelector<AgentState["invalidFields"]["primaryDetails"]>(
    (state) => state.agent.invalidFields.primaryDetails
  )

  const agencyNames = useAppSelector<AgentState["agencyNames"]>((state) => state.agent.agencyNames)
  const employees = useAppSelector<AgentState["employees"]>((state) => state.agent.employees)

  const dispatch = useAppDispatch()

  return (
    <Collapse title="Primary Details" defaultCollapsed>
      <Stack className="px-6 py-3">
        <FormInput.Text
          label="Agent Name"
          value={agentName}
          {...invalidFields.agentName}
          onChange={(e) => dispatch(agentActions.setAgentName(e.target.value))}
        />
        <FormInput.Text
          label="Agent Designation"
          value={agentDesignation}
          {...invalidFields.agentDesignation}
          onChange={(e) => dispatch(agentActions.setAgentDesignation(e.target.value))}
        />
        <FormInput.SelectInput
          title="Select Agency"
          label="Agency"
          options={agencyNames}
          onChange={(e) => dispatch(agentActions.setAgencyId(e.target.value))}
          value={agencyId}
          {...invalidFields.agencyId}
        />
        <FormInput.Text
          label="Mobile Number"
          value={mobileNumber}
          {...invalidFields.mobileNumber}
          maxLength={10}
          onChange={(e) => dispatch(agentActions.setMobileNumber(e.target.value))}
          minLength={10}
        />
        <FormInput.Text
          label="Email"
          value={email}
          {...invalidFields.email}
          onChange={(e) => dispatch(agentActions.setEmail(e.target.value))}
        />
        <FormInput.SelectInput
          title="Select Reporting Manager"
          label="Reporting Manager"
          options={employees}
          value={reportingManager}
          onChange={(e) => dispatch(agentActions.setReportingManager(e.target.value))}
          {...invalidFields.reportingManager}
        />
      </Stack>
    </Collapse>
  )
}
