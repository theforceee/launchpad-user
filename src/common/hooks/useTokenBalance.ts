import { AppContext } from "@contexts/AppContext"
import { useContext } from "react"
import { useBalance } from "wagmi"

const useTokenBalance = (
  tokenAddress: `0x${string}` | undefined,
  userAddress: `0x${string}` | undefined,
  networkId?: number | undefined
) => {
  const { isWrongChain } = useContext(AppContext)

  const { data: userBalance, isLoading } = useBalance({
    enabled: !!userAddress && !!tokenAddress && isWrongChain,
    address: userAddress,
    token: tokenAddress,
    chainId: networkId,
    onError(error) {
      console.log("Error to fetch balance", error)
    }
  })

  return { userBalance: userBalance?.formatted || "0", loadingBalance: isLoading }
}

export default useTokenBalance
