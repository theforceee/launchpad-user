import { MetaMaskInpageProvider } from "@metamask/providers"

declare global {
  interface Window {
    ethereum?: any
    web3?: any
  }
}
