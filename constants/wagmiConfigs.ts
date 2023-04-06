import { configureChains, createClient } from "wagmi"
import { publicProvider } from "wagmi/providers/public"
import { bsc, bscTestnet, goerli, mainnet } from "wagmi/chains"

import { InjectedConnector } from "wagmi/connectors/injected"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { WalletConnectLegacyConnector } from "wagmi/connectors/walletConnectLegacy"

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, goerli, bsc, bscTestnet],
  [publicProvider()]
)

// Set up client
export const wagmiClient = createClient({
  autoConnect: false,
  connectors: [
    new MetaMaskConnector({
      chains,
      options: {
        // shimDisconnect: true,
        // UNSTABLE_shimOnConnectSelectAccount: true
      }
    }),
    // new WalletConnectConnector({
    //   chains,
    //   options: {
    //     projectId: "...",
    //     showQrModal: true
    //   }
    // }),
    new WalletConnectLegacyConnector({
      chains,
      options: {
        qrcode: true
      }
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true
      }
    })
  ],
  provider,
  webSocketProvider
})
