import { Stack } from "components"
import AddressDetailsForm from "./AddressDetailsForm"
import PrimaryDetailsForm from "./PrimaryDetailsForm"

export default function AddAgentForm() {
  return (
    <Stack>
      <PrimaryDetailsForm />
      <AddressDetailsForm />
    </Stack>
  )
}
