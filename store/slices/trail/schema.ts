import { maxLength, minLength, number, object, required, string } from "valibot"
import { createCustomStringSchema, createMasterDataIdSchema } from "utils/validation"

const BasicInformation = object({
  connectivity: createMasterDataIdSchema("Please select connectivity"),
  trailType: createMasterDataIdSchema("Please select trail type"),
  disposition: createMasterDataIdSchema("Please select disposition"),
  reasonForNonPayment: createMasterDataIdSchema("Please select Reason for non payment"),
  nextAction: createMasterDataIdSchema("Please select next action"),
  ptpDate: createCustomStringSchema({
    validator: "date",
    errorMessage: "Please enter PTP date",
  }),
  ptpAmount: string("Please enter PTP Amount", [minLength(1, "Please select Next Action")]),
})

const SecondaryInformation = object({
  mobileNumber: createCustomStringSchema({
    validator: "mobileNumber",
    errorMessage: "Please enter valid mobile number",
  }),
  address: string("Please enter registered address", [
    minLength(10, "Registered address must be atleast 10 characters"),
    maxLength(300, "Registered address must not exceed 300 characters"),
  ]),
  pincode: createCustomStringSchema({
    validator: "pincode",
    errorMessage: "Please enter valid 6-digit Pincode",
  }),
})

export const SettlementSchema = object({
  settlementAmount: string("Please enter valid Settlement Amount", [
    minLength(1, "Please enter valid Settlement Amount"),
  ]),
  settlementType: createMasterDataIdSchema("Please select valid settlement type"),
  settlementStartDate: createCustomStringSchema({
    validator: "date",
    errorMessage: "Please enter Settlement date",
  }),
  paymentFrequency: number("Please enter valid payment frequency"),
  paymentMode: string("Please enter valid payment mode", [minLength(1, "Please enter valid Payment mode")]),
})

export const DeferredAmountSchema = object({
  deferredAmount: string("Please enter valid Deferred Amount", [minLength(1, "Please enter valid Deferred Amount")]),
})

export const TrailSchema = object({
  basicInformation: required(BasicInformation),
  secondaryInformation: required(SecondaryInformation),
})
