import { BLAZE_TOKEN_CONTRACT, NETWORK_ID } from "@constants/index"
import { useEffect, useState } from "react"
import { useAccount, useChainId, useToken } from "wagmi"
import { AppContext, TokenDetailTypes } from "./AppContext"

const AppProvider = (props: any) => {
  const chainId = useChainId()
  const { address } = useAccount()
  const [isWrongChain, setIsWrongChain] = useState<boolean>(false)
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
    setIsWrongChain(chainId !== +NETWORK_ID)
  }, [chainId])

  useEffect(() => {}, [])

  return (
    <AppContext.Provider value={{ isWrongChain, tokenDetail }}>
      {props.children}
    </AppContext.Provider>
  )
}
export default AppProvider
