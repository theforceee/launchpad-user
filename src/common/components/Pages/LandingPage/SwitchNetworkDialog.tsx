import { Modal, ModalProps } from "@components/Base/Modal"
import { VALID_CHAINS } from "@constants/networks"
import clsx from "clsx"
import { useEffect } from "react"
import { useNetwork, useSwitchNetwork } from "wagmi"
import Image from "next/image"
import { toast } from "react-toastify"
import { Spinner } from "@components/Base/Spinner"

export const SwitchNetworkDialog = ({ modalRef }: ModalProps) => {
  const { chain: currentChain } = useNetwork()
  const { isLoading, switchNetworkAsync, error, isSuccess } = useSwitchNetwork()

  useEffect(() => {
    if (!isSuccess) return

    toast.success("Switch network successfully!")
    modalRef.close()
  }, [isSuccess, modalRef])

  const handleSwitchNetwork = async (newWorkId: number) => {
    try {
      switchNetworkAsync && (await switchNetworkAsync(newWorkId))
    } catch {}
  }

  return (
    <Modal>
      <Modal.Header className="mb-6 text-center font-poppins text-28/36 font-semibold text-white">
        Switch Network
      </Modal.Header>

      <Modal.Body className="max-w-[360px]">
        <div className="grid w-full grid-cols-2 gap-2 text-white">
          {VALID_CHAINS.map((chain) => (
            <button
              disabled={isLoading || chain.id === currentChain?.id}
              key={chain.id}
              onClick={() => handleSwitchNetwork(chain.id)}
              className={clsx(
                "flex w-full flex-col items-center justify-center gap-2 rounded-[12px] bg-clr-purple-50 py-4 px-2 text-12/16 duration-200",
                "from-[#9887F2] to-clr-purple-80 hover:bg-gradient-to-r",
                {
                  "bg-gradient-to-r ": chain.id === currentChain?.id
                }
              )}
            >
              <Image src={chain.iconSrc} alt="" width={32} height={32} /> {chain.name}
            </button>
          ))}
        </div>

        {error && (
          <div className="mt-2 text-14/18 text-red-600">{error.message?.split(".")[0]}</div>
        )}
      </Modal.Body>

      {!error && isLoading && (
        <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
          <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-clr-purple-70 opacity-80" />
          <div className="relative flex flex-col items-center justify-center gap-2 text-14/18 text-white">
            <Spinner />
            Switching
          </div>
        </div>
      )}
    </Modal>
  )
}
