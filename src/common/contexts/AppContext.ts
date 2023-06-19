import { createContext } from "react"

export type TokenDetailTypes = {
  decimals: number | undefined
  symbol: string | undefined
  name: string | undefined
}

export type AppContextType = {
  isWrongChain?: boolean
  isUserSigned?: boolean
  tokenDetail?: TokenDetailTypes
}

export const AppContext = createContext<AppContextType>({})
