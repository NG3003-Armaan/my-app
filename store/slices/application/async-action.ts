import { createAsyncThunk } from "@reduxjs/toolkit"
import { API } from "service"
import { appActions, CONTEXT_ID } from "store/slice"
import { processPayload } from "utils"
import { ApplicationMapper, ApplicationMapperType } from "../user-management/ng-employee/mapper"
import { applicationAction } from "."

export const getApplication = createAsyncThunk(
  "application/getApplication",
  async ({ searchQuery }: { searchQuery: { value: string; label: string } }, thunkAPI) => {
    if (!searchQuery.value) return

    thunkAPI.dispatch(
      appActions.setContextualLoadingState({
        id: CONTEXT_ID.GET_APPLICATION,
        loading: true,
        message: `Fetching Application details of ${searchQuery.value}`,
      })
    )

    try {
      const response = await API.getApplication(searchQuery.value)

      // TODO - remove this in the future
      const { application } = processPayload<ApplicationMapperType>(response.data, ApplicationMapper)

      thunkAPI.dispatch(applicationAction.setApplication(application))
      thunkAPI.dispatch(applicationAction.setSearchQuery(searchQuery))
    } catch (err) {
      return thunkAPI.dispatch(
        appActions.setPopupErrorNotification({
          message: "Failed to fetch Application details. Please try again after sometime.",
        })
      )
    } finally {
      thunkAPI.dispatch(
        appActions.setContextualLoadingState({
          id: CONTEXT_ID.GET_APPLICATION,
          loading: false,
          message: "",
        })
      )
    }
  }
)
