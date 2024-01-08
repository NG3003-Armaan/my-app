import { createAsyncThunk } from "@reduxjs/toolkit"

import _ from "lodash"

import { API } from "service"
import { appActions, CONTEXT_ID } from "store/slice"
import { AppState } from "store/store"
import { isAmountGreaterThan50k } from "utils/helpers/receipts"
import { parseSchema } from "utils/validation"
import { CreateReceiptsSchema, getAcknowledgeReceiptsValidationResult, SendPaymentLinkSchema } from "./schema"
import { receiptAction } from "."

export const createReceipt = createAsyncThunk<object, void, { state: AppState }>(
  "create-receipt",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState()

    const { receiptInformation } = state.receipt
    const {
      application: { appId },
    } = state.application

    const data = { ...receiptInformation, allocationId: 1 }

    const result = parseSchema(CreateReceiptsSchema, data)

    const { agentPanNumber, ...rest } = result.invalidFields

    if (isAmountGreaterThan50k(receiptInformation.amount)) {
      thunkAPI.dispatch(receiptAction.setInvalidFields({ receiptInformation: { ...rest, agentPanNumber } }))
    } else {
      thunkAPI.dispatch(receiptAction.setInvalidFields({ receiptInformation: rest }))
    }

    if (!result.isValid) {
      return
    }

    thunkAPI.dispatch(
      appActions.setContextualLoadingState({
        message: "Creating Receipt",
        id: CONTEXT_ID.CREATE_RECEIPT,
        loading: true,
      })
    )

    try {
      const {
        data: { receiptId },
      } = await API.createReceipt(data)

      if (!receiptId) {
        return thunkAPI.dispatch(appActions.setPopupErrorNotification({ message: "Receipt ID not found." }))
      }

      thunkAPI.dispatch(
        appActions.setPopupSuccessNotification({
          message: `Receipt Number ${receiptId} has been created successfully against APP ID ${appId}`,
        })
      )

      thunkAPI.dispatch(receiptAction.resetFields())
    } catch (err) {
      return thunkAPI.dispatch(
        appActions.setPopupErrorNotification({
          message: "Failed to create Receipts. Please try again after sometime.",
        })
      )
    } finally {
      thunkAPI.dispatch(
        appActions.setContextualLoadingState({
          message: "",
          id: CONTEXT_ID.CREATE_RECEIPT,
          loading: false,
        })
      )
    }
  }
)

export const acknowledgeReceipts = createAsyncThunk("receipt/paymentLink", async (_, thunkAPI) => {
  const state = thunkAPI.getState() as AppState

  const { receipts } = state.receipt

  if (receipts.length === 0) {
    thunkAPI.dispatch(
      appActions.setPopupErrorNotification({
        message: "No receipts found to acknowledge.",
      })
    )
    return
  }

  const updatedReceipts = receipts.filter((r) => {
    return r.transactionId || r.status
  })

  if (updatedReceipts.length === 0) {
    thunkAPI.dispatch(
      appActions.setPopupErrorNotification({
        message: "Please enter Transaction ID and Status to Acknowledge receipts",
      })
    )
    return
  }

  const validationResult = getAcknowledgeReceiptsValidationResult(updatedReceipts)

  thunkAPI.dispatch(receiptAction.setInvalidFields(validationResult.invalidFields))

  if (!validationResult.isValid) {
    return
  }

  thunkAPI.dispatch(
    appActions.setContextualLoadingState({
      message: "Acknowledging Receipts",
      id: CONTEXT_ID.ACKNOWLEDGE_RECEIPT,
      loading: true,
    })
  )

  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await API.acknowledgeReceipts(updatedReceipts.map((data) => ({ ...data, status: data.status! })))

    return thunkAPI.dispatch(appActions.setPopupSuccessNotification({ message: "Receipts Acknowledged!" }))
  } catch (err) {
    return thunkAPI.dispatch(
      appActions.setPopupErrorNotification({
        message: "Failed to acknowledge receipts",
      })
    )
  } finally {
    thunkAPI.dispatch(
      appActions.setContextualLoadingState({
        message: "Acknowledging Receipts",
        id: CONTEXT_ID.ACKNOWLEDGE_RECEIPT,
        loading: false,
      })
    )
  }
})

export const sendPaymentLink = createAsyncThunk("receipt/paymentLink", async (applicationId: string, thunkAPI) => {
  const state = thunkAPI.getState() as AppState

  const { receiptInformation } = state.receipt

  const validatedData = {
    paymentMode: receiptInformation.paymentMode,
    paymentLink: receiptInformation.paymentLink,
    amount: receiptInformation.amount,
  }

  const result = parseSchema(SendPaymentLinkSchema, validatedData)

  thunkAPI.dispatch(receiptAction.setInvalidFields(result.invalidFields))

  if (!result.isValid) {
    return
  }

  const data = {
    ...validatedData,
    applicationId,
    mobile: "9553765907",
    email: "srinivasa.sangadi@neogrowth.in",
  }
  try {
    await API.sendPaymentLink(data)
    return thunkAPI.dispatch(appActions.setPopupSuccessNotification({ message: "Payment Link has been sent" }))
  } catch (err) {
    return thunkAPI.dispatch(
      appActions.setPopupErrorNotification({
        message: "Failed to submit mismatched Pis. Please try again after sometime.",
      })
    )
  }
})
