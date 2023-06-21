import clsx from "clsx"
import { useState } from "react"
import { useAccount, useDisconnect, useEnsName, useNetwork } from "wagmi"
import ConnectWalletDialog from "./ConnectWalletDialog"
import SwitchNetworkDialog from "./SwitchNetworkDialog"
import { openModal } from "@components/Base/Modal"

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

      <SwitchNetworkDialog
        handleClose={() => setOpenNetworkDialog(false)}
        show={openNetworkDialog}
      />
    </div>
  )
}

export default LandingPage
