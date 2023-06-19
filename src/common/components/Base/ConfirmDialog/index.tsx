import { useState } from "react"
import { Modal, ModalProps } from "../Modal"

const ConfirmDialog = ({ modalRef, data }: ModalProps) => {
  const { dialogContent, onConfirm } = data ?? {}
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleConfirm = async () => {
    setIsLoading(true)
    await onConfirm?.()
    setIsLoading(false)
    modalRef.close()
  }
  return (
    <Modal>
      <Modal.Body>
        <div className="mt-2 flex flex-wrap gap-3">{dialogContent ?? "Are you sure?"}</div>

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
