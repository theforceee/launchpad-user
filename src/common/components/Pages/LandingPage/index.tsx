import { Wallet } from "@constants/networks"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { useAccount, useDisconnect, useEnsName, useNetwork } from "wagmi"
import ConnectWalletDialog from "./ConnectWalletDialog"
import SwitchNetworkDialog from "./SwitchNetworkDialog"
import { useTranslation } from "react-i18next"

const LandingPage = () => {
  const { t } = useTranslation()
  const { address, isConnected, connector } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { disconnect } = useDisconnect()
  const { chain } = useNetwork()

  const [openConnectDialog, setOpenConnectDialog] = useState<boolean>(false)
  const [openNetworkDialog, setOpenNetworkDialog] = useState<boolean>(false)

  useEffect(() => {
    isConnected && setOpenConnectDialog(false)
  }, [isConnected])

  async function handleSelectWallet(wallet: Wallet) {
    setOpenConnectDialog(false)
  }

  return (
    <div
      className={clsx(
        "py-20 mt-10 bg-gray-300 text-black",
        "dark:bg-main dark:text-white"
      )}
    >
      <div className="mx-auto max-w-screen-main flex gap-5">
        {isConnected ? (
          <div>
            <div>{ensName ? `${ensName} (${address})` : address}</div>
            <div>Connected to: {connector?.name}</div>
            <div>Current Chain: {chain?.name}</div>
            <button
              className="bg-green-700 text-white rounded-lg px-5 h-10"
              onClick={() => setOpenNetworkDialog(true)}
            >
              {t("switch_network")}
            </button>
            <button
              onClick={() => disconnect()}
              className="bg-red-700 text-white rounded-lg px-5 h-10 ml-3"
            >
              {t("disconnect")}
            </button>
          </div>
        ) : (
          <button
            className="px-4 py-3 bg-green-500 rounded-lg"
            onClick={() => setOpenConnectDialog(true)}
          >
            {t("connect_wallet")}
          </button>
        )}
      </div>

      <div className="mx-auto max-w-screen-main flex gap-5">
        <a href="#" className="card education">
          <div className="overlay"></div>
          <div className="circle">
            <svg
              width="71px"
              height="76px"
              viewBox="29 14 71 76"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g
                id="Group"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
                transform="translate(30.000000, 14.000000)"
              >
                <g id="Group-8" fill="#D98A19">
                  <g id="Group-7">
                    <g id="Group-6">
                      <path
                        d="M0,0 L0,75.9204805 L69.1511499,75.9204805 L0,0 Z M14.0563973,32.2825679 L42.9457663,63.9991501 L14.2315268,63.9991501 L14.0563973,32.2825679 Z"
                        id="Fill-1"
                      ></path>
                    </g>
                  </g>
                </g>
                <g
                  id="Group-20"
                  transform="translate(0.000000, 14.114286)"
                  stroke="#FFFFFF"
                  strokeLinecap="square"
                >
                  <path
                    d="M0.419998734,54.9642857 L4.70316223,54.9642857"
                    id="Line"
                  ></path>
                  <path
                    d="M0.419998734,50.4404762 L4.70316223,50.4404762"
                    id="Line"
                  ></path>
                  <path
                    d="M0.419998734,45.9166667 L4.70316223,45.9166667"
                    id="Line"
                  ></path>
                  <path
                    d="M0.419998734,41.3928571 L2.93999114,41.3928571"
                    id="Line"
                  ></path>
                  <path
                    d="M0.419998734,36.8690476 L4.70316223,36.8690476"
                    id="Line"
                  ></path>
                  <path
                    d="M0.419998734,32.3452381 L4.70316223,32.3452381"
                    id="Line"
                  ></path>
                  <path
                    d="M0.419998734,27.8214286 L4.70316223,27.8214286"
                    id="Line"
                  ></path>
                  <path
                    d="M0.419998734,23.297619 L2.93999114,23.297619"
                    id="Line"
                  ></path>
                  <path
                    d="M0.419998734,18.7738095 L4.70316223,18.7738095"
                    id="Line"
                  ></path>
                  <path
                    d="M0.419998734,14.25 L4.70316223,14.25"
                    id="Line"
                  ></path>
                  <path
                    d="M0.419998734,9.72619048 L4.70316223,9.72619048"
                    id="Line"
                  ></path>
                  <path
                    d="M0.419998734,5.20238095 L2.93999114,5.20238095"
                    id="Line"
                  ></path>
                  <path
                    d="M0.419998734,0.678571429 L4.70316223,0.678571429"
                    id="Line"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
          <p>Education</p>
        </a>
      </div>

      <ConnectWalletDialog
        handleClose={() => setOpenConnectDialog(false)}
        show={openConnectDialog}
        onConnectWallet={handleSelectWallet}
      />

      <SwitchNetworkDialog
        handleClose={() => setOpenNetworkDialog(false)}
        show={openNetworkDialog}
      />
    </div>
  )
}

export default LandingPage
