import { Dialog, Transition } from "@headlessui/react"
import clsx from "clsx"
import { Fragment } from "react"
import { useNetwork, useSwitchNetwork } from "wagmi"

type SwitchNetworkDialogProps = {
  show: boolean
  handleClose: () => void
}

const SwitchNetworkDialog = (props: SwitchNetworkDialogProps) => {
  const { show, handleClose } = props
  const { chain: currentChain } = useNetwork()
  const { chains, isLoading, pendingChainId, switchNetworkAsync } = useSwitchNetwork()

  const handleSwitchNetwork = async (newWorkId: number) => {
    try {
      switchNetworkAsync && (await switchNetworkAsync(newWorkId))
      handleClose()
    } catch (error) {
      console.log("ERR handleSwitchNetwork:", error)
    }
  }

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
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Switch Network
                </Dialog.Title>
                <div className="mt-2 flex flex-wrap gap-3">
                  {chains.map(
                    (chain) =>
                      chain.id !== currentChain?.id && (
                        <button
                          disabled={isLoading}
                          key={chain.id}
                          onClick={() => handleSwitchNetwork(chain.id)}
                          className={clsx(
                            "h-10 rounded-lg border-2 bg-yellow-700 px-5 text-white",
                            !isLoading && "hover:border-black"
                          )}
                        >
                          {chain.name}
                          {isLoading && pendingChainId === chain.id && " (switching)"}
                        </button>
                      )
                  )}
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="text-sm inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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

export default SwitchNetworkDialog
