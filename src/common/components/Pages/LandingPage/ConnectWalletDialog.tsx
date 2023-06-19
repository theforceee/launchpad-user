import { Wallet } from "@/common/constants/networks"
import { Modal, ModalProps } from "@components/Base/Modal"
import { useEffect } from "react"
import { useConnect } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"

type ConnectWalletDialog = {
  show: boolean
  handleClose: () => void
  onConnectWallet: (wallet: Wallet) => Promise<void>
}

const ConnectWalletDialog = ({ modalRef }: ModalProps) => {
  const { connect, connectors, isLoading, pendingConnector, error, isSuccess } = useConnect({
    connector: new InjectedConnector()
  })

  useEffect(() => {
    if (!isSuccess) return

    modalRef.close()
  }, [isSuccess])

  return (
    <Modal>
      <Modal.Body>
        <div className="mt-2 flex flex-wrap gap-3">
          {connectors.map((connector) => (
            <button
              // disabled={!connector.ready}
              key={connector.id}
              onClick={() => connect({ connector })}
              className="h-10 cursor-pointer rounded-lg bg-blue-700 px-5 text-white"
            >
              {connector.name}
              {isLoading && connector.id === pendingConnector?.id && " (connecting)"}
            </button>
          ))}
        </div>
        {error && <div className="text-red-600">{error.message}</div>}

        <div className="mt-4">
          <button
            type="button"
            className="text-sm inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={modalRef.close}
          >
            Got it, thanks!
          </button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ConnectWalletDialog
