import { useEffect, useState } from "react"
import { useToken } from "wagmi"

export type TokenDetailTypes = {
  decimals: number | undefined
  symbol: string | undefined
  name: string | undefined
  address: `0x${string}` | undefined
}

const useTokenDetail = (
  tokenAddress: `0x${string}` | undefined,
  networdId?: number | undefined
) => {
  const [tokenDetail, setTokenDetail] = useState<TokenDetailTypes>()

  const { data, isLoading } = useToken({
    enabled: !!tokenAddress,
    address: tokenAddress,
    chainId: networdId
  })

  useEffect(() => {
    setTokenDetail({
      decimals: data?.decimals,
      name: data?.name,
      symbol: data?.symbol,
      address: data?.address
    })
  }, [data])

  return { tokenDetail, loading: isLoading }
}

export default useTokenDetail
