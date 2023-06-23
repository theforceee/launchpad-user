import { Address } from "wagmi"

const USER_DATA_KEY = "user"

type SavedUserData = {
  token: string
  wallet: Address
}

export const saveUserData = (walletAddr: Address, token: string) => {
  if (!walletAddr) return

  const data: SavedUserData = {
    token,
    wallet: walletAddr
  }

  return localStorage.setItem(USER_DATA_KEY, JSON.stringify(data))
}

export const getUserData = (): SavedUserData | undefined => {
  const rawData = localStorage.getItem(USER_DATA_KEY)
  if (!rawData) return

  try {
    return JSON.parse(rawData)
  } catch {}
}

export const clearAccountToken = () => {
  return localStorage.removeItem(USER_DATA_KEY)
}
