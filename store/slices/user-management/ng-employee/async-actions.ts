import { createAsyncThunk } from "@reduxjs/toolkit"
import { API } from "service"
import { appActions, CONTEXT_ID } from "store/slice"
import { AppState } from "store/store"
import { reloadPage } from "utils/browser"
import { handleError } from "utils/error"
import { ngEmployeeActions } from "."

export const createNgEmployee = createAsyncThunk("user-management/ng-employee/manager/search", async (_, thunkAPI) => {
  const state = thunkAPI.getState() as AppState

  const { updatedEmployeeRoles } = state.ngEmployee

  if (updatedEmployeeRoles.length <= 0) {
    return thunkAPI.dispatch(
      appActions.setPopupErrorNotification({ message: "Change the Employee roles before submitting." })
    )
  }
})

export const updateNgEmployeeStatus = createAsyncThunk(
  "user-management/ng-employee/manage",
  async ({ changedAgentStatus }: { changedAgentStatus: boolean }, thunkAPI) => {
    const state = thunkAPI.getState() as AppState

    const { searchedEmployeeDetail } = state.ngEmployee

    if (!changedAgentStatus || !searchedEmployeeDetail) {
      return thunkAPI.dispatch(
        appActions.setPopupErrorNotification({ message: "You've to change the status before submitting." })
      )
    }

    thunkAPI.dispatch(
      appActions.setContextualLoadingState({
        loading: true,
        message: "Updating Status",
        id: CONTEXT_ID.UPDATE_NG_EMPLOYEE,
      })
    )

    try {
      await API.updateNgEmployeeStatus({
        employeeStatus: searchedEmployeeDetail.status,
        employeeCode: searchedEmployeeDetail.id,
      })

      thunkAPI.dispatch(
        appActions.setShowNotificationModal({
          type: "success",
          show: true,
          message: `${searchedEmployeeDetail.name} ID  has been updated to ${searchedEmployeeDetail.status}`,
        })
      )

      // TODO - for now we'll restart the page so that new updated data will be fetched
      setTimeout(() => {
        reloadPage()
      }, 1500)

      thunkAPI.dispatch(ngEmployeeActions.resetSearchResult())
    } catch (err) {
      return handleError({
        defaultErrorMessage: "Failed to update employee status. Please try again after sometime.",
        dispatch: thunkAPI.dispatch,
      })
    } finally {
      thunkAPI.dispatch(
        appActions.setContextualLoadingState({
          loading: false,
          message: "Updating Status",
          id: CONTEXT_ID.UPDATE_NG_EMPLOYEE,
        })
      )
    }
  }
)
