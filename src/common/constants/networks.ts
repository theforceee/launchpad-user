import { bsc, bscTestnet, goerli, mainnet } from "wagmi/chains"
import ethImg from "@images/icon-eth.png"
import bscImg from "@images/icon-bsc.png"

export const ETH_NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID || ""
export const BSC_NETWORK_ID = process.env.NEXT_PUBLIC_BSC_CHAIN_ID || ""
export const USDT_ETH_ADDRESS = process.env.NEXT_PUBLIC_USDT_ETH_SMART_CONTRACT || ""
export const USDT_BSC_ADDRESS = process.env.NEXT_PUBLIC_USDT_BSC_SMART_CONTRACT || ""

export type Chain = {
  id: number
  name: string
  iconSrc: string
}

export const SUPPORTED_CHAINS: Chain[] = [
  { id: bsc.id, name: "BSC", iconSrc: bscImg.src },
  { id: bscTestnet.id, name: "BSC Testnet", iconSrc: bscImg.src },
  { id: goerli.id, name: "Goerli", iconSrc: bscImg.src },
  { id: mainnet.id, name: "Ethereum", iconSrc: ethImg.src }
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
