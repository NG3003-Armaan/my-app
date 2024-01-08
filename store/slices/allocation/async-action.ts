import { createAsyncThunk } from "@reduxjs/toolkit"
import { API } from "service"
import { appActions, CONTEXT_ID } from "store/slice"
import { processPayload } from "utils"
import { AllocationMapper, AllocationMapperType } from "../user-management/ng-employee/mapper"
import { allocationActions } from "."

export const getAgentAllocation = createAsyncThunk(
  "allocation/getAgentAllocation",
  async ({ agentId }: { agentId: string }, thunkAPI) => {
    if (!agentId) return

    thunkAPI.dispatch(
      appActions.setContextualLoadingState({
        id: CONTEXT_ID.GET_ALLOCATION,
        loading: true,
        message: `Fetching ${agentId} Allocations`,
      })
    )

    try {
      const response = await API.getAllocation(agentId)

      // TODO - remove this in the future
      await new Promise((res) => setTimeout(res, 3000))

      const { allocations } = processPayload<AllocationMapperType>(response.data, AllocationMapper)
      thunkAPI.dispatch(allocationActions.setAllocations(allocations))

      return
    } catch (err) {
      return thunkAPI.dispatch(
        appActions.setPopupErrorNotification({
          message: "Failed to fetch Allocation details. Please try again after sometime.",
        })
      )
    } finally {
      thunkAPI.dispatch(
        appActions.setContextualLoadingState({ id: CONTEXT_ID.GET_ALLOCATION, loading: false, message: "" })
      )
    }
  }
)

export const bulkUpload = createAsyncThunk(
  "allocation/bulkUpload",
  async ({ allocationFile }: { allocationFile: File }, thunkAPI) => {
    if (!allocationFile) return
    thunkAPI.dispatch(
      appActions.setContextualLoadingState({
        id: CONTEXT_ID.UPLOAD_ALLOCATION,
        loading: true,
        message: `Uploading Allocation file`,
      })
    )
    try {
      await API.uploadAllocation(allocationFile)

      return thunkAPI.dispatch(appActions.setPopupSuccessNotification({ message: "AUM file uploaded successfully" }))
    } catch (err) {
      return thunkAPI.dispatch(
        appActions.setPopupErrorNotification({
          message: "Failed to upload AUM file. Please try again after sometime.",
        })
      )
    } finally {
      thunkAPI.dispatch(
        appActions.setContextualLoadingState({ id: CONTEXT_ID.UPLOAD_ALLOCATION, loading: false, message: "" })
      )
    }
  }
)

export const importAllocationFile = createAsyncThunk(
  "allocation/importDocument",
  async ({ url }: { url: string }, thunkAPI) => {
    if (!url) return
    thunkAPI.dispatch(
      appActions.setContextualLoadingState({
        id: CONTEXT_ID.UPLOAD_ALLOCATION,
        loading: true,
        message: `Importing Allocation file`,
      })
    )
    try {
      const fileName = url.replace(/^.*[\\\/]/, "")
      const response = await API.importAllocationFile(url).then((response) => new Blob([response.data]))
      const myFile = new File([response], fileName, {
        type: response.type,
      })
      // TODO - remove this in the future
      // await new Promise((res) => setTimeout(res, 1000))
      // console.log(myFile)
      const urlBlob = URL.createObjectURL(myFile)
      return urlBlob
    } catch (err) {
      return thunkAPI.dispatch(
        appActions.setPopupErrorNotification({
          message: "Failed to fetch Allocation details. Please try again after sometime.",
        })
      )
    } finally {
      thunkAPI.dispatch(
        appActions.setContextualLoadingState({ id: CONTEXT_ID.UPLOAD_ALLOCATION, loading: false, message: "" })
      )
    }
  }
)
