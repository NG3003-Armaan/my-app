import { Button, Icon } from "components"
import LinkIcon from "components/LinkIcon/LinkIcon"
import Modal from "components/Modal/Modal"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { appActions, type AppState } from "store/slice"

export default function NotificationModal() {
  const { show, message, type } = useAppSelector<AppState["showNotificationModal"]>(
    (state) => state.app.showNotificationModal
  )

  const dispatch = useAppDispatch()

  const onDismiss = () => {
    dispatch(appActions.resetNotificationModal())
  }

  return (
    <Modal
      isOpen={show}
      onOpenChange={() => {
        onDismiss()
      }}
    >
      <div className="flex items-center justify-center">
        {type ? (
          <LinkIcon name="success" className="h-16 w-16" />
        ) : (
          <Icon name="alertTriangle" className="text-red" size={52} />
        )}
      </div>
      <p className="mt-4 text-center">{message}</p>
      <Button className="mx-auto mt-8 block" onClick={onDismiss}>
        Ok
      </Button>
    </Modal>
  )
}
