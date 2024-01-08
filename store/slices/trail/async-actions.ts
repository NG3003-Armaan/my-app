import { createAsyncThunk } from "@reduxjs/toolkit"

import _ from "lodash"

import { API } from "service"
import { appActions, CONTEXT_ID } from "store/slice"
import { AppState } from "store/store"
import { handleError } from "utils/error"
import { validateCreateTrail } from "utils/helpers/trails"
import { trailAction } from "."

export const createTrail = createAsyncThunk<object, void, { state: AppState }>("trail-update", async (_, thunkAPI) => {
  const state = thunkAPI.getState()
  const { basicInformation, secondaryInformation, settlement } = state.trail

  const result = validateCreateTrail({ basicInformation, secondaryInformation, settlement })

  thunkAPI.dispatch(trailAction.setInvalidFields(result.invalidFields))

  if (!result.isValid) {
    return
  }

  thunkAPI.dispatch(
    appActions.setContextualLoadingState({
      loading: true,
      id: CONTEXT_ID.UPDATE_TRAIL,
      message: "Creating a Trail...",
    })
  )

  try {
    const {
      data: { trailId },
    } = await API.updateTrail({ basicInformation, secondaryInformation, settlement })

    thunkAPI.dispatch(
      appActions.setShowNotificationModal({
        show: true,
        type: "success",
        message: `A Trail has been created with the Trail Id ${trailId}`,
      })
    )

    thunkAPI.dispatch(trailAction.resetForm())
  } catch (error) {
    return handleError({
      error,
      dispatch: thunkAPI.dispatch,
      defaultErrorMessage: "Failed to create a trail. Please try again after sometime.",
    })
  } finally {
    thunkAPI.dispatch(
      appActions.setContextualLoadingState({
        loading: false,
        id: CONTEXT_ID.UPDATE_TRAIL,
        message: "Creating a Trail...",
      })
    )
  }
})
