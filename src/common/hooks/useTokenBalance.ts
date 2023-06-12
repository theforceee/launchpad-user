import { NETWORK_AVAILABLE } from "@constants/index"
import { useState } from "react"
import { getReadOnlyTokenContract } from "../services/web3"

const useTokenBalance = (
  tokenAddress: string | undefined,
  userAddress: string | null | undefined
) => {
  const [tokenBalanceLoading, setTokenBalanceLoading] = useState<boolean>(false)

  const retrieveTokenBalance = async () => {
    if (!tokenAddress) return
    const tokenContract = getReadOnlyTokenContract(NETWORK_AVAILABLE.ETH, tokenAddress)
    if (!tokenContract) return 0
    setTokenBalanceLoading(true)
    try {
      const balance = await tokenContract.balanceOf(userAddress)
      setTokenBalanceLoading(false)
      console.log("Token balance:", balance.toString())
    } catch (error) {
      setTokenBalanceLoading(false)
      console.error("Error getting token balance:", error)
      return 0
    }
  }

  return {
    retrieveTokenBalance,
    // retrieveTokenRawBalance,
    tokenBalanceLoading
  }
}

export default useTokenBalance
