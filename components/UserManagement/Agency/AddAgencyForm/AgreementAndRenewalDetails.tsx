import FormInput from "components/Form/FormInput"
import Stack from "components/Stack/Stack"

import { useAppDispatch, useAppSelector } from "store/hooks"
import { agencyAction, AgencyState } from "store/slices/user-management/agency"

import Collapse from "../../../Collapse/Collapse"

export default function AgreementAndRenewalDetails() {
  const { firstAgreementDate, remarks, contractExpiryDate, lastRenewalDate } = useAppSelector<
    AgencyState["agreementAndRenewalDetails"]
  >((state) => state.agency.agreementAndRenewalDetails)

  const invalidFields = useAppSelector<AgencyState["invalidFields"]["agreementAndRenewalDetails"]>(
    (state) => state.agency.invalidFields.agreementAndRenewalDetails
  )

  const dispatch = useAppDispatch()

  return (
    <Collapse title="Agreement and Renewal Details">
      <Stack className="px-6 py-3">
        <FormInput.Date
          label="First Agreement Date"
          value={firstAgreementDate}
          {...invalidFields.firstAgreementDate}
          onChange={(e) => dispatch(agencyAction.setFirstAgreementDate(e.target.value))}
        />
        <FormInput.Date
          label="Last Renewal Date"
          value={lastRenewalDate}
          {...invalidFields.lastRenewalDate}
          onChange={(e) => dispatch(agencyAction.setLastRenewalDate(e.target.value))}
        />
        <FormInput.Date
          label="Contract Expiry Date"
          value={contractExpiryDate}
          {...invalidFields.contractExpiryDate}
          onChange={(e) => dispatch(agencyAction.setContractExpiryDate(e.target.value))}
        />
        <FormInput.Text
          label="Remarks"
          value={remarks}
          {...invalidFields.remarks}
          onChange={(e) => dispatch(agencyAction.setRemarks(e.target.value))}
        />
      </Stack>
    </Collapse>
  )
}
