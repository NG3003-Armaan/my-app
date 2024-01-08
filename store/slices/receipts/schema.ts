import { minLength, number, object, string } from "valibot"
import { createCustomStringSchema, createMasterDataIdSchema, parseSchema } from "utils/validation"
import { ReceiptState } from "."

export const SendPaymentLinkSchema = object({
  amount: string("Please fill amount", [minLength(1, "Please fill amount")]),
  paymentLink: string("Please select payment link", [minLength(1, "Please select payment link")]),
  paymentMode: string("Please select payment mode", [minLength(1, "Please select payment mode")]),
})

export const CreateReceiptsSchema = object({
  paymentMode: createMasterDataIdSchema("Please select payment mode"),
  amount: string("Please enter valid amount", [minLength(1, "Please enter valid amount")]),
  agentPanNumber: createCustomStringSchema({ errorMessage: "Please enter valid Pan Number", validator: "pan" }),
  allocationId: number("Please select Allocation Id"),
  // TODO - have to add validation for lat lng
})

export const AcknowledgeReceiptsSchema = object({
  transactionId: string("Please enter Transaction ID", [minLength(1, "Please enter Transaction ID")]),
  status: string("Please select valid Status", [minLength(1, "Please enter valid Status")]),
})

export function getAcknowledgeReceiptsValidationResult(receipts: ReceiptState["receipts"]) {
  const validationResult = receipts.map(({ id, transactionId, status }) => {
    const result = parseSchema(AcknowledgeReceiptsSchema, {
      transactionId,
      status,
    })

    return {
      isValid: result.isValid,
      id,
      transactionId: result.invalidFields.transactionId,
      status: result.invalidFields.status,
    }
  })

  return {
    isValid: validationResult.every((r) => r.isValid),
    invalidFields: {
      receipts: validationResult,
    },
  }
}
