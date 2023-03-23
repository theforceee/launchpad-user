import useIsMounted from "@/hooks/uselsMounted"
import { useEffect, useState } from "react"
import { useAccount, useDisconnect, useEnsName, useNetwork } from "wagmi"
import { Wallet } from "../../../../constants/networks"
import ConnectWalletDialog from "./ConnectWalletDialog"
import SwitchNetworkDialog from "./SwitchNetworkDialog"

const LandingPage = () => {
  const mounted = useIsMounted()
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
    <div className="py-20 bg-gray-300 mt-10">
      {mounted ? (
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
                Switch network
              </button>
              <button
                onClick={() => disconnect()}
                className="bg-red-700 text-white rounded-lg px-5 h-10 ml-3"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              className="px-4 py-3 bg-green-500 rounded-lg"
              onClick={() => setOpenConnectDialog(true)}
            >
              Connect Wallet
            </button>
          )}
        </div>
      ) : null}

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
