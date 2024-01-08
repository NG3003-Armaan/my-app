import { createAsyncThunk } from "@reduxjs/toolkit"
import { API } from "service"
import { appActions, CONTEXT_ID } from "store/slice"
import { AppState } from "store/store"
import { MisMatchedPisType, pisActions } from "."

export const getPendingPis = createAsyncThunk(
  "pis/getPendingPis",
  async ({ acknowledgementUserId }: { acknowledgementUserId: string }, thunkAPI) => {
    if (!acknowledgementUserId) return

    thunkAPI.dispatch(
      appActions.setContextualLoadingState({
        id: CONTEXT_ID.GET_PENDING_PIS,
        loading: true,
        message: `Fetching ${acknowledgementUserId} PIS`,
      })
    )

    try {
      const response = await API.getPendingPis()

      thunkAPI.dispatch(pisActions.setPendingPis(response.data.pendingPis))

      return
    } catch (err) {
      return thunkAPI.dispatch(
        appActions.setPopupErrorNotification({
          message: "Failed to fetch Pis details. Please try again after sometime.",
        })
      )
    } finally {
      thunkAPI.dispatch(
        appActions.setContextualLoadingState({ id: CONTEXT_ID.GET_PENDING_PIS, loading: false, message: "" })
      )
    }
  }
)

export const submitMisMatchedPis = createAsyncThunk(
  "pis/misMatchedPis",
  async (payload: Array<MisMatchedPisType>, thunkAPI) => {
    const state = thunkAPI.getState() as AppState

    const { misMatchedPis } = state.pis

    const data = misMatchedPis
      .filter((newObj) => {
        return payload.find((obj) => obj.applicationId === newObj.applicationId)
      })
      .map((newObj) => {
        // Extract the changes for 'sendToCmReason' and 'action'
        payload.find((obj) => obj.applicationId === newObj.applicationId)
        return { applicationId: newObj.applicationId, action: newObj.action, sendToCmReason: newObj.sendToCmReason }
      })

    try {
      await API.submitMismatchedPis(data)
    } catch (err) {
      return thunkAPI.dispatch(
        appActions.setPopupErrorNotification({
          message: "Failed to submit mismatched Pis. Please try again after sometime.",
        })
      )
    }
  }
)

export const getAcknowledgedPis = createAsyncThunk("pis/getAcknowledgedPis", async (_payload, thunkAPI) => {
  try {
    const response = await API.getAcknowledgedPis()

    thunkAPI.dispatch(pisActions.setAcknowledgedPis(response.data.acknowledged))
  } catch (err) {
    return thunkAPI.dispatch(
      appActions.setPopupErrorNotification({
        message: "Failed to fetch acknowledged Pis. Please try again after sometime.",
      })
    )
  }
})
