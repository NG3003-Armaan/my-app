import Collapse from "components/Collapse/Collapse"
import FormInput from "components/Form/FormInput"
import Stack from "components/Stack/Stack"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { agentActions, type AgentState } from "store/slices/user-management/agent"
import { pincodeLocationLookUp } from "store/slices/user-management/agent/async-actions"

export default function AddressDetailsForm() {
  const { registeredAddress, postalCode, state, city } = useAppSelector<AgentState["addressDetails"]>(
    (state) => state.agent.addressDetails
  )

  const invalidFields = useAppSelector<AgentState["invalidFields"]["addressDetails"]>(
    (state) => state.agent.invalidFields.addressDetails
  )

  const dispatch = useAppDispatch()
  return (
    <Collapse title="Address Details">
      <Stack className="px-6 py-3">
        <FormInput.Text
          label="Registered Address"
          value={registeredAddress}
          {...invalidFields.registeredAddress}
          onChange={(e) => dispatch(agentActions.setRegisteredAddress(e.target.value))}
        />
        <FormInput.Text
          label="Postal Code"
          value={postalCode}
          maxLength={6}
          minLength={6}
          {...invalidFields.postalCode}
          onChange={(e) => {
            dispatch(agentActions.setPostalCode(e.target.value))

            if (e.target.value.length === 6) {
              dispatch(pincodeLocationLookUp())
            }
          }}
        />
        <FormInput.Text label="State" {...invalidFields.state} value={state} readOnly />
        <FormInput.Text label="City" {...invalidFields.city} value={city} readOnly />
      </Stack>
    </Collapse>
  )
}
