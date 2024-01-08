import Stack from "components/Stack/Stack"

import AddressDetailsForm from "./AddressDetailsForm"
import AgreementAndRenewalDetails from "./AgreementAndRenewalDetails"
import PrimaryDetailsForm from "./PrimaryDetailsForm"

export default function AddAgencyForm() {
  return (
    <Stack>
      <PrimaryDetailsForm />
      <AddressDetailsForm />
      <AgreementAndRenewalDetails />
    </Stack>
  )
}
