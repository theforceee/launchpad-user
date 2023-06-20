import { InjectedConnector } from "@wagmi/core"
import { MetaMaskConnector } from "@wagmi/core/connectors/metaMask"
import { publicProvider } from "@wagmi/core/providers/public"
import { configureChains, createConfig } from "wagmi"
import { bsc, bscTestnet, goerli, mainnet } from "wagmi/chains"
import { WalletConnectConnector } from "wagmi/connectors/walletConnect"
import { WALLET_CONNECT_PROJECT_ID } from "."

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, goerli, bsc, bscTestnet],
  [publicProvider()]
)

// Set up client
export const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: WALLET_CONNECT_PROJECT_ID,
        showQrModal: true
      }
    })
  ],
  publicClient,
  webSocketPublicClient
})
