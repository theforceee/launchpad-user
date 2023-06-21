import { bsc, bscTestnet, goerli, mainnet } from "wagmi/chains"

export const ETH_NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID || ""
export const BSC_NETWORK_ID = process.env.NEXT_PUBLIC_BSC_CHAIN_ID || ""
export const USDT_ETH_ADDRESS = process.env.NEXT_PUBLIC_USDT_ETH_SMART_CONTRACT || ""
export const USDT_BSC_ADDRESS = process.env.NEXT_PUBLIC_USDT_BSC_SMART_CONTRACT || ""

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

export enum ChainId {
  MAINNET = 1,
  GOERLI = 5,
  BSC_TESTNET = 97,
  BSC_MAINNET = 56
}
export type chainId = Extract<
  ChainId,
  ChainId.BSC_MAINNET | ChainId.BSC_TESTNET | ChainId.MAINNET | ChainId.GOERLI
>

export const MAPPING_USDT_BY_NETWORK_ID: any = {
  [ChainId.BSC_MAINNET]: USDT_BSC_ADDRESS,
  [ChainId.BSC_TESTNET]: USDT_BSC_ADDRESS,
  [ChainId.MAINNET]: USDT_ETH_ADDRESS,
  [ChainId.GOERLI]: USDT_ETH_ADDRESS
}
