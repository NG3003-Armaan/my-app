import { createAsyncThunk } from "@reduxjs/toolkit"
import { API } from "service"
import { appActions, CONTEXT_ID } from "store/slice"
import { AppState } from "store/store"
import { reloadPage } from "utils/browser"
import { handleError } from "utils/error"
import { parseSchema, validate } from "utils/validation"
import { CreateAgentSchema } from "./schema"
import { agentActions } from "."

export const updateAgentStatus = createAsyncThunk(
  "user-management/Agent/add",
  async ({ changedAgentStatus }: { changedAgentStatus: boolean }, thunkAPI) => {
    const state = thunkAPI.getState() as AppState

    const { searchedAgentDetail } = state.agent

    if (!changedAgentStatus || !searchedAgentDetail) {
      return thunkAPI.dispatch(
        appActions.setPopupErrorNotification({ message: "You've to change the status before submitting." })
      )
    }

    thunkAPI.dispatch(
      appActions.setContextualLoadingState({
        loading: true,
        message: "Updating Status",
        id: CONTEXT_ID.UPDATE_AGENT,
      })
    )

    try {
      await API.updateAgentStatus({ agentStatus: searchedAgentDetail.status, agentCode: searchedAgentDetail.id })

      thunkAPI.dispatch(
        appActions.setShowNotificationModal({
          type: "success",
          show: true,
          message: `${searchedAgentDetail.agentName} ID  has been updated to ${searchedAgentDetail.status}`,
        })
      )

      // TODO - for now we'll restart the page so that new updated data will be fetched
      setTimeout(() => {
        reloadPage()
      }, 1500)

      thunkAPI.dispatch(agentActions.resetSearchResult())
    } catch (err) {
      return handleError({
        defaultErrorMessage: "Failed to update Agent status. Please try again after sometime.",
        dispatch: thunkAPI.dispatch,
      })
    } finally {
      thunkAPI.dispatch(
        appActions.setContextualLoadingState({
          loading: false,
          message: "Updating Status",
          id: CONTEXT_ID.UPDATE_AGENT,
        })
      )
    }
  }
)

export const createAgent = createAsyncThunk<object, void, { state: AppState }>(
  "user-management/agent/add",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState()

    const { primaryDetails, addressDetails } = state.agent

    const result = parseSchema(CreateAgentSchema, {
      primaryDetails,
      addressDetails,
    })

    thunkAPI.dispatch(agentActions.setInvalidFields(result.invalidFields))

    if (!result.isValid) {
      return
    }

    thunkAPI.dispatch(
      appActions.setContextualLoadingState({
        loading: true,
        id: CONTEXT_ID.CREATE_AGENT,
        message: "Creating Agent...",
      })
    )

    try {
      const {
        data: { agentId },
      } = await API.createAgent({ primaryDetails, addressDetails })

      thunkAPI.dispatch(
        appActions.setShowNotificationModal({
          show: true,
          type: "success",
          message: `${primaryDetails.agentName} has been added as an agent with agent code ${agentId}`,
        })
      )

      thunkAPI.dispatch(agentActions.resetAgentDetails())
    } catch (error) {
      handleError({
        error,
        dispatch: thunkAPI.dispatch,
        defaultErrorMessage: "Failed to create Agent. Please again after sometime.",
      })
    } finally {
      thunkAPI.dispatch(appActions.setContextualLoadingState({ loading: false, id: CONTEXT_ID.CREATE_AGENT }))
    }
  }
)
// TODO - create a separate function that handle this
export const pincodeLocationLookUp = createAsyncThunk("user-management/agent/pincode-lookup", async (_, thunkAPI) => {
  const state = thunkAPI.getState() as AppState

  const { postalCode } = state.agent.addressDetails

  if (validate(postalCode).is.not.valid("pincode")) {
    thunkAPI.dispatch(appActions.setPopupErrorNotification({ message: "Please enter valid Pincode" }))
    return
  }

  try {
    const { data } = await API.pincodeLocationLookUp(postalCode)

    thunkAPI.dispatch(agentActions.setCity(data.city))
    thunkAPI.dispatch(agentActions.setState(data.state))
  } catch {
    return handleError({ defaultErrorMessage: "Failed to fetch pincode details", dispatch: thunkAPI.dispatch })
  }
})
