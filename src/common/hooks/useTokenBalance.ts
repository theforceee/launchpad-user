import { BLAZE_TOKEN_CONTRACT, NETWORK_ID } from "@constants/index"
import { AppContext } from "@contexts/AppContext"
import { useContext } from "react"
import { useBalance } from "wagmi"

const useTokenBalance = (connectedAccount: `0x${string}` | undefined) => {
  const { isWrongChain } = useContext(AppContext)

  const { data: userBalance, isLoading } = useBalance({
    address: connectedAccount,
    token: BLAZE_TOKEN_CONTRACT,
    chainId: +NETWORK_ID,
    enabled: !!connectedAccount && isWrongChain,
    onError(error) {
      console.log("Error to fetch balance", error)
    }
  })

  return { userBalance: userBalance?.formatted || "0", loadingBalance: isLoading }
}

export default useTokenBalance
