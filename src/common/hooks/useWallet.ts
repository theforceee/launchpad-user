import { Wallet } from "@constants/networks"
import WalletConnectProvider from "@walletconnect/web3-provider"
import { ethers } from "ethers"
import { Dispatch, SetStateAction, useState } from "react"

type useWalletReturnTypes = [
  prodiver: ethers.providers.Web3Provider | null,
  wallet: Wallet | null,
  connectWallet: (wallet: Wallet) => Promise<void>,
  signIn: () => Promise<void>,
  setProvider: Dispatch<SetStateAction<ethers.providers.Web3Provider | null>>,
  logout: () => Promise<void>
]

function useWallet(): useWalletReturnTypes {
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null)
  const [wallet, setWallet] = useState<Wallet | null>(null)

  async function connect(wallet: Wallet) {
    let newProvider: ethers.providers.Web3Provider | null = null

    if (wallet === "metamask") {
      if (!window.ethereum) {
        throw new Error("Metamask not found")
      }

      await window.ethereum.request({ method: "eth_requestAccounts" })
      newProvider = new ethers.providers.Web3Provider(window.ethereum as any)
    } else if (wallet === "walletconnect") {
      const provider = new WalletConnectProvider({
        rpc: {
          1: "https://mainnet.infura.io/v3/7f1aa6a2b7d34eb58ef1c7a824011b8e",
          56: "https://bsc-dataseed.binance.org/",
          137: "https://polygon-rpc.com/"
        }
      })

      await provider.enable()
      newProvider = new ethers.providers.Web3Provider(provider)
    }

    if (newProvider) {
      setProvider(newProvider)
      setWallet(wallet)
    }
  }

  async function signIn() {
    if (!provider) {
      throw new Error("Not connected to a wallet")
    }

    const signer = provider.getSigner()
    const address = await signer.getAddress()

    const message = "Sign in to Wallet Connector"
    const signature = await signer.signMessage(message)

    // const wagmi = new Wagmi()
    // const response = await signMessage({ address, signature })

    // console.log(response)
  }
  async function logout() {}

  return [provider, wallet, connect, signIn, setProvider, logout]
}
export default useWallet
