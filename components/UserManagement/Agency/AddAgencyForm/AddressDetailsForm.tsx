import FormInput from "components/Form/FormInput"
import Stack from "components/Stack/Stack"

import { useAppDispatch, useAppSelector } from "store/hooks"
import { agencyAction, AgencyState } from "store/slices/user-management/agency"

import { pincodeLocationLookUp } from "store/slices/user-management/agency/async-actions"
import Collapse from "../../../Collapse/Collapse"

export default function AddressDetailsForm() {
  const { registeredAddress, postalCode, state, city } = useAppSelector<AgencyState["addressDetails"]>(
    (state) => state.agency.addressDetails
  )

  const invalidFields = useAppSelector<AgencyState["invalidFields"]["addressDetails"]>(
    (state) => state.agency.invalidFields.addressDetails
  )

  const dispatch = useAppDispatch()

  return (
    <Collapse title="Address Details" defaultCollapsed>
      <Stack className="px-6 py-3">
        <FormInput.Text
          label="Registered address"
          {...invalidFields.registeredAddress}
          onChange={(e) => dispatch(agencyAction.setRegisteredAddress(e.target.value))}
          value={registeredAddress}
        />
        <FormInput.Text
          label="Postal Code"
          maxLength={6}
          minLength={6}
          {...invalidFields.postalCode}
          onChange={(e) => {
            dispatch(agencyAction.setPostalCode(e.target.value))

            if (e.target.value.length === 6) {
              dispatch(pincodeLocationLookUp())
            }
          }}
          value={postalCode}
        />
        <FormInput.Text label="State" {...invalidFields.state} value={state} readOnly />
        <FormInput.Text label="City" {...invalidFields.city} value={city} readOnly />
      </Stack>
    </Collapse>
  )
}
