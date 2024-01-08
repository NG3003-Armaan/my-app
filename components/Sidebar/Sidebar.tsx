import * as Dialog from "@radix-ui/react-dialog"
import { poppins } from "utils/fonts"

interface SidebarProps {
  isOpen: boolean
  onOpenChange: () => void
  children: React.ReactNode
}

export default function Sidebar(props: SidebarProps) {
  return (
    <Dialog.Root open={props.isOpen} onOpenChange={props.onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className={`sidebar-content relative ${poppins.variable} font-poppins`}>
          {props.children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
