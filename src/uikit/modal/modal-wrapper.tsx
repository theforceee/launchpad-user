import { PropsWithChildren } from "react"
import { ModalData } from "./types"
import { ModalContext } from "./modal-context"
import { Dialog } from "@headlessui/react"

type ModalWrapperProps = PropsWithChildren<{
  modal: ModalData
}>

export function ModalWrapper(props: ModalWrapperProps) {
  const { modal, children } = props

  return (
    <Dialog open as="div" className="relative z-50" onClose={() => modal.modalRef.close()}>
      <div className="fixed inset-0 overflow-y-auto overflow-x-hidden">
        <div className="min-h-full">
          <Dialog.Panel className="h-screen min-h-full">
            <ModalContext.Provider value={{ modal }}>
              <Dialog.Description className="h-screen min-h-full">
                <div tabIndex={0} data-testid="sentinelStart"></div>
                <modal.content modalRef={modal.modalRef} data={modal.options?.data} />
                <div tabIndex={0} data-testid="sentinelStart"></div>
              </Dialog.Description>
            </ModalContext.Provider>
          </Dialog.Panel>
        </div>
      </div>

      {children}
    </Dialog>
  )
}
