import clsx from "clsx"
import { useState } from "react"
import { useAccount, useDisconnect, useEnsName, useNetwork } from "wagmi"
import ConnectWalletDialog from "./ConnectWalletDialog"
import SwitchNetworkDialog from "./SwitchNetworkDialog"
import { openModal } from "@uikit/modal"

const LandingPage = () => {
  const { address, isConnected, connector } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { disconnect } = useDisconnect()
  const { chain } = useNetwork()

  const [openNetworkDialog, setOpenNetworkDialog] = useState<boolean>(false)

  const openConnectWalletModal = () => {
    openModal(ConnectWalletDialog)
  }

  return (
    <div className={clsx("bg-gray-300 py-28 text-black")}>
      <div className="section mx-auto flex gap-5">
        {isConnected ? (
          <div>
            <div>{ensName ? `${ensName} (${address})` : address}</div>
            <div>Connected to: {connector?.name}</div>
            <div>Current Chain: {chain?.name}</div>
            <button
              className="h-10 rounded-lg bg-green-700 px-5 text-white"
              onClick={() => setOpenNetworkDialog(true)}
            >
              Switch network
            </button>
            <button
              onClick={() => disconnect()}
              className="ml-3 h-10 rounded-lg bg-red-700 px-5 text-white"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button className="rounded-lg bg-green-500 px-4 py-3" onClick={openConnectWalletModal}>
            Connect Wallet
          </button>
        )}
      </div>

      <div className="section mx-auto flex gap-5">
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
                  <path d="M0.419998734,54.9642857 L4.70316223,54.9642857" id="Line"></path>
                  <path d="M0.419998734,50.4404762 L4.70316223,50.4404762" id="Line"></path>
                  <path d="M0.419998734,45.9166667 L4.70316223,45.9166667" id="Line"></path>
                  <path d="M0.419998734,41.3928571 L2.93999114,41.3928571" id="Line"></path>
                  <path d="M0.419998734,36.8690476 L4.70316223,36.8690476" id="Line"></path>
                  <path d="M0.419998734,32.3452381 L4.70316223,32.3452381" id="Line"></path>
                  <path d="M0.419998734,27.8214286 L4.70316223,27.8214286" id="Line"></path>
                  <path d="M0.419998734,23.297619 L2.93999114,23.297619" id="Line"></path>
                  <path d="M0.419998734,18.7738095 L4.70316223,18.7738095" id="Line"></path>
                  <path d="M0.419998734,14.25 L4.70316223,14.25" id="Line"></path>
                  <path d="M0.419998734,9.72619048 L4.70316223,9.72619048" id="Line"></path>
                  <path d="M0.419998734,5.20238095 L2.93999114,5.20238095" id="Line"></path>
                  <path d="M0.419998734,0.678571429 L4.70316223,0.678571429" id="Line"></path>
                </g>
              </g>
            </svg>
          </div>
          <p>Education</p>
        </a>
      </div>

      <SwitchNetworkDialog
        handleClose={() => setOpenNetworkDialog(false)}
        show={openNetworkDialog}
      />
    </div>
  )
}

export default LandingPage
