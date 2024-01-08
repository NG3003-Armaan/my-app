import * as Dialog from "@radix-ui/react-dialog"
import Spinner from "components/Spinner/Spinner"
import { useAppSelector } from "store/hooks"
import { AppState } from "store/slice"
import { poppins } from "utils/fonts"

export default function Loader() {
  const { loading, message } = useAppSelector<AppState["contextualLoadingState"]>(
    (state) => state.app.contextualLoadingState
  )
  return (
    <Dialog.Root open={loading}>
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay">
          <Dialog.Content className={`relative ${poppins.variable} font-poppins`}>
            <Spinner className="m-auto h-[40px] w-[40px]" />
            <p className="pt-4 text-white">{message}</p>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
