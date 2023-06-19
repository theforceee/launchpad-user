import { ComponentType } from "react"
import { modalSubject } from "./modal-subject"
import { ModalOptions, ModalRef, ExtractModalData, ModalProps, AfterClosedCb } from "./types"

export function openModal<T extends ComponentType<ModalProps>>(
  Content: T,
  options?: ModalOptions<ExtractModalData<T>>
) {
  let _afterClosedCb: AfterClosedCb
  const modalList = modalSubject.getValue()
  const modalId = modalList.length + 1

  const modalRef: ModalRef = {
    close: (data?: any) => {
      _afterClosedCb?.(data)

      const newModals = modalSubject.getValue().filter((modal) => modal.modalId !== modalId)

      modalSubject.next(newModals)
    },
    afterClosed: (cb: AfterClosedCb) => {
      _afterClosedCb = cb
    }
  }

  const modalOpts: ModalOptions = options || {}

  modalSubject.next([...modalList, { modalId, content: Content, options: modalOpts, modalRef }])

  return modalRef
}
