import { IdProvider } from "@components/Base/Identity"
import { ETH_NETWORK_ID } from "@constants/networks"
import { useEffect, useState } from "react"
import { useChainId } from "wagmi"
import { AppContext } from "./AppContext"

const AppProvider = (props: any) => {
  const chainId = useChainId()
  // TODO: move, it should not have app scope
  const [isWrongChain, setIsWrongChain] = useState<boolean>(false)

  useEffect(() => {
    setIsWrongChain(chainId !== +ETH_NETWORK_ID)
  }, [chainId])

  useEffect(() => {}, [])

  return (
    <AppContext.Provider value={{ isWrongChain }}>
      <IdProvider>{props.children}</IdProvider>
    </AppContext.Provider>
  )
}
export default AppProvider
