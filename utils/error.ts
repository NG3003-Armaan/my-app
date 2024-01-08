import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit"
import { appActions } from "store/slice"

export function handleError({
  error,
  dispatch,
  defaultErrorMessage,
}: {
  error?: unknown
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>
  defaultErrorMessage?: string
}) {
  dispatch(
    appActions.setPopupErrorNotification({
      message: defaultErrorMessage ?? "Something went wrong. Please try again later.",
    })
  )
}
