import FormInput from "components/Form/FormInput"
import Stack from "components/Stack/Stack"

import { useAppDispatch, useAppSelector } from "store/hooks"
import { agencyAction, type AgencyState } from "store/slices/user-management/agency"

import Collapse from "../../../Collapse/Collapse"

export default function PrimaryDetailsForm() {
  const { agencyName, panCard, agencyType, gstinNumber, reportingManager } = useAppSelector<
    AgencyState["primaryDetails"]
  >((state) => state.agency.primaryDetails)

  const reportingManagers = useAppSelector<AgencyState["reportingManagers"]>((state) => state.agency.reportingManagers)

  const agencyTypes = useAppSelector<AgencyState["agencyTypes"]>((state) => state.agency.agencyTypes)

  const invalidFields = useAppSelector<AgencyState["invalidFields"]["primaryDetails"]>(
    (state) => state.agency.invalidFields.primaryDetails
  )

  const dispatch = useAppDispatch()

  return (
    <Collapse title="Primary details" defaultCollapsed>
      <Stack className="px-6 py-3">
        <FormInput.Text
          label="Agency Name"
          {...invalidFields.agencyName}
          value={agencyName}
          onChange={(e) => dispatch(agencyAction.setAgencyName(e.target.value))}
        />
        <FormInput.SelectInput
          label="Agency Type"
          title="Select Agency Type"
          {...invalidFields.agencyType}
          options={agencyTypes}
          value={agencyType}
          onChange={(e) => dispatch(agencyAction.setAgencyType(e.target.value))}
        ></FormInput.SelectInput>
        <FormInput.Text
          {...invalidFields.panCard}
          label="PAN Card"
          maxLength={10}
          minLength={10}
          value={panCard}
          onChange={(e) => dispatch(agencyAction.setPanCard(e.target.value))}
        />
        <FormInput.Text
          label="GSTIN Number"
          value={gstinNumber}
          maxLength={15}
          minLength={15}
          {...invalidFields.gstinNumber}
          onChange={(e) => dispatch(agencyAction.setGstinNumber(e.target.value))}
        />
        <FormInput.SelectInput
          label="Reporting Manager"
          title="Select Reporting Manager"
          {...invalidFields.reportingManager}
          options={reportingManagers}
          value={reportingManager}
          onChange={(e) => dispatch(agencyAction.setReportingManager(e.target.value))}
        ></FormInput.SelectInput>
      </Stack>
    </Collapse>
  )
}
