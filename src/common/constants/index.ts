export const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API + "api/v2/user"
export const SHERIFF_NFT_CONTRACT: any = process.env.NEXT_PUBLIC_SMART_CONTRACT_SHERIFF_NFT || ""
export const PIONEER_NFT_CONTRACT: any = process.env.NEXT_PUBLIC_SMART_CONTRACT_PIONEER_NFT || ""
export const BLAZE_TOKEN_CONTRACT: any = process.env.NEXT_PUBLIC_SMART_CONTRACT_BLAZE_TOKEN || ""
export const BLAZE_TOKEN_DECIMALS: any = process.env.NEXT_PUBLIC_SMART_CONTRACT_BLAZE_DECIMALS || ""
export const STAKING_CONTRACT: any = process.env.NEXT_PUBLIC_SMART_CONTRACT_STAKING || ""
export const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID || ""

export const KEY_CACHE = "user"

type HeadDefaultTypes = {
  image: string
  title: string
  description: string
  keywords: string
}

export const URLS = {
  HOME: "/",
  IDO: "/ido",
  INO: "/ino",
  NFT: "/nft",
  STATS: "/stats",
  FAQ: "/faq",
  PROFILE: "/profile",
  STAKING: "/staking",
  FAVORITES: "/favorites"
}

export const headDefault: HeadDefaultTypes = {
  description: "Description",
  // image: "https://d1j2c9jkfhu70p.cloudfront.net/Thumbnail_2_7bc61c9253.png",
  image: "",
  title: "Launchpad",
  keywords: "key, word"
}

export const currencies = {
  NATIVE: "NATIVE",
  BUSD: "BUSD",
  USDC: "USDC",
  USDT: "USDT"
}

export const NETWORK_AVAILABLE = {
  ETH: "ETH",
  BSC: "BSC"
}
