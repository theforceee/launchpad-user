import { createContext } from "react"

export type AppContextType = {
  isWrongChain?: boolean
}

export const AppContext = createContext<AppContextType>({})
