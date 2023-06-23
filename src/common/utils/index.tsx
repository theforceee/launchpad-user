import { BLAZE_TOKEN_DECIMALS } from "@constants/index"
import { ethers } from "ethers"

export const formatCurrency = (n: any, maxLengthOfDecimal = 2) => {
  if (Number.isNaN(n)) return "0"

  const newNumber = Number(n)
  const lengthOfDecimal = Math.floor(newNumber) !== newNumber ? maxLengthOfDecimal : 0

  const re = `\\d(?=(\\d{3})+${lengthOfDecimal ? "\\." : "$"})`
  return newNumber.toFixed(Math.max(0, ~~lengthOfDecimal)).replace(new RegExp(re, "g"), "$&,")
}

export const getRankingSuffix = (index: number | undefined) => {
  if (typeof index !== "number") return "N/A"

  switch (index) {
    case 1:
      return "st"
    case 2:
      return "nd"
    case 3:
      return "rd"
    default:
      return "th"
  }
}

export async function checkMetaMaskIsUnlocked() {
  const provider = new ethers.providers.Web3Provider(window.ethereum)

  try {
    const accounts = await provider.listAccounts()
    return accounts.length > 0
  } catch (e) {
    return false
  }
}

export const displayWalletAddress = (address: string | undefined, digits = 6) => {
  if (!address) return "N/A"
  return `${address.substring(0, digits)}...${address.substring(
    address.length - 3,
    address.length
  )}`
}

export const convertBigIntToNumber = (
  bign: bigint | undefined,
  decimals = BLAZE_TOKEN_DECIMALS
) => {
  if (!bign) return 0
  return (BigInt(bign).toString() as any) / 10 ** decimals
}

export const convertNumberToBigInt = (
  number: number | undefined,
  decimals = BLAZE_TOKEN_DECIMALS
) => {
  if (!number) return 0
  return BigInt(number * 10 ** decimals).toString()
}

// get all tags and remove duplicates, add tag "all"
export const getAllTags = (poolData: any) => {
  if (!poolData) return []
  let poolTags = poolData
    .map((pool: any) => (pool.tags ? pool.tags.split(",") : []))
    .flat()
    .map((tag: any) => tag.trim())

  const uniqueTags: any = poolTags ? [...new Set(poolTags)].filter((tag) => tag !== "") : []
  const allTags = ["all"].concat(uniqueTags)
  return allTags
}
