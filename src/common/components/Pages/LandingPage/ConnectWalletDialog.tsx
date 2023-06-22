import clsx from "clsx"
import { Chain, IS_MAINNET, SUPPORTED_CHAINS, Wallet } from "@/common/constants/networks"
import { Modal, ModalProps } from "@components/Base/Modal"
import { useEffect, useState } from "react"
import { useConnect } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"
import metamaskImg from "@images/wallets/metamask.png"
import walletConnectImg from "@images/wallets/wallet-connect.png"
import Image, { StaticImageData } from "next/image"
import { Spinner } from "@components/Base/Spinner"
import { Checkbox } from "@components/Base/Form"

const connector2Img: { [k: string]: StaticImageData } = {
  metaMask: metamaskImg,
  walletConnect: walletConnectImg
}

type ConnectWalletDialog = {
  show: boolean
  handleClose: () => void
  onConnectWallet: (wallet: Wallet) => Promise<void>
}

const ConnectWalletDialog = ({ modalRef }: ModalProps) => {
  const validChains = SUPPORTED_CHAINS.filter((chain) => chain.isMainnet === IS_MAINNET)
  const [selectedChain, setSelectedChain] = useState<Chain>(validChains[0])
  const [tosAccepted, setTosAccepted] = useState(false)
  const { connect, connectors, pendingConnector, error, isSuccess } = useConnect({
    connector: new InjectedConnector()
  })

  useEffect(() => {
    if (!isSuccess) return

    modalRef.close()
  }, [isSuccess, modalRef])

  return (
    <Modal>
      <Modal.Header className="mb-6 text-center font-poppins text-28/36 font-semibold text-white">
        Connect Wallet
      </Modal.Header>

      <Modal.Body className="max-w-[360px]">
        <div className="mb-6 flex justify-start text-white">
          <label className="text-left text-14/18">
            <Checkbox
              className="mr-1"
              name="policy"
              onChange={() => setTosAccepted((accept) => !accept)}
            />{" "}
            I read and accept the <a className="font-semibold text-clr-blue-60">Terms of Service</a>{" "}
            and <a className="font-semibold text-clr-blue-60">Privacy Policy</a>
          </label>
        </div>

        <div className="relative mt-2 flex flex-wrap gap-3 overflow-hidden rounded-3xl bg-clr-purple-70 px-4 py-6 md:px-[50px]">
          <div className="mb-6 w-full">
            <div className="mb-4 w-full text-center font-inter text-14/18 font-semibold text-white">
              Choose Network
            </div>
            <div className="grid w-full grid-cols-2 gap-2 text-white">
              {validChains.map((chain) => (
                <button
                  key={chain.id}
                  disabled={!tosAccepted}
                  onClick={() => setSelectedChain(chain)}
                  className={clsx(
                    "flex h-[33px] w-full items-center justify-center gap-1 rounded-[12px] bg-clr-purple-50 px-2 text-12/16 duration-200",
                    "from-[#9887F2] to-clr-purple-80 hover:bg-gradient-to-r",
                    {
                      "bg-gradient-to-r ": chain.id === selectedChain.id
                    }
                  )}
                >
                  <Image src={chain.iconSrc} alt="" width={16} height={16} /> {chain.name}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full">
            <div className="mb-4 w-full text-center font-inter text-14/18 font-semibold text-white">
              Choose Wallet
            </div>
            <div className="grid w-full grid-cols-2 gap-4">
              {connectors.map((connector) => {
                const connectorImg = connector2Img[connector.id]
                return (
                  <button
                    // disabled={!connector.ready || !pendingConnector}
                    disabled={!tosAccepted}
                    key={connector.id}
                    onClick={() => connect({ connector, chainId: selectedChain.id })}
                    className={clsx(
                      "flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg py-4 text-white",
                      "bg-clr-purple-50 from-[#9887F2] to-clr-purple-80 hover:bg-gradient-to-r",
                      "h-[88px] w-[96x] text-12/16",
                      {
                        "bg-gradient-to-r": !error && pendingConnector?.id === connector.id
                      }
                    )}
                  >
                    <Image src={connectorImg?.src} alt="" width={32} height={32} />
                    {connector.name}
                  </button>
                )
              })}
            </div>
          </div>

          {!tosAccepted && (
            <div className="absolute top-0 right-0 bottom-0 left-0 flex cursor-not-allowed items-center justify-center bg-clr-purple-70 opacity-50" />
          )}

          {!error && pendingConnector && (
            <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
              <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-clr-purple-70 opacity-80" />
              <div className="relative flex flex-col items-center justify-center gap-2 text-14/18 text-white">
                <Spinner />
                Connecting
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-2 text-14/18 text-red-600">{error.message?.split(".")[0]}</div>
        )}
      </Modal.Body>
    </Modal>
  )
}

export default ConnectWalletDialog
