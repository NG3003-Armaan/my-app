import { createAsyncThunk } from "@reduxjs/toolkit"

import _ from "lodash"

import { API } from "service"
import { appActions, CONTEXT_ID } from "store/slice"
import { AppState } from "store/store"
import { reloadPage } from "utils/browser"
import { handleError } from "utils/error"
import { parseSchema, validate } from "utils/validation"
import { CreateAgencySchema } from "./schema"
import { agencyAction } from "."

export const createAgency = createAsyncThunk<object, void, { state: AppState }>(
  "user-management/agency/add",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState()

    const { primaryDetails, addressDetails, agreementAndRenewalDetails } = state.agency

    const result = parseSchema(CreateAgencySchema, {
      primaryDetails,
      addressDetails,
      agreementAndRenewalDetails,
    })

    thunkAPI.dispatch(agencyAction.setInvalidFields(result.invalidFields))

    if (!result.isValid) {
      return
    }

    thunkAPI.dispatch(
      appActions.setContextualLoadingState({
        loading: true,
        id: CONTEXT_ID.CREATE_AGENCY,
        message: "Creating Agency...",
      })
    )

    try {
      const {
        data: { agencyId },
      } = await API.createAgency({ primaryDetails, addressDetails, agreementAndRenewalDetails })

      thunkAPI.dispatch(
        appActions.setShowNotificationModal({
          show: true,
          type: "success",
          message: `${primaryDetails.agencyName} has been added as an agency with code ${agencyId}`,
        })
      )

      thunkAPI.dispatch(agencyAction.resetAgencyDetails())
    } catch (error) {
      handleError({
        error,
        dispatch: thunkAPI.dispatch,
        defaultErrorMessage: "Failed to create Agency. Please again after sometime.",
      })
    } finally {
      thunkAPI.dispatch(appActions.setContextualLoadingState({ loading: false, id: CONTEXT_ID.CREATE_AGENCY }))
    }
  }
)

// TODO - this thing is copied pased to agent async action also. FInd a way to use the same function again
export const pincodeLocationLookUp = createAsyncThunk("user-management/agency/pincode-lookup", async (_, thunkAPI) => {
  const state = thunkAPI.getState() as AppState

  const { postalCode } = state.agency.addressDetails

  if (validate(postalCode).is.not.valid("pincode")) {
    thunkAPI.dispatch(appActions.setPopupErrorNotification({ message: "Please enter valid Pincode" }))
    return
  }

  try {
    const { data } = await API.pincodeLocationLookUp(postalCode)

    thunkAPI.dispatch(agencyAction.setCity(data.city))
    thunkAPI.dispatch(agencyAction.setState(data.state))
  } catch {
    return handleError({ defaultErrorMessage: "Failed to fetch pincode details", dispatch: thunkAPI.dispatch })
  }
})

export const updateAgencyStatus = createAsyncThunk(
  "user-management/agency/add",
  async ({ changedAgencyStatus }: { changedAgencyStatus: boolean }, thunkAPI) => {
    const state = thunkAPI.getState() as AppState

    const { searchedAgency } = state.agency

    if (!changedAgencyStatus || !searchedAgency) {
      return thunkAPI.dispatch(
        appActions.setPopupErrorNotification({ message: "You've to change the status before submitting." })
      )
    }

    try {
      API.updateAgencyStatus({ agencyStatus: searchedAgency.status, agencyCode: searchedAgency.id })

      thunkAPI.dispatch(
        appActions.setShowNotificationModal({
          type: "success",
          show: true,
          message: `Updated ${searchedAgency.agencyName} status to ${searchedAgency.status} successfully.`,
        })
      )
      // TODO - for now we'll restart the page so that new updated data will be fetched
      setTimeout(() => {
        reloadPage()
      }, 1500)
      thunkAPI.dispatch(agencyAction.resetSearchResult())
    } catch (err) {
      return handleError({
        defaultErrorMessage: "Failed to update agency status. Please try again after sometime.",
        dispatch: thunkAPI.dispatch,
      })
    }
  }
)
