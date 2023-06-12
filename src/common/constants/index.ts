export const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API + "api/v2/user"

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
