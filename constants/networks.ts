import { bsc, bscTestnet, goerli, mainnet } from "wagmi/chains"

export const SUPPORTED_CHAINS = [
  { id: bsc.id, name: bsc.name },
  { id: bscTestnet.id, name: bscTestnet.name },
  { id: goerli.id, name: goerli.name },
  { id: mainnet.id, name: mainnet.name }
]

export const SUPPORTED_WALLETS = [
  { id: "metamask", name: "Metamask" },
  { id: "walletconnect", name: "WalletConnect" }
]

export type Wallet = (typeof SUPPORTED_WALLETS)[number]["id"]
