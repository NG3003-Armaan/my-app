import FormInput from "components/Form/FormInput"
import Stack from "components/Stack/Stack"
import Collapse from "../../../Collapse/Collapse"

export default function DocumentsForm() {
  return (
    <Collapse title="Documentation Details">
      <Stack className="px-6 py-3">
        <FormInput.FileUpload label="Signed Agreement" isInvalid={false} errorMessage="" />
        <FormInput.FileUpload label="KYC Proof" isInvalid={false} errorMessage="" />
        <FormInput.FileUpload label="Bank Proof" isInvalid={false} errorMessage="" />
        <FormInput.FileUpload label="Financial Details/ITR" isInvalid={false} errorMessage="" />
      </Stack>
    </Collapse>
  )
}
