import * as React from "react"
import toast from "react-hot-toast"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { appActions, AppState } from "store/slice"

export default function Toast() {
  const { popUpNotification } = useAppSelector<AppState>((state) => state.app)

  const { type, message } = popUpNotification

  const dispatch = useAppDispatch()
  React.useEffect(() => {
    if (!type || !message) {
      return
    }

    if (type === "success") {
      toast.success(message, { duration: 2000 })
      return
    }

    if (type === "error") {
      toast.error(message, { duration: 2000 })
    }

    const timeout = setTimeout(() => {
      dispatch(appActions.resetPopupNotification())
    }, 500)

    return () => {
      clearTimeout(timeout)
    }
  }, [type, message, dispatch])

  return null
}
