import { BLAZE_TOKEN_CONTRACT } from "@constants/index"
import { ETH_NETWORK_ID } from "@constants/networks"
import { useEffect, useState } from "react"
import { useAccount, useChainId, useToken } from "wagmi"
import { AppContext, TokenDetailTypes } from "./AppContext"
import { IdProvider } from "@components/Base/Identity"

const AppProvider = (props: any) => {
  const chainId = useChainId()
  const { address } = useAccount()
  // TODO: move, it should not have app scope
  const [isWrongChain, setIsWrongChain] = useState<boolean>(false)
  // TODO: move, it should not have app scope
  const [tokenDetail, setTokenDetail] = useState<TokenDetailTypes>()

  const { data } = useToken({
    address: BLAZE_TOKEN_CONTRACT,
    enabled: !!address
  })

  useEffect(() => {
    setTokenDetail({
      decimals: data?.decimals,
      name: data?.name,
      symbol: data?.symbol
    })
  }, [data])

  useEffect(() => {
    setIsWrongChain(chainId !== +ETH_NETWORK_ID)
  }, [chainId])

  useEffect(() => {}, [])

  return (
    <AppContext.Provider value={{ isWrongChain, tokenDetail }}>
      <IdProvider>{props.children}</IdProvider>
    </AppContext.Provider>
  )
}
export default AppProvider
