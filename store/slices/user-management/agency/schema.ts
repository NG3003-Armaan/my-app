import { createCustomStringSchema, createMasterDataIdSchema } from "utils/validation"
import { length, maxLength, minLength, object, required, string } from "valibot"

const PrimaryDetailsSchema = object({
  agencyName: string("Please enter Agency name", [minLength(3, "Agency name must be atleast 3 characters")]),
  agencyType: createMasterDataIdSchema("Please select Agency type"),
  panCard: createCustomStringSchema({
    validator: "pan",
    errorMessage: "Please enter a valid 10-character PAN card number",
  }),
  gstinNumber: createCustomStringSchema({
    validator: "gstin",
    errorMessage: "Please enter valid 15-character GSTIN number.",
  }),

  reportingManager: string("Please select Reporting Manager", [minLength(1, "Please select Reporting Manager")]),
})

const AddressDetailsSchema = object({
  registeredAddress: string("Please enter registered address", [
    minLength(3, "Registered address must be atleast 10 characters"),
    maxLength(300, "Registered address must not exceed 300 characters"),
  ]),
  postalCode: string("Please enter your Postal code", [length(6, "Please enter valid 6-digit Postal code")]),
  state: string("Please select valid state", [minLength(3, "Please select valid state")]),
  city: string("Please select valid city", [minLength(3, "Please select valid city")]),
})

const AgreementAndRenewalDetailsSchema = object({
  firstAgreementDate: createCustomStringSchema({
    errorMessage: "Please select first agreement date",
    validator: "date",
  }),
  lastRenewalDate: createCustomStringSchema({
    errorMessage: "Please select last renewal date",
    validator: "date",
  }),
  contractExpiryDate: createCustomStringSchema({
    errorMessage: "Please select contract expiry date",
    validator: "date",
  }),
})

export const CreateAgencySchema = object({
  primaryDetails: required(PrimaryDetailsSchema),
  addressDetails: required(AddressDetailsSchema),
  agreementAndRenewalDetails: required(AgreementAndRenewalDetailsSchema),
})
