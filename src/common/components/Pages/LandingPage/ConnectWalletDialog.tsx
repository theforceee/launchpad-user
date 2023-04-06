import { Wallet } from "@/common/constants/networks"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { useConnect } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"

type ConnectWalletDialog = {
  show: boolean
  handleClose: () => void
  onConnectWallet: (wallet: Wallet) => Promise<void>
}

const ConnectWalletDialog = (props: ConnectWalletDialog) => {
  const { show, handleClose, onConnectWallet } = props

  const { connect, connectors, isLoading, pendingConnector, error } =
    useConnect({
      connector: new InjectedConnector()
    })

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Connect Wallet
                </Dialog.Title>
                <div className="flex mt-2 gap-3">
                  {connectors.map((connector) => (
                    <button
                      // disabled={!connector.ready}
                      key={connector.id}
                      onClick={() => connect({ connector })}
                      className="bg-blue-700 text-white rounded-lg cursor-pointer h-10 px-5"
                    >
                      {connector.name}
                      {isLoading &&
                        connector.id === pendingConnector?.id &&
                        " (connecting)"}
                    </button>
                  ))}
                </div>
                {error && <div className="text-red-600">{error.message}</div>}

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={handleClose}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ConnectWalletDialog
