import { BLAZE_TOKEN_CONTRACT } from "@constants/index"
import { ETH_NETWORK_ID } from "@constants/networks"
import { getAccountToken } from "@utils/index"
import { useEffect, useState } from "react"
import { useAccount, useChainId, useToken } from "wagmi"
import { AppContext, TokenDetailTypes } from "./AppContext"

const AppProvider = (props: any) => {
  const chainId = useChainId()
  const { address } = useAccount()
  const [isWrongChain, setIsWrongChain] = useState<boolean>(false)
  const [tokenDetail, setTokenDetail] = useState<TokenDetailTypes>()
  const [isUserSigned, setIsUserSigned] = useState<boolean>(false)

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
    const token = getAccountToken(address)
    setIsUserSigned(!!token)
  }, [address])

  useEffect(() => {
    setIsWrongChain(chainId !== +ETH_NETWORK_ID)
  }, [chainId])

  useEffect(() => {}, [])

  return (
    <AppContext.Provider value={{ isWrongChain, tokenDetail, isUserSigned }}>
      {props.children}
    </AppContext.Provider>
  )
}
export default AppProvider
