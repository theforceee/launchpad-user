import clsx from "clsx"
import { useAccount, useEnsName, useNetwork } from "wagmi"
import { ConnectWalletDialog } from "./ConnectWalletDialog"
import { SwitchNetworkDialog } from "./SwitchNetworkDialog"
import { openModal } from "@components/Base/Modal"

const LandingPage = () => {
  const { address, isConnected, connector } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { chain } = useNetwork()

  const openSwithNetwork = () => {
    openModal(SwitchNetworkDialog)
  }

  const openConnectWalletModal = () => {
    openModal(ConnectWalletDialog)
  }

  return (
    <div className={clsx("bg-gray-300 py-28 text-black")}>
      <div className="container flex gap-5">
        {isConnected ? (
          <div>
            <div>{ensName ? `${ensName} (${address})` : address}</div>
            <div>Connected to: {connector?.name}</div>
            <div>Current Chain: {chain?.name}</div>
            <button
              className="h-10 rounded-lg bg-green-700 px-5 text-white"
              onClick={openSwithNetwork}
            >
              Switch network
            </button>
          </div>
        ) : (
          <button className="rounded-lg bg-green-500 px-4 py-3" onClick={openConnectWalletModal}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  )
}

export default LandingPage
