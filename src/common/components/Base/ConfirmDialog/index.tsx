import { useState } from "react"
import { Modal, ModalProps } from "../Modal"

export type ConfirmDialogData = {
  title?: React.ReactNode
  content?: React.ReactNode
  onConfirm: () => Promise<unknown> | unknown
}

const ConfirmDialog = ({ modalRef, data }: ModalProps<ConfirmDialogData>) => {
  const { title, content, onConfirm } = data ?? {}
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleConfirm = async () => {
    try {
      setIsLoading(true)
      console.log("onConfirm", onConfirm)
      await onConfirm?.()
      modalRef.close()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal>
      <Modal.Body>
        <div className="mt-2 flex flex-wrap gap-3">{title ?? "Are you sure?"}</div>
        {content && <div className="mt-2 flex flex-wrap gap-3">{content}</div>}

        <div className="mt-4">
          <button
            type="button"
            color="#000024"
            className="text-sm inline-flex justify-center  rounded-md border border-transparent bg-blue-100 px-4 py-2 font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={() => modalRef.close()}
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isLoading}
            className="text-sm ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ConfirmDialog
