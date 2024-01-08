import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SelectInputDefaultValue, SelectInputDefaultValueType } from "components/SelectInput/SelectInput"
import { RequestStatus } from "enums"
import { ReceiptsMapperType } from "service/mapper/receipts"
import { createSetState, setInvalidFields } from "store/utility"
import { UploadedDocumentType } from "types"
import { ValidationResults } from "types/store"
import { InvalidField } from "utils/validation"

export interface ReceiptState {
  receipts: Array<
    ReceiptsMapperType["receipts"][number] & {
      status: SelectInputDefaultValueType<RequestStatus | null>
      transactionId: string
    }
  >
  receiptInformation: {
    paymentMode: SelectInputDefaultValueType<string>
    amount: string
    agentPanNumber: string
    paymentProof: UploadedDocumentType | null
    paymentLink: SelectInputDefaultValueType<string>
  }
  invalidFields: ValidationResults<Omit<ReceiptState, "receipts">> & {
    receipts: Array<
      {
        id: number
      } & { status: InvalidField; transactionId: InvalidField }
    >
  }
}

const initialState: ReceiptState = {
  receipts: [],
  receiptInformation: {
    paymentMode: SelectInputDefaultValue,
    amount: "",
    agentPanNumber: "",
    paymentProof: null,
    paymentLink: "",
  },
  invalidFields: {
    receipts: [],
    receiptInformation: {
      paymentMode: { isInvalid: false, errorMessage: "" },
      agentPanNumber: { isInvalid: false, errorMessage: "" },
      amount: { isInvalid: false, errorMessage: "" },
      paymentProof: { isInvalid: false, errorMessage: "" },
      paymentLink: { isInvalid: false, errorMessage: "" },
    },
  },
}

export const receiptSlice = createSlice({
  name: "receipts-update",
  initialState,
  reducers: {
    resetFields(state: ReceiptState) {
      state.receiptInformation = initialState.receiptInformation
      state.invalidFields = initialState.invalidFields
    },
    setInvalidFields: setInvalidFields,

    //Receipt information
    setReceipts: createSetState("receipts"),

    setPaymentMode: createSetState("receiptInformation", "paymentMode"),
    setAmount: createSetState("receiptInformation", "amount"),
    setAgentPanNumber: createSetState("receiptInformation", "agentPanNumber", (value) => value.length <= 10),
    setPaymentProof: createSetState("receiptInformation", "paymentProof"),
    setPaymentLink: createSetState("receiptInformation", "paymentLink"),

    setReceiptTransactionIdById(
      state: ReceiptState,
      action: PayloadAction<{
        receiptId: number
        transactionId: string
      }>
    ) {
      const receipt = state.receipts.find((r) => r.id === action.payload.receiptId)

      if (!receipt) return

      receipt.transactionId = action.payload.transactionId
    },
    setReceiptStatusById(
      state: ReceiptState,
      action: PayloadAction<{
        receiptId: number
        status: RequestStatus
      }>
    ) {
      const receipt = state.receipts.find((r) => r.id === action.payload.receiptId)

      if (!receipt) return

      receipt.status = action.payload.status
    },
  },
})

export const receiptAction = receiptSlice.actions

export default receiptSlice.reducer
