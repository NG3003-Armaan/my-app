import { createAsyncThunk } from "@reduxjs/toolkit"
import { API } from "service"
import { appActions } from "store/slice"

export const bulkUpload = createAsyncThunk(
  "litigation/manual-upload",
  async ({ litigationFile }: { litigationFile: File }, thunkAPI) => {
    try {
      await API.uploadLrnDNFile(litigationFile)

      return thunkAPI.dispatch(
        appActions.setPopupSuccessNotification({ message: "Litigation File uploaded successfully" })
      )
    } catch (error) {
      return thunkAPI.dispatch(
        appActions.setPopupErrorNotification({
          message: "failed in uploading Litigation File",
        })
      )
    }
  }
)

export const uploadCaseStatus = createAsyncThunk(
  "litigation/upload-case-status",
  async ({ statusFile }: { statusFile: File }, thunkAPI) => {
    try {
      await API.uploadCaseStatusFile(statusFile)

      return thunkAPI.dispatch(
        appActions.setPopupSuccessNotification({ message: "Litigation Case Status File uploaded successfully" })
      )
    } catch (error) {
      return thunkAPI.dispatch(
        appActions.setPopupErrorNotification({
          message: "failed in uploading Litigation File",
        })
      )
    }
  }
)
