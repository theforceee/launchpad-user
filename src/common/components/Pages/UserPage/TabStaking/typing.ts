import { Address } from "wagmi"

export type StakedNft = {
  tokenAddress: string
  tokenId: string
}

export interface NftData {
  chain: string
  contractType: string
  tokenAddress: Address
  tokenId: string
  name: string
  symbol: string
  amount: number
  blockNumberMinted: string
  blockNumber: string
  ownerOf: string
  tokenHash: string
  lastTokenUriSync: string
  possibleSpam: boolean
  isApproved?: boolean
  metadata?: {
    image: string
  }
}
