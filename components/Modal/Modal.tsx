import * as Dialog from "@radix-ui/react-dialog"
import * as React from "react"

import ClientOnly from "components/ClientOnly/ClientOnly"
import { poppins } from "utils/fonts"

export interface ModalProps {
  children: React.ReactNode
  isOpen: boolean
  onOpenChange: () => void
}

export default function Modal(props: ModalProps) {
  return (
    <ClientOnly>
      <Dialog.Root open={props.isOpen} onOpenChange={props.onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className={`DialogContent ${poppins.variable} font-poppins`}>{props.children}</Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </ClientOnly>
  )
}
