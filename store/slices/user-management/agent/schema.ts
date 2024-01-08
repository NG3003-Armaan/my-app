import { email, length, maxLength, minLength, object, required, string } from "valibot"
import { createCustomStringSchema } from "utils/validation"

const PrimaryDetailsSchema = object({
  agentName: string("Please enter Agent name", [minLength(3, "Agent name must be atleast 3 characters")]),
  agentDesignation: string("Please select Agency type", [minLength(1, "Please select Agency type")]),
  agencyId: string("Please select Agency", [minLength(1, "Please select Agency")]),
  email: string("Please enter valid email address", [email()]),
  mobileNumber: createCustomStringSchema({
    validator: "mobileNumber",
    errorMessage: "Please enter valid mobile number",
  }),

  reportingManager: string("Please select Reporting Manager", [minLength(1, "Please select Reporting Manager")]),
})

const AddressDetailsSchema = object({
  registeredAddress: string("Please enter registered address", [
    minLength(3, "Registered address must be at least 10 characters"),
    maxLength(300, "Registered address must not exceed 300 characters"),
  ]),
  postalCode: string("Please enter your Postal code", [length(6, "Please enter valid 6-digit Postal code")]),
  state: string("Please select valid state", [minLength(3, "Please select valid state")]),
  city: string("Please select valid city", [minLength(3, "Please select valid city")]),
})

export const CreateAgentSchema = object({
  primaryDetails: required(PrimaryDetailsSchema),
  addressDetails: required(AddressDetailsSchema),
})
