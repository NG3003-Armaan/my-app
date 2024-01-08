import Collapse from "components/Collapse/Collapse"
import FormInput from "components/Form/FormInput"
import Stack from "components/Stack/Stack"
import { useAppSelector } from "store/hooks"
import { AgentState } from "store/slices/user-management/agent"

export default function DocumentDetails() {
  const invalidFields = useAppSelector<AgentState["invalidFields"]["documentDetails"]>(
    (state) => state.agent.invalidFields.documentDetails
  )

  return (
    <Collapse title="Document Details">
      <Stack className="px-6 py-3">
        <FormInput.FileUpload label="ID Proof" {...invalidFields.idProof} />
        <FormInput.FileUpload label="Address Proof" {...invalidFields.idProof} />
        <FormInput.FileUpload label="Agency ID Card" {...invalidFields.idProof} />
        <FormInput.FileUpload label="Circle Head Approval" {...invalidFields.idProof} />
      </Stack>
    </Collapse>
  )
}
